
import React from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const Settings: React.FC<Props> = ({ character, updateCharacter }) => {
  
  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${character.name.replace(/\s+/g, '_')}_cronica.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex flex-col gap-10 p-4 sm:p-10 max-w-4xl mx-auto pb-24">
      
      <header className="text-center">
        <h2 className="fantasy-title text-4xl text-[#3e2723] mb-2 uppercase tracking-widest">Oficina de Crônicas</h2>
        <div className="w-24 h-1 bg-[#8b4513] mx-auto rounded-full"></div>
        <p className="cinzel text-[10px] text-[#8b4513]/60 uppercase font-bold mt-4 tracking-[0.2em]">Gerencie os registros do seu herói</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* EXPORTAR */}
        <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-8 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b4513]/20 to-transparent"></div>
          
          <div className="w-16 h-16 rounded-full bg-[#8b4513]/10 flex items-center justify-center mb-6 border-2 border-[#8b4513]/20 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-[#8b4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h3 className="cinzel text-sm font-bold text-[#3e2723] uppercase mb-4 tracking-widest">Arquivar Lenda</h3>
          <p className="parchment-text text-sm text-[#5d4037]/70 mb-8 leading-relaxed">
            Gere um pergaminho sagrado (arquivo .json) contendo todos os feitos, itens e magias de <b>{character.name}</b> para guardar ou levar a outro mestre.
          </p>
          
          <button 
            onClick={handleExport}
            className="w-full bg-[#8b4513] text-[#fdf5e6] cinzel font-bold py-4 rounded-xl hover:bg-[#5d4037] transition-all shadow-lg active:scale-95 border-b-4 border-[#3e2723] uppercase tracking-widest text-xs"
          >
            Selar e Exportar
          </button>
        </div>

        {/* NOTAS TÉCNICAS */}
        <div className="bg-[#fdf5e6] border-2 border-[#8b4513]/20 p-8 rounded-2xl shadow-inner flex flex-col items-center text-center opacity-80">
          <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-[#8b4513]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="cinzel text-sm font-bold text-[#3e2723]/60 uppercase mb-4 tracking-widest">Biblioteca Local</h3>
          <p className="parchment-text text-sm text-[#5d4037]/60 mb-6 leading-relaxed italic">
            "Suas crônicas são salvas automaticamente nos cofres mágicos do seu navegador (LocalStorage). Nenhuma informação sai deste dispositivo sem seu consentimento explícito."
          </p>
          <div className="text-[10px] cinzel font-bold text-[#8b4513]/40 uppercase tracking-tighter">
            Versão do Grimório: 1.2.0 - Arcano
          </div>
        </div>
      </div>

      {/* RODAPÉ DECORATIVO */}
      <div className="mt-10 py-6 border-t border-[#8b4513]/10 flex justify-center">
         <div className="flex gap-4 opacity-20 grayscale">
            <svg className="w-10 h-10 text-[#8b4513]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            <svg className="w-10 h-10 text-[#8b4513]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            <svg className="w-10 h-10 text-[#8b4513]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
         </div>
      </div>
    </div>
  );
};

export default Settings;
