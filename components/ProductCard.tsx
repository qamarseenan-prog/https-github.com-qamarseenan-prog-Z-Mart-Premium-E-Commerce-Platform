
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-xl transition-all group overflow-hidden flex flex-col h-full">
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow hover:text-orange-600 transition">
            <i className="far fa-heart"></i>
          </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{product.category}</p>
        <h4 
          className="font-medium text-gray-800 hover:text-orange-600 cursor-pointer line-clamp-2 min-h-[3rem]"
          onClick={onClick}
        >
          {product.name}
        </h4>
        
        <div className="mt-2 flex items-center gap-1">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`${i < Math.floor(product.rating) ? 'fas' : 'far'} fa-star`}></i>
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.rating})</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">${product.price}</span>
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className="bg-orange-50 text-orange-600 p-2 rounded-lg hover:bg-orange-600 hover:text-white transition"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
