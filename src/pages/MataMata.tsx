/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { MatchCard } from '../components/MatchCard';
import { TEAMS } from '../data/teams';
import { 
  Trophy, GitMerge, Award, ChevronRight, Play, Info, 
  HelpCircle, AlignLeft, BarChart3, RotateCcw, Flame
} from 'lucide-react';
import { TeamFlag } from '../components/TeamFlag';
import { BracketBoardShare } from '../components/BracketBoardShare';
import { MatchInspectorModal } from '../components/MatchInspectorModal';

type PlayoffTab = 'all' | 'round_of_32' | 'round_of_16' | 'quarter_finals' | 'finals';

export const MataMata: React.FC = () => {
  const { matches, simulateEntireCup, resetSimulator, simulatePlayoffPhase } = useSimulator();
  const [activeTab, setActiveTab] = useState<PlayoffTab>('finals');
  
  // Custom interactive tree state
  const [bracketView, setBracketView] = useState<'compact' | 'expanded' | 'r32'>('expanded');
  const [inspectorMatchId, setInspectorMatchId] = useState<number | null>(null);

  // Filtros dos jogos de mata-mata
  const roundOf32Matches = matches.filter(m => m.phase === 'round_of_32');
  const roundOf16Matches = matches.filter(m => m.phase === 'round_of_16');
  const quarterFinalsMatches = matches.filter(m => m.phase === 'quarter_finals');
  const semiFinalsMatches = matches.filter(m => m.phase === 'semi_finals');
  const thirdPlaceMatch = matches.find(m => m.phase === 'third_place');
  const finalMatch = matches.find(m => m.phase === 'final');

  const getFilteredMatches = () => {
    switch (activeTab) {
      case 'round_of_32': return roundOf32Matches;
      case 'round_of_16': return roundOf16Matches;
      case 'quarter_finals': return quarterFinalsMatches;
      case 'finals':
        const finalsList = [...semiFinalsMatches];
        if (thirdPlaceMatch) finalsList.push(thirdPlaceMatch);
        if (finalMatch) finalsList.push(finalMatch);
        return finalsList;
      default:
        return matches.filter(m => m.phase !== 'group');
    }
  };

  // Encontrar campeão
  const championTeam = finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId
    ? TEAMS.find(t => t.id === finalMatch.winnerId)
    : null;

  // Encontrar vice-campeão
  const runnerUpTeam = finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId
    ? TEAMS.find(t => t.id === (finalMatch.winnerId === finalMatch.team1Id ? finalMatch.team2Id : finalMatch.team1Id))
    : null;

  // Encontrar terceiro colocado
  const thirdPlaceTeam = thirdPlaceMatch && thirdPlaceMatch.status === 'completed' && thirdPlaceMatch.winnerId
    ? TEAMS.find(t => t.id === thirdPlaceMatch.winnerId)
    : null;

  // Playoff Stats Computations
  const playoffMatches = matches.filter(m => m.phase !== 'group');
  const totalPlayoffCount = playoffMatches.length; // 32
  const completedPlayoffCount = playoffMatches.filter(m => m.status === 'completed').length;
  const playoffPct = totalPlayoffCount > 0 ? Math.round((completedPlayoffCount / totalPlayoffCount) * 100) : 0;
  
  const totalGoalsInPlayoffs = playoffMatches.reduce((acc, m) => {
    if (m.status !== 'completed') return acc;
    return acc + (m.team1Score || 0) + (m.team2Score || 0);
  }, 0);
  const avgGoalsInPlayoffs = completedPlayoffCount > 0 ? (totalGoalsInPlayoffs / completedPlayoffCount).toFixed(1) : '0.0';
  
  const totalPenaltiesInPlayoffs = playoffMatches.filter(m => {
    return m.status === 'completed' && m.team1PenScore !== undefined && m.team2PenScore !== undefined;
  }).length;

  const getSlotPlaceholder = (id: number, slot: 1 | 2): string => {
    if (id >= 73 && id <= 88) {
      if (slot === 1) {
        if (id === 73) return "1º Grupo A";
        if (id === 74) return "1º Grupo B";
        if (id === 75) return "1º Grupo C";
        if (id === 76) return "1º Grupo D";
        if (id === 77) return "1º Grupo E";
        if (id === 78) return "1º Grupo F";
        if (id === 79) return "1º Grupo G";
        if (id === 80) return "1º Grupo H";
        if (id === 81) return "1º Grupo I";
        if (id === 82) return "1º Grupo J";
        if (id === 83) return "1º Grupo K";
        if (id === 84) return "1º Grupo L";
        if (id === 85) return "2º Grupo A";
        if (id === 86) return "2º Grupo C";
        if (id === 87) return "2º Grupo E";
        if (id === 88) return "2º Grupo G";
      } else {
        if (id === 73) return "3º Col. (1)";
        if (id === 74) return "3º Col. (2)";
        if (id === 75) return "3º Col. (3)";
        if (id === 76) return "3º Col. (4)";
        if (id === 77) return "3º Col. (5)";
        if (id === 78) return "3º Col. (6)";
        if (id === 79) return "3º Col. (7)";
        if (id === 80) return "3º Col. (8)";
        if (id === 81) return "2º Grupo L";
        if (id === 82) return "2º Grupo K";
        if (id === 83) return "2º Grupo J";
        if (id === 84) return "2º Grupo I";
        if (id === 85) return "2º Grupo B";
        if (id === 86) return "2º Grupo D";
        if (id === 87) return "2º Grupo F";
        if (id === 88) return "2º Grupo H";
      }
    }
    if (id === 89) return slot === 1 ? "Venc. 73" : "Venc. 74";
    if (id === 90) return slot === 1 ? "Venc. 75" : "Venc. 76";
    if (id === 91) return slot === 1 ? "Venc. 77" : "Venc. 78";
    if (id === 92) return slot === 1 ? "Venc. 79" : "Venc. 80";
    if (id === 93) return slot === 1 ? "Venc. 81" : "Venc. 82";
    if (id === 94) return slot === 1 ? "Venc. 83" : "Venc. 84";
    if (id === 95) return slot === 1 ? "Venc. 85" : "Venc. 86";
    if (id === 96) return slot === 1 ? "Venc. 87" : "Venc. 88";
    
    if (id === 97) return slot === 1 ? "Venc. 89" : "Venc. 90";
    if (id === 98) return slot === 1 ? "Venc. 91" : "Venc. 92";
    if (id === 99) return slot === 1 ? "Venc. 93" : "Venc. 94";
    if (id === 100) return slot === 1 ? "Venc. 95" : "Venc. 96";
    
    if (id === 101) return slot === 1 ? "Venc. 97" : "Venc. 98";
    if (id === 102) return slot === 1 ? "Venc. 99" : "Venc. 100";
    
    if (id === 103) return slot === 1 ? "Perd. 101" : "Perd. 102";
    if (id === 104) return slot === 1 ? "Venc. 101" : "Venc. 102";
    return "A definir";
  };

  // Renderizador de nós compactos para o diagrama de Bracket
  const renderBracketNode = (matchId: number) => {
    const match = matches.find(m => m.id === matchId);
    if (!match) return null;

    const t1 = TEAMS.find(t => t.id === match.team1Id);
    const t2 = TEAMS.find(t => t.id === match.team2Id);

    const isWinner1 = match.status === 'completed' && match.winnerId === match.team1Id;
    const isWinner2 = match.status === 'completed' && match.winnerId === match.team2Id;
    const isCompleted = match.status === 'completed';

    const hasPenalties = isCompleted && match.team1PenScore !== undefined && match.team2PenScore !== undefined;

    return (
      <div 
        onClick={() => setInspectorMatchId(matchId)}
        className={`bg-white border rounded-sm p-2 text-xs select-none w-44 transition-all duration-150 shadow-sm cursor-pointer relative group ${
          isCompleted 
            ? 'border-blue-500 bg-white hover:border-blue-600 hover:scale-[1.015]' 
            : 'border-slate-250 hover:border-blue-400 hover:scale-[1.015]'
        }`}
      >
        <div className="flex justify-between items-center mb-1 text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 select-none">
          <span className="group-hover:text-blue-600 transition-colors">Jogo {match.id}</span>
          <span className="text-blue-600 font-extrabold">{match.date.split('-')[2]}/{match.date.split('-')[1]}</span>
        </div>
        <div className="space-y-1">
          {/* Time 1 Row */}
          <div className={`flex justify-between items-center ${isCompleted ? (isWinner1 ? 'text-blue-600 font-extrabold' : 'opacity-40 text-slate-400') : 'text-slate-700 font-bold'}`}>
            <div className="flex items-center gap-1 truncate max-w-[125px]">
              {t1 ? (
                <>
                  <TeamFlag code={t1.code} name={t1.name} size="sm" className="shadow-xs" />
                  <span className="truncate uppercase text-[10px] font-extrabold">{t1.name}</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-3.5 bg-slate-50 border border-dashed border-slate-200 rounded-sm flex-shrink-0" />
                  <span className="text-slate-450 truncate text-[8.5px] font-mono font-semibold italic">{getSlotPlaceholder(matchId, 1)}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-0.5 font-mono text-[11px]">
              {hasPenalties && isWinner1 && (
                <span className="text-[7.5px] text-blue-600 font-bold">({match.team1PenScore})</span>
              )}
              <span className={`text-center w-4 text-[11px] font-black ${isWinner1 ? 'text-blue-600' : 'text-slate-800'}`}>
                {match.status === 'completed' ? match.team1Score : '-'}
              </span>
            </div>
          </div>

          {/* Time 2 Row */}
          <div className={`flex justify-between items-center ${isCompleted ? (isWinner2 ? 'text-blue-600 font-extrabold' : 'opacity-40 text-slate-400') : 'text-slate-700 font-bold'}`}>
            <div className="flex items-center gap-1 truncate max-w-[125px]">
              {t2 ? (
                <>
                  <TeamFlag code={t2.code} name={t2.name} size="sm" className="shadow-xs" />
                  <span className="truncate uppercase text-[10px] font-extrabold">{t2.name}</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-3.5 bg-slate-50 border border-dashed border-slate-200 rounded-sm flex-shrink-0" />
                  <span className="text-slate-450 truncate text-[8.5px] font-mono font-semibold italic">{getSlotPlaceholder(matchId, 2)}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-0.5 font-mono text-[11px]">
              {hasPenalties && isWinner2 && (
                <span className="text-[7.5px] text-blue-600 font-bold">({match.team2PenScore})</span>
              )}
              <span className={`text-center w-4 text-[11px] font-black ${isWinner2 ? 'text-blue-600' : 'text-slate-800'}`}>
                {match.status === 'completed' ? match.team2Score : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Play indicator hover effect */}
        <div className="absolute right-1 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white p-1 rounded-full shadow-sm">
          <Play className="h-2 w-2 fill-white stroke-white" />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 border-b border-slate-205 pb-4">
        <div>
          <h1 className="text-4xl font-black text-slate-955 flex items-center gap-2 italic uppercase tracking-tighter">
            <GitMerge className="h-8 w-8 text-blue-600" />
            Simulador do Mata-Mata <span className="text-blue-600">Oficial</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Do Jogo 73 ao Jogo 104. Preencha os placares individuais ou simule os Playoffs de uma só vez!
          </p>
        </div>

        {/* Botões Rápidos */}
        <div className="flex gap-3">
          <button
            id="sim-mata-all-btn"
            onClick={simulateEntireCup}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-sm cursor-pointer shadow-sm transition-all uppercase tracking-widest border-none"
          >
            Simular Todo o Mata-Mata
          </button>
          <button
            id="reset-mata-all-btn"
            onClick={resetSimulator}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-705 font-black text-xs rounded-sm cursor-pointer transition-all uppercase tracking-widest bg-white"
          >
            Resetar Chaveamento
          </button>
        </div>
      </div>

      {/* QUICK STATISTICS STATS COUNTER PANEL */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-slate-200 p-4 rounded-sm shadow-xs">
        {/* Progress Card */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <AlignLeft className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-mono tracking-wider uppercase font-black">Progresso Geral</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900">{completedPlayoffCount} / 32</span>
            <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 rounded-sm font-black border border-blue-105">{playoffPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div style={{ width: `${playoffPct}%` }} className="h-full bg-blue-600 transition-all duration-500 shadow-sm" />
          </div>
        </div>

        {/* Goals Average Card */}
        <div className="space-y-1 border-l border-slate-200 pl-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-mono tracking-wider uppercase font-black">Gols no Mata-Mata</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-1">{totalGoalsInPlayoffs}</p>
          <p className="text-[9px] text-slate-450 font-mono">Média de {avgGoalsInPlayoffs} por partida</p>
        </div>

        {/* Penalty Shoots Card */}
        <div className="space-y-1 border-l border-slate-200 pl-4">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Flame className="h-4 w-4 text-red-500" />
            <span className="text-[10px] font-mono tracking-wider uppercase font-black">Decisões Pênaltis</span>
          </div>
          <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none mt-1">{totalPenaltiesInPlayoffs}</p>
          <p className="text-[9px] text-slate-450 font-mono uppercase">Jogos que foram para cobranças</p>
        </div>

        {/* Phase Action Guide */}
        <div className="space-y-1 border-l border-slate-200 pl-4 hidden md:block">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Info className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-mono tracking-wider uppercase font-black">Ajuda de Jogo</span>
          </div>
          <p className="text-slate-500 text-[11px] font-medium leading-tight">
            Clique em qualquer caixinha do chaveamento para abrir o editor e simulador rápido!
          </p>
        </div>
      </div>

      {/* SECTION 1: CROWNING PODIUM GRAPHIC */}
      {championTeam && (
        <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 text-center shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center justify-center bg-blue-600 text-white p-2.5 rounded-sm mb-3 shadow-xs">
            <Trophy className="h-8 w-8 font-black animate-bounce" />
          </div>
          
          <h2 className="text-xs font-mono font-black tracking-[0.25em] text-blue-600 uppercase italic">
            CAMPEÃO DA COPA DO MUNDO DA FIFA 2026™
          </h2>
          
          <div className="mt-2 text-2xl sm:text-4xl font-black text-slate-900 flex items-center justify-center gap-4 animate-scaleUp italic uppercase tracking-tighter">
            <TeamFlag code={championTeam.code} name={championTeam.name} size="md" />
            <span className="underline decoration-8 underline-offset-8 decoration-blue-600">{championTeam.name}</span>
            <TeamFlag code={championTeam.code} name={championTeam.name} size="md" />
          </div>

          <p className="text-slate-500 text-[10px] mt-4 font-mono uppercase tracking-wider">
            Simulação concluída com sucesso! Salva nas estatísticas do seu navegador.
          </p>

          {/* Podium de Prata e Bronze */}
          <div className="grid grid-cols-2 max-w-sm mx-auto mt-6 border-t border-slate-200 pt-4 gap-4 text-xs font-medium">
            <div className="text-center">
              <span className="text-[9px] text-slate-450 font-mono block uppercase tracking-wider">Vice-Campeão</span>
              <span className="text-slate-900 font-black uppercase tracking-wide inline-flex items-center gap-1.5 mt-1.5 italic">
                {runnerUpTeam && <TeamFlag code={runnerUpTeam.code} name={runnerUpTeam.name} size="sm" />}
                <span>{runnerUpTeam?.name || 'A definir'}</span>
              </span>
            </div>
            <div className="text-center border-l border-slate-200">
              <span className="text-[9px] text-slate-450 font-mono block uppercase tracking-wider">Terceiro Colocado</span>
              <span className="text-blue-600 font-gray uppercase tracking-wide inline-flex items-center gap-1.5 mt-1.5 italic font-bold">
                {thirdPlaceTeam && <TeamFlag code={thirdPlaceTeam.code} name={thirdPlaceTeam.name} size="sm" />}
                <span>{thirdPlaceTeam?.name || 'A definir'}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: DIAGRAMA CHAVEAMENTO VISUAL PREMIUM */}
      <div className="bg-white border border-slate-200 rounded-sm p-4 sm:p-6 shadow-xs relative overflow-hidden">
        {/* Header-Selector inside the Bracket Box */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              Chaveamento Tático Interativo
            </h2>
            <p className="text-slate-500 text-[10px] mt-0.5">
              Visualize conexões oficiais e altere quaisquer dados instantaneamente.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[9px] font-mono text-slate-400 uppercase font-black select-none hidden md:inline">Modo do Chaveamento:</span>
            <div className="flex bg-slate-50 p-1 border border-slate-200 rounded-xs w-full sm:w-auto text-xs font-black">
              <button
                type="button"
                onClick={() => setBracketView('compact')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xs uppercase tracking-tight transition-colors cursor-pointer ${
                  bracketView === 'compact'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Quartas à Final
              </button>
              <button
                type="button"
                onClick={() => setBracketView('expanded')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xs uppercase tracking-tight transition-colors cursor-pointer ${
                  bracketView === 'expanded'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Oitavas à Final
              </button>
              <button
                type="button"
                onClick={() => setBracketView('r32')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xs uppercase tracking-tight transition-colors cursor-pointer ${
                  bracketView === 'r32'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                32-avos à Final
              </button>
            </div>
          </div>
        </div>

        {/* Scroll helper */}
        <div className="sm:hidden mb-4 flex items-center justify-between bg-slate-50 p-2 border border-slate-100 rounded-xs text-[9px] font-mono">
          <span className="text-slate-400">DESLIZE O QUADRO PARA OS LADOS</span>
          <span className="text-blue-600 animate-pulse font-black">DESLIZE ➔</span>
        </div>

        {/* Bracket visual nodes layout flow */}
        <div className="overflow-x-auto scrollbar-none">
          {bracketView === 'compact' ? (
            /* COMPACT CONFIGURATION: Quartas, Semis e Final (Min-Width 720px) */
            <div className="flex items-center justify-between min-w-[700px] gap-2 py-3 pb-6 relative">
              
              {/* Coluna 1: Quartas (Esquerda) */}
              <div className="flex flex-col gap-14">
                <div className="space-y-6">
                  {renderBracketNode(97)}
                  {renderBracketNode(98)}
                </div>
              </div>

              <div className="text-emerald-500/50 animate-pulse"><ChevronRight /></div>

              {/* Coluna 2: Semifinal Esquerda */}
              <div className="flex flex-col justify-around h-full">
                {renderBracketNode(101)}
              </div>

              <div className="text-emerald-500/50 animate-pulse"><ChevronRight /></div>

              {/* Coluna 3: Grande Finalíssima */}
              <div className="flex flex-col justify-center items-center gap-6">
                <div className="bg-blue-600 text-white text-[9px] font-mono font-black uppercase px-3 py-1 rounded-sm shadow-md">
                  Grande Final • Nova York
                </div>
                {renderBracketNode(104)}
                <div className="bg-slate-50 border border-slate-200 text-slate-500 text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-sm">
                  Decisão de 3º Lugar:
                </div>
                {renderBracketNode(103)}
              </div>

              <div className="text-emerald-500/50 rotate-180 animate-pulse"><ChevronRight /></div>

              {/* Coluna 4: Semifinal Direita */}
              <div className="flex flex-col justify-around h-full">
                {renderBracketNode(102)}
              </div>

              <div className="text-emerald-500/50 rotate-180 animate-pulse"><ChevronRight /></div>

              {/* Coluna 5: Quartas (Direita) */}
              <div className="flex flex-col gap-14">
                <div className="space-y-6">
                  {renderBracketNode(99)}
                  {renderBracketNode(100)}
                </div>
              </div>

            </div>
          ) : bracketView === 'expanded' ? (
            /* EXPANDED CONFIGURATION: Oitavas, Quartas, Semis e Final (Min-Width 1100px) */
            <div className="flex items-center justify-between min-w-[1080px] gap-2 py-3 pb-6 relative">
              
              {/* Coluna 1: Oitavas (Esquerda) */}
              <div className="flex flex-col gap-8 justify-around h-[390px]">
                {renderBracketNode(89)}
                {renderBracketNode(90)}
                {renderBracketNode(91)}
                {renderBracketNode(92)}
              </div>

              <div className="text-emerald-500/30 font-bold"><ChevronRight className="h-4 w-4" /></div>

              {/* Coluna 2: Quartas (Esquerda) */}
              <div className="flex flex-col gap-16 justify-around h-[390px]">
                {renderBracketNode(97)}
                {renderBracketNode(98)}
              </div>

              <div className="text-emerald-500/30 font-bold"><ChevronRight className="h-4 w-4" /></div>

              {/* Coluna 3: Semifinal Esquerda */}
              <div className="flex flex-col justify-center h-[390px]">
                {renderBracketNode(101)}
              </div>

              <div className="text-emerald-500/35 animate-pulse font-bold"><ChevronRight className="h-5 w-5" /></div>

              {/* Coluna 4: Grande Finalíssima */}
              <div className="flex flex-col justify-center items-center gap-5 h-[390px]">
                <div className="bg-blue-600 text-white text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-sm shadow-md leading-none">
                  GRANDE FINAL • JOGO 104
                </div>
                {renderBracketNode(104)}
                <div className="bg-slate-50 border border-slate-200 text-slate-500 text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-sm">
                  3º LUGAR JOGO 103:
                </div>
                {renderBracketNode(103)}
              </div>

              <div className="text-emerald-500/35 animate-pulse font-bold rotate-180"><ChevronRight className="h-5 w-5" /></div>

              {/* Coluna 5: Semifinal Direita */}
              <div className="flex flex-col justify-center h-[390px]">
                {renderBracketNode(102)}
              </div>

              <div className="text-emerald-500/30 font-bold rotate-180"><ChevronRight className="h-4 w-4" /></div>

              {/* Coluna 6: Quartas (Direita) */}
              <div className="flex flex-col gap-16 justify-around h-[390px]">
                {renderBracketNode(99)}
                {renderBracketNode(100)}
              </div>

              <div className="text-emerald-500/30 font-bold rotate-180"><ChevronRight className="h-4 w-4" /></div>

              {/* Coluna 7: Oitavas (Direita) */}
              <div className="flex flex-col gap-8 justify-around h-[390px]">
                {renderBracketNode(93)}
                {renderBracketNode(94)}
                {renderBracketNode(95)}
                {renderBracketNode(96)}
              </div>

            </div>
          ) : (
            /* FULL R32 CONFIGURATION: 32-avos à Final (Min-Width 1440px) */
            <div className="flex items-center justify-between min-w-[1440px] gap-2 py-3 pb-6 relative">
              
              {/* Coluna 1: 32-avos (Esquerda) */}
              <div className="flex flex-col gap-1.5 justify-around h-[760px]">
                {renderBracketNode(73)}
                {renderBracketNode(74)}
                {renderBracketNode(75)}
                {renderBracketNode(76)}
                {renderBracketNode(77)}
                {renderBracketNode(78)}
                {renderBracketNode(79)}
                {renderBracketNode(80)}
              </div>

              <div className="text-emerald-500/20 font-bold text-xs"><ChevronRight className="h-3 w-3" /></div>

              {/* Coluna 2: Oitavas (Esquerda) */}
              <div className="flex flex-col gap-6 justify-around h-[760px]">
                {renderBracketNode(89)}
                {renderBracketNode(90)}
                {renderBracketNode(91)}
                {renderBracketNode(92)}
              </div>

              <div className="text-emerald-500/20 font-bold text-xs"><ChevronRight className="h-3 w-3" /></div>

              {/* Coluna 3: Quartas (Esquerda) */}
              <div className="flex flex-col gap-12 justify-around h-[760px]">
                {renderBracketNode(97)}
                {renderBracketNode(98)}
              </div>

              <div className="text-emerald-500/20 font-bold text-xs"><ChevronRight className="h-3 w-3" /></div>

              {/* Coluna 4: Semifinal Esquerda */}
              <div className="flex flex-col justify-center h-[760px]">
                {renderBracketNode(101)}
              </div>

              <div className="text-emerald-500/35 animate-pulse font-bold"><ChevronRight className="h-4 w-4" /></div>

              {/* Coluna 5: Grande Finalíssima */}
              <div className="flex flex-col justify-center items-center gap-5 h-[760px]">
                <div className="bg-blue-600 text-white text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-sm shadow-md leading-none">
                  GRANDE FINAL • JOGO 104
                </div>
                {renderBracketNode(104)}
                <div className="bg-slate-50 border border-slate-200 text-slate-500 text-[8.5px] font-mono font-black uppercase px-2 py-0.5 rounded-sm">
                  3º LUGAR JOGO 103:
                </div>
                {renderBracketNode(103)}
              </div>

              <div className="text-emerald-500/35 animate-pulse font-bold rotate-180"><ChevronRight className="h-4 w-4" /></div>

              {/* Coluna 6: Semifinal Direita */}
              <div className="flex flex-col justify-center h-[760px]">
                {renderBracketNode(102)}
              </div>

              <div className="text-emerald-500/20 font-bold text-xs rotate-180"><ChevronRight className="h-3 w-3" /></div>

              {/* Coluna 7: Quartas (Direita) */}
              <div className="flex flex-col gap-12 justify-around h-[760px]">
                {renderBracketNode(99)}
                {renderBracketNode(100)}
              </div>

              <div className="text-emerald-500/20 font-bold text-xs rotate-180"><ChevronRight className="h-3 w-3" /></div>

              {/* Coluna 8: Oitavas (Direita) */}
              <div className="flex flex-col gap-6 justify-around h-[760px]">
                {renderBracketNode(93)}
                {renderBracketNode(94)}
                {renderBracketNode(95)}
                {renderBracketNode(96)}
              </div>

              <div className="text-emerald-500/20 font-bold text-xs rotate-180"><ChevronRight className="h-3 w-3" /></div>

              {/* Coluna 9: 32-avos (Direita) */}
              <div className="flex flex-col gap-1.5 justify-around h-[760px]">
                {renderBracketNode(81)}
                {renderBracketNode(82)}
                {renderBracketNode(83)}
                {renderBracketNode(84)}
                {renderBracketNode(85)}
                {renderBracketNode(86)}
                {renderBracketNode(87)}
                {renderBracketNode(88)}
              </div>

            </div>
          )}
        </div>
      </div>

      {/* SECTION EXPORTADOR DE CHAVEAMENTO (BRACKET BOARD SHARE) */}
      <BracketBoardShare />

      {/* SECTION 3: SELETOR DE FASE E JOGOS EDITÁVEIS */}
      <div className="space-y-6">
        {/* Seletor de Abas de Playoffs */}
        <div className="flex flex-wrap border-b border-slate-200 gap-2 pb-2">
          {[
            { id: 'finals', label: 'Decisões (Semis e Finais)' },
            { id: 'quarter_finals', label: 'Quartas de Final (8 times)' },
            { id: 'round_of_16', label: 'Oitavas de Final (16 times)' },
            { id: 'round_of_32', label: '32-avos de Final (32 times)' },
            { id: 'all', label: 'Ver Todo o Playoffs' }
          ].map(tab => {
            const isSel = activeTab === tab.id;
            return (
              <button
                id={`playoff-tab-btn-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PlayoffTab)}
                className={`py-2.5 px-4 rounded-sm text-xs font-black uppercase tracking-widest transition-all cursor-pointer border ${
                  isSel
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Botão de Ação Rápida por Fase correspondente */}
        {activeTab !== 'all' && (
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-blue-600 font-mono text-[9px] uppercase tracking-widest font-black block">Controle da Fase Ativa</span>
              <p className="text-slate-800 text-xs font-bold uppercase tracking-tight mt-0.5">
                {activeTab === 'round_of_32' && '32-avos de Final (r32) • 16 Jogos'}
                {activeTab === 'round_of_16' && 'Oitavas de Final (r16) • 8 Jogos'}
                {activeTab === 'quarter_finals' && 'Quartas de Final • 4 Jogos'}
                {activeTab === 'finals' && 'Semifinais, Bronze e Grande Final'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {activeTab === 'round_of_32' && (
                <button
                  onClick={() => simulatePlayoffPhase('round_of_32')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-black text-[10px] uppercase rounded-xs tracking-wider cursor-pointer border-none"
                >
                  <Play className="h-3 w-3 fill-white" />
                  Simular 16-avos (R32)
                </button>
              )}
              {activeTab === 'round_of_16' && (
                <button
                  onClick={() => simulatePlayoffPhase('round_of_16')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-black text-[10px] uppercase rounded-xs tracking-wider cursor-pointer border-none"
                >
                  <Play className="h-3 w-3 fill-white" />
                  Simular Oitavas (R16)
                </button>
              )}
              {activeTab === 'quarter_finals' && (
                <button
                  onClick={() => simulatePlayoffPhase('quarter_finals')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-black text-[10px] uppercase rounded-xs tracking-wider cursor-pointer border-none"
                >
                  <Play className="h-3 w-3 fill-white" />
                  Simular Quartas
                </button>
              )}
              {activeTab === 'finals' && (
                <>
                  <button
                    onClick={() => simulatePlayoffPhase('semi_finals')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 border border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50 text-blue-600 font-mono font-black text-[10px] uppercase rounded-xs tracking-wider cursor-pointer"
                  >
                    <Play className="h-3 w-3" />
                    Simular Semis
                  </button>
                  <button
                    onClick={() => simulatePlayoffPhase('third_place')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-mono font-black text-[10px] uppercase rounded-xs tracking-wider cursor-pointer"
                  >
                    <Play className="h-3 w-3" />
                    Simular 3º Lugar
                  </button>
                  <button
                    onClick={() => simulatePlayoffPhase('final')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono font-black text-[10px] uppercase rounded-xs tracking-wider cursor-pointer border-none shadow-xs"
                  >
                    <Play className="h-3 w-3 fill-white" />
                    Simular Grande Final
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Lista de Partidas Selecionadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {getFilteredMatches().map(m => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </div>

      {/* QUICK FLOATING INSPECTOR MODAL */}
      {inspectorMatchId !== null && (
        <MatchInspectorModal
          matchId={inspectorMatchId}
          onClose={() => setInspectorMatchId(null)}
        />
      )}
    </div>
  );
};
