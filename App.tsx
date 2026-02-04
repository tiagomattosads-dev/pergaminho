
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Character, Attribute } from './types';
import { INITIAL_CHARACTER, createNewCharacter, getLevelFromXP, getProficiencyFromLevel, XP_TABLE } from './constants';
import CharacterSheet from './components/CharacterSheet';
import Inventory from './components/Inventory';
import Spellbook from './components/Spellbook';
import Backstory from './components/Backstory';
import Settings from './components/Settings';
import CharacterSelection from './components/CharacterSelection';

enum Tab {
  Sheet = 'SHEET',
  Inventory = 'INVENTORY',
  Magic = 'MAGIC',
  History = 'HISTORY',
  Settings = 'SETTINGS'
}

const App: React.FC = () => {
  const [allCharacters, setAllCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('dnd_5e_characters_list');
    return saved ? JSON.parse(saved) : [INITIAL_CHARACTER];
  });

  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Sheet);
  const [xpToAdd, setXpToAdd] = useState<number>(0);

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
    // Garantir ID único para evitar conflitos
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
      case Tab.Sheet: return <CharacterSheet character={character} updateCharacter={updateCharacter} onImageUpload={handleImageUpload} />;
      case Tab.Inventory: return <Inventory character={character} updateCharacter={updateCharacter} />;
      case Tab.Magic: return <Spellbook character={character} updateCharacter={updateCharacter} />;
      case Tab.History: return <Backstory character={character} updateCharacter={updateCharacter} onImageUpload={handleImageUpload} />;
      case Tab.Settings: return <Settings character={character} updateCharacter={updateCharacter} />;
      default: return null;
    }
  };

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
    <div className="fixed inset-0 flex flex-col bg-[#1a0f00] overflow-hidden selection:bg-orange-200">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]"></div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

      <header className="flex-none z-[60] bg-[#2d1b0d] text-[#e8d5b5] shadow-2xl border-b-4 border-[#8b4513]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-2 lg:py-4 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={() => setSelectedCharId(null)}
                className="flex-none p-2 hover:bg-[#8b4513]/20 rounded-full transition-colors group"
                title="Trocar Herói"
              >
                <svg className="w-6 h-6 text-[#d4af37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex-grow">
                <input 
                  value={character.name}
                  onChange={(e) => updateCharacter({ name: e.target.value })}
                  className="bg-transparent text-xl md:text-3xl fantasy-title leading-tight text-[#d4af37] w-full focus:outline-none"
                />
                <div className="flex items-center text-[8px] md:text-[10px] uppercase tracking-widest cinzel opacity-70">
                  <span>{character.class}</span>
                  <span className="mx-1 text-[#8b4513]">|</span>
                  <span>{character.race}</span>
                </div>
              </div>
            </div>

            <div className="flex-none w-full md:w-auto max-w-xl bg-black/40 rounded-xl border border-[#8b4513]/40 p-3 shadow-inner">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center min-w-[40px]">
                    <span className="text-[7px] cinzel font-bold text-[#d4af37] uppercase">Nível</span>
                    <span className="text-xl font-bold fantasy-title leading-none">{levelData?.level}</span>
                  </div>
                  
                  {/* Ícone de Configurações Estático ao lado do nível */}
                  <button 
                    onClick={() => setActiveTab(Tab.Settings)}
                    className={`p-1.5 rounded-lg border transition-colors ${activeTab === Tab.Settings ? 'bg-[#d4af37] border-[#fffacd] text-[#1a0f00] shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'bg-black/20 border-[#8b4513]/40 text-[#d4af37] hover:bg-[#8b4513]/20'}`}
                    title="Configurações da Crônica"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-grow flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[7px] cinzel font-bold text-[#e8d5b5]/60 uppercase">
                    <span>Experiência</span>
                    <span>{levelData?.nextLevelXp ? `${character.exp} / ${levelData.nextLevelXp}` : 'Máximo'}</span>
                  </div>
                  <div className="h-2 w-full bg-black/50 border border-[#8b4513]/20 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8b4513] via-[#d4af37] to-[#8b4513] transition-all duration-700 relative"
                      style={{ width: `${levelData?.progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] opacity-20"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative group">
                  <input 
                    type="number"
                    min="0"
                    value={character.exp}
                    onChange={(e) => updateCharacter({ exp: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="bg-black/20 border border-[#8b4513]/40 text-[#f4e4bc] text-center text-xs cinzel font-bold py-1 px-2 rounded-lg focus:outline-none focus:border-[#d4af37] w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    min="0"
                    value={xpToAdd}
                    onChange={(e) => setXpToAdd(Math.max(0, parseInt(e.target.value) || 0))}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddXp()}
                    placeholder="+"
                    className="bg-black/30 border border-[#8b4513]/60 text-[#d4af37] text-center text-xs cinzel font-bold py-1 px-2 rounded-lg focus:outline-none focus:border-[#d4af37] w-16 [appearance:textfield]"
                  />
                  <button onClick={handleAddXp} className="px-3 py-1 bg-[#3d2511] border border-[#d4af37]/40 rounded-lg cinzel text-[10px] font-bold text-[#d4af37] hover:bg-[#8b4513] hover:text-[#fdf5e6] transition-all uppercase">Adicionar</button>
                </div>
              </div>
            </div>
          </div>

          <nav className="hidden xl:flex justify-start border-t border-[#8b4513]/30">
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
           <div className="bg-[#fdf5e6]/95 backdrop-blur-[2px] rounded-xl shadow-2xl border border-[#8b4513]/20">
              {renderTab()}
           </div>
        </div>
      </main>

      <nav className="xl:hidden flex-none z-[100] bg-[#2d1b0d] border-t-2 border-[#8b4513] shadow-[0_-5px_20px_rgba(0,0,0,0.7)] flex backdrop-blur-md">
        <MobileNavButton tab={Tab.Sheet} label="Ficha" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" /></svg>} />
        <MobileNavButton tab={Tab.Inventory} label="Itens" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
        <MobileNavButton tab={Tab.Magic} label="Magias" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" /></svg>} />
        <MobileNavButton tab={Tab.History} label="Bio" icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>} />
      </nav>
    </div>
  );
};

export default App;
