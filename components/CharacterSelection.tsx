
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
    e.target.value = ''; // Reset input
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#0d0700] flex flex-col items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      <div className="fixed inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none"></div>
      
      <input 
        type="file" 
        ref={importInputRef} 
        onChange={handleImportFile} 
        accept=".json" 
        className="hidden" 
      />

      <div className="relative z-10 w-full max-w-5xl">
        <header className="text-center mb-12">
          <h1 className="fantasy-title text-4xl md:text-7xl text-[#d4af37] drop-shadow-[0_2px_15px_rgba(212,175,55,0.4)] mb-2 uppercase tracking-widest">
            O Pergaminho
          </h1>
          <p className="cinzel text-[#e8d5b5]/60 text-xs md:text-sm tracking-widest uppercase italic">
            Seus registros e lendas eternizados
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lista de Personagens Primeiro */}
          {characters.map((char) => (
            <div 
              key={char.id}
              className="relative h-72 bg-[#fdf5e6] border-2 border-[#8b4513] rounded-2xl shadow-2xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col group cursor-pointer"
              onClick={() => onSelect(char.id)}
            >
              <button 
                onClick={(e) => handleDeleteClick(e, char.id)}
                className="absolute top-3 right-3 z-30 p-2 bg-red-900/80 text-[#fdf5e6] hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg shadow-lg border border-[#d4af37]/30"
                title="Excluir Lenda"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="h-[88%] w-full bg-[#0d0700] relative overflow-hidden">
                {char.portrait ? (
                  <img src={char.portrait} alt={char.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20">
                    <svg className="w-16 h-16 text-[#fdf5e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center bg-[#fdf5e6] px-3 py-2 relative z-10 border-t-2 border-[#8b4513]/20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
                <h3 className="fantasy-title text-base text-[#3e2723] leading-none truncate w-full text-center">
                  {char.name}
                </h3>
                <div className="cinzel text-[8px] text-[#8b4513] font-bold uppercase tracking-widest mt-0.5 opacity-80">
                  {char.class} • NVL {char.level}
                </div>
              </div>
            </div>
          ))}

          {/* Ações de Criação/Importação Depois da Lista */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={onCreate}
              className="group relative h-36 bg-[#1a0f00] border-2 border-[#8b4513]/40 rounded-2xl flex flex-col items-center justify-center transition-all hover:border-[#d4af37] hover:bg-[#2d1b0d] shadow-xl overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#8b4513]/40 flex items-center justify-center mb-2 group-hover:border-[#d4af37] group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 text-[#8b4513] group-hover:text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="cinzel font-bold text-[#8b4513] group-hover:text-[#d4af37] tracking-widest text-[10px] uppercase">Nova Ficha</span>
            </button>

            <button 
              onClick={() => importInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`group relative h-28 border-2 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-xl overflow-hidden ${
                isDragging 
                ? 'bg-[#2d1b0d] border-[#d4af37] scale-[1.02] shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                : 'bg-[#1a0f00] border-dashed border-[#8b4513]/40 hover:border-[#d4af37] hover:bg-[#2d1b0d]'
              }`}
            >
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-1.5 transition-all duration-300 ${
                isDragging 
                ? 'border-[#d4af37] scale-110 animate-pulse text-[#d4af37]' 
                : 'border-[#8b4513]/40 text-[#8b4513] group-hover:border-[#d4af37] group-hover:text-[#d4af37]'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className={`cinzel font-bold tracking-widest text-[9px] uppercase transition-colors ${
                isDragging ? 'text-[#d4af37]' : 'text-[#8b4513] group-hover:text-[#d4af37]'
              }`}>
                {isDragging ? 'Solte o Pergaminho' : 'Importar Pergaminho'}
              </span>
              
              {isDragging && (
                <div className="absolute inset-0 bg-[#d4af37]/5 pointer-events-none"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {deletingId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative max-w-md w-full bg-[#fdf5e6] border-4 border-[#8b4513] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-8 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center border-2 border-red-800 text-red-800">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="fantasy-title text-xl text-[#3e2723] mb-4 uppercase">Queimar pergaminho?</h2>
              <p className="parchment-text text-base text-[#5d4037] mb-8 leading-relaxed">
                Esta crônica será apagada para sempre das bibliotecas do reino.
              </p>
              <div className="flex gap-4">
                <button onClick={confirmDelete} className="flex-1 bg-red-800 text-white cinzel font-bold py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg active:scale-95 border-b-4 border-red-950 uppercase tracking-widest text-xs">Sim</button>
                <button onClick={cancelDelete} className="flex-1 bg-[#8b4513] text-[#fdf5e6] cinzel font-bold py-3 rounded-xl hover:bg-[#5d4037] transition-all shadow-lg active:scale-95 border-b-4 border-[#3e2723] uppercase tracking-widest text-xs">Não</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
