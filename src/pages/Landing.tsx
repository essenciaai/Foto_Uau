import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  Image as ImageIcon, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  Star, 
  Upload, 
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  Sparkles,
  MousePointer2,
  Layout as LayoutIcon
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-uau flex items-center justify-center glow-purple">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">Foto<span className="text-brand-orange">Uau</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#impacto" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Resultados</a>
          <a href="#como-funciona" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Como funciona</a>
          <a href="#precos" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Preços</a>
          <Link to="/login" className="px-5 py-2 rounded-full gradient-cta text-white text-sm font-bold hover:scale-105 transition-all glow-orange">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const BeforeAfter = ({ before, after, label }: { before: string, after: string, label: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  
  return (
    <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] sm:aspect-video lg:aspect-square xl:aspect-video">
      <div className="absolute inset-0">
        <img src={after} alt="Depois" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} alt="Antes" className="w-full h-full object-cover grayscale-[0.3]" referrerPolicy="no-referrer" />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center">
          <MousePointer2 className="w-4 h-4 text-brand-purple rotate-45" />
        </div>
      </div>
      
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPos} 
        onChange={(e) => setSliderPos(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
      
      <div className="absolute bottom-4 left-4 z-10">
        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full border border-white/10 uppercase tracking-widest">
          {label}
        </span >
      </div>
      <div className="absolute top-4 left-4 z-10 px-2 py-1 bg-black/40 backdrop-blur-sm text-white/70 text-[8px] font-bold rounded uppercase">Antes</div>
      <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-brand-orange/80 backdrop-blur-sm text-white text-[8px] font-bold rounded uppercase">Depois</div>
    </div>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
    {/* Background Glows */}
    <div className="absolute top-1/4 -left-20 w-96 h-96 gradient-uau rounded-full blur-[120px] opacity-20"></div>
    <div className="absolute bottom-1/4 -right-20 w-96 h-96 gradient-cta rounded-full blur-[120px] opacity-10"></div>
    
    {/* Floating elements */}
    <div className="absolute top-20 right-[10%] w-12 h-12 gradient-uau rounded-xl blur-[2px] opacity-40 float-animation hidden lg:block"></div>
    <div className="absolute bottom-40 left-[5%] w-8 h-8 gradient-cta rounded-full blur-[1px] opacity-30 float-animation hidden lg:block" style={{ animationDelay: '1s' }}></div>
    <div className="absolute top-1/2 right-[5%] w-16 h-16 gradient-uau rounded-full blur-[3px] opacity-20 float-animation hidden lg:block" style={{ animationDelay: '2s' }}></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-8 uau-animation"
        >
          <Sparkles className="w-4 h-4" />
          O efeito UAU que suas vendas precisam
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[1.1] mb-8 tracking-tight"
        >
          Transforme suas <br />
          <span className="text-gradient-cta">fotos em vendas</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl"
        >
          Crie imagens profissionais que fazem seus clientes dizerem <span className="text-white font-bold italic">UAU</span>. Inteligência artificial de ponta para lojistas que buscam o próximo nível.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link to="/login" className="px-10 py-5 rounded-2xl gradient-cta text-white font-black text-xl hover:scale-105 transition-all glow-orange flex items-center justify-center gap-3">
            Testar grátis agora
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-5xl mx-auto float-animation"
        style={{ animationDuration: '8s' }}
      >
        <BeforeAfter 
          before="https://picsum.photos/seed/hero-before/1200/800"
          after="https://picsum.photos/seed/hero-after/1200/800"
          label="Transformação Instantânea"
        />
      </motion.div>
    </div>
  </section>
);

const ImpactSection = () => (
  <section id="impacto" className="py-24 bg-brand-dark/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
          Impacto que <span className="text-gradient-cta">converte</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Veja como produtos simples se tornam objetos de desejo em segundos. Arraste o slider para ver a mágica.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        <BeforeAfter 
          before="https://picsum.photos/seed/shoe-raw/800/800"
          after="https://picsum.photos/seed/shoe-pro/800/800"
          label="Tênis Esportivo"
        />
        <BeforeAfter 
          before="https://picsum.photos/seed/perfume-raw/800/800"
          after="https://picsum.photos/seed/perfume-pro/800/800"
          label="Perfume de Luxo"
        />
        <BeforeAfter 
          before="https://picsum.photos/seed/bag-raw/800/800"
          after="https://picsum.photos/seed/bag-pro/800/800"
          label="Bolsa Feminina"
        />
        <BeforeAfter 
          before="https://picsum.photos/seed/watch-raw/800/800"
          after="https://picsum.photos/seed/watch-pro/800/800"
          label="Relógio Premium"
        />
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-8 leading-tight">
            Suas fotos estão <br />
            <span className="text-slate-500">matando suas vendas?</span>
          </h2>
          <div className="space-y-6">
            {[
              { q: "Suas fotos não vendem?", a: "Imagens escuras e sem vida não passam a confiança que o cliente precisa." },
              { q: "Seu produto parece amador?", a: "Fundo bagunçado e iluminação ruim fazem seu produto parecer barato." },
              { q: "Perde vendas por imagens ruins?", a: "O cliente compra com os olhos. Se a foto não é UAU, ele vai para o concorrente." }
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-brand-orange mb-2">{item.q}</h3>
                <p className="text-slate-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 gradient-uau blur-[100px] opacity-20"></div>
          <img 
            src="https://picsum.photos/seed/sad-seller/600/800" 
            alt="Vendedor frustrado" 
            className="rounded-3xl shadow-2xl relative z-10 grayscale opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  </section>
);

const Solution = () => (
  <section className="py-24 gradient-uau relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl sm:text-6xl font-display font-black text-white mb-8">
          A solução definitiva <br /> para vender mais com suas fotos
        </h2>
        <p className="text-xl sm:text-2xl text-purple-100 mb-12 leading-relaxed">
          "Com o <span className="font-bold text-brand-yellow">FotoUau</span>, você transforma qualquer foto simples em imagens profissionais prontas para vender."
        </p>
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-brand-yellow rounded-full"></div>
        </div>
      </motion.div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="como-funciona" className="py-24 bg-brand-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Simples como um clique</h2>
        <p className="text-slate-400">Três passos para o sucesso visual do seu produto.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { icon: Upload, title: "Envie sua foto", desc: "Faça o upload de qualquer foto tirada com seu celular." },
          { icon: Layers, title: "Escolha o cenário", desc: "Selecione um estilo ou descreva o ambiente dos seus sonhos." },
          { icon: Rocket, title: "Receba o UAU", desc: "Baixe sua imagem profissional e veja suas vendas decolarem." }
        ].map((item, i) => (
          <div key={i} className="text-center group">
            <div className="w-20 h-20 rounded-3xl gradient-uau flex items-center justify-center mx-auto mb-8 glow-purple group-hover:scale-110 transition-transform">
              <item.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MoreResults = () => (
  <section className="py-24 bg-brand-dark/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">Mais resultados reais</h2>
        <p className="text-slate-400">De eletrônicos a cosméticos, a transformação é total.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <BeforeAfter before="https://picsum.photos/seed/phone-raw/600/600" after="https://picsum.photos/seed/phone-pro/600/600" label="Eletrônicos" />
        <BeforeAfter before="https://picsum.photos/seed/cream-raw/600/600" after="https://picsum.photos/seed/cream-pro/600/600" label="Cosméticos" />
        <BeforeAfter before="https://picsum.photos/seed/shirt-raw/600/600" after="https://picsum.photos/seed/shirt-pro/600/600" label="Moda" />
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: TrendingUp, title: "Venda Mais", desc: "Aumente sua conversão com imagens que passam autoridade." },
          { icon: DollarSign, title: "Economize", desc: "Esqueça fotógrafos caros e estúdios alugados." },
          { icon: Clock, title: "Velocidade", desc: "Imagens prontas em segundos, não em dias." },
          { icon: Zap, title: "Destaque-se", desc: "Seja o melhor visual do seu nicho no marketplace." }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl gradient-cta flex items-center justify-center mb-6 glow-orange">
              <item.icon className="text-white w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-24 bg-brand-dark/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-display font-bold text-white mb-4">O que dizem os lojistas</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {[
          { name: "Juliana Costa", role: "Dona de E-commerce", text: "Depois que comecei a usar o FotoUau, minhas vendas no Instagram aumentaram 40% no primeiro mês. É surreal!" },
          { name: "Ricardo Mendes", role: "Vendedor Mercado Livre", text: "Minhas fotos ficaram profissionais em minutos. O investimento se pagou no primeiro dia de uso." }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 rounded-3xl relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 gradient-uau rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <p className="text-lg text-slate-300 italic mb-6">"{item.text}"</p>
            <div>
              <p className="font-bold text-white">{item.name}</p>
              <p className="text-sm text-brand-orange">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SystemDemo = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Interface Intuitiva</h2>
        <p className="text-slate-400">Criado para ser simples, poderoso e rápido.</p>
      </div>
      
      <div className="relative max-w-5xl mx-auto">
        <div className="absolute inset-0 gradient-uau blur-[150px] opacity-20"></div>
        <div className="glass-card rounded-3xl overflow-hidden shadow-2xl relative z-10 border-white/20">
          <div className="bg-white/10 px-6 py-4 border-b border-white/10 flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="bg-white/5 px-4 py-1 rounded-md text-[10px] text-slate-400 font-mono">app.fotouau.com/dashboard</div>
          </div>
          <div className="p-8 grid md:grid-cols-[250px_1fr] gap-8">
            <div className="space-y-4 hidden md:block">
              <div className="h-10 bg-brand-purple rounded-lg flex items-center px-4 gap-3">
                <LayoutIcon className="w-4 h-4" />
                <span className="text-xs font-bold">Dashboard</span>
              </div>
              <div className="h-10 bg-white/5 rounded-lg flex items-center px-4 gap-3 text-slate-500">
                <ImageIcon className="w-4 h-4" />
                <span className="text-xs font-bold">Minhas Fotos</span>
              </div>
              <div className="h-10 bg-white/5 rounded-lg flex items-center px-4 gap-3 text-slate-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold">Analytics</span>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center">
                <Upload className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-bold">Arraste sua foto aqui</p>
                <p className="text-xs text-slate-600 mt-2">PNG, JPG até 10MB</p>
              </div>
              <div className="flex justify-end">
                <Link to="/login" className="px-8 py-3 rounded-xl gradient-cta text-white font-black glow-orange flex items-center gap-2">
                  Gerar Foto UAU
                  <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalGallery = () => (
  <section className="py-24 bg-brand-dark/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Galeria de Transformações</h2>
        <p className="text-slate-400">Resultados reais de clientes reais.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/5 group relative">
            <img 
              src={`https://picsum.photos/seed/gallery-${i}/400/400`} 
              alt={`Galeria ${i}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-bold text-brand-yellow uppercase tracking-widest">Efeito UAU</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="precos" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-display font-bold text-white mb-4">Planos para todos os tamanhos</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="glass-card p-10 rounded-3xl border-white/5">
          <h3 className="text-2xl font-bold text-white mb-2">Grátis</h3>
          <p className="text-slate-400 mb-6">Para quem está começando agora.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-display font-black text-white">R$ 0</span>
            <span className="text-slate-500">/mês</span>
          </div>
          <ul className="space-y-4 mb-10">
            {["3 gerações/mês", "Qualidade padrão", "Suporte básico"].map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <ShieldCheck className="w-5 h-5 text-slate-600" />
                {t}
              </li>
            ))}
          </ul>
          <Link to="/login" className="w-full py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors flex justify-center">
            Começar agora
          </Link>
        </div>
        
        <div className="glass-card p-10 rounded-3xl border-brand-orange/30 relative overflow-hidden glow-orange">
          <div className="absolute top-0 right-0 gradient-cta text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
            RECOMENDADO
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
          <p className="text-slate-400 mb-6">Para lojistas que vendem de verdade.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-display font-black text-white">R$ 49</span>
            <span className="text-slate-500">/mês</span>
          </div>
          <ul className="space-y-4 mb-10">
            {["50 gerações/mês", "Alta qualidade", "Sem marca d'água", "Suporte prioritário"].map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-white text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                {t}
              </li>
            ))}
          </ul>
          <Link to="/login" className="w-full py-4 rounded-xl gradient-cta text-white font-black shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all flex justify-center">
            Assinar agora
          </Link>
        </div>

        <div className="glass-card p-10 rounded-3xl border-brand-purple/30">
          <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
          <p className="text-slate-400 mb-6">Para grandes operações.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-display font-black text-white">R$ 199</span>
            <span className="text-slate-500">/mês</span>
          </div>
          <ul className="space-y-4 mb-10">
            {["500 gerações/mês", "Qualidade máxima", "API Access", "Gerente de conta"].map((t, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <ShieldCheck className="w-5 h-5 text-brand-purple" />
                {t}
              </li>
            ))}
          </ul>
          <Link to="/login" className="w-full py-4 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors flex justify-center">
            Assinar agora
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: "Preciso saber design?", a: "Absolutamente não! Nossa IA faz todo o trabalho de composição, iluminação e cenário para você." },
    { q: "Funciona com celular?", a: "Sim! O FotoUau foi criado para transformar fotos simples de smartphone em qualidade de estúdio profissional." },
    { q: "É rápido?", a: "Sim! Em média, sua foto profissional fica pronta em menos de 10 segundos." },
    { q: "Posso usar em qualquer marketplace?", a: "Com certeza. As imagens são otimizadas para Instagram, Shopee, Mercado Livre e qualquer outra plataforma." }
  ];

  return (
    <section className="py-24 bg-brand-dark/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-display font-bold text-white text-center mb-12">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden border-white/5">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full p-6 flex justify-between items-center text-left font-bold text-white"
              >
                {faq.q}
                <ChevronDown className={`w-5 h-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-slate-400 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section id="final-cta" className="py-32 relative overflow-hidden">
    <div className="absolute inset-0 gradient-uau opacity-40"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h2 className="text-5xl sm:text-7xl font-display font-black text-white mb-8 leading-tight">
        Diga <span className="text-brand-yellow uau-animation inline-block">UAU</span> para <br /> suas novas vendas
      </h2>
      <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
        Comece agora e transforme suas fotos simples em máquinas de conversão.
      </p>
      <Link to="/login" className="px-12 py-6 rounded-2xl gradient-cta text-white font-black text-2xl shadow-2xl shadow-orange-500/40 hover:scale-110 transition-all glow-orange inline-block">
        Testar grátis agora
      </Link>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-brand-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-uau flex items-center justify-center">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold text-white">Foto<span className="text-brand-orange">Uau</span></span>
        </div>
        <div className="flex gap-8 text-sm text-slate-500">
          <a href="#" className="hover:text-white transition-colors">Termos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Suporte</a>
        </div>
        <p className="text-sm text-slate-600">
          © 2026 FotoUau. Transformando pixels em lucro.
        </p>
      </div>
    </div>
  </footer>
);

const Logos = () => (
  <div className="py-12 border-y border-white/5 bg-brand-dark/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-8">Utilizado por lojistas das maiores plataformas</p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        {["Shopee", "Mercado Livre", "Instagram", "Nuvemshop", "Shopify", "Loja Integrada"].map((name) => (
          <span key={name} className="text-white font-display font-black text-xl md:text-2xl tracking-tighter">{name}</span>
        ))}
      </div>
    </div>
  </div>
);

export const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <ImpactSection />
        <Problem />
        <Solution />
        <HowItWorks />
        <MoreResults />
        <Benefits />
        <SocialProof />
        <SystemDemo />
        <FinalGallery />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};
