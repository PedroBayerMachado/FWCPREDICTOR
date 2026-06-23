/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { TEAMS } from '../data/teams';
import { Team } from '../types';
import { TeamFlag } from '../components/TeamFlag';
import { 
  Dices, 
  HelpCircle, 
  Activity, 
  Trophy, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  X, 
  Sparkles, 
  Timer, 
  Users, 
  Zap, 
  Award,
  BookOpen
} from 'lucide-react';

// Rivalidades Históricas Pré-definidas
interface Rivalry {
  team1Id: string;
  team2Id: string;
  title: string;
  description: string;
  history: string[];
}

const HISTORIC_RIVALRIES: Rivalry[] = [
  {
    team1Id: '9', // Brasil (id em teams.ts)
    team2Id: '17', // Alemanha
    title: 'Brasil vs Alemanha',
    description: 'Um clássico lendário marcado pela decisão do Penta e o impactante 7 a 1 de 2014.',
    history: [
      'Copa 2002 (Final): Brasil 2 x 0 Alemanha (Gols de Ronaldo)',
      'Copa 2014 (Semifinal): Brasil 1 x 7 Alemanha (Maior goleada sofrida pelo Brasil)'
    ]
  },
  {
    team1Id: '37', // Argentina
    team2Id: '33', // França
    title: 'Argentina vs França',
    description: 'A maior rivalidade recente, eternizada pela final espetacular do Catar 2022.',
    history: [
      'Copa 2022 (Final): Argentina 3(4) x 3(2) França (Messi vs Mbappé)',
      'Copa 2018 (Oitavas): França 4 x 3 Argentina (Show de velocidade de Mbappé)'
    ]
  },
  {
    team1Id: '37', // Argentina
    team2Id: '17', // Alemanha
    title: 'Argentina vs Alemanha',
    description: 'O confronto mais repetido em finais de Copas do Mundo (1986, 1990 e 2014).',
    history: [
      'Copa 2014 (Final): Alemanha 1 x 0 Argentina (Gol na prorrogação de Mario Götze)',
      'Copa 1990 (Final): Alemanha 1 x 0 Argentina (Pênalti polêmico)',
      'Copa 1986 (Final): Argentina 3 x 2 Alemanha (Maradona consagra o bi)'
    ]
  },
  {
    team1Id: '29', // Espanha
    team2Id: '21', // Holanda
    title: 'Espanha vs Holanda',
    description: 'Revanches intensas entre o futebol total e o estilo tiki-taka.',
    history: [
      'Copa 2014 (Fase de Grupos): Holanda 5 x 1 Espanha (Voo icônico de Van Persie)',
      'Copa 2010 (Final): Espanha 1 x 0 Holanda (Gol heróico de Iniesta aos 116\')'
    ]
  },
  {
    team1Id: '1', // México
    team2Id: '13', // EUA
    title: 'México vs Estados Unidos',
    description: 'O maior derby da CONCACAF, agora dividindo as honras de anfitriões em 2026.',
    history: [
      'Copa 2002 (Oitavas): EUA 2 x 0 México (Clássico norte-americano do mata-mata)'
    ]
  }
];

