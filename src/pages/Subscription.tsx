import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Zap, Star, Rocket, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const PlanCard = ({ title, price, features, active, icon: Icon, color }: { title: string, price: string, features: string[], active?: boolean, icon: any, color: 'brand-yellow' | 'brand-orange' | 'brand-purple' }) => {
  const colorMap = {
    'brand-yellow': {
      border: 'border-brand-yellow',
      glow: 'glow-yellow',
      bg: 'bg-brand-yellow',
      bgLight: 'bg-brand-yellow/10',
      borderLight: 'border-brand-yellow/20',
      text: 'text-brand-yellow',
      shadow: 'shadow-brand-yellow/20'
    },
    'brand-orange': {
      border: 'border-brand-orange',
      glow: 'glow-orange',
      bg: 'bg-brand-orange',
      bgLight: 'bg-brand-orange/10',
      borderLight: 'border-brand-orange/20',
      text: 'text-brand-orange',
      shadow: 'shadow-brand-orange/20'
    },
    'brand-purple': {
      border: 'border-brand-purple',
      glow: 'glow-purple',
      bg: 'bg-brand-purple',
      bgLight: 'bg-brand-purple/10',
      borderLight: 'border-brand-purple/20',
      text: 'text-brand-purple',
      shadow: 'shadow-brand-purple/20'
    }
  };

  const styles = colorMap[color];

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative glass-card rounded-3xl p-8 lg:p-12 border-2 transition-all duration-500 overflow-hidden ${active ? `${styles.border} ${styles.glow}` : 'border-white/10 hover:border-white/20'}`}
    >
      {active && (
        <div className={`absolute top-0 right-0 px-6 py-2 ${styles.bg} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl z-10`}>
          Recomendado
        </div>
      )}
      
      <div className={`w-16 h-16 rounded-2xl ${styles.bgLight} flex items-center justify-center mb-8 border ${styles.borderLight}`}>
        <Icon className={`w-8 h-8 ${styles.text}`} />
      </div>
      
      <h3 className="text-2xl font-display font-black text-white mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-display font-black text-white">R$ {price}</span>
        <span className="text-slate-500 text-sm font-medium">/mês</span>
      </div>
      
      <ul className="space-y-4 mb-10">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
            <CheckCircle2 className={`w-5 h-5 ${styles.text} shrink-0`} />
            {feature}
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${active ? `${styles.bg} text-white hover:scale-[1.02] shadow-xl ${styles.shadow}` : 'bg-white/5 text-white hover:bg-white/10'}`}>
        {active ? 'Assinar Agora' : 'Começar Grátis'}
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export const Subscription = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-display font-black text-white mb-6 tracking-tight">Escolha seu Plano</h1>
        <p className="text-slate-400 text-lg">
          Desbloqueie o poder total da IA e transforme suas fotos em máquinas de vendas profissionais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PlanCard 
          title="Grátis"
          price="0"
          icon={Zap}
          color="brand-yellow"
          features={[
            "3 gerações/mês",
            "Qualidade padrão",
            "Suporte básico"
          ]}
        />
        <PlanCard 
          title="Pro"
          price="49"
          active
          icon={Rocket}
          color="brand-orange"
          features={[
            "50 gerações/mês",
            "Alta qualidade",
            "Sem marca d'água",
            "Suporte prioritário"
          ]}
        />
        <PlanCard 
          title="Enterprise"
          price="199"
          icon={ShieldCheck}
          color="brand-purple"
          features={[
            "500 gerações/mês",
            "Qualidade máxima",
            "API Access",
            "Gerente de conta"
          ]}
        />
      </div>

      <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 gradient-uau rounded-full blur-[120px] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-display font-black text-white mb-4">Precisa de uma solução personalizada?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Se você processa mais de 10.000 imagens por mês, entre em contato para um plano sob medida para sua operação.
          </p>
          <button className="px-10 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
            Falar com Especialista
          </button>
        </div>
      </div>
    </div>
  );
};
