
import React, { useState } from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

const Settings: React.FC<Props> = ({ character, updateCharacter, theme, setTheme, onNavigate, onLogout }) => {
  const [currentLang, setCurrentLang] = useState<'pt' | 'en'>('pt');
  
  const handleExport = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${character.name.replace(/\s+/g, '_')}_cronica.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-6 border-b-2 border-[#8b4513]/20 pb-2 flex flex-col items-center sm:items-start">
      <h3 className={`cinzel text-sm font-bold uppercase tracking-[0.2em] ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>{title}</h3>
      {subtitle && <span className="text-[10px] cinzel text-[#8b4513]/60 uppercase font-bold tracking-widest">{subtitle}</span>}
    </div>
  );

  return (
    <div className="flex flex-col gap-10 p-4 sm:p-10 max-w-5xl mx-auto pb-32">
      
      {/* CABEÇALHO DAS CONFIGURAÇÕES */}
      <header className="relative text-center py-4">
        <h2 className={`cinzel text-3xl sm:text-4xl font-bold mb-4 uppercase tracking-[0.2em] drop-shadow-sm ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>Configurações</h2>
        <div className="flex items-center justify-center gap-4 opacity-40">
           <div className={`h-px w-24 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'to-[#d4af37]' : 'to-[#8b4513]'}`}></div>
           <svg className={`w-6 h-6 ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73-1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
           <div className={`h-px w-24 bg-gradient-to-l from-transparent ${theme === 'dark' ? 'to-[#d4af37]' : 'to-[#8b4513]'}`}></div>
        </div>
      </header>

      {/* SEÇÃO DE CONTA E SEGURANÇA */}
      <section>
        <SectionHeader title="Portal de Acesso" subtitle="Gerenciamento de Identidade" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={onLogout}
            className={`flex items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all group ${
              theme === 'dark' 
                ? 'bg-red-900/10 border-red-900/30 hover:bg-red-900/20 hover:border-red-500' 
                : 'bg-red-50 border-red-100 hover:bg-red-100 hover:border-red-300'
            }`}
          >
            <svg className={`w-6 h-6 transition-transform group-hover:scale-110 ${theme === 'dark' ? 'text-red-500' : 'text-red-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <div className="text-left">
               <span className={`block cinzel text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-red-400' : 'text-red-800'}`}>Deslogar</span>
               <span className={`block parchment-text text-[10px] opacity-60 ${theme === 'dark' ? 'text-red-300' : 'text-red-900'}`}>Sair desta sessão</span>
            </div>
          </button>

          <button 
            onClick={onLogout}
            className={`flex items-center justify-center gap-4 p-6 rounded-2xl border-2 transition-all group ${
              theme === 'dark' 
                ? 'bg-[#d4af37]/5 border-[#d4af37]/20 hover:bg-[#d4af37]/10 hover:border-[#d4af37]' 
                : 'bg-[#8b4513]/5 border-[#8b4513]/10 hover:bg-[#8b4513]/10 hover:border-[#8b4513]'
            }`}
          >
            <svg className={`w-6 h-6 transition-transform group-hover:rotate-12 ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#8b4513]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <div className="text-left">
               <span className={`block cinzel text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>Trocar de conta</span>
               <span className={`block parchment-text text-[10px] opacity-60 ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>Entrar como outro herói</span>
            </div>
          </button>
        </div>
      </section>

      {/* SEÇÃO DE ASSINATURA (SaaS) */}
      <section>
        <SectionHeader title="Selo de Herói" subtitle="Status da sua Jornada" />
        <div className={`border-2 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group transition-all flex flex-col md:flex-row items-center justify-between gap-6 ${theme === 'dark' ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2d1b0d] border-[#d4af37]/40' : 'bg-gradient-to-br from-[#fdf5e6] to-[#fffacd] border-[#8b4513]/40'}`}>
          <div className="flex items-center gap-6">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 ${theme === 'dark' ? 'bg-black/40 border-white/10 text-white/40' : 'bg-white/40 border-black/10 text-black/20'}`}>
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <p className={`cinzel font-bold text-lg leading-none ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>Andarilho</p>
              <p className={`parchment-text text-sm italic opacity-60 ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>Nível de Assinante: Gratuito</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('SUBSCRIPTION')}
            className={`cinzel font-bold py-3 px-8 rounded-xl transition-all shadow-[0_5px_15px_rgba(0,0,0,0.3)] active:translate-y-1 border-b-4 uppercase tracking-widest text-[10px] whitespace-nowrap ${theme === 'dark' ? 'bg-[#d4af37] text-[#1a1a1a] border-[#b8860b] hover:bg-[#b8860b]' : 'bg-[#8b4513] text-[#fdf5e6] border-[#3e2723] hover:bg-[#5d4037]'}`}
          >
            Gerenciar Plano de Aventureiro
          </button>
        </div>
      </section>

      {/* 1. GESTÃO DE MANUSCRITOS (EXPORTAÇÃO) */}
      <section>
        <SectionHeader title="Exportar Personagem" subtitle="Arquivamento e Preservação" />
        <div className={`border-2 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group transition-all ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#d4af37]/30' : 'bg-[#fdf5e6] border-[#8b4513]'}`}>
          <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg rotate-3 ${theme === 'dark' ? 'bg-[#d4af37] text-[#1a1a1a]' : 'bg-[#8b4513] text-[#fdf5e6]'}`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 00-2 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <div className="flex-grow text-center sm:text-left">
              <p className={`parchment-text text-base mb-6 leading-relaxed ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#5d4037]'}`}>
                Transforme os feitos épicos de <b>{character.name}</b> em um pergaminho digital (.json) para levá-lo a outras mesas.
              </p>
              <button 
                onClick={handleExport}
                className={`cinzel font-bold py-3 px-8 rounded-xl transition-all shadow-md active:translate-y-1 border-b-4 uppercase tracking-widest text-[10px] ${theme === 'dark' ? 'bg-[#d4af37] text-[#1a1a1a] border-[#b8860b] hover:bg-[#b8860b]' : 'bg-[#8b4513] text-[#fdf5e6] border-[#3e2723] hover:bg-[#5d4037]'}`}
              >
                Exportar Crônica
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* 2. TEMA (DARK/LIGHT) */}
        <section>
          <SectionHeader title="Tema Visual" subtitle="Ambiente da Interface" />
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 shadow-md ${theme === 'light' ? 'bg-[#fdf5e6] border-[#d4af37] scale-105 shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-black/10 border-transparent opacity-60 hover:opacity-100'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-[#d4af37] text-white' : 'bg-[#8b4513]/10 text-[#8b4513]'}`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
              </div>
              <span className={`cinzel text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>Claro</span>
            </button>

            <button 
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 shadow-md ${theme === 'dark' ? 'bg-[#1a1a1a] border-[#d4af37] scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-black/10 border-transparent opacity-60 hover:opacity-100'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-[#d4af37] text-[#1a0f00]' : 'bg-black/20 text-[#e8d5b5]/40'}`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              </div>
              <span className={`cinzel text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>Escuro</span>
            </button>
          </div>
        </section>

        {/* 3. IDIOMA */}
        <section>
          <SectionHeader title="Idioma" subtitle="Tradução e Região" />
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setCurrentLang('pt')}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all shadow-sm ${currentLang === 'pt' ? (theme === 'dark' ? 'bg-[#1a1a1a] border-[#d4af37]' : 'bg-[#fdf5e6] border-[#8b4513]') : 'bg-black/5 border-transparent hover:border-[#8b4513]/20'}`}
            >
              <div className="w-8 h-8 rounded bg-[#8b4513]/10 flex items-center justify-center text-xl">🇧🇷</div>
              <span className={`parchment-text font-bold flex-grow text-left ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>Português (Brasil)</span>
              {currentLang === 'pt' && <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-[#d4af37]' : 'bg-[#8b4513]'}`}></div>}
            </button>
            <button 
              onClick={() => setCurrentLang('en')}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all shadow-sm ${currentLang === 'en' ? (theme === 'dark' ? 'bg-[#1a1a1a] border-[#d4af37]' : 'bg-[#fdf5e6] border-[#8b4513]') : 'bg-black/5 border-transparent hover:border-[#8b4513]/20'}`}
            >
              <div className="w-8 h-8 rounded bg-[#8b4513]/10 flex items-center justify-center text-xl">🇺🇸</div>
              <span className={`parchment-text font-bold flex-grow text-left ${theme === 'dark' ? 'text-[#e8d5b5]' : 'text-[#3e2723]'}`}>Inglês (Common Tongue)</span>
              {currentLang === 'en' && <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-[#d4af37]' : 'bg-[#8b4513]'}`}></div>}
            </button>
          </div>
        </section>
      </div>

      {/* 4. SOBRE (INFO) */}
      <section className="mt-6">
        <SectionHeader title="Sobre o Aplicativo" subtitle="Informações do Projeto" />
        <div className={`border-2 p-6 rounded-3xl transition-colors ${theme === 'dark' ? 'bg-[#1a1a1a]/60 border-[#2a2a2a]' : 'bg-[#fdf5e6]/60 border-[#8b4513]/20'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#8b4513]/10 text-[#8b4513]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <div>
                <h4 className={`cinzel text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>Privacidade Total</h4>
                <p className={`parchment-text text-[11px] ${theme === 'dark' ? 'text-[#e8d5b5]/70' : 'text-[#5d4037]/70'}`}>Nenhuma informação é enviada a servidores. Seus dados residem apenas neste dispositivo (LocalStorage).</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'bg-[#8b4513]/10 text-[#8b4513]'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <h4 className={`cinzel text-[10px] font-bold uppercase ${theme === 'dark' ? 'text-[#d4af37]' : 'text-[#3e2723]'}`}>Uso Offline</h4>
                <p className={`parchment-text text-[11px] ${theme === 'dark' ? 'text-[#e8d5b5]/70' : 'text-[#5d4037]/70'}`}>Acesse sua lenda mesmo sem conexão rúnica, ideal para sessões de jogo em qualquer lugar.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#8b4513]/10 text-center">
            <span className={`cinzel text-[9px] font-bold uppercase tracking-[0.4em] ${theme === 'dark' ? 'text-[#d4af37]/40' : 'text-[#8b4513]/40'}`}>v1.5.0 • Inspirado em Gygax & Arneson</span>
          </div>
        </div>
      </section>

      {/* SELO DE AUTENTICIDADE FINAL */}
      <div className="flex flex-col items-center opacity-30 mt-4">
         <div className={`w-12 h-12 border-2 rounded-full flex items-center justify-center relative mb-2 ${theme === 'dark' ? 'border-[#d4af37] text-[#d4af37]' : 'border-[#8b4513] text-[#8b4513]'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
         </div>
      </div>
    </div>
  );
};

export default Settings;
