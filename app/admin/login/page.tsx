'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiClient } from '@/lib/api-client';
import { LogIn, UserPlus } from 'lucide-react';

type AuthMode = 'login' | 'signup';

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export default function AdminAuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const validate = () => {
    if (!form.email || !form.password) return 'Email and password are required';
    if (!isValidEmail(form.email)) return 'Please enter a valid email address';
    if (mode === 'signup' && (!form.firstName || !form.lastName)) {
      return 'First name and last name are required';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const response = await apiClient.login(form.email, form.password);

        if (response.success && response.data?.user?.role === 'admin') {
          router.push('/admin');
        } else if (response.success) {
          setError('Invalid credentials or insufficient permissions');
        } else {
          setError(response.message || 'Login failed');
        }
      } else {
        const signupResponse = await apiClient.signup(
          form.firstName,
          form.lastName,
          form.email,
          form.password
        );

        if (signupResponse.success) {
          setSuccess('Account created. Signing you in...');
          const loginResponse = await apiClient.login(form.email, form.password);

          if (loginResponse.success && loginResponse.data?.user?.role === 'admin') {
            router.push('/admin');
          } else if (loginResponse.success) {
            setSuccess(
              'Account created. Please contact an admin to enable access, then log in.'
            );
            setMode('login');
          } else {
            setSuccess('Account created. Please log in with your credentials.');
            setMode('login');
            if (loginResponse.message) setError(loginResponse.message);
          }
        } else {
          setError(signupResponse.message || 'Signup failed');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1f3a] via-[#2d3561] to-[#1a1f3a] p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Logo in Top Left */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-3 group z-10">
        <div className="bg-white p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <Image 
            src="/images/logo-eecf49f1.png" 
            alt="Drive Pixel Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
        </div>
        <div className="text-white">
          <div className="text-xl font-bold tracking-tight">Drive Pixel</div>
          <div className="text-xs text-gray-300 font-medium">Admin Portal</div>
        </div>
      </Link>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full mb-4 shadow-lg">
            {mode === 'login' ? (
              <LogIn className="h-8 w-8 text-white" />
            ) : (
              <UserPlus className="h-8 w-8 text-white" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-[#1a1f3a] mb-2">
            {mode === 'login' ? 'Admin Login' : 'Create Account'}
          </h1>
          <p className="text-gray-600 font-medium">
            {mode === 'login'
              ? 'Enter your credentials to access the dashboard'
              : 'Sign up to get started'}
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex w-full rounded-full bg-gray-100 p-1.5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                resetMessages();
              }}
              className={`w-1/2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                mode === 'login'
                  ? 'bg-[#10b981] text-white shadow-md'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                resetMessages();
              }}
              className={`w-1/2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-[#10b981] text-white shadow-md'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              Signup
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          {mode === 'signup' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-900 font-semibold">First Name</Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#10b981] focus:ring-[#10b981] placeholder:text-gray-400"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-900 font-semibold">Last Name</Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 focus:border-[#10b981] focus:ring-[#10b981] placeholder:text-gray-400"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 font-semibold">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="bg-white border-gray-300 text-gray-900 focus:border-[#10b981] focus:ring-[#10b981] placeholder:text-gray-400"
              placeholder="admin@drivepixel.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 font-semibold">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              className="bg-white border-gray-300 text-gray-900 focus:border-[#10b981] focus:ring-[#10b981] placeholder:text-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            disabled={loading}
          >
            {loading
              ? mode === 'login'
                ? 'Logging in...'
                : 'Creating account...'
              : mode === 'login'
              ? 'Login'
              : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}

