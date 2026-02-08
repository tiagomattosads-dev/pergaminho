export interface FeatureInfo {
  name: string;
  description: string;
  level: number;
  subclass?: string;
  actionType?: 'Ativa' | 'Passiva' | 'Upgrade' | 'Estrutural' | 'Ação' | 'Ação Bônus' | 'Reação' | 'Upgrade Final';
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

export const WARRIOR_FEATURES: FeatureInfo[] = [
  // Base Class - Level 1
  { 
    name: "Estilo de Luta", 
    level: 1, 
    actionType: 'Estrutural', 
    summary: 'Bônus permanente de combate.',
    description: "Você escolhe um estilo de combate que concede um bônus permanente, como aumento de defesa, precisão ou dano, dependendo da opção escolhida." 
  },
  { 
    name: "Recuperar o Fôlego", 
    level: 1, 
    actionType: 'Ativa', 
    summary: 'Curar 1d10 + nível como ação bônus.',
    description: "Você pode usar uma ação bônus para recuperar pontos de vida iguais a 1d10 + seu nível de guerreiro. Você pode usar esta característica uma vez por descanso curto ou longo." 
  },
  
  // Level 2
  { 
    name: "Surto de Ação", 
    level: 2, 
    actionType: 'Ativa', 
    summary: 'Uma ação adicional no turno.',
    isKey: true,
    description: "No seu turno, você pode realizar uma ação adicional além da sua ação normal e possível ação bônus. Você pode usar esta característica uma vez por descanso curto ou longo." 
  },
  
  // Level 3
  { 
    name: "Arquétipo Marcial", 
    level: 3, 
    actionType: 'Estrutural', 
    summary: 'Escolha de especialização de combate.',
    description: "Você escolhe um arquétipo marcial que define seu estilo de combate especializado, concedendo habilidades adicionais nos níveis 3, 7, 10, 15 e 18." 
  },

  // Level 4
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 4, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },

  // Level 5
  { 
    name: "Ataque Extra", 
    level: 5, 
    actionType: 'Upgrade', 
    summary: 'Dois ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar duas vezes em vez de uma." 
  },

  // Level 6
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 6, 
    actionType: 'Estrutural', 
    description: "Você pode aumentar um atributo em +2, ou dois atributos em +1 cada. Alternativamente, pode escolher um talento, se essa regra estiver em uso." 
  },

  // Level 8
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 8, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 9
  { 
    name: "Indomável", 
    level: 9, 
    actionType: 'Passiva', 
    summary: 'Rerrolar teste de resistência falho.',
    description: "Quando você falhar em um teste de resistência, pode optar por rerrolar o teste. Você deve usar o novo resultado. Esta característica pode ser usada uma vez por descanso longo." 
  },

  // Level 11
  { 
    name: "Ataque Extra (2)", 
    level: 11, 
    actionType: 'Upgrade', 
    summary: 'Três ataques por ação de Ataque.',
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar três vezes." 
  },

  // Level 12
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 12, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 13
  { 
    name: "Indomável (2 usos)", 
    level: 13, 
    actionType: 'Upgrade', 
    summary: 'Dois usos de Indomável por descanso.',
    description: "Você pode usar Indomável duas vezes entre descansos longos." 
  },

  // Level 14
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 14, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 16
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 16, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 17
  { 
    name: "Surto de Ação (2 usos)", 
    level: 17, 
    actionType: 'Upgrade', 
    summary: 'Dois usos de Surto de Ação por descanso.',
    description: "Você pode usar Surto de Ação duas vezes entre descansos, mas apenas uma vez no mesmo turno." 
  },

  // Level 19
  { 
    name: "Incremento no Valor de Habilidade", 
    level: 19, 
    actionType: 'Estrutural', 
    description: "Você recebe um novo aumento de atributos conforme as regras do sistema." 
  },

  // Level 20
  { 
    name: "Ataque Extra (3)", 
    level: 20, 
    actionType: 'Upgrade Final', 
    summary: 'Quatro ataques por ação de Ataque.',
    isKey: true,
    description: "Quando você realiza a ação de Ataque no seu turno, pode atacar quatro vezes." 
  },

  // --- SUBCLASSES: CAMPEÃO ---
  { 
    name: "Crítico Aprimorado", 
    level: 3, 
    subclass: "Campeão", 
    actionType: 'Passiva', 
    summary: 'Crítico com 19 ou 20.',
    description: "Seus ataques com armas marcam um acerto crítico com um resultado de 19 ou 20 no d20." 
  },
  { 
    name: "Atleta Excepcional", 
    level: 7, 
    subclass: "Campeão", 
    actionType: 'Passiva', 
    summary: 'Bônus em testes físicos e salto.',
    description: "Você adiciona metade do seu bônus de proficiência (arredondado para cima) em testes de Força, Destreza ou Constituição que não usem proficiência. Além disso, seu salto aumenta." 
  },
  { 
    name: "Estilo de Combate Adicional", 
    level: 10, 
    subclass: "Campeão", 
    actionType: 'Estrutural', 
    summary: 'Escolha um segundo estilo de luta.',
    description: "Você escolhe um segundo Estilo de Luta." 
  },
  { 
    name: "Crítico Superior", 
    level: 15, 
    subclass: "Campeão", 
    actionType: 'Upgrade', 
    summary: 'Crítico com 18, 19 ou 20.',
    description: "Seus ataques com armas marcam acerto crítico com um resultado de 18–20 no d20." 
  },
  { 
    name: "Sobrevivente", 
    level: 18, 
    subclass: "Campeão", 
    actionType: 'Passiva', 
    summary: 'Regeneração automática com pouca vida.',
    description: "No início de cada turno, se tiver menos da metade dos seus pontos de vida e não estiver incapacitado, você recupera pontos de vida automaticamente." 
  },

  // --- SUBCLASSES: MESTRE DE BATALHA ---
  { 
    name: "Superioridade de Combate", 
    level: 3, 
    subclass: "Mestre de Batalha", 
    actionType: 'Estrutural', 
    summary: 'Dados de Superioridade (4 x d8).',
    description: "Você aprende manobras que usam Dados de Superioridade para efeitos táticos. Você começa com quatro dados de superioridade (d8), recuperados após descanso curto ou longo." 
  },
  { 
    name: "Manobras", 
    level: 3, 
    subclass: "Mestre de Batalha", 
    actionType: 'Ativa', 
    summary: 'Efeitos táticos em ataques/reações.',
    description: "Você aprende manobras que gastam dados de superioridade para causar efeitos adicionais aos seus ataques ou reações." 
  },
  { 
    name: "Estudante da Guerra", 
    level: 3, 
    subclass: "Mestre de Batalha", 
    actionType: 'Passiva', 
    summary: 'Proficiência em ferramentas de artesão.',
    description: "Você adquire proficiência em uma ferramenta de artesão à sua escolha." 
  },
  { 
    name: "Conhecer o Inimigo", 
    level: 7, 
    subclass: "Mestre de Batalha", 
    actionType: 'Passiva', 
    summary: 'Analisar capacidades de criaturas.',
    description: "Após observar uma criatura por 1 minuto fora de combate, você pode aprender informações comparativas sobre suas capacidades." 
  },
  { 
    name: "Aprimoramento de Superioridade", 
    level: 10, 
    subclass: "Mestre de Batalha", 
    actionType: 'Upgrade', 
    summary: 'Dados de Superioridade tornam-se d10.',
    description: "Seus dados de superioridade aumentam para d10." 
  },
  { 
    name: "Aprender Manobras Adicionais", 
    level: 15, 
    subclass: "Mestre de Batalha", 
    actionType: 'Upgrade', 
    summary: 'Aprende duas manobras extras.',
    description: "Você aprende duas manobras adicionais." 
  },
  { 
    name: "Aprimoramento de Superioridade (Final)", 
    level: 18, 
    subclass: "Mestre de Batalha", 
    actionType: 'Upgrade', 
    summary: 'Dados de Superioridade tornam-se d12.',
    description: "Seus dados de superioridade aumentam para d12." 
  },

  // --- SUBCLASSES: CAVALEIRO ARCANO ---
  { 
    name: "Conjuração", 
    level: 3, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Estrutural', 
    summary: 'Conjuração arcana baseada em Inteligência.',
    description: "Você aprende a conjurar magias arcanas, usando Inteligência como atributo de conjuração. Seu progresso mágico segue a tabela específica do Cavaleiro Arcano." 
  },
  { 
    name: "Vínculo com Arma", 
    level: 3, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Arma inseparável e invocável.',
    description: "Você pode vincular-se a uma arma, não podendo ser desarmado dela, e pode invocá-la para sua mão como ação bônus." 
  },
  { 
    name: "Magia de Guerra", 
    level: 7, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Ataque bônus após truque.',
    description: "Ao conjurar um truque, você pode realizar um ataque com arma como ação bônus." 
  },
  { 
    name: "Magia de Guerra Aprimorada", 
    level: 10, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Magia durante Surto de Ação.',
    description: "Quando usar Surto de Ação, você pode conjurar uma magia em vez de apenas um ataque." 
  },
  { 
    name: "Golpe Arcano", 
    level: 15, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Ativa', 
    summary: 'Gastar magia para dano extra/condições.',
    description: "Quando acerta um ataque, você pode gastar um espaço de magia para causar dano adicional e possivelmente aplicar condições ao alvo." 
  },
  { 
    name: "Cavaleiro Arcano Aprimorado", 
    level: 18, 
    subclass: "Cavaleiro Arcano", 
    actionType: 'Passiva', 
    summary: 'Ataque adicional com Magia de Guerra.',
    description: "Ao usar Magia de Guerra, você pode realizar um ataque adicional." 
  },
];