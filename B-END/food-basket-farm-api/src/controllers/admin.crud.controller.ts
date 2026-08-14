import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import prisma from '../lib/prisma';
import { z } from 'zod';

// --- PRODUCTS ---

const createProductSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  variants: z.array(
    z.object({
      label: z.string().min(1),
      priceInPkr: z.number().min(0),
      stockQuantity: z.number().int().min(0),
      sku: z.string().optional(),
    })
  ).optional(),
});

export const getAdminProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { variants: true, category: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAdminProduct = async (req: AuthRequest, res: Response) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.issues });

    const data = parsed.data;

    const product = await prisma.product.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug,
        description: data.description,
        images: data.images || [],
        isActive: data.isActive ?? true,
        variants: {
          create: data.variants || [],
        },
      },
      include: { variants: true },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProductSchema = z.object({
  categoryId: z.string().uuid().optional(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
});

export const updateAdminProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.issues });

    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
      include: { variants: true },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAdminProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    // Delete variants first due to foreign key
    await prisma.productVariant.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// --- VARIANTS ---

const updateVariantSchema = z.object({
  priceInPkr: z.number().min(0).optional(),
  stockQuantity: z.number().int().min(0).optional(),
});

export const updateAdminVariant = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const variantId = req.params.variantId as string;
    const parsed = updateVariantSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.issues });

    const variant = await prisma.productVariant.update({
      where: { id: variantId, productId: id },
      data: parsed.data,
    });

    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// --- ORDERS ---

export const getAdminOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: { include: { variant: { include: { product: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
});

export const updateAdminOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const parsed = updateOrderStatusSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'Invalid input', details: parsed.error.issues });

    const order = await prisma.order.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
