import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';

// Initialize Stripe outside render tree loop to prevent multiple instances
// Paste your exact copied Publishable Key here:
const stripePromise = loadStripe('pk_test_51UBSmFRW7iQExRhZWoSeQgGDvw4LQ40hgb8gMlVauIMnum1sxSkdF44Igaoc58y0PnQJ323gvgXaYRCOOhgKG2pQ00235KgPrq');



interface CheckoutWrapperProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const CheckoutWrapper: React.FC<CheckoutWrapperProps> = ({ onSuccess, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  );
};
