
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-gray-500 hover:text-orange-600 transition font-medium"
      >
        <i className="fas fa-arrow-left"></i> Back to results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden border">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {[...Array(4)].map((_, i) => (
               <div key={i} className={`aspect-square rounded-lg border-2 cursor-pointer hover:border-orange-500 overflow-hidden ${i === 0 ? 'border-orange-500' : 'border-gray-100'}`}>
                  <img src={product.image + '&sig=' + i} className="w-full h-full object-cover opacity-80" />
               </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">{product.brand}</span>
            <h1 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1">
                 <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star text-sm"></i>)}
                 </div>
                 <span className="text-sm font-bold">{product.rating}</span>
               </div>
               <span className="h-4 w-px bg-gray-200"></span>
               <span className="text-sm text-blue-600 font-medium">1.2k Ratings</span>
               <span className="h-4 w-px bg-gray-200"></span>
               <span className="text-sm text-gray-500">{product.stock} pieces in stock</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex items-baseline gap-4">
            <span className="text-4xl font-black text-orange-600">${product.price}</span>
            <span className="text-gray-400 line-through text-lg">${Math.round(product.price * 1.3)}</span>
            <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-bold">-30%</span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            {product.description}
          </p>

          <div className="space-y-6 mt-auto">
             <div className="flex items-center gap-6">
                <span className="font-bold text-gray-700">Quantity</span>
                <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50">
                   <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition">-</button>
                   <span className="w-12 h-12 flex items-center justify-center font-bold">{quantity}</span>
                   <button onClick={() => setQuantity(q => q+1)} className="w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition">+</button>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-orange-100 text-orange-600 py-4 rounded-xl font-bold hover:bg-orange-200 transition border-2 border-orange-200"
                >
                  ADD TO CART
                </button>
                <button className="bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200">
                  BUY NOW
                </button>
             </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-8">
             <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-truck"></i>
               </div>
               <div>
                 <p className="text-xs font-bold">Free Delivery</p>
                 <p className="text-[10px] text-gray-400">Enter your postal code for availability</p>
               </div>
             </div>
             <div className="flex gap-3">
               <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-undo"></i>
               </div>
               <div>
                 <p className="text-xs font-bold">Return Policy</p>
                 <p className="text-[10px] text-gray-400">Free 30 days delivery returns</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
