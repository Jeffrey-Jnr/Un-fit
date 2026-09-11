"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    // This is the magic command. Since the user clicked the email link,
    // they are temporarily authenticated, so Supabase knows who is updating their password!
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setMessage('Password successfully updated! Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/admin');
        router.refresh();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/mountain-mobile.png')] sm:bg-[url('/landscape-hero.png')]">
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative w-full max-w-[400px] bg-white/40 backdrop-blur-xl rounded-[28px] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50">
        
        {/* Icon */}
        <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 flex items-center justify-center mx-auto mb-6">
          <Lock size={20} className="text-gray-900" />
        </div>

        {/* Headers */}
        <div className="text-center mb-8">
          <h2 className="text-[22px] font-bold text-gray-900 mb-2 tracking-tight">Update Password</h2>
          <p className="text-sm text-gray-700 font-medium leading-relaxed px-2">
            Please enter your new password below.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center font-medium border border-red-100">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-50 text-green-700 p-3 rounded-xl mb-6 text-sm text-center font-medium border border-green-100">
            {message}
          </div>
        )}
        
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="space-y-3">
            {/* New Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-600" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required 
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3.5 bg-white/50 border border-white/50 rounded-xl text-sm text-gray-900 focus:bg-white/80 focus:border-white/80 focus:ring-2 focus:ring-gray-900/10 transition-all placeholder:text-gray-500 font-medium"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-800 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-600" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required 
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3.5 bg-white/50 border border-white/50 rounded-xl text-sm text-gray-900 focus:bg-white/80 focus:border-white/80 focus:ring-2 focus:ring-gray-900/10 transition-all placeholder:text-gray-500 font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-orange-600 text-white rounded-xl text-sm font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 mt-6"
          >
            {loading ? 'Updating...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
