import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Character, Attribute } from './types';
import { INITIAL_CHARACTER, createNewCharacter, getLevelFromXP, getProficiencyFromLevel, XP_TABLE } from './constants';
import CharacterSheet from './components/CharacterSheet';
import Inventory from './components/Inventory';
import Spellbook from './components/Spellbook';
import Backstory from './components/Backstory';
import Settings from './components/Settings';
import Subscription from './components/Subscription';
import CharacterSelection from './components/CharacterSelection';

enum Tab {
  Sheet = 'SHEET',
  Inventory = 'INVENTORY',
  Magic = 'MAGIC',
  History = 'HISTORY',
  Settings = 'SETTINGS',
  Subscription = 'SUBSCRIPTION'
}

const App: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('dnd_5e_characters_list');
    return saved ? JSON.parse(saved) : [INITIAL_CHARACTER];
  });

  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Sheet);
  const [xpToAdd, setXpToAdd] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('dnd_app_theme') as 'light' | 'dark') || 'light';
  });

  const character = useMemo(() => {
    return allCharacters.find(c => c.id === selectedCharId) || null;
  }, [allCharacters, selectedCharId]);

  const levelData = useMemo(() => {
    if (!character) return null;
    const currentLevel = getLevelFromXP(character.exp);
    const profBonus = getProficiencyFromLevel(currentLevel);
    const currentLevelMinXp = XP_TABLE[currentLevel - 1] || 0;
    const nextLevelXp = XP_TABLE[currentLevel] || null;
    
    let progressPercent = 100;
    if (nextLevelXp !== null) {
      const needed = nextLevelXp - currentLevelMinXp;
      const earned = character.exp - currentLevelMinXp;
      progressPercent = Math.min(100, Math.max(0, (earned / needed) * 100));
    }

    return { level: currentLevel, profBonus, nextLevelXp, progressPercent };
  }, [character?.exp]);

  useEffect(() => {
    localStorage.setItem('dnd_5e_characters_list', JSON.stringify(allCharacters));
  }, [allCharacters]);

  useEffect(() => {
    localStorage.setItem('dnd_app_theme', theme);
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [theme]);

  const updateCharacter = useCallback((updates: Partial<Character>) => {
    if (!selectedCharId) return;
    setAllCharacters(prev => prev.map(c => {
      if (c.id === selectedCharId) {
        const nextChar = { ...c, ...updates };
        if (updates.exp !== undefined) {
          nextChar.level = getLevelFromXP(updates.exp);
        }
        return nextChar;
      }
      return c;
    }));
  }, [selectedCharId]);

  const handleAddXp = () => {
    if (character && xpToAdd > 0) {
      updateCharacter({ exp: character.exp + xpToAdd });
      setXpToAdd(0);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateCharacter({ portrait: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleCreateNew = () => {
    const newChar = createNewCharacter();
    setAllCharacters(prev => [...prev, newChar]);
    setSelectedCharId(newChar.id);
  };

  const handleImport = (importedChar: Character) => {
    const charWithNewId = { ...importedChar, id: Date.now().toString() };
    setAllCharacters(prev => [...prev, charWithNewId]);
  };

  const handleDelete = (id: string) => {
    setAllCharacters(prev => {
      const filtered = prev.filter(c => c.id !== id);
      return filtered.length > 0 ? filtered : [INITIAL_CHARACTER];
    });
    if (selectedCharId === id) setSelectedCharId(null);
  };

  const renderTab = () => {
    if (!character) return null;
    switch (activeTab) {
      case Tab.Sheet: 
        return <CharacterSheet character={character} updateCharacter={updateCharacter} onImageUpload={handleImageUpload} theme={theme} />;
      case Tab.Inventory: 
        return <Inventory character={character} updateCharacter={updateCharacter} theme={theme} />;
      case Tab.Magic: 
        return <Spellbook character={character} updateCharacter={updateCharacter} theme={theme} />;
      case Tab.History: 
        return <Backstory character={character} updateCharacter={updateCharacter} onImageUpload={handleImageUpload} />;
      case Tab.Settings: 
        return <Settings character={character} updateCharacter={updateCharacter} theme={theme} setTheme={setTheme} onNavigate={(tab: any) => setActiveTab(tab)} />;
      case Tab.Subscription:
        return <Subscription theme={theme} onBack={() => setActiveTab(Tab.Settings)} />;
      default: 
        return null;
    }
  };

  // Botão de Aba Desktop (Preservado: Apenas Texto)
  const NavButton: React.FC<{ tab: Tab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`relative px-4 py-3 cinzel text-sm font-bold transition-all duration-300 flex items-center justify-center whitespace-nowrap ${
        activeTab === tab 
          ? 'text-[#f4e4bc] bg-[#8b4513] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] scale-105 z-10' 
          : 'text-[#e8d5b5]/60 hover:text-[#e8d5b5] hover:bg-[#3d2511]'
      }`}
    >
      {activeTab === tab && <div className="absolute top-0 left-0 w-full h-1 bg-[#d4af37]"></div>}
      {label}
    </button>
  );

  // Botão de Aba Mobile (Com Ícones corrigidos)
  const MobileNavButton: React.FC<{ tab: Tab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex flex-col items-center justify-center flex-1 py-3 transition-all duration-300 relative ${
        activeTab === tab 
          ? 'text-[#d4af37] bg-[#3d2511]' 
          : 'text-[#e8d5b5]/40 hover:text-[#e8d5b5]/80'
      }`}
    >
      <div className={`mb-1 transition-transform ${activeTab === tab ? 'scale-110' : 'scale-100'}`}>
        {icon}
      </div>
      <span className="text-[10px] cinzel font-bold tracking-tight uppercase">{label}</span>
      {activeTab === tab && <div className="absolute bottom-0 w-1/3 h-0.5 bg-[#d4af37]"></div>}
    </button>
  );

  // Ícone de Magia PNG com Máscara para herdar cor 'currentColor' (dourado quando ativo)
  const MagicIconMobile = () => (
    <div 
      className="w-6 h-6 bg-current transition-all duration-300"
      style={{
        maskImage: "url('https://cdn-icons-png.flaticon.com/512/12616/12616964.png')",
        WebkitMaskImage: "url('https://cdn-icons-png.flaticon.com/512/12616/12616964.png')",
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );

  if (!selectedCharId || !character) {
    return (
      <CharacterSelection 
        characters={allCharacters} 
        onSelect={setSelectedCharId} 
        onCreate={handleCreateNew}
        onDelete={handleDelete}
        onImport={handleImport}
      />
    );
  }

  return (
    <div className={`fixed inset-0 flex flex-col overflow-hidden selection:bg-orange-200 ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className={`fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] ${theme === 'dark' ? 'invert opacity-10' : ''}`}></div>
      <div className={`fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] ${theme === 'dark' ? 'invert' : ''}`}></div>

      <header className={`flex-none z-[60] bg-[#2d1b0d] text-[#e8d5b5] shadow-2xl border-b-4 ${theme === 'dark' ? 'border-[#1a1a1a]' : 'border-[#8b4513]'}`}>
        <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-stretch py-2 md:py-4 lg:py-6 gap-3 md:gap-6">
            
            {/* Identidade do Personagem */}
            <div className="flex-1 flex items-center gap-3 md:gap-6 bg-[#1a0f00]/60 backdrop-blur-md rounded-xl md:rounded-2xl border-2 border-[#8b4513]/50 p-2 md:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden group/identity">
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
              
              <button 
                onClick={() => setSelectedCharId(null)}
                className="flex-none w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-b from-[#3d2511] to-[#1a0f00] border border-[#8b4513]/50 flex items-center justify-center hover:border-[#d4af37] transition-all group/back active:scale-95 shadow-lg"
                title="Trocar Herói"
              >
                <svg className="w-4 h-4 md:w-6 md:h-6 text-[#d4af37] group-hover/back:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex-grow min-w-0 flex flex-col justify-center">
                <div className="relative group/name">
                  <input 
                    value={character.name}
                    onChange={(e) => updateCharacter({ name: e.target.value })}
                    className="bg-transparent text-xl md:text-3xl lg:text-4xl fantasy-title leading-none text-[#d4af37] w-full focus:outline-none truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all focus:text-[#fffacd]"
                  />
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] group-focus-within/name:w-1/2 transition-all duration-500 opacity-50"></div>
                </div>
                
                <div className="flex items-center mt-1.5 md:mt-2">
                  <div className={`px-2 md:px-3 py-0.5 md:py-1 rounded-md bg-[#3d2511]/80 border border-[#8b4513]/30 flex items-center gap-2 shadow-inner`}>
                    <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] cinzel font-bold text-[#e8d5b5] whitespace-nowrap">{character.class}</span>
                    <span className="w-1 h-1 rounded-full bg-[#d4af37] opacity-40"></span>
                    <span className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] cinzel font-bold text-[#e8d5b5]/70 whitespace-nowrap">{character.race}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab(Tab.Settings)}
                className={`md:hidden flex-none p-2.5 rounded-xl border-2 transition-all duration-300 shadow-lg ${activeTab === Tab.Settings || activeTab === Tab.Subscription ? 'bg-[#d4af37] border-[#fffacd] text-[#1a0f00]' : 'bg-[#1a0f00]/50 border-[#8b4513]/40 text-[#d4af37]'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </button>
            </div>

            {/* Status e Experiência */}
            <div className="flex-none w-full md:w-auto flex items-center gap-3 lg:gap-6">
              <div className="flex-grow md:flex-none md:w-[320px] lg:w-[450px] bg-[#1a0f00]/60 backdrop-blur-md rounded-xl md:rounded-2xl border-2 border-[#8b4513]/50 p-2 md:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden group/artifact">
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
                
                <div className="flex items-center gap-2 md:gap-5 mb-1.5 md:mb-3 relative z-10">
                  <div className="relative flex-none">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-b from-[#d4af37] via-[#8b4513] to-[#3d2511] p-[2px] shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#d4af37]/20">
                      <div className="w-full h-full rounded-full bg-[#2d1b0d] flex flex-col items-center justify-center border border-black/50 shadow-inner">
                        <span className="text-[5px] md:text-[7px] cinzel font-extrabold text-[#d4af37] uppercase tracking-widest leading-none">Nvl</span>
                        <span className="text-lg md:text-2xl font-bold fantasy-title text-[#e8d5b5] leading-none mt-0.5">{levelData?.level}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col min-w-0">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[7px] md:text-[10px] cinzel font-bold text-[#d4af37] uppercase tracking-[0.2em] truncate opacity-80">Jornada do Herói</span>
                      <div className="text-right whitespace-nowrap">
                        <span className="text-[8px] md:text-[11px] fantasy-title text-[#f4e4bc] drop-shadow-md">{character.exp}</span>
                        <span className="text-[7px] md:text-[8px] cinzel text-[#e8d5b5]/30 mx-1">/</span>
                        <span className="text-[8px] md:text-[10px] fantasy-title text-[#e8d5b5]/40">{levelData?.nextLevelXp || 'LENDÁRIO'}</span>
                      </div>
                    </div>
                    
                    <div className="h-1.5 md:h-3 w-full bg-black/60 rounded-full border border-[#8b4513]/40 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] p-[1.5px] relative">
                      <div 
                        className="h-full bg-gradient-to-r from-[#5d4037] via-[#d4af37] to-[#f4e4bc] transition-all duration-1000 ease-out relative rounded-full"
                        style={{ width: `${levelData?.progressPercent}%` }}
                      >
                        <div className="absolute top-0 right-0 w-4 h-full bg-white/40 blur-sm rounded-full"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-20 mix-blend-overlay"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative z-10 pt-1.5 border-t border-[#8b4513]/20">
                  <div className="flex-1 relative group/input">
                    <input 
                      type="number"
                      min="0"
                      value={character.exp}
                      onChange={(e) => updateCharacter({ exp: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="bg-black/40 border border-[#8b4513]/50 text-[#e8d5b5] text-center text-[9px] md:text-xs cinzel font-bold py-1.5 md:py-2 px-0 rounded-lg md:rounded-xl focus:outline-none focus:border-[#d4af37] w-full transition-all group-hover/input:border-[#8b4513] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute -top-1.5 left-2 px-1 bg-[#2d1b0d] text-[5px] md:text-[6px] cinzel font-bold text-[#d4af37]/50 uppercase tracking-tighter">Acúmulo</span>
                  </div>

                  <div className="flex-[1.5] flex items-center gap-1.5 md:gap-2">
                    <div className="relative flex-grow">
                      <input 
                        type="number"
                        min="0"
                        value={xpToAdd || ''}
                        onChange={(e) => setXpToAdd(Math.max(0, parseInt(e.target.value) || 0))}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddXp()}
                        placeholder="+"
                        className="bg-black/50 border border-[#d4af37]/30 text-[#d4af37] text-center text-[9px] md:text-xs cinzel font-bold py-1.5 md:py-2 px-0 rounded-lg md:rounded-xl focus:outline-none focus:border-[#d4af37] w-full transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="absolute -top-1.5 left-2 px-1 bg-[#2d1b0d] text-[5px] md:text-[6px] cinzel font-bold text-[#d4af37]/50 uppercase tracking-tighter">Dádiva</span>
                    </div>
                    <button 
                      onClick={handleAddXp} 
                      className="flex-none h-7 md:h-9 px-3 md:px-5 bg-gradient-to-b from-[#8b4513] to-[#3d2511] border border-[#d4af37]/50 rounded-lg md:rounded-xl cinzel text-[8px] md:text-[10px] font-bold text-[#d4af37] hover:from-[#d4af37] hover:to-[#8b4513] hover:text-[#1a0f00] transition-all shadow-lg active:scale-95 uppercase whitespace-nowrap border-b-2"
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveTab(Tab.Settings)}
                className={`hidden md:flex flex-none p-3.5 rounded-2xl border-2 transition-all duration-300 shadow-xl active:scale-95 ${activeTab === Tab.Settings || activeTab === Tab.Subscription ? 'bg-[#d4af37] border-[#fffacd] text-[#1a0f00] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-[#1a0f00] border-[#8b4513]/60 text-[#d4af37] hover:bg-[#2d1b0d] hover:border-[#d4af37]'}`}
                title="Configurações do Pergaminho"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navegação Desktop (Apenas Texto - Restaurada Fora do Flexbox do Cabeçalho) */}
          <nav className="hidden xl:flex justify-start border-t border-[#8b4513]/30 mt-4">
            <div className="flex bg-[#1a0f00]/40 overflow-hidden rounded-t-lg">
              <NavButton tab={Tab.Sheet} label="FICHA TÉCNICA" />
              <NavButton tab={Tab.Inventory} label="INVENTÁRIO" />
              <NavButton tab={Tab.Magic} label="TRUQUES E MAGIAS" />
              <NavButton tab={Tab.History} label="HISTÓRIA" />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
        <div className="max-w-7xl mx-auto p-2 lg:p-8">
           <div className={`transition-all duration-500 rounded-xl shadow-2xl border ${theme === 'dark' ? 'bg-[#121212] border-[#2a2a2a]' : 'bg-[#fdf5e6]/95 border-[#8b4513]/20'}`}>
              {renderTab()}
           </div>
        </div>
      </main>

      {/* Navegação Mobile/Tablet (Com Ícones e Cores Corrigidas) */}
      <nav className="xl:hidden flex-none z-[100] bg-[#2d1b0d] border-t-2 border-[#8b4513] shadow-[0_-5px_20px_rgba(0,0,0,0.7)] flex backdrop-blur-md">
        <MobileNavButton 
          tab={Tab.Sheet} 
          label="Ficha" 
          icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" /></svg>} 
        />
        <MobileNavButton 
          tab={Tab.Inventory} 
          label="Itens" 
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 7H17V6C17 4.34 15.66 3 14 3H10C8.34 3 7 4.34 7 6V7H6C4.34 7 3 8.34 3 10V20C3 21.66 4.34 23 6 23H18C19.66 23 21 21.66 21 20V10C21 8.34 19.66 7 18 7ZM9 6C9 5.45 9.45 5 10 5H14C14.55 5 15 5.45 15 6V7H9V6ZM15 13H9V11H15V13Z" />
            </svg>
          } 
        />
        <MobileNavButton 
          tab={Tab.Magic} 
          label="Magias" 
          icon={<MagicIconMobile />} 
        />
        <MobileNavButton 
          tab={Tab.History} 
          label="Bio" 
          icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>} 
        />
      </nav>
    </div>
  );
};

export default App;