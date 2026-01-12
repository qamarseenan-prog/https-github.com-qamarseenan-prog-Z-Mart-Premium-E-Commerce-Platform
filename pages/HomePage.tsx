
import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, categories, activeCategory, onSelectCategory, onProductClick, onAddToCart }) => {
  return (
    <div className="space-y-12">
      {/* Banner Slider Placeholder */}
      <section className="relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg group">
        <img 
          src="https://picsum.photos/seed/shopbanner/1200/400" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fadeIn">MID-YEAR SALE</h2>
          <p className="text-lg md:text-xl mb-6 opacity-90">Up to 70% Off on Electronics & Fashion</p>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition w-fit shadow-lg transform hover:scale-105">
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Category Grid */}
      <section>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <i className="fas fa-th-large text-orange-500"></i> Categories
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <button 
            onClick={() => onSelectCategory('All')}
            className={`flex-shrink-0 px-6 py-2 rounded-full border transition-all ${
              activeCategory === 'All' ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-orange-400'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex-shrink-0 px-6 py-2 rounded-full border transition-all ${
                activeCategory === cat ? 'bg-orange-600 border-orange-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-orange-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product List */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <i className="fas fa-bolt text-orange-500"></i> Flash Sale
          </h3>
          <p className="text-orange-600 font-bold hover:underline cursor-pointer">View More</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-20">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h4 className="text-xl font-medium text-gray-500">No products found for this criteria</h4>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onProductClick(product)}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Trending Items section */}
      <section className="bg-orange-50 -mx-4 px-4 py-12">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Trending Deals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <img src="https://picsum.photos/seed/deal1/300/200" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h4 className="font-bold mb-2">Back to School Essentials</h4>
              <p className="text-sm text-gray-600 mb-4">Everything your kids need for a fresh start.</p>
              <button className="text-orange-600 font-bold">Shop Collection →</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <img src="https://picsum.photos/seed/deal2/300/200" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h4 className="font-bold mb-2">Home Refresh Event</h4>
              <p className="text-sm text-gray-600 mb-4">Up to 40% off on furniture and decor.</p>
              <button className="text-orange-600 font-bold">Explore Styles →</button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <img src="https://picsum.photos/seed/deal3/300/200" className="w-full h-40 object-cover rounded-lg mb-4" />
              <h4 className="font-bold mb-2">Gamer Paradise</h4>
              <p className="text-sm text-gray-600 mb-4">Latest consoles and accessories in stock.</p>
              <button className="text-orange-600 font-bold">Game On →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
