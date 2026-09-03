import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  type: 'wallet' | 'headphones' | 'keyboard' | 'bottle';
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Minimalist Leather Wallet', description: 'Slim bifold design, premium textured finish.', price: 45.00, stock: 12, category: 'Accessories', type: 'wallet' },
  { id: '2', name: 'Pro Wireless Headphones', description: 'Immersive sound quality with active noise cancellation.', price: 199.99, stock: 5, category: 'Electronics', type: 'headphones' },
  { id: '3', name: 'Mechanical RGB Keyboard', description: 'Tactile switches with vibrant backlighting matrix.', price: 125.50, stock: 8, category: 'Electronics', type: 'keyboard' },
  { id: '4', name: 'Thermal Insulated Flask', description: 'Double-wall vacuum steel keeps beverages ice cold.', price: 32.00, stock: 20, category: 'Lifestyle', type: 'bottle' }
];

export const ProductCatalog: React.FC = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Accessories', 'Lifestyle'];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesPrice && matchesCategory;
    });
  }, [searchQuery, maxPrice, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search catalog items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-64 flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 whitespace-nowrap">Max Price: ${maxPrice}</span>
          <input
            type="range"
            min="0"
            max="250"
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 border border-gray-200"
          />
        </div>
      </div>

      {/* Main Grid Render */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-gray-400 font-semibold text-sm">No inventory matches found for your active criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl hover:border-gray-200/60 transition-all duration-300">
              <div className="h-52 overflow-hidden relative flex items-center justify-center">
                <ProductGraphic type={product.type} />
                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-gray-900 font-black px-3 py-1 rounded-xl text-xs shadow-xs border border-gray-100">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-black tracking-widest text-indigo-500">{product.category}</span>
                  <h3 className="font-bold text-gray-900 text-sm tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-medium">{product.description}</p>
                </div>

                <button
                  onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}
                  className="w-full bg-slate-50 text-slate-800 hover:bg-indigo-600 hover:text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition-all duration-200 border border-slate-100 group-hover:border-transparent active:scale-98"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const ProductGraphic: React.FC<{ type: Product['type'] }> = ({ type }) => {
  const containerClasses = "w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative overflow-hidden select-none group-hover:from-slate-100 group-hover:to-indigo-50/30 transition-all duration-300";

  if (type === 'wallet') {
    return (
      <div className={containerClasses}>
        <div className="absolute w-32 h-32 bg-amber-500/10 rounded-full blur-xl" />
        <div className="w-28 h-20 bg-gradient-to-r from-amber-800 to-amber-900 rounded-xl shadow-lg relative transform -rotate-6 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 border border-amber-950/20">
          <div className="absolute inset-1.5 border border-dashed border-amber-600/30 rounded-lg pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-amber-950/20 rounded-r-xl border-l border-amber-950/30 shadow-inner flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-tr from-yellow-600 to-yellow-400 rounded-full shadow border border-yellow-500/50" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'headphones') {
    return (
      <div className={containerClasses}>
        <div className="absolute w-32 h-32 bg-indigo-500/10 rounded-full blur-xl" />
        <div className="w-24 h-24 relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          <div className="absolute top-2 w-20 h-16 border-4 border-slate-800 rounded-t-full" />
          <div className="absolute top-10 left-1 w-1.5 h-6 bg-slate-400 rounded" />
          <div className="absolute top-10 right-1 w-1.5 h-6 bg-slate-400 rounded" />
          <div className="absolute left-0 bottom-2 w-6 h-12 bg-gradient-to-b from-indigo-600 to-indigo-950 rounded-full shadow-md border-r-2 border-indigo-400/20" />
          <div className="absolute right-0 bottom-2 w-6 h-12 bg-gradient-to-b from-indigo-600 to-indigo-950 rounded-full shadow-md border-l-2 border-indigo-400/20" />
          <div className="w-14 h-4 bg-slate-800 rounded-full z-10 opacity-10 shadow-sm" />
        </div>
      </div>
    );
  }

  if (type === 'keyboard') {
    return (
      <div className={containerClasses}>
        <div className="absolute w-36 h-36 bg-purple-500/10 rounded-full blur-xl" />
        <div className="w-32 h-16 bg-slate-800 rounded-lg shadow-md p-1 flex flex-col justify-between transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 border border-slate-700">
          <div className="flex justify-between w-full h-3 gap-0.5">
            <div className="flex-1 bg-purple-500 rounded-xs shadow-xs animate-pulse" />
            <div className="flex-1 bg-indigo-500 rounded-xs shadow-xs" />
            <div className="flex-1 bg-blue-500 rounded-xs shadow-xs" />
            <div className="flex-1 bg-cyan-500 rounded-xs shadow-xs" />
            <div className="flex-1 bg-emerald-500 rounded-xs shadow-xs" />
          </div>
          <div className="flex justify-between w-full h-3 gap-0.5">
            <div className="flex-1 bg-slate-700 rounded-xs shadow-xs" />
            <div className="flex-1 bg-indigo-400 rounded-xs shadow-xs" />
            <div className="flex-1 bg-indigo-500 rounded-xs shadow-xs" />
            <div className="flex-1 bg-pink-500 rounded-xs shadow-xs" />
            <div className="flex-1 bg-slate-700 rounded-xs shadow-xs" />
          </div>
          <div className="flex w-full h-3 gap-0.5">
            <div className="w-6 bg-slate-700 rounded-xs shadow-xs" />
            <div className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xs shadow-xs" />
            <div className="w-6 bg-slate-700 rounded-xs shadow-xs" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
      <div className="w-12 h-28 relative flex flex-col items-center transform -rotate-12 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300">
        <div className="w-4 h-4 bg-gradient-to-r from-slate-600 to-slate-800 rounded-t border-b border-slate-900 shadow" />
        <div className="w-6 h-3 bg-slate-400 border-b border-slate-500 shadow-inner" />
        <div className="w-10 flex-1 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 rounded-b-xl shadow-lg border-x border-slate-400/30 relative">
          <div className="absolute top-6 left-0 right-0 h-4 bg-indigo-600/90 shadow-sm border-y border-indigo-700 flex items-center justify-center">
            <div className="w-full h-0.5 bg-indigo-400/40" />
          </div>
        </div>
      </div>
    </div>
  );
};
