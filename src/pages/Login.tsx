import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Sparkles, LogIn, ArrowRight, ShieldCheck, Zap, Star, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          subscriptionStatus: 'free',
          createdAt: serverTimestamp()
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Erro ao entrar com Google. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Email login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha incorretos.');
      } else {
        setError('Ocorreu um erro ao entrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 gradient-uau rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 gradient-cta rounded-full blur-[120px] opacity-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-3xl p-8 lg:p-12 relative z-10 shadow-2xl border-white/10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-uau flex items-center justify-center glow-purple mb-6 uau-animation">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-black text-white mb-2 tracking-tight">
            Bem-vindo ao Foto<span className="text-brand-orange">Uau</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Transforme suas fotos em vendas com o poder da IA.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple transition-colors"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple transition-colors"
                required
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl gradient-uau text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-brand-purple/20"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Entrar'}
          </button>
        </form>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
            <span className="bg-brand-dark px-4 text-slate-600">Ou continue com</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-white text-brand-dark font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/5"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Entrar com Google
        </button>

        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Ainda não é cadastrado?{' '}
            <Link to="/register" className="text-brand-orange font-bold hover:underline">
              Clique aqui
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-slate-500 text-[10px] uppercase tracking-widest font-bold">
          Ao entrar, você concorda com nossos <br />
          <a href="#" className="text-brand-purple hover:underline">Termos de Uso</a> e <a href="#" className="text-brand-purple hover:underline">Privacidade</a>
        </p>
      </motion.div>
    </div>
  );
};
