import React from 'react';

interface OrderTrackingProps {
  orderId: string;
  status: 'PAID' | 'SHIPPED' | 'DELIVERED';
  total: number;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId, status, total }) => {
  const steps = ['PAID', 'SHIPPED', 'DELIVERED'];
  const currentStepIndex = steps.indexOf(status);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Tracking Pipeline</span>
          <h3 className="text-sm font-mono font-bold text-gray-900 mt-0.5">ID: {orderId}</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total Captured</p>
          <p className="text-sm font-black text-gray-900">${total.toFixed(2)}</p>
        </div>
      </div>

      {/* Graphic Step Progress Bar */}
      <div className="relative flex justify-between items-center w-full pt-4">
        <div className="absolute left-0 top-1/2 h-0.5 bg-gray-200 w-full -translate-y-1/2 z-0" />
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-indigo-600 transition-all duration-500 -translate-y-1/2 z-0" 
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, idx) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition shadow-sm ${
              idx <= currentStepIndex ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'
            }`}>
              {idx + 1}
            </div>
            <span className={`text-[10px] font-bold mt-2 tracking-wider ${idx <= currentStepIndex ? 'text-indigo-600' : 'text-gray-400'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
