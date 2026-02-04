
import React, { useMemo, useRef } from 'react';
import { Character, Attribute, Skill } from '../types';
import { SKILLS, getLevelFromXP, getProficiencyFromLevel } from '../constants';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onImageUpload: (file: File) => void;
}

const CharacterSheet: React.FC<Props> = ({ character, updateCharacter, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getModifier = (score: number) => Math.floor((score - 10) / 2);

  const profBonus = useMemo(() => {
    const currentLevel = getLevelFromXP(character.exp);
    return getProficiencyFromLevel(currentLevel);
  }, [character.exp]);

  const StatBoxMedallion: React.FC<{ attr: Attribute; score: number }> = ({ attr, score }) => {
    const mod = getModifier(score);
    const modDisplay = mod >= 0 ? `+${mod}` : mod;
    return (
      <div className="flex flex-col items-center group relative w-full max-w-[100px] mx-auto">
        <div className="relative w-full aspect-square bg-[#fdf5e6] border-2 border-[#8b4513] rounded-lg shadow-md flex flex-col items-center justify-center transition-all group-hover:border-[#d4af37] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]">
          <span className="absolute -top-2.5 bg-[#8b4513] text-[#fdf5e6] text-[7px] px-2 py-0.5 rounded-sm font-bold cinzel tracking-widest border border-[#d4af37]/40 z-30 shadow-sm uppercase">
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
              className="text-xl sm:text-2xl font-bold fantasy-title bg-transparent w-full text-center focus:outline-none text-[#3e2723] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="absolute -bottom-3 w-8 h-8 bg-[#fdf5e6] border-2 border-[#8b4513] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform bg-[radial-gradient(#fff_0%,#fdf5e6_100%)] z-20">
             <span className="text-sm font-bold cinzel text-[#8b4513] relative z-10">{modDisplay}</span>
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

  return (
    <div className="flex flex-col p-2 sm:p-4 lg:p-6 pb-12 gap-6">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])} />

      {/* SEÇÃO DE PERFIL EDITÁVEL */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#8b4513]/5 p-4 rounded-xl border border-[#8b4513]/20 shadow-inner">
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Classe</label>
          <input 
            value={character.class} 
            onChange={(e) => updateCharacter({ class: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none fantasy-title text-base sm:text-lg text-[#3e2723] px-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Raça</label>
          <input 
            value={character.race} 
            onChange={(e) => updateCharacter({ race: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none fantasy-title text-base sm:text-lg text-[#3e2723] px-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Antecedente</label>
          <input 
            value={character.background} 
            onChange={(e) => updateCharacter({ background: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none parchment-text font-bold text-sm sm:text-base text-[#3e2723] px-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Tendência</label>
          <input 
            value={character.alignment} 
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none parchment-text font-bold text-sm sm:text-base text-[#3e2723] px-1"
          />
        </div>
      </section>

      {/* LAYOUT PRINCIPAL RESPONSIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* COLUNA ESQUERDA: ATRIBUTOS (Focada e Compacta) */}
        <section className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1">
           <div className="bg-[#fdf5e6]/70 border-2 border-[#8b4513]/20 p-4 rounded-2xl shadow-inner">
              <h3 className="cinzel text-[9px] font-bold text-[#8b4513] text-center mb-6 uppercase tracking-widest opacity-60">Atributos</h3>
              <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-y-10 gap-x-4">
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
            <div className="w-full md:w-1/2 lg:w-full bg-[#fdf5e6] border-2 border-[#8b4513] p-3 rounded-2xl shadow-xl flex flex-col items-center gap-4 relative">
              <div className="w-full flex justify-between items-center z-10">
                <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm border border-[#8b4513]/20 p-1 rounded-lg w-16 shadow-sm">
                  <span className="text-[7px] cinzel font-bold text-[#8b4513]">PROF.</span>
                  <span className="text-lg font-bold fantasy-title text-[#3e2723]">+{profBonus}</span>
                </div>
                <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm border border-[#8b4513]/20 p-1 rounded-lg w-16 shadow-sm">
                  <span className="text-[7px] cinzel font-bold text-[#8b4513]">INSP.</span>
                  <input 
                    type="number" 
                    value={character.inspiration} 
                    onChange={(e) => updateCharacter({ inspiration: parseInt(e.target.value) || 0 })} 
                    className="w-full text-center bg-transparent focus:outline-none font-bold text-lg fantasy-title [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  />
                </div>
              </div>

              <div 
                className="w-full aspect-square bg-[#1a0f00] rounded-xl border border-[#8b4513] overflow-hidden shadow-2xl relative group cursor-pointer" 
                onClick={() => fileInputRef.current?.click()}
              >
                {character.portrait ? (
                  <img src={character.portrait} alt="Portrait" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-[#f4e4bc]/20 italic p-6 text-center text-xs cinzel uppercase tracking-widest">Clique para Carregar Retrato</div>
                )}
              </div>
            </div>

            {/* Defesa e Salvaguardas */}
            <div className="w-full md:w-1/2 lg:w-full space-y-6">
              {/* Bloco AC / Iniciativa / Deslocamento */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border-2 border-[#8b4513] rounded-xl p-3 text-center shadow-lg flex flex-col items-center">
                  <span className="block text-[8px] cinzel font-bold text-[#8b4513] uppercase mb-1">Armadura</span>
                  <input 
                    type="number" 
                    value={character.ac} 
                    onChange={(e) => updateCharacter({ ac: parseInt(e.target.value) || 0 })} 
                    className="text-2xl font-bold fantasy-title bg-transparent w-full text-center outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  />
                </div>
                <div className="bg-white border-2 border-[#8b4513] rounded-xl p-3 text-center shadow-lg flex flex-col items-center">
                  <span className="block text-[8px] cinzel font-bold text-[#8b4513] uppercase mb-1">Iniciativa</span>
                  <input 
                    type="number" 
                    value={character.initiativeBonus} 
                    onChange={(e) => updateCharacter({ initiativeBonus: parseInt(e.target.value) || 0 })} 
                    className="text-2xl font-bold fantasy-title bg-transparent w-full text-center outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  />
                </div>
                <div className="bg-white border-2 border-[#8b4513] rounded-xl p-3 text-center shadow-lg flex flex-col items-center">
                  <span className="block text-[8px] cinzel font-bold text-[#8b4513] uppercase mb-1">Desloc.</span>
                  <input 
                    value={character.speed} 
                    onChange={(e) => updateCharacter({ speed: e.target.value })} 
                    className="text-xl font-bold fantasy-title bg-transparent w-full text-center outline-none p-0" 
                  />
                </div>
              </div>

              {/* SALVAGUARDAS */}
              <div className="bg-[#fdf5e6] border-2 border-[#8b4513]/40 p-4 rounded-xl shadow-md">
                <h3 className="cinzel text-[9px] font-bold text-[#8b4513] text-center mb-3 uppercase tracking-widest opacity-60">Salvaguardas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.keys(character.stats).map((key) => {
                    const attr = key as Attribute;
                    const isProf = character.proficiencies.saves.includes(attr);
                    const mod = getModifier(character.stats[attr]) + (isProf ? profBonus : 0);
                    return (
                      <div key={attr} className="flex items-center gap-2 p-1.5 bg-white/60 rounded border border-[#8b4513]/10 hover:border-[#8b4513]/40 transition-colors">
                        <input type="checkbox" checked={isProf} onChange={() => toggleSave(attr)} className="w-3 h-3 cursor-pointer accent-[#8b4513]" />
                        <span className="w-6 font-bold text-[#8b4513] text-center text-xs">{mod >= 0 ? `+${mod}` : mod}</span>
                        <span className="parchment-text uppercase font-bold text-[9px] text-[#3e2723] truncate tracking-tighter">{attr}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vida */}
              <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-5 rounded-2xl shadow-xl flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-[#8b4513]/20 pb-2">
                  <h2 className="cinzel font-bold text-[10px] text-[#8b4513] tracking-widest uppercase">Pontos de Vida</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold opacity-50">MÁX</span>
                    <input type="number" value={character.hp.max} onChange={(e) => updateCharacter({ hp: { ...character.hp, max: parseInt(e.target.value) || 0 } })} className="bg-transparent font-bold w-12 text-center focus:outline-none border-b border-[#8b4513]/40 text-lg" />
                  </div>
                </div>
                <input type="number" value={character.hp.current} onChange={(e) => updateCharacter({ hp: { ...character.hp, current: parseInt(e.target.value) || 0 } })} className="w-full text-center text-6xl font-bold bg-transparent focus:outline-none text-[#8b4513] drop-shadow-md p-0" />
                <div className="flex gap-4 text-center mt-6 pt-4 border-t border-[#8b4513]/10">
                  <div className="flex-1">
                    <span className="block text-[8px] cinzel text-[#8b4513] font-bold uppercase">Temporários</span>
                    <input type="number" value={character.hp.temp} onChange={(e) => updateCharacter({ hp: { ...character.hp, temp: parseInt(e.target.value) || 0 } })} className="w-full text-center font-bold bg-transparent outline-none text-xl" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[8px] cinzel text-[#8b4513] font-bold uppercase">Dados de Vida</span>
                    <span className="font-bold text-xl block mt-1 tracking-tighter">1d8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLUNA DIREITA: PERÍCIAS E ARMAS (Separadas) */}
        <section className="lg:col-span-4 flex flex-col gap-6 order-3">
          {/* BLOCO DE PERÍCIAS */}
          <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-5 rounded-xl shadow-xl">
            <h2 className="cinzel text-[10px] font-bold border-b border-[#8b4513]/20 mb-4 pb-1 tracking-widest text-[#8b4513] uppercase">Perícias e Proficiências</h2>
            <div className="flex flex-col gap-1.5">
              {SKILLS.map(skill => {
                const isProf = character.proficiencies.skills.includes(skill.name);
                const mod = getModifier(character.stats[skill.attribute]) + (isProf ? profBonus : 0);
                return (
                  <div key={skill.name} className="flex items-center gap-2 text-[12px] p-1 border-b border-[#8b4513]/5 group/skill">
                    <input type="checkbox" checked={isProf} onChange={() => toggleSkill(skill.name)} className="w-3 h-3 cursor-pointer accent-[#8b4513]" />
                    <span className="w-6 font-bold text-[#8b4513] text-center text-sm">{mod >= 0 ? `+${mod}` : mod}</span>
                    <div className="flex items-center flex-grow truncate">
                      <span className="parchment-text font-bold text-[#3e2723] uppercase tracking-tighter mr-1">{skill.name}</span>
                      <span className="text-[8px] cinzel opacity-40 font-bold text-[#8b4513]">({skill.attribute})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BLOCO DE ARMAS */}
          <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-5 rounded-xl shadow-xl">
            <h2 className="cinzel font-bold text-[10px] mb-4 text-[#8b4513] tracking-widest uppercase border-b border-[#8b4513]/20 pb-1">Armas</h2>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {character.weapons.length === 0 ? (
                <div className="py-8 text-center opacity-30 italic cinzel text-[9px] uppercase tracking-widest">
                  Nenhuma arma registrada
                </div>
              ) : (
                character.weapons.map((w, idx) => (
                  <div key={idx} className="bg-white/40 border border-[#8b4513]/10 p-3 rounded-lg relative group">
                    <div className="flex justify-between items-start mb-2">
                      <input 
                        value={w.name}
                        onChange={(e) => {
                          const next = [...character.weapons];
                          next[idx].name = e.target.value;
                          updateCharacter({ weapons: next });
                        }}
                        className="bg-transparent font-bold text-[#3e2723] fantasy-title outline-none focus:border-b border-[#8b4513]/20 w-2/3"
                      />
                      <button 
                        onClick={() => updateCharacter({ weapons: character.weapons.filter((_, i) => i !== idx) })}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-800 transition-opacity"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                      </button>
                    </div>
                    {/* Alterado para grid-cols-3 para permitir bônus quadrado e dano retangular */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1 text-center bg-[#8b4513]/5 p-1 rounded border border-[#8b4513]/10">
                        <span className="block text-[7px] cinzel font-bold uppercase opacity-50">Bônus</span>
                        <input value={w.bonus} onChange={(e) => { const next = [...character.weapons]; next[idx].bonus = e.target.value; updateCharacter({ weapons: next }); }} className="bg-transparent w-full text-center font-bold outline-none" />
                      </div>
                      <div className="col-span-2 text-center bg-[#8b4513]/5 p-1 rounded border border-[#8b4513]/10">
                        <span className="block text-[7px] cinzel font-bold uppercase opacity-50">Dano</span>
                        <input value={w.damage} onChange={(e) => { const next = [...character.weapons]; next[idx].damage = e.target.value; updateCharacter({ weapons: next }); }} className="bg-transparent w-full text-center font-bold outline-none" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button 
              onClick={() => updateCharacter({ weapons: [...character.weapons, { name: 'Nova Arma', bonus: '+0', damage: '1d4' }] })}
              className="mt-6 w-full py-3 bg-[#8b4513] text-[#fdf5e6] rounded-xl cinzel text-[10px] font-bold hover:bg-[#5d4037] shadow-lg uppercase tracking-[0.2em] border-b-4 border-black/40 active:translate-y-1 active:border-b-0 transition-all"
            >
              + Registrar Arma
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CharacterSheet;
