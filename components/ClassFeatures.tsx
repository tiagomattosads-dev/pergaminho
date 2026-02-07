
import React from 'react';
import { Character } from '../types';
import { translations, classTranslations, subclassTranslations } from '../translations';
import { SUBCLASS_LEVELS } from '../constants';
import { BARBARIAN_FEATURES, FeatureInfo } from '../data/classFeaturesData';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  onSelectSubclass: () => void;
  theme?: 'light' | 'dark';
}

const ClassFeatures: React.FC<Props> = ({ character, updateCharacter, onSelectSubclass, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const lang = character.language || 'pt';
  const t = translations[lang];

  const translateValue = (val: string, dictionary: Record<string, { pt: string, en: string }>) => {
    return dictionary[val] ? dictionary[val][lang] : val;
  };

  if (!character.class) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center opacity-40">
        <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <p className="cinzel text-lg uppercase tracking-widest">{t.select_class_first}</p>
      </div>
    );
  }

  const subclassChoiceLevel = SUBCLASS_LEVELS[character.class] || 3;
  const isLevelForSubclass = character.level >= subclassChoiceLevel;
  const needsSubclass = isLevelForSubclass && !character.subclass;

  const getFeaturesForLevel = (level: number): FeatureInfo[] => {
    if (character.class !== "Bárbaro") return [];
    return BARBARIAN_FEATURES.filter(f => {
      if (f.level !== level) return false;
      if (!f.subclass) return true;
      return f.subclass === character.subclass;
    });
  };

  // Componente de Ornamento de Canto em SVG
  const CornerOrnament = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={`absolute w-12 h-12 opacity-20 pointer-events-none ${className}`}>
      <path d="M10 10 L40 10 M10 10 L10 40 M10 10 L30 30" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="3" fill="currentColor" />
    </svg>
  );

  return (
    <div className="flex flex-col p-4 sm:p-8 max-w-5xl mx-auto gap-10 pb-40">
      
      {/* AVISO DE SUBCLASSE REESTILIZADO */}
      {needsSubclass && (
        <div className={`p-8 border-[3px] border-dashed rounded-[2rem] animate-pulse shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden ${isDark ? 'bg-[#d4af37]/5 border-[#d4af37]/40' : 'bg-orange-50 border-[#8b4513]/30'}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] pointer-events-none"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center rotate-45 flex-none shadow-xl ${isDark ? 'bg-black border-[#d4af37] text-[#d4af37]' : 'bg-[#2d1b0d] border-[#d4af37] text-[#d4af37]'}`}>
               <svg className="w-8 h-8 -rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
            <div>
              <p className={`fantasy-title text-2xl tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                {lang === 'pt' ? 'O Destino Chama' : 'Destiny Calls'}
              </p>
              <p className={`parchment-text text-sm italic opacity-70 ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
                {lang === 'pt' ? 'Um novo caminho primitivo se revela diante de você.' : 'A new primitive path reveals itself before you.'}
              </p>
            </div>
          </div>
          <button 
            onClick={onSelectSubclass}
            className={`px-10 py-4 rounded-xl cinzel text-xs font-bold uppercase tracking-widest transition-all border-b-4 hover:scale-105 active:translate-y-1 active:border-b-0 shadow-2xl relative z-10 ${
              isDark ? 'bg-[#d4af37] text-black border-black/40' : 'bg-[#8b4513] text-white border-black/40'
            }`}
          >
            {lang === 'pt' ? 'REIVINDICAR ESPECIALIZAÇÃO' : 'CLAIM SPECIALIZATION'}
          </button>
        </div>
      )}

      {/* CABEÇALHO DA CLASSE REFINADO */}
      <div className={`border-4 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col items-center sm:items-start sm:flex-row gap-10 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
        <CornerOrnament className="top-4 left-4" />
        <CornerOrnament className="top-4 right-4 rotate-90" />
        <CornerOrnament className="bottom-4 left-4 -rotate-90" />
        <CornerOrnament className="bottom-4 right-4 rotate-180" />

        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-4 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-none relative ${isDark ? 'bg-black border-[#d4af37]/40 text-[#d4af37]' : 'bg-[#2d1b0d] border-[#d4af37]/40 text-[#d4af37]'}`}>
          <div className="absolute inset-2 border border-current rounded-full opacity-20"></div>
          <span className="fantasy-title text-5xl drop-shadow-lg">{character.level}</span>
          <div className="absolute -bottom-2 cinzel text-[8px] font-bold uppercase tracking-[0.3em] bg-current text-black px-2 py-0.5 rounded shadow">LVL</div>
        </div>

        <div className="flex flex-col text-center sm:text-left flex-grow relative z-10">
          <h2 className={`fantasy-title text-4xl sm:text-6xl drop-shadow-md leading-tight ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>
            {translateValue(character.class, classTranslations)}
          </h2>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3">
             {character.subclass ? (
               <div className="flex items-center gap-3">
                <span className={`fantasy-title text-2xl ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                  {translateValue(character.subclass, subclassTranslations)}
                </span>
                {character.totemAnimal && (
                  <span className={`cinzel text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${isDark ? 'bg-[#d4af37]/10 border-[#d4af37]/20 text-[#d4af37]' : 'bg-[#8b4513]/10 border-[#8b4513]/20 text-[#8b4513]'}`}>
                    {character.totemAnimal}
                  </span>
                )}
               </div>
             ) : (
               <span className={`cinzel text-xs font-bold uppercase tracking-[0.4em] opacity-40 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                 {lang === 'pt' ? 'SEM ESPECIALIZAÇÃO' : 'NO SPECIALIZATION'}
               </span>
             )}
          </div>
        </div>

        {!character.subclass && isLevelForSubclass && (
          <button 
            onClick={onSelectSubclass}
            className={`mt-6 sm:mt-0 sm:ml-auto px-8 py-4 rounded-xl cinzel text-[10px] font-bold uppercase tracking-[0.3em] transition-all border-b-6 active:translate-y-1 active:border-b-0 shadow-xl ${
              isDark ? 'bg-[#d4af37] text-black border-black/60' : 'bg-[#8b4513] text-white border-black/60'
            }`}
          >
            {t.choose_subclass}
          </button>
        )}
      </div>

      {/* TIMELINE DE HABILIDADES */}
      <div className="space-y-16">
        <div className="flex items-center gap-6 opacity-30">
          <div className="h-px flex-1 bg-current"></div>
          <h3 className={`cinzel text-[10px] font-bold uppercase tracking-[0.5em] text-center`}>
            {t.features_by_level}
          </h3>
          <div className="h-px flex-1 bg-current"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 relative">
          {/* Linha da Timeline lateral */}
          <div className={`absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-1 hidden sm:block opacity-10 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`}></div>

          {[...Array(20)].map((_, i) => {
            const level = i + 1;
            const isUnlocked = level <= character.level;
            const levelFeatures = getFeaturesForLevel(level);
            
            // Layout para Nível Bloqueado (Estado Selado)
            if (!isUnlocked) {
               return (
                <div key={level} className="group relative flex gap-8 items-start opacity-30 transition-all duration-700 grayscale">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-none border-2 shadow-inner transition-transform group-hover:scale-95 bg-gray-600 border-gray-500`}>
                    <span className="fantasy-title text-xl text-white/50">{level}</span>
                  </div>
                  <div className={`flex-grow border-2 border-dashed rounded-3xl p-8 transition-all ${isDark ? 'bg-black/20 border-white/5' : 'bg-black/5 border-black/5'}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="cinzel font-bold text-sm tracking-[0.3em] uppercase text-gray-500">{t.sealed_knowledge}</h4>
                        <div className="h-0.5 w-16 bg-gray-500/20 rounded-full"></div>
                        <p className="parchment-text italic text-sm text-gray-400">
                          {t.features_revealed_at.replace('{level}', level.toString())}
                        </p>
                      </div>
                      {/* Selo de Cera em SVG */}
                      <div className="w-16 h-16 flex-none flex items-center justify-center relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full text-red-900/60 drop-shadow-lg">
                          <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10" fill="currentColor" />
                          <path d="M45 40 L55 40 L55 60 L45 60 Z M45 65 L55 65 L55 70 L45 70 Z" fill="white" fillOpacity="0.3" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
               );
            }

            // Layout para Nível Desbloqueado com Conteúdo
            return (
              <div key={level} className="group relative flex gap-8 items-start transition-all duration-500">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-none border-2 shadow-2xl transition-all group-hover:scale-110 z-20 ${
                  isDark 
                    ? 'bg-[#d4af37] border-white/20 text-black' 
                    : 'bg-[#8b4513] border-[#d4af37] text-[#fdf5e6]'
                }`}>
                  <span className="fantasy-title text-2xl">{level}</span>
                </div>

                <div className={`flex-grow border-2 rounded-[2rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden transition-all group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] ${
                  isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-white border-[#8b4513]/10'
                }`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-10 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}></div>
                  
                  {levelFeatures.length === 0 ? (
                    <div className="py-2">
                       <h4 className={`cinzel font-bold text-sm tracking-[0.3em] uppercase mb-3 opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                         {t.feature} de Nível {level}
                       </h4>
                       <p className="parchment-text italic text-sm opacity-40 leading-relaxed">
                         {lang === 'pt' ? 'Este estágio de sua jornada foca no aprimoramento de suas capacidades naturais e instintos básicos.' : 'This stage of your journey focuses on honing your natural capabilities and basic instincts.'}
                       </p>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {levelFeatures.map((f, idx) => (
                        <div key={idx} className={`relative ${idx > 0 ? 'pt-10' : ''}`}>
                          {idx > 0 && (
                            <div className="absolute top-0 left-0 w-full flex justify-center opacity-10">
                               <div className="h-px w-24 bg-current"></div>
                               <div className="mx-4 text-[8px] rotate-45 border border-current p-1"></div>
                               <div className="h-px w-24 bg-current"></div>
                            </div>
                          )}
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                            <h4 className={`fantasy-title text-3xl tracking-wide group-hover:text-[#d4af37] transition-colors ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>
                              {f.name}
                            </h4>
                            {f.subclass && (
                              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[8px] cinzel font-bold uppercase tracking-[0.2em] shadow-sm ${
                                isDark ? 'bg-black/40 border-[#d4af37]/30 text-[#d4af37]' : 'bg-[#8b4513]/5 border-[#8b4513]/20 text-[#8b4513]'
                              }`}>
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" /></svg>
                                {translateValue(f.subclass, subclassTranslations)}
                              </div>
                            )}
                          </div>
                          
                          <div className={`relative p-1 border-l-4 rounded-r-xl ${isDark ? 'border-[#d4af37]/20 bg-white/5' : 'border-[#8b4513]/20 bg-black/5'}`}>
                            <p className={`parchment-text text-lg leading-relaxed p-4 italic ${isDark ? 'text-[#e8d5b5]/90' : 'text-[#3e2723]/90'}`}>
                              "{f.description}"
                            </p>
                          </div>

                          {/* Seletor de Totem - Melhoria na UI */}
                          {character.subclass === "Caminho do Guerreiro Totêmico" && f.name === "Totem Espiritual" && (
                            <div className={`mt-8 p-6 rounded-2xl border-2 border-dashed relative overflow-hidden ${isDark ? 'bg-[#d4af37]/5 border-[#d4af37]/20' : 'bg-orange-100/30 border-[#8b4513]/20'}`}>
                               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                               </div>
                               <p className="cinzel text-[10px] font-bold uppercase tracking-[0.3em] mb-6 opacity-60 text-center">{lang === 'pt' ? 'CONVOCAR ESPÍRITO GUARDIÃO' : 'SUMMON GUARDIAN SPIRIT'}</p>
                               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  {["Águia", "Lobo", "Urso"].map(totem => (
                                    <button
                                      key={totem}
                                      onClick={() => updateCharacter({ totemAnimal: totem })}
                                      className={`p-4 rounded-xl cinzel text-xs font-bold uppercase transition-all border-2 relative group/totem ${
                                        character.totemAnimal === totem
                                        ? (isDark ? 'bg-[#d4af37] border-white text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' : 'bg-[#8b4513] border-[#d4af37] text-white shadow-xl scale-105')
                                        : (isDark ? 'bg-black/60 border-white/5 text-white/40 hover:border-[#d4af37]/40' : 'bg-white border-[#8b4513]/10 text-[#8b4513]/40 hover:border-[#8b4513]')
                                      }`}
                                    >
                                      {totem}
                                      {character.totemAnimal === totem && (
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                                      )}
                                    </button>
                                  ))}
                               </div>
                               {character.totemAnimal && (
                                 <div className="mt-6 text-center animate-in fade-in zoom-in duration-500">
                                   <div className={`h-px w-full mb-4 opacity-10 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
                                   <p className="parchment-text text-sm italic opacity-80 flex items-center justify-center gap-2">
                                     <svg className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                     {lang === 'pt' ? `O pacto com o ${character.totemAnimal} foi selado em seu sangue.` : `The pact with the ${character.totemAnimal} has been sealed in your blood.`}
                                   </p>
                                 </div>
                               )}
                            </div>
                          )}
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
    </div>
  );
};

export default ClassFeatures;
