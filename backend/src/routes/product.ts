import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET /api/products - Open storefront query pipeline
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products/create - Protected inventory insertion pipeline
router.post('/create', authenticateToken, requireAdmin, async (req: any, res: Response): Promise<void> => {
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
    
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
