
import React, { useState } from 'react';
import { Product, Order, OrderStatus } from '../types';
import { CATEGORIES } from '../constants';
import { generateDescription } from '../geminiService';

interface SellerDashboardProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (p: Product) => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrder: (id: string, s: OrderStatus) => void;
  userId: string;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ products, orders, onAddProduct, onEditProduct, onDeleteProduct, onUpdateOrder, userId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');
  
  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: CATEGORIES[0],
    brand: '',
    stock: 0,
    image: 'https://picsum.photos/400/400?random=' + Math.random()
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIExplain = async () => {
    if (!form.name || !form.category) return alert('Please enter product name and category first.');
    setIsGenerating(true);
    const desc = await generateDescription(form.name, form.category);
    setForm(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      id: editingId || 'p' + Math.random().toString(36).substr(2, 9),
      name: form.name || 'Unnamed Product',
      description: form.description || '',
      price: Number(form.price) || 0,
      category: form.category || CATEGORIES[0],
      brand: form.brand || 'Generic',
      image: form.image || 'https://picsum.photos/400/400',
      rating: 4.5,
      stock: Number(form.stock) || 0,
      sellerId: userId
    };

    if (editingId) {
      onEditProduct(productData);
      setEditingId(null);
    } else {
      onAddProduct(productData);
    }
    
    setIsAdding(false);
    setForm({ name: '', description: '', price: 0, category: CATEGORIES[0], brand: '', stock: 0, image: 'https://picsum.photos/400/400?random=' + Math.random() });
  };

  const startEdit = (p: Product) => {
    setForm(p);
    setEditingId(p.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold">Seller Dashboard</h2>
          <p className="text-gray-500">Manage your shop, inventory, and orders.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md transition ${activeTab === 'inventory' ? 'bg-white shadow text-orange-600 font-bold' : 'text-gray-600'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-md transition ${activeTab === 'orders' ? 'bg-white shadow text-orange-600 font-bold' : 'text-gray-600'}`}
          >
            Shop Orders
          </button>
        </div>
      </div>

      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">My Products ({products.length})</h3>
            {!isAdding && (
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
              >
                <i className="fas fa-plus"></i> List New Product
              </button>
            )}
          </div>

          {isAdding && (
            <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-sm animate-fadeIn">
              <div className="flex justify-between mb-6">
                <h4 className="text-lg font-bold">{editingId ? 'Edit Product' : 'Add New Product'}</h4>
                <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-400 hover:text-gray-600">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={form.name} 
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300" 
                      placeholder="e.g. Wireless Mouse Pro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select 
                      value={form.category} 
                      onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Price ($)</label>
                      <input 
                        required
                        type="number" 
                        value={form.price} 
                        onChange={e => setForm({...form, price: Number(e.target.value)})}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Stock</label>
                      <input 
                        required
                        type="number" 
                        value={form.stock} 
                        onChange={e => setForm({...form, stock: Number(e.target.value)})}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Brand</label>
                    <input 
                      type="text" 
                      value={form.brand} 
                      onChange={e => setForm({...form, brand: e.target.value})}
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300" 
                      placeholder="e.g. Logitech"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-bold text-gray-700">Description</label>
                      <button 
                        type="button"
                        onClick={handleAIExplain}
                        disabled={isGenerating}
                        className="text-[10px] bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold flex items-center gap-1 hover:bg-purple-200"
                      >
                        <i className={`fas ${isGenerating ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i> 
                        {isGenerating ? 'GENERATING...' : 'AI ASSIST'}
                      </button>
                    </div>
                    <textarea 
                      required
                      value={form.description} 
                      onChange={e => setForm({...form, description: e.target.value})}
                      rows={5}
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300" 
                      placeholder="Describe your product..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={form.image} 
                      onChange={e => setForm({...form, image: e.target.value})}
                      className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-orange-300 text-xs" 
                    />
                  </div>
                  <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition mt-4 shadow-lg">
                    {editingId ? 'SAVE CHANGES' : 'LIST PRODUCT'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.brand}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.category}</td>
                    <td className="px-6 py-4 font-bold text-orange-600">${p.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${p.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {p.stock} pcs
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded transition"><i className="fas fa-edit"></i></button>
                        <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded transition"><i className="fas fa-trash"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Inbound Orders</h3>
          {orders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400">No orders received yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg text-gray-800">Order #{order.id.slice(-5)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-600' :
                        order.status === OrderStatus.SHIPPED ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                    <div className="flex gap-2">
                      {order.items.map(item => (
                        <div key={item.id} className="relative group">
                          <img src={item.image} className="w-10 h-10 rounded-md border" />
                          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end justify-between">
                    <div className="text-2xl font-bold text-orange-600">${order.total}</div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        disabled={order.status === OrderStatus.SHIPPED || order.status === OrderStatus.DELIVERED}
                        onClick={() => onUpdateOrder(order.id, OrderStatus.SHIPPED)}
                        className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                      >
                        MARK AS SHIPPED
                      </button>
                      <button 
                         disabled={order.status === OrderStatus.DELIVERED}
                         onClick={() => onUpdateOrder(order.id, OrderStatus.DELIVERED)}
                        className="text-xs bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        MARK AS DELIVERED
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
