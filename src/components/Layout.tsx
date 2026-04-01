import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  CreditCard, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';
import { auth, signOut } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionBadge } from './SubscriptionBadge';

interface SidebarItemProps {
  icon: any;
  label: string;
  to: string;
  active: boolean;
  onClick?: () => void;
  key?: string | number;
}

const SidebarItem = ({ icon: Icon, label, to, active, onClick }: SidebarItemProps) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-brand-purple/20 to-transparent text-white border-l-4 border-brand-purple' 
        : 'text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-brand-purple' : ''}`} />
    <span className="font-medium">{label}</span>
  </Link>
);

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { subscriptionStatus } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: ImageIcon, label: 'Minha Galeria', to: '/gallery' },
    { icon: CreditCard, label: 'Assinatura', to: '/subscription' },
    { icon: Settings, label: 'Configurações', to: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-brand-dark/50 backdrop-blur-xl fixed h-full z-40">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-lg gradient-uau flex items-center justify-center glow-purple">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-tight">Foto<span className="text-brand-orange">Uau</span></span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.to} 
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to} 
              />
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <SubscriptionBadge status={subscriptionStatus} className="mb-6" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-brand-purple" />
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-white truncate">{user?.displayName || 'Usuário'}</span>
              <span className="text-[10px] text-slate-500 truncate">{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-brand-dark/80 backdrop-blur-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md gradient-uau flex items-center justify-center">
            <Sparkles className="text-white w-4 h-4" />
          </div>
          <span className="text-lg font-display font-bold text-white">Foto<span className="text-brand-orange">Uau</span></span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-brand-dark border-r border-white/5 z-50 flex flex-col"
          >
            <div className="p-8">
              <div className="flex items-center gap-2 mb-12">
                <div className="w-8 h-8 rounded-lg gradient-uau flex items-center justify-center">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-display font-bold text-white">Foto<span className="text-brand-orange">Uau</span></span>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <SidebarItem 
                    key={item.to} 
                    icon={item.icon}
                    label={item.label}
                    to={item.to}
                    active={location.pathname === item.to} 
                    onClick={() => setIsSidebarOpen(false)}
                  />
                ))}
              </nav>
            </div>
            <div className="mt-auto p-8 border-t border-white/5">
              <SubscriptionBadge status={subscriptionStatus} className="mb-6" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-slate-400 hover:text-red-400 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-12 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
