
import React from 'react';
import { Character } from '../types';
import { translations } from '../translations';
import { SUBCLASS_LEVELS } from '../constants';

interface Props {
  character: Character;
  onSelectSubclass: () => void;
  theme?: 'light' | 'dark';
}

const ClassFeatures: React.FC<Props> = ({ character, onSelectSubclass, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const lang = character.language || 'pt';
  const t = translations[lang];

  if (!character.class) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center opacity-40">
        <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <p className="cinzel text-lg uppercase tracking-widest">{t.select_class_first}</p>
      </div>
    );
  }

  const subclassChoiceLevel = SUBCLASS_LEVELS[character.class] || 3;
  const isLevelTooLow = character.level < subclassChoiceLevel;

  return (
    <div className="flex flex-col p-4 sm:p-8 max-w-5xl mx-auto gap-8 pb-32">
      {/* Cabeçalho da Classe */}
      <div className={`border-4 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center sm:items-start sm:flex-row gap-6 ${isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 shadow-inner flex-none ${isDark ? 'bg-black/40 border-[#d4af37]/20 text-[#d4af37]' : 'bg-[#8b4513]/5 border-[#8b4513]/20 text-[#8b4513]'}`}>
          <span className="fantasy-title text-4xl">{character.level}</span>
        </div>
        <div className="flex flex-col text-center sm:text-left">
          <h2 className={`fantasy-title text-3xl sm:text-5xl drop-shadow-sm ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>
            {character.class}
          </h2>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1">
             <span className={`cinzel text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
               {t.level_short} {character.level}
             </span>
             {character.subclass && (
               <>
                <span className="w-1 h-1 rounded-full bg-[#d4af37] opacity-40"></span>
                <span className={`fantasy-title text-xl ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>
                  {character.subclass}
                </span>
               </>
             )}
          </div>
        </div>

        {/* Botão de escolha se já estiver no nível mas sem subclasse */}
        {!character.subclass && !isLevelTooLow && (
          <button 
            onClick={onSelectSubclass}
            className={`mt-4 sm:mt-0 sm:ml-auto px-6 py-3 rounded-xl cinzel text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-4 active:translate-y-1 active:border-b-0 ${
              isDark ? 'bg-[#d4af37] text-black border-black/60 hover:brightness-110' : 'bg-[#8b4513] text-white border-black/60 hover:brightness-110'
            }`}
          >
            {t.choose_subclass}
          </button>
        )}

        {/* Aviso de nível baixo (Sealed) */}
        {isLevelTooLow && (
          <div className="mt-4 sm:mt-0 sm:ml-auto flex items-center gap-3 px-4 py-2 rounded-lg bg-black/5 border border-dashed border-current opacity-40">
             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
             <span className="cinzel text-[8px] font-bold uppercase tracking-widest">
               {t.features_revealed_at.replace('{level}', subclassChoiceLevel.toString())}
             </span>
          </div>
        )}
      </div>

      {/* Esqueleto de Talentos por Nível */}
      <div className="space-y-12">
        <h3 className={`cinzel text-xs font-bold uppercase tracking-[0.4em] text-center border-b pb-4 ${isDark ? 'text-[#d4af37]/60 border-white/5' : 'text-[#8b4513]/60 border-[#8b4513]/10'}`}>
          {t.features_by_level}
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {[...Array(20)].map((_, i) => {
            const level = i + 1;
            const isUnlocked = level <= character.level;
            const isSubclassFeature = level === subclassChoiceLevel;
            
            return (
              <div 
                key={level} 
                className={`group relative border-2 rounded-2xl p-6 transition-all duration-500 ${
                  isUnlocked 
                  ? (isDark ? 'bg-white/5 border-[#d4af37]/30 shadow-lg' : 'bg-white border-[#8b4513]/20 shadow-md') 
                  : 'opacity-20 border-transparent grayscale'
                }`}
              >
                {/* Visualização Especial para Nível de Subclasse */}
                {isSubclassFeature && !character.subclass && isUnlocked && (
                  <div className="absolute inset-0 bg-[#d4af37]/5 animate-pulse rounded-2xl pointer-events-none"></div>
                )}

                <div className={`absolute -left-3 top-6 w-8 h-8 rounded-lg flex items-center justify-center fantasy-title text-xl border-2 shadow-lg transition-transform group-hover:scale-110 ${
                  isUnlocked 
                  ? (isDark ? 'bg-[#d4af37] text-black border-[#fffacd]' : 'bg-[#8b4513] text-white border-[#d4af37]') 
                  : 'bg-gray-500 border-gray-400'
                }`}>
                  {level}
                </div>
                
                <div className="ml-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`cinzel font-bold text-sm tracking-[0.2em] uppercase ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>
                      {isUnlocked 
                        ? (isSubclassFeature && character.subclass ? character.subclass : `${t.feature} de Nível ${level}`) 
                        : `???`}
                    </h4>
                  </div>
                  <div className={`h-1 w-24 rounded-full mb-4 opacity-20 ${isDark ? 'bg-[#d4af37]' : 'bg-[#8b4513]'}`}></div>
                  <p className={`parchment-text italic text-sm opacity-40 leading-relaxed`}>
                    {isUnlocked 
                      ? (isSubclassFeature && !character.subclass 
                         ? (lang === 'pt' ? 'Sua especialização aguarda. Escolha sua subclasse para revelar os segredos deste nível.' : 'Your specialization awaits. Choose your subclass to reveal the secrets of this level.')
                         : (lang === 'pt' ? 'Conhecimento gravado nas grandes bibliotecas de crônicas.' : 'Knowledge inscribed in the great chronicle libraries.'))
                      : (lang === 'pt' ? 'O destino ainda não revelou este poder.' : 'Destiny has yet to reveal this power.')}
                  </p>
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
