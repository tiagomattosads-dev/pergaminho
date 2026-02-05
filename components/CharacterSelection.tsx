
import React, { useState, useRef } from 'react';
import { Character } from '../types';

interface Props {
  characters: Character[];
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  onImport: (char: Character) => void;
}

const CharacterSelection: React.FC<Props> = ({ characters, onSelect, onCreate, onDelete, onImport }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId) {
      onDelete(deletingId);
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const processFile = (file: File) => {
    if (!file.name.endsWith('.json')) {
      alert("Apenas pergaminhos sagrados (.json) são aceitos na biblioteca.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const char = JSON.parse(event.target?.result as string);
        if (char && char.name) {
          onImport(char);
        } else {
          alert("Arquivo inválido. Formato de pergaminho não reconhecido.");
        }
      } catch (err) {
        alert("Erro ao ler arquivo. Certifique-se de que é um JSON válido.");
      }
    };
    reader.readAsText(file);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = ''; 
  };

  return (
    <div className="min-h-screen bg-[#0d0700] flex flex-col items-center p-4 py-10 md:py-20 overflow-y-auto custom-scrollbar relative">
      <div className="fixed inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none"></div>
      
      <input 
        type="file" 
        ref={importInputRef} 
        onChange={handleImportFile} 
        accept=".json" 
        className="hidden" 
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        <header className="text-center mb-8 md:mb-16 px-4">
          <h1 className="fantasy-title text-3xl sm:text-5xl md:text-7xl text-[#d4af37] drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] mb-2 uppercase tracking-widest leading-tight">
            O Pergaminho
          </h1>
          <p className="cinzel text-[#e8d5b5]/60 text-[10px] md:text-sm tracking-widest uppercase italic max-w-xs mx-auto md:max-w-none">
            Seus registros e lendas eternizados
          </p>
          <div className="mt-4 flex justify-center opacity-30">
             <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
             <div className="w-2 h-2 rounded-full border border-[#d4af37] mx-2"></div>
             <div className="h-px w-12 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {characters.map((char) => (
            <div 
              key={char.id}
              className="relative h-64 md:h-72 bg-[#fdf5e6] border-2 border-[#8b4513] rounded-2xl shadow-2xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col group cursor-pointer"
              onClick={() => onSelect(char.id)}
            >
              <button 
                onClick={(e) => handleDeleteClick(e, char.id)}
                className="absolute top-3 right-3 z-30 p-2 bg-red-900/80 text-[#fdf5e6] hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg shadow-lg border border-[#d4af37]/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="h-[82%] w-full bg-[#0d0700] relative overflow-hidden">
                {char.portrait ? (
                  <img src={char.portrait} alt={char.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <svg className="w-16 h-16 text-[#fdf5e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center bg-[#fdf5e6] px-3 py-2 relative z-10 border-t-2 border-[#8b4513]/20">
                <h3 className="fantasy-title text-base text-[#3e2723] leading-none truncate w-full text-center">
                  {char.name}
                </h3>
                <div className="cinzel text-[8px] text-[#8b4513] font-bold uppercase tracking-widest mt-0.5 opacity-80">
                  {char.class} • NVL {char.level}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <button 
              onClick={onCreate}
              className="group relative h-32 md:h-36 bg-[#1a0f00] border-2 border-[#8b4513]/40 rounded-2xl flex flex-col items-center justify-center transition-all hover:border-[#d4af37] hover:bg-[#2d1b0d] shadow-xl overflow-hidden"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#8b4513]/40 flex items-center justify-center mb-2 group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-[#8b4513] group-hover:text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="cinzel font-bold text-[#8b4513] group-hover:text-[#d4af37] tracking-widest text-[9px] md:text-[10px] uppercase">Nova Ficha</span>
            </button>

            <button 
              onClick={() => importInputRef.current?.click()}
              className="group relative h-28 border-2 bg-[#1a0f00] border-dashed border-[#8b4513]/40 rounded-2xl flex flex-col items-center justify-center transition-all hover:border-[#d4af37] hover:bg-[#2d1b0d] shadow-xl overflow-hidden"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#8b4513]/40 text-[#8b4513] group-hover:border-[#d4af37] group-hover:text-[#d4af37] flex items-center justify-center mb-1.5 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className="cinzel font-bold tracking-widest text-[8px] md:text-[9px] text-[#8b4513] group-hover:text-[#d4af37] uppercase">Importar Pergaminho</span>
            </button>
          </div>
        </div>
      </div>

      {deletingId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-[#fdf5e6] border-4 border-[#8b4513] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 text-center">
            <h2 className="fantasy-title text-xl text-[#3e2723] mb-4 uppercase">Queimar pergaminho?</h2>
            <p className="parchment-text text-base text-[#5d4037] mb-8 leading-relaxed">
              Esta crônica será apagada para sempre das bibliotecas do reino.
            </p>
            <div className="flex gap-4">
              <button onClick={confirmDelete} className="flex-1 bg-red-800 text-white cinzel font-bold py-3 rounded-xl uppercase tracking-widest text-xs">Sim</button>
              <button onClick={cancelDelete} className="flex-1 bg-[#8b4513] text-[#fdf5e6] cinzel font-bold py-3 rounded-xl uppercase tracking-widest text-xs">Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
