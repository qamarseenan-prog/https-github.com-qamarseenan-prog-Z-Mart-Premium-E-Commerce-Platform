
import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  cartCount: number;
  onSearch: (q: string) => void;
  onNavigate: (page: 'home' | 'product' | 'seller' | 'cart' | 'orders') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, cartCount, onSearch, onNavigate, onOpenAuth, onLogout }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="bg-gray-100 py-1 text-xs text-center text-gray-600 hidden md:block">
        Free Shipping on Orders over $100! Download Z-Mart App for Exclusive Offers.
      </div>

      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <span className="text-3xl font-extrabold text-orange-600 tracking-tighter group-hover:text-orange-700 transition">Z-MART</span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="flex-grow w-full md:max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Search in Z-Mart..." 
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
            className="w-full bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
          />
          <button type="submit" className="absolute right-3 top-2 text-gray-400 hover:text-orange-500">
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 font-medium hover:text-orange-600">
                <i className="fas fa-user-circle text-2xl"></i>
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                {user.role === 'seller' && (
                  <button 
                    onClick={() => onNavigate('seller')}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded text-sm flex items-center gap-2"
                  >
                    <i className="fas fa-store"></i> Seller Center
                  </button>
                )}
                <button 
                  onClick={() => onNavigate('orders')}
                  className="w-full text-left px-4 py-2 hover:bg-orange-50 rounded text-sm flex items-center gap-2"
                >
                  <i className="fas fa-box"></i> My Orders
                </button>
                <div className="border-t my-1"></div>
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded text-sm flex items-center gap-2"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="font-bold text-orange-600 hover:underline"
            >
              LOGIN / SIGNUP
            </button>
          )}

          <button 
            onClick={() => onNavigate('cart')}
            className="relative p-2 text-gray-700 hover:text-orange-600 transition"
          >
            <i className="fas fa-shopping-cart text-2xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
