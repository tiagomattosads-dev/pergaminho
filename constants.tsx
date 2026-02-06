import { Attribute, Character, Skill } from './types';

export const XP_TABLE = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
  85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

export const getLevelFromXP = (xp: number): number => {
  const level = XP_TABLE.findIndex(req => xp < req);
  if (level === -1) return 20;
  return level === 0 ? 1 : level;
};

export const getProficiencyFromLevel = (level: number): number => {
  return Math.floor((level - 1) / 4) + 2;
};

export const SKILLS: Skill[] = [
  { name: 'Acrobacia', attribute: Attribute.DES, proficient: false },
  { name: 'Adestrar Animais', attribute: Attribute.SAB, proficient: false },
  { name: 'Arcanismo', attribute: Attribute.INT, proficient: true },
  { name: 'Atletismo', attribute: Attribute.FOR, proficient: false },
  { name: 'Atuação', attribute: Attribute.CAR, proficient: false },
  { name: 'Enganação', attribute: Attribute.CAR, proficient: false },
  { name: 'Furtividade', attribute: Attribute.DES, proficient: false },
  { name: 'História', attribute: Attribute.INT, proficient: false },
  { name: 'Intimidação', attribute: Attribute.CAR, proficient: false },
  { name: 'Intuição', attribute: Attribute.SAB, proficient: false },
  { name: 'Investigação', attribute: Attribute.INT, proficient: true },
  { name: 'Medicina', attribute: Attribute.SAB, proficient: false },
  { name: 'Natureza', attribute: Attribute.INT, proficient: false },
  { name: 'Percepção', attribute: Attribute.SAB, proficient: true },
  { name: 'Persuasão', attribute: Attribute.CAR, proficient: true },
  { name: 'Prestidigitação', attribute: Attribute.DES, proficient: false },
  { name: 'Religião', attribute: Attribute.INT, proficient: false },
  { name: 'Sobrevivência', attribute: Attribute.SAB, proficient: false },
];

export const INITIAL_CHARACTER: Character = {
  id: "kaiden-default",
  name: "Kaiden Arvek",
  level: 1,
  class: "Artífice",
  race: "Humano",
  background: "Artesão de Guilda",
  alignment: "Caótico e Neutro",
  exp: 0,
  inspiration: 0,
  portrait: "https://res.cloudinary.com/dutufef4s/image/upload/v1770315204/artifice_lwcguq.png",
  hp: { current: 16, max: 16, temp: 0 },
  ac: 15,
  initiativeBonus: 0,
  speed: "9m",
  stats: {
    [Attribute.FOR]: 10,
    [Attribute.DES]: 12,
    [Attribute.CON]: 12,
    [Attribute.INT]: 15,
    [Attribute.SAB]: 12,
    [Attribute.CAR]: 10,
  },
  proficiencies: {
    skills: ['Arcanismo', 'Investigação', 'Percepção', 'Persuasão'],
    saves: [Attribute.CON, Attribute.INT],
    languages: ['Comum', 'Dracônico', 'Anão'],
    tools: ['Ferramentas de ladrão', 'Ferramentas de funileiro', 'Ferramentas de cartógrafo', 'Ferramentas de ferreiro'],
  },
  personality: "Eu acredito que tudo que valha a pena fazer, vale a pena ser feito direito. Eu não posso evitar — Eu sou perfeccionista.",
  ideals: "Povo. Eu sou cometido com o povo com quem me importo, não com ideias.",
  bonds: "Eu criei um trabalho incrível para alguém, mas descobri que ele não era merecedor de recebê-lo. Ainda estou à procura de alguém que seja merecedor.",
  flaws: "Eu nunca estou satisfeito com o que tenho — eu sempre quero mais.",
  backstory: "Kaiden Arvek nasceu no 'barulho bom' de oficina...",
  inventory: [
    { id: '1', name: 'Lórica de escamas', weight: 45, quantity: 1, description: 'Armadura média.', equipped: true },
  ],
  weapons: [
    { name: 'Bordão', bonus: '+2', damage: '1d6' },
  ],
  spells: [],
  spellSlots: { 1: { total: 2, used: 0 } },
};

export const createNewCharacter = (): Character => ({
  ...INITIAL_CHARACTER,
  id: Date.now().toString(),
  name: "Novo Aventureiro",
  level: 1,
  class: "Guerreiro",
  race: "Humano",
  portrait: null,
  inspiration: 0,
  stats: {
    [Attribute.FOR]: 0, [Attribute.DES]: 0, [Attribute.CON]: 0,
    [Attribute.INT]: 0, [Attribute.SAB]: 0, [Attribute.CAR]: 0,
  },
  proficiencies: { skills: [], saves: [], languages: ['Comum'], tools: [] },
  inventory: [],
  weapons: [],
  spells: [],
  backstory: "",
  personality: "",
  ideals: "",
  bonds: "",
  flaws: "",
});