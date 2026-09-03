const { Router } = require('express');
const Stripe = require('stripe');
const { authenticateToken } = require('../middleware/auth');

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

router.post('/create-payment-intent', authenticateToken, async (req: any, res: any): Promise<any> => {
  try {
    const { amount } = req.body;
    const userId = req.user?.userId;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid monetary sum parameters.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { userId: userId || 'anonymous' },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
