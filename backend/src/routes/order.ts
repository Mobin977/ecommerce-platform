import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.post('/create', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { items, total } = req.body;
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized payload token frame.' });

    const order = await prisma.order.create({
      data: {
        userId,
        total: parseFloat(total),
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
          })),
        },
      },
      include: { items: true },
    });

    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/my-orders', authenticateToken, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.userId;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(orders);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
