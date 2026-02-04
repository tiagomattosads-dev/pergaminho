
import React, { useState } from 'react';
import { Character, Item } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const Inventory: React.FC<Props> = ({ character, updateCharacter }) => {
  const [newItem, setNewItem] = useState({ name: '', weight: 0, quantity: 1 });

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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* MOEDAS (BOLSA DE VALORES) */}
        <div className="lg:col-span-7 bg-[#fdf5e6] border-2 border-[#8b4513] p-5 rounded-2xl shadow-xl relative overflow-hidden">
          <h2 className="cinzel text-[11px] font-bold text-[#8b4513] mb-6 tracking-widest uppercase border-b border-[#8b4513]/20 pb-1">Bolsa de Moedas</h2>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Ouro */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#b8860b] via-[#ffd700] to-[#fffacd] border-2 border-[#8b4513] shadow-lg flex items-center justify-center mb-2 group transition-transform hover:scale-110">
                <span className="text-[#8b4513] font-bold text-lg drop-shadow-sm">GP</span>
              </div>
              <input 
                type="number" 
                defaultValue={15} 
                className="bg-transparent text-xl font-bold fantasy-title text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
              <span className="text-[8px] cinzel font-bold text-[#8b4513]/60 uppercase">Peças de Ouro</span>
            </div>

            {/* Prata */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#708090] via-[#c0c0c0] to-[#f5f5f5] border-2 border-[#4a5568] shadow-lg flex items-center justify-center mb-2 group transition-transform hover:scale-110">
                <span className="text-[#2d3748] font-bold text-lg drop-shadow-sm">SP</span>
              </div>
              <input 
                type="number" 
                defaultValue={0} 
                className="bg-transparent text-xl font-bold fantasy-title text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
              <span className="text-[8px] cinzel font-bold text-[#8b4513]/60 uppercase">Peças de Prata</span>
            </div>

            {/* Cobre */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#8b4513] via-[#cd7f32] to-[#ffebcd] border-2 border-[#5d4037] shadow-lg flex items-center justify-center mb-2 group transition-transform hover:scale-110">
                <span className="text-[#3e2723] font-bold text-lg drop-shadow-sm">CP</span>
              </div>
              <input 
                type="number" 
                defaultValue={0} 
                className="bg-transparent text-xl font-bold fantasy-title text-center w-full focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
              />
              <span className="text-[8px] cinzel font-bold text-[#8b4513]/60 uppercase">Peças de Cobre</span>
            </div>
          </div>
        </div>

        {/* MEDIDOR DE CARGA (CAPACIDADE) */}
        <div className="lg:col-span-5 bg-[#fdf5e6] border-2 border-[#8b4513] p-5 rounded-2xl shadow-xl flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-4">
             <h2 className="cinzel text-[11px] font-bold text-[#8b4513] tracking-widest uppercase">Encumbramento</h2>
             <div className="text-right">
                <span className={`text-2xl font-bold fantasy-title ${totalWeight > carryCapacity ? 'text-red-700 animate-pulse' : 'text-[#8b4513]'}`}>
                  {totalWeight.toFixed(1)}
                </span>
                <span className="text-xs cinzel font-bold text-[#8b4513]/40 ml-1">/ {carryCapacity} KG</span>
             </div>
          </div>
          
          <div className="relative h-6 w-full bg-black/10 rounded-full border border-[#8b4513]/30 overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-700 relative ${totalWeight > carryCapacity ? 'bg-red-700' : 'bg-gradient-to-r from-[#8b4513] to-[#d4af37]'}`}
              style={{ width: `${weightPercentage}%` }}
            >
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
            </div>
          </div>
          <p className="text-[9px] parchment-text italic text-[#8b4513]/70 mt-3 text-center">
            "Um fardo pesado diminui o passo do caçador."
          </p>
        </div>
      </div>

      {/* REGISTRO DE ITENS (INVENTÁRIO) */}
      <div className="bg-[#fdf5e6] border-2 border-[#8b4513] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden">
        {/* Formulário de Adição Rápida */}
        <div className="bg-[#8b4513]/5 border-b-2 border-[#8b4513]/20 p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6 flex flex-col">
              <label className="cinzel text-[8px] font-bold text-[#8b4513] uppercase mb-1">Nome do Item</label>
              <input 
                placeholder="Ex: Poção de Cura, Corda de Cânhamo..."
                className="bg-white/70 border-2 border-[#8b4513]/30 rounded-lg p-2 focus:border-[#8b4513] outline-none parchment-text font-bold text-[#3e2723] placeholder:text-[#8b4513]/70 placeholder:italic placeholder:font-normal"
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="cinzel text-[8px] font-bold text-[#8b4513] uppercase mb-1 text-center">Peso (KG)</label>
              <input 
                type="number"
                placeholder="0.0"
                className="bg-white/70 border-2 border-[#8b4513]/30 rounded-lg p-2 text-center focus:border-[#8b4513] outline-none font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-[#8b4513]/50"
                value={newItem.weight || ''}
                onChange={e => setNewItem({...newItem, weight: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="md:col-span-2 flex flex-col">
              <label className="cinzel text-[8px] font-bold text-[#8b4513] uppercase mb-1 text-center">Qtd.</label>
              <input 
                type="number"
                placeholder="1"
                className="bg-white/70 border-2 border-[#8b4513]/30 rounded-lg p-2 text-center focus:border-[#8b4513] outline-none font-bold placeholder:text-[#8b4513]/50"
                value={newItem.quantity || ''}
                onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
              />
            </div>
            <div className="md:col-span-2">
              <button 
                onClick={addItem} 
                className="w-full h-10 bg-[#8b4513] text-[#fdf5e6] rounded-lg cinzel text-[10px] font-bold hover:bg-[#5d4037] transition-all shadow-lg active:scale-95 uppercase tracking-widest border-b-4 border-[#3e2723]"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>

        {/* Lista Estilo Ledger */}
        <div className="p-0 flex flex-col">
          <div className="grid grid-cols-12 gap-2 p-3 border-b border-[#8b4513]/20 bg-[#8b4513]/10 cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest">
            <div className="col-span-1 text-center">Qtd</div>
            <div className="col-span-7 pl-4">Descrição do Item</div>
            <div className="col-span-2 text-center">Peso (U/T)</div>
            <div className="col-span-2 text-right pr-4">Ações</div>
          </div>

          <div className="flex flex-col max-h-[600px] overflow-y-auto custom-scrollbar">
            {character.inventory.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center opacity-30 grayscale">
                 <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                 <span className="cinzel text-xs font-bold uppercase tracking-widest">Mochila Vazia</span>
              </div>
            ) : (
              character.inventory.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`grid grid-cols-12 items-center gap-2 p-4 border-b border-[#8b4513]/10 transition-colors group relative ${item.equipped ? 'bg-[#8b4513]/5' : 'bg-transparent'} hover:bg-[#8b4513]/10`}
                >
                  {/* Quantidade */}
                  <div className="col-span-1 flex justify-center">
                    <span className="fantasy-title text-xl text-[#8b4513]">{item.quantity}</span>
                  </div>

                  {/* Nome e Toggle Equipar */}
                  <div className="col-span-7 pl-4 flex items-center gap-3">
                    <button 
                      onClick={() => toggleEquip(item.id)}
                      className={`w-4 h-4 rounded-full border-2 transition-all ${item.equipped ? 'bg-[#8b4513] border-[#8b4513]' : 'border-[#8b4513]/30 hover:border-[#8b4513]'}`}
                      title={item.equipped ? "Desequipar" : "Equipar"}
                    />
                    <div className="flex flex-col">
                      <span className={`parchment-text text-base font-bold transition-all ${item.equipped ? 'text-[#8b4513]' : 'text-[#3e2723]'}`}>
                        {item.name}
                      </span>
                      {item.equipped && <span className="text-[7px] cinzel font-bold text-[#8b4513]/60 uppercase tracking-tighter">Item em Uso</span>}
                    </div>
                  </div>

                  {/* Peso Unitário e Total */}
                  <div className="col-span-2 text-center flex flex-col">
                    <span className="text-sm font-bold text-[#8b4513]">{item.weight * item.quantity}kg</span>
                    <span className="text-[8px] cinzel text-[#8b4513]/40 uppercase">{item.weight}u</span>
                  </div>

                  {/* Botões de Ação */}
                  <div className="col-span-2 flex justify-end pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="p-2 text-red-800 hover:bg-red-100 rounded-lg transition-all"
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
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#8b4513] via-[#d4af37] to-[#8b4513] opacity-30"></div>
      </div>
    </div>
  );
};

export default Inventory;
