
import React, { useState, useEffect, useMemo } from 'react';
import { User, Product, CartItem, Order, AppState, UserRole, OrderStatus } from './types';
import { INITIAL_PRODUCTS, CATEGORIES } from './constants';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import SellerDashboard from './components/SellerDashboard';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  // Persistence Layer (LocalStorage)
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('zmart_state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    return {
      user: null,
      products: INITIAL_PRODUCTS,
      cart: [],
      orders: [],
      searchQuery: '',
      categoryFilter: 'All'
    };
  });

  const [activePage, setActivePage] = useState<'home' | 'product' | 'seller' | 'cart' | 'orders'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('zmart_state', JSON.stringify(state));
  }, [state]);

  // Derived filtered products
  const filteredProducts = useMemo(() => {
    return state.products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                            p.brand.toLowerCase().includes(state.searchQuery.toLowerCase());
      const matchesCategory = state.categoryFilter === 'All' || p.category === state.categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [state.products, state.searchQuery, state.categoryFilter]);

  // Actions
  const handleLogin = (user: User) => {
    setState(prev => ({ ...prev, user }));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, user: null }));
    setActivePage('home');
  };

  const addToCart = (product: Product) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        };
      }
      return { ...prev, cart: [...prev.cart, { ...product, quantity: 1 }] };
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.id !== productId)
    }));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    }));
  };

  const placeOrder = () => {
    if (state.cart.length === 0 || !state.user) return;
    
    const newOrder: Order = {
      id: 'ord_' + Math.random().toString(36).substr(2, 9),
      buyerId: state.user.id,
      items: [...state.cart],
      total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: OrderStatus.PENDING,
      date: new Date().toISOString()
    };

    setState(prev => ({
      ...prev,
      orders: [...prev.orders, newOrder],
      cart: []
    }));
    setActivePage('orders');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => o.id === orderId ? { ...o, status } : o)
    }));
  };

  const addProduct = (p: Product) => {
    setState(prev => ({ ...prev, products: [...prev.products, p] }));
  };

  const editProduct = (p: Product) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(item => item.id === p.id ? p : item)
    }));
  };

  const deleteProduct = (id: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Header 
        user={state.user}
        cartCount={state.cart.length}
        onSearch={(q) => setState(prev => ({ ...prev, searchQuery: q }))}
        onNavigate={setActivePage}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        {activePage === 'home' && (
          <HomePage 
            products={filteredProducts} 
            categories={CATEGORIES}
            activeCategory={state.categoryFilter}
            onSelectCategory={(cat) => setState(prev => ({ ...prev, categoryFilter: cat }))}
            onProductClick={(p) => { setSelectedProduct(p); setActivePage('product'); }}
            onAddToCart={addToCart}
          />
        )}

        {activePage === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setActivePage('home')}
            onAddToCart={addToCart}
          />
        )}

        {activePage === 'seller' && state.user?.role === 'seller' && (
          <SellerDashboard 
            products={state.products.filter(p => p.sellerId === state.user?.id)}
            orders={state.orders} // Ideally only orders with seller's products
            onAddProduct={addProduct}
            onEditProduct={editProduct}
            onDeleteProduct={deleteProduct}
            onUpdateOrder={updateOrderStatus}
            userId={state.user.id}
          />
        )}

        {activePage === 'cart' && (
          <Cart 
            items={state.cart}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
            onCheckout={placeOrder}
            isAuthenticated={!!state.user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {activePage === 'orders' && state.user && (
          <OrderHistory 
            orders={state.orders.filter(o => o.buyerId === state.user?.id)}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-500">Z-Mart</h3>
            <p className="text-gray-400">The premier destination for all your shopping needs. Quality products, fast delivery.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase">Customer Care</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>How to Buy</li>
              <li>Returns & Refunds</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase">Z-Mart</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Z-Mart</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Email" className="p-2 rounded-l w-full text-black outline-none" />
              <button className="bg-orange-600 px-4 py-2 rounded-r hover:bg-orange-700 transition">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>

      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)} 
          onLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
