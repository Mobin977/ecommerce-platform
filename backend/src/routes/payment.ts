import { Router, Response } from 'express';
import Stripe from 'stripe';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any, 
});

router.post('/create-payment-intent', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const userId = req.user?.userId; // Perfectly matches your AuthRequest signature

    if (!amount || amount <= 0) {
      res.status(400).json({ error: 'Invalid monetary sum parameters.' });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { userId: userId || 'anonymous' },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
