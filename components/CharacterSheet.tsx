
import React, { useMemo, useRef, useState } from 'react';
import { Character, Attribute, Skill, Weapon, OtherAttack } from '../types';
import { SKILLS, getLevelFromXP, getProficiencyFromLevel } from '../constants';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onImageUpload: (file: File) => void;
  theme?: 'light' | 'dark';
}

const CharacterSheet: React.FC<Props> = ({ character, updateCharacter, onImageUpload, theme = 'light' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [combatTab, setCombatTab] = useState<'weapons' | 'attacks'>('weapons');
  const [hpTab, setHpTab] = useState<'hp' | 'death'>('hp');
  
  const getModifier = (score: number) => Math.floor((score - 10) / 2);

  const isDark = theme === 'dark';

  const profBonus = useMemo(() => {
    const currentLevel = getLevelFromXP(character.exp);
    return getProficiencyFromLevel(currentLevel);
  }, [character.exp]);

  const StatBoxMedallion: React.FC<{ attr: Attribute, score: number }> = ({ attr, score }) => {
    const mod = getModifier(score);
    const modDisplay = mod >= 0 ? `+${mod}` : mod;
    return (
      <div className="flex flex-col items-center group relative w-full max-w-[110px] mx-auto">
        <div className={`relative w-full aspect-square border-2 rounded-lg shadow-md flex flex-col items-center justify-center transition-all bg-[url('https://www.transparenttextures.com/patterns/p6.png')] ${
          isDark 
            ? 'bg-[#1a1a1a] border-[#333] group-hover:border-[#d4af37] shadow-black/50' 
            : 'bg-[#fdf5e6] border-[#8b4513] group-hover:border-[#d4af37]'
        }`}>
          <span className={`absolute -top-3 text-[10px] px-2.5 py-0.5 rounded-sm font-bold cinzel tracking-widest border z-30 shadow-sm uppercase ${
            isDark 
              ? 'bg-[#d4af37] text-[#1a1a1a] border-[#fffacd]/20' 
              : 'bg-[#8b4513] text-[#fdf5e6] border-[#d4af37]/40'
          }`}>
            {attr}
          </span>
          <div className="flex items-center justify-center w-full h-full px-1">
            <input 
              type="number"
              max="20"
              min="0"
              value={score}
              onChange={(e) => {
                let val = parseInt(e.target.value) || 0;
                if (val > 20) val = 20;
                updateCharacter({ stats: { ...character.stats, [attr]: val } });
              }}
              className={`text-4xl sm:text-5xl font-bold fantasy-title bg-transparent w-full text-center focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'
              }`}
            />
          </div>
          <div className={`absolute -bottom-4 w-10 h-10 border-2 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-20 ${
            isDark 
              ? 'bg-[#222] border-[#444] text-[#d4af37]' 
              : 'bg-[#fdf5e6] border-[#8b4513] text-[#8b4513] bg-[radial-gradient(#fff_0%,#fdf5e6_100%)]'
          }`}>
             <span className="text-xl font-bold cinzel relative z-10">{modDisplay}</span>
          </div>
        </div>
      </div>
    );
  };

  const toggleSkill = (skillName: string) => {
    const currentSkills = [...character.proficiencies.skills];
    const index = currentSkills.indexOf(skillName);
    if (index > -1) currentSkills.splice(index, 1);
    else currentSkills.push(skillName);
    updateCharacter({ proficiencies: { ...character.proficiencies, skills: currentSkills } });
  };

  const toggleSave = (attr: Attribute) => {
    const currentSaves = [...character.proficiencies.saves];
    const index = currentSaves.indexOf(attr);
    if (index > -1) currentSaves.splice(index, 1);
    else currentSaves.push(attr);
    updateCharacter({ proficiencies: { ...character.proficiencies, saves: currentSaves } });
  };

  const toggleDeathSave = (type: 'successes' | 'failures', index: number) => {
    const currentVal = character.deathSaves[type];
    const newVal = index === currentVal ? index - 1 : index;
    updateCharacter({ deathSaves: { ...character.deathSaves, [type]: Math.max(0, newVal) } });
  };

  return (
    <div className="flex flex-col p-2 sm:p-4 lg:p-6 pb-12 gap-6">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])} />

      {/* SEÇÃO DE PERFIL EDITÁVEL */}
      <section className={`grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl border shadow-inner ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-[#8b4513]/5 border-[#8b4513]/20'
      }`}>
        {[
          { label: 'Classe', value: character.class, key: 'class' },
          { label: 'Raça', value: character.race, key: 'race' },
          { label: 'Antecedente', value: character.background, key: 'background' },
          { label: 'Tendência', value: character.alignment, key: 'alignment' }
        ].map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className={`cinzel text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{field.label}</label>
            <input 
              value={field.value} 
              onChange={(e) => updateCharacter({ [field.key]: e.target.value })}
              className={`bg-transparent border-b outline-none fantasy-title text-base sm:text-lg px-1 transition-colors ${
                isDark ? 'border-white/10 focus:border-[#d4af37] text-[#e8d5b5]' : 'border-[#8b4513]/20 focus:border-[#8b4513] text-[#3e2723]'
              }`}
            />
          </div>
        ))}
      </section>

      {/* LAYOUT PRINCIPAL RESPONSIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* COLUNA ESQUERDA: ATRIBUTOS */}
        <section className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
           <div className={`border-2 p-4 rounded-2xl shadow-inner ${isDark ? 'bg-black/20 border-white/5' : 'bg-[#fdf5e6]/70 border-[#8b4513]/20'}`}>
              <h3 className={`cinzel text-xs font-bold text-center mb-10 uppercase tracking-[0.2em] border-b pb-2 ${isDark ? 'text-[#d4af37] border-white/5' : 'text-[#8b4513] border-[#8b4513]/10'}`}>Atributos</h3>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-y-12 gap-x-4">
                {(Object.entries(character.stats) as [Attribute, number][]).map(([attr, score]) => (
                  <StatBoxMedallion key={attr} attr={attr} score={score} />
                ))}
              </div>
           </div>
        </section>

        {/* COLUNA CENTRAL: RETRATO, DEFESA, SALVAGUARDAS E VIDA */}
        <section className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
          <div className="flex flex-col md:flex-row lg:flex-col gap-6">
            {/* Retrato Quadrado */}
            <div className={`border-2 p-3 rounded-2xl shadow-xl flex flex-col items-center gap-4 relative ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
              <div className="w-full flex justify-between items-center z-10">
                <div className={`flex flex-col items-center backdrop-blur-sm border p-1.5 rounded-lg w-16 shadow-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/70 border-[#8b4513]/20'}`}>
                  <span className={`text-[8px] cinzel font-bold uppercase tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Prof.</span>
                  <span className={`text-lg font-bold fantasy-title ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>+{profBonus}</span>
                </div>
                <div className={`flex flex-col items-center backdrop-blur-sm border p-1.5 rounded-lg w-16 shadow-sm ${isDark ? 'bg-black/40 border-white/10' : 'bg-white/70 border-[#8b4513]/20'}`}>
                  <span className={`text-[8px] cinzel font-bold uppercase tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Insp.</span>
                  <input 
                    type="number" 
                    value={character.inspiration} 
                    onChange={(e) => updateCharacter({ inspiration: parseInt(e.target.value) || 0 })} 
                    className={`w-full text-center bg-transparent focus:outline-none font-bold text-lg fantasy-title [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
                  />
                </div>
              </div>

              <div 
                className={`w-full aspect-square rounded-xl border overflow-hidden shadow-2xl relative group cursor-pointer ${isDark ? 'bg-black border-white/10' : 'bg-[#1a0f00] border-[#8b4513]'}`} 
                onClick={() => fileInputRef.current?.click()}
              >
                {character.portrait ? (
                  <img src={character.portrait} alt="Portrait" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center italic p-6 text-center text-xs cinzel uppercase tracking-widest opacity-20">Clique para Carregar Retrato</div>
                )}
              </div>
            </div>

            {/* Defesa e Salvaguardas */}
            <div className="w-full md:w-1/2 lg:w-full space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Armadura', value: character.ac, key: 'ac', type: 'number' },
                  { label: 'Iniciativa', value: character.initiativeBonus, key: 'initiativeBonus', type: 'number' },
                  { label: 'Desloc.', value: character.speed, key: 'speed', type: 'text' }
                ].map((stat) => (
                  <div key={stat.key} className={`border-2 rounded-xl p-3 text-center shadow-lg flex flex-col items-center ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#8b4513]'}`}>
                    <span className={`block text-[9px] cinzel font-bold uppercase mb-1 tracking-wider ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{stat.label}</span>
                    <input 
                      type={stat.type}
                      value={stat.value} 
                      onChange={(e) => updateCharacter({ [stat.key]: stat.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value })} 
                      className={`text-2xl font-bold fantasy-title bg-transparent w-full text-center outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`} 
                    />
                  </div>
                ))}
              </div>

              <div className={`border-2 p-4 rounded-xl shadow-md ${isDark ? 'bg-black/20 border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]/40'}`}>
                <h3 className={`cinzel text-xs font-bold text-center mb-5 uppercase tracking-[0.2em] border-b pb-1 ${isDark ? 'text-[#d4af37] border-white/5' : 'text-[#8b4513] border-[#8b4513]/10'}`}>Salvaguardas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(character.stats).map((key) => {
                    const attr = key as Attribute;
                    const isProf = character.proficiencies.saves.includes(attr);
                    const mod = getModifier(character.stats[attr]) + (isProf ? profBonus : 0);
                    return (
                      <div key={attr} className={`flex items-center gap-2 p-2 rounded border transition-colors ${
                        isDark ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white/60 border-[#8b4513]/10 hover:border-[#8b4513]/40'
                      }`}>
                        <input type="checkbox" checked={isProf} onChange={() => toggleSave(attr)} className={`w-3.5 h-3.5 cursor-pointer ${isDark ? 'accent-[#d4af37]' : 'accent-[#8b4513]'}`} />
                        <span className={`w-6 font-bold text-center text-sm ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{mod >= 0 ? `+${mod}` : mod}</span>
                        <span className={`parchment-text uppercase font-bold text-[10px] truncate tracking-tighter ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{attr}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* BLOCO DE PONTOS DE VIDA (COM ABAS) */}
              <div className={`border-2 p-5 rounded-2xl shadow-xl flex flex-col relative transition-all duration-700 ${
                  character.deathSaves.failures >= 3 
                    ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]' 
                    : (isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]')
                }`}>
                
                {/* AVISO DE MORTE */}
                {character.deathSaves.failures >= 3 && (
                  <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md rounded-[1.3rem] p-6 text-center animate-in fade-in duration-1000">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 mb-4 text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.7)]">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C7.03125 2 3 6.03125 3 11C3 13.9062 4.40625 16.5 6.59375 18.0938L6.28125 21.0312C6.21875 21.5625 6.625 22 7.15625 22H16.8438C17.375 22 17.7812 21.5625 17.7188 21.0312L17.4062 18.0938C19.5938 16.5 21 13.9062 21 11C21 6.03125 16.9688 2 12 2ZM9 12C8.4375 12 8 11.5625 8 11C8 10.4375 8.4375 10 9 10C9.5625 10 10 10.4375 10 11C10 11.5625 9.5625 12 9 12ZM15 12C14.4375 12 14 11.5625 14 11C14 10.4375 14.4375 10 15 10C15.5625 10 16 10.4375 16 11C16 11.5625 15.5625 12 15 12Z"/>
                        </svg>
                      </div>
                      <h3 className="fantasy-title text-3xl text-red-600 mb-2 drop-shadow-sm uppercase tracking-widest">
                        {character.name}, morreu...
                      </h3>
                      <p className={`fantasy-title text-xl italic mb-8 leading-relaxed ${isDark ? 'text-[#e8d5b5]/80' : 'text-red-200/80'}`}>
                        suas crônicas serão contadas por eras.
                      </p>
                      <button 
                        onClick={() => updateCharacter({ deathSaves: { successes: 0, failures: 0 }, hp: { ...character.hp, current: 1 } })}
                        className="cinzel text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] border-2 border-[#d4af37]/40 px-8 py-3 rounded-lg hover:bg-[#d4af37] hover:text-black transition-all shadow-lg active:scale-95 bg-black/50"
                      >
                        voltar a vida
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-menu de Vida/Morte */}
                <div className="flex mb-4 border-b-2 border-black/10 overflow-hidden rounded-t-lg bg-black/5">
                  <button 
                    onClick={() => setHpTab('hp')}
                    className={`flex-1 py-1.5 cinzel text-[9px] font-bold uppercase tracking-widest transition-all ${hpTab === 'hp' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
                  >
                    Vida
                  </button>
                  <button 
                    onClick={() => setHpTab('death')}
                    className={`flex-1 py-1.5 cinzel text-[9px] font-bold uppercase tracking-widest transition-all ${hpTab === 'death' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
                  >
                    Morte
                  </button>
                </div>

                {hpTab === 'hp' ? (
                  <>
                    <div className={`flex justify-between items-center mb-4 border-b pb-2 ${isDark ? 'border-white/10' : 'border-[#8b4513]/20'}`}>
                      <h2 className={`cinzel font-bold text-xs tracking-[0.15em] uppercase ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Pontos de Vida</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] cinzel font-bold opacity-50 uppercase tracking-widest">Máx</span>
                        <input type="number" value={character.hp.max} onChange={(e) => updateCharacter({ hp: { ...character.hp, max: parseInt(e.target.value) || 0 } })} className={`bg-transparent font-bold w-12 text-center focus:outline-none border-b text-lg ${isDark ? 'border-white/10' : 'border-[#8b4513]/40'}`} />
                      </div>
                    </div>
                    <input type="number" value={character.hp.current} onChange={(e) => updateCharacter({ hp: { ...character.hp, current: parseInt(e.target.value) || 0 } })} className={`w-full text-center text-6xl font-bold bg-transparent focus:outline-none drop-shadow-md p-0 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} />
                    <div className={`flex gap-4 text-center mt-6 pt-4 border-t ${isDark ? 'border-white/10' : 'border-[#8b4513]/10'}`}>
                      <div className="flex-1">
                        <span className="block text-[9px] cinzel font-bold uppercase tracking-widest opacity-70">Temporários</span>
                        <input type="number" value={character.hp.temp} onChange={(e) => updateCharacter({ hp: { ...character.hp, temp: parseInt(e.target.value) || 0 } })} className="w-full text-center font-bold bg-transparent outline-none text-xl" />
                      </div>
                      <div className="flex-1">
                        <span className="block text-[9px] cinzel font-bold uppercase tracking-widest opacity-70">Dados de Vida</span>
                        <span className="font-bold text-xl block mt-1 tracking-tighter">1d8</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 space-y-6">
                    <h2 className={`cinzel font-bold text-xs tracking-[0.15em] uppercase border-b w-full text-center pb-2 mb-2 ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/20'}`}>
                      Salvaguardas Contra Morte
                    </h2>
                    
                    <div className="w-full space-y-4 px-4">
                      {/* Sucessos */}
                      <div className="flex flex-col items-center">
                        <span className={`text-[8px] cinzel font-bold uppercase tracking-widest mb-2 opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>Sucessos</span>
                        <div className="flex gap-4">
                          {[1, 2, 3].map(i => (
                            <button 
                              key={i}
                              onClick={() => toggleDeathSave('successes', i)}
                              className={`w-8 h-8 rounded-full border-2 transition-all shadow-md flex items-center justify-center ${
                                i <= character.deathSaves.successes 
                                  ? 'bg-[#d4af37] border-[#fffacd] shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                                  : 'bg-black/20 border-white/10 opacity-30'
                              }`}
                            >
                              {i <= character.deathSaves.successes && (
                                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Falhas */}
                      <div className="flex flex-col items-center">
                        <span className={`text-[8px] cinzel font-bold uppercase tracking-widest mb-2 opacity-60 ${isDark ? 'text-red-400' : 'text-red-700'}`}>Falhas</span>
                        <div className="flex gap-4">
                          {[1, 2, 3].map(i => (
                            <button 
                              key={i}
                              onClick={() => toggleDeathSave('failures', i)}
                              className={`w-8 h-8 rounded-full border-2 transition-all shadow-md flex items-center justify-center ${
                                i <= character.deathSaves.failures 
                                  ? 'bg-red-700 border-red-400 shadow-[0_0_10px_rgba(185,28,28,0.4)]' 
                                  : 'bg-black/20 border-white/10 opacity-30'
                              }`}
                            >
                              {i <= character.deathSaves.failures && (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* COLUNA DIREITA: PERÍCIAS E COMBATE */}
        <section className="lg:col-span-4 flex flex-col gap-6 order-3">
          {/* BLOCO DE PERÍCIAS */}
          <div className={`border-2 p-5 rounded-xl shadow-xl ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
            <h2 className={`cinzel text-sm font-bold border-b mb-6 pb-2 tracking-[0.2em] uppercase text-center ${isDark ? 'text-[#d4af37] border-white/10' : 'text-[#8b4513] border-[#8b4513]/30'}`}>Perícias</h2>
            <div className="flex flex-col gap-2">
              {SKILLS.map(skill => {
                const isProf = character.proficiencies.skills.includes(skill.name);
                const mod = getModifier(character.stats[skill.attribute]) + (isProf ? profBonus : 0);
                return (
                  <div key={skill.name} className={`flex items-center gap-3 text-[13px] p-1.5 border-b group/skill transition-all rounded-sm ${
                    isDark ? 'border-white/5 hover:bg-white/5' : 'border-[#8b4513]/5 hover:bg-[#8b4513]/5'
                  } ${isProf ? (isDark ? 'bg-white/5' : 'bg-[#8b4513]/5') : ''}`}>
                    <input type="checkbox" checked={isProf} onChange={() => toggleSkill(skill.name)} className={`w-4 h-4 cursor-pointer ${isDark ? 'accent-[#d4af37]' : 'accent-[#8b4513]'}`} />
                    
                    <span className={`w-7 font-bold text-center text-base ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>{mod >= 0 ? `+${mod}` : mod}</span>
                    <div className="flex items-center flex-grow truncate">
                      <span className={`parchment-text font-bold uppercase tracking-tighter mr-1 transition-colors ${
                        isProf ? (isDark ? 'text-[#d4af37]' : 'text-[#8b4513]') : (isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]')
                      }`}>
                        {skill.name}
                      </span>
                      <span className={`text-[9px] cinzel opacity-40 font-bold ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>({skill.attribute})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BLOCO DE COMBATE (ARMAS E ATAQUES) */}
          <div className={`border-2 p-5 rounded-xl shadow-xl ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
            {/* Sub-menu de Navegação */}
            <div className="flex mb-5 border-b-2 border-black/10 overflow-hidden rounded-t-lg bg-black/5">
              <button 
                onClick={() => setCombatTab('weapons')}
                className={`flex-1 py-2 cinzel text-[10px] font-bold uppercase tracking-widest transition-all ${combatTab === 'weapons' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
              >
                Armas
              </button>
              <button 
                onClick={() => setCombatTab('attacks')}
                className={`flex-1 py-2 cinzel text-[10px] font-bold uppercase tracking-widest transition-all ${combatTab === 'attacks' ? (isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]') : 'opacity-40 hover:opacity-100'}`}
              >
                Ataques
              </button>
            </div>

            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {combatTab === 'weapons' ? (
                character.weapons.length === 0 ? (
                  <div className="py-8 text-center opacity-30 italic cinzel text-[10px] uppercase tracking-widest">
                    Nenhuma arma registrada
                  </div>
                ) : (
                  character.weapons.map((w, idx) => (
                    <div key={idx} className={`border p-3 rounded-lg relative group ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/40 border-[#8b4513]/10'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <input 
                          value={w.name}
                          onChange={(e) => {
                            const next = [...character.weapons];
                            next[idx].name = e.target.value;
                            updateCharacter({ weapons: next });
                          }}
                          className={`bg-transparent font-bold fantasy-title outline-none focus:border-b border-white/20 w-2/3 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
                        />
                        <button 
                          onClick={() => updateCharacter({ weapons: character.weapons.filter((_, i) => i !== idx) })}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Bônus</span>
                          <input value={w.bonus} onChange={(e) => { const next = [...character.weapons]; next[idx].bonus = e.target.value; updateCharacter({ weapons: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Dano</span>
                          <input value={w.damage} onChange={(e) => { const next = [...character.weapons]; next[idx].damage = e.target.value; updateCharacter({ weapons: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-2 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Tipo</span>
                          <input 
                            value={w.type || ''} 
                            onChange={(e) => { 
                              const next = [...character.weapons]; 
                              next[idx].type = e.target.value; 
                              updateCharacter({ weapons: next }); 
                            }} 
                            placeholder="Ex: 1 Mão"
                            className={`bg-transparent w-full text-center font-bold outline-none cinzel text-[10px] ${isDark ? 'text-[#e8d5b5] placeholder:text-white/10' : 'text-[#3e2723] placeholder:text-black/10'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )
              ) : (
                character.otherAttacks.length === 0 ? (
                  <div className="py-8 text-center opacity-30 italic cinzel text-[10px] uppercase tracking-widest">
                    Nenhum ataque registrado
                  </div>
                ) : (
                  character.otherAttacks.map((a, idx) => (
                    <div key={idx} className={`border p-3 rounded-lg relative group ${isDark ? 'bg-black/20 border-white/5' : 'bg-white/40 border-[#8b4513]/10'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <input 
                          value={a.name}
                          onChange={(e) => {
                            const next = [...character.otherAttacks];
                            next[idx].name = e.target.value;
                            updateCharacter({ otherAttacks: next });
                          }}
                          className={`bg-transparent font-bold fantasy-title outline-none focus:border-b border-white/20 w-2/3 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}
                        />
                        <button 
                          onClick={() => updateCharacter({ otherAttacks: character.otherAttacks.filter((_, i) => i !== idx) })}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Atk</span>
                          <input value={a.bonus} onChange={(e) => { const next = [...character.otherAttacks]; next[idx].bonus = e.target.value; updateCharacter({ otherAttacks: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-1 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Dano</span>
                          <input value={a.damage} onChange={(e) => { const next = [...character.otherAttacks]; next[idx].damage = e.target.value; updateCharacter({ otherAttacks: next }); }} className={`bg-transparent w-full text-center font-bold outline-none ${isDark ? 'text-[#e8d5b5]' : ''}`} />
                        </div>
                        <div className={`col-span-2 text-center p-1 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-[#8b4513]/5 border-[#8b4513]/10'}`}>
                          <span className={`block text-[8px] cinzel font-bold uppercase tracking-widest opacity-60 ${isDark ? 'text-[#d4af37]' : ''}`}>Alcance/Tipo</span>
                          <input 
                            value={a.range || ''} 
                            onChange={(e) => { 
                              const next = [...character.otherAttacks]; 
                              next[idx].range = e.target.value; 
                              updateCharacter({ otherAttacks: next }); 
                            }} 
                            placeholder="Ex: 36m"
                            className={`bg-transparent w-full text-center font-bold outline-none cinzel text-[10px] ${isDark ? 'text-[#e8d5b5] placeholder:text-white/10' : 'text-[#3e2723] placeholder:text-black/10'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
            
            <button 
              onClick={() => {
                if (combatTab === 'weapons') {
                  updateCharacter({ weapons: [...character.weapons, { name: 'Nova Arma', bonus: '+0', damage: '1d4', type: '' }] });
                } else {
                  updateCharacter({ otherAttacks: [...character.otherAttacks, { name: 'Novo Ataque', bonus: '+0', damage: '1d4', range: '' }] });
                }
              }}
              className={`mt-6 w-full py-3 rounded-xl cinzel text-[11px] font-bold shadow-lg uppercase tracking-[0.2em] border-b-4 active:translate-y-1 active:border-b-0 transition-all ${
                isDark 
                  ? 'bg-[#d4af37] text-[#1a1a1a] border-black/40 hover:bg-[#b8860b]' 
                  : 'bg-[#8b4513] text-[#fdf5e6] border-black/40 hover:bg-[#5d4037]'
              }`}
            >
              + Registrar {combatTab === 'weapons' ? 'Arma' : 'Ataque'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CharacterSheet;
