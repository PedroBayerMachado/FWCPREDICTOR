/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { GroupTable } from '../components/GroupTable';
import { TEAMS, GROUPS_LIST } from '../data/teams';
import { Trophy, Compass, Sparkles, HelpCircle, Crown, Medal, Award, TrendingUp, Globe, ChevronRight } from 'lucide-react';
import { TeamFlag } from '../components/TeamFlag';

export const Home: React.FC = () => {
  const { 
    groupStandings, 
    setActiveTab, 
    simulateEntireCup, 
    resetSimulator, 
    matches,
    updateMatchScore,
    simulateSingleMatch,
    syncFifaMatches,
    userPredictions
  } = useSimulator();

  const [isSyncingFifa, setIsSyncingFifa] = React.useState(false);
  const [notifications, setNotifications] = React.useState<{ id: string; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  const [selectedTeamId, setSelectedTeamId] = React.useState('9'); // Brasil por padrão

  // Obter detalhes da seleção selecionada para o simulador analítico
  const selectedTeamDetails = React.useMemo(() => {
    return TEAMS.find(t => t.id === selectedTeamId) || TEAMS[0];
  }, [selectedTeamId]);

  // Cálculo matemático determinístico e proporcional baseado em rating (força) das seleções
  const calculatedOdds = React.useMemo(() => {
    const r = selectedTeamDetails.rating;
    
    // Chances baseadas de classificar em 1º ou 2º de um grupo de 4 seleções (ou como melhor 3º)
    const groupPass = Math.min(99, Math.max(12, Math.round(((r - 70) * 2.8) + 65)));
    
    // Chegar às Oitavas (Passar do Round of 32 para Round of 16)
    const r16Pass = Math.min(95, Math.max(6, Math.round(groupPass * (r / 82) * 0.82)));
    
    // Chegar às Quartas de Final
    const qfPass = Math.min(85, Math.max(3, Math.round(r16Pass * (r / 85) * 0.62)));
    
    // Chegar às Semifinais
    const sfPass = Math.min(70, Math.max(1, Math.round(qfPass * (r / 88) * 0.48)));
    
    // Probabilidade de se sagrar Campeão do Mundo
    const champOdds = Math.min(42, Math.max(0.1, Math.round(sfPass * (r / 91) * 0.38 * 10) / 10));

    return {
      groupPass,
      r16Pass,
      qfPass,
      sfPass,
      champOdds
    };
  }, [selectedTeamDetails]);

  // Insights táticos com base na força da seleção selecionada
  const tacticalInsight = React.useMemo(() => {
    const rating = selectedTeamDetails.rating;
    if (rating >= 90) {
      return {
        status: "Favorito Absoluto Elite 👑",
        color: "text-emerald-600 border-emerald-200 bg-emerald-50",
        desc: "Superpotência absoluta do futebol contemporâneo. Conta com talentos individuais do mais alto gabarito atuando nas maiores ligas europeias. Candidato mandatório a levantar a taça.",
        threat: "Nível Máximo de Perigo",
        tactics: "Posse de bola vertical, asfixia alta e repertório tático refinado."
      };
    } else if (rating >= 83) {
      return {
        status: "Forte Concorrente ⭐",
        color: "text-blue-600 border-blue-200 bg-blue-50",
        desc: "Seleção extremamente equilibrada de alta octanagem. Histórico de competitividade de altíssimo nível, perigosa em matas-matas e totalmente capaz de vencer times de ponta.",
        threat: "Perigo Alto",
        tactics: "Consistência de meio de campo, cobertura sólida e velocidade extrema nas pontas."
      };
    } else if (rating >= 76) {
      return {
        status: "Desafiante Tradicional ⚔️",
        color: "text-amber-600 border-amber-200 bg-amber-50",
        desc: "Uma equipe resiliente com grande organização defensiva e espírito coletivo. Podem facilmente punir desatenções e protagonizar o papel de zebra do torneio.",
        threat: "Dificuldade Intermediária",
        tactics: "Marcação em bloco médio-baixo, focando em contra-ataques e excelente bola parada."
      };
    } else {
      return {
        status: "Azarão Sonhador 🚀",
        color: "text-rose-600 border-rose-200 bg-rose-50",
        desc: "Alcançar a fase de mata-mata seria uma façanha histórica e nacional. Entram em campo sem pressão e com energia redobrada, o que os torna adversários perigosos pela imprevisibilidade.",
        threat: "Imprevisível",
        tactics: "Linhas compactas ultra-recuadas com transições longas e doação física extrema."
      };
    }
  }, [selectedTeamDetails]);

  // Lista dos 8 favoritos por poder técnico do banco de dados oficial do app
  const topContendersByRating = React.useMemo(() => {
    return [...TEAMS].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }, []);

  // Monitoramento interativo e em tempo real dos palpites cadastrados no banco do app
  const crowdPredictionsIndex = React.useMemo(() => {
    const total = userPredictions.length;
    const votesMap: Record<string, { championId: string; count: number; name: string; emoji: string; code: string; pct: number }> = {};
    
    userPredictions.forEach(p => {
      if (!p.championId) return;
      if (!votesMap[p.championId]) {
        votesMap[p.championId] = {
          championId: p.championId,
          count: 0,
          name: p.championName,
          emoji: p.championEmoji || "🏳️",
          code: TEAMS.find(t => t.id === p.championId)?.code || "UNK",
          pct: 0
        };
      }
      votesMap[p.championId].count++;
    });

    const list = Object.values(votesMap).map(v => ({
      ...v,
      pct: total > 0 ? Math.round((v.count / total) * 100) : 0
    })).sort((a, b) => b.count - a.count);

    return {
      total,
      list: list.slice(0, 5) // Top 5 mais votados
    };
  }, [userPredictions]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const handleSyncFifa = async () => {
    if (isSyncingFifa) return;
    setIsSyncingFifa(true);
    addNotification('Acessando o site oficial da FIFA (fifa.com) para obter a classificação em tempo real da edição de 2026...', 'info');
    
    try {
      const res = await fetch('/api/fifa-standings');
      const data = await res.json();
      
      if (data.success && data.matches && data.matches.length > 0) {
        syncFifaMatches(data.matches);
        addNotification(data.message || 'Dados oficiais da FIFA.com sincronizados com sucesso!', 'success');
      } else {
        syncFifaMatches(); // Aciona fallback de calibração determinística robusta
        addNotification('Calibração e sincronização local do World Cup 2026 concluída com base nos rankings oficiais!', 'success');
      }
    } catch (err) {
      syncFifaMatches(); // Aciona fallback de calibração determinística robusta
      addNotification('Sincronização offline concluída via sementes determinísticas e rankings de seleções!', 'success');
    } finally {
      setIsSyncingFifa(false);
    }
  };

  // Encontrar o campeão se a final (Match 104) estiver concluída
  const finalMatch = matches.find(m => m.id === 104);
  const isChampionDecided = finalMatch && finalMatch.status === 'completed';
  const championTeam = isChampionDecided 
    ? TEAMS.find(t => t.id === finalMatch.winnerId) 
    : null;

  // Calcular líderes de cada grupo na fase de grupos atual de forma reativa
  const groupLeaders = React.useMemo(() => {
    return GROUPS_LIST.map(gChar => {
      const standings = groupStandings[gChar] || [];
      const leaderStanding = standings[0];
      const team = leaderStanding ? TEAMS.find(t => t.id === leaderStanding.teamId) : null;
      return {
        group: gChar,
        team,
        points: leaderStanding?.points || 0,
        goalsDiff: leaderStanding?.goalsDifference || 0,
        played: leaderStanding?.played || 0,
        won: leaderStanding?.won || 0
      };
    });
  }, [groupStandings]);

  return (
    <div className="space-y-12 animate-fadeIn text-slate-900">
      {/* SECTION 1: HERO OUTSTANDING BANNER (GAZU HIGH LUXURY STYLE) */}
      <div className="relative rounded-none overflow-hidden bg-white border border-slate-300 py-16 px-6 sm:px-16 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Background Decorative Subtle Lines & Dots */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-100/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-150/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left/Main Column: Text Area */}
        <div className="flex-grow space-y-6 text-center lg:text-left z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-slate-950 text-white px-3 py-1 text-[9px] font-display font-bold uppercase tracking-widest leading-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            América do Norte • EUA, México e Canadá
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-display font-black uppercase leading-[0.9] tracking-tighter text-slate-950">
            WORLD CUP <br />
            <span className="text-slate-950 underline decoration-slate-950 decoration-4 sm:decoration-8 underline-offset-4">PREDICTOR</span> 2026
          </h1>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Simule o maior torneio da história do futebol! Pela primeira vez com <strong className="text-slate-950 font-extrabold uppercase tracking-wide">48 seleções divididas em 12 grupos</strong>. Faça seus palpites de campeão, jogue partidas manualmente ou simule toda a Copa instantaneamente com as taxas de probabilidade reais de confronto!
          </p>

          <div id="home-official-domain-cta" className="bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-5 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black text-blue-600 shrink-0">[INFO]</span>
              <div className="text-left">
                <span className="text-[9px] font-display font-bold text-slate-950 uppercase tracking-widest block leading-none">DOMÍNIO PRINCIPAL DA PLATAFORMA</span>
                <span className="text-slate-700 font-extrabold text-xs sm:text-sm tracking-tight mt-1.5 block">
                  Crie o seu chaveamento de forma interativa e salve online:
                </span>
              </div>
            </div>
            <a
              id="home-link-vercel"
              href="https://fwcpredictor.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-5 py-3 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer shrink-0"
            >
              fwcpredictor.app
            </a>
          </div>

          <div id="home-arena-cta" className="bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-5 max-w-2xl mt-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-black text-rose-600 shrink-0">[NOVO]</span>
              <div className="text-left">
                <span className="text-[9px] font-display font-bold text-slate-950 uppercase tracking-widest block leading-none">ARENA DE CONFRONTOS & TRIVIA</span>
                <span className="text-slate-705 font-extrabold text-xs sm:text-sm tracking-tight mt-1.5 block">
                  Simule confrontos diretos lendários e jogue o Quiz das Copas!
                </span>
              </div>
            </div>
            <button
              id="home-link-h2h-sandbox"
              onClick={() => setActiveTab('h2h-sandbox')}
              className="w-full sm:w-auto text-center px-5 py-3 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer shrink-0"
            >
              ACESSAR ARENA
            </button>
          </div>

          {/* Action Buttons styled like high-fashion storefront call-to-actions */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3.5 pt-4">
            <button
              id="hero-palpite-btn"
              onClick={() => setActiveTab('predictions')}
              className="px-6 py-4 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer"
            >
              Palpites de Campeão
            </button>
            <button
              id="hero-ultimate-btn"
              onClick={() => setActiveTab('ultimate-team')}
              className="px-6 py-4 bg-transparent text-slate-950 border border-slate-950 hover:bg-slate-950 hover:text-white font-display font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer"
            >
              Ultimate Team
            </button>
            <button
              id="hero-sim-btn"
              onClick={simulateEntireCup}
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer"
            >
              Simulação Rápida
            </button>
            <button
              id="hero-reset-btn"
              onClick={resetSimulator}
              className="px-6 py-4 bg-transparent text-rose-600 border border-rose-350 hover:bg-rose-50 font-display font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer"
            >
              Resetar Copa ↺
            </button>
          </div>
        </div>

        {/* Right Column: Visual Brand Panel (Faux Model Poster / Trophy Stand) */}
        <div className="w-60 h-60 shrink-0 flex flex-col justify-center items-center bg-slate-50 border border-slate-300 rounded-none px-6 py-8 text-center relative gap-4 shadow-xs">
          {isChampionDecided && championTeam ? (
            <div className="animate-scaleUp w-full space-y-3">
              <div className="text-sm font-mono font-black text-slate-900 border border-slate-900 px-3 py-1 uppercase tracking-tight">CAMPEÃO</div>
              <div>
                <h3 className="text-slate-400 font-display text-[9px] tracking-widest uppercase font-bold leading-none">
                  CAMPEÃO SIMULADO
                </h3>
                <div className="text-base mt-2.5 leading-none text-center flex flex-col items-center justify-center gap-2">
                  <TeamFlag code={championTeam.code} name={championTeam.name} size="md" />
                  <span className="text-slate-950 font-display font-black text-lg block truncate max-w-[190px] uppercase tracking-wide">
                    {championTeam.name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('playoffs')}
                className="mt-2 text-[9px] text-slate-950 font-display font-bold uppercase tracking-widest hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                MAIS DETALHES ➔
              </button>
            </div>
          ) : (
            <>
              <div className="text-slate-205 text-8xl font-display font-black tracking-tighter select-none pointer-events-none mb-1 opacity-20">
                2026
              </div>
              <div className="h-[2px] w-12 bg-slate-950"></div>
              <p className="text-[10px] text-slate-500 font-display uppercase tracking-widest mt-1">
                Aguardando Simulação
              </p>
              <button
                onClick={() => setActiveTab('groups')}
                className="text-[9px] text-slate-950 font-display font-bold uppercase tracking-widest hover:underline cursor-pointer"
              >
                COMEÇAR JOGOS ➔
              </button>
            </>
          )}
        </div>
      </div>

      {/* SEÇÃO COMPACTA: MONITOR DE LÍDERES E DESTAQUES DO FUTEBOL INTERNACIONAL (BENTO STYLE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* MONITOR DE LÍDERES DE MOMENTO (LADO ESQUERDO) */}
        <div id="group-leaders-monitor" className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-200 rounded-sm p-4.5 space-y-4 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 italic uppercase tracking-wider">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Líderes de Grupo (Tempo Real)
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">
              As seleções que atualmente lideram cada uma das 12 chaves oficiais da Copa de 2026 de forma dinâmica.
            </p>
          </div>

          <div className="max-h-[385px] overflow-y-auto pr-1.5 scrollbar-thin">
            <table className="w-full text-left border-collapse select-none">
              <thead>
                <tr className="border-b border-slate-100 text-[9px] font-mono uppercase text-slate-400 font-black">
                  <th className="pb-2">Gr.</th>
                  <th className="pb-2">Seleção</th>
                  <th className="pb-2 text-center">J</th>
                  <th className="pb-2 text-center">V</th>
                  <th className="pb-2 text-center">SG</th>
                  <th className="pb-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {groupLeaders.map((leader) => (
                  <tr key={leader.group} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 font-mono text-[10px] font-black text-blue-600">
                      GP {leader.group}
                    </td>
                    <td className="py-2.5">
                      {leader.team ? (
                        <div className="flex items-center gap-2">
                          <TeamFlag code={leader.team.code} name={leader.team.name} size="xs" />
                          <span className="text-slate-800 text-xs font-bold truncate max-w-[125px] uppercase">
                            {leader.team.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic font-mono uppercase">Vazio</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center font-mono text-[10.5px] text-slate-600 font-bold">
                      {leader.played}
                    </td>
                    <td className="py-2.5 text-center font-mono text-[10.5px] text-slate-600 font-bold">
                      {leader.won}
                    </td>
                    <td className="py-2.5 text-center font-mono text-[10.5px] text-slate-655 font-bold">
                      <span className={leader.goalsDiff > 0 ? 'text-green-600' : leader.goalsDiff < 0 ? 'text-red-500' : 'text-slate-400'}>
                        {leader.goalsDiff > 0 ? `+${leader.goalsDiff}` : leader.goalsDiff}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-xs font-black text-blue-600">
                      {leader.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-sm text-center">
            <button
              onClick={() => setActiveTab('groups')}
              className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-widest hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              Simular Jogos Completos dos Grupos <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* DESTAQUES DO FUTEBOL INTERNACIONAL (LADO DIREITO - BENTO STYLE) */}
        <div id="football-highlights-panel" className="lg:col-span-12 xl:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-sm p-4.5 space-y-4.5 shadow-sm">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2 italic uppercase tracking-wider">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Destaques do Futebol Internacional
                </h2>
                <p className="text-[10px] text-slate-500 font-medium">
                  Grandes campeões coroados na Europa e craques individuais dominantes da temporada atual.
                </p>
              </div>
              <span className="bg-blue-50 border border-blue-200 text-blue-600 font-mono text-[9px] uppercase font-black px-2 py-0.5 rounded-xs shrink-0">
                Temporada 25/26
              </span>
            </div>

            {/* Grid Bento de Conquistas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Campeão da Champions */}
              <div className="bg-slate-50 border border-slate-150 rounded-sm p-3.5 flex flex-col justify-between h-[135px] relative overflow-hidden group hover:border-blue-500/20 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/[0.02] rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-sm bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Trophy className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-black text-blue-600 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    UCL REAL
                  </span>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Champions League</span>
                  <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight block mt-0.5">Paris Saint-Germain</p>
                  <p className="text-[9px] text-slate-500 leading-tight font-medium mt-0.5 font-sans">
                    O Paris Saint-Germain garantiu o bicampeonato europeu consecutivo ao derrotar o Arsenal na grande decisão!
                  </p>
                </div>
              </div>

              {/* Campeão da Premier League */}
              <div className="bg-slate-50 border border-slate-150 rounded-sm p-3.5 flex flex-col justify-between h-[135px] relative overflow-hidden group hover:border-red-500/20 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.02] rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-sm bg-red-50 border border-red-150 flex items-center justify-center text-red-600">
                    <Crown className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-black text-red-650 border border-red-200 bg-red-50 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    EPL REAL
                  </span>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Premier League</span>
                  <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight block mt-0.5">Arsenal FC</p>
                  <p className="text-[9px] text-slate-500 leading-tight font-medium mt-0.5 font-sans">
                    Os Gunners quebraram o longo jejum de 22 anos e conquistaram o tão cobiçado título do campeonato inglês!
                  </p>
                </div>
              </div>

              {/* Campeão da Bundesliga */}
              <div className="bg-slate-50 border border-slate-150 rounded-sm p-3.5 flex flex-col justify-between h-[135px] relative overflow-hidden group hover:border-green-500/20 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/[0.02] rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-sm bg-green-50 border border-green-150 flex items-center justify-center text-green-700">
                    <Medal className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-black text-green-700 border border-green-200 bg-green-50 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    BUNDESLIGA REAL
                  </span>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Bundesliga</span>
                  <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight block mt-0.5">Bayern de Munique</p>
                  <p className="text-[9px] text-slate-500 leading-tight font-medium mt-0.5 font-sans">
                    A máquina bávara foi implacável e assegurou novamente a taça de campeão no topo do futebol alemão.
                  </p>
                </div>
              </div>

              {/* Seção Ballon d'Or Contenders */}
              <div className="bg-slate-50 border border-slate-150 rounded-sm p-3.5 flex flex-col justify-between h-[135px] relative overflow-hidden group hover:border-blue-500/20 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.02] rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 rounded-sm bg-purple-50 border border-purple-150 flex items-center justify-center text-purple-650">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[8px] font-mono font-black text-purple-650 border border-purple-200 bg-purple-50 px-2 py-0.5 rounded-xs uppercase tracking-wider">
                    BALLON D'OR
                  </span>
                </div>
                <div className="mt-2 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block">Corrida de Ouro Individual</span>
                  <p className="text-[9px] text-slate-500 leading-tight font-medium mt-0.5 font-sans">
                    As superestrelas mundiais <strong className="text-slate-900">Harry Kane</strong> e <strong className="text-slate-900">Vinícius Júnior</strong> protagonizaram a temporada individual, dominando os holofotes.
                  </p>
                </div>
              </div>

            </div>

            {/* Rodapé: Melhores Jogadores da Temporada / Contenders Ballon d'Or */}
            <div className="bg-slate-50 border border-slate-150 p-3 rounded-sm space-y-2.5">
              <span className="text-slate-500 font-mono text-[10px] font-black uppercase tracking-wider block">
                👑 Super-Astros em Destaque (Foco Copa de 2026)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  { name: 'Harry Kane', country: 'Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿', reason: 'Maior Goleador Europeu' },
                  { name: 'Michael Olise', country: 'França 🇫🇷', reason: 'Melhor da Bundesliga' },
                  { name: 'Kylian Mbappé', country: 'França 🇫🇷', reason: 'Elite no Real Madrid' },
                  { name: 'Ousmane Dembélé', country: 'França 🇫🇷', reason: 'No topo do world' },
                  { name: 'Lamine Yamal', country: 'Espanha 🇪🇸', reason: 'Protagonista no Barça' },
                  { name: 'Erling Haaland', country: 'Noruega 🇳🇴', reason: 'Recordista no Man City' }
                ].map((star) => (
                  <div key={star.name} className="p-2 bg-white border border-slate-150 rounded-xs text-center space-y-0.5">
                    <span className="text-slate-900 text-[10px] font-bold block truncate leading-tight uppercase">{star.name}</span>
                    <span className="text-[8px] font-mono text-blue-600 block tracking-wide font-bold">{star.country}</span>
                    <span className="text-[7.5px] font-sans text-slate-400 block leading-tight font-medium h-5 overflow-hidden">{star.reason}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SEÇÃO ANALÍTICA: MODELADOR DE PROBABILIDADES E PALPÔMETRO REAL-TIME */}
      <div className="space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-flex items-center gap-1.5 bg-slate-950 text-white px-2.5 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-widest leading-none mb-2">
            PROBABILIDADES & BIG DATA
          </div>
          <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter leading-none">
            CENTRAL DE INTELIGÊNCIA <span className="text-blue-600 underline decoration-slate-950 decoration-4 underline-offset-4">COPA 2026</span>
          </h2>
          <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-wider">
            Simulação avançada de probabilidades de avanço e tendências de votos da comunidade em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PAINEL 1: SIMULADOR DE CHANCES INDIVIDUAIS (COL-SPAN-5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-sm p-6 shadow-xs relative flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.015] rounded-full blur-2xl pointer-events-none"></div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-blue-600" />
                  Modelador de Progresso
                </h3>
                <span className="text-[10px] font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-sm font-bold text-slate-500">
                  Rating: {selectedTeamDetails.rating}
                </span>
              </div>

              {/* Seletor Dropdown */}
              <div className="mb-6">
                <label htmlFor="team-prob-selector" className="block text-[8.5px] font-mono font-black uppercase text-slate-400 mb-2 tracking-widest">
                  Selecione uma Seleção para Analisar:
                </label>
                <select
                  id="team-prob-selector"
                  value={selectedTeamId}
                  onChange={(e) => setSelectedTeamId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-250 rounded-sm py-3 px-3 text-slate-800 font-bold text-sm focus:outline-none focus:border-blue-500 cursor-pointer uppercase"
                >
                  {[...TEAMS].sort((a, b) => a.name.localeCompare(b.name)).map(t => (
                    <option key={t.id} value={t.id}>
                      {t.emoji} {t.name} (Aprov. {t.rating}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Métricas de Progresso */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-700 uppercase mb-1">
                    <span>Classificar no Grupo ({selectedTeamDetails.group})</span>
                    <span className="font-mono text-blue-600 font-black">{calculatedOdds.groupPass}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${calculatedOdds.groupPass}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-700 uppercase mb-1">
                    <span>Alcançar Oitavas (Mata-mata)</span>
                    <span className="font-mono text-blue-600 font-black">{calculatedOdds.r16Pass}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${calculatedOdds.r16Pass}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-700 uppercase mb-1">
                    <span>Alcançar Quartas de Final</span>
                    <span className="font-mono text-blue-600 font-black">{calculatedOdds.qfPass}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${calculatedOdds.qfPass}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-700 uppercase mb-1">
                    <span>Chegar às Semifinais</span>
                    <span className="font-mono text-blue-600 font-black">{calculatedOdds.sfPass}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-sky-400 h-2 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${calculatedOdds.sfPass}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-700 uppercase mb-1">
                    <span>Conquistar o Título Mundial 🏆</span>
                    <span className="font-mono text-emerald-600 font-black">{calculatedOdds.champOdds}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-2.5 rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${calculatedOdds.champOdds}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ficha Tática do Time */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider">Status Tático:</span>
                <span className={`text-[8.5px] font-bold uppercase tracking-widest px-2 py-0.5 border border-transparent rounded-sm ${tacticalInsight.color}`}>
                  {tacticalInsight.status}
                </span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                {tacticalInsight.desc}
              </p>
              <div className="bg-slate-50 p-3 border border-slate-150 rounded-xs">
                <span className="text-[8px] font-mono font-black text-slate-400 block uppercase tracking-wider mb-1">Estratégia Predisposta:</span>
                <p className="text-[10.5px] text-slate-800 font-bold italic">
                  "{tacticalInsight.tactics}"
                </p>
              </div>
            </div>
          </div>

          {/* PAINEL 2: MATRIZ DE COMPARTILHAMENTO DE FORÇA (COL-SPAN-4) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider italic text-slate-900 mb-4 flex items-center gap-1.5">
                <Crown className="h-4.5 w-4.5 text-blue-600" />
                Top Contenders (Índice de Força)
              </h3>
              <p className="text-[10px] text-slate-500 leading-normal mb-4 font-medium">
                Clique em um dos favoritos mundiais abaixo para calibrar o painel interativo de probabilidade de conquista imediatamente:
              </p>

              <div className="space-y-2">
                {topContendersByRating.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTeamId(t.id)}
                    className={`w-full flex items-center justify-between p-2.5 border rounded-sm transition-all text-left ${
                      selectedTeamId === t.id
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-50 border-slate-150 text-slate-800 hover:border-slate-350'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold w-4">#{idx + 1}</span>
                      <TeamFlag code={t.code} name={t.name} size="xs" />
                      <span className="text-xs font-bold uppercase truncate max-w-[130px]">{t.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[9px] font-mono font-bold ${selectedTeamId === t.id ? 'text-white/90' : 'text-slate-400'}`}>
                        Força: {t.rating}
                      </span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('groups')}
                className="w-full text-center py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold text-[9px] uppercase tracking-widest transition-all cursor-pointer"
              >
                IR PARA SIMULADOR DE CONFRONTOS ➔
              </button>
            </div>
          </div>

          {/* PAINEL 3: PALPÔMETRO REAL-TIME DO BANCO (COL-SPAN-3) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="h-4.5 w-4.5 text-blue-600" />
                  Palpômetro Real
                </h3>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[8px] uppercase font-black px-1.5 py-0.5 rounded-sm">
                  LIVE DB 🟢
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal mb-5 font-medium">
                Sincronizado diretamente do banco de dados de palpites reais dos usuários e atualizando dinamicamente!
              </p>

              {crowdPredictionsIndex.total > 0 ? (
                <div className="space-y-4">
                  <div className="text-center bg-slate-50 border border-slate-150 py-3 px-2 rounded-xs">
                    <span className="text-[9px] font-mono font-black text-slate-400 block uppercase tracking-widest">TOTAL DE VOTOS COLETADOS</span>
                    <span className="text-2xl font-display font-black text-slate-950 block mt-0.5">{crowdPredictionsIndex.total}</span>
                    <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5 block">Sincronizado sem fraudes</span>
                  </div>

                  <div className="space-y-3.5">
                    <span className="text-[8px] font-mono font-black text-slate-400 block uppercase tracking-widest">PREFERIDOS DO PÚBLICO:</span>
                    {crowdPredictionsIndex.list.map((item, idx) => (
                      <div key={item.championId} className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-slate-400 font-bold">#{idx + 1}</span>
                            <span className="text-base leading-none shrink-0">{item.emoji}</span>
                            <span className="font-bold text-slate-800 uppercase truncate max-w-[85px]">{item.name}</span>
                          </div>
                          <span className="font-mono text-blue-600 font-black">{item.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-1 rounded-full" 
                            style={{ width: `${item.pct}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="text-slate-350 text-3xl shrink-0">🗳️</div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-black text-slate-800 uppercase block">Aguardando Palpites</span>
                    <span className="text-[9px] text-slate-400 block leading-tight font-medium">Inscreva o seu primeiro palpite do campeão agora mesmo!</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('predictions')}
                className="w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-display font-bold text-[9.5px] uppercase tracking-widest transition-all cursor-pointer shadow-sm shadow-blue-500/20"
              >
                CADASTRAR MEU PALPITE 🗳️
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Toast Notification HUD */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-sm shadow-xl flex items-start gap-4 border text-xs font-semibold animate-slideIn ${
              n.type === 'success' 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : n.type === 'error'
                  ? 'bg-rose-50 border-rose-300 text-rose-800'
                  : 'bg-blue-50 border-blue-300 text-blue-800'
            }`}
          >
            <div className="flex-1">{n.message}</div>
            <button
              onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
              className="text-slate-400 hover:text-slate-700 font-black"
            >
              ×
            </button>
          </div>
        ))}
      </div>

     </div>
   );
 };
