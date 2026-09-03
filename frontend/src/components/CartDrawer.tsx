import React from 'react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop dark overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header Panel */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1 rounded-md hover:bg-gray-100 transition"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List Grid Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 font-medium">Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-gray-100 pb-4 last:border-none">
                  
                  {/* Clean vector box icon replacing the old item.image code layer */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 shadow-inner">
                    <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">${item.price.toFixed(2)} each</p>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 border border-gray-200 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-200 text-xs font-bold transition-all"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1 text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 border border-gray-200 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-200 text-xs font-bold transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs font-bold text-red-500 hover:text-red-600 mt-2 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout Actions Panel */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-4">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Shipping and transaction taxes calculated at checkout.</p>
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md shadow-indigo-600/10 transition duration-150 text-sm tracking-wide active:scale-98"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