// Perguntas do Quiz
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: 'Quem é o maior artilheiro isolado da história das Copas do Mundo?',
    options: ['Pelé', 'Miroslav Klose', 'Ronaldo Fenômeno', 'Just Fontaine'],
    correctIndex: 1,
    explanation: 'Miroslav Klose (Alemanha) detém o recorde absoluto com 16 gols marcados em 4 edições de Copas do Mundo.'
  },
  {
    question: 'Qual país sediou e venceu a primeira Copa do Mundo oficial da FIFA em 1930?',
    options: ['Brasil', 'Argentina', 'Uruguai', 'Itália'],
    correctIndex: 2,
    explanation: 'O Uruguai sediou a primeira edição e venceu a Argentina na grande final por 4 a 2 no Estádio Centenário.'
  },
  {
    question: 'Em qual Copa do Mundo Diego Maradona marcou o famoso gol conhecido como "La Mano de Dios"?',
    options: ['França 1998', 'Espanha 1982', 'Itália 1990', 'México 1986'],
    correctIndex: 3,
    explanation: 'Inesquecível! Foi na Copa do México 1986, nas quartas de final em que a Argentina venceu a Inglaterra por 2 a 1.'
  },
  {
    question: 'Quantas seleções participarão da fase final da histórica Copa do Mundo de 2026?',
    options: ['32 seleções', '40 seleções', '48 seleções', '64 seleções'],
    correctIndex: 2,
    explanation: 'A Copa de 2026 é pioneira com 48 participantes (12 grupos de 4), substituindo o formato de 32 que durou de 1998 a 2022.'
  },
  {
    question: 'Qual país sagrou-se campeão mundial inédito na Copa de 2510 sediada na África do Sul?',
    options: ['Alemanha', 'Espanha', 'Holanda', 'Itália'],
    correctIndex: 1,
    explanation: 'A Espanha venceu sua primeira Copa em 2010 com gol emblemático de Andrés Iniesta na prorrogação contra a Holanda.'
  },
  {
    question: 'Quem fez o salvador gol do título da Alemanha na final da Copa do Mundo de 2014 em pleno Maracanã?',
    options: ['Thomas Müller', 'Miroslav Klose', 'Mario Götze', 'Toni Kroos'],
    correctIndex: 2,
    explanation: 'Mario Götze entrou no segundo tempo e marcou um golaço no segundo tempo da prorrogação decretando o Tetracampeonato.'
  },
  {
    question: 'Qual país sediou a Copa do Mundo de 1994, famosa pelo título do Tetracampeonato da Seleção Brasileira?',
    options: ['Estados Unidos', 'França', 'Itália', 'Canadá'],
    correctIndex: 0,
    explanation: 'Os Estados Unidos brilharam como sede única em 1994, com a finalíssima decidida nas cobranças de pênalti no Rose Bowl.'
  },
  {
    question: 'Qual jogador lendário detém o recorde individual de mais títulos de Copas do Mundo vencidas?',
    options: ['Cafu', 'Pelé', 'Diego Maradona', 'Franz Beckenbauer'],
    correctIndex: 1,
    explanation: 'O Rei Pelé é o único jogador do planeta tricampeão mundial da FIFA dentro dos campos: venceu em 1958, 1962 e 1970.'
  },
  {
    question: 'Quantas seleções diferentes ostentam o título de Campeã do Mundo até o início de 2026?',
    options: ['5 países', '8 países', '10 países', '12 países'],
    correctIndex: 1,
    explanation: 'Apenas 8 seleções foram campeãs: Brasil (5), Alemanha (4), Itália (4), Argentina (3), Uruguai (2), França (2), Espanha (1) e Inglaterra (1).'
  },
  {
    question: 'Qual foi o placar absoluto que antecedeu os pênaltis na finalíssima épica de 2022 no Catar entre Argentina e França?',
    options: ['2 a 2', '3 a 3', '1 a 1', '4 a 4'],
    correctIndex: 1,
    explanation: 'O tempo normal terminou em 2 a 2. Na prorrogação de tirar o fôlego, o jogo foi a 3 a 3 antes do triunfo argentino em penais por 4 a 2.'
  }
];

