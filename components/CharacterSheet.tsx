
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
      <div className="flex flex-col items-center group relative w-full">
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-[#fdf5e6] border-2 border-[#8b4513] rounded-xl shadow-lg flex flex-col items-center justify-center transition-all group-hover:border-[#d4af37] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]">
          <span className="absolute -top-3 bg-[#8b4513] text-[#fdf5e6] text-[8px] sm:text-[10px] px-2 sm:px-3 py-0.5 rounded-sm font-bold cinzel tracking-widest border border-[#d4af37]/40 z-30 shadow-md">
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
              className="text-3xl sm:text-5xl font-bold fantasy-title bg-transparent w-full text-center focus:outline-none text-[#3e2723] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className="absolute -bottom-4 sm:-bottom-6 w-10 h-10 sm:w-16 sm:h-16 bg-[#fdf5e6] border-2 border-[#8b4513] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform bg-[radial-gradient(#fff_0%,#fdf5e6_100%)] z-20">
             <span className="text-sm sm:text-2xl font-bold cinzel text-[#8b4513] relative z-10">{modDisplay}</span>
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
    <div className="flex flex-col p-2 sm:p-4 pb-12 gap-6">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && onImageUpload(e.target.files[0])} />

      {/* SEÇÃO DE PERFIL EDITÁVEL */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#8b4513]/5 p-4 rounded-xl border border-[#8b4513]/20 shadow-inner">
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Classe</label>
          <input 
            value={character.class} 
            onChange={(e) => updateCharacter({ class: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none fantasy-title text-base sm:text-lg text-[#3e2723] px-1"
            placeholder="Ex: Guerreiro"
          />
        </div>
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Raça</label>
          <input 
            value={character.race} 
            onChange={(e) => updateCharacter({ race: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none fantasy-title text-base sm:text-lg text-[#3e2723] px-1"
            placeholder="Ex: Elfo"
          />
        </div>
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Antecedente</label>
          <input 
            value={character.background} 
            onChange={(e) => updateCharacter({ background: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none parchment-text font-bold text-sm sm:text-base text-[#3e2723] px-1"
            placeholder="Ex: Herói do Povo"
          />
        </div>
        <div className="flex flex-col">
          <label className="cinzel text-[9px] font-bold text-[#8b4513] uppercase tracking-widest mb-1">Tendência</label>
          <input 
            value={character.alignment} 
            onChange={(e) => updateCharacter({ alignment: e.target.value })}
            className="bg-transparent border-b border-[#8b4513]/20 focus:border-[#8b4513] outline-none parchment-text font-bold text-sm sm:text-base text-[#3e2723] px-1"
            placeholder="Ex: Leal e Bom"
          />
        </div>
      </section>

      {/* CABEÇALHO PRINCIPAL: RETRATO GRANDE (50%) + ATRIBUTOS (50%) */}
      <section className="flex flex-col md:flex-row gap-4 lg:gap-8 items-stretch">
        
        {/* RETRATO DO PERSONAGEM (50% da largura em Tablet/PC) */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-3 rounded-2xl shadow-xl flex flex-col items-center gap-4 relative h-full">
            <div className="w-full flex justify-between items-center z-10">
              <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm border border-[#8b4513]/20 p-1 rounded-lg w-12 sm:w-16 shadow-sm">
                <span className="text-[7px] cinzel font-bold text-[#8b4513]">PROF.</span>
                <span className="text-base sm:text-lg font-bold fantasy-title text-[#3e2723]">+{profBonus}</span>
              </div>
              <div className="flex flex-col items-center bg-white/70 backdrop-blur-sm border border-[#8b4513]/20 p-1 rounded-lg w-12 sm:w-16 shadow-sm">
                <span className="text-[7px] cinzel font-bold text-[#8b4513]">INSP.</span>
                {/* Alterado para input numérico */}
                <input 
                  type="number" 
                  min="0"
                  value={character.inspiration} 
                  onChange={(e) => updateCharacter({ inspiration: parseInt(e.target.value) || 0 })} 
                  className="w-full text-center bg-transparent focus:outline-none font-bold text-lg fantasy-title [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                />
              </div>
            </div>

            <div 
              className="w-full flex-grow bg-[#1a0f00] rounded-xl border border-[#8b4513] overflow-hidden shadow-2xl relative group cursor-pointer min-h-[300px]" 
              onClick={() => fileInputRef.current?.click()}
            >
              {character.portrait ? (
                <img src={character.portrait} alt="Portrait" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#f4e4bc]/20 italic p-6 text-center text-xs cinzel uppercase tracking-widest">Clique para Carregar Retrato</div>
              )}
            </div>
          </div>
        </div>

        {/* GRADE DE ATRIBUTOS (50% da largura em Tablet/PC - 2x3) */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-[#fdf5e6]/70 border-2 border-[#8b4513]/20 p-6 rounded-2xl shadow-inner h-full flex flex-col justify-center">
            {/* Grid 2x3 de medalhões */}
            <div className="grid grid-cols-3 gap-y-14 gap-x-4 sm:gap-x-8 py-4">
              {(Object.entries(character.stats) as [Attribute, number][]).map(([attr, score]) => (
                <StatBoxMedallion key={attr} attr={attr} score={score} />
              ))}
            </div>
            
            {/* SALVAGUARDAS INTEGRADAS */}
            <div className="mt-10 pt-6 border-t border-[#8b4513]/20">
              <h3 className="cinzel text-[10px] font-bold text-[#8b4513] text-center mb-4 uppercase tracking-widest opacity-70">Testes de Resistência</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.keys(character.stats).map((key) => {
                  const attr = key as Attribute;
                  const isProf = character.proficiencies.saves.includes(attr);
                  const mod = getModifier(character.stats[attr]) + (isProf ? profBonus : 0);
                  return (
                    <div key={attr} className="flex items-center gap-2 p-1.5 bg-white/40 rounded-lg border border-[#8b4513]/10">
                      <input type="checkbox" checked={isProf} onChange={() => toggleSave(attr)} className="w-3.5 h-3.5 cursor-pointer accent-[#8b4513]" />
                      <span className="w-6 font-bold text-[#8b4513] text-center text-sm">{mod >= 0 ? `+${mod}` : mod}</span>
                      <span className="parchment-text uppercase font-bold text-[9px] text-[#3e2723]">{attr}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO INFERIOR: PERÍCIAS, COMBATE, HP E ARMAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PERÍCIAS */}
        <section className="bg-[#fdf5e6] border-2 border-[#8b4513] p-4 rounded-xl shadow-xl">
           <h2 className="cinzel text-[10px] font-bold border-b border-[#8b4513]/20 mb-3 pb-1 tracking-widest text-[#8b4513] uppercase">Perícias</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
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

           <div className="mt-4 pt-3 border-t border-[#8b4513]/10">
             <span className="cinzel font-bold block mb-1 text-[9px] text-[#8b4513] opacity-70 uppercase tracking-widest">Idiomas</span>
             <textarea 
               className="w-full bg-transparent border-none focus:outline-none text-center resize-none leading-tight parchment-text italic" 
               rows={2} 
               value={character.proficiencies.languages.join(', ')} 
               onChange={(e) => updateCharacter({ proficiencies: { ...character.proficiencies, languages: e.target.value.split(',').map(s=>s.trim()).filter(s=>s!=="") } })} 
             />
          </div>
        </section>

        {/* COMBATE E VIDA */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
             <div className="bg-white border-2 border-[#8b4513] rounded-xl p-3 text-center shadow-lg">
                <span className="block text-[9px] cinzel font-bold text-[#8b4513] uppercase">C. Armadura</span>
                <input 
                  type="number" 
                  value={character.ac} 
                  onChange={(e) => updateCharacter({ ac: parseInt(e.target.value) || 0 })} 
                  className="text-2xl font-bold fantasy-title bg-transparent w-full text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0" 
                />
             </div>
             <div className="bg-white border-2 border-[#8b4513] rounded-xl p-3 text-center shadow-lg">
                <span className="block text-[9px] cinzel font-bold text-[#8b4513] uppercase">Iniciativa</span>
                <input 
                  type="number" 
                  value={character.initiativeBonus} 
                  onChange={(e) => updateCharacter({ initiativeBonus: parseInt(e.target.value) || 0 })} 
                  className="text-2xl font-bold fantasy-title bg-transparent w-full text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0" 
                />
             </div>
             <div className="bg-white border-2 border-[#8b4513] rounded-xl p-3 text-center shadow-lg">
                <span className="block text-[8px] cinzel font-bold text-[#8b4513] uppercase whitespace-nowrap">Deslocamento</span>
                <input 
                  value={character.speed} 
                  onChange={(e) => updateCharacter({ speed: e.target.value })} 
                  className="text-xl font-bold fantasy-title bg-transparent w-full text-center outline-none p-0" 
                />
             </div>
          </div>

          <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-4 rounded-2xl shadow-xl flex flex-col">
             <div className="flex justify-between items-center mb-4 border-b border-[#8b4513]/20 pb-2">
                <h2 className="cinzel font-bold text-[10px] text-[#8b4513] tracking-widest uppercase">Vida</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase font-bold opacity-50">MÁX</span>
                  <input 
                    type="number"
                    value={character.hp.max}
                    onChange={(e) => updateCharacter({ hp: { ...character.hp, max: parseInt(e.target.value) || 0 } })}
                    className="bg-transparent font-bold w-12 text-center focus:outline-none border-b border-[#8b4513]/40 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
             </div>
             <div className="flex items-center justify-center py-4">
                <input 
                  type="number" 
                  value={character.hp.current} 
                  onChange={(e) => updateCharacter({ hp: { ...character.hp, current: parseInt(e.target.value) || 0 } })}
                  className="w-full text-center text-6xl font-bold bg-transparent focus:outline-none text-[#8b4513] drop-shadow-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none p-0" 
                />
             </div>
             <div className="flex gap-4 text-center mt-2 pt-2 border-t border-[#8b4513]/10">
               <div className="flex-1">
                  <span className="block text-[8px] cinzel text-[#8b4513] font-bold uppercase">Temp.</span>
                  <input 
                    type="number" 
                    value={character.hp.temp} 
                    onChange={(e) => updateCharacter({ hp: { ...character.hp, temp: parseInt(e.target.value) || 0 } })}
                    className="w-full text-center font-bold bg-transparent outline-none text-2xl mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  />
               </div>
               <div className="flex-1">
                  <span className="block text-[8px] cinzel text-[#8b4513] font-bold uppercase">Dados</span>
                  <span className="font-bold text-2xl block mt-1 tracking-tighter">1d8</span>
               </div>
             </div>
          </div>

          <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-4 rounded-2xl shadow-xl overflow-hidden flex flex-col">
             <h2 className="cinzel font-bold text-[10px] mb-4 border-b border-[#8b4513]/20 text-[#8b4513] tracking-widest uppercase pb-1">Arsenal</h2>
             <div className="flex-grow overflow-y-auto pr-1 custom-scrollbar max-h-[250px]">
                <table className="w-full text-left text-sm">
                   <thead className="sticky top-0 bg-[#fdf5e6] z-10">
                     <tr className="cinzel text-[9px] opacity-60 text-[#8b4513] border-b border-[#8b4513]/10">
                       <th className="pb-2">NOME</th>
                       <th className="pb-2 text-center">BÔNUS</th>
                       <th className="pb-2 text-right">DANO</th>
                     </tr>
                   </thead>
                   <tbody className="parchment-text font-bold text-[#5d4037]">
                     {character.weapons.map((w, idx) => (
                       <tr key={idx} className="border-b border-[#8b4513]/5 hover:bg-[#8b4513]/5">
                         <td className="py-2 pr-2">
                           <input 
                             value={w.name}
                             onChange={(e) => {
                               const next = [...character.weapons];
                               next[idx].name = e.target.value;
                               updateCharacter({ weapons: next });
                             }}
                             className="bg-transparent w-full focus:outline-none truncate text-[#3e2723]"
                           />
                         </td>
                         <td className="text-center px-1">
                            <input 
                             value={w.bonus}
                             onChange={(e) => {
                               const next = [...character.weapons];
                               next[idx].bonus = e.target.value;
                               updateCharacter({ weapons: next });
                             }}
                             className="bg-transparent w-full text-center focus:outline-none"
                           />
                         </td>
                         <td className="text-right pl-2">
                            <input 
                             value={w.damage}
                             onChange={(e) => {
                               const next = [...character.weapons];
                               next[idx].damage = e.target.value;
                               updateCharacter({ weapons: next });
                             }}
                             className="bg-transparent w-full text-right focus:outline-none"
                           />
                         </td>
                       </tr>
                     ))}
                   </tbody>
                </table>
             </div>
             <button 
              onClick={() => updateCharacter({ weapons: [...character.weapons, { name: 'Nova Arma', bonus: '+0', damage: '1d4' }] })}
              className="mt-4 w-full text-[10px] cinzel text-white bg-[#8b4513] py-2 rounded-lg hover:bg-[#5d4037] transition-all font-bold tracking-widest shadow-lg active:scale-95 uppercase"
             >
               + Forjar Arma
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;
