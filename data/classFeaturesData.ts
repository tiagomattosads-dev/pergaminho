export interface FeatureInfo {
  name: string;
  description: string;
  level: number;
  subclass?: string;
}

export const BARBARIAN_FEATURES: FeatureInfo[] = [
  // Base Class
  { 
    name: "Fúria", 
    level: 1, 
    description: "Enquanto estiver em fúria, você recebe bônus nas jogadas de dano corpo a corpo baseadas em Força e resistência a dano contundente, perfurante e cortante. A fúria dura 1 minuto e termina se você não atacar ou sofrer dano." 
  },
  { 
    name: "Defesa sem Armadura", 
    level: 1, 
    description: "Quando não estiver usando armadura, sua CA é 10 + mod. Destreza + mod. Constituição. Você ainda pode usar escudo." 
  },
  { 
    name: "Ataque Descuidado", 
    level: 2, 
    description: "No primeiro ataque do seu turno, você pode atacar com vantagem usando Força. Até o início do seu próximo turno, ataques contra você também têm vantagem." 
  },
  { 
    name: "Sentido de Perigo", 
    level: 2, 
    description: "Vantagem em testes de resistência de Destreza contra efeitos que você possa ver (armadilhas e magias), desde que não esteja cego, surdo ou incapacitado." 
  },
  { 
    name: "Caminho Primitivo", 
    level: 3, 
    description: "Você escolhe um caminho que define sua especialização, concedendo habilidades nos níveis 3, 6, 10 e 14." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    description: "Você aumenta atributos do personagem conforme as regras do sistema." 
  },
  { 
    name: "Ataque Extra", 
    level: 5, 
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar duas vezes, em vez de uma." 
  },
  { 
    name: "Movimento Rápido", 
    level: 5, 
    description: "Seu deslocamento aumenta em +3m, desde que você não esteja usando armadura pesada." 
  },
  { 
    name: "Instinto Feral", 
    level: 7, 
    description: "Vantagem nas jogadas de iniciativa. Se estiver surpreendido, você pode agir normalmente no primeiro turno se entrar em fúria." 
  },
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },
  { 
    name: "Crítico Brutal", 
    level: 9, 
    description: "Ao acertar um crítico com ataque corpo a corpo, você rola 1 dado adicional de dano do mesmo tipo da arma." 
  },

  // Path of the Berserker (Furioso)
  { 
    name: "Frenesi", 
    level: 3, 
    subclass: "Caminho do Furioso", 
    description: "Durante a fúria, você pode entrar em frenesi e realizar 1 ataque corpo a corpo adicional como ação bônus em cada turno. Ao terminar a fúria, você sofre 1 nível de exaustão." 
  },
  { 
    name: "Fúria Inconsciente", 
    level: 6, 
    subclass: "Caminho do Furioso", 
    description: "Enquanto em fúria, você é imune a enfeitiçado e amedrontado. Se já estiver sob um desses efeitos, eles ficam suspensos enquanto durar a fúria." 
  },
  { 
    name: "Presença Intimidante", 
    level: 10, 
    subclass: "Caminho do Furioso", 
    description: "Use sua ação para tentar amedrontar uma criatura que possa ver. O alvo pode resistir conforme as regras do sistema." 
  },
  { 
    name: "Retaliação", 
    level: 14, 
    subclass: "Caminho do Furioso", 
    description: "Quando uma criatura a até 1,5m causar dano a você, use sua reação para realizar 1 ataque corpo a corpo contra ela." 
  },

  // Path of the Totem Warrior (Guerreiro Totêmico)
  { 
    name: "Conselheiro Espiritual", 
    level: 3, 
    subclass: "Caminho do Guerreiro Totêmico", 
    description: "Você pode conjurar Falar com Animais e Sentido Primitivo como rituais, sem gastar espaços de magia." 
  },
  { 
    name: "Totem Espiritual", 
    level: 3, 
    subclass: "Caminho do Guerreiro Totêmico", 
    description: "Escolha um totem que concede benefício enquanto em fúria:\n• Urso: resistência a todos os tipos de dano, exceto psíquico.\n• Águia: inimigos têm desvantagem em ataques de oportunidade contra você; você pode Correr como ação bônus.\n• Lobo: aliados têm vantagem em ataques corpo a corpo contra inimigos a até 1,5m de você." 
  },
  { 
    name: "Aspecto da Besta", 
    level: 6, 
    subclass: "Caminho do Guerreiro Totêmico", 
    description: "Escolha um aspecto com benefício permanente:\n• Urso: maior capacidade de carga e vantagem em testes de Força.\n• Águia: visão/percepção aprimoradas a longas distâncias.\n• Lobo: vantagens em rastreamento e movimentação em grupo." 
  },
  { 
    name: "Andarilho Espiritual", 
    level: 10, 
    subclass: "Caminho do Guerreiro Totêmico", 
    description: "Você pode conjurar Comunhão com a Natureza como ritual." 
  },
  { 
    name: "Sintonia Totêmica", 
    level: 14, 
    subclass: "Caminho do Guerreiro Totêmico", 
    description: "Escolha uma sintonia que melhora sua fúria:\n• Urso: inimigos adjacentes têm desvantagem para atacar alvos que não sejam você.\n• Águia: você pode voar enquanto em fúria (com restrições ao fim do turno).\n• Lobo: ao acertar ataque corpo a corpo, pode derrubar o alvo como ação bônus." 
  },
];