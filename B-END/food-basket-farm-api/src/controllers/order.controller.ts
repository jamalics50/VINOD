import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { z } from 'zod';

const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Valid email is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    province: z.string().min(2, "Province is required"),
  }),
  items: z.array(
    z.object({
      variantId: z.string().uuid("Invalid variant ID"),
      quantity: z.number().int().positive("Quantity must be positive"),
    })
  ).min(1, "Order must contain at least one item"),
  paymentMethod: z.string().optional(),
  totalPkr: z.number().optional(),
});

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parsedBody = createOrderSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ 
        error: 'Invalid input', 
        details: parsedBody.error.issues 
      });
    }

    const { customer, items, paymentMethod, totalPkr } = parsedBody.data;

    // Run transaction
    const result = await prisma.$transaction(async (tx) => {
      let dbCustomer = await tx.customer.findFirst({
        where: { phone: customer.phone },
      });

      if (!dbCustomer) {
        dbCustomer = await tx.customer.create({
          data: {
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            city: customer.city,
            province: customer.province,
          },
        });
      } else {
        // Optionally update customer details if needed, but we'll just use the existing one
      }

      // Fetch variants to check stock and get current prices
      const variantIds = items.map((item) => item.variantId);
      const variants = await tx.productVariant.findMany({
        where: { id: { in: variantIds } },
      });

      // Verify all variants exist
      if (variants.length !== variantIds.length) {
        throw new Error('NOT_FOUND:One or more variants not found');
      }

      const orderItemsData: any[] = [];

      for (const item of items) {
        const variant = variants.find((v) => v.id === item.variantId)!;

        if (variant.stockQuantity < item.quantity) {
          throw new Error(`INSUFFICIENT_STOCK:Not enough stock for variant ${variant.label}. Available: ${variant.stockQuantity}`);
        }

        // Decrement stock
        await tx.productVariant.update({
          where: { id: variant.id },
          data: { stockQuantity: { decrement: item.quantity } },
        });

        orderItemsData.push({
          variantId: variant.id,
          quantity: item.quantity,
          priceAtPurchase: variant.priceInPkr,
        });
      }

      // Create Order
      const newOrder = await tx.order.create({
        data: {
          customerId: dbCustomer.id,
          status: 'pending',
          paymentMethod,
          totalPkr,
          items: {
            create: orderItemsData,
          },
        },
      });

      return newOrder;
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error creating order:', error);

    if (error.message?.startsWith('INSUFFICIENT_STOCK:')) {
      return res.status(409).json({ error: error.message.split(':')[1] });
    }

    if (error.message?.startsWith('NOT_FOUND:')) {
      return res.status(404).json({ error: error.message.split(':')[1] });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        items: {
          include: {
            variant: {
              include: {
                product: true,
              }
            }
          }
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