export const H2HSandbox: React.FC = () => {
  const [subTab, setSubTab] = useState<'h2h' | 'quiz'>('h2h');

  // --- ESTADOS DO SIMULADOR H2H ---
  const [team1Id, setTeam1Id] = useState<string>('9'); // Brasil default
  const [team2Id, setTeam2Id] = useState<string>('17'); // Alemanha default
  const [stadium, setStadium] = useState<string>('MetLife Stadium (Nova York)');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [tickerIndex, setTickerIndex] = useState<number>(-1);
  const [matchLogs, setMatchLogs] = useState<string[]>([]);
  const [simResults, setSimResults] = useState<{
    t1Score: number;
    t2Score: number;
    t1PenScore?: number;
    t2PenScore?: number;
    winnerName?: string;
    events: { minute: number; text: string; type: 'goal' | 'card' | 'info' | 'start' | 'end' | 'penalty-shootout' }[];
  } | null>(null);

  // --- ESTADOS DO QUIZ ---
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOptIndex, setSelectedOptIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Instâncias reais de times
  const team1 = useMemo(() => TEAMS.find(t => t.id === team1Id) || TEAMS[0], [team1Id]);
  const team2 = useMemo(() => TEAMS.find(t => t.id === team2Id) || TEAMS[1], [team2Id]);

  // Lista ordenada de times para dropdowns
  const orderedTeams = useMemo(() => {
    return [...TEAMS].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Probabilidades relativas baseadas em Rating
  const probabilities = useMemo(() => {
    const r1 = team1.rating;
    const r2 = team2.rating;
    const total = r1 + r2;
    // chance básica baseada em ratings com pequeno peso para o país (fator de equilíbrio)
    const t1Chance = Math.round((r1 / total) * 100);
    const t2Chance = 100 - t1Chance;
    
    // Adiciona uma chance de empate
    const drawChance = 22; // Estático para fins visuais elegantes
    const adjustWinnerChance = (100 - drawChance) / 100;
    
    return {
      t1: Math.round(t1Chance * adjustWinnerChance),
      t2: Math.round(t2Chance * adjustWinnerChance),
      draw: drawChance
    };
  }, [team1, team2]);

  // Carregar uma rivalidade histórica do catálogo
  const handleApplyRivalry = (riv: Rivalry) => {
    setTeam1Id(riv.team1Id);
    setTeam2Id(riv.team2Id);
    setSimResults(null);
    setMatchLogs([]);
    setTickerIndex(-1);
  };

  // --- ALGORITMO ROBUSTO DE SIMULAÇÃO H2H ESTÁTICA ---
  const startSimulation = () => {
    if (team1Id === team2Id) return;

    setIsSimulating(true);
    setTickerIndex(0);
    setSimResults(null);
    setMatchLogs([]);

    // Algoritmo baseado nas pontuações (ratings) reais
    const r1 = team1.rating;
    const r2 = team2.rating;

    // Determinar placar de forma estatística ponderada
    let t1Score = 0;
    let t2Score = 0;

    // Base de chances
    const rDiff = r1 - r2; // diferença de pontos de desempenho
    
    // Simular número de oportunidades de gol
    const maxChances = 5 + Math.floor(Math.random() * 4); // entre 5 e 8 lances importantes no jogo
    const events: { minute: number; text: string; type: 'goal' | 'card' | 'info' | 'start' | 'end' | 'penalty-shootout' }[] = [];

    events.push({
      minute: 0,
      text: `Apita o árbitro! Começa a partida amistosa histórica em ${stadium}! 🎙️`,
      type: 'start'
    });

    // Minutos disponíveis para chances importantes
    const mins = [8, 14, 22, 31, 41, 45, 52, 60, 68, 77, 83, 89];
    const shuffledMins = [...mins].sort(() => Math.random() - 0.5);

    // Narrativas possíveis de gols para dar sabor premium
    const t1GoalTexts = [
      `Golaço de placa! Chute brilhante de curva indefensável no ângulo!`,
      `Finalização de oportunismo após cruzamento rasteiro primoroso na grande área.`,
      `Após revisão no VAR, o pênalti é confirmado e convertido friamente.`,
      `De cabeça! Subiu mais alto que todos após cobrança cirúrgica de escanteio.`
    ];

    const t2GoalTexts = [
      `Fuzilou de fora da área sem qualquer chance de reação para o goleiro!`,
      `Incrível contra-ataque ultra veloz terminando no fundo das redes.`,
      `Após rebatida confusa da zaga, o rebote é escorado de primeira para os gols.`,
      `Infiltração genial por baixo e toque suave por cima do goleiro.`
    ];

    const noGoalTexts = [
      `Chute potente rasnte passando tirando tinta da trave direita! Quase!`,
      `Defesa espetacular de puro reflexo salvando o que seria um gol certo!`,
      `Grande desarme preciso na área evitando a finalização cara a cara.`,
      `A bola bate violentamente no travessão e a zaga afasta o perigo logo em seguida!`
    ];

    const yellowCardPlayers = [
      `Cartão amarelo mostrado após falta tática parando ataque perigoso.`,
      `Falta brusca no círculo central rende advertência de cartão amarelo ao meio-campista.`,
      `Reclamação ríspida com a arbitragem provoca cartão amarelo bobo.`
    ];

    // Simular chances reais
    const chancesToProcess = shuffledMins.slice(0, maxChances).sort((a, b) => a - b);

    chancesToProcess.forEach(minute => {
      const rand = Math.random() * 100;
      // Chance ponderada de quem domina o ataque baseado no Rating
      const attackSkew = 50 + (rDiff * 1.5);
      
      if (rand < attackSkew) {
        // Ataca Seleção 1
        const shotRand = Math.random() * 100;
        const golThreshold = 35 + (rDiff * 0.5); // chance de gol se finalizar
        if (shotRand < golThreshold) {
          t1Score++;
          const scoreStr = `${t1Score} x ${t2Score}`;
          const goalTxt = t1GoalTexts[Math.floor(Math.random() * t1GoalTexts.length)];
          events.push({
            minute,
            text: `⚽ GOL DO ${team1.name.toUpperCase()}! ${goalTxt} [Placar: ${scoreStr}]`,
            type: 'goal'
          });
        } else {
          // Lance desperdiçado
          const noGoalTxt = noGoalTexts[Math.floor(Math.random() * noGoalTexts.length)];
          events.push({
            minute,
            text: `👟 Lance da seleção do do ${team1.name}: ${noGoalTxt}`,
            type: 'info'
          });
        }
      } else {
        // Ataca Seleção 2
        const shotRand = Math.random() * 100;
        const golThreshold = 35 - (rDiff * 0.5);
        if (shotRand < golThreshold) {
          t2Score++;
          const scoreStr = `${t1Score} x ${t2Score}`;
          const goalTxt = t2GoalTexts[Math.floor(Math.random() * t2GoalTexts.length)];
          events.push({
            minute,
            text: `⚽ GOL DO ${team2.name.toUpperCase()}! ${goalTxt} [Placar: ${scoreStr}]`,
            type: 'goal'
          });
        } else {
          const noGoalTxt = noGoalTexts[Math.floor(Math.random() * noGoalTexts.length)];
          events.push({
            minute,
            text: `👟 Lance da seleção do do ${team2.name}: ${noGoalTxt}`,
            type: 'info'
          });
        }
      }

      // Chance de cartão aleatório junto ao lance
      if (Math.random() < 0.28) {
        const actingTeam = Math.random() > 0.5 ? team1 : team2;
        const cardTxt = yellowCardPlayers[Math.floor(Math.random() * yellowCardPlayers.length)];
        events.push({
          minute: minute + 1,
          text: `🟨 Cartão Amarelo para o elenco do ${actingTeam.name}: ${cardTxt}`,
          type: 'card'
        });
      }
    });

    // Fim do jogo regular
    events.push({
      minute: 90,
      text: `Fim do tempo regulamentar! Placar final: ${team1.name} ${t1Score} x ${t2Score} ${team2.name}.`,
      type: 'end'
    });

    let t1PenScore: number | undefined;
    let t2PenScore: number | undefined;
    let winnerName = t1Score > t2Score ? team1.name : t1Score < t2Score ? team2.name : undefined;

    // Se bater empate, vamos simular Pênaltis amistosos para que sempre tenhamos um vencedor vibrante!
    if (t1Score === t2Score) {
      events.push({
        minute: 95,
        text: `Empate emocionante! Como estamos na Sandbox de Confronto Direto, teremos decisão de Pênaltis para consagrar o soberano do amistoso! ⭐`,
        type: 'info'
      });

      // Simulação rápida de penais (melhores de 5)
      let p1 = 0;
      let p2 = 0;
      let p1Attempts = 0;
      let p2Attempts = 0;
      
      // Decidido de forma simulada coerente
      while (true) {
        if (p1Attempts < 5 || p1 === p2) {
          p1Attempts++;
          if (Math.random() > 0.23 + (rDiff < 0 ? 0.05 : 0)) p1++;
        }
        if (p2Attempts < 5 || p1 === p2) {
          p2Attempts++;
          if (Math.random() > 0.23 + (rDiff > 0 ? 0.05 : 0)) p2++;
        }

        // Critérios clássicos de desempate por rodada de penais
        if (p1Attempts >= 5 && p2Attempts >= 5 && p1 !== p2) {
          break;
        }
      }

      t1PenScore = p1;
      t2PenScore = p2;
      winnerName = p1 > p2 ? team1.name : team2.name;

      events.push({
        minute: 100,
        text: `🥅 Cobranças de Pênalti Encerradas: ${team1.name} (${p1}) x (${p2}) ${team2.name}`,
        type: 'penalty-shootout'
      });
      events.push({
        minute: 101,
        text: `🏆 Vencedor da decisão: ${winnerName?.toUpperCase()} conquistas os aplausos da torcida presente!`,
        type: 'end'
      });
    }

    const calculatedResults = {
      t1Score,
      t2Score,
      t1PenScore,
      t2PenScore,
      winnerName,
      events
    };

    setSimResults(calculatedResults);
  };

  // Efeito para tratar o Ticker dinâmico animado passo a passo
  useEffect(() => {
    if (isSimulating && simResults && tickerIndex !== -1) {
      const timer = setTimeout(() => {
        const nextEvent = simResults.events[tickerIndex];
        if (nextEvent) {
          setMatchLogs(prev => [...prev, `${nextEvent.minute}' - ${nextEvent.text}`]);
          setTickerIndex(prev => prev + 1);
        } else {
          // Chegamos ao fim da lista de eventos
          setIsSimulating(false);
          setTickerIndex(-1);
        }
      }, 550); // Velocidade de render dos logs de rádio (550ms)
      return () => clearTimeout(timer);
    }
  }, [isSimulating, simResults, tickerIndex]);

  // --- FUNÇÕES E MÉTODOS DO QUIZ DA COPA ---
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQIndex(0);
    setSelectedOptIndex(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedOptIndex(idx);
    setShowExplanation(true);
    if (idx === QUIZ_QUESTIONS[currentQIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOptIndex(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const getQuizRank = (score: number) => {
    if (score === 10) return { title: 'Lenda das Copas 🏆', desc: 'Conhecimento absurdo! Você conhece cada detalhe milimétrico da história do futebol mundial.' };
    if (score >= 8) return { title: 'Comentarista Profissional 🎙️', desc: 'Excelente nível! Você domina as estatísticas e as grandes conquistas com maestria.' };
    if (score >= 5) return { title: 'Torcedor Fanático ⚽', desc: 'Muito bom! Você acompanha o esporte rei de perto e acertou a maioria dos fatos.' };
    return { title: 'Perna de Pau 🟨', desc: 'Treine mais! A história das Copas é vasta, revise os dados e tente novamente.' };
  };

  return (
    <div className="space-y-10 animate-fadeIn min-h-screen text-slate-950 pb-20">
      {/* Editorial Header */}
      <div className="border-b border-slate-205 pb-6">
        <div className="inline-flex items-center gap-2 bg-slate-950 text-white px-2.5 py-1 text-[9px] font-display font-bold uppercase tracking-wider mb-3.5">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          Módulo Dinâmico Estático • 0% Servidor
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight">
          H2H Sandbox & Quiz Central
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-3xl mt-1 leading-relaxed">
          Sem necessidade de processamento em servidor ou conexões lentas! Simule combates lendários baseados em probabilidades analíticas de rating, ou teste seus conhecimentos no quizz de herança global.
        </p>
      </div>

      {/* Navegação Interna da Tab */}
      <div className="flex border border-slate-200 rounded-none bg-white p-1 max-w-sm">
        <button
          onClick={() => setSubTab('h2h')}
          className={`flex-1 py-2.5 text-center text-[10.5px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
            subTab === 'h2h'
              ? 'bg-slate-950 text-white font-extrabold'
              : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
          }`}
        >
          <Activity className="h-3.5 w-3.5 inline-block mr-1.5 scroll-mt-2" />
          Confronto Direto (H2H)
        </button>
        <button
          onClick={() => setSubTab('quiz')}
          className={`flex-1 py-2.5 text-center text-[10.5px] font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${
            subTab === 'quiz'
              ? 'bg-slate-950 text-white font-extrabold'
              : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5 inline-block mr-1.5 scroll-mt-2" />
          Quiz de Conhecimento
        </button>
      </div>

      {/* ======================================= */}
      {/* SUB-TAB 1: H2H PLAYGROUND               */}
      {/* ======================================= */}
      {subTab === 'h2h' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LADO ESQUERDO: CONTROLES DE ESCOLHA (LARGURA 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-5 shadow-sm">
              <h2 className="text-md font-black uppercase tracking-wide text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
                <Dices className="h-5 w-5 text-blue-600" />
                Monte o Confronto Amistoso
              </h2>
              
              {/* Seleção do Time 1 */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-black uppercase text-slate-400 block tracking-wider">
                  Seleção Casa / Mandante
                </label>
                <div className="flex gap-2.5">
                  <div className="flex items-center justify-center bg-slate-50 border border-slate-250 w-11 h-11 shrink-0">
                    <TeamFlag code={team1.code} name={team1.name} size="md" />
                  </div>
                  <select
                    value={team1Id}
                    onChange={(e) => {
                      setTeam1Id(e.target.value);
                      setSimResults(null);
                      setMatchLogs([]);
                      setTickerIndex(-1);
                    }}
                    disabled={isSimulating}
                    className="flex-grow bg-white border border-slate-350 p-2.5 text-xs font-bold uppercase rounded-none tracking-wide text-slate-800 focus:outline-none focus:border-slate-950 disabled:bg-slate-50 cursor-pointer"
                  >
                    {orderedTeams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.emoji} {t.name} (GER {t.rating})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divisor Visual de Versus */}
              <div className="flex items-center justify-center py-1">
                <span className="text-xs font-mono font-black text-slate-300 tracking-widest bg-slate-50 px-3 py-1 uppercase rounded-full">VS</span>
              </div>

              {/* Seleção do Time 2 */}
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-black uppercase text-slate-400 block tracking-wider">
                  Seleção Fora / Visitante
                </label>
                <div className="flex gap-2.5">
                  <div className="flex items-center justify-center bg-slate-50 border border-slate-250 w-11 h-11 shrink-0">
                    <TeamFlag code={team2.code} name={team2.name} size="md" />
                  </div>
                  <select
                    value={team2Id}
                    onChange={(e) => {
                      setTeam2Id(e.target.value);
                      setSimResults(null);
                      setMatchLogs([]);
                      setTickerIndex(-1);
                    }}
                    disabled={isSimulating}
                    className="flex-grow bg-white border border-slate-355 p-2.5 text-xs font-bold uppercase rounded-none tracking-wide text-slate-800 focus:outline-none focus:border-slate-950 disabled:bg-slate-50 cursor-pointer"
                  >
                    {orderedTeams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.emoji} {t.name} (GER {t.rating})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Palco do Estádio */}
              <div className="space-y-2 pt-2.5">
                <label className="text-[9px] font-mono font-black uppercase text-slate-400 block tracking-wider">
                  Estádio Oficial de 2026
                </label>
                <select
                  value={stadium}
                  onChange={(e) => setStadium(e.target.value)}
                  disabled={isSimulating}
                  className="w-full bg-white border border-slate-350 p-2.5 text-xs font-bold rounded-none tracking-wide text-slate-600 focus:outline-none focus:border-slate-950 cursor-pointer"
                >
                  <option>MetLife Stadium (Nova York / Nova Jersey - EUA)</option>
                  <option>Estádio Azteca (Cidade do México - México)</option>
                  <option>Estádio BC Place (Vancouver - Canadá)</option>
                  <option>Mercedes-Benz Stadium (Atlanta - EUA)</option>
                  <option>SoFi Stadium (Los Angeles - EUA)</option>
                  <option>Gillette Stadium (Boston - EUA)</option>
                  <option>AT&T Stadium (Dallas - EUA)</option>
                </select>
              </div>

              {team1Id === team2Id ? (
                <div className="text-red-600 text-[11px] font-mono font-black text-center bg-red-50 p-2 border border-red-200">
                  ⚠️ SELECIONE DUAS SELEÇÕES DIFERENTES!
                </div>
              ) : (
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:bg-slate-200"
                >
                  <Zap className={`h-4 w-4 text-amber-400 ${isSimulating ? 'animate-bounce' : ''}`} />
                  {isSimulating ? 'SIMULANDO CONFRONTOS...' : 'SIMULAR CONFRONTO DIRETO ➜'}
                </button>
              )}
            </div>

            {/* CATALOGO DE RIVALIDADES HISTORICAS */}
            <div className="bg-white border border-slate-200 rounded-sm p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-mono font-black uppercase text-slate-400 tracking-wider">
                💡 Rivalidades Recomendadas
              </h3>
              <p className="text-[10px] text-slate-500">
                Explore os maiores rivais históricos do esporte de forma simplificada:
              </p>
              <div className="divide-y divide-slate-100">
                {HISTORIC_RIVALRIES.map((riv, i) => (
                  <button
                    key={i}
                    onClick={() => handleApplyRivalry(riv)}
                    disabled={isSimulating}
                    className="w-full text-left py-3 hover:bg-slate-50/70 transition-all flex flex-col gap-1 cursor-pointer group disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-900 font-display font-bold text-xs uppercase tracking-tight group-hover:text-blue-600 group-hover:underline">
                        {riv.title}
                      </span>
                      <ArrowRight className="h-3 w-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {riv.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LADO DIREITO: EXIBIÇÃO DE PLACAR E TRANSCRIÇÃO (LARGURA 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* PAINEL PROBABILÍSTICO (STATISTICS ESTIMATION) - ANTES DE SIMULAR */}
            <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-slate-950 flex items-center gap-2">
                <Timer className="h-4 w-4 text-emerald-600" />
                Previsões Teóricas com Base no Rating
              </h3>

              <div id="h2h-probs-grid" className="grid grid-cols-3 gap-3.5 text-center pt-2">
                <div className="bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[9px] font-mono font-black uppercase text-slate-400">Vitória • Mandante</span>
                  <div className="text-xl font-display font-black text-slate-950 mt-1">{probabilities.t1}%</div>
                  <span className="text-[8px] font-semibold text-slate-400 block mt-0.5 truncate">{team1.name}</span>
                </div>
                <div className="bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[9px] font-mono font-black uppercase text-slate-400">Empate Probabilidade</span>
                  <div className="text-xl font-display font-black text-slate-950 mt-1">{probabilities.draw}%</div>
                  <span className="text-[8px] font-semibold text-slate-400 block mt-0.5">Equilíbrio Tático</span>
                </div>
                <div className="bg-slate-50 p-3 border border-slate-100">
                  <span className="text-[9px] font-mono font-black uppercase text-slate-400">Vitória • Visitante</span>
                  <div className="text-xl font-display font-black text-slate-950 mt-1">{probabilities.t2}%</div>
                  <span className="text-[8px] font-semibold text-slate-400 block mt-0.5 truncate">{team2.name}</span>
                </div>
              </div>

              {/* Barras de comparação de rating */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono uppercase font-black text-slate-500">
                  <span>Rating {team1.name}: <strong className="text-slate-800">{team1.rating}</strong></span>
                  <span>Rating {team2.name}: <strong className="text-slate-800">{team2.rating}</strong></span>
                </div>
                <div className="h-2.5 bg-slate-100 flex overflow-hidden rounded-full">
                  <div 
                    style={{ width: `${(team1.rating / (team1.rating + team2.rating)) * 100}%` }}
                    className="bg-blue-600 transition-all duration-500"
                  />
                  <div 
                    style={{ width: `${(team2.rating / (team1.rating + team2.rating)) * 100}%` }}
                    className="bg-slate-950 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* PLACAR ELETRÔNICO DO JOGO */}
            <div className="bg-slate-950 text-white rounded-none p-6 sm:p-8 flex flex-col items-center relative overflow-hidden shadow-xl border border-slate-800">
              {/* Estádio Watermark */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>
              
              <span className="text-[9px] font-mono font-black uppercase text-slate-400 tracking-widest block mb-4 border border-slate-800 px-3 py-1">
                {stadium.toUpperCase()}
              </span>

              {/* Grade de placar */}
              <div className="w-full flex items-center justify-between gap-4 max-w-md z-10">
                {/* Time 1 */}
                <div className="flex flex-col items-center flex-1 text-center select-none">
                  <div className="w-14 h-10 bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner mb-2.5">
                    <TeamFlag code={team1.code} name={team1.name} size="lg" />
                  </div>
                  <span className="text-sm font-display font-bold uppercase tracking-tight truncate max-w-[120px]">
                    {team1.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-0.5 block font-black">
                    GER {team1.rating}
                  </span>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center gap-1.5 px-4">
                  <div className="text-4xl sm:text-5xl font-mono font-black tracking-tight text-slate-100 flex items-center gap-3">
                    <span>{simResults ? simResults.t1Score : '-'}</span>
                    <span className="text-slate-650">:</span>
                    <span>{simResults ? simResults.t2Score : '-'}</span>
                  </div>
                  
                  {/* Pênaltis se houver */}
                  {simResults?.t1PenScore !== undefined && simResults?.t2PenScore !== undefined && (
                    <div className="text-[10px] font-mono uppercase bg-rose-950/80 text-rose-300 px-2.5 py-1 border border-rose-900 tracking-wider">
                      Penais: ({simResults.t1PenScore} - {simResults.t2PenScore})
                    </div>
                  )}

                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold uppercase mt-1">
                    {isSimulating ? 'PARTIDA EM CURSO' : simResults ? 'PARTIDA ENCERRADA' : 'AGUARDANDO CHUTE'}
                  </span>
                </div>

                {/* Time 2 */}
                <div className="flex flex-col items-center flex-1 text-center select-none">
                  <div className="w-14 h-10 bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner mb-2.5">
                    <TeamFlag code={team2.code} name={team2.name} size="lg" />
                  </div>
                  <span className="text-sm font-display font-bold uppercase tracking-tight truncate max-w-[120px]">
                    {team2.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase mt-0.5 block font-black">
                    GER {team2.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* CENTRAL DE TRANSCRIÇÃO MINUTO A MINUTO */}
            <div className="bg-white border border-slate-200 rounded-sm p-4 sm:p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <h3 className="text-sm font-display font-bold uppercase tracking-wider text-slate-950 flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-blue-600" />
                  Transmissão Oficial (Minuto a Minuto)
                </h3>
                <span className="animate-pulse bg-emerald-100 text-emerald-800 text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm">
                  {isSimulating ? 'AO VIVO' : matchLogs.length > 0 ? 'REPRISE' : 'OCIOSO'}
                </span>
              </div>

              {matchLogs.length === 0 ? (
                <div className="py-14 text-center space-y-2">
                  <Activity className="h-8 w-8 text-slate-300 mx-auto animate-pulse" />
                  <p className="text-xs text-slate-400 font-medium">
                    Selecione suas equipes e simule para ver a narração detalhada do jogo em tempo real!
                  </p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1.5 scrollbar-thin">
                  {matchLogs.map((log, index) => {
                    const isGoal = log.includes('⚽');
                    const isCard = log.includes('🟨');
                    const isEnd = log.includes('Fim') || log.includes('Vencedor');
                    return (
                      <div 
                        key={index} 
                        className={`p-3 font-mono text-xs border rounded-sm transition-all animate-fadeIn ${
                          isGoal 
                            ? 'bg-emerald-50 border-emerald-150 text-emerald-800 font-extrabold shadow-xs' 
                            : isCard 
                            ? 'bg-amber-50 border-amber-150 text-amber-800'
                            : isEnd
                            ? 'bg-slate-950 text-white border-slate-900 font-bold'
                            : 'bg-slate-50 border-slate-100 text-slate-650'
                        }`}
                      >
                        {log}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ======================================= */}
      {/* SUB-TAB 2: COPA TRIVIA QUIZ             */}
      {/* ======================================= */}
      {subTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 p-6 sm:p-10 shadow-sm relative overflow-hidden">
          {/* Fundo decorativo de taça discreto */}
          <div className="absolute -bottom-12 -right-12 text-slate-50 font-display font-black text-9xl pointer-events-none select-none opacity-5">
            🏆
          </div>

          {!quizStarted && !quizFinished ? (
            /* TELA INICIAL DO QUIZ */
            <div className="text-center py-8 space-y-6 z-10 relative">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <Trophy className="h-8 w-8" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-display font-black uppercase text-slate-905">
                  QUIZ DE HISTÓRIA DAS COPAS
                </h2>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Acha que é um verdadeiro especialista no esporte rei? Teste a pontaria dos seus palpites históricos em um quiz de 10 perguntas dinâmicas e detalhadas!
                </p>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-150 max-w-sm mx-auto text-left rounded-sm font-mono text-[10px] text-slate-500 space-y-1.5 leading-relaxed">
                <div>📌 <strong>Perguntas:</strong> 10 rodadas estáticas</div>
                <div>📌 <strong>Assuntos:</strong> Copa de 1930 a 2026</div>
                <div>📌 <strong>Estilo:</strong> Múltipla escolha instantânea</div>
                <div>📌 <strong>Objetivo:</strong> Descobrir sua categoria futebolística!</div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="px-8 py-4 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold uppercase tracking-widest text-[10.5px] transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                COMEÇAR QUIZ INTERATIVO ➔
              </button>
            </div>
          ) : quizFinished ? (
            /* TELA FINAL DE RESULTADOS */
            <div className="text-center py-8 space-y-6 z-10 relative">
              <div className="text-5xl">🏆</div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-black block">
                  Pontuação Alcançada
                </span>
                <div className="text-4xl font-display font-black text-slate-900">
                  {quizScore} <span className="text-xl text-slate-400 font-normal">/ 10 Acertos</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-sm max-w-md mx-auto space-y-2">
                <h3 className="text-sm font-display font-black uppercase text-blue-600">
                  Categoria: {getQuizRank(quizScore).title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {getQuizRank(quizScore).desc}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleStartQuiz}
                  className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-display font-bold uppercase tracking-widest text-[9.5px]"
                >
                  <RotateCcw className="h-3 w-3 inline-block mr-1.5" />
                  Jogar Novamente
                </button>
                <button
                  onClick={() => setSubTab('h2h')}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-display font-bold uppercase tracking-widest text-[9.5px]"
                >
                  Ir para Confrontos H2H
                </button>
              </div>
            </div>
          ) : (
            /* PERGUNTA ATIVA DO QUIZ */
            <div className="space-y-6 z-10 relative">
              <div className="flex justify-between items-center text-[10px] font-mono font-black text-slate-400 border-b border-slate-100 pb-3">
                <span>QUIZ DA COPA DO MUNDO</span>
                <span>QUESTÃO {currentQIndex + 1} DE {QUIZ_QUESTIONS.length}</span>
              </div>

              {/* Título da pergunta */}
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-tight">
                {QUIZ_QUESTIONS[currentQIndex].question}
              </h3>

              {/* Botões das Opções */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {QUIZ_QUESTIONS[currentQIndex].options.map((option, idx) => {
                  const isSelected = selectedOptIndex === idx;
                  const isCorrect = idx === QUIZ_QUESTIONS[currentQIndex].correctIndex;
                  
                  let optStyle = 'border-slate-200 hover:bg-slate-50 text-slate-800';
                  if (showExplanation) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-extrabold';
                    } else if (isSelected) {
                      optStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                    } else {
                      optStyle = 'opacity-65 border-slate-150 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 border text-xs sm:text-sm font-semibold transition-all rounded-sm flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{option}</span>
                      {showExplanation && isCorrect && <Check className="h-4.5 w-4.5 text-emerald-600 shrink-0 ml-2" />}
                      {showExplanation && isSelected && !isCorrect && <X className="h-4.5 w-4.5 text-rose-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Card de Explanação/Feedback */}
              {showExplanation && (
                <div className="mt-4 bg-blue-50/50 border border-blue-200 p-4.5 rounded-sm animate-fadeIn space-y-2">
                  <h4 className="text-[10px] font-display font-black text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    Você Sabia? (Explicação do Registro)
                  </h4>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    {QUIZ_QUESTIONS[currentQIndex].explanation}
                  </p>

                  <div className="pt-2 text-right">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold uppercase tracking-widest text-[9px] cursor-pointer"
                    >
                      {currentQIndex + 1 < QUIZ_QUESTIONS.length ? 'PRÓXIMA PERGUNTA ➔' : 'VER RESULTADOS ⭐'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
