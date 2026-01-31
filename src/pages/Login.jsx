import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    const result = await login(username, password);
    if (result.success) {
      navigate('/users');
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] p-4">
      <div className="w-full max-w-[440px] bg-white rounded-xl shadow-lg border border-slate-200 p-10">
        <div className="flex flex-col items-center mb-10">
          <div className="text-[#1d63ed] mb-4">
            <ShieldCheck size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sign in</h1>
          <p className="text-slate-500 mt-3 text-center text-sm">
            Use your HealthConnect account to manage users and secrets.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-3 text-red-700 text-sm animate-in fade-in zoom-in duration-200">
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Username or email address *
            </label>
            <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md outline-none transition-all bg-white text-slate-900 ${
                    error ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password *
            </label>
            <input
            type="password"
            className={`w-full px-3 py-2 border rounded-md outline-none transition-all bg-white text-slate-900 ${
                error ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1d63ed] hover:bg-[#154ec1] text-white font-bold py-2.5 rounded-md transition-colors shadow-sm mt-4 flex justify-center items-center disabled:opacity-70"
          >
            {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Continue'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100">
          <Footer isDark={false} />
        </div>
      </div>
    </div>
  );
};

export default Login;