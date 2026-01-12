
import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-extrabold">My Orders</h2>
        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">{orders.length}</span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-16 text-center rounded-2xl border border-gray-100">
          <i className="fas fa-box-open text-7xl text-gray-200 mb-6"></i>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-8">Start shopping and discover amazing deals!</p>
          <button className="text-orange-600 font-bold hover:underline">Browse Products</button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.slice().reverse().map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Order ID</p>
                    <p className="font-bold text-gray-800">#{order.id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Placed on</p>
                    <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Total</p>
                    <p className="font-bold text-orange-600">${order.total}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${
                  order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' :
                  order.status === OrderStatus.SHIPPED ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full animate-pulse ${
                     order.status === OrderStatus.DELIVERED ? 'bg-green-500' :
                     order.status === OrderStatus.SHIPPED ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}></span>
                  {order.status}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <img src={item.image} className="w-16 h-16 rounded-lg object-cover border" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} | Price: ${item.price}</p>
                      </div>
                      <button className="text-xs text-orange-600 font-bold hover:underline">Track Item</button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t flex flex-wrap gap-4">
                   <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition">View Invoice</button>
                   <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition">Need Help?</button>
                   <button className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-xs font-bold transition">Buy it again</button>
                </div>
              </div>

              {/* Step Tracker Visual */}
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center relative">
                 <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 mx-12 z-0"></div>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]"><i className="fas fa-check"></i></div>
                    <span className="text-[10px] mt-1 font-bold">Placed</span>
                 </div>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${order.status !== OrderStatus.PENDING ? 'bg-orange-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                      {order.status !== OrderStatus.PENDING ? <i className="fas fa-check"></i> : '2'}
                    </div>
                    <span className={`text-[10px] mt-1 font-bold ${order.status !== OrderStatus.PENDING ? 'text-gray-800' : 'text-gray-300'}`}>Shipped</span>
                 </div>
                 <div className="relative z-10 flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${order.status === OrderStatus.DELIVERED ? 'bg-green-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                      {order.status === OrderStatus.DELIVERED ? <i className="fas fa-check"></i> : '3'}
                    </div>
                    <span className={`text-[10px] mt-1 font-bold ${order.status === OrderStatus.DELIVERED ? 'text-gray-800' : 'text-gray-300'}`}>Delivered</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
