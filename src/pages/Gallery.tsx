import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { ProcessedImage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Trash2, ImageIcon, Search, Filter, Calendar, ExternalLink } from 'lucide-react';

export const Gallery = () => {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'images'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imgs: ProcessedImage[] = [];
      snapshot.forEach((doc) => {
        imgs.push({ id: doc.id, ...doc.data() } as ProcessedImage);
      });
      setImages(imgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredImages = images.filter(img => 
    img.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-black text-white tracking-tight">Minha Galeria</h1>
          <p className="text-slate-400">Suas criações profissionais salvas em um só lugar.</p>
        </div>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Buscar por prompt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-square rounded-3xl bg-white/5 animate-pulse"></div>
          ))}
        </div>
      ) : filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, index) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-3xl overflow-hidden border border-white/10 glass-card"
            >
              <img src={img.processedUrl} alt="Processed" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white text-sm font-bold mb-1 line-clamp-2">{img.prompt}</p>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-4">
                  {new Date(img.createdAt).toLocaleDateString('pt-BR')}
                </p>
                <div className="flex gap-2">
                  <a 
                    href={img.processedUrl} 
                    download={`fotouau-${img.id}.png`}
                    className="flex-1 py-2 rounded-lg bg-white text-brand-dark text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
                  >
                    <Download className="w-3 h-3" />
                    Baixar
                  </a>
                  <button className="p-2 rounded-lg bg-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-32 text-center glass-card rounded-3xl border-dashed border-2 border-white/5">
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 mx-auto">
            <ImageIcon className="w-10 h-10 text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Nenhuma imagem encontrada</h3>
          <p className="text-slate-500 max-w-xs mx-auto">
            Você ainda não processou nenhuma imagem ou sua busca não retornou resultados.
          </p>
        </div>
      )}
    </div>
  );
};
