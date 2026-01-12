
import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  isAuthenticated: boolean;
  onOpenAuth: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onCheckout, isAuthenticated, onOpenAuth }) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <i className="fas fa-shopping-basket text-7xl text-gray-200 mb-6"></i>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold">Shopping Cart ({items.length} items)</h2>
          <span className="text-sm text-gray-500">Select all items</span>
        </div>

        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 group">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition">{item.name}</h4>
                <p className="text-xs text-gray-400 mb-2">{item.brand} | {item.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center border rounded-lg overflow-hidden h-9">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="px-3 hover:bg-gray-100 transition border-r"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="px-3 hover:bg-gray-100 transition border-l"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-lg font-bold text-orange-600">${item.price * item.quantity}</span>
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
          <h3 className="text-lg font-bold mb-6">Order Summary</h3>
          <div className="space-y-3 pb-6 border-bottom">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Voucher</span>
              <span className="text-xs italic">Enter code</span>
            </div>
          </div>
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-end">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-2xl font-extrabold text-orange-600">${total}</span>
            </div>
          </div>
          
          {checkingOut ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100 text-sm text-orange-800">
                <i className="fas fa-info-circle mr-2"></i> This is a dummy checkout process. No real payment is required.
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <button className="border p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"><i className="fab fa-cc-visa text-blue-800"></i> Card</button>
                 <button className="border p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"><i className="fas fa-wallet text-orange-500"></i> Wallet</button>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg"
              >
                PLACE ORDER NOW
              </button>
              <button onClick={() => setCheckingOut(false)} className="w-full text-gray-400 text-sm hover:underline">Cancel</button>
            </div>
          ) : (
            <button 
              onClick={() => {
                if (!isAuthenticated) return onOpenAuth();
                setCheckingOut(true);
              }}
              className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg"
            >
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
        
        <div className="bg-gray-100 p-4 rounded-xl text-xs text-gray-500 flex items-start gap-3">
          <i className="fas fa-shield-alt text-lg text-green-600"></i>
          <div>
            <p className="font-bold text-gray-700 mb-1">Z-Mart Guarantee</p>
            <p>Get the item you ordered or your money back. Secure payment processing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
