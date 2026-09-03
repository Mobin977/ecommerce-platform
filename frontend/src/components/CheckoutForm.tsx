import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

interface CheckoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, cart } = useCart();
  
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const totalAmountCents = Math.round(cartTotal * 100);
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('authToken') || 
                    localStorage.getItem('jwt') || 
                    localStorage.getItem('auth_token');

      // Native fetch engine layer completely replacing Axios
      const res = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: totalAmountCents,
          items: cart
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server pipeline processing failure.');
      }

      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error('Failed to retrieve valid transaction parameters from backend token layer.');
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Portfolio Sandbox Tester',
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment capture failed.');
        setProcessing(false);
      } else if (result.paymentIntent?.status === 'succeeded') {
        setProcessing(false);
        onSuccess();
      }
    } catch (err: unknown) {
      setProcessing(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Server pipeline transaction failure.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <h3 className="text-base font-bold text-gray-900 tracking-tight">Secure Stripe Gateway</h3>
      
      <div className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 shadow-inner">
        <CardElement options={{
          style: {
            base: {
              fontSize: '14px',
              color: '#1f2937',
              '::placeholder': { color: '#9ca3af' },
            },
          },
        }} />
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-600 rounded-xl border border-red-100 font-medium">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2.5 rounded-xl text-xs border border-gray-200 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all disabled:opacity-50 active:scale-98"
        >
          {processing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};
