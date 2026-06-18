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
    matches 
  } = useSimulator();

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

      {/* SECTION 2: GRUPOS GLOBAIS (12 GRUPOS) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 flex items-center gap-2 italic uppercase tracking-tighter">
              <Compass className="h-8 w-8 text-blue-600" />
              Tabela de <span className="text-blue-600">Classificação</span>
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Classificação em tempo real atualizada automaticamente ao salvar os placares da fase de grupos.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('groups')}
              className="text-xs border border-slate-300 hover:border-slate-400 bg-white text-slate-700 font-black uppercase tracking-widest px-4 py-2 rounded transition-all cursor-pointer shadow-xs"
            >
              Simular Jogos Manualmente →
            </button>
          </div>
        </div>

        {/* 12 Groups grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {GROUPS_LIST.map(gChar => (
            <GroupTable
              key={gChar}
              groupName={gChar}
              standings={groupStandings[gChar] || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
