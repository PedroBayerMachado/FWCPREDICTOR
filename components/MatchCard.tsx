/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Match, Team } from '../types';
import { TEAMS } from '../data/teams';
import { useSimulator } from '../contexts/SimulatorContext';
import { Play, Save, RotateCcw, Search, X, Check } from 'lucide-react';
import { TeamFlag } from './TeamFlag';

interface TeamSelectorModalProps {
  slot: 1 | 2;
  currentSelectedId?: string;
  opponentId?: string;
  onSelect: (teamId: string) => void;
  onClose: () => void;
  matchPhase: string;
}

const TeamSelectorModal: React.FC<TeamSelectorModalProps> = ({
  slot,
  currentSelectedId,
  opponentId,
  onSelect,
  onClose,
  matchPhase
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const filteredTeams = TEAMS.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup ? team.group === selectedGroup : true;
    const isOpponent = team.id === opponentId;
    return matchesSearch && matchesGroup && !isOpponent;
  });

  const sortedFilteredTeams = [...filteredTeams].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-white/10 max-w-lg w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col rounded-sm shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-white/5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-sm font-black uppercase text-white flex items-center gap-1.5 italic tracking-tight">
              Seleção {slot === 1 ? 'Casa' : 'Visitante'}
            </h3>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              Fase: {matchPhase === 'group' ? 'De Grupos' : 'Mata-Mata'} • Selecione um substituto
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-sm cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search & Tabs */}
        <div className="p-4 border-b border-white/5 space-y-3 bg-slate-900/60 shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3 h-3.5 w-3.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Pesquisar por país ou sigla (ex: BRA)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 text-white pl-9 pr-8 py-2.5 rounded-xs text-xs border border-white/10 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-extrabold"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 text-slate-450 hover:text-white text-xs cursor-pointer font-bold"
              >
                Limpar
              </button>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-[9px] font-mono text-slate-500 font-black uppercase tracking-wider block">
              Filtrar por Grupo Original de 2026:
            </span>
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedGroup(null)}
                className={`flex-shrink-0 px-2.5 py-1 text-[10px] font-black uppercase rounded-xs border cursor-pointer transition-all ${
                  selectedGroup === null
                    ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                    : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                }`}
              >
                Todos (48)
              </button>
              {groups.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGroup(g)}
                  className={`flex-shrink-0 w-8 h-6 flex items-center justify-center text-[10px] font-black uppercase rounded-xs border cursor-pointer transition-all ${
                    selectedGroup === g
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                      : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none bg-slate-950/20">
          
          {matchPhase !== 'group' && (
            <button
              type="button"
              onClick={() => onSelect('')}
              className={`w-full flex items-center justify-between p-3 rounded-xs border transition-all cursor-pointer ${
                !currentSelectedId
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900 border-white/5 hover:border-emerald-500/30 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3.5 bg-slate-950 border border-white/10 border-dashed rounded-xs shrink-0 flex items-center justify-center text-[8px]">?</div>
                <div className="text-left">
                  <span className="text-xs font-black uppercase tracking-tight block">A definir</span>
                  <span className="text-[9px] text-slate-500 font-mono">Voltar para o fluxo automático do chaveamento</span>
                </div>
              </div>
              {!currentSelectedId && <Check className="h-4 w-4 text-emerald-400 shrink-0" />}
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
            {sortedFilteredTeams.map(team => {
              const isSelected = team.id === currentSelectedId;
              return (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => onSelect(team.id)}
                  className={`flex items-center justify-between p-3 sm:p-2.5 rounded-sm border text-left cursor-pointer transition-all duration-150 transform hover:scale-[1.01] active:scale-[0.99] ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/5'
                      : 'bg-slate-900 hover:bg-slate-850 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <TeamFlag code={team.code} name={team.name} size="sm" className="shrink-0 transition-transform duration-150 group-hover:scale-105" />
                    <div className="truncate">
                      <span className="text-xs font-black uppercase tracking-tight text-white block truncate leading-none mb-1">{team.name}</span>
                      <span className="text-[9px] text-slate-400 font-mono font-bold leading-none block uppercase">
                        Força: <span className="text-emerald-400 font-extrabold">{team.rating}</span> • Grupo {team.group}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-emerald-400 shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>

          {sortedFilteredTeams.length === 0 && (
            <div className="text-center py-8">
              <span className="text-2xl block">🔍</span>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-2">Nenhuma seleção encontrada</p>
              <p className="text-[10px] text-slate-600 font-mono mt-1">Experimente outro termo de busca ou mude os filtros de Grupo.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-white/5 text-center shrink-0">
          <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tight">
            Ratings oficiais atualizados para a Copa do Mundo 2026.
          </p>
        </div>
      </div>
    </div>
  );
};

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { updateMatchScore, simulateSingleMatch, overridePlayoffTeam } = useSimulator();
  const [isEditingTeams, setIsEditingTeams] = useState(false);
  const [activeSelectSlot, setActiveSelectSlot] = useState<1 | 2 | null>(null);

  // Find teams details
  const team1 = TEAMS.find(t => t.id === match.team1Id);
  const team2 = TEAMS.find(t => t.id === match.team2Id);

  // Score states
  const [score1, setScore1] = useState<string>(match.team1Score !== undefined ? match.team1Score.toString() : '');
  const [score2, setScore2] = useState<string>(match.team2Score !== undefined ? match.team2Score.toString() : '');

  // Penalty states
  const [penScore1, setPenScore1] = useState<string>(match.team1PenScore !== undefined ? match.team1PenScore.toString() : '');
  const [penScore2, setPenScore2] = useState<string>(match.team2PenScore !== undefined ? match.team2PenScore.toString() : '');
  const [penWinnerId, setPenWinnerId] = useState<string>(match.winnerId || '');

  // Sync state if match updates from outside simulation (e.g. "Simular Copa Inteira")
  useEffect(() => {
    setScore1(match.team1Score !== undefined ? match.team1Score.toString() : '');
    setScore2(match.team2Score !== undefined ? match.team2Score.toString() : '');
    setPenScore1(match.team1PenScore !== undefined ? match.team1PenScore.toString() : '');
    setPenScore2(match.team2PenScore !== undefined ? match.team2PenScore.toString() : '');
    setPenWinnerId(match.winnerId || '');
  }, [match]);

  // AUTO-SAVE: Automatically save score changes instantly when valid scores are typed in
  useEffect(() => {
    const currentS1 = match.team1Score !== undefined ? match.team1Score.toString() : '';
    const currentS2 = match.team2Score !== undefined ? match.team2Score.toString() : '';
    const currentP1 = match.team1PenScore !== undefined ? match.team1PenScore.toString() : '';
    const currentP2 = match.team2PenScore !== undefined ? match.team2PenScore.toString() : '';
    const currentW = match.winnerId || '';

    if (
      score1 === currentS1 &&
      score2 === currentS2 &&
      penScore1 === currentP1 &&
      penScore2 === currentP2 &&
      penWinnerId === currentW
    ) {
      return;
    }

    // If both scores are completely empty, reset the match score
    if (score1 === '' && score2 === '') {
      if (currentS1 !== '' || currentS2 !== '') {
        updateMatchScore(match.id, undefined, undefined);
      }
      return;
    }

    // Do not save partially completed scores (one empty, one styled) to prevent incomplete states while user is typing
    if (score1 === '' || score2 === '') {
      return;
    }

    const s1 = parseInt(score1);
    const s2 = parseInt(score2);
    if (isNaN(s1) || isNaN(s2)) return;

    if (match.phase !== 'group' && s1 === s2) {
      const p1 = parseInt(penScore1);
      const p2 = parseInt(penScore2);

      const p1Def = isNaN(p1) ? 5 : p1;
      const p2Def = isNaN(p2) ? 4 : p2;
      
      let winner = penWinnerId;
      if (isNaN(p1) || isNaN(p2) || p1 === p2) {
        winner = winner || match.team1Id;
      } else {
        winner = p1 > p2 ? match.team1Id : match.team2Id;
      }
      updateMatchScore(match.id, s1, s2, p1Def, p2Def, winner);
    } else {
      updateMatchScore(match.id, s1, s2, undefined, undefined, s1 > s2 ? match.team1Id : (s2 > s1 ? match.team2Id : undefined));
    }
  }, [score1, score2, penScore1, penScore2, penWinnerId, match.id]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (score1 === '' || score2 === '') {
      updateMatchScore(match.id, undefined, undefined);
      return;
    }

    const s1 = parseInt(score1);
    const s2 = parseInt(score2);

    if (isNaN(s1) || isNaN(s2)) return;

    if (match.phase !== 'group' && s1 === s2) {
      const p1 = parseInt(penScore1);
      const p2 = parseInt(penScore2);

      if (isNaN(p1) || isNaN(p2) || p1 === p2) {
        const p1Def = isNaN(p1) ? 5 : p1;
        const p2Def = isNaN(p2) ? 4 : p2;
        const winner = penWinnerId || match.team1Id;
        updateMatchScore(match.id, s1, s2, p1Def, p2Def, winner);
      } else {
        const winner = p1 > p2 ? match.team1Id : match.team2Id;
        updateMatchScore(match.id, s1, s2, p1, p2, winner);
      }
    } else {
      updateMatchScore(match.id, s1, s2, undefined, undefined, s1 > s2 ? match.team1Id : (s2 > s1 ? match.team2Id : undefined));
    }
  };

  const handleReset = () => {
    setScore1('');
    setScore2('');
    setPenScore1('');
    setPenScore2('');
    setPenWinnerId('');
    updateMatchScore(match.id, undefined, undefined, undefined, undefined, undefined);
  };

  // Se os times ainda não foram determinados no mata-mata
  if (match.phase !== 'group' && (!match.team1Id || !match.team2Id)) {
    return (
      <div className="bg-slate-900 border-2 border-dashed border-white/10 rounded-sm p-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between h-48 relative">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-mono font-black uppercase bg-slate-850 text-slate-300 px-2.5 py-1 rounded-sm">
            {match.phase === 'round_of_32' ? '32-AVOS'
             : match.phase === 'round_of_16' ? 'OITAVAS'
             : match.phase === 'quarter_finals' ? 'QUARTAS'
             : match.phase === 'semi_finals' ? 'SEMIFINAL'
             : match.phase === 'third_place' ? '3º LUGAR' : 'FINAL'}
          </span>
          <span className="text-[9px] font-mono text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
            Manual ✏️
          </span>
        </div>

        <div className="space-y-2 py-1">
          <p className="text-[9px] font-mono uppercase text-slate-500 font-black tracking-wider text-center">
            Toque para escolher cada país:
          </p>
          <div className="flex items-center justify-between gap-2">
            {/* Button Selector 1 */}
            <button
              type="button"
              id={`trigger-empty-safe-t1-${match.id}`}
              onClick={() => setActiveSelectSlot(1)}
              className="flex-1 bg-slate-950 hover:bg-slate-850 border border-white/10 hover:border-emerald-500/60 rounded-xs p-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all h-20 group"
            >
              {team1 ? (
                <>
                  <TeamFlag code={team1.code} name={team1.name} size="sm" />
                  <span className="text-[10px] font-black tracking-tight text-center truncate w-full uppercase max-w-[95px] text-white group-hover:text-emerald-400">{team1.name}</span>
                </>
              ) : (
                <>
                  <div className="w-8 h-5 rounded-xs border border-white/5 bg-slate-900/60 border-dashed flex items-center justify-center text-[11px] text-slate-500 font-black group-hover:text-emerald-400 group-hover:border-emerald-500/30">?</div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Escolher 1</span>
                </>
              )}
            </button>

            <span className="text-emerald-550 font-black text-xs italic shrink-0">VS</span>

            {/* Button Selector 2 */}
            <button
              type="button"
              id={`trigger-empty-safe-t2-${match.id}`}
              onClick={() => setActiveSelectSlot(2)}
              className="flex-1 bg-slate-950 hover:bg-slate-850 border border-white/10 hover:border-emerald-500/60 rounded-xs p-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all h-20 group"
            >
              {team2 ? (
                <>
                  <TeamFlag code={team2.code} name={team2.name} size="sm" />
                  <span className="text-[10px] font-black tracking-tight text-center truncate w-full uppercase max-w-[95px] text-white group-hover:text-emerald-400">{team2.name}</span>
                </>
              ) : (
                <>
                  <div className="w-8 h-5 rounded-xs border border-white/5 bg-slate-900/60 border-dashed flex items-center justify-center text-[11px] text-slate-500 font-black group-hover:text-emerald-400 group-hover:border-emerald-500/30">?</div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">Escolher 2</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="border-t border-white/5 pt-2 mt-1 flex justify-between items-center">
          <span className="text-[9px] text-slate-400 font-extrabold truncate max-w-[145px]">
            {match.stadium}
          </span>
          <span className="text-[8px] text-slate-550 font-mono uppercase tracking-wider">
            {match.city}
          </span>
        </div>

        {activeSelectSlot !== null && (
          <TeamSelectorModal
            slot={activeSelectSlot}
            currentSelectedId={activeSelectSlot === 1 ? match.team1Id : match.team2Id}
            opponentId={activeSelectSlot === 1 ? match.team2Id : match.team1Id}
            onSelect={(teamId) => {
              overridePlayoffTeam(match.id, activeSelectSlot, teamId);
              setActiveSelectSlot(null);
            }}
            onClose={() => setActiveSelectSlot(null)}
            matchPhase={match.phase}
          />
        )}
      </div>
    );
  }

  // Fallback for group stage items if somehow teams are undefined (should never happen)
  if (!match.team1Id || !match.team2Id) {
    return (
      <div className="bg-slate-855/40 border border-slate-700/50 rounded-xl p-4 flex flex-col items-center justify-center text-center py-6 backdrop-blur-xs">
        <span className="text-[10px] font-mono uppercase bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full mb-3 tracking-wider font-semibold">
          A DEFINIR
        </span>
        <div className="flex justify-between w-full items-center max-w-xs text-slate-500 font-semibold text-xs py-2">
          <span>A definir</span>
          <span className="text-emerald-500/50 font-bold mx-2">VS</span>
          <span>A definir</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 font-mono">
          {match.stadium}, {match.city} ({match.country})
        </p>
      </div>
    );
  }

  const isTiedPlayoff = match.phase !== 'group' && score1 !== '' && score2 !== '' && score1 === score2;

  // Calcular probabilidades de vitória dinâmicas (Clash Odds) com base nos ratings dos times
  const rating1 = team1?.rating || 75;
  const rating2 = team2?.rating || 75;
  const ratingDiff = rating1 - rating2;

  let odds1 = 50;
  let odds2 = 50;
  let oddsDraw = 0;

  if (match.phase === 'group') {
    // Com possibilidade de empate na fase de grupos
    const baseDraw = 24;
    const remaining = 100 - baseDraw; // 76
    const p1Base = remaining / 2; // 38
    
    // Diferença máxima razoável é ~30 pontos de rating
    const shift = Math.max(-28, Math.min(28, ratingDiff * 1.6));
    odds1 = Math.max(8, Math.min(84, Math.round(p1Base + shift)));
    odds2 = Math.max(8, Math.min(84, Math.round(p1Base - shift)));
    oddsDraw = 100 - odds1 - odds2;
  } else {
    // Sem empate no mata-mata (decide em pênaltis / prorrogação)
    const shift = Math.max(-42, Math.min(42, ratingDiff * 2.0));
    odds1 = Math.round(50 + shift);
    odds2 = 100 - odds1;
  }

  return (
    <div className={`bg-white border transition-all duration-300 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-50 hover:border-blue-300 hover:shadow-md ${
      match.status === 'completed' ? 'border-emerald-200 bg-emerald-50/[0.02]' : 'border-slate-200'
    }`}>
      {/* Informações superiores do Ticket */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-black uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
            {match.phase === 'group' ? `GRUPO ${match.group}` 
             : match.phase === 'round_of_32' ? '32-AVOS'
             : match.phase === 'round_of_16' ? 'OITAVAS'
             : match.phase === 'quarter_finals' ? 'QUARTAS'
             : match.phase === 'semi_finals' ? 'SEMIFINAL'
             : match.phase === 'third_place' ? '3º LUGAR' : 'FINAL'}
          </span>
          {match.status === 'completed' && (
            <span className="text-[10px] font-mono font-black uppercase bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full border border-emerald-200">
              ENCERRADO
            </span>
          )}
        </div>

        {match.phase !== 'group' && (
          <button
            type="button"
            onClick={() => setIsEditingTeams(!isEditingTeams)}
            className={`text-[9px] font-mono font-black uppercase px-2 py-1 rounded-full transition-colors border cursor-pointer ${
              isEditingTeams 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-350'
            }`}
          >
            {isEditingTeams ? 'Concluir ✏s' : 'Ajustar Times ✏️'}
          </button>
        )}

        <span className="text-[11px] font-mono text-slate-400 font-bold text-right">
          {match.date.split('-')[2]}/{match.date.split('-')[1]} • {match.time}
        </span>
      </div>

      {/* Grid das seleções e Placar */}
      <form onSubmit={handleSave} className="flex flex-col gap-3">
        {/* Painel de Probabilidade de Confronto (Clash Odds) */}
        {!isEditingTeams && (
          <div id={`clash-odds-bar-${match.id}`} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1.5 shadow-xs">
            <div className="flex justify-between items-center text-[9px] font-mono tracking-wider text-slate-500 font-black uppercase">
              <span className="text-emerald-600 flex items-center gap-1 font-bold">
                {team1?.name}: {odds1}%
              </span>
              {oddsDraw > 0 ? (
                <span className="text-slate-400 font-semibold">Empate: {oddsDraw}%</span>
              ) : (
                <span className="text-amber-655 font-bold">Mata-Mata (PK)</span>
              )}
              <span className="text-sky-600 flex items-center gap-1 text-right font-bold">
                {team2?.name}: {odds2}%
              </span>
            </div>

            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
              <div style={{ width: `${odds1}%` }} className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" />
              {oddsDraw > 0 && (
                <div style={{ width: `${oddsDraw}%` }} className="h-full bg-slate-300 transition-all duration-500" />
              )}
              <div style={{ width: `${odds2}%` }} className="h-full bg-gradient-to-r from-sky-450 to-sky-500 transition-all duration-500" />
            </div>
          </div>
        )}

        {isEditingTeams && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5 text-center">
            <p className="text-[10px] font-mono font-black text-rose-600 uppercase tracking-wider animate-none">
              Ajuste de Seleção Ativo
            </p>
            <p className="text-[9px] text-slate-500 mt-0.5 font-medium">
              Escolha seleções alternativas para simular caminhos customizados!
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 py-3 border-b border-dashed border-slate-100 mb-2">
          
          {/* Seleção 1 */}
          <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
            {isEditingTeams ? (
              <button
                type="button"
                id={`btn-edit-t1-${match.id}`}
                onClick={() => setActiveSelectSlot(1)}
                className="bg-slate-50 hover:bg-slate-100 text-slate-800 font-black text-[10px] border border-slate-200 hover:border-slate-800 rounded-full px-2 py-1 focus:outline-none w-full max-w-[110px] sm:max-w-[130px] cursor-pointer flex items-center justify-between gap-1 transition-all"
              >
                <span className="truncate flex items-center gap-1 min-w-0">
                  <span className="shrink-0">{team1?.emoji}</span>
                  <span className="truncate uppercase font-black text-[9px] sm:text-[10px]">{team1?.name || 'A definir'}</span>
                </span>
                <span className="text-[8px] text-slate-450 font-normal shrink-0">▼</span>
              </button>
            ) : (
              <>
                <span className="text-slate-800 font-black text-xs sm:text-sm truncate uppercase tracking-tight" title={team1?.name}>
                  {team1?.name || 'A definir'}
                </span>
                <TeamFlag code={team1?.code || ''} name={team1?.name} size="sm" />
              </>
            )}
          </div>

          {/* Placar Centralizado */}
          <div className="flex items-center gap-1 shrink-0 px-1 sm:px-2">
            <input
              id={`score1-input-${match.id}`}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={score1}
              onChange={(e) => setScore1(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="0"
              disabled={isEditingTeams}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-800 font-mono font-black focus:outline-none focus:border-slate-800 text-base shadow-xs disabled:opacity-40"
            />
            
            <span className="text-[9px] text-slate-400 font-mono font-black px-1">VS</span>

            <input
              id={`score2-input-${match.id}`}
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={score2}
              onChange={(e) => setScore2(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="0"
              disabled={isEditingTeams}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-50 border border-slate-200 rounded-xl text-center text-slate-800 font-mono font-black focus:outline-none focus:border-slate-800 text-base shadow-xs disabled:opacity-40"
            />
          </div>

          {/* Seleção 2 */}
          <div className="flex-1 flex items-center justify-start gap-2 min-w-0">
            {isEditingTeams ? (
              <button
                type="button"
                id={`btn-edit-t2-${match.id}`}
                onClick={() => setActiveSelectSlot(2)}
                className="bg-slate-50 hover:bg-slate-100 text-slate-800 font-black text-[10px] border border-slate-200 hover:border-slate-800 rounded-full px-2 py-1 focus:outline-none w-full max-w-[110px] sm:max-w-[130px] cursor-pointer flex items-center justify-between gap-1 transition-all"
              >
                <span className="truncate flex items-center gap-1 min-w-0 text-left">
                  <span className="shrink-0">{team2?.emoji}</span>
                  <span className="truncate uppercase font-black text-[9px] sm:text-[10px]">{team2?.name || 'A definir'}</span>
                </span>
                <span className="text-[8px] text-slate-455 font-normal shrink-0">▼</span>
              </button>
            ) : (
              <>
                <TeamFlag code={team2?.code || ''} name={team2?.name} size="sm" />
                <span className="text-slate-800 font-black text-xs sm:text-sm truncate uppercase tracking-tight" title={team2?.name}>
                  {team2?.name || 'A definir'}
                </span>
              </>
            )}
          </div>

        </div>

        {/* DECISÃO POR PÊNALTIS (EM CASO DE EMPATE NO MATA-MATA) */}
        {isTiedPlayoff && (
          <div className="bg-slate-50 p-2.5 border border-slate-200 rounded-xl animate-fadeIn">
            <div className="text-center mb-2">
              <span className="text-[10px] text-emerald-600 font-mono font-black tracking-widest block uppercase italic">
                DECISÃO POR PÊNALTIS
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 font-mono font-bold">{team1?.code}</span>
                <input
                  id={`pen1-input-${match.id}`}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={penScore1}
                  onChange={(e) => setPenScore1(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="5"
                  className="w-8 h-8 bg-white border border-slate-200 rounded-lg text-center text-slate-800 text-xs font-black focus:outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>
              <span className="text-[10px] text-slate-400 font-black italic">PK</span>
              <div className="flex items-center gap-1">
                <input
                  id={`pen2-input-${match.id}`}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={penScore2}
                  onChange={(e) => setPenScore2(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="4"
                  className="w-8 h-8 bg-white border border-slate-200 rounded-lg text-center text-slate-800 text-xs font-black focus:outline-none focus:border-emerald-500 shadow-xs"
                />
                <span className="text-xs text-slate-505 font-mono font-bold">{team2?.code}</span>
              </div>
            </div>
          </div>
        )}

        {/* Visual e Rodapé do Card */}
        <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between">
          <div className="text-[10px] text-slate-500 truncate max-w-[150px] md:max-w-none">
            <span className="block font-bold truncate text-slate-800">{match.stadium}</span>
            <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-wider">{match.city}, {match.country}</span>
          </div>

          {/* Ações */}
          <div className="flex gap-1.5">
            <button
              id={`reset-btn-${match.id}`}
              type="button"
              onClick={handleReset}
              title="Limpar resultado"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-full cursor-pointer transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              id={`sim-btn-${match.id}`}
              type="button"
              onClick={() => simulateSingleMatch(match.id)}
              title="Simular com probabilidade"
              className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full cursor-pointer transition-colors"
            >
              <Play className="h-4 w-4 fill-emerald-500/10" />
            </button>
            <button
              id={`save-btn-${match.id}`}
              type="submit"
              title="Salvar placar"
              className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-full cursor-pointer transition-all border border-blue-100"
            >
              <Save className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      {activeSelectSlot !== null && (
        <TeamSelectorModal
          slot={activeSelectSlot}
          currentSelectedId={activeSelectSlot === 1 ? match.team1Id : match.team2Id}
          opponentId={activeSelectSlot === 1 ? match.team2Id : match.team1Id}
          onSelect={(teamId) => {
            overridePlayoffTeam(match.id, activeSelectSlot, teamId);
            setActiveSelectSlot(null);
          }}
          onClose={() => setActiveSelectSlot(null)}
          matchPhase={match.phase}
        />
      )}
    </div>
  );
};
