import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Sparkles, 
  Download, 
  RefreshCw, 
  Image as ImageIcon, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Camera
} from 'lucide-react';
import { processImage } from '../services/gemini';
import { auth, db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useSubscription } from '../hooks/useSubscription';
import { SubscriptionBadge } from '../components/SubscriptionBadge';

const SCENARIOS = [
  { id: 'minimalist', label: 'Minimalista', prompt: 'Cenário minimalista, fundo limpo, cores neutras, iluminação suave.' },
  { id: 'studio', label: 'Studio Profissional', prompt: 'Fundo de estúdio profissional, iluminação de três pontos, sombras suaves.' },
  { id: 'luxury', label: 'Luxo', prompt: 'Cenário de luxo, materiais nobres como mármore e ouro, iluminação dramática.' },
  { id: 'nature', label: 'Natureza', prompt: 'Cenário natural ao ar livre, luz do dia, plantas e elementos orgânicos.' },
  { id: 'urban', label: 'Urbano', prompt: 'Cenário urbano moderno, concreto, luzes da cidade, estilo industrial.' },
];

export const Dashboard = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { subscriptionStatus } = useSubscription();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setProcessedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!originalImage) return;
    
    setLoading(true);
    setError(null);
    try {
      const base64 = originalImage.split(',')[1];
      const result = await processImage(base64, prompt);
      setProcessedImage(result);

      // Save to Firestore
      if (auth.currentUser) {
        const imageRef = doc(collection(db, 'images'));
        await setDoc(imageRef, {
          id: imageRef.id,
          userId: auth.currentUser.uid,
          originalUrl: originalImage,
          processedUrl: result,
          prompt: prompt || 'Default UAU Effect',
          createdAt: serverTimestamp()
        });
      }
    } catch (err) {
      setError('Ocorreu um erro ao processar a imagem. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `fotouau-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-white tracking-tight">Crie seu Efeito <span className="text-brand-orange">Uau</span></h1>
          <p className="text-slate-400">Envie sua foto e deixe nossa IA transformar em vendas.</p>
        </div>
        <SubscriptionBadge status={subscriptionStatus} showUpgrade={true} className="flex-row items-center gap-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group overflow-hidden ${
              originalImage ? 'border-brand-purple/50 bg-brand-purple/5' : 'border-white/10 hover:border-brand-purple/40 hover:bg-white/5'
            }`}
          >
            {originalImage ? (
              <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-brand-purple" />
                </div>
                <p className="text-white font-bold mb-1">Clique para enviar</p>
                <p className="text-slate-500 text-sm">ou arraste sua foto aqui</p>
                <p className="text-[10px] text-slate-600 mt-4 uppercase tracking-widest">PNG, JPG até 10MB</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-brand-purple" />
                Cenários Sugeridos
              </label>
              <div className="flex flex-wrap gap-2">
                {SCENARIOS.map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => setPrompt(scenario.prompt)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
                      prompt === scenario.prompt
                        ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:border-brand-purple/40 hover:text-white'
                    }`}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-yellow" />
                Instruções Personalizadas
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Remova o fundo e coloque em um cenário de luxo com iluminação quente..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple transition-colors h-24 resize-none"
              />
            </div>
            
            <button 
              onClick={handleProcess}
              disabled={!originalImage || loading}
              className="w-full py-4 rounded-xl gradient-cta text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-orange/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Processando Magia...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar Efeito UAU
                </>
              )}
            </button>
          </div>
        </div>

        {/* Result Area */}
        <div className="space-y-6">
          <div className={`relative aspect-square rounded-3xl border border-white/10 bg-black/20 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${processedImage ? 'glow-purple border-brand-purple/30' : ''}`}>
            {processedImage ? (
              <motion.img 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                src={processedImage} 
                alt="Processed" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="text-center p-8 opacity-40">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 mx-auto">
                  <ImageIcon className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-slate-500 font-medium">O resultado aparecerá aqui</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white font-bold animate-pulse">Criando sua obra-prima...</p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {processedImage && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <button 
                  onClick={downloadImage}
                  className="flex-1 py-4 rounded-xl bg-white text-brand-dark font-bold flex items-center justify-center gap-3 hover:bg-slate-100 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Baixar Imagem
                </button>
                <button 
                  onClick={() => setProcessedImage(null)}
                  className="px-6 py-4 rounded-xl glass-card text-white font-bold hover:bg-white/10 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
