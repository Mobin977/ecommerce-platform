import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/create', authenticateToken, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, description, price, stock, images } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        images: images || [],
      },
    });
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
