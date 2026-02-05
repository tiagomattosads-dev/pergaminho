
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

  return (
    <div className="flex flex-col gap-8 p-2 sm:p-4 max-w-5xl mx-auto pb-20">
      
      {/* SEÇÃO SUPERIOR: MOEDAS E CARGA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* MOEDAS (BOLSA DE VALORES) */}
        <div className={`border-2 p-5 rounded-2xl shadow-xl relative overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
          <h2 className={`cinzel text-xs font-bold mb-8 tracking-[0.2em] uppercase border-b pb-2 text-center ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/20'}`}>Bolsa de Moedas</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Platina', short: 'PL', bg: 'from-[#708090] via-[#e2e8f0] to-[#ffffff]', border: '#4a5568', text: '#2d3748' },
              { label: 'Ouro', short: 'PO', bg: 'from-[#b8860b] via-[#ffd700] to-[#fffacd]', border: '#8b4513', text: '#8b4513' },
              { label: 'Prata', short: 'PP', bg: 'from-[#4a5568] via-[#cbd5e0] to-[#f7fafc]', border: '#4a5568', text: '#2d3748' },
              { label: 'Cobre', short: 'PC', bg: 'from-[#5d4037] via-[#a16207] to-[#fef3c7]', border: '#5d4037', text: '#3e2723' }
            ].map((coin) => (
              <div key={coin.label} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${coin.bg} border-2 shadow-lg flex items-center justify-center mb-2 group transition-transform hover:scale-110`} style={{ borderColor: coin.border }}>
                  <span className="font-bold text-lg drop-shadow-sm" style={{ color: coin.text }}>{coin.short}</span>
                </div>
                <input 
                  type="number" 
                  defaultValue={0} 
                  className={`bg-transparent text-xl font-bold fantasy-title text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
                />
                <span className={`text-[9px] cinzel font-bold uppercase tracking-widest opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{coin.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MEDIDOR DE CARGA (CAPACIDADE) */}
        <div className={`border-2 p-5 rounded-2xl shadow-xl flex flex-col justify-between ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
          <div className="flex justify-between items-center mb-4">
             <h2 className={`cinzel text-xs font-bold tracking-[0.15em] uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Carga Total</h2>
             <div className="text-right">
                <span className={`text-2xl font-bold fantasy-title ${totalWeight > carryCapacity ? 'text-red-500 animate-pulse' : (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]')}`}>
                  {totalWeight.toFixed(1)}
                </span>
                <span className={`text-xs cinzel font-bold ml-1 opacity-40 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>/ {carryCapacity} KG</span>
             </div>
          </div>
          
          <div className={`relative h-6 w-full rounded-full border overflow-hidden shadow-inner ${isDark ? 'bg-black/40 border-white/5' : 'bg-black/10 border-[#8b4513]/30'}`}>
            <div 
              className={`h-full transition-all duration-700 relative ${totalWeight > carryCapacity ? 'bg-red-600' : 'bg-gradient-to-r from-[#8b4513] to-[#d4af37]'}`}
              style={{ width: `${weightPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
            </div>
          </div>
          <p className={`text-[9px] parchment-text italic mt-3 text-center opacity-70 ${isDark ? 'text-[#e8d5b5]' : 'text-[#8b4513]'}`}>
            "Sua jornada depende do que você carrega."
          </p>
        </div>
      </div>

      {/* REGISTRO DE ITENS (INVENTÁRIO) */}
      <div className={`border-2 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
        {/* Formulário de Adição Rápida */}
        <div className={`border-b-2 p-5 ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#8b4513]/5 border-[#8b4513]/20'}`}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6 flex flex-col">
              <label className={`cinzel text-[9px] font-bold uppercase mb-1 tracking-widest opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Nome do Item</label>
              <input 
                placeholder="Ex: Poção de Cura, Mochila..."
                className={`border-2 rounded-lg p-2 focus:border-[#d4af37] outline-none parchment-text font-bold transition-all ${
                  isDark 
                    ? 'bg-black/40 border-white/5 text-[#e8d5b5] placeholder:text-white/20' 
                    : 'bg-white/70 border-[#8b4513]/30 text-[#3e2723] placeholder:text-[#8b4513]/40'
                }`}
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className={`cinzel text-[9px] font-bold uppercase mb-1 text-center tracking-widest opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Peso (KG)</label>
              <input 
                type="number"
                placeholder="0.0"
                className={`border-2 rounded-lg p-2 text-center outline-none font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  isDark 
                    ? 'bg-black/40 border-white/5 text-[#e8d5b5] focus:border-[#d4af37]' 
                    : 'bg-white/70 border-[#8b4513]/30 text-[#3e2723] focus:border-[#8b4513]'
                }`}
                value={newItem.weight || ''}
                onChange={e => setNewItem({...newItem, weight: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className={`cinzel text-[9px] font-bold uppercase mb-1 text-center tracking-widest opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Qtd.</label>
              <input 
                type="number"
                placeholder="1"
                className={`border-2 rounded-lg p-2 text-center outline-none font-bold ${
                  isDark 
                    ? 'bg-black/40 border-white/5 text-[#e8d5b5] focus:border-[#d4af37]' 
                    : 'bg-white/70 border-[#8b4513]/30 text-[#3e2723] focus:border-[#8b4513]'
                }`}
                value={newItem.quantity || ''}
                onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="md:col-span-2">
              <button 
                onClick={addItem} 
                className={`w-full h-10 rounded-lg cinzel text-[11px] font-bold transition-all shadow-lg active:scale-95 uppercase tracking-widest border-b-4 ${
                  isDark 
                    ? 'bg-[#d4af37] text-[#1a1a1a] border-black/60 hover:bg-[#b8860b]' 
                    : 'bg-[#8b4513] text-[#fdf5e6] border-[#3e2723] hover:bg-[#5d4037]'
                }`}
              >
                Registrar
              </button>
            </div>
          </div>
        </div>

        {/* Lista Estilo Ledger */}
        <div className="p-0 flex flex-col">
          <div className={`grid grid-cols-12 gap-2 p-3 border-b cinzel text-[10px] font-bold uppercase tracking-[0.2em] ${
            isDark ? 'bg-white/5 border-white/10 text-[#d4af37]' : 'bg-[#8b4513]/10 border-[#8b4513]/20 text-[#8b4513]'
          }`}>
            <div className="col-span-1 text-center">Qtd</div>
            <div className="col-span-7 pl-4">Descrição do Item</div>
            <div className="col-span-2 text-center">Peso (U/T)</div>
            <div className="col-span-2 text-right pr-4">Ações</div>
          </div>

          <div className="flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
            {character.inventory.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center opacity-20 grayscale">
                 <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                 <span className="cinzel text-xs font-bold uppercase tracking-widest">Mochila Vazia</span>
              </div>
            ) : (
              character.inventory.map((item) => (
                <div 
                  key={item.id} 
                  className={`grid grid-cols-12 items-center gap-2 p-4 border-b transition-colors group relative ${
                    isDark ? 'border-white/5 hover:bg-white/5' : 'border-[#8b4513]/10 hover:bg-[#8b4513]/10'
                  } ${item.equipped ? (isDark ? 'bg-white/10' : 'bg-[#8b4513]/5') : 'bg-transparent'}`}
                >
                  <div className="col-span-1 flex justify-center">
                    <span className={`fantasy-title text-xl ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{item.quantity}</span>
                  </div>

                  <div className="col-span-7 pl-4 flex items-center gap-3">
                    <button 
                      onClick={() => toggleEquip(item.id)}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${
                        item.equipped 
                          ? (isDark ? 'bg-[#d4af37] border-[#d4af37]' : 'bg-[#8b4513] border-[#8b4513]') 
                          : (isDark ? 'border-white/20 hover:border-[#d4af37]' : 'border-[#8b4513]/30 hover:border-[#8b4513]')
                      }`}
                      title={item.equipped ? "Desequipar" : "Equipar"}
                    />
                    <div className="flex flex-col">
                      <span className={`parchment-text text-base font-bold transition-all ${
                        item.equipped 
                          ? (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]') 
                          : (isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]')
                      }`}>
                        {item.name}
                      </span>
                      {item.equipped && <span className={`text-[8px] cinzel font-bold uppercase tracking-tighter opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Em Uso</span>}
                    </div>
                  </div>

                  <div className="col-span-2 text-center flex flex-col">
                    <span className={`text-sm font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{item.weight * item.quantity}kg</span>
                    <span className={`text-[9px] cinzel uppercase tracking-widest opacity-40 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{item.weight}u</span>
                  </div>

                  <div className="col-span-2 flex justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className={`p-2 transition-all rounded-lg ${isDark ? 'text-red-400 hover:bg-white/5' : 'text-red-800 hover:bg-red-100'}`}
                      title="Descartar Item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Moldura Decorativa do Ledger */}
        <div className={`absolute top-0 bottom-0 left-0 w-1 opacity-30 ${isDark ? 'bg-gradient-to-b from-transparent via-[#d4af37] to-transparent' : 'bg-gradient-to-b from-[#8b4513] via-[#d4af37] to-[#8b4513]'}`}></div>
      </div>
    </div>
  );
};

export default Inventory;
