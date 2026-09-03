import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const InventoryManager: React.FC = () => {
  const { token } = useAuth();
  const [form, setForm] = useState({ name: '', description: '', price: '', stock: '' });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...form, images: ['https://unsplash.com'] }),
    });
    setForm({ name: '', description: '', price: '', stock: '' });
    alert('Product catalog matrix synced securely.');
  };

  return (
    <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm max-w-md space-y-4">
      <h3 className="font-bold text-gray-900 text-sm">Add New Catalog Item</h3>
      <input type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg outline-none" required />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg h-20 outline-none" required />
      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Price ($)" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg outline-none" required />
        <input type="number" placeholder="Stock Unit Volume" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full text-xs p-2.5 border rounded-lg outline-none" required />
      </div>
      <button type="submit" className="w-full bg-gray-900 text-white text-xs font-bold py-2.5 rounded-lg transition hover:bg-gray-800">Commit to Database</button>
    </form>
  );
};
