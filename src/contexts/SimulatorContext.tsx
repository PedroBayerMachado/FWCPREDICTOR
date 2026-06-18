/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team, GroupStanding, Match, UserPrediction, GoalScorer } from '../types';
import { TEAMS, GROUPS_LIST } from '../data/teams';
import { getInitialMatches } from '../data/matches';
import { generateMotm } from '../utils/motmGenerator';

interface SimulatorContextType {
  matches: Match[];
  userPredictions: UserPrediction[];
  userName: string;
  setUserName: (name: string) => void;
  favoriteChampion: string;
  setFavoriteChampion: (id: string) => void;
  activeTab: 'home' | 'predictions' | 'groups' | 'playoffs' | 'stats' | 'ultimate-team' | 'ultimate-ligas' | 'h2h-sandbox';
  setActiveTab: (tab: 'home' | 'predictions' | 'groups' | 'playoffs' | 'stats' | 'ultimate-team' | 'ultimate-ligas' | 'h2h-sandbox') => void;
  simulationStep: 'groups' | 'playoffs';
  setSimulationStep: (step: 'groups' | 'playoffs') => void;
  groupStandings: Record<string, GroupStanding[]>;
  savePrediction: () => void;
  deletePrediction: (id: string) => void;
  updateMatchScore: (
    matchId: number,
    team1Score: number | undefined,
    team2Score: number | undefined,
    team1PenScore?: number,
    team2PenScore?: number,
    winnerId?: string,
    scorers?: GoalScorer[]
  ) => void;
  simulateSingleMatch: (matchId: number) => void;
  simulateFullGroupStage: () => void;
  simulateEntireCup: () => void;
  resetSimulator: () => void;
  simulatePlayoffPhase: (phase: 'round_of_32' | 'round_of_16' | 'quarter_finals' | 'semi_finals' | 'third_place' | 'final') => void;

  simulationMode: 'scores' | 'standings';
  setSimulationMode: (mode: 'scores' | 'standings') => void;
  groupStandingsOrder: Record<string, string[]>;
  updateGroupStandingsOrder: (groupChar: string, order: string[]) => void;
  customThirdPlaceQualifierIds: string[];
  setCustomThirdPlaceQualifierIds: (ids: string[]) => void;
  applyStandingsToAllMatches: (currentOrder: Record<string, string[]>, currentThirds: string[]) => void;
  thirdPlaceTeams: GroupStanding[];
  defaultSortedThirds: GroupStanding[];
  
  playoffOverrides: Record<number, { team1Id?: string; team2Id?: string }>;
  overridePlayoffTeam: (matchId: number, slot: 1 | 2, teamId: string) => void;
}

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};

