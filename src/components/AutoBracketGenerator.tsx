/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { TeamFlag } from './TeamFlag';
import { Trophy, Play, RotateCcw, Eye, HelpCircle, CheckCircle2, Lock, Flame, ChevronRight } from 'lucide-react';

export const AutoBracketGenerator: React.FC = () => {
  const {
    matches,
    simulateEntireCup,
    resetSimulator,
    setActiveTab,
    simulatePlayoffPhase
  } = useSimulator();

  // Filtrar partidas de mata-mata
  const roundOf32 = useMemo(() => matches.filter(m => m.phase === 'round_of_32'), [matches]);
  const roundOf16 = useMemo(() => matches.filter(m => m.phase === 'round_of_16'), [matches]);
  const quarterFinals = useMemo(() => matches.filter(m => m.phase === 'quarter_finals'), [matches]);
  const semiFinals = useMemo(() => matches.filter(m => m.phase === 'semi_finals'), [matches]);
  const thirdPlaceMatch = useMemo(() => matches.find(m => m.phase === 'third_place'), [matches]);
  const finalMatch = useMemo(() => matches.find(m => m.phase === 'final'), [matches]);

  // Contar partidas concluídas em cada fase
  const getPhaseStats = (phaseMatches: typeof matches) => {
    const total = phaseMatches.length;
    const completed = phaseMatches.filter(m => m.status === 'completed').length;
    return { total, completed, isDone: total > 0 && completed === total };
  };

  const stats32 = getPhaseStats(roundOf32);
  const stats16 = getPhaseStats(roundOf16);
  const stats8 = getPhaseStats(quarterFinals);
  const stats4 = getPhaseStats(semiFinals);
  
  const stats3rd = thirdPlaceMatch 
    ? { total: 1, completed: thirdPlaceMatch.status === 'completed' ? 1 : 0, isDone: thirdPlaceMatch.status === 'completed' }
    : { total: 0, completed: 0, isDone: false };

  const statsFinal = finalMatch 
    ? { total: 1, completed: finalMatch.status === 'completed' ? 1 : 0, isDone: finalMatch.status === 'completed' }
    : { total: 0, completed: 0, isDone: false };

  // Helpers de verificação de prontidão (quando os times estão definidos)
  const isPhaseReady = (phaseMatches: typeof matches) => {
    return phaseMatches.length > 0 && phaseMatches.some(m => m.team1Id && m.team2Id);
  };

  const ready32 = isPhaseReady(roundOf32);
  const ready16 = isPhaseReady(roundOf16);
  const ready8 = isPhaseReady(quarterFinals);
  const ready4 = isPhaseReady(semiFinals);
  const ready3rd = thirdPlaceMatch ? !!(thirdPlaceMatch.team1Id && thirdPlaceMatch.team2Id) : false;
  const readyFinal = finalMatch ? !!(finalMatch.team1Id && finalMatch.team2Id) : false;

  const getPhaseState = (isDone: boolean, ready: boolean) => {
    if (isDone) return 'completed';
    if (ready) return 'ready';
    return 'locked';
  };

  const championTeam = finalMatch && finalMatch.status === 'completed' && finalMatch.winnerId
    ? TEAMS.find(t => t.id === finalMatch.winnerId)
    : null;

  return (
    <div className="bg-white border border-slate-300 rounded-none p-6 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-display font-black text-slate-950 uppercase tracking-tighter flex items-center gap-2">
            <Trophy className="h-4.5 w-4.5 text-slate-950 fill-amber-400" />
            CONTROLE DO CHAVEAMENTO DE PLAYOFFS
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium uppercase tracking-wide">
            Simule o mata-mata passo-a-passo fase por fase, ou rode toda a simulação final de uma única vez.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <button
            id="simulation-bracket-run-btn"
            onClick={simulateEntireCup}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-3.5 bg-slate-955 hover:bg-slate-800 text-white font-display font-bold text-[10px] rounded-none cursor-pointer tracking-widest uppercase transition-all"
          >
            <Play className="h-3 w-3 fill-white text-white" />
            SIMULAR TODO O PLAYOFFS
          </button>
          
          <button
            id="simulation-bracket-reset-btn"
            onClick={resetSimulator}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 bg-white font-display font-bold text-[10px] rounded-none cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            RESETAR CHAVE
          </button>
        </div>
      </div>

      {/* Caixa do Campeão se finalizado */}
      {championTeam && (
        <div id="bracket-champion-banner" className="bg-[#f0fdf4] border border-emerald-300 p-5 rounded-none flex items-center justify-between flex-wrap gap-4 animate-scaleUp">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-slate-955 text-white rounded-none">
              <Trophy className="h-5 w-5 text-amber-450 fill-amber-450" />
            </div>
            <div>
              <span className="text-[9px] font-display font-bold text-emerald-800 uppercase tracking-widest block font-sans">Campeão da Simulação</span>
              <h3 className="text-base font-display font-black text-slate-955 uppercase tracking-tight flex items-center gap-2 mt-0.5">
                <TeamFlag code={championTeam.code} name={championTeam.name} size="sm" />
                {championTeam.name}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('playoffs')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-955 hover:bg-slate-800 text-white font-display font-bold text-[9px] uppercase rounded-none tracking-widest cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
            VER CHAVEAMENTO DETALHADO
          </button>
        </div>
      )}

      {/* Grid de status das Fases com simulação Passo-a-Passo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Fase 1: 16-avos */}
        {(() => {
          const state = getPhaseState(stats32.isDone, ready32);
          return (
            <div className={`p-4 rounded-none border flex flex-col justify-between min-h-[155px] transition-all duration-300 ${
              state === 'completed' ? 'bg-[#f0fdf4]/50 border-emerald-300 text-emerald-900 shadow-xs' :
              state === 'ready' ? 'bg-amber-50/50 border-amber-300 text-amber-900 shadow-xs' :
              'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider block">16-Avos (R32)</span>
                  {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  {state === 'ready' && <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                </div>
                <span className="text-xl font-display font-black text-slate-950">{stats32.completed} <span className="text-xs text-slate-400 font-normal">/ 16</span></span>
                <span className="text-[8px] font-display font-bold block text-slate-400 uppercase mt-1 tracking-widest">Jogos Concluídos</span>
              </div>
              <button
                id="sim-r32-btn"
                disabled={state === 'locked'}
                onClick={() => simulatePlayoffPhase('round_of_32')}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 font-display font-bold text-[9px] uppercase tracking-wider rounded-none border transition-all ${
                  state === 'locked'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-955 border-slate-300 hover:border-slate-955 cursor-pointer shadow-xs'
                }`}
              >
                <Play className="h-2 w-2" />
                {stats32.isDone ? 'Re-simular' : 'Simular'}
              </button>
            </div>
          );
        })()}

        {/* Fase 2: Oitavas */}
        {(() => {
          const state = getPhaseState(stats16.isDone, ready16);
          return (
            <div className={`p-4 rounded-none border flex flex-col justify-between min-h-[155px] transition-all duration-300 ${
              state === 'completed' ? 'bg-[#f0fdf4]/50 border-emerald-300 text-emerald-950 shadow-xs' :
              state === 'ready' ? 'bg-amber-50/50 border-amber-300 text-amber-900 shadow-xs' :
              'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider block">Oitavas (R16)</span>
                  {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  {state === 'ready' && <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                </div>
                <span className="text-xl font-display font-black text-slate-955">{stats16.completed} <span className="text-xs text-slate-400 font-normal">/ 8</span></span>
                <span className="text-[8px] font-display font-bold block text-slate-400 uppercase mt-1 tracking-widest">Jogos Concluídos</span>
              </div>
              <button
                id="sim-r16-btn"
                disabled={state === 'locked'}
                onClick={() => simulatePlayoffPhase('round_of_16')}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 font-display font-bold text-[9px] uppercase tracking-wider rounded-none border transition-all ${
                  state === 'locked'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-955 border-slate-300 hover:border-slate-955 cursor-pointer shadow-xs'
                }`}
              >
                <Play className="h-2 w-2" />
                {stats16.isDone ? 'Re-simular' : 'Simular'}
              </button>
            </div>
          );
        })()}

        {/* Fase 3: Quartas */}
        {(() => {
          const state = getPhaseState(stats8.isDone, ready8);
          return (
            <div className={`p-4 rounded-none border flex flex-col justify-between min-h-[155px] transition-all duration-300 ${
              state === 'completed' ? 'bg-[#f0fdf4]/50 border-emerald-300 text-emerald-900 shadow-xs' :
              state === 'ready' ? 'bg-amber-50/50 border-amber-300 text-amber-900 shadow-xs' :
              'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider block">Quartas</span>
                  {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  {state === 'ready' && <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                </div>
                <span className="text-xl font-display font-black text-slate-955">{stats8.completed} <span className="text-xs text-slate-400 font-normal">/ 4</span></span>
                <span className="text-[8px] font-display font-bold block text-slate-400 uppercase mt-1 tracking-widest">Jogos Concluídos</span>
              </div>
              <button
                id="sim-qf-btn"
                disabled={state === 'locked'}
                onClick={() => simulatePlayoffPhase('quarter_finals')}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 font-display font-bold text-[9px] uppercase tracking-wider rounded-none border transition-all ${
                  state === 'locked'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-955 border-slate-300 hover:border-slate-955 cursor-pointer shadow-xs'
                }`}
              >
                <Play className="h-2 w-2" />
                {stats8.isDone ? 'Re-simular' : 'Simular'}
              </button>
            </div>
          );
        })()}

        {/* Fase 4: Semifinais */}
        {(() => {
          const state = getPhaseState(stats4.isDone, ready4);
          return (
            <div className={`p-4 rounded-none border flex flex-col justify-between min-h-[155px] transition-all duration-300 ${
              state === 'completed' ? 'bg-[#f0fdf4]/50 border-emerald-300 text-emerald-955 shadow-xs' :
              state === 'ready' ? 'bg-amber-50/40 border-amber-300 text-amber-900 shadow-xs' :
              'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider block">Semifinais</span>
                  {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  {state === 'ready' && <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                </div>
                <span className="text-xl font-display font-black text-slate-955">{stats4.completed} <span className="text-xs text-slate-400 font-normal">/ 2</span></span>
                <span className="text-[8px] font-display font-bold block text-slate-400 uppercase mt-1 tracking-widest">Jogos Concluídos</span>
              </div>
              <button
                id="sim-sf-btn"
                disabled={state === 'locked'}
                onClick={() => simulatePlayoffPhase('semi_finals')}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 font-display font-bold text-[9px] uppercase tracking-wider rounded-none border transition-all ${
                  state === 'locked'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-955 border-slate-300 hover:border-slate-955 cursor-pointer shadow-xs'
                }`}
              >
                <Play className="h-2 w-2" />
                {stats4.isDone ? 'Re-simular' : 'Simular'}
              </button>
            </div>
          );
        })()}

        {/* Fase 5: Disputa do 3º Lugar */}
        {(() => {
          const state = getPhaseState(stats3rd.isDone, ready3rd);
          return (
            <div className={`p-4 rounded-none border flex flex-col justify-between min-h-[155px] transition-all duration-300 ${
              state === 'completed' ? 'bg-[#f0fdf4]/50 border-emerald-300 text-emerald-955 shadow-xs' :
              state === 'ready' ? 'bg-amber-50/40 border-amber-300 text-amber-900 shadow-xs' :
              'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider block">Disputa 3º</span>
                  {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  {state === 'ready' && <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                </div>
                <span className="text-xl font-display font-black text-slate-955">{stats3rd.completed} <span className="text-xs text-slate-400 font-normal">/ 1</span></span>
                <span className="text-[8px] font-display font-bold block text-slate-400 uppercase mt-1 tracking-widest">Jogo de 3º Lugar</span>
              </div>
              <button
                id="sim-3rd-btn"
                disabled={state === 'locked'}
                onClick={() => simulatePlayoffPhase('third_place')}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 font-display font-bold text-[9px] uppercase tracking-wider rounded-none border transition-all ${
                  state === 'locked'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-955 border-slate-300 hover:border-slate-955 cursor-pointer shadow-xs'
                }`}
              >
                <Play className="h-2 w-2" />
                {stats3rd.isDone ? 'Re-simular' : 'Simular 3º'}
              </button>
            </div>
          );
        })()}

        {/* Fase 6: Final */}
        {(() => {
          const state = getPhaseState(statsFinal.isDone, readyFinal);
          return (
            <div className={`p-4 rounded-none border flex flex-col justify-between min-h-[155px] transition-all duration-300 ${
              state === 'completed' ? 'bg-[#f0fdf4]/50 border-emerald-300 text-emerald-905 shadow-xs' :
              state === 'ready' ? 'bg-amber-50/40 border-amber-300 text-amber-900 shadow-xs' :
              'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}>
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-display font-bold uppercase tracking-wider block">Ouro (Final)</span>
                  {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />}
                  {state === 'ready' && <Flame className="h-3.5 w-3.5 text-amber-500 shrink-0" />}
                  {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-300 shrink-0" />}
                </div>
                <span className="text-xl font-display font-black text-slate-95b">{statsFinal.completed} <span className="text-xs text-slate-400 font-normal">/ 1</span></span>
                <span className="text-[8px] font-display font-bold block text-slate-400 uppercase mt-1 tracking-widest">Grande Finalíssima</span>
              </div>
              <button
                id="sim-final-btn"
                disabled={state === 'locked'}
                onClick={() => simulatePlayoffPhase('final')}
                className={`mt-4 w-full flex items-center justify-center gap-1.5 py-2 font-display font-bold text-[9px] uppercase tracking-wider rounded-none border transition-all ${
                  state === 'locked'
                    ? 'bg-slate-100/50 border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-slate-50 text-slate-955 border-slate-300 hover:border-slate-955 cursor-pointer shadow-xs'
                }`}
              >
                <Play className="h-2 w-2" />
                {statsFinal.isDone ? 'Re-simular' : 'Simular Final'}
              </button>
            </div>
          );
        })()}

      </div>

      {/* Caixa informativa footer */}
      <div className="text-center font-display text-[9px] font-bold text-slate-500 uppercase border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-center items-center gap-1.5 sm:gap-4 tracking-wider">
        <span>💡 Use os botões individuais acima para ver os confrontos se desdobrando rodada por rodada!</span>
        <button
          onClick={() => setActiveTab('playoffs')}
          className="text-slate-955 hover:underline cursor-pointer inline-flex items-center gap-1 transition-all"
        >
          VER CHAVEAMENTO COMPLETO <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
