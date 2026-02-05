
export enum Attribute {
  FOR = 'FOR',
  DES = 'DES',
  CON = 'CON',
  INT = 'INT',
  SAB = 'SAB',
  CAR = 'CAR'
}

export interface Skill {
  name: string;
  attribute: Attribute;
  proficient: boolean;
  expert?: boolean;
}

export interface Item {
  id: string;
  name: string;
  weight: number;
  quantity: number;
  description: string;
  equipped?: boolean;
}

export interface Weapon {
  name: string;
  bonus: string;
  damage: string;
}

export interface Spell {
  name: string;
  level: number;
  prepared: boolean;
  description: string;
}

export interface Character {
  id: string; // Identificador único
  name: string;
  level: number;
  class: string;
  race: string;
  background: string;
  alignment: string;
  exp: number;
  inspiration: number; // Alterado para number
  portrait: string | null;
  hp: {
    current: number;
    max: number;
    temp: number;
  };
  ac: number;
  initiativeBonus: number;
  speed: string;
  stats: Record<Attribute, number>;
  proficiencies: {
    skills: string[];
    saves: Attribute[];
    languages: string[];
    tools: string[];
  };
  personality: string;
  ideals: string;
  bonds: string;
  flaws: string;
  backstory: string;
  inventory: Item[];
  weapons: Weapon[];
  spells: Spell[];
  spellSlots: Record<number, { total: number; used: number }>;
  // Campos de override para conjuração
  spellcastingAbility?: Attribute;
  spellSaveDC?: number;
  spellAttackBonus?: string;
}
