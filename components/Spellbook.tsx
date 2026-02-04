
import React, { useState } from 'react';
import { Character, Attribute, Spell } from '../types';
import { getProficiencyFromLevel, getLevelFromXP } from '../constants';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
}

const Spellbook: React.FC<Props> = ({ character, updateCharacter }) => {
  const [newSpell, setNewSpell] = useState({ name: '', level: 0, description: '' });

  const currentLevel = getLevelFromXP(character.exp);
  const profBonus = getProficiencyFromLevel(currentLevel);
  const intMod = Math.floor((character.stats[Attribute.INT] - 10) / 2);
  const spellDC = 8 + intMod + profBonus;
  const attackMod = intMod + profBonus;

  const toggleSlot = (level: number, used: boolean) => {
    const slots = { ...character.spellSlots };
    if (!slots[level]) slots[level] = { total: 2, used: 0 };
    
    if (used) {
        slots[level].used = Math.min(slots[level].total, slots[level].used + 1);
    } else {
        slots[level].used = Math.max(0, slots[level].used - 1);
    }
    updateCharacter({ spellSlots: slots });
  };

  const addSpell = () => {
    if (!newSpell.name) return;
    const spell: Spell = {
      name: newSpell.name,
      level: newSpell.level,
      prepared: newSpell.level === 0,
      description: newSpell.description
    };
    updateCharacter({ spells: [...character.spells, spell] });
    setNewSpell({ name: '', level: 0, description: '' });
  };

  const removeSpell = (name: string) => {
    updateCharacter({ spells: character.spells.filter(s => s.name !== name) });
  };

  const togglePrepare = (name: string) => {
    updateCharacter({
      spells: character.spells.map(s => s.name === name ? { ...s, prepared: !s.prepared } : s)
    });
  };

  const SpellSeal: React.FC<{ label: string; value: string | number; sub: string; isMod?: boolean }> = ({ label, value, sub, isMod }) => (
    <div className="flex flex-col items-center group relative">
      {/* Legenda SUPERIOR (FORA do Círculo) */}
      <span className="cinzel text-[7px] sm:text-[9px] font-bold text-[#8b4513] uppercase tracking-[0.2em] mb-3 relative z-10 transition-colors group-hover:text-[#d4af37]">
        {label}
      </span>

      {/* Moldura de Selo Arcano */}
      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#8b4513] bg-[#fdf5e6] shadow-[0_10px_25px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-[#d4af37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        
        {/* Diagrama Arcano de Fundo */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-700 rotate-0 group-hover:rotate-45">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#8b4513] stroke-[0.5]">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="38" />
            <path d="M50 5 L95 80 L5 80 Z" />
            <path d="M50 95 L5 20 L95 20 Z" />
            <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
          </svg>
        </div>

        {/* Gradiente de Brilho Central */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative z-10 flex items-center justify-center">
          <span className={`text-3xl sm:text-5xl font-bold fantasy-title text-[#3e2723] leading-none drop-shadow-md ${isMod ? 'text-[#8b4513]' : ''}`}>
            {value}
          </span>
        </div>

        {/* Detalhes de Borda Interna */}
        <div className="absolute inset-2 border border-[#8b4513]/10 rounded-full pointer-events-none"></div>
      </div>

      {/* Legenda INFERIOR (FORA do Círculo) */}
      <span className="cinzel text-[7px] sm:text-[8px] font-bold text-[#8b4513]/60 mt-3 uppercase tracking-widest relative z-10">
        {sub}
      </span>

      {/* Ornamentos Laterais (Desktop Only) */}
      <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-transparent via-[#8b4513]/20 to-transparent rounded-full"></div>
      <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-3 h-12 bg-gradient-to-b from-transparent via-[#8b4513]/20 to-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-6 max-w-6xl mx-auto pb-24">
      
      {/* CABEÇALHO ARCANO (STATS) */}
      <div className="flex flex-wrap justify-center gap-8 sm:gap-20 py-8 relative">
        {/* Linha Decorativa de Conexão */}
        <div className="absolute top-1/2 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-[#8b4513]/10 to-transparent -translate-y-1/2 hidden lg:block"></div>
        
        <SpellSeal label="Atributo de Poder" value="INT" sub="Inteligência" />
        <SpellSeal label="CD de Resistência" value={spellDC} sub="Dificuldade" />
        <SpellSeal label="Ataque Mágico" value={`+${attackMod}`} sub="Bônus" isMod />
      </div>

      {/* REGISTRO DE NOVA MAGIA */}
      <div className="bg-[#2d1b0d] border-4 border-[#8b4513] rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
           <svg className="w-32 h-32 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" /></svg>
        </div>
        
        <div className="relative z-10">
          <h2 className="cinzel text-xs font-bold text-[#d4af37] mb-6 uppercase tracking-[0.3em] border-b border-[#d4af37]/20 pb-2 inline-block">Insculpir Novo Feitiço</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-6">
              <label className="cinzel text-[8px] font-bold text-[#e8d5b5]/40 uppercase mb-2 block tracking-widest">Nome da Magia</label>
              <input 
                className="w-full bg-black/40 border-2 border-[#8b4513]/50 rounded-xl p-3 text-[#f4e4bc] fantasy-title outline-none focus:border-[#d4af37] transition-all placeholder:text-[#8b4513]/40 placeholder:italic"
                placeholder="Ex: Bola de Fogo, Mãos Flamejantes..."
                value={newSpell.name}
                onChange={e => setNewSpell({...newSpell, name: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <label className="cinzel text-[8px] font-bold text-[#e8d5b5]/40 uppercase mb-2 block text-center tracking-widest">Círculo</label>
              <select 
                className="w-full bg-black/40 border-2 border-[#8b4513]/50 rounded-xl p-3 text-[#f4e4bc] cinzel font-bold text-center outline-none focus:border-[#d4af37] transition-all"
                value={newSpell.level}
                onChange={e => setNewSpell({...newSpell, level: parseInt(e.target.value)})}
              >
                {[0,1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n} className="bg-[#2d1b0d]">{n === 0 ? 'Truque' : `${n}º`}</option>)}
              </select>
            </div>
            <div className="md:col-span-4">
              <button 
                onClick={addSpell}
                className="w-full h-[52px] bg-gradient-to-b from-[#8b4513] to-[#5d4037] text-[#fdf5e6] rounded-xl cinzel text-[10px] font-bold hover:from-[#d4af37] hover:to-[#b8860b] hover:text-[#1a0f00] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.4)] uppercase tracking-[0.2em] border-b-4 border-black/60 active:translate-y-1 active:border-b-0"
              >
                Adicionar ao Grimório
              </button>
            </div>
            <div className="md:col-span-12">
               <label className="cinzel text-[8px] font-bold text-[#e8d5b5]/40 uppercase mb-2 block tracking-widest">Efeito / Descrição Arcana</label>
               <textarea 
                 className="w-full bg-black/40 border-2 border-[#8b4513]/50 rounded-xl p-4 text-[#f4e4bc] parchment-text text-base focus:border-[#d4af37] outline-none resize-none transition-all"
                 rows={2}
                 placeholder="Descreva as propriedades e componentes..."
                 value={newSpell.description}
                 onChange={e => setNewSpell({...newSpell, description: e.target.value})}
               />
            </div>
          </div>
        </div>
      </div>

      {/* LISTA DE MAGIAS POR CÍRCULO */}
      <div className="flex flex-col gap-12 mt-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => {
          const circleSpells = character.spells.filter(s => s.level === level);
          if (level > 0 && circleSpells.length === 0 && (!character.spellSlots[level] || character.spellSlots[level].total === 0)) return null;
          if (level === 0 && circleSpells.length === 0) return null;

          return (
            <div key={level} className="bg-[#fdf5e6] border-2 border-[#8b4513] rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Cabeçalho do Círculo */}
              <div className="bg-[#8b4513] p-5 flex justify-between items-center border-b-2 border-[#d4af37]/30">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#2d1b0d] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                    <span className="fantasy-title text-2xl text-[#d4af37]">{level}</span>
                  </div>
                  <h3 className="cinzel text-sm font-bold text-[#fdf5e6] tracking-[0.25em] uppercase">
                    {level === 0 ? 'Truques de Aprendiz' : `${level}º Círculo Arcano`}
                  </h3>
                </div>

                {/* Espaços de Magia (Runas) */}
                {level > 0 && character.spellSlots[level] && (
                  <div className="flex gap-3 items-center bg-black/30 px-5 py-2.5 rounded-full border border-white/10 shadow-inner">
                    <span className="cinzel text-[8px] font-bold text-[#fdf5e6]/40 uppercase mr-1 tracking-widest">Espaços:</span>
                    {[...Array(character.spellSlots[level].total)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => toggleSlot(level, i >= character.spellSlots[level].used)}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-700 shadow-md ${
                          i < character.spellSlots[level].used 
                            ? 'bg-[#1a0f00] border-[#8b4513] opacity-40' 
                            : 'bg-gradient-to-tr from-[#d4af37] to-[#fffacd] border-[#fffacd] animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.7)]'
                        }`}
                        title={i < character.spellSlots[level].used ? "Espaço Consumido" : "Canalizar Poder"}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Lista de Magias do Círculo */}
              <div className="p-0">
                {circleSpells.length === 0 ? (
                  <div className="p-12 text-center opacity-30 italic cinzel text-xs py-16">
                    Nenhum feitiço inscrito neste nível de poder.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 divide-y-2 divide-[#8b4513]/5">
                    {circleSpells.map((spell, idx) => (
                      <div key={idx} className={`p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 group transition-all hover:bg-[#8b4513]/5 ${spell.prepared ? 'bg-[#d4af37]/5' : ''}`}>
                        <div className="flex gap-5 items-start">
                          {/* Botão Preparar */}
                          {level > 0 && (
                            <button 
                              onClick={() => togglePrepare(spell.name)}
                              className={`mt-1 flex-none w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${
                                spell.prepared 
                                ? 'bg-[#8b4513] border-[#8b4513] text-[#d4af37] shadow-[0_5px_15px_rgba(139,69,19,0.4)] rotate-0 scale-110' 
                                : 'border-[#8b4513]/20 text-[#8b4513]/20 hover:border-[#8b4513]/60 hover:scale-105'
                              }`}
                              title={spell.prepared ? "Magia Preparada" : "Preparar Magia"}
                            >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            </button>
                          )}
                          <div className="flex flex-col">
                            <span className={`fantasy-title text-2xl ${spell.prepared || level === 0 ? 'text-[#8b4513]' : 'text-[#8b4513]/30'}`}>
                              {spell.name}
                            </span>
                            <p className="parchment-text text-sm text-[#5d4037]/80 leading-relaxed mt-2 italic border-l-2 border-[#8b4513]/10 pl-4">
                              {spell.description || "Nenhuma anotação rúnica encontrada."}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <button 
                             onClick={() => removeSpell(spell.name)}
                             className="p-3 text-red-900/50 hover:text-red-700 hover:bg-red-100 rounded-xl transition-all"
                             title="Remover do Grimório"
                           >
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Spellbook;
