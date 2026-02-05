
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
    <div className="min-h-screen bg-[#0d0700] flex flex-col items-center justify-start md:justify-center p-4 py-12 md:py-24 overflow-y-auto custom-scrollbar relative">
      <div className="fixed inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none"></div>
      
      <input 
        type="file" 
        ref={importInputRef} 
        onChange={handleImportFile} 
        accept=".json" 
        className="hidden" 
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center my-auto">
        <header className="text-center mb-10 md:mb-20 px-4">
          <h1 className="fantasy-title text-4xl sm:text-6xl md:text-8xl text-[#d4af37] drop-shadow-[0_2px_20px_rgba(212,175,55,0.5)] mb-3 uppercase tracking-[0.15em] leading-tight">
            O Pergaminho
          </h1>
          <p className="cinzel text-[#e8d5b5]/70 text-[10px] md:text-base tracking-[0.3em] uppercase italic max-w-xs mx-auto md:max-w-none">
            Biblioteca de Lendas e Crônicas de Heróis
          </p>
          <div className="mt-6 flex justify-center opacity-40">
             <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
             <div className="w-2.5 h-2.5 rounded-full border-2 border-[#d4af37] mx-3 rotate-45"></div>
             <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full px-2">
          {characters.map((char) => (
            <div 
              key={char.id}
              className="relative h-72 md:h-80 bg-[#fdf5e6] border-2 border-[#8b4513] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(212,175,55,0.2)] flex flex-col group cursor-pointer"
              onClick={() => onSelect(char.id)}
            >
              <button 
                onClick={(e) => handleDeleteClick(e, char.id)}
                className="absolute top-4 right-4 z-30 p-2.5 bg-red-900/90 text-[#fdf5e6] hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl shadow-xl border border-[#d4af37]/30 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="h-[80%] w-full bg-[#0d0700] relative overflow-hidden">
                {char.portrait ? (
                  <img src={char.portrait} alt={char.name} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-15">
                    <svg className="w-20 h-20 text-[#fdf5e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#fdf5e6] to-[#f4e4bc] px-4 py-3 relative z-10 border-t-2 border-[#8b4513]/30">
                <h3 className="fantasy-title text-lg md:text-xl text-[#3e2723] leading-none truncate w-full text-center drop-shadow-sm">
                  {char.name}
                </h3>
                <div className="cinzel text-[9px] md:text-[10px] text-[#8b4513] font-bold uppercase tracking-[0.2em] mt-1.5 opacity-70">
                  {char.class} • NVL {char.level}
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-6">
            <button 
              onClick={onCreate}
              className="group relative h-36 md:h-40 bg-[#1a0f00] border-2 border-[#8b4513]/40 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 hover:border-[#d4af37] hover:bg-[#2d1b0d] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#8b4513]/40 flex items-center justify-center mb-3 group-hover:border-[#d4af37] group-hover:scale-110 group-hover:rotate-90 transition-all duration-500 bg-black/20 shadow-inner">
                <svg className="w-7 h-7 text-[#8b4513] group-hover:text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="cinzel font-bold text-[#8b4513] group-hover:text-[#d4af37] tracking-[0.3em] text-[10px] md:text-[11px] uppercase">Nova Ficha</span>
            </button>

            <button 
              onClick={() => importInputRef.current?.click()}
              className="group relative h-32 md:h-36 border-2 bg-[#1a0f00]/50 border-dashed border-[#8b4513]/40 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 hover:border-[#d4af37] hover:bg-[#1a0f00] shadow-xl overflow-hidden"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#8b4513]/30 text-[#8b4513] group-hover:border-[#d4af37] group-hover:text-[#d4af37] group-hover:translate-y-[-2px] flex items-center justify-center mb-2 transition-all duration-500 bg-black/10">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className="cinzel font-bold tracking-[0.2em] text-[9px] md:text-[10px] text-[#8b4513] group-hover:text-[#d4af37] uppercase">Importar Registro</span>
            </button>
          </div>
        </div>
      </div>

      {deletingId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-md w-full bg-[#fdf5e6] border-4 border-[#8b4513] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,1)] p-10 text-center animate-in fade-in zoom-in duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-900 rounded-full border-4 border-[#8b4513] flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="fantasy-title text-2xl text-[#3e2723] mb-6 mt-4 uppercase tracking-widest">Queimar pergaminho?</h2>
            <p className="parchment-text text-lg text-[#5d4037] mb-10 leading-relaxed italic">
              "As cinzas não guardam memórias. Esta crônica será apagada para sempre das grandes bibliotecas."
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={confirmDelete} className="flex-1 bg-gradient-to-b from-red-700 to-red-900 text-white cinzel font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] shadow-lg hover:brightness-110 active:scale-95 transition-all">Destruir</button>
              <button onClick={cancelDelete} className="flex-1 bg-gradient-to-b from-[#8b4513] to-[#3e2723] text-[#fdf5e6] cinzel font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-[10px] shadow-lg hover:brightness-110 active:scale-95 transition-all">Preservar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
