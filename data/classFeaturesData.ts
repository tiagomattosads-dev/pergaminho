export interface FeatureInfo {
  name: string;
  description: string;
  level: number;
  subclass?: string;
  actionType?: 'Ativa' | 'Passiva' | 'Upgrade' | 'Estrutural' | 'Ação' | 'Ação Bônus' | 'Reação';
  summary?: string;
  isKey?: boolean;
}

export const BARBARIAN_FEATURES: FeatureInfo[] = [
  // Base Class - Level 1
  { 
    name: "Fúria", 
    level: 1, 
    actionType: 'Ativa',
    summary: 'Bônus de dano e resistência física.',
    isKey: true,
    description: "Enquanto estiver em fúria, você recebe bônus nas jogadas de dano corpo a corpo baseadas em Força e resistência a dano contundente, perfurante e cortante. A fúria dura 1 minuto e termina se você não atacar uma criatura hostil ou não sofrer dano desde o seu último turno." 
  },
  { 
    name: "Defesa sem Armadura", 
    level: 1, 
    actionType: 'Passiva',
    summary: 'CA baseada em Destreza e Constituição.',
    description: "Quando não estiver usando armadura, sua Classe de Armadura é igual a 10 + modificador de Destreza + modificador de Constituição. Você ainda pode usar escudo." 
  },
  
  // Level 2
  { 
    name: "Ataque Descuidado", 
    level: 2, 
    actionType: 'Ativa',
    summary: 'Vantagem no ataque por vantagem contra você.',
    isKey: true,
    description: "No primeiro ataque do seu turno, você pode escolher atacar com vantagem usando Força. Até o início do seu próximo turno, ataques contra você também têm vantagem." 
  },
  { 
    name: "Sentido de Perigo", 
    level: 2, 
    actionType: 'Passiva',
    summary: 'Vantagem em testes de resistência de Destreza.',
    description: "Você tem vantagem em testes de resistência de Destreza contra efeitos que possa ver, como armadilhas e magias, desde que não esteja cego, surdo ou incapacitado." 
  },
  
  // Level 3
  { 
    name: "Caminho Primitivo", 
    level: 3, 
    actionType: 'Estrutural',
    summary: 'Escolha de especialização de arquétipo.',
    description: "Você escolhe um caminho que define sua especialização como bárbaro, concedendo habilidades adicionais nos níveis 3, 6, 10 e 14." 
  },
  
  // Level 4
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },
  
  // Level 5
  { 
    name: "Ataque Extra", 
    level: 5, 
    actionType: 'Passiva',
    summary: 'Dois ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar duas vezes em vez de uma." 
  },
  { 
    name: "Movimento Rápido", 
    level: 5, 
    actionType: 'Passiva',
    summary: '+3 metros de deslocamento.',
    description: "Seu deslocamento aumenta em +3 metros enquanto você não estiver usando armadura pesada." 
  },
  
  // Level 7
  { 
    name: "Instinto Feral", 
    level: 7, 
    actionType: 'Passiva',
    summary: 'Vantagem em Iniciativa.',
    isKey: true,
    description: "Você tem vantagem nas jogadas de iniciativa. Além disso, se estiver surpreendido no início do combate, pode agir normalmente no primeiro turno se entrar em fúria." 
  },
  
  // Level 8
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  
  // Level 9
  { 
    name: "Crítico Brutal", 
    level: 9, 
    actionType: 'Upgrade',
    summary: '+1 dado de dano extra em acertos críticos.',
    description: "Ao acertar um acerto crítico com um ataque corpo a corpo, você rola um dado adicional de dano do mesmo tipo da arma. Este valor aumenta conforme o nível." 
  },

  // Level 11
  { 
    name: "Fúria Implacável", 
    level: 11, 
    actionType: 'Passiva',
    summary: 'Resistir à morte enquanto em fúria.',
    description: "Enquanto estiver em fúria, se cair a 0 pontos de vida e não morrer imediatamente, você pode fazer um teste de Constituição (CD 10) para permanecer consciente com 1 ponto de vida. A CD aumenta a cada uso após o primeiro, e é redefinida após um descanso longo." 
  },

  // Level 12
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 13
  { 
    name: "Crítico Brutal", 
    level: 13, 
    actionType: 'Upgrade',
    summary: '+2 dados de dano extra em acertos críticos.',
    description: "O número de dados extras de dano ao realizar um acerto crítico com ataque corpo a corpo aumenta para dois." 
  },

  // Level 14 - Subclass placeholder
  
  // Level 15
  { 
    name: "Fúria Persistente", 
    level: 15, 
    actionType: 'Passiva',
    summary: 'Fúria contínua sem necessidade de bater/sofrer dano.',
    description: "Sua fúria só termina prematuramente se você cair inconsciente ou decidir encerrá-la voluntariamente." 
  },

  // Level 16
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 17
  { 
    name: "Crítico Brutal", 
    level: 17, 
    actionType: 'Upgrade',
    summary: '+3 dados de dano extra em acertos críticos.',
    description: "O número de dados extras de dano ao realizar um acerto crítico com ataque corpo a corpo aumenta para três." 
  },

  // Level 18
  { 
    name: "Força Indomável", 
    level: 18, 
    actionType: 'Passiva',
    summary: 'Usar valor de Força como mínimo em testes.',
    description: "Se o total de um teste de Força for menor que seu valor de Força, você pode usar esse valor no lugar do resultado." 
  },

  // Level 19
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural',
    summary: 'Aumento de atributos ou novo talento.',
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 20
  { 
    name: "Campeão Primitivo", 
    level: 20, 
    actionType: 'Passiva',
    summary: '+4 Força e Constituição (Máximo 24).',
    isKey: true,
    description: "Sua Força e Constituição aumentam em +4. O valor máximo desses atributos passa a ser 24." 
  },

  // Subclasses: Path of the Berserker (Furioso)
  { 
    name: "Frenesi", 
    level: 3, 
    subclass: "Caminho do Furioso", 
    actionType: 'Ativa',
    summary: 'Ataque extra como ação bônus por exaustão.',
    description: "Durante a fúria, você pode entrar em frenesi e realizar um ataque corpo a corpo adicional como ação bônus em cada turno. Ao final da fúria, você sofre 1 nível de exaustão." 
  },
  { 
    name: "Fúria Inconsciente", 
    level: 6, 
    subclass: "Caminho do Furioso", 
    actionType: 'Passiva',
    summary: 'Imunidade a Enfeitiçado e Amedrontado.',
    description: "Enquanto estiver em fúria, você não pode ser enfeitiçado ou amedrontado. Se já estiver sob um desses efeitos, eles ficam suspensos enquanto durar a fúria." 
  },
  { 
    name: "Presença Intimidante", 
    level: 10, 
    subclass: "Caminho do Furioso", 
    actionType: 'Ativa',
    summary: 'Amedrontar criatura com ação.',
    description: "Você pode usar sua ação para tentar amedrontar uma criatura que possa ver. O alvo pode resistir conforme as regras do sistema." 
  },
  { 
    name: "Retaliação", 
    level: 14, 
    subclass: "Caminho do Furioso", 
    actionType: 'Reação',
    summary: 'Ataque imediato contra quem te ferir.',
    description: "Quando uma criatura a até 1,5 metro causar dano a você, pode usar sua reação para realizar um ataque corpo a corpo contra ela." 
  },

  // Subclasses: Path of the Totem Warrior (Guerreiro Totêmico)
  { 
    name: "Conselheiro Espiritual", 
    level: 3, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Passiva',
    summary: 'Rituais de natureza e animais.',
    description: "Você pode conjurar Falar com Animais e Sentido Primitivo como rituais, sem gastar espaços de magia." 
  },
  { 
    name: "Totem Espiritual", 
    level: 3, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Estrutural',
    summary: 'Benefício de animal durante a fúria.',
    description: "Você escolhe um espírito animal (Urso, Águia ou Lobo) que concede benefícios específicos enquanto estiver em fúria." 
  },
  { 
    name: "Aspecto da Besta", 
    level: 6, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Estrutural',
    summary: 'Benefício permanente de animal utilitário.',
    description: "Você escolhe um aspecto animal que concede um benefício permanente fora de combate." 
  },
  { 
    name: "Andarilho Espiritual", 
    level: 10, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Passiva',
    summary: 'Comunhão com a Natureza como ritual.',
    description: "Você pode conjurar Comunhão com a Natureza como ritual." 
  },
  { 
    name: "Sintonia Totêmica", 
    level: 14, 
    subclass: "Caminho do Guerreiro Totêmico", 
    actionType: 'Estrutural',
    summary: 'Poder animal supremo durante a fúria.',
    description: "Você escolhe uma sintonia animal que concede um benefício poderoso durante a fúria." 
  },
];