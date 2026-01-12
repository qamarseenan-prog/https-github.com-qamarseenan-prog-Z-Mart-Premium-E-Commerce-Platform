
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('buyer');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (isLogin ? email.split('@')[0] : 'New User'),
      email,
      role
    };
    onLogin(mockUser);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-scaleIn">
        <div className="relative h-32 bg-orange-600 flex items-center justify-center">
          <h2 className="text-3xl font-black text-white tracking-tighter">Z-MART</h2>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="p-8">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-2 font-bold transition-all border-b-2 ${isLogin ? 'text-orange-600 border-orange-600' : 'text-gray-400 border-transparent'}`}
            >
              LOGIN
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-2 font-bold transition-all border-b-2 ${!isLogin ? 'text-orange-600 border-orange-600' : 'text-gray-400 border-transparent'}`}
            >
              SIGN UP
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300" 
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
              <input 
                required
                type="password" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300" 
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Account Type</label>
                <div className="grid grid-cols-2 gap-2">
                   <button 
                    type="button"
                    onClick={() => setRole('buyer')}
                    className={`p-3 rounded-xl border-2 transition font-bold text-sm ${role === 'buyer' ? 'bg-orange-50 border-orange-600 text-orange-600' : 'border-gray-100 text-gray-400'}`}
                   >
                     BUYER
                   </button>
                   <button 
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`p-3 rounded-xl border-2 transition font-bold text-sm ${role === 'seller' ? 'bg-orange-50 border-orange-600 text-orange-600' : 'border-gray-100 text-gray-400'}`}
                   >
                     SELLER
                   </button>
                </div>
              </div>
            )}

            <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg mt-6">
              {isLogin ? 'CONTINUE' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            By continuing, you agree to Z-Mart's <span className="text-orange-600 underline">Terms of Service</span> and <span className="text-orange-600 underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