export const SimulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTabReal, setActiveTabReal] = useState<'home' | 'predictions' | 'groups' | 'playoffs' | 'stats' | 'ultimate-team' | 'ultimate-ligas' | 'h2h-sandbox'>('home');
  const [simulationStep, setSimulationStep] = useState<'groups' | 'playoffs'>('groups');

  const activeTab = activeTabReal;
  const setActiveTab = (tab: 'home' | 'predictions' | 'groups' | 'playoffs' | 'stats' | 'ultimate-team' | 'ultimate-ligas' | 'h2h-sandbox') => {
    if (tab === 'playoffs') {
      setActiveTabReal('groups');
      setSimulationStep('playoffs');
    } else if (tab === 'groups') {
      setActiveTabReal('groups');
      setSimulationStep('groups');
    } else {
      setActiveTabReal(tab);
    }
  };

  const [userName, setUserNameReal] = useState('');
  const [favoriteChampion, setFavoriteChampionReal] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);
  const [groupStandings, setGroupStandings] = useState<Record<string, GroupStanding[]>>({});

  const [playoffOverrides, setPlayoffOverrides] = useState<Record<number, { team1Id?: string; team2Id?: string }>>(() => {
    const stored = localStorage.getItem('wc_playoff_overrides');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    return {};
  });

  const [simulationMode, setSimulationModeReal] = useState<'scores' | 'standings'>(() => {
    return (localStorage.getItem('wc_simulation_mode') as 'scores' | 'standings') || 'scores';
  });

  const [groupStandingsOrder, setGroupStandingsOrder] = useState<Record<string, string[]>>(() => {
    const stored = localStorage.getItem('wc_group_standings_order');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    const defaultOrder: Record<string, string[]> = {};
    GROUPS_LIST.forEach(gChar => {
      defaultOrder[gChar] = TEAMS.filter(t => t.group === gChar).map(t => t.id);
    });
    return defaultOrder;
  });

  const [customThirdPlaceQualifierIds, setCustomThirdPlaceQualifierIdsReal] = useState<string[]>(() => {
    const stored = localStorage.getItem('wc_custom_thirds');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    return [];
  });

  // Calcular terceiros colocados em tempo real de forma reativa a partir de groupStandings
  const thirdPlaceTeams = React.useMemo<GroupStanding[]>(() => {
    const list: GroupStanding[] = [];
    GROUPS_LIST.forEach(g => {
      const grp = groupStandings[g];
      if (grp && grp.length >= 3) {
        list.push(grp[2]);
      }
    });
    return list;
  }, [groupStandings]);

  const defaultSortedThirds = React.useMemo<GroupStanding[]>(() => {
    return [...thirdPlaceTeams].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return b.team.rating - a.team.rating;
    });
  }, [thirdPlaceTeams]);

  // 1. CARREGAMENTO INICIAL DO LOCALSTORAGE
  useEffect(() => {
    // Versão da configuração das seleções para invalidar cache obsoleto do localStorage
    const TEAMS_VERSION = 'v2_official_groups_2026';
    const storedVersion = localStorage.getItem('wc_teams_version');

    // Carregar nome de usuário e seleção favorita
    const storedName = localStorage.getItem('wc_username') || '';
    const storedChamp = localStorage.getItem('wc_fav_champ') || '';
    setUserNameReal(storedName);
    
    if (storedVersion === TEAMS_VERSION) {
      setFavoriteChampionReal(storedChamp);
    } else {
      setFavoriteChampionReal('');
      localStorage.removeItem('wc_fav_champ');
    }

    // Carregar palpites salvos
    const storedPredictions = localStorage.getItem('wc_predictions');
    if (storedVersion === TEAMS_VERSION && storedPredictions) {
      setUserPredictions(JSON.parse(storedPredictions));
    } else {
      // Palpites iniciais padrão atualizados para o novo chaveamento mundial
      const defaultPreds: UserPrediction[] = [
        { id: 'p1', userName: 'Neymar Santos', championId: '9', championName: 'Brasil', championEmoji: '🇧🇷', createdAt: new Date(Date.now() - 36000000).toISOString() },
        { id: 'p2', userName: 'Lionel Fan', championId: '37', championName: 'Argentina', championEmoji: '🇦🇷', createdAt: new Date(Date.now() - 72000000).toISOString() },
        { id: 'p3', userName: 'Kylian M.', championId: '33', championName: 'França', championEmoji: '🇫🇷', createdAt: new Date(Date.now() - 108000000).toISOString() },
        { id: 'p4', userName: 'Lucas Silva', championId: '9', championName: 'Brasil', championEmoji: '🇧🇷', createdAt: new Date(Date.now() - 150000000).toISOString() },
        { id: 'p5', userName: 'Alex Morgan', championId: '13', championName: 'Estados Unidos', championEmoji: '🇺🇸', createdAt: new Date(Date.now() - 200000000).toISOString() }
      ];
      setUserPredictions(defaultPreds);
      localStorage.setItem('wc_predictions', JSON.stringify(defaultPreds));
    }

    // Carregar/reiniciar jogos do simulador baseados na nova versão
    const storedMatches = localStorage.getItem('wc_sim_matches');
    const rawOverrides = localStorage.getItem('wc_playoff_overrides');
    let loadedOverrides = {};
    if (rawOverrides) {
      try {
        loadedOverrides = JSON.parse(rawOverrides);
      } catch (e) {
        // ignore
      }
    }

    if (storedVersion === TEAMS_VERSION && storedMatches) {
      const parsedMatches = JSON.parse(storedMatches) as Match[];
      const updated = ensurePlayoffStructure(parsedMatches, undefined, loadedOverrides);
      setMatches(updated);
    } else {
      const initial = getInitialMatches();
      const updated = ensurePlayoffStructure(initial, undefined, loadedOverrides);
      setMatches(updated);
      localStorage.setItem('wc_sim_matches', JSON.stringify(updated));
      localStorage.setItem('wc_teams_version', TEAMS_VERSION);
    }
  }, []);

  // 2. SALVAR DADOS DE PERFIL DE PALPITE
  const setUserName = (name: string) => {
    setUserNameReal(name);
    localStorage.setItem('wc_username', name);
  };

  const setFavoriteChampion = (id: string) => {
    setFavoriteChampionReal(id);
    localStorage.setItem('wc_fav_champ', id);
  };

  const savePrediction = () => {
    if (!userName.trim() || !favoriteChampion) return;
    const selectedTeam = TEAMS.find(t => t.id === favoriteChampion);
    if (!selectedTeam) return;

    const newPrediction: UserPrediction = {
      id: Math.random().toString(36).substr(2, 9),
      userName: userName.trim(),
      championId: selectedTeam.id,
      championName: selectedTeam.name,
      championEmoji: selectedTeam.emoji,
      createdAt: new Date().toISOString()
    };

    const updated = [newPrediction, ...userPredictions];
    setUserPredictions(updated);
    localStorage.setItem('wc_predictions', JSON.stringify(updated));
  };

  const deletePrediction = (id: string) => {
    const updated = userPredictions.filter(p => p.id !== id);
    setUserPredictions(updated);
    localStorage.setItem('wc_predictions', JSON.stringify(updated));
  };

  // 3. CALCULO E ATUALIZAÇÃO DA CLASSIFICAÇÃO DOS GRUPOS
  useEffect(() => {
    if (matches.length === 0) return;

    const standings: Record<string, GroupStanding[]> = {};

    GROUPS_LIST.forEach(groupChar => {
      const groupTeams = TEAMS.filter(t => t.group === groupChar);
      const groupMatches = matches.filter(m => m.phase === 'group' && m.group === groupChar);

      // Inicializar tabela para cada time do grupo
      const table: Record<string, GroupStanding> = {};
      groupTeams.forEach(t => {
        table[t.id] = {
          teamId: t.id,
          team: t,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0
        };
      });

      // Computar resultados dos jogos completos
      groupMatches.forEach(m => {
        if (m.status === 'completed' && m.team1Score !== undefined && m.team2Score !== undefined) {
          const t1 = table[m.team1Id];
          const t2 = table[m.team2Id];

          if (!t1 || !t2) return;

          t1.played += 1;
          t2.played += 1;

          t1.goalsFor += m.team1Score;
          t1.goalsAgainst += m.team2Score;
          t2.goalsFor += m.team2Score;
          t2.goalsAgainst += m.team1Score;

          t1.goalDifference = t1.goalsFor - t1.goalsAgainst;
          t2.goalDifference = t2.goalsFor - t2.goalsAgainst;

          if (m.team1Score > m.team2Score) {
            t1.won += 1;
            t1.points += 3;
            t2.lost += 1;
          } else if (m.team1Score < m.team2Score) {
            t2.won += 1;
            t2.points += 3;
            t1.lost += 1;
          } else {
            t1.drawn += 1;
            t1.points += 1;
            t2.drawn += 1;
            t2.points += 1;
          }
        }
      });

      // Ordenar tabela baseada nos critérios oficiais da FIFA (Pontos, Saldo de Gols, Gols Pró)
      // Como confronto direto é difícil de programar para múltiplos empates, vamos incluir primeiramente os três principais,
      // e depois desempatar pelo 'rating' global da seleção como penúltimo desempate.
      const sortedTable = Object.values(table).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        
        // Confronto direto simulado pela diferença de ratings do time
        return b.team.rating - a.team.rating;
      });

      standings[groupChar] = sortedTable;
    });

    setGroupStandings(standings);
  }, [matches]);

  // Recalculo automático e propagação das chaves de mata-mata ao mudar qualquer standing ou jogo
  const ensurePlayoffStructure = (
    currentMatches: Match[],
    overrideThirds?: string[],
    localOverrides?: Record<number, { team1Id?: string; team2Id?: string }>
  ): Match[] => {
    const list = [...currentMatches];
    const activeOverrides = localOverrides || playoffOverrides || {};
    
    // Obter standings atuais
    const standings: Record<string, GroupStanding[]> = {};
    GROUPS_LIST.forEach(groupChar => {
      const groupTeams = TEAMS.filter(t => t.group === groupChar);
      const groupMatches = list.filter(m => m.phase === 'group' && m.group === groupChar);

      const table: Record<string, GroupStanding> = {};
      groupTeams.forEach(t => {
        table[t.id] = { teamId: t.id, team: t, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 };
      });

      groupMatches.forEach(m => {
        if (m.status === 'completed' && m.team1Score !== undefined && m.team2Score !== undefined) {
          const t1 = table[m.team1Id];
          const t2 = table[m.team2Id];
          if (t1 && t2) {
            t1.played++; t2.played++;
            t1.goalsFor += m.team1Score; t1.goalsAgainst += m.team2Score;
            t2.goalsFor += m.team2Score; t2.goalsAgainst += m.team1Score;
            t1.goalDifference = t1.goalsFor - t1.goalsAgainst;
            t2.goalDifference = t2.goalsFor - t2.goalsAgainst;
            if (m.team1Score > m.team2Score) { t1.won++; t1.points += 3; t2.lost++; }
            else if (m.team1Score < m.team2Score) { t2.won++; t2.points += 3; t1.lost++; }
            else { t1.drawn++; t1.points++; t2.drawn++; t2.points++; }
          }
        }
      });

      standings[groupChar] = Object.values(table).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return b.team.rating - a.team.rating;
      });
    });

    // 1º e 2º colocados de cada um dos 12 grupos
    const firsts: Record<string, string> = {};
    const seconds: Record<string, string> = {};
    const thirds: GroupStanding[] = [];

    GROUPS_LIST.forEach(g => {
      const grp = standings[g];
      if (grp && grp.length >= 4) {
        firsts[g] = grp[0].teamId;
         seconds[g] = grp[1].teamId;
         thirds.push(grp[2]);
      }
    });

    // Encontrar os 8 melhores terceiros colocados
    const bestThirdsSorted = [...thirds].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return b.team.rating - a.team.rating;
    });

    const activeThirds = overrideThirds || customThirdPlaceQualifierIds;
    const best8ThirdsIds = (activeThirds && activeThirds.length === 8)
      ? activeThirds
      : bestThirdsSorted.slice(0, 8).map(st => st.teamId);

    // Mapeamento dos 16 jogos da Rodada de 32 (Matches 73 ao 88)
    const playoffTeamsMap: Record<number, { t1: string; t2: string }> = {
      73: { t1: firsts['A'] || '', t2: best8ThirdsIds[0] || '' },
      74: { t1: firsts['B'] || '', t2: best8ThirdsIds[1] || '' },
      75: { t1: firsts['C'] || '', t2: best8ThirdsIds[2] || '' },
      76: { t1: firsts['D'] || '', t2: best8ThirdsIds[3] || '' },
      77: { t1: firsts['E'] || '', t2: best8ThirdsIds[4] || '' },
      78: { t1: firsts['F'] || '', t2: best8ThirdsIds[5] || '' },
      79: { t1: firsts['G'] || '', t2: best8ThirdsIds[6] || '' },
      80: { t1: firsts['H'] || '', t2: best8ThirdsIds[7] || '' },
      81: { t1: firsts['I'] || '', t2: seconds['L'] || '' },
      82: { t1: firsts['J'] || '', t2: seconds['K'] || '' },
      83: { t1: firsts['K'] || '', t2: seconds['J'] || '' },
      84: { t1: firsts['L'] || '', t2: seconds['I'] || '' },
      85: { t1: seconds['A'] || '', t2: seconds['B'] || '' },
      86: { t1: seconds['C'] || '', t2: seconds['D'] || '' },
      87: { t1: seconds['E'] || '', t2: seconds['F'] || '' },
      88: { t1: seconds['G'] || '', t2: seconds['H'] || '' }
    };

    // Propagar times para a Rodada de 32 (73-88)
    for (let i = 73; i <= 88; i++) {
        const idx = list.findIndex(m => m.id === i);
        if (idx !== -1) {
          const map = playoffTeamsMap[i];
          const ov = activeOverrides[i];
          const finalT1 = ov?.team1Id !== undefined ? ov.team1Id : (map?.t1 || '');
          const finalT2 = ov?.team2Id !== undefined ? ov.team2Id : (map?.t2 || '');
          
          list[idx].team1Id = finalT1;
          list[idx].team2Id = finalT2;
          
          // Se o id do time mudou, resetar resultado do mata-mata para requerer simulação
          if (list[idx].status === 'completed' && (!finalT1 || !finalT2)) {
            list[idx].status = 'scheduled';
            list[idx].team1Score = undefined;
            list[idx].team2Score = undefined;
            list[idx].winnerId = undefined;
          }
        }
    }

    // Função de propagação recursiva de mata-mata:
    // Jogo 89 ao Jogo 96 (Oitavas)
    const propagateWinner = (mId: number, sourceId1: number, sourceId2: number) => {
      const match1 = list.find(m => m.id === sourceId1);
      const match2 = list.find(m => m.id === sourceId2);
      const targetIdx = list.findIndex(m => m.id === mId);

      if (targetIdx !== -1) {
        const prevT1 = list[targetIdx].team1Id;
        const prevT2 = list[targetIdx].team2Id;

        const w1Id = match1 && match1.status === 'completed' ? (match1.winnerId || (match1.team1Score! > match1.team2Score! ? match1.team1Id : match1.team2Id)) : '';
        const w2Id = match2 && match2.status === 'completed' ? (match2.winnerId || (match2.team1Score! > match2.team2Score! ? match2.team1Id : match2.team2Id)) : '';

        const ov = activeOverrides[mId];
        const finalT1 = ov?.team1Id !== undefined ? ov.team1Id : w1Id;
        const finalT2 = ov?.team2Id !== undefined ? ov.team2Id : w2Id;

        list[targetIdx].team1Id = finalT1;
        list[targetIdx].team2Id = finalT2;

        if (prevT1 !== finalT1 || prevT2 !== finalT2) {
          list[targetIdx].status = 'scheduled';
          list[targetIdx].team1Score = undefined;
          list[targetIdx].team2Score = undefined;
          list[targetIdx].team1PenScore = undefined;
          list[targetIdx].team2PenScore = undefined;
          list[targetIdx].winnerId = undefined;
        }
      }
    };

    // Oitavas (89 ao 96)
    propagateWinner(89, 73, 74);
    propagateWinner(90, 75, 76);
    propagateWinner(91, 77, 78);
    propagateWinner(92, 79, 80);
    propagateWinner(93, 81, 82);
    propagateWinner(94, 83, 84);
    propagateWinner(95, 85, 86);
    propagateWinner(96, 87, 88);

    // Quartas (97 ao 100)
    propagateWinner(97, 89, 90);
    propagateWinner(98, 91, 92);
    propagateWinner(99, 93, 94);
    propagateWinner(100, 95, 96);

    // Semis (101 e 102)
    propagateWinner(101, 97, 98);
    propagateWinner(102, 99, 100);

    // Disputa de 3º Lugar (103) - envolve perdedores de 101 e 102
    const target3rdIdx = list.findIndex(m => m.id === 103);
    if (target3rdIdx !== -1) {
      const s101 = list.find(m => m.id === 101);
      const s102 = list.find(m => m.id === 102);

      let l101 = '';
      let l102 = '';

      if (s101 && s101.status === 'completed') {
        const w = s101.winnerId || (s101.team1Score! > s101.team2Score! ? s101.team1Id : s101.team2Id);
        l101 = s101.team1Id === w ? s101.team2Id : s101.team1Id;
      }
      if (s102 && s102.status === 'completed') {
        const w = s102.winnerId || (s102.team1Score! > s102.team2Score! ? s102.team1Id : s102.team2Id);
        l102 = s102.team1Id === w ? s102.team2Id : s102.team1Id;
      }

      const prev1 = list[target3rdIdx].team1Id;
      const prev2 = list[target3rdIdx].team2Id;

      const ov = activeOverrides[103];
      const finalT1 = ov?.team1Id !== undefined ? ov.team1Id : l101;
      const finalT2 = ov?.team2Id !== undefined ? ov.team2Id : l102;

      list[target3rdIdx].team1Id = finalT1;
      list[target3rdIdx].team2Id = finalT2;

      if (prev1 !== finalT1 || prev2 !== finalT2) {
        list[target3rdIdx].status = 'scheduled';
        list[target3rdIdx].team1Score = undefined;
        list[target3rdIdx].team2Score = undefined;
        list[target3rdIdx].team1PenScore = undefined;
        list[target3rdIdx].team2PenScore = undefined;
        list[target3rdIdx].winnerId = undefined;
      }
    }

    // Finalíssima (104)
    propagateWinner(104, 101, 102);

    return list;
  };

  // 4. ATUALIZAR PLACAR MANUALMENTE
  const updateMatchScore = (
    matchId: number,
    team1Score: number | undefined,
    team2Score: number | undefined,
    team1PenScore?: number,
    team2PenScore?: number,
    winnerId?: string,
    scorers?: GoalScorer[]
  ) => {
    let updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        // Se ambos os placares estão definidos, marcar como completo
        const isComplete = team1Score !== undefined && team2Score !== undefined;
        
        let determinedWinner = winnerId;
        if (isComplete && m.phase !== 'group') {
          // No mata-mata é preciso desempatar se empatado
          if (team1Score! > team2Score!) {
            determinedWinner = m.team1Id;
          } else if (team2Score! > team1Score!) {
            determinedWinner = m.team2Id;
          } else if (team1PenScore !== undefined && team2PenScore !== undefined) {
            determinedWinner = team1PenScore > team2PenScore ? m.team1Id : m.team2Id;
          } else if (!determinedWinner) {
            // Default penalty-free winner if tied and nothing else specified
            determinedWinner = m.team1Id; 
          }
        }

        const calculatedMotm = isComplete && m.team1Id && m.team2Id
          ? generateMotm(m.team1Id, m.team2Id, team1Score!, team2Score!, m.phase !== 'group', team1PenScore, team2PenScore)
          : (!isComplete ? undefined : m.motm);

        return {
          ...m,
          team1Score,
          team2Score,
          team1PenScore,
          team2PenScore,
          winnerId: determinedWinner,
          status: isComplete ? 'completed' : 'scheduled',
          motm: calculatedMotm,
          scorers: scorers !== undefined ? scorers : m.scorers
        } as Match;
      }
      return m;
    });

    updatedMatches = ensurePlayoffStructure(updatedMatches);
    setMatches(updatedMatches);
    localStorage.setItem('wc_sim_matches', JSON.stringify(updatedMatches));
  };

  // Algoritmo de simulação por PURA PROBABILIDADE com base nos rankings/dados da FIFA
  // Utiliza as notas (ratings) reais das seleções no banco de dados.
  const simulateGols = (rating1: number, rating2: number, isPlayoff: boolean) => {
    // Diferença de ratings FIFA (média base ~ 78; varia de 65 a 93)
    const ratingDiff = rating1 - rating2;

    // Fórmula Sigmoidal para calcular a probabilidade base de vitória do Time 1
    // Ajustada para que uma diferença de 15 pontos de rating dê aprox. 85% de chance de vitória líquida/indireta
    const baseWin1 = 1 / (1 + Math.exp(-ratingDiff / 8.5));

    let pWin1 = 0;
    let pDraw = 0;
    let pWin2 = 0;

    if (!isPlayoff) {
      // Na fase de grupos, existe a possibilidade de empate.
      // O empate é mais comum (até ~26%) quando os times são extremamente equilibrados (ratingDiff = 0)
      // E diminui à medida que a disparidade aumenta.
      pDraw = 0.26 * (1 - Math.abs(baseWin1 - 0.5) * 1.5);
      pDraw = Math.max(0.08, Math.min(0.28, pDraw)); // Limites de segurança entre 8% e 28% de empate
      
      // Redistribuição proporcional da probabilidade restante
      pWin1 = baseWin1 * (1 - pDraw);
      pWin2 = (1 - baseWin1) * (1 - pDraw);
    } else {
      // No mata-mata (playoffs), não existem empates nos 90 minutos do ponto de vista simulação base,
      // mas se o jogo simulado for a prorrogação/pênaltis, podemos representar isso nas pontuações.
      // Para manter a simulação de gols realista, simulamos quem vence o confronto por pura probabilidade.
      pDraw = 0; // Se empate ocorrer no placar gerado abaixo, faremos a disputa por pênaltis de forma limpa.
      pWin1 = baseWin1;
      pWin2 = 1 - baseWin1;
    }

    const roll = Math.random();
    let outcome: 'win1' | 'draw' | 'win2';

    if (!isPlayoff) {
      if (roll < pWin1) {
        outcome = 'win1';
      } else if (roll < pWin1 + pDraw) {
        outcome = 'draw';
      } else {
        outcome = 'win2';
      }
    } else {
      // No mata-mata, se cair em uma margem muito estreita de empate inicial (para simular empates reais no tempo normal),
      // nós mantemos a chance de prorrogação/pênaltis! 
      // Calculamos a chance de empate no tempo normal como ~22% para times equilibrados e menor para desproporcionais
      const playoffNormalTimeDrawProb = 0.22 * (1 - Math.abs(baseWin1 - 0.5) * 1.5);
      const tieRoll = Math.random();
      
      if (tieRoll < Math.max(0.05, playoffNormalTimeDrawProb)) {
        outcome = 'draw';
      } else {
        outcome = roll < baseWin1 ? 'win1' : 'win2';
      }
    }

    let s1 = 0;
    let s2 = 0;

    if (outcome === 'draw') {
      // Moedas equilibradas para empate
      const r = Math.random();
      if (r < 0.25) {
        s1 = 0; s2 = 0;
      } else if (r < 0.70) {
        s1 = 1; s2 = 1;
      } else if (r < 0.95) {
        s1 = 2; s2 = 2;
      } else {
        s1 = 3; s2 = 3;
      }
    } else if (outcome === 'win1') {
      // Time 1 vence. Probabilidades para placares de vitória baseado na força.
      // Quanto maior a disparidade de rating, maior o potencial de placar elástico
      const forceFactor = Math.max(0.5, 1 + (rating1 - rating2) / 12);
      const r = Math.random() * forceFactor;

      if (r < 0.4) {
        s1 = 1; s2 = 0;
      } else if (r < 0.8) {
        s1 = 2; s2 = 1;
      } else if (r < 1.2) {
        s1 = 2; s2 = 0;
      } else if (r < 1.6) {
        s1 = 3; s2 = 1;
      } else if (r < 2.0) {
        s1 = 3; s2 = 0;
      } else if (r < 2.4) {
        s1 = 3; s2 = 2;
      } else {
        s1 = Math.min(6, 4 + Math.floor(Math.random() * 2));
        s2 = Math.floor(Math.random() * (s1 - 1));
      }
    } else {
      // Time 2 vence.
      const forceFactor = Math.max(0.5, 1 + (rating2 - rating1) / 12);
      const r = Math.random() * forceFactor;

      if (r < 0.4) {
        s1 = 0; s2 = 1;
      } else if (r < 0.8) {
        s1 = 1; s2 = 2;
      } else if (r < 1.2) {
        s1 = 0; s2 = 2;
      } else if (r < 1.6) {
        s1 = 1; s2 = 3;
      } else if (r < 2.0) {
        s1 = 0; s2 = 3;
      } else if (r < 2.4) {
        s1 = 2; s2 = 3;
      } else {
        s2 = Math.min(6, 4 + Math.floor(Math.random() * 2));
        s1 = Math.floor(Math.random() * (s2 - 1));
      }
    }

    return { s1, s2 };
  };

  // 5. SIMULAR UM JOGO SELECIONADO
  const simulateSingleMatch = (matchId: number) => {
    const m = matches.find(item => item.id === matchId);
    if (!m || !m.team1Id || !m.team2Id) return;

    const t1 = TEAMS.find(t => t.id === m.team1Id);
    const t2 = TEAMS.find(t => t.id === m.team2Id);
    if (!t1 || !t2) return;

    const { s1, s2 } = simulateGols(t1.rating, t2.rating, m.phase !== 'group');

    let p1: number | undefined;
    let p2: number | undefined;
    let winnerId: string | undefined;

    if (m.phase !== 'group' && s1 === s2) {
      // Se empatou no mata-mata, pênaltis!
      const pRandom = Math.random();
      if (pRandom > 0.5) {
        p1 = 5;
        p2 = 4 - Math.floor(Math.random() * 3);
        winnerId = m.team1Id;
      } else {
        p1 = 4 - Math.floor(Math.random() * 3);
        p2 = 5;
        winnerId = m.team2Id;
      }
    } else if (m.phase !== 'group') {
      winnerId = s1 > s2 ? m.team1Id : m.team2Id;
    }

    updateMatchScore(matchId, s1, s2, p1, p2, winnerId);
  };

  // 6. SIMULAR APENAS A FASE DE GRUPOS (TODOS OS 72 JOGOS)
  const simulateFullGroupStage = () => {
    let list = matches.map(m => {
      if (m.phase === 'group' && m.status === 'scheduled') {
        const t1 = TEAMS.find(t => t.id === m.team1Id)!;
        const t2 = TEAMS.find(t => t.id === m.team2Id)!;
        const { s1, s2 } = simulateGols(t1.rating, t2.rating, false);
        return {
          ...m,
          team1Score: s1,
          team2Score: s2,
          status: 'completed',
          motm: generateMotm(m.team1Id, m.team2Id, s1, s2, false)
        } as Match;
      }
      return m;
    });

    list = ensurePlayoffStructure(list);
    setMatches(list);
    localStorage.setItem('wc_sim_matches', JSON.stringify(list));
  };

  // 7. SIMULAR TODO O TORNEIO (GRUPO + DESDOBRAMENTOS DO MATA-MATA COMPLETO)
  const simulateEntireCup = () => {
    // 1. Simular fase de grupos primeiro
    let list = matches.map(m => {
      if (m.phase === 'group') {
        const t1 = TEAMS.find(t => t.id === m.team1Id)!;
        const t2 = TEAMS.find(t => t.id === m.team2Id)!;
        const { s1, s2 } = simulateGols(t1.rating, t2.rating, false);
        return {
          ...m,
          team1Score: s1,
          team2Score: s2,
          status: 'completed',
          motm: generateMotm(m.team1Id, m.team2Id, s1, s2, false)
        } as Match;
      }
      return m;
    });

    // 2. Classificar e atualizar chaves do mata-mata
    list = ensurePlayoffStructure(list);

    // 3. Simular rodada por rodada sequencialmente, do Jogo 73 ao 104
    const phasesToSimulate: Record<number, boolean> = {};
    for (let i = 73; i <= 104; i++) {
      phasesToSimulate[i] = true;
    }

    // Como as chaves de playoff dependem dos vencedores das fases anteriores, 
    // nós devemos simular e propagar a cada partida singular ordenada pelo ID do Jogo de 73 a 104!
    for (let i = 73; i <= 104; i++) {
      // Recalcular as chaves antes de cada partida para garantir que o vencedor do Jogo anterior 
      // já esteja preenchido nos inputs do jogo atual!
      list = ensurePlayoffStructure(list);
      
      const mIdx = list.findIndex(m => m.id === i);
      if (mIdx !== -1) {
        const m = list[mIdx];
        if (m.team1Id && m.team2Id) {
          const t1 = TEAMS.find(t => t.id === m.team1Id);
          const t2 = TEAMS.find(t => t.id === m.team2Id);
          
          if (t1 && t2) {
            const { s1, s2 } = simulateGols(t1.rating, t2.rating, true);
            list[mIdx].team1Score = s1;
            list[mIdx].team2Score = s2;
            list[mIdx].status = 'completed';

            if (s1 === s2) {
              const pRandom = Math.random();
              if (pRandom > 0.5) {
                list[mIdx].team1PenScore = 5;
                list[mIdx].team2PenScore = Math.floor(Math.random() * 4);
                list[mIdx].winnerId = m.team1Id;
              } else {
                list[mIdx].team1PenScore = Math.floor(Math.random() * 4);
                list[mIdx].team2PenScore = 5;
                list[mIdx].winnerId = m.team2Id;
              }
            } else {
              list[mIdx].winnerId = s1 > s2 ? m.team1Id : m.team2Id;
            }

            // Atribuir o jogador destaque (MotM)
            list[mIdx].motm = generateMotm(
              m.team1Id,
              m.team2Id,
              s1,
              s2,
              true,
              list[mIdx].team1PenScore,
              list[mIdx].team2PenScore
            );
          }
        }
      }
    }

    // Certificar um recalculo final totalizador
    list = ensurePlayoffStructure(list);
    setMatches(list);
    localStorage.setItem('wc_sim_matches', JSON.stringify(list));
  };

  // 8. RESET TOTAL DA COPA
  const resetSimulator = () => {
    localStorage.removeItem('wc_sim_matches');
    localStorage.removeItem('wc_custom_thirds');
    localStorage.removeItem('wc_playoff_overrides');
    setPlayoffOverrides({});
    setCustomThirdPlaceQualifierIdsReal([]);
    const initial = getInitialMatches();
    const restarted = ensurePlayoffStructure(initial, [], {});
    setMatches(restarted);
    
    // reset mode and custom order to defaults
    setSimulationModeReal('scores');
    localStorage.setItem('wc_simulation_mode', 'scores');
    const defaultOrder: Record<string, string[]> = {};
    GROUPS_LIST.forEach(gChar => {
      defaultOrder[gChar] = TEAMS.filter(t => t.group === gChar).map(t => t.id);
    });
    setGroupStandingsOrder(defaultOrder);
    localStorage.setItem('wc_group_standings_order', JSON.stringify(defaultOrder));
  };

  const simulatePlayoffPhase = (
    phase: 'round_of_32' | 'round_of_16' | 'quarter_finals' | 'semi_finals' | 'third_place' | 'final'
  ) => {
    let list = [...matches];
    list = ensurePlayoffStructure(list);

    const phaseMatches = list.filter(m => m.phase === phase);
    let updatedCount = 0;

    list = list.map(m => {
      if (m.phase === phase && m.team1Id && m.team2Id) {
        const t1 = TEAMS.find(t => t.id === m.team1Id);
        const t2 = TEAMS.find(t => t.id === m.team2Id);
        if (t1 && t2) {
          const { s1, s2 } = simulateGols(t1.rating, t2.rating, true);
          let p1: number | undefined;
          let p2: number | undefined;
          let winnerId = '';

          if (s1 === s2) {
            const pRandom = Math.random();
            if (pRandom > 0.5) {
              p1 = 5;
              p2 = Math.floor(Math.random() * 4);
              winnerId = m.team1Id;
            } else {
              p1 = Math.floor(Math.random() * 4);
              p2 = 5;
              winnerId = m.team2Id;
            }
          } else {
            winnerId = s1 > s2 ? m.team1Id : m.team2Id;
          }

          updatedCount++;
          const calcMotm = generateMotm(m.team1Id, m.team2Id, s1, s2, true, p1, p2);
          return {
            ...m,
            team1Score: s1,
            team2Score: s2,
            team1PenScore: p1,
            team2PenScore: p2,
            winnerId,
            status: 'completed',
            motm: calcMotm
          } as Match;
        }
      }
      return m;
    });

    if (updatedCount > 0) {
      list = ensurePlayoffStructure(list);
      setMatches(list);
      localStorage.setItem('wc_sim_matches', JSON.stringify(list));
    }
  };

  const applyStandingsToAllMatches = (
    currentOrder: Record<string, string[]>,
    currentThirds: string[]
  ) => {
    let updated = matches.map(m => {
      if (m.phase === 'group' && m.group) {
        const order = currentOrder[m.group];
        if (order) {
          const r1 = order.indexOf(m.team1Id);
          const r2 = order.indexOf(m.team2Id);
          if (r1 !== -1 && r2 !== -1) {
            let s1 = 0;
            let s2 = 0;
            if (r1 < r2) {
              if (r1 === 0 && r2 === 1) { s1 = 2; s2 = 0; }
              else if (r1 === 0 && r2 === 2) { s1 = 3; s2 = 0; }
              else if (r1 === 0 && r2 === 3) { s1 = 4; s2 = 0; }
              else if (r1 === 1 && r2 === 2) { s1 = 2; s2 = 1; }
              else if (r1 === 1 && r2 === 3) { s1 = 2; s2 = 0; }
              else if (r1 === 2 && r2 === 3) { s1 = 1; s2 = 0; }
            } else {
              if (r2 === 0 && r1 === 1) { s1 = 0; s2 = 2; }
              else if (r2 === 0 && r1 === 2) { s1 = 0; s2 = 3; }
              else if (r2 === 0 && r1 === 3) { s1 = 0; s2 = 4; }
              else if (r2 === 1 && r1 === 2) { s1 = 1; s2 = 2; }
              else if (r2 === 1 && r1 === 3) { s1 = 0; s2 = 2; }
              else if (r2 === 2 && r1 === 3) { s1 = 0; s2 = 1; }
            }
            return {
              ...m,
              team1Score: s1,
              team2Score: s2,
              status: 'completed'
            } as Match;
          }
        }
      }
      return m;
    });

    updated = ensurePlayoffStructure(updated, currentThirds);
    setMatches(updated);
    localStorage.setItem('wc_sim_matches', JSON.stringify(updated));
  };

  const setSimulationMode = (mode: 'scores' | 'standings') => {
    setSimulationModeReal(mode);
    localStorage.setItem('wc_simulation_mode', mode);
    if (mode === 'standings') {
      applyStandingsToAllMatches(groupStandingsOrder, customThirdPlaceQualifierIds);
    }
  };

  const updateGroupStandingsOrder = (groupChar: string, order: string[]) => {
    const newOrder = {
      ...groupStandingsOrder,
      [groupChar]: order
    };
    setGroupStandingsOrder(newOrder);
    localStorage.setItem('wc_group_standings_order', JSON.stringify(newOrder));
    if (simulationMode === 'standings') {
      applyStandingsToAllMatches(newOrder, customThirdPlaceQualifierIds);
    }
  };

  const setCustomThirdPlaceQualifierIds = (ids: string[]) => {
    setCustomThirdPlaceQualifierIdsReal(ids);
    localStorage.setItem('wc_custom_thirds', JSON.stringify(ids));
    if (simulationMode === 'standings') {
      applyStandingsToAllMatches(groupStandingsOrder, ids);
    } else {
      setMatches(prev => ensurePlayoffStructure(prev, ids));
    }
  };

  const overridePlayoffTeam = (matchId: number, slot: 1 | 2, teamId: string) => {
    const updatedOverrides = {
      ...playoffOverrides,
      [matchId]: {
        ...playoffOverrides[matchId],
        [slot === 1 ? 'team1Id' : 'team2Id']: teamId === '' ? undefined : teamId
      }
    };

    if (updatedOverrides[matchId] && updatedOverrides[matchId].team1Id === undefined && updatedOverrides[matchId].team2Id === undefined) {
      delete updatedOverrides[matchId];
    }

    setPlayoffOverrides(updatedOverrides);
    localStorage.setItem('wc_playoff_overrides', JSON.stringify(updatedOverrides));

    setMatches(prev => {
      const matchesWithDirectUpdate = prev.map(m => {
        if (m.id === matchId) {
          const isT1 = slot === 1;
          return {
            ...m,
            team1Id: isT1 ? teamId : m.team1Id,
            team2Id: !isT1 ? teamId : m.team2Id,
            status: 'scheduled',
            team1Score: undefined,
            team2Score: undefined,
            team1PenScore: undefined,
            team2PenScore: undefined,
            winnerId: undefined
          } as Match;
        }
        return m;
      });

      const updated = ensurePlayoffStructure(matchesWithDirectUpdate, undefined, updatedOverrides);
      localStorage.setItem('wc_sim_matches', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <SimulatorContext.Provider
      value={{
        matches,
        userPredictions,
        userName,
        setUserName,
        favoriteChampion,
        setFavoriteChampion,
        activeTab,
        setActiveTab,
        simulationStep,
        setSimulationStep,
        groupStandings,
        savePrediction,
        deletePrediction,
        updateMatchScore,
        simulateSingleMatch,
        simulateFullGroupStage,
        simulateEntireCup,
        resetSimulator,
        simulatePlayoffPhase,
        simulationMode,
        setSimulationMode,
        groupStandingsOrder,
        updateGroupStandingsOrder,
        customThirdPlaceQualifierIds,
        setCustomThirdPlaceQualifierIds,
        applyStandingsToAllMatches,
        thirdPlaceTeams,
        defaultSortedThirds,
        playoffOverrides,
        overridePlayoffTeam
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};
