/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { TeamFlag } from './TeamFlag';
import { GoalScorer } from '../types';
import { WORLD_PLAYERS } from '../pages/UltimateTeam';
import { 
  X, RotateCcw, Play, Check, Plus, Minus, Trash2,
  MapPin, Calendar, Clock, Sparkles, AlertTriangle 
} from 'lucide-react';

interface MatchInspectorModalProps {
  matchId: number;
  onClose: () => void;
}

export const MatchInspectorModal: React.FC<MatchInspectorModalProps> = ({ matchId, onClose }) => {
  const { matches, updateMatchScore, simulateSingleMatch, simulatePlayoffPhase } = useSimulator();

  const match = matches.find(m => m.id === matchId);

  if (!match) return null;

  const team1 = TEAMS.find(t => t.id === match.team1Id);
  const team2 = TEAMS.find(t => t.id === match.team2Id);

  // Local state for inputs
  const [score1, setScore1] = useState<string>(match.team1Score !== undefined ? match.team1Score.toString() : '');
  const [score2, setScore2] = useState<string>(match.team2Score !== undefined ? match.team2Score.toString() : '');
  const [penScore1, setPenScore1] = useState<string>(match.team1PenScore !== undefined ? match.team1PenScore.toString() : '');
  const [penScore2, setPenScore2] = useState<string>(match.team2PenScore !== undefined ? match.team2PenScore.toString() : '');
  const [penWinnerId, setPenWinnerId] = useState<string>(match.winnerId || '');
  const [scorers, setScorers] = useState<GoalScorer[]>(match.scorers || []);

  const [isSimulating, setIsSimulating] = useState(false);

  // Lineup features for specific teams from Semifinals on
  const ALLOWED_LINEUP_TEAMS = ['Argentina', 'Espanha', 'França', 'Inglaterra', 'Portugal', 'Brasil', 'Holanda', 'Marrocos'];
  const isPlayoffEligibleForLineups = ['semi_finals', 'third_place', 'final'].includes(match.phase);
  const isTeam1Eligible = team1 && ALLOWED_LINEUP_TEAMS.includes(team1.name);
  const isTeam2Eligible = team2 && ALLOWED_LINEUP_TEAMS.includes(team2.name);
  const showLineupTab = isPlayoffEligibleForLineups && (isTeam1Eligible || isTeam2Eligible);

  const [activeTabPanel, setActiveTabPanel] = useState<'match' | 'lineups'>('match');

  const [lineup1, setLineup1] = useState<string[]>(() => {
    const tId = team1?.id;
    if (!tId) return [];
    const stored = localStorage.getItem(`wc_lineup_${tId}`);
    return stored ? JSON.parse(stored) : [];
  });
  const [lineup2, setLineup2] = useState<string[]>(() => {
    const tId = team2?.id;
    if (!tId) return [];
    const stored = localStorage.getItem(`wc_lineup_${tId}`);
    return stored ? JSON.parse(stored) : [];
  });

  const togglePlayerLineup = (teamId: string, playerId: string) => {
    if (teamId === team1?.id) {
      setLineup1(prev => {
        const next = prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId];
        localStorage.setItem(`wc_lineup_${team1?.id}`, JSON.stringify(next));
        return next;
      });
    } else {
      setLineup2(prev => {
        const next = prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId];
        localStorage.setItem(`wc_lineup_${team2?.id}`, JSON.stringify(next));
        return next;
      });
    }
  };

  // Sync state if match updates from outside simulation
  useEffect(() => {
    setScore1(match.team1Score !== undefined ? match.team1Score.toString() : '');
    setScore2(match.team2Score !== undefined ? match.team2Score.toString() : '');
    setPenScore1(match.team1PenScore !== undefined ? match.team1PenScore.toString() : '');
    setPenScore2(match.team2PenScore !== undefined ? match.team2PenScore.toString() : '');
    setPenWinnerId(match.winnerId || '');
    setScorers(match.scorers || []);
    
    const tId1 = team1?.id;
    if (tId1) {
      const stored = localStorage.getItem(`wc_lineup_${tId1}`);
      setLineup1(stored ? JSON.parse(stored) : []);
    }
    const tId2 = team2?.id;
    if (tId2) {
      const stored = localStorage.getItem(`wc_lineup_${tId2}`);
      setLineup2(stored ? JSON.parse(stored) : []);
    }
  }, [match]);

  const isTiedPlayoff = score1 !== '' && score2 !== '' && score1 === score2;

  // Calculo de Odds dinâmicas
  const rating1 = team1?.rating || 75;
  const rating2 = team2?.rating || 75;
  const ratingDiff = rating1 - rating2;

  // Sem empate no mata-mata final
  const shift = Math.max(-42, Math.min(42, ratingDiff * 2.0));
  const odds1 = Math.round(50 + shift);
  const odds2 = 100 - odds1;

  // Aumentar / Diminuir scores facilmente via botões
  const adjustScore = (slot: 1 | 2, amount: number) => {
    if (slot === 1) {
      const current = score1 === '' ? 0 : parseInt(score1);
      const next = Math.max(0, current + amount);
      setScore1(next.toString());
    } else {
      const current = score2 === '' ? 0 : parseInt(score2);
      const next = Math.max(0, current + amount);
      setScore2(next.toString());
    }
  };

  const adjustPenScore = (slot: 1 | 2, amount: number) => {
    if (slot === 1) {
      const current = penScore1 === '' ? 5 : parseInt(penScore1);
      const next = Math.max(0, current + amount);
      setPenScore1(next.toString());
    } else {
      const current = penScore2 === '' ? 4 : parseInt(penScore2);
      const next = Math.max(0, current + amount);
      setPenScore2(next.toString());
    }
  };

  // Simular match individual com efeito de carregamento premium
  const handleInstantSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      simulateSingleMatch(match.id);
      setIsSimulating(false);
    }, 450);
  };

  const handleReset = () => {
    setScore1('');
    setScore2('');
    setPenScore1('');
    setPenScore2('');
    setPenWinnerId('');
    setScorers([]);
    updateMatchScore(match.id, undefined, undefined, undefined, undefined, undefined, []);
  };

  const handleSave = () => {
    if (score1 === '' || score2 === '') {
      updateMatchScore(match.id, undefined, undefined, undefined, undefined, undefined, []);
      onClose();
      return;
    }

    const s1 = parseInt(score1);
    const s2 = parseInt(score2);
    if (isNaN(s1) || isNaN(s2)) return;

    if (s1 === s2) {
      const p1 = parseInt(penScore1);
      const p2 = parseInt(penScore2);

      const p1Def = isNaN(p1) ? 5 : p1;
      const p2Def = isNaN(p2) ? 4 : p2;
      
      let winner = penWinnerId;
      if (isNaN(p1) || isNaN(p2) || p1 === p2) {
        winner = winner || match.team1Id || '';
      } else {
        winner = p1 > p2 ? (match.team1Id || '') : (match.team2Id || '');
      }
      updateMatchScore(match.id, s1, s2, p1Def, p2Def, winner, scorers);
    } else {
      const winner = s1 > s2 ? match.team1Id : match.team2Id;
      updateMatchScore(match.id, s1, s2, undefined, undefined, winner, scorers);
    }
    onClose();
  };

  // Encontrar o placeholder educativo caso os times não estejam definidos
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
        if (id === 73) return "3º Colocado (1)";
        if (id === 74) return "3º Colocado (2)";
        if (id === 75) return "3º Colocado (3)";
        if (id === 76) return "3º Colocado (4)";
        if (id === 77) return "3º Colocado (5)";
        if (id === 78) return "3º Colocado (6)";
        if (id === 79) return "3º Colocado (7)";
        if (id === 80) return "3º Colocado (8)";
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
    if (id === 89) return slot === 1 ? "Venc. Jogo 73" : "Venc. Jogo 74";
    if (id === 90) return slot === 1 ? "Venc. Jogo 75" : "Venc. Jogo 76";
    if (id === 91) return slot === 1 ? "Venc. Jogo 77" : "Venc. Jogo 78";
    if (id === 92) return slot === 1 ? "Venc. Jogo 79" : "Venc. Jogo 80";
    if (id === 93) return slot === 1 ? "Venc. Jogo 81" : "Venc. Jogo 82";
    if (id === 94) return slot === 1 ? "Venc. Jogo 83" : "Venc. Jogo 84";
    if (id === 95) return slot === 1 ? "Venc. Jogo 85" : "Venc. Jogo 86";
    if (id === 96) return slot === 1 ? "Venc. Jogo 87" : "Venc. Jogo 88";
    
    if (id === 97) return slot === 1 ? "Venc. Jogo 89" : "Venc. Jogo 90";
    if (id === 98) return slot === 1 ? "Venc. Jogo 91" : "Venc. Jogo 92";
    if (id === 99) return slot === 1 ? "Venc. Jogo 93" : "Venc. Jogo 94";
    if (id === 100) return slot === 1 ? "Venc. Jogo 95" : "Venc. Jogo 96";
    
    if (id === 101) return slot === 1 ? "Venc. Jogo 97" : "Venc. Jogo 98";
    if (id === 102) return slot === 1 ? "Venc. Jogo 99" : "Venc. Jogo 100";
    
    if (id === 103) return slot === 1 ? "Perd. Jogo 101" : "Perd. Jogo 102";
    if (id === 104) return slot === 1 ? "Venc. Jogo 101" : "Venc. Jogo 102";
    return "A definir";
  };

  const isPendingTeams = !match.team1Id || !match.team2Id;

  const getPhaseName = (ph: string) => {
    switch (ph) {
      case 'round_of_32': return '32-avos de Final';
      case 'round_of_16': return 'Oitavas de Final';
      case 'quarter_finals': return 'Quartas de Final';
      case 'semi_finals': return 'Semifinal';
      case 'third_place': return 'Decisão do 3º Lugar';
      case 'final': return 'Grande Final';
      default: return 'Playoffs';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-slate-900 border-2 border-white/10 rounded-sm shadow-2xl relative overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-sm">
              Confronto {match.id} • {getPhaseName(match.phase)}
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
              <Calendar className="h-3.5 w-3.5 text-slate-500" />
              <span>{match.date.split('-')[2]}/{match.date.split('-')[1]} • {match.time}</span>
              <span className="text-slate-600">|</span>
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span className="truncate max-w-[150px]">{match.city}</span>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[80vh] relative z-10 scrollbar-none">
          {isPendingTeams ? (
            /* Educational screen for pending teams */
            <div className="bg-slate-950/40 border border-white/5 rounded-xs p-5 text-center space-y-4">
              <div className="mx-auto w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Times não definidos</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Este slot de mata-mata será preenchido automaticamente com os classificados das fases anteriores.
                </p>
              </div>

              <div className="border-t border-white/5 pt-3 mt-1 space-y-2 text-left max-w-xs mx-auto">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-mono">Time Mandante:</span>
                  <span className="text-emerald-400 font-black uppercase tracking-tight">{getSlotPlaceholder(match.id, 1)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] border-t border-white/5 pt-2">
                  <span className="text-slate-500 font-mono">Time Visitante:</span>
                  <span className="text-emerald-400 font-black uppercase tracking-tight">{getSlotPlaceholder(match.id, 2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  simulatePlayoffPhase(match.phase === 'final' || match.phase === 'third_place' ? 'semi_finals' : match.phase);
                }}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black text-xs uppercase tracking-widest rounded-sm cursor-pointer transition-all shadow-lg shadow-emerald-500/15"
              >
                Simular Fase Anterior
              </button>
            </div>
          ) : (
            /* Real simulator inputs interface */
            <>
              {showLineupTab && (
                <div className="flex border border-white/10 p-0.5 rounded-sm bg-slate-950 mb-4 sticky top-0 z-20">
                  <button
                    type="button"
                    onClick={() => setActiveTabPanel('match')}
                    className={`flex-1 py-1.5 text-[10px] font-mono uppercase font-black tracking-wider transition-all cursor-pointer rounded-xs ${
                      activeTabPanel === 'match'
                        ? 'bg-slate-900 border border-white/5 text-emerald-400 shadow-md font-bold'
                        : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    Placar e Gols
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTabPanel('lineups')}
                    className={`flex-1 py-1.5 text-[10px] font-mono uppercase font-black tracking-wider transition-all cursor-pointer rounded-xs ${
                      activeTabPanel === 'lineups'
                        ? 'bg-slate-900 border border-white/5 text-emerald-400 shadow-md font-bold'
                        : 'text-slate-500 hover:text-white'
                    }`}
                  >
                    Escalação Tática
                  </button>
                </div>
              )}

              {activeTabPanel === 'match' ? (
                <div className="space-y-4 animate-fadeIn">
                  {/* CLASH PROBABILITIES BAR */}
                  <div className="bg-slate-950/70 border border-white/5 rounded-xs p-3 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider font-extrabold uppercase">
                  <span className="text-emerald-400">{team1?.name}: {odds1}%</span>
                  <span className="text-sky-400">{team2?.name}: {odds2}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div style={{ width: `${odds1}%` }} className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" />
                  <div style={{ width: `${odds2}%` }} className="h-full bg-gradient-to-r from-sky-450 to-sky-400 transition-all duration-500" />
                </div>
                <div className="text-[9px] text-slate-450 text-center font-mono leading-none pt-0.5">
                  Probabilidades estatísticas com base na força das seleções ({team1?.rating} vs {team2?.rating})
                </div>
              </div>

              {/* CORE TEAM VS CARD AND SCORE ENGINES */}
              <div className="grid grid-cols-12 gap-1 items-center bg-slate-950/40 p-4 border border-white/5 rounded-sm">
                
                {/* Team 1 Side Button */}
                <div className="col-span-12 sm:col-span-4 flex flex-col items-center text-center space-y-2 order-1 sm:order-none">
                  <TeamFlag code={team1?.code || ''} name={team1?.name} size="md" className="shadow-lg" />
                  <div>
                    <span className="text-white font-black text-sm uppercase block truncate w-32 tracking-tight leading-none mb-1">
                      {team1?.name}
                    </span>
                    <span className="text-[9px] font-mono bg-slate-900 border border-white/5 text-slate-400 px-2 py-0.5 rounded-sm uppercase font-bold">
                      FORÇA: <strong className="text-emerald-400">{team1?.rating}</strong>
                    </span>
                  </div>
                </div>

                {/* Score Controls 1 */}
                <div className="col-span-5 sm:col-span-2 flex items-center justify-center gap-1 order-3 sm:order-none">
                  <button
                    type="button"
                    onClick={() => adjustScore(1, -1)}
                    className="w-7 h-7 bg-slate-950 hover:bg-slate-800 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-extrabold cursor-pointer"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={score1}
                    onChange={(e) => setScore1(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="0"
                    className="w-10 h-10 bg-slate-950 border-2 border-white/10 rounded-sm text-center text-white font-black focus:outline-none focus:border-emerald-500 text-lg shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => adjustScore(1, 1)}
                    className="w-7 h-7 bg-slate-950 hover:bg-slate-800 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-extrabold cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* VS divider */}
                <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center font-black italic text-slate-650 text-xs order-2 sm:order-none uppercase">
                  <span>VS</span>
                </div>

                {/* Score Controls 2 */}
                <div className="col-span-5 sm:col-span-2 flex items-center justify-center gap-1 order-4 sm:order-none">
                  <button
                    type="button"
                    onClick={() => adjustScore(2, -1)}
                    className="w-7 h-7 bg-slate-950 hover:bg-slate-800 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-extrabold cursor-pointer"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <input
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={score2}
                    onChange={(e) => setScore2(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="0"
                    className="w-10 h-10 bg-slate-950 border-2 border-white/10 rounded-sm text-center text-white font-black focus:outline-none focus:border-emerald-500 text-lg shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => adjustScore(2, 1)}
                    className="w-7 h-7 bg-slate-950 hover:bg-slate-800 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-extrabold cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Team 2 Side Button */}
                <div className="col-span-12 sm:col-span-4 flex flex-col items-center text-center space-y-2 order-5 sm:order-none mt-3 sm:mt-0">
                  <TeamFlag code={team2?.code || ''} name={team2?.name} size="md" className="shadow-lg" />
                  <div>
                    <span className="text-white font-black text-sm uppercase block truncate w-32 tracking-tight leading-none mb-1">
                      {team2?.name}
                    </span>
                    <span className="text-[9px] font-mono bg-slate-900 border border-white/5 text-slate-400 px-2 py-0.5 rounded-sm uppercase font-bold">
                      FORÇA: <strong className="text-emerald-400">{team2?.rating}</strong>
                    </span>
                  </div>
                </div>

              </div>

              {/* DECISÃO EM PÊNALTIS (IF TIED) */}
              {isTiedPlayoff && (
                <div className="bg-slate-950/60 p-4 border-2 border-emerald-500/20 rounded-sm space-y-3 animate-fadeIn">
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-400 font-mono font-black tracking-[0.2em] block uppercase italic leading-none">
                      ⚠️ EMPATE DETECTADO • DECISÃO POR PÊNALTIS
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-1">
                      É necessário definir o vencedor dos pênaltis para avançar na chave!
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-4 py-1">
                    {/* PK 1 */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono font-extrabold">{team1?.code}</span>
                      <button
                        type="button"
                        onClick={() => adjustPenScore(1, -1)}
                        className="w-6 h-6 bg-slate-900 hover:bg-slate-850 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-black cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={penScore1}
                        onChange={(e) => setPenScore1(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="5"
                        className="w-8 h-8 bg-slate-900 border-2 border-white/10 rounded-sm text-center text-white text-xs font-black focus:outline-none focus:border-emerald-500 shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => adjustPenScore(1, 1)}
                        className="w-6 h-6 bg-slate-900 hover:bg-slate-850 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-black cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-600 font-mono font-black italic">PK</span>

                    {/* PK 2 */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => adjustPenScore(2, -1)}
                        className="w-6 h-6 bg-slate-900 hover:bg-slate-850 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-black cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        value={penScore2}
                        onChange={(e) => setPenScore2(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="4"
                        className="w-8 h-8 bg-slate-900 border-2 border-white/10 rounded-sm text-center text-white text-xs font-black focus:outline-none focus:border-emerald-500 shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => adjustPenScore(2, 1)}
                        className="w-6 h-6 bg-slate-900 hover:bg-slate-850 border border-white/10 rounded-xs text-slate-400 hover:text-white flex items-center justify-center font-black cursor-pointer"
                      >
                        +
                      </button>
                      <span className="text-xs text-slate-400 font-mono font-extrabold">{team2?.code}</span>
                    </div>
                  </div>

                  {/* Vencedor Selecionado Manualmente em caso de dízima ou valor customizado */}
                  <div className="flex justify-center gap-2 border-t border-white/5 pt-3">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mr-1 self-center">Definir ganhador:</span>
                    <button
                      type="button"
                      onClick={() => setPenWinnerId(team1?.id || '')}
                      className={`px-3 py-1 text-[10px] font-mono uppercase font-black tracking-tight rounded-xs border transition-all cursor-pointer ${
                        penWinnerId === team1?.id
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {team1?.name}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPenWinnerId(team2?.id || '')}
                      className={`px-3 py-1 text-[10px] font-mono uppercase font-black tracking-tight rounded-xs border transition-all cursor-pointer ${
                        penWinnerId === team2?.id
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {team2?.name}
                    </button>
                  </div>
                </div>
              )}

              {/* PLAYER OF THE MATCH (MOTM) BANNER */}
              {match.status === 'completed' && match.motm && (
                <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 rounded-md p-4 space-y-3 animate-fadeIn relative overflow-hidden">
                  {/* Decorative background glow */}
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] uppercase tracking-widest font-extrabold">
                      <Sparkles className="h-4 w-4 animate-pulse text-amber-400" />
                      <span>Man of the Match • Homem do Jogo</span>
                    </div>
                    <span className="text-[12px] bg-amber-500/20 text-yellow-400 border border-yellow-500/35 px-2.5 py-0.5 rounded-full font-mono font-black">
                      ★ {match.motm.rating} Nota
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 pt-1">
                    {/* Dynamic Player Badge */}
                    <div className="h-12 w-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex flex-col items-center justify-center font-black text-slate-950 shadow-md shrink-0">
                      <span className="text-[10px] uppercase tracking-tighter leading-none opacity-80">MOTM</span>
                    </div>

                    <div className="space-y-0.5 min-w-0 flex-1">
                      <h4 className="text-sm font-black text-white uppercase tracking-wide truncate">
                        {match.motm.playerName.toUpperCase()}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1 bg-slate-950/50 px-2 py-0.5 rounded-sm">
                          {TEAMS.find(t => t.id === match.motm?.teamId)?.emoji} {TEAMS.find(t => t.id === match.motm?.teamId)?.name}
                        </span>
                        <div className="flex gap-2">
                          {match.motm.goals > 0 && <span className="text-emerald-400 font-bold">{match.motm.goals} Gols</span>}
                          {match.motm.assists > 0 && <span className="text-sky-450 font-bold">{match.motm.assists} Assist.</span>}
                          {match.motm.saves !== undefined && match.motm.saves > 0 && <span className="text-cyan-400 font-bold">{match.motm.saves} Defesas</span>}
                          {match.motm.tackles !== undefined && match.motm.tackles > 0 && <span className="text-teal-400 font-bold">{match.motm.tackles} Desarmes</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11.5px] text-slate-300 italic leading-relaxed border-t border-white/5 pt-2.5">
                    "{match.motm.impactDescription}"
                  </p>
                </div>
              )}

              {/* GOAL SCORERS INPUT (FROM ROUND OF 32 ONWARDS) */}
              {match.phase !== 'group' && (
                <div id="scorers-panel" className="bg-slate-900 border border-white/5 rounded-md p-4 space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <h3 className="text-xs font-mono font-black uppercase text-slate-300 tracking-wider">
                      Autores dos Gols • Simulação Manual
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Team 1 Scorers */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          Gols de {team1?.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setScorers(prev => [...prev, { playerName: '', teamId: team1?.id || '', minute: undefined }]);
                          }}
                          className="px-2 py-1 bg-slate-950 hover:bg-slate-800 text-[10px] text-emerald-450 border border-white/10 rounded-xs font-bold cursor-pointer"
                        >
                          + Adicionar
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {scorers.filter(s => s.teamId === team1?.id).map((s, idx) => {
                          const teamPlayers = WORLD_PLAYERS.filter(p => p.country === team1?.name);
                          const actualIdx = scorers.indexOf(s);
                          return (
                            <div key={idx} className="flex gap-1 items-center bg-slate-950 p-1.5 rounded-sm border border-white/5">
                              <select
                                value={s.playerName}
                                onChange={(e) => {
                                  const updated = [...scorers];
                                  if (actualIdx !== -1) {
                                    updated[actualIdx].playerName = e.target.value;
                                    setScorers(updated);
                                  }
                                }}
                                className="flex-1 bg-slate-900 text-white border border-white/15 px-1 py-0.5 rounded-xs text-[11px] font-sans h-8"
                              >
                                <option value="">-- Selecionar --</option>
                                {teamPlayers.map(p => (
                                  <option key={p.id} value={p.name}>{p.name} ({p.role})</option>
                                ))}
                                <option value="Custom">+ Customizado...</option>
                              </select>

                              {(s.playerName === 'Custom' || (!teamPlayers.some(p => p.name === s.playerName) && s.playerName !== '')) && (
                                <input
                                  type="text"
                                  placeholder="Nome"
                                  value={s.playerName === 'Custom' ? '' : s.playerName}
                                  onChange={(e) => {
                                    const updated = [...scorers];
                                    if (actualIdx !== -1) {
                                      updated[actualIdx].playerName = e.target.value;
                                      setScorers(updated);
                                    }
                                  }}
                                  className="w-24 bg-slate-900 text-white border border-white/15 px-1 py-0.5 rounded-xs text-[11px] font-sans h-8 box-border"
                                />
                              )}

                              <input
                                type="number"
                                placeholder="Min"
                                value={s.minute || ''}
                                onChange={(e) => {
                                  const updated = [...scorers];
                                  if (actualIdx !== -1) {
                                    updated[actualIdx].minute = e.target.value ? parseInt(e.target.value) : undefined;
                                    setScorers(updated);
                                  }
                                }}
                                className="w-12 bg-slate-900 text-white border border-white/15 text-center px-1 py-0.5 rounded-xs text-[11px] font-sans h-8"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  if (actualIdx !== -1) {
                                    setScorers(prev => prev.filter((_, i) => i !== actualIdx));
                                  }
                                }}
                                className="p-1 text-rose-500 hover:text-rose-400 hover:bg-white/5 rounded-xs cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          );
                        })}
                        {scorers.filter(s => s.teamId === team1?.id).length === 0 && (
                          <span className="text-[10px] text-slate-500 font-mono italic block py-0.5">Nenhum gol registrado para este time.</span>
                        )}
                      </div>
                    </div>

                    {/* Team 2 Scorers */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          Gols de {team2?.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setScorers(prev => [...prev, { playerName: '', teamId: team2?.id || '', minute: undefined }]);
                          }}
                          className="px-2 py-1 bg-slate-950 hover:bg-slate-800 text-[10px] text-emerald-450 border border-white/10 rounded-xs font-bold cursor-pointer"
                        >
                          + Adicionar
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {scorers.filter(s => s.teamId === team2?.id).map((s, idx) => {
                          const teamPlayers = WORLD_PLAYERS.filter(p => p.country === team2?.name);
                          const actualIdx = scorers.indexOf(s);
                          return (
                            <div key={idx} className="flex gap-1 items-center bg-slate-950 p-1.5 rounded-sm border border-white/5">
                              <select
                                value={s.playerName}
                                onChange={(e) => {
                                  const updated = [...scorers];
                                  if (actualIdx !== -1) {
                                    updated[actualIdx].playerName = e.target.value;
                                    setScorers(updated);
                                  }
                                }}
                                className="flex-1 bg-slate-900 text-white border border-white/15 px-1 py-0.5 rounded-xs text-[11px] font-sans h-8"
                              >
                                <option value="">-- Selecionar --</option>
                                {teamPlayers.map(p => (
                                  <option key={p.id} value={p.name}>{p.name} ({p.role})</option>
                                ))}
                                <option value="Custom">+ Customizado...</option>
                              </select>

                              {(s.playerName === 'Custom' || (!teamPlayers.some(p => p.name === s.playerName) && s.playerName !== '')) && (
                                <input
                                  type="text"
                                  placeholder="Nome"
                                  value={s.playerName === 'Custom' ? '' : s.playerName}
                                  onChange={(e) => {
                                    const updated = [...scorers];
                                    if (actualIdx !== -1) {
                                      updated[actualIdx].playerName = e.target.value;
                                      setScorers(updated);
                                    }
                                  }}
                                  className="w-24 bg-slate-900 text-white border border-white/15 px-1 py-0.5 rounded-xs text-[11px] font-sans h-8 box-border"
                                />
                              )}

                              <input
                                type="number"
                                placeholder="Min"
                                value={s.minute || ''}
                                onChange={(e) => {
                                  const updated = [...scorers];
                                  if (actualIdx !== -1) {
                                    updated[actualIdx].minute = e.target.value ? parseInt(e.target.value) : undefined;
                                    setScorers(updated);
                                  }
                                }}
                                className="w-12 bg-slate-900 text-white border border-white/15 text-center px-1 py-0.5 rounded-xs text-[11px] font-sans h-8"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  if (actualIdx !== -1) {
                                    setScorers(prev => prev.filter((_, i) => i !== actualIdx));
                                  }
                                }}
                                className="p-1 text-rose-500 hover:text-rose-400 hover:bg-white/5 rounded-xs cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          );
                        })}
                        {scorers.filter(s => s.teamId === team2?.id).length === 0 && (
                          <span className="text-[10px] text-slate-500 font-mono italic block py-0.5">Nenhum gol registrado para este time.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QUICK INSTANT SIMULATOR TRIGGER PANEL */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleInstantSimulate}
                  disabled={isSimulating}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-widest rounded-sm cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 transition-all border-none"
                >
                  <Sparkles className={`h-4 w-4 ${isSimulating ? 'animate-spin' : ''}`} />
                  {isSimulating ? 'Simulando com Estatísticas...' : 'Simular Jogo'}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title="Resetar placar"
                  className="px-4 bg-slate-950 hover:bg-slate-850 hover:text-rose-500 border border-white/10 rounded-sm text-slate-500 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            /* LINEUPS CONTAINER */
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-950/45 border border-white/5 rounded-sm p-4 text-center">
                <h3 className="text-xs font-mono font-black uppercase text-emerald-450 tracking-wider">
                  Montar Escalação Tática
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Selecione os titulares oficiais para a disputa das semifinais e finais.
                </p>
              </div>

              {isTeam1Eligible && team1 && (
                <div className="space-y-3 bg-slate-950/60 p-4 border border-white/5 rounded-sm">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[11px] font-sans font-black uppercase text-white flex items-center gap-1.5">
                      <TeamFlag code={team1.code} name={team1.name} size="xs" />
                      Escalação {team1.name}
                    </span>
                    <span className="text-[10px] font-mono font-extrabold text-slate-450">
                      {lineup1.length}/11 Escalados
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                    {WORLD_PLAYERS.filter(p => p.country === team1.name).map(player => {
                      const isStarter = lineup1.includes(player.id);
                      return (
                        <button
                          type="button"
                          key={player.id}
                          onClick={() => togglePlayerLineup(team1.id, player.id)}
                          className={`p-2 rounded-xs border text-left text-[11px] flex justify-between items-center transition-all cursor-pointer ${
                            isStarter
                              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                              : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-205'
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-bold block text-white truncate text-[11px]">{player.name}</span>
                            <span className="text-[9px] text-slate-400 font-mono">
                              {player.position} • {player.rating} Over
                            </span>
                          </div>
                          <span className="text-[9px] font-mono leading-none px-1.5 py-0.5 rounded-sm bg-slate-950/50">
                            {isStarter ? 'T' : 'R'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {isTeam2Eligible && team2 && (
                <div className="space-y-3 bg-slate-950/60 p-4 border border-white/5 rounded-sm">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-[11px] font-sans font-black uppercase text-white flex items-center gap-1.5">
                      <TeamFlag code={team2.code} name={team2.name} size="xs" />
                      Escalação {team2.name}
                    </span>
                    <span className="text-[10px] font-mono font-extrabold text-slate-450">
                      {lineup2.length}/11 Escalados
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                    {WORLD_PLAYERS.filter(p => p.country === team2.name).map(player => {
                      const isStarter = lineup2.includes(player.id);
                      return (
                        <button
                          type="button"
                          key={player.id}
                          onClick={() => togglePlayerLineup(team2.id, player.id)}
                          className={`p-2 rounded-xs border text-left text-[11px] flex justify-between items-center transition-all cursor-pointer ${
                            isStarter
                              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                              : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-205'
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-bold block text-white truncate text-[11px]">{player.name}</span>
                            <span className="text-[9px] text-slate-400 font-mono">
                              {player.position} • {player.rating} Over
                            </span>
                          </div>
                          <span className="text-[9px] font-mono leading-none px-1.5 py-0.5 rounded-sm bg-slate-950/50">
                            {isStarter ? 'T' : 'R'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
        </div>

        {/* Modal Footer actions */}
        <div className="p-4 border-t border-white/5 bg-slate-950/20 flex gap-3 justify-end items-center relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-white/10 hover:border-white/30 text-white font-black text-xs uppercase tracking-widest rounded-sm cursor-pointer transition-colors"
          >
            Fechar
          </button>
          {!isPendingTeams && (
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-450 text-slate-950 font-black text-xs uppercase tracking-widest rounded-sm cursor-pointer transition-all shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
            >
              <Check className="h-4 w-4 shrink-0" />
              Salvar Placar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
