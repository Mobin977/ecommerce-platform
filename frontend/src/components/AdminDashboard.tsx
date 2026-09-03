import React from 'react';

export const AdminDashboard: React.FC = () => {
  const metrics = [
    { title: 'Gross Revenue', value: '$14,240.50', sub: '+12% from last week', color: 'text-green-600' },
    { title: 'Open Fulfillment Volume', value: '28 Orders', sub: '8 awaiting courier dispatch', color: 'text-amber-600' },
    { title: 'Depleted Inventory Stock', value: '3 Products', sub: 'Requires structural supplier reorder', color: 'text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Ecosystem Metrics Overview</h2>
        <p className="text-xs text-gray-500">Real-time administrative data indexing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{m.title}</p>
            <p className={`text-3xl font-black tracking-tight ${m.color}`}>{m.value}</p>
            <p className="text-[11px] font-medium text-gray-500">{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
