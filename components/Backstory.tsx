import React, { useRef } from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onImageUpload: (file: File) => void;
}

const Backstory: React.FC<Props> = ({ character, updateCharacter, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4">
       <input 
         type="file" 
         ref={fileInputRef} 
         className="hidden" 
         accept="image/*" 
         onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])}
       />

       {/* RETRATO & TRAÇOS */}
       <div className="lg:col-span-4 space-y-6">
          <div 
            className="bg-[#fdf5e6] border-2 border-[#8b4513] p-2 rounded-lg shadow-xl aspect-square relative overflow-hidden group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {character.portrait ? (
              <img src={character.portrait} alt="Portrait" className="w-full h-full object-cover rounded shadow-inner" />
            ) : (
              <div className="w-full h-full bg-orange-100 flex flex-col items-center justify-center cinzel text-xs italic text-center p-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
                 Clique para carregar o retrato do seu herói
              </div>
            )}
            <button 
                className="absolute bottom-2 right-2 bg-[#8b4513] text-[#fdf5e6] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110 z-10"
                title="Novo Retrato"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
          </div>

          <div className="space-y-4">
             <div className="bg-[#fdf5e6] border border-[#8b4513] p-4 rounded shadow relative">
                <span className="absolute -top-3 left-4 bg-[#fdf5e6] px-2 cinzel text-[10px] font-bold text-[#8b4513] uppercase tracking-wider">Personalidade</span>
                <textarea 
                  value={character.personality}
                  onChange={(e) => updateCharacter({ personality: e.target.value })}
                  className="w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar"
                  rows={3}
                />
             </div>
             <div className="bg-[#fdf5e6] border border-[#8b4513] p-4 rounded shadow relative">
                <span className="absolute -top-3 left-4 bg-[#fdf5e6] px-2 cinzel text-[10px] font-bold text-[#8b4513] uppercase tracking-wider">Ideais</span>
                <textarea 
                  value={character.ideals}
                  onChange={(e) => updateCharacter({ ideals: e.target.value })}
                  className="w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar"
                  rows={2}
                />
             </div>
             <div className="bg-[#fdf5e6] border border-[#8b4513] p-4 rounded shadow relative">
                <span className="absolute -top-3 left-4 bg-[#fdf5e6] px-2 cinzel text-[10px] font-bold text-[#8b4513] uppercase tracking-wider">Vínculos</span>
                <textarea 
                  value={character.bonds}
                  onChange={(e) => updateCharacter({ bonds: e.target.value })}
                  className="w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar"
                  rows={2}
                />
             </div>
             <div className="bg-[#fdf5e6] border border-[#8b4513] p-4 rounded shadow relative">
                <span className="absolute -top-3 left-4 bg-[#fdf5e6] px-2 cinzel text-[10px] font-bold text-[#8b4513] uppercase tracking-wider">Defeitos</span>
                <textarea 
                  value={character.flaws}
                  onChange={(e) => updateCharacter({ flaws: e.target.value })}
                  className="w-full bg-transparent parchment-text text-sm italic pt-2 leading-relaxed focus:outline-none resize-none custom-scrollbar"
                  rows={2}
                />
             </div>
          </div>
       </div>

       {/* HISTÓRIA */}
       <div className="lg:col-span-8 bg-[#fdf5e6] border-2 border-[#8b4513] p-8 rounded-lg shadow-xl relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
          <h2 className="fantasy-title text-3xl mb-6 text-[#5d4037] border-b-2 border-[#8b4513]/30 pb-2 flex justify-between items-center relative z-10">
            História de {character.name.split(' ')[0]}
          </h2>
          <textarea 
            value={character.backstory}
            onChange={(e) => updateCharacter({ backstory: e.target.value })}
            className="w-full bg-transparent parchment-text text-lg leading-relaxed text-justify focus:outline-none resize-none min-h-[500px] relative z-10 custom-scrollbar pr-2"
            placeholder="Escreva sua lenda aqui..."
          />
          <div className="mt-8 pt-8 border-t-2 border-[#8b4513]/10 relative z-10">
             <h3 className="cinzel font-bold text-[#8b4513] mb-4 uppercase text-xs tracking-widest">Notas do Mestre / Tesouros Adicionais</h3>
             <div className="p-4 bg-orange-100/30 rounded-lg border-2 border-dashed border-[#8b4513]/20">
                <textarea 
                  placeholder="Anotações extras..."
                  className="w-full bg-transparent cinzel italic text-sm focus:outline-none resize-none opacity-60 custom-scrollbar"
                  rows={4}
                />
             </div>
          </div>
       </div>
    </div>
  );
};

export default Backstory;