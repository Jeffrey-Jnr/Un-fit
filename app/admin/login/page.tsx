"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address first to reset your password.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/update-password`,
    });
    
    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset link sent! Please check your email.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-[url('/mountain-mobile.png')] sm:bg-[url('/landscape-hero.png')]">
      <div className="absolute inset-0 bg-black/5"></div>
      
      <div className="relative w-full max-w-[400px] bg-white/40 backdrop-blur-xl rounded-[28px] p-8 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50">
        
        {/* Icon */}
        <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 flex items-center justify-center mx-auto mb-6">
          <LogIn size={20} className="text-gray-900" />
        </div>

        {/* Headers */}
        <div className="text-center mb-8">
          <h2 className="text-[22px] font-bold text-gray-900 mb-2 tracking-tight">Sign in with email</h2>
          <p className="text-sm text-gray-700 font-medium leading-relaxed px-2">
            Access the (Un)Fit admin dashboard to manage your orders securely.
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
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-3">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-600" />
              </div>
              <input 
                type="email" 
                required 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 bg-white/50 border border-white/50 rounded-xl text-sm text-gray-900 focus:bg-white/80 focus:border-white/80 focus:ring-2 focus:ring-gray-900/10 transition-all placeholder:text-gray-500 font-medium"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-600" />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                required={!message} // Don't require password if they are just resetting
                placeholder="Password"
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
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end pt-1 pb-2">
            <button 
              onClick={handleResetPassword}
              type="button"
              className="text-xs font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-orange-600 text-white rounded-xl text-sm font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? 'Signing in...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}
