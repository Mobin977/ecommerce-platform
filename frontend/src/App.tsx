import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { AuthPage } from './pages/AuthPage';
import { ProductCatalog } from './components/ProductCatalog';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutWrapper } from './components/CheckoutWrapper';
import { OrderTracking } from './components/OrderTracking';
import { AdminDashboard } from './components/AdminDashboard';
import { InventoryManager } from './components/InventoryManager';

type NavigationViews = 'catalog' | 'checkout' | 'success' | 'tracking' | 'admin';

function App() {
  const { isAuthenticated, logout, user } = useAuth();
  const { cart, cartTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<NavigationViews>('catalog');
  
  // Local states for mock testing the created trackers
  const [lastOrderId, setLastOrderId] = useState('ORD-99234-AX');
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const handleCheckoutSuccess = () => {
    setLastOrderTotal(cartTotal);
    setLastOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}-TX`);
    setCurrentView('success');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Responsive Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 
            onClick={() => setCurrentView('catalog')} 
            className="text-lg sm:text-xl font-black tracking-tight text-indigo-600 cursor-pointer select-none active:scale-95 transition-transform"
          >
            MERN.SHOP
          </h1>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Quick Link views for development testing */}
            <button 
              onClick={() => setCurrentView('catalog')}
              className={`text-xs font-semibold px-2 py-1.5 rounded-md transition ${currentView === 'catalog' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Shop
            </button>
            
            <button 
              onClick={() => setCurrentView('tracking')}
              className={`text-xs font-semibold px-2 py-1.5 rounded-md transition ${currentView === 'tracking' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Track
            </button>

            {user?.role === 'ADMIN' && (
              <button 
                onClick={() => setCurrentView('admin')}
                className={`text-xs font-semibold px-2 py-1.5 rounded-md transition ${currentView === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Admin Panel
              </button>
            )}

            {/* Shopping Cart Trigger icon */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-indigo-600 text-white text-[9px] font-black rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-sm">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            <button 
              onClick={logout} 
              className="hidden sm:inline-block text-xs font-bold text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-100 rounded-lg px-3 py-1.5 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Responsive View Grid Body Layout Wrapper */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="w-full transition-all duration-300">
          
          {currentView === 'catalog' && <ProductCatalog />}
          
          {currentView === 'checkout' && (
            <div className="py-4 max-w-lg mx-auto">
              <CheckoutWrapper 
                onSuccess={handleCheckoutSuccess} 
                onCancel={() => setCurrentView('catalog')} 
              />
            </div>
          )}

          {currentView === 'tracking' && (
            <div className="space-y-6 py-4">
              <OrderTracking orderId={lastOrderId} status="SHIPPED" total={lastOrderTotal || 276.50} />
            </div>
          )}

          {currentView === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <AdminDashboard />
              </div>
              <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-xs">
                <InventoryManager />
              </div>
            </div>
          )}

          {currentView === 'success' && (
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-gray-100 shadow-md max-w-md mx-auto space-y-4 px-4">
              <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Payment Captured Safely</h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
                Order record <span className="font-mono font-bold text-gray-800">{lastOrderId}</span> was logged successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button 
                  onClick={() => setCurrentView('tracking')}
                  className="bg-gray-100 text-gray-700 font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-gray-200 transition"
                >
                  Track Progress
                </button>
                <button 
                  onClick={() => setCurrentView('catalog')}
                  className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs hover:bg-indigo-700 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Drawer Component Layer Injection */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
        }}
      />
    </div>
  );
}

export default App;
