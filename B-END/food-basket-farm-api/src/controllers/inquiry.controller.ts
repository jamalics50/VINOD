import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { z } from 'zod';

const createInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const parsedBody = createInquirySchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ 
        error: 'Invalid input', 
        details: parsedBody.error.issues 
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: parsedBody.data,
    });

    res.json(inquiry);
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
