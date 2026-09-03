import { apiFetch } from './api';

export const paymentService = {
  createPaymentIntent: async (amountInCents: number) => {
    return apiFetch('/api/payment/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount: amountInCents }),
    });
  }
};
