import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { X, Settings } from 'lucide-react';

const AdminDebug = () => {
  const { user, isAuthenticated, login } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [loginData, setLoginData] = useState({ email: 'admin@rise.com', password: 'Admin123!' });
  
  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(loginData.email, loginData.password);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs z-50 max-w-sm shadow-2xl border border-gray-600">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm">🔧 Auth Debug Panel</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-white">
          <X size={14} />
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="bg-gray-800 p-2 rounded">
          <p><strong>Status:</strong> {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}</p>
          <p><strong>User:</strong> {user ? user.name : 'None'}</p>
          <p><strong>Email:</strong> {user ? user.email : 'None'}</p>
          <p><strong>Role:</strong> {user ? user.role : 'None'}</p>
        </div>
        
        {user?.role === 'admin' || user?.role === 'manager' ? (
          <div className="bg-green-700 p-2 rounded">
            <div className="flex items-center gap-1 mb-1">
              <Settings size={14} />
              <p className="font-bold">✓ Admin Access Granted</p>
            </div>
            <div className="space-y-1">
              <a href="/admin" className="block text-green-200 underline hover:text-green-100">→ Admin Dashboard</a>
              <a href="/admin/products" className="block text-green-200 underline hover:text-green-100">→ Product Management</a>
              <a href="/admin/users" className="block text-green-200 underline hover:text-green-100">→ User Management</a>
            </div>
          </div>
        ) : (
          <div className="bg-red-700 p-2 rounded">
            <p className="font-bold mb-2">❌ No Admin Access</p>
            <form onSubmit={handleQuickLogin} className="space-y-2">
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-1 text-black text-xs rounded"
                placeholder="Admin Email"
              />
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-1 text-black text-xs rounded"
                placeholder="Password"
              />
              <button type="submit" className="w-full bg-olive-600 hover:bg-olive-700 p-1 rounded text-xs">
                Quick Admin Login
              </button>
            </form>
            <p className="mt-2 text-xs opacity-75">Or go to Profile page to login</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDebug;
