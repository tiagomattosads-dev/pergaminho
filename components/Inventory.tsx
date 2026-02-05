
import React, { useState } from 'react';
import { Character, Item } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  theme?: 'light' | 'dark';
}

const Inventory: React.FC<Props> = ({ character, updateCharacter, theme = 'light' }) => {
  const [newItem, setNewItem] = useState({ name: '', weight: 0, quantity: 1 });
  const isDark = theme === 'dark';

  const totalWeight = character.inventory.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  const carryCapacity = character.stats.FOR * 15;
  const weightPercentage = Math.min(100, (totalWeight / carryCapacity) * 100);

  // Status de encerramento baseados em regras 5e opcionais (Encumbrance)
  const isEncumbered = totalWeight > character.stats.FOR * 5;
  const isHeavilyEncumbered = totalWeight > character.stats.FOR * 10;
  const isOverLimit = totalWeight > carryCapacity;

  const addItem = () => {
    if (!newItem.name) return;
    const item: Item = {
      id: Date.now().toString(),
      name: newItem.name,
      weight: newItem.weight,
      quantity: newItem.quantity,
      description: '',
      equipped: false
    };
    updateCharacter({ inventory: [...character.inventory, item] });
    setNewItem({ name: '', weight: 0, quantity: 1 });
  };

  const removeItem = (id: string) => {
    updateCharacter({ inventory: character.inventory.filter(i => i.id !== id) });
  };

  const toggleEquip = (id: string) => {
    updateCharacter({
      inventory: character.inventory.map(i => i.id === id ? { ...i, equipped: !i.equipped } : i)
    });
  };

  const CoinSlot: React.FC<{ label: string; short: string; bg: string; borderColor: string; textColor: string }> = ({ label, short, bg, borderColor, textColor }) => (
    <div className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all group hover:scale-105 ${isDark ? 'bg-black/40 border-[#d4af37]/20 hover:border-[#d4af37]' : 'bg-[#8b4513]/5 border-[#8b4513]/20 hover:border-[#8b4513]'}`}>
      <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${bg} border-2 shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center mb-2 relative`} style={{ borderColor }}>
        <div className="absolute inset-0 rounded-full bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-20"></div>
        <span className="font-bold text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" style={{ color: textColor }}>{short}</span>
      </div>
      <input 
        type="number" 
        defaultValue={0} 
        className={`bg-transparent text-xl font-bold fantasy-title text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
      />
      <span className={`text-[8px] cinzel font-bold uppercase tracking-[0.2em] opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto pb-24">
      
      {/* SEÇÃO SUPERIOR: MOEDAS E CARGA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* BOLSA DE MOEDAS OTIMIZADA */}
        <div className={`lg:col-span-7 border-4 p-5 rounded-3xl shadow-2xl relative overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-[#fdf5e6] border-[#8b4513]/80'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
          <h2 className={`cinzel text-[10px] font-bold mb-6 tracking-[0.4em] uppercase border-b pb-2 text-center flex items-center justify-center gap-3 ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/20'}`}>
             <span className="h-px w-8 bg-current opacity-30"></span>
             Bolsa de Valores
             <span className="h-px w-8 bg-current opacity-30"></span>
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CoinSlot label="Platina" short="PL" bg="from-[#4a5568] via-[#e2e8f0] to-[#ffffff]" borderColor="#718096" textColor="#2d3748" />
            <CoinSlot label="Ouro" short="PO" bg="from-[#b8860b] via-[#ffd700] to-[#fffacd]" borderColor="#8b4513" textColor="#5d4037" />
            <CoinSlot label="Prata" short="PP" bg="from-[#2d3748] via-[#cbd5e0] to-[#ffffff]" borderColor="#4a5568" textColor="#2d3748" />
            <CoinSlot label="Cobre" short="PC" bg="from-[#5d4037] via-[#a16207] to-[#fef3c7]" borderColor="#5d4037" textColor="#3e2723" />
          </div>
        </div>

        {/* MEDIDOR DE CARGA REESTILIZADO */}
        <div className={`lg:col-span-5 border-4 p-5 rounded-3xl shadow-2xl flex flex-col justify-between relative overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-[#333]' : 'bg-[#fdf5e6] border-[#8b4513]/80'}`}>
          <div className="flex justify-between items-center mb-3">
             <div className="flex flex-col">
               <h2 className={`cinzel text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Capacidade de Carga</h2>
               <span className={`text-[8px] cinzel font-bold uppercase opacity-50 ${isOverLimit ? 'text-red-500' : ''}`}>
                 {isOverLimit ? 'Sobrecarregado!' : isHeavilyEncumbered ? 'Carga Pesada' : isEncumbered ? 'Carga Leve' : 'Carga Normal'}
               </span>
             </div>
             <div className="text-right">
                <span className={`text-3xl font-bold fantasy-title ${isOverLimit ? 'text-red-500 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]')}`}>
                  {totalWeight.toFixed(1)}
                </span>
                <span className={`text-[10px] cinzel font-bold ml-1 opacity-30 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>/ {carryCapacity} KG</span>
             </div>
          </div>
          
          <div className={`relative h-5 w-full rounded-xl border-2 overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] ${isDark ? 'bg-black/60 border-white/5' : 'bg-black/20 border-[#8b4513]/40'}`}>
            <div 
              className={`h-full transition-all duration-1000 ease-out relative ${isOverLimit ? 'bg-gradient-to-r from-red-900 via-red-500 to-red-900' : 'bg-gradient-to-r from-[#5d4037] via-[#d4af37] to-[#5d4037]'}`}
              style={{ width: `${weightPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
              <div className="absolute top-0 right-0 w-2 h-full bg-white/40 blur-[2px]"></div>
            </div>
            {/* Marcadores de Regra 5e */}
            <div className="absolute top-0 left-1/3 w-0.5 h-full bg-white/10" title="Limite de Encerramento (5x FOR)"></div>
            <div className="absolute top-0 left-2/3 w-0.5 h-full bg-white/10" title="Limite Pesado (10x FOR)"></div>
          </div>
          <p className={`text-[9px] parchment-text italic mt-4 text-center opacity-60 leading-tight ${isDark ? 'text-[#e8d5b5]' : 'text-[#8b4513]'}`}>
             "Um passo leve poupa mil léguas de cansaço."
          </p>
        </div>
      </div>

      {/* REGISTRO DE ITENS - MESA DE ESCRIVÃO */}
      <div className={`border-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col relative overflow-hidden ${isDark ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
        
        {/* FORMULÁRIO DE ADIÇÃO "NOTAS DO MESTRE" */}
        <div className={`border-b-4 p-6 ${isDark ? 'bg-white/5 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            <div className="md:col-span-6 flex flex-col">
              <label className={`cinzel text-[9px] font-bold uppercase mb-2 tracking-[0.2em] opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Novo Item no Registro</label>
              <input 
                placeholder="Ex: Espada Longa, Ração de Viagem..."
                className={`border-2 rounded-xl p-3 focus:border-[#d4af37] outline-none parchment-text text-lg transition-all shadow-inner ${
                  isDark 
                    ? 'bg-black/40 border-white/5 text-[#f4e4bc] placeholder:text-white/10' 
                    : 'bg-white/80 border-[#8b4513]/30 text-[#3e2723] placeholder:text-[#8b4513]/30'
                }`}
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className={`cinzel text-[9px] font-bold uppercase mb-2 text-center tracking-[0.2em] opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Peso (kg)</label>
              <input 
                type="number"
                step="0.1"
                className={`border-2 rounded-xl p-3 text-center outline-none font-bold fantasy-title text-xl transition-all shadow-inner ${
                  isDark 
                    ? 'bg-black/40 border-white/5 text-[#e8d5b5] focus:border-[#d4af37]' 
                    : 'bg-white/80 border-[#8b4513]/30 text-[#3e2723] focus:border-[#8b4513]'
                }`}
                value={newItem.weight || ''}
                onChange={e => setNewItem({...newItem, weight: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className={`cinzel text-[9px] font-bold uppercase mb-2 text-center tracking-[0.2em] opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Qtd.</label>
              <input 
                type="number"
                className={`border-2 rounded-xl p-3 text-center outline-none font-bold fantasy-title text-xl transition-all shadow-inner ${
                  isDark 
                    ? 'bg-black/40 border-white/5 text-[#e8d5b5] focus:border-[#d4af37]' 
                    : 'bg-white/80 border-[#8b4513]/30 text-[#3e2723] focus:border-[#8b4513]'
                }`}
                value={newItem.quantity || ''}
                onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="md:col-span-2">
              <button 
                onClick={addItem} 
                className={`w-full h-14 rounded-2xl cinzel text-xs font-bold transition-all shadow-xl active:translate-y-1 active:shadow-md uppercase tracking-[0.2em] border-b-4 border-black/50 ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#d4af37] to-[#8b4513] text-[#1a0f00] hover:brightness-110' 
                    : 'bg-gradient-to-b from-[#8b4513] to-[#3e2723] text-[#fdf5e6] hover:brightness-110'
                }`}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>

        {/* LISTA ESTILO "PERGAMINHO DE CONTA" */}
        <div className="p-0 flex flex-col relative">
          {/* Cabeçalho da Tabela */}
          <div className={`grid grid-cols-12 gap-2 p-4 border-b-2 cinzel text-[9px] font-bold uppercase tracking-[0.3em] ${
            isDark ? 'bg-black/40 border-white/5 text-[#d4af37]' : 'bg-[#8b4513]/10 border-[#8b4513]/20 text-[#8b4513]'
          }`}>
            <div className="col-span-1 text-center">Qtd</div>
            <div className="col-span-7 pl-6">Descrição do Item</div>
            <div className="col-span-2 text-center">Peso Tot.</div>
            <div className="col-span-2 text-right pr-6">Ações</div>
          </div>

          <div className="flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar">
            {character.inventory.length === 0 ? (
              <div className="py-24 text-center flex flex-col items-center opacity-10">
                 <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                 <span className="cinzel text-base font-bold uppercase tracking-[0.4em]">Baú de Viagem Vazio</span>
              </div>
            ) : (
              character.inventory.map((item) => (
                <div 
                  key={item.id} 
                  className={`grid grid-cols-12 items-center gap-2 p-5 border-b transition-all group relative ${
                    isDark ? 'border-white/5 hover:bg-white/5' : 'border-[#8b4513]/10 hover:bg-[#8b4513]/5'
                  } ${item.equipped ? (isDark ? 'bg-[#d4af37]/5' : 'bg-[#d4af37]/5') : 'bg-transparent'}`}
                >
                  <div className="col-span-1 flex justify-center">
                    <span className={`fantasy-title text-2xl drop-shadow-sm ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{item.quantity}</span>
                  </div>

                  <div className="col-span-7 pl-6 flex items-center gap-4">
                    {/* Botão Equipar Estilo Selo de Cera */}
                    <button 
                      onClick={() => toggleEquip(item.id)}
                      className={`relative w-6 h-6 rounded-full border-2 transition-all duration-500 shadow-md flex items-center justify-center ${
                        item.equipped 
                          ? 'bg-gradient-to-tr from-[#8b4513] to-[#d4af37] border-[#fffacd] scale-125 shadow-[0_0_10px_rgba(212,175,55,0.6)] rotate-12' 
                          : 'bg-black/20 border-[#8b4513]/40 grayscale hover:grayscale-0 hover:scale-110'
                      }`}
                      title={item.equipped ? "Remover do Uso" : "Equipar para Uso"}
                    >
                      {item.equipped && <div className="w-1.5 h-1.5 bg-white/80 rounded-full animate-pulse"></div>}
                    </button>
                    
                    <div className="flex flex-col min-w-0">
                      <span className={`parchment-text text-lg font-bold transition-all truncate ${
                        item.equipped 
                          ? (isDark ? 'text-[#f4e4bc] drop-shadow-sm' : 'text-[#8b4513]') 
                          : (isDark ? 'text-[#e8d5b5]/70' : 'text-[#3e2723]/80')
                      }`}>
                        {item.name}
                      </span>
                      {item.equipped && (
                        <div className="flex items-center gap-1">
                          <span className={`text-[7px] cinzel font-bold uppercase tracking-[0.2em] px-1.5 py-0.5 rounded-sm bg-[#d4af37] text-[#1a0f00]`}>Equipado</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 text-center flex flex-col">
                    <span className={`text-lg font-bold fantasy-title ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                      {(item.weight * item.quantity).toFixed(1)} <span className="text-[10px] cinzel">KG</span>
                    </span>
                    <span className={`text-[8px] cinzel uppercase tracking-widest opacity-40 leading-none ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                      {item.weight} <span className="opacity-50">unit.</span>
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-end pr-6 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className={`p-2.5 transition-all rounded-xl border border-transparent hover:border-red-500/50 ${isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-800 hover:bg-red-100'}`}
                      title="Lançar Fora do Registro"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Decoração Lateral de Ledger */}
        <div className={`absolute top-0 bottom-0 right-0 w-2 opacity-10 pointer-events-none bg-repeat-y bg-[url('https://www.transparenttextures.com/patterns/leather.png')]`}></div>
      </div>
    </div>
  );
};

export default Inventory;
