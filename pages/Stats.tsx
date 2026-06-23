/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { BarChart3, HelpCircle, Flame, ShieldAlert, Sparkles, Trophy, History, Globe, Calendar, Award } from 'lucide-react';
import { TeamFlag } from '../components/TeamFlag';

export const Stats: React.FC = () => {
  const { matches, userPredictions } = useSimulator();

  // Calcular estatísticas dos jogos simulados/encerrados
  const completedMatches = matches.filter(m => m.status === 'completed');
  const totalMatches = completedMatches.length;

  let totalGoals = 0;
  // Gols por equipe para rankear melhor ataque e defesa
  const teamGoalsScored: Record<string, number> = {};
  const teamGoalsConceded: Record<string, number> = {};

  completedMatches.forEach(m => {
    if (m.team1Score !== undefined && m.team2Score !== undefined) {
      totalGoals += (m.team1Score + m.team2Score);

      if (m.team1Id && m.team2Id) {
        teamGoalsScored[m.team1Id] = (teamGoalsScored[m.team1Id] || 0) + m.team1Score;
        teamGoalsScored[m.team2Id] = (teamGoalsScored[m.team2Id] || 0) + m.team2Score;

        teamGoalsConceded[m.team1Id] = (teamGoalsConceded[m.team1Id] || 0) + m.team2Score;
        teamGoalsConceded[m.team2Id] = (teamGoalsConceded[m.team2Id] || 0) + m.team1Score;
      }
    }
  });

  const averageGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(2) : '0';

  // Encontrar equipe com melhor ataque (mais gols marcados)
  let bestAttackTeamId = '';
  let bestAttackGoals = 0;
  Object.entries(teamGoalsScored).forEach(([teamId, goals]) => {
    if (goals > bestAttackGoals) {
      bestAttackGoals = goals;
      bestAttackTeamId = teamId;
    }
  });
  const bestAttackTeam = TEAMS.find(t => t.id === bestAttackTeamId);

  // Encontrar equipe com pior defesa (mais gols sofridos)
  let worstDefenceTeamId = '';
  let worstDefenceGoals = 0;
  Object.entries(teamGoalsConceded).forEach(([teamId, goals]) => {
    if (goals > worstDefenceGoals) {
      worstDefenceGoals = goals;
      worstDefenceTeamId = teamId;
    }
  });
  const worstDefenceTeam = TEAMS.find(t => t.id === worstDefenceTeamId);

  // Seleção favorita dos palpites do LocalStorage
  const favoriteChampCount: Record<string, number> = {};
  userPredictions.forEach(p => {
    favoriteChampCount[p.championId] = (favoriteChampCount[p.championId] || 0) + 1;
  });

  let favChampId = '';
  let favChampVotes = 0;
  Object.entries(favoriteChampCount).forEach(([teamId, count]) => {
    if (count > favChampVotes) {
      favChampVotes = count;
      favChampId = teamId;
    }
  });
  const favChampion = TEAMS.find(t => t.id === favChampId);

  // Times com maiores ratings
  const topTeamsByRating = [...TEAMS]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Calcular líderes do prêmio "Homem do Jogo" (Man of the Match)
  const playerMotmCounts: Record<string, { name: string; teamId: string; count: number; maxRating: number; goals: number; assists: number }> = {};
  
  completedMatches.forEach(m => {
    if (m.motm) {
      const p = m.motm;
      if (!playerMotmCounts[p.playerName]) {
        playerMotmCounts[p.playerName] = {
          name: p.playerName,
          teamId: p.teamId,
          count: 0,
          maxRating: 0,
          goals: 0,
          assists: 0
        };
      }
      playerMotmCounts[p.playerName].count += 1;
      playerMotmCounts[p.playerName].goals += p.goals;
      playerMotmCounts[p.playerName].assists += p.assists;
      if (p.rating > playerMotmCounts[p.playerName].maxRating) {
        playerMotmCounts[p.playerName].maxRating = p.rating;
      }
    }
  });

  const topMotmPlayers = Object.values(playerMotmCounts)
    .sort((a, b) => b.count - a.count || b.maxRating - a.maxRating || b.goals - a.goals)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-4xl font-black text-slate-900 flex items-center gap-2 italic uppercase tracking-tighter">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          Estatísticas Analíticas e <span className="text-blue-600">Métricas</span>
        </h1>
        <p className="text-slate-505 text-xs mt-1">
          Análise quantitativa de gols, forças e previsões baseada nos jogos simulados no seu navegador.
        </p>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total simulated */}
        <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-xs relative overflow-hidden">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-black">Jogos Simulados</span>
          <p className="text-3xl font-black text-slate-900 mt-1 font-mono italic">{totalMatches} / <span className="text-slate-400">104</span></p>
          <div className="w-full bg-slate-100 h-2.5 rounded-sm mt-3 overflow-hidden border border-slate-200/50">
            <div 
              className="bg-blue-600 h-full rounded-sm transition-all duration-300"
              style={{ width: `${(totalMatches / 104) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Total goals */}
        <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-xs">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-black">Total de Gols Simulado</span>
          <p className="text-3xl font-black text-blue-600 mt-1 font-mono italic">{totalGoals}</p>
          <span className="text-[10px] text-slate-400 block mt-2 font-mono uppercase">Gols marcados nas redes</span>
        </div>

        {/* Goals / Match */}
        <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-xs">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-black">Média Gols / Partida</span>
          <p className="text-3xl font-black text-blue-600 mt-1 font-mono italic">{averageGoals}</p>
          <span className="text-[10px] text-slate-400 block mt-2 font-mono uppercase">Índice de artilharia</span>
        </div>

        {/* Favorite */}
        <div className="bg-white border border-slate-200 rounded-sm p-5 shadow-xs">
          <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-black">Queridinho da Galera</span>
          {favChampion ? (
            <div className="flex items-center gap-2.5 mt-2">
              <TeamFlag code={favChampion.code} name={favChampion.name} size="md" />
              <div>
                <span className="text-slate-900 font-extrabold text-sm block truncate max-w-[120px] uppercase font-bold tracking-wide">{favChampion.name}</span>
                <span className="text-[9px] text-blue-600 font-mono block font-bold uppercase">{favChampVotes} palpites ({Math.round(favChampVotes / userPredictions.length * 100)}%)</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic mt-3 font-mono uppercase tracking-wider">Nenhum palpite</p>
          )}
        </div>

      </div>

      {/* DETAILED STATS COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Liderança e Força técnica */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-xs space-y-4">
          <h2 className="text-base font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Top 5 - Ratings FIFA
          </h2>
          <div className="divide-y divide-slate-100">
            {topTeamsByRating.map((t, index) => (
              <div key={t.id} className="flex justify-between items-center py-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-slate-400 font-bold text-sm w-4">#{index + 1}</span>
                  <TeamFlag code={t.code} name={t.name} size="sm" />
                  <span className="text-slate-800 font-extrabold text-xs uppercase tracking-wide">{t.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded-sm border border-blue-100 uppercase animate-none">
                    {t.rating} GER
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-mono italic uppercase tracking-wider leading-tight pt-1">
            * O Rating Fictício de 1-100 representa o poder defensivo e ofensivo simulado probabilísticamente.
          </p>
        </div>

        {/* Craques da Copa (Man of the Match Leaderboard) */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-xs space-y-4">
          <h2 className="text-base font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Trophy className="h-5 w-5 text-amber-500" />
            Líderes de Man of the Match
          </h2>
          <div className="divide-y divide-slate-100">
            {topMotmPlayers.length > 0 ? (
              topMotmPlayers.map((player, index) => {
                const team = TEAMS.find(t => t.id === player.teamId);
                return (
                  <div key={player.name} className="flex justify-between items-center py-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-slate-400 font-bold text-sm w-4">#{index + 1}</span>
                      <div className="text-xs font-bold truncate">
                        <span className="text-slate-800 uppercase block tracking-wide truncate">{player.name}</span>
                        <span className="text-[10px] text-slate-405 font-mono font-semibold flex items-center gap-1 mt-0.5">
                          {team?.emoji} {team?.name}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 pl-2">
                      <span className="text-[10px] font-mono font-black bg-amber-50 border border-amber-200 text-amber-600 px-2 py-0.5 rounded-sm uppercase">
                        {player.count}x MVP
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 font-mono text-[10px] uppercase italic">
                Nenhum jogo simulado ainda.
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-450 font-mono italic uppercase tracking-wider leading-tight pt-1">
            * Atletas eleitos com base na nota de partida e na contribuição direta nos gols.
          </p>
        </div>

        {/* Melhores Ofensivos / Defensivos */}
        <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-xs space-y-5">
          <h2 className="text-base font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            🎯 Desempenho Coletivo 
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            
            {/* Melhor ataque */}
            <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 flex flex-col justify-between h-24">
              <span className="text-[9px] font-mono uppercase bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-sm self-start flex items-center gap-1 font-black italic">
                <Flame className="h-3 w-3 fill-blue-55" />
                Melhor Ataque (Gols Pró)
              </span>
              {bestAttackTeam ? (
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <TeamFlag code={bestAttackTeam.code} name={bestAttackTeam.name} size="sm" />
                    <div>
                      <span className="text-slate-900 font-bold text-xs block truncate max-w-[120px] uppercase">{bestAttackTeam.name}</span>
                      <span className="text-[10px] font-mono font-black text-slate-500 block tracking-wider uppercase">{bestAttackGoals} Gols Marcados</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-slate-405 italic font-mono uppercase">Sem dados</p>
              )}
            </div>

            {/* Pior defesa */}
            <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 flex flex-col justify-between h-24">
              <span className="text-[9px] font-mono uppercase bg-red-50 text-red-650 border border-red-100 px-2 py-0.5 rounded-sm self-start flex items-center gap-1 font-black italic">
                <ShieldAlert className="h-3 w-3" />
                Vazado (Mais sofridos)
              </span>
              {worstDefenceTeam ? (
                <div className="mt-1">
                  <div className="flex items-center gap-2">
                    <TeamFlag code={worstDefenceTeam.code} name={worstDefenceTeam.name} size="sm" />
                    <div>
                      <span className="text-slate-900 font-bold text-xs block truncate max-w-[120px] uppercase">{worstDefenceTeam.name}</span>
                      <span className="text-[10px] font-mono font-black text-slate-500 block tracking-wider uppercase">{worstDefenceGoals} Gols Concedidos</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-slate-405 italic font-mono uppercase">Sem dados</p>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* SECTION: ESTATÍSTICAS HISTÓRICAS OFICIAIS DA FIFA */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-6 shadow-xs">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 italic uppercase tracking-tighter">
              <Globe className="h-5 w-5 text-blue-600" />
              Estatísticas Históricas Oficiais da FIFA
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">
              Dados canônicos, recordes eternos e a galeria de honra das Copas do Mundo de Futebol Masculino.
            </p>
          </div>
          <span className="bg-blue-50 border border-blue-200 text-blue-600 font-mono text-[9px] uppercase font-black px-2 py-1 rounded-xs self-start sm:self-auto shrink-0">
            Métricas de Legado FIFA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Recordes Lendários (Lado Esquerdo - Col 7/12) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <History className="h-4 w-4 text-blue-600" />
              Recordes Históricos Individuais e Coletivos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Maior Artilheiro", value: "Miroslav Klose 🇩🇪", desc: "16 gols anotados em 24 jogos disputados ao longo de 4 edições.", stat: "16 GOLS" },
                { title: "Mais Jogos Disputados", value: "Lionel Messi 🇦🇷", desc: "26 partidas jogadas defendendo o manto alviceleste nas Copas mundiais.", stat: "26 JOGOS" },
                { title: "Maior Goleador Única Edição", value: "Just Fontaine 🇫🇷", desc: "Incrível marca estabelecida na histórica campanha de 1958 na Suécia.", stat: "13 GOLS" },
                { title: "Maior Goleada Histórica", value: "Hungria 10-1 El Salvador 🇸🇻", desc: "Placar mais elástico já registrado na história da fase final em 1982.", stat: "10x1 PLACAR" },
                { title: "Partida com Mais Gols", value: "Áustria 7-5 Suíça 🇨🇭", desc: "Partida eletrizante com 12 gols nas redes durante as quartas de 1954.", stat: "12 GOLS" },
                { title: "Mais Títulos por Jogador", value: "Pelé 🇧🇷 (O Rei do Futebol)", desc: "O único jogador do planeta tricampeão das Copas (1958, 1962, 1970).", stat: "3 TAÇAS" }
              ].map((rec) => (
                <div key={rec.title} className="bg-slate-50 border border-slate-200 p-4 rounded-sm hover:border-blue-300 transition-all">
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-[9px] font-mono tracking-widest text-[#71717a] uppercase font-black">{rec.title}</span>
                    <span className="bg-blue-50 border border-blue-200 text-blue-600 font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded-xs">{rec.stat}</span>
                  </div>
                  <h4 className="text-slate-900 text-xs font-black uppercase tracking-wide mt-1.5">{rec.value}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed font-semibold">{rec.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Galeria de Honra dos Campeões (Lado Direito - Col 5/12) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              Galeria Antológica de Reis das Copas
            </h3>

            <div className="bg-slate-50 border border-slate-200 rounded-sm p-4.5 space-y-3.5 shadow-xs">
              <div className="flex justify-between items-center text-[10px] font-mono font-black uppercase text-slate-400 border-b border-slate-200 pb-2">
                <span>Edição & Sede</span>
                <span>Campeão do Mundo</span>
              </div>
              
              <div className="divide-y divide-slate-100">
                {[
                  { year: "2022", host: "Catar", champ: "Argentina", flag: "🇦🇷", score: "4-2 Pen (3-3)" },
                  { year: "2018", host: "Rússia", champ: "França", flag: "🇫🇷", score: "4-2" },
                  { year: "2014", host: "Brasil", champ: "Alemanha", flag: "🇩🇪", score: "1-0 Pro (0-0)" },
                  { year: "2010", host: "África do Sul", champ: "Espanha", flag: "🇪🇸", score: "1-0 Pro (0-0)" },
                  { year: "2006", host: "Alemanha", champ: "Itália", flag: "🇮🇹", score: "5-3 Pen (1-1)" },
                  { year: "2002", host: "Coreia & Japão", champ: "Brasil", flag: "🇧🇷", score: "2-0" },
                  { year: "1998", host: "França", champ: "França", flag: "🇫🇷", score: "3-0" },
                  { year: "1994", host: "EUA", champ: "Brasil", flag: "🇧🇷", score: "3-2 Pen (0-0)" }
                ].map((item) => (
                  <div key={item.year} className="flex justify-between items-center py-2.5 hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      <div>
                        <span className="text-slate-800 text-[11px] font-black font-mono block">{item.year}</span>
                        <span className="text-[8px] text-slate-400 uppercase font-mono font-bold block">{item.host}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-slate-900 text-[11px] font-black uppercase italic tracking-wide">{item.flag} {item.champ}</span>
                      </div>
                      <span className="text-[8px] font-mono text-blue-600 font-bold block">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Maiores Ganhadores */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-sm flex items-center justify-between gap-4">
              <div className="space-y-0.5 text-left">
                <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest block font-bold">Heptacampeão em Potencial</span>
                <span className="text-slate-900 text-xs font-black uppercase">🇧🇷 BRASIL (Super Campeão)</span>
              </div>
              <div className="bg-blue-600 text-white font-black text-[13px] font-mono py-1 px-3 rounded-xs flex items-center justify-center italic tracking-tighter shadow-sm">
                5 TÍTULOS
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
