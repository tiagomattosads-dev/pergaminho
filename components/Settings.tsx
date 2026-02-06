
import React from 'react';
import { Character } from '../types';
import { translations } from '../translations';

interface Props {
  character?: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  appLanguage: 'pt' | 'en';
  setAppLanguage: (lang: 'pt' | 'en') => void;
}

const Settings: React.FC<Props> = ({ 
  character, 
  updateCharacter, 
  theme, 
  setTheme, 
  onNavigate, 
  onLogout,
  appLanguage,
  setAppLanguage
}) => {
  const isDark = theme === 'dark';
  const lang = appLanguage;
  const t = translations[lang];
  
  const handleExport = () => {
    if (!character) return;
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${character.name.replace(/\s+/g, '_')}_cronica.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const SectionHeader: React.FC<{ title: string; subtitle?: string; icon?: React.ReactNode }> = ({ title, subtitle, icon }) => (
    <div className="mb-8 border-b-2 border-[#8b4513]/10 pb-4 flex items-center gap-4">
      {icon && <div className={`p-2 rounded-lg ${isDark ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#8b4513]/10 text-[#8b4513]'}`}>{icon}</div>}
      <div className="flex flex-col text-left">
        <h3 className={`cinzel text-base font-bold uppercase tracking-[0.2em] leading-none ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{title}</h3>
        {subtitle && <span className="text-[10px] cinzel text-[#8b4513]/60 uppercase font-bold tracking-widest mt-1">{subtitle}</span>}
      </div>
    </div>
  );

  const SettingCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`p-6 sm:p-8 rounded-[2rem] border-2 shadow-xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group w-full ${
      isDark ? 'bg-[#1a1a1a] border-white/5' : 'bg-[#fdf5e6] border-[#8b4513]/20'
    } ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 p-4 sm:p-10 max-w-4xl mx-auto pb-32">
      
      {/* CABEÇALHO HEROICO */}
      <header className="relative text-center py-8 mb-4">
        <h2 className={`cinzel text-4xl sm:text-6xl font-bold mb-4 uppercase tracking-[0.2em] drop-shadow-md ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>
          {t.settings}
        </h2>
        <div className="flex items-center justify-center gap-6 opacity-30">
           <div className={`h-px w-32 bg-gradient-to-r from-transparent ${isDark ? 'to-[#d4af37]' : 'to-[#8b4513]'}`}></div>
           <svg className={`w-8 h-8 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
           <div className={`h-px w-32 bg-gradient-to-l from-transparent ${isDark ? 'to-[#d4af37]' : 'to-[#8b4513]'}`}></div>
        </div>
      </header>

      {/* FLUXO VERTICAL DE SESSÕES */}
      <div className="flex flex-col gap-10">
        
        {/* SESSÃO 1: ACESSO */}
        <SettingCard>
          <SectionHeader 
            title={t.portal_access} 
            subtitle={t.hero_management}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={onLogout}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group ${
                isDark 
                  ? 'bg-red-900/10 border-red-900/20 hover:bg-red-900/30 hover:border-red-500' 
                  : 'bg-red-50 border-red-100 hover:bg-red-100 hover:border-red-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </div>
              <div className="text-left">
                 <span className={`block cinzel text-xs font-bold uppercase tracking-widest ${isDark ? 'text-red-400' : 'text-red-800'}`}>{t.logout}</span>
                 <span className={`block parchment-text text-[10px] opacity-60 ${isDark ? 'text-red-300' : 'text-red-900'}`}>{t.end_session}</span>
              </div>
            </button>

            <button 
              onClick={() => onNavigate('SELECTION')}
              className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group ${
                isDark 
                  ? 'bg-[#d4af37]/5 border-[#d4af37]/10 hover:bg-[#d4af37]/10 hover:border-[#d4af37]' 
                  : 'bg-[#8b4513]/5 border-[#8b4513]/10 hover:bg-[#8b4513]/10 hover:border-[#8b4513]'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12 ${isDark ? 'bg-[#d4af37] text-black' : 'bg-[#8b4513] text-[#fdf5e6]'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <div className="text-left">
                 <span className={`block cinzel text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{t.change_hero}</span>
                 <span className={`block parchment-text text-[10px] opacity-60 ${isDark ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>{t.change_record}</span>
              </div>
            </button>
          </div>
        </SettingCard>

        {/* SESSÃO 2: STATUS / SELO */}
        <SettingCard className={`relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2d1b0d]' : 'bg-gradient-to-br from-[#fdf5e6] to-[#fffacd]'}`}>
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          </div>
          <SectionHeader 
            title={t.hero_seal} 
            subtitle={t.guild_status}
            icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border-2 rotate-3 ${isDark ? 'bg-black/60 border-[#d4af37] text-[#d4af37]' : 'bg-white/60 border-[#8b4513] text-[#8b4513]'}`}>
                 <span className="fantasy-title text-2xl">A</span>
              </div>
              <div className="text-left">
                <p className={`cinzel font-bold text-xl leading-none mb-1 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{t.wanderer}</p>
                <p className={`parchment-text text-sm italic opacity-60 ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{t.free_subscriber}</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('SUBSCRIPTION')}
              className={`cinzel font-bold py-4 px-10 rounded-2xl transition-all shadow-xl active:translate-y-1 border-b-4 uppercase tracking-widest text-xs whitespace-nowrap ${
                isDark ? 'bg-[#d4af37] text-[#1a1a1a] border-[#b8860b] hover:bg-[#b8860b]' : 'bg-[#8b4513] text-[#fdf5e6] border-[#3e2723] hover:bg-[#5d4037]'
              }`}
            >
              {t.elevate_status}
            </button>
          </div>
        </SettingCard>

        {/* SESSÃO 3: TEMA */}
        <SettingCard>
          <SectionHeader 
            title={t.soul_mirror} 
            subtitle={t.visual_aesthetic}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
          />
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 shadow-lg ${theme === 'light' ? 'bg-[#fdf5e6] border-[#d4af37] scale-105 shadow-[#d4af37]/20' : 'bg-black/5 border-transparent opacity-40 hover:opacity-100'}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-orange-100 text-[#8b4513]' : 'bg-black/20 text-[#e8d5b5]'}`}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
              </div>
              <span className={`cinzel text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-[#8b4513]' : 'text-[#e8d5b5]'}`}>{t.day}</span>
            </button>

            <button 
              onClick={() => setTheme('dark')}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 shadow-lg ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#d4af37] scale-105 shadow-[#d4af37]/40' : 'bg-black/5 border-transparent opacity-40 hover:opacity-100'}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#d4af37] text-black' : 'bg-black/20 text-[#e8d5b5]'}`}>
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              </div>
              <span className={`cinzel text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{t.night}</span>
            </button>
          </div>
        </SettingCard>

        {/* SESSÃO 4: IDIOMA */}
        <SettingCard>
          <SectionHeader 
            title={t.kingdom_language} 
            subtitle={t.translation_concepts}
            icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5a18.022 18.022 0 01-3.827-5.802M13 15.5l5.5 15.5M14.5 21a6.744 6.744 0 11-9.032-9.212M20 19l-3.5-7.333L13 19M14.167 15h5.166" /></svg>}
          />
          <div className="flex flex-col gap-3">
            {[
              { id: 'pt', name: 'Português (Brasil)', flag: '🇧🇷' },
              { id: 'en', name: 'Common Tongue', flag: '🇺🇸' }
            ].map(l => (
              <button 
                key={l.id}
                onClick={() => {
                  setAppLanguage(l.id as 'pt' | 'en');
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${lang === l.id ? (isDark ? 'bg-white/5 border-[#d4af37]' : 'bg-black/5 border-[#8b4513]') : 'border-transparent opacity-40 hover:opacity-80'}`}
              >
                <span className="text-xl">{l.flag}</span>
                <span className={`parchment-text font-bold text-sm flex-grow text-left ${isDark ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>{l.name}</span>
                {lang === l.id && <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#d4af37]' : 'bg-[#8b4513]'}`}></div>}
              </button>
            ))}
          </div>
        </SettingCard>

        {/* SESSÃO 5: EXPORTAÇÃO (SÓ APARECE SE TIVER PERSONAGEM) */}
        {character && (
          <SettingCard>
            <SectionHeader 
              title={t.manuscript_library} 
              subtitle={t.data_preservation}
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className={`p-6 rounded-3xl border-2 rotate-[-2deg] transition-transform hover:rotate-0 shadow-lg ${isDark ? 'bg-black/40 border-white/5' : 'bg-white border-[#8b4513]/10'}`}>
                <svg className={`w-12 h-12 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <div className="flex-grow text-left">
                <p className={`parchment-text text-base mb-6 leading-relaxed ${isDark ? 'text-[#e8d5b5]/80' : 'text-[#5d4037]'}`}>
                  {lang === 'pt' ? 'Transforme os feitos épicos de' : 'Transform the epic deeds of'} <b>{character.name}</b> {lang === 'pt' ? 'em um pergaminho sagrado (.json) para levá-lo a outras mesas.' : 'into a sacred scroll (.json) to take to other tables.'}
                </p>
                <button 
                  onClick={handleExport}
                  className={`cinzel font-bold py-3 px-8 rounded-xl transition-all shadow-md active:translate-y-1 border-b-4 uppercase tracking-widest text-[10px] ${
                    isDark ? 'bg-[#d4af37] text-[#1a1a1a] border-[#b8860b] hover:bg-[#b8860b]' : 'bg-[#8b4513] text-[#fdf5e6] border-[#3e2723] hover:bg-[#5d4037]'
                  }`}
                >
                  {t.extract_chronicle}
                </button>
              </div>
            </div>
          </SettingCard>
        )}

        {/* SESSÃO 6: FEEDBACK */}
        <SettingCard className={`border-dashed ${isDark ? 'border-[#d4af37]/30' : 'border-[#8b4513]/30'}`}>
          <SectionHeader 
            title={t.owl_messages} 
            subtitle={t.feedback_suggestions}
          />
          <div className="flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 relative group/owl transition-transform hover:scale-110 ${isDark ? 'bg-[#d4af37]/10' : 'bg-[#8b4513]/10'}`}>
              <svg className={`w-10 h-10 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center animate-bounce">
                <span className="text-[10px] font-bold text-white">!</span>
              </div>
            </div>
            <p className={`parchment-text text-sm mb-6 leading-relaxed italic ${isDark ? 'text-[#e8d5b5]/60' : 'text-[#5d4037]/70'}`}>
              {lang === 'pt' ? '"Sua voz ecoa nas masmorras dos criadores. Envie uma coruja com suas sugestões ou relate as maldições (bugs) encontradas."' : '"Your voice echoes in the creators dungeons. Send an owl with your suggestions or report any curses (bugs) encountered."'}
            </p>
            <a 
              href="https://forms.gle/XKueShJSMiuRa3ud7" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`w-full cinzel font-bold py-4 rounded-xl transition-all shadow-xl active:translate-y-1 border-b-4 uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 ${
                isDark ? 'bg-[#d4af37] text-[#1a1a1a] border-[#b8860b] hover:bg-[#b8860b]' : 'bg-[#8b4513] text-[#fdf5e6] border-[#3e2723] hover:bg-[#5d4037]'
              }`}
            >
              {t.send_owl}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </a>
          </div>
        </SettingCard>

      </div>

      {/* SOBRE O PROJETO */}
      <footer className="mt-8">
        <div className={`p-8 rounded-[2.5rem] border-2 transition-all ${isDark ? 'bg-[#1a1a1a]/40 border-white/5' : 'bg-black/5 border-[#8b4513]/10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className={`cinzel text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{t.security_runic}</h4>
              <p className={`parchment-text text-[11px] leading-relaxed ${isDark ? 'text-[#e8d5b5]/50' : 'text-[#5d4037]/60'}`}>
                {lang === 'pt' ? 'Todos os seus dados residem apenas na sua alma digital (LocalStorage). Nenhuma crônica é enviada para servidores externos.' : 'All your data resides only in your digital soul (LocalStorage). No chronicle is sent to external servers.'}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className={`cinzel text-xs font-bold uppercase tracking-widest ${isDark ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{t.connected_world}</h4>
              <p className={`parchment-text text-[11px] leading-relaxed ${isDark ? 'text-[#e8d5b5]/50' : 'text-[#5d4037]/60'}`}>
                {lang === 'pt' ? 'Acesse seus heróis mesmo sem conexão com o plano astral. O Pergaminho é projetado para durar eras em qualquer lugar.' : 'Access your heroes even without connection to the astral plane. The Scroll is designed to last ages anywhere.'}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-center justify-center gap-2">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center opacity-20 ${isDark ? 'border-[#d4af37] text-[#d4af37]' : 'border-[#8b4513] text-[#8b4513]'}`}>
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
              </div>
              <span className={`cinzel text-[9px] font-bold uppercase tracking-[0.4em] opacity-20 ${isDark ? 'text-[#d4af37]' : 'text-[#8b4513]'}`}>v1.5.0 • {t.digital_chronicle}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
