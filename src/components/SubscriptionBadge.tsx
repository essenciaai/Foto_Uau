import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, ShieldCheck, Rocket } from 'lucide-react';

interface SubscriptionBadgeProps {
  status: string;
  showUpgrade?: boolean;
  className?: string;
}

export const SubscriptionBadge = ({ status, showUpgrade = true, className = "" }: SubscriptionBadgeProps) => {
  const isFree = status === 'free';
  const isPro = status === 'pro';
  const isEnterprise = status === 'enterprise';

  return (
    <div className={`flex gap-3 ${className.includes('flex-row') ? 'flex-row items-center' : 'flex-col'} ${className}`}>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
        isFree 
          ? 'bg-brand-yellow/10 border-brand-yellow/20 text-brand-yellow' 
          : isPro 
            ? 'bg-brand-orange/10 border-brand-orange/20 text-brand-orange'
            : 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple'
      }`}>
        <div className={`w-2 h-2 rounded-full animate-pulse ${
          isFree ? 'bg-brand-yellow' : isPro ? 'bg-brand-orange' : 'bg-brand-purple'
        }`}></div>
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Plano {status === 'free' ? 'Grátis' : status === 'pro' ? 'Pro' : 'Enterprise'} Ativo
        </span>
      </div>

      {isFree && showUpgrade && (
        <Link 
          to="/subscription"
          className="px-4 py-2 rounded-lg bg-brand-yellow text-brand-dark text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
        >
          <Sparkles className="w-3 h-3" />
          Fazer Upgrade
        </Link>
      )}
    </div>
  );
};
