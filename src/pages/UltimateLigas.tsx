/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { LEAGUES_DATA, LeaguePlayer } from '../data/leaguesPlayers';
import { Formation, FormationSlot, FORMATIONS } from './UltimateTeam';
import { 
  Trophy, Users, Shield, Plus, X, RotateCcw, Save, Trash2, 
  Check, Star, Sparkles, AlertCircle, Copy, HelpCircle,
  TrendingUp, CircleDollarSign, Compass, Info
} from 'lucide-react';

export const UltimateLigas: React.FC = () => {
  // Liga Ativa (Inicial: Brasileirão 2026)
  const [activeLeagueId, setActiveLeagueId] = useState<string>('brasileirao_26');
  
  // Título e Nome do Time da Liga
  const [teamName, setTeamName] = useState<string>('');
  const [formation, setFormation] = useState<Formation>('4-3-3');
  
  // Array de 11 strings (IDs dos jogadores) correspondente a cada slot da formação ativa
  const [selectedSquad, setSelectedSquad] = useState<(string | null)[]>(Array(11).fill(null));

  // Números personalizados das camisas dos 11 slots
  const [jerseyNumbers, setJerseyNumbers] = useState<string[]>(['1', '6', '3', '4', '2', '5', '8', '10', '11', '9', '7']);
  
  // Slot atualmente selecionado pelo usuário para editar
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(0);
  
  // Cor do uniforme
  const [jerseyColor, setJerseyColor] = useState<string>('#3b82f6');

  // Sistema de Toasts e Modais sem window.alert ou confirm
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  const [exportedText, setExportedText] = useState<string | null>(null);
  const [editingJerseyIndex, setEditingJerseyIndex] = useState<number | null>(null);
  const [tempJerseyNum, setTempJerseyNum] = useState<string>('');

  // Filtros de Pesquisa na Sidebar
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPos, setFilterPos] = useState<string>('ALL');

  // Modo Limite de Orçamento ($100M)
  const [useBudgetLimit, setUseBudgetLimit] = useState<boolean>(true);

  // Helper de Toast
  const addNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4500);
  };

  // Carregar do localStorage quando a liga mudar (Cada liga tem seu time independente!)
  useEffect(() => {
    const sSquad = localStorage.getItem(`wc_league_squad_${activeLeagueId}`);
    const sName = localStorage.getItem(`wc_league_team_name_${activeLeagueId}`);
    const sForm = localStorage.getItem(`wc_league_formation_${activeLeagueId}`);
    const sColor = localStorage.getItem(`wc_league_jersey_color_${activeLeagueId}`);
    const sNumbers = localStorage.getItem(`wc_league_jersey_numbers_${activeLeagueId}`);

    const activeLeague = LEAGUES_DATA[activeLeagueId];

    if (sSquad) {
      try {
        const parsed = JSON.parse(sSquad);
        if (Array.isArray(parsed)) {
          setSelectedSquad(parsed);
        } else {
          setSelectedSquad(Array(11).fill(null));
        }
      } catch (e) {
        setSelectedSquad(Array(11).fill(null));
      }
    } else {
      setSelectedSquad(Array(11).fill(null));
    }

    if (sNumbers) {
      try {
        const parsed = JSON.parse(sNumbers);
        if (Array.isArray(parsed)) {
          setJerseyNumbers(parsed);
        } else {
          setJerseyNumbers(['1', '6', '3', '4', '2', '5', '8', '10', '11', '9', '7']);
        }
      } catch (e) {
        setJerseyNumbers(['1', '6', '3', '4', '2', '5', '8', '10', '11', '9', '7']);
      }
    } else {
      setJerseyNumbers(['1', '6', '3', '4', '2', '5', '8', '10', '11', '9', '7']);
    }

    setTeamName(sName || `All-Star ${activeLeague?.name || ''}`);
    setFormation((sForm as Formation) || '4-3-3');
    
    // Cor padrão baseada na liga se não estiver salva
    if (sColor) {
      setJerseyColor(sColor);
    } else {
      if (activeLeagueId === 'brasileirao_26') setJerseyColor('#10b981'); // Emerald
      else if (activeLeagueId === 'libertadores') setJerseyColor('#f59e0b'); // Amber
      else if (activeLeagueId === 'champions_league') setJerseyColor('#1e3a8a'); // Blue-dark
      else if (activeLeagueId === 'sudamericana') setJerseyColor('#64748b'); // Slate
      else if (activeLeagueId === 'premier_league') setJerseyColor('#a855f7'); // Purple
      else if (activeLeagueId === 'la_liga') setJerseyColor('#ef4444'); // Red
      else setJerseyColor('#1e293b'); // Dark
    }

    setActiveSlotIndex(0); // Foca o primeiro slot (geralmente Goleiro)
  }, [activeLeagueId]);

  // Carregar flag do Budget Limit
  useEffect(() => {
    const stored = localStorage.getItem('wc_league_use_budget_limit');
    if (stored) setUseBudgetLimit(stored === 'true');
  }, []);

  // Persistir Budget Limit globalmente
  useEffect(() => {
    localStorage.setItem('wc_league_use_budget_limit', String(useBudgetLimit));
  }, [useBudgetLimit]);

  // Sincronizar e salvar no localStorage da liga ativa ao editar o elenco
  const saveStateForLeague = (squad: (string | null)[]) => {
    localStorage.setItem(`wc_league_squad_${activeLeagueId}`, JSON.stringify(squad));
  };

  const saveNameForLeague = (name: string) => {
    localStorage.setItem(`wc_league_team_name_${activeLeagueId}`, name);
  };

  const saveFormationForLeague = (form: Formation) => {
    localStorage.setItem(`wc_league_formation_${activeLeagueId}`, form);
  };

  const saveColorForLeague = (color: string) => {
    localStorage.setItem(`wc_league_jersey_color_${activeLeagueId}`, color);
  };

  const saveNumbersForLeague = (numbers: string[]) => {
    localStorage.setItem(`wc_league_jersey_numbers_${activeLeagueId}`, JSON.stringify(numbers));
  };

  // Preço fictício por rating
  const getPlayerPrice = (rating: number): number => {
    if (rating >= 91) return 25;
    if (rating === 90) return 20;
    if (rating === 89) return 15;
    if (rating === 88) return 12;
    if (rating === 87) return 10;
    if (rating === 86) return 8;
    if (rating === 85) return 6;
    if (rating === 84) return 5;
    return 4; // complementar
  };

  // Jogadores escalados na liga ativa
  const squadPlayers = useMemo(() => {
    const list = LEAGUES_DATA[activeLeagueId]?.players || [];
    return selectedSquad
      .map(id => list.find(p => p.id === id))
      .filter((p): p is LeaguePlayer => !!p);
  }, [selectedSquad, activeLeagueId]);

  // Custo agregado do elenco
  const totalSquadCost = useMemo(() => {
    return squadPlayers.reduce((acc, p) => acc + getPlayerPrice(p.rating), 0);
  }, [squadPlayers]);

  const budgetRemaining = 100 - totalSquadCost;

  // Força média (Rating do elenco)
  const teamRating = useMemo(() => {
    if (squadPlayers.length === 0) return 0;
    const total = squadPlayers.reduce((sum, p) => sum + p.rating, 0);
    return Math.round(total / squadPlayers.length);
  }, [squadPlayers]);

  // Entrosamento / Química (mesmo país e colocação tática)
  const teamChemistry = useMemo(() => {
    if (squadPlayers.length === 0) return 0;

    let chemPoints = 0;
    const currentSlots = FORMATIONS[formation] || FORMATIONS['4-3-3'];

    // 1. Jogador na vaga certa (GK, DF, MC, AT)
    selectedSquad.forEach((pId, idx) => {
      if (!pId) return;
      const player = LEAGUES_DATA[activeLeagueId]?.players.find(p => p.id === pId);
      const slot = currentSlots[idx];
      if (player && slot && player.position === slot.position) {
        chemPoints += 4; // Vaga correta de campo
      }
    });

    // 2. Nação (jogadores do mesmo país)
    const countriesCount: Record<string, number> = {};
    squadPlayers.forEach(p => {
      countriesCount[p.country] = (countriesCount[p.country] || 0) + 1;
    });

    Object.values(countriesCount).forEach(count => {
      if (count >= 2) {
        chemPoints += count * 4.5; // Combo patriótico
      }
    });

    return Math.min(100, Math.round(chemPoints + (squadPlayers.length * 2)));
  }, [selectedSquad, formation, squadPlayers, activeLeagueId]);

  const slots = FORMATIONS[formation] || FORMATIONS['4-3-3'];

  // Atribuir jogador ao slot ativo
  const handleSelectPlayer = (player: LeaguePlayer) => {
    if (activeSlotIndex === null) return;

    const existingIndex = selectedSquad.indexOf(player.id);
    const updatedSquad = [...selectedSquad];

    // Limitar orçamento fictício
    if (useBudgetLimit && existingIndex === -1) {
      const prevPlayerId = selectedSquad[activeSlotIndex];
      const prevPlayer = prevPlayerId ? LEAGUES_DATA[activeLeagueId]?.players.find(p => p.id === prevPlayerId) : null;
      const prevCost = prevPlayer ? getPlayerPrice(prevPlayer.rating) : 0;
      const newCost = getPlayerPrice(player.rating);
      const diffCost = newCost - prevCost;

      if (totalSquadCost + diffCost > 100) {
        addNotification(`🚨 Moedas Virtuais Esgotadas! ${player.name} custa $${newCost}M (Saldo para este slot: $${budgetRemaining + prevCost}M).`, 'error');
        return;
      }
    }

    // Se o jogador escolhido já está em outra posição, inverte posições
    if (existingIndex !== -1) {
      updatedSquad[existingIndex] = selectedSquad[activeSlotIndex];
    }

    updatedSquad[activeSlotIndex] = player.id;
    setSelectedSquad(updatedSquad);
    saveStateForLeague(updatedSquad);

    addNotification(`${player.name} foi escalado na posição: ${slots[activeSlotIndex].label}!`, 'success');

    // Focar no próximo slot livre
    const nextEmptyIndex = updatedSquad.findIndex((p, i) => p === null && i > activeSlotIndex);
    if (nextEmptyIndex !== -1) {
      setActiveSlotIndex(nextEmptyIndex);
    } else {
      const firstEmptyIndex = updatedSquad.findIndex(p => p === null);
      if (firstEmptyIndex !== -1) {
        setActiveSlotIndex(firstEmptyIndex);
      }
    }
  };

  // Remover jogador do campo
  const handleRemovePlayerFromSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Não focar o slot removido
    const pId = selectedSquad[index];
    if (!pId) return;

    const player = LEAGUES_DATA[activeLeagueId]?.players.find(p => p.id === pId);
    const updatedSquad = [...selectedSquad];
    updatedSquad[index] = null;
    
    setSelectedSquad(updatedSquad);
    saveStateForLeague(updatedSquad);

    if (player) {
      addNotification(`${player.name} foi removido da escalação.`, 'info');
    }
  };

  // Limpar escalação completa da liga atual
  const handleClearSquad = () => {
    const empty = Array(11).fill(null);
    setSelectedSquad(empty);
    saveStateForLeague(empty);
    setShowClearConfirm(false);
    addNotification('Toda a escalação desta liga foi removida com sucesso. Re-organize sua equipe!', 'success');
  };

  // Exportar para texto
  const exportToText = () => {
    const activeLeague = LEAGUES_DATA[activeLeagueId];
    let template = `MEU TIME DE LIGA FAMOSA (${activeLeague?.name || ''})\n\n`;
    template += `Esquadrão: ${teamName.toUpperCase()}\n`;
    template += `Formação Tática: ${formation}\n`;
    template += `Geral Médio: ${teamRating} GER\n`;
    template += `Química Entrosada: ${teamChemistry}/100\n`;
    template += `Custo Estimado: $${totalSquadCost}M\n\n`;
    template += `LINEUP TITULAR DE CRAQUES:\n`;

    slots.forEach((slot, i) => {
      const pId = selectedSquad[slot.index];
      const player = pId ? LEAGUES_DATA[activeLeagueId]?.players.find(p => p.id === pId) : null;
      if (player) {
        template += `  [Nº ${jerseyNumbers[slot.index] || (slot.index + 1)}] - ${slot.label}: ${player.flag} ${player.name} (${player.rating} GER) • ${player.club}\n`;
      } else {
        template += `  [Slot vazio] - ${slot.label}: Ninguém escalado ainda\n`;
      }
    });

    template += `\nMonte o seu também no WC Predictor 2026!`;

    navigator.clipboard.writeText(template)
      .then(() => {
        setExportedText(template);
        addNotification('Copiado para a área de transferência! Compartilhe com amigos.', 'success');
      })
      .catch(() => {
        addNotification('Falha ao copiar automaticamente para a área de transferência.', 'error');
      });
  };

  // Filtragem de catálogo
  const filteredPlayers = useMemo(() => {
    const list = LEAGUES_DATA[activeLeagueId]?.players || [];
    return list.slice().sort((a,b) => b.rating - a.rating).filter(p => {
      // Filtro de Busca
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.country.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      // Filtro de Posição
      if (filterPos !== 'ALL' && p.position !== filterPos) return false;

      return true;
    });
  }, [activeLeagueId, searchQuery, filterPos]);

  // Iniciar edição de Camisa
  const openJerseyModal = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingJerseyIndex(index);
    setTempJerseyNum(jerseyNumbers[index] || String(index + 1));
  };

  // Salvar número da camisa
  const saveJerseyNumber = () => {
    if (editingJerseyIndex === null) return;
    const num = tempJerseyNum.trim().slice(0, 3); // max 3 algarismos
    const updated = [...jerseyNumbers];
    updated[editingJerseyIndex] = num || String(editingJerseyIndex + 1);
    
    setJerseyNumbers(updated);
    saveNumbersForLeague(updated);
    setEditingJerseyIndex(null);
    addNotification('Número da camisa personalizado com sucesso! 👕', 'success');
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900 pb-12">
      
      {/* Toast Notification HUD */}
      <div className="fixed bottom-5 right-5 z-80 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-sm shadow-xl flex items-start gap-3 border text-xs font-medium animate-slideIn ${
              n.type === 'success' 
                ? 'bg-emerald-50 border-emerald-250 text-emerald-800' 
                : n.type === 'error'
                  ? 'bg-red-50 border-red-250 text-red-800'
                  : n.type === 'warning'
                    ? 'bg-amber-50 border-amber-250 text-amber-800'
                    : 'bg-blue-50 border-blue-250 text-blue-800'
            }`}
          >
            <div className="text-sm shrink-0">
              {n.type === 'success' && '✅'}
              {n.type === 'error' && '🚨'}
              {n.type === 'warning' && '⚠️'}
              {n.type === 'info' && 'ℹ️'}
            </div>
            <div className="flex-1 leading-tight">{n.message}</div>
          </div>
        ))}
      </div>

      {/* Editor do Nome e Configurações */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-6 shadow-xs">
        
        {/* Cabeçalho */}
        <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-black uppercase text-blue-600 tracking-widest flex items-center gap-1">
              <Compass className="h-3.5 w-3.5" /> FANTASY MATCHMAKER • MULTI-LEAGUE HUB
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-slate-950 uppercase">
              Ultimate Team Ligas Famosas
            </h1>
            <p className="text-slate-500 text-xs max-w-xl font-medium">
              Antes de arrumar as estrelas, selecione qual liga deseja governar. Selecionamos os 40 melhores craques em atividade de cada uma das 7 famosas copas para você recrutar seu squad ideal.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              id="clean-squad-btn-ligas"
              onClick={() => setShowClearConfirm(true)}
              className="py-2.5 px-4 rounded-sm border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Limpar Elenco</span>
            </button>
            <button
              id="export-text-btn-ligas"
              onClick={exportToText}
              className="py-2.5 px-4 rounded-sm bg-slate-950 text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>Exportar Linup</span>
            </button>
          </div>
        </div>

        {/* Liga Famosa Ativa Selector - 7 Ligas */}
        <div className="space-y-2">
          <label className="text-[9.5px] font-mono font-black uppercase text-slate-500 tracking-wider">
            1. SELECIONE A LIGA DE DESEJO (GERENCIA ATLETRAS INDEPENDENTES)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {Object.values(LEAGUES_DATA).map((lg) => {
              const isActive = activeLeagueId === lg.id;
              return (
                <button
                  key={lg.id}
                  onClick={() => setActiveLeagueId(lg.id)}
                  className={`p-3 rounded-sm border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-[82px] ${
                    isActive 
                      ? 'border-slate-950 bg-slate-950 text-white ring-2 ring-slate-950/25 shadow-md scale-102' 
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-350 text-slate-800'
                  }`}
                >
                  <div className="text-xl leading-none">{lg.emoji}</div>
                  <div>
                    <h3 className="font-display font-extrabold text-[11px] leading-tight select-none truncate">
                      {lg.name}
                    </h3>
                    <span className={`text-[8px] font-mono font-bold uppercase mt-0.5 inline-block px-1 rounded-xs ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      40 Craques
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Informações Auxiliares */}
        <div className={`p-3 rounded-sm border bg-slate-50 text-xs text-slate-600 flex gap-2.5 items-start ${
          activeLeagueId === 'brasileirao_26' ? 'border-emerald-250/30 bg-emerald-50/30' :
          activeLeagueId === 'libertadores' ? 'border-amber-250/30 bg-amber-50/30' :
          activeLeagueId === 'champions_league' ? 'border-blue-250/30 bg-blue-50/30' : 'border-slate-205 bg-slate-50/80'
        }`}>
          <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-tight">
            Você está administrando a liga <strong>{LEAGUES_DATA[activeLeagueId]?.name}</strong>: 
            <span className="text-slate-500 font-medium font-sans"> {LEAGUES_DATA[activeLeagueId]?.description}</span>
          </p>
        </div>

        {/* Nome do Time / Esquema / Cor */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <div className="md:col-span-1">
            <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Nome da Equipe</label>
            <input
              id="league-team-name-input"
              type="text"
              value={teamName}
              onChange={(e) => {
                const checkedName = e.target.value.slice(0, 32);
                setTeamName(checkedName);
                saveNameForLeague(checkedName);
              }}
              className="mt-1.5 w-full bg-slate-50 border border-slate-250 focus:border-blue-500 rounded-sm px-3 py-2 text-slate-800 font-bold text-xs focus:ring-1 focus:ring-blue-500/10 focus:outline-none"
              placeholder="Ex: Dream Team"
            />
          </div>

          <div>
            <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Esquema Tático (Alinhamento)</label>
            <select
              id="league-formation-select"
              value={formation}
              onChange={(e) => {
                const newForm = e.target.value as Formation;
                setFormation(newForm);
                saveFormationForLeague(newForm);
              }}
              className="mt-1.5 w-full bg-slate-50 border border-slate-250 focus:border-blue-500 rounded-sm px-3 py-2 text-slate-800 font-bold text-xs cursor-pointer focus:outline-none"
            >
              <option value="4-3-3">4-3-3 (Clássico)</option>
              <option value="4-4-2">4-4-2 (Sólido)</option>
              <option value="3-4-3">3-4-3 (Ofensivo)</option>
              <option value="3-5-2">3-5-2 (Dominante)</option>
              <option value="4-1-2-1-2">4-1-2-1-2 (Losango Fechado)</option>
              <option value="4-2-3-1">4-2-3-1 (Equilibrado)</option>
              <option value="4-5-1">4-5-1 (Posse de Bola)</option>
              <option value="4-3-2-1">4-3-2-1 (Árvore de Natal)</option>
              <option value="5-3-2">5-3-2 (Muralha Defensiva)</option>
              <option value="5-4-1">5-4-1 (Contra-Ataque)</option>
              <option value="3-4-1-2">3-4-1-2 (Três Zagueiros & Meia)</option>
              <option value="3-4-2-1">3-4-2-1 (Modernidade Tática)</option>
              <option value="4-2-4">4-2-4 (Ataque Total)</option>
              <option value="4-2-2-2">4-2-2-2 (Quadrado Mágico)</option>
              <option value="4-3-1-2">4-3-1-2 (Losango Aberto)</option>
              <option value="4-1-4-1">4-1-4-1 (Pressão Média)</option>
              <option value="4-4-1-1">4-4-1-1 (Segundo Atacante)</option>
              <option value="5-2-1-2">5-2-1-2 (Alas & Armador)</option>
              <option value="3-1-4-2">3-1-4-2 (Posse Triangulada)</option>
            </select>
          </div>

          <div>
            <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Uniforme Principal</label>
            <div className="flex gap-2 mt-1.5">
              {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#1e293b', '#ffffff'].map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setJerseyColor(color);
                    saveColorForLeague(color);
                  }}
                  style={{ backgroundColor: color }}
                  className={`w-7 h-7 rounded-sm border cursor-pointer transition-all ${
                    jerseyColor === color ? 'border-slate-800 scale-110 shadow-xs' : 'border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Teto Orçamento ($100M)</label>
            <div className="mt-1.5 flex gap-2">
              <button
                id="budget-ligas-toggle-btn"
                onClick={() => setUseBudgetLimit(!useBudgetLimit)}
                className={`w-full py-2 px-3 rounded-sm text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  useBudgetLimit 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-slate-50 border border-slate-250 text-slate-500 hover:text-slate-800'
                }`}
              >
                {useBudgetLimit ? 'ATIVADO (Max $100M)' : 'DESATIVADO'}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Seção Principal de Montagem de Time */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Campo de Futebol (Lado Esquerdo - Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Caixa de Scorecard do Time */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Força Geral */}
            <div className="bg-white border border-slate-200 p-3 rounded-sm flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Rating Geral</span>
                <span className="text-2xl font-mono font-black text-slate-900">{teamRating}</span>
              </div>
              <div className="w-10 h-10 bg-blue-50 border border-blue-150 text-blue-600 rounded-sm flex items-center justify-center font-black text-xs font-mono">
                GER
              </div>
            </div>

            {/* Química */}
            <div className="bg-white border border-slate-200 p-3 rounded-sm flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Afinidade</span>
                <span className="text-2xl font-mono font-black text-slate-900">{teamChemistry}<span className="text-xs text-slate-400">/100</span></span>
              </div>
              <div className="w-10 h-10 bg-emerald-50 border border-emerald-150 text-[10px] text-emerald-600 rounded-sm flex items-center justify-center font-mono font-black">
                CHEM
              </div>
            </div>

            {/* Convocados */}
            <div className="bg-white border border-slate-200 p-3 rounded-sm flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Titulares</span>
                <span className="text-2xl font-mono font-black text-slate-900">{squadPlayers.length}<span className="text-xs text-slate-400">/11</span></span>
              </div>
              <div className="w-10 h-10 bg-slate-50 text-[10px] text-slate-500 border border-slate-200 rounded-sm flex items-center justify-center font-mono font-black">
                SQUAD
              </div>
            </div>

            {/* Moedas */}
            <div className={`bg-white border p-3 rounded-sm flex items-center justify-between shadow-xs transition-all duration-300 ${
              useBudgetLimit 
                ? budgetRemaining < 0 
                  ? 'border-red-500 bg-red-50' 
                  : budgetRemaining < 15 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-blue-500 bg-blue-50/50'
                : 'border-slate-200'
            }`}>
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Saldo Restante</span>
                <span className={`text-xl font-mono font-black leading-tight ${
                  useBudgetLimit 
                    ? budgetRemaining < 0 
                      ? 'text-red-650' 
                      : budgetRemaining < 15 
                        ? 'text-amber-650' 
                        : 'text-blue-650'
                    : 'text-slate-800'
                }`}>
                  {useBudgetLimit ? `$${budgetRemaining}M` : `$${totalSquadCost}M`}
                </span>
                <span className="text-[8px] text-slate-500 font-mono block uppercase mt-0.5 leading-none">
                  Gasto: ${totalSquadCost}M
                </span>
              </div>
              <div className="w-10 h-10 rounded-sm flex items-center justify-center text-xs font-black text-slate-500">
                $
              </div>
            </div>
          </div>

          {/* Warning de Orçamento Estourado */}
          {useBudgetLimit && budgetRemaining < 0 && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm text-xs flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>
                <strong>Teto salarial estourado para esta liga!</strong> O elenco escalado gasta <strong>${totalSquadCost}M</strong>. Remova jogadores caros ou desative o Limite de Orçamento no painel superior.
              </span>
            </div>
          )}

          {/* O Campo de Futebol Visual */}
          <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-950 to-slate-900 border border-white/10 rounded-sm overflow-hidden shadow-2xl select-none">
            
            {/* Visual Striped Grass Overlay */}
            <div className="absolute inset-0 grid grid-rows-10 pointer-events-none opacity-[0.05]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`w-full h-full ${i % 2 === 0 ? 'bg-slate-200/40' : 'bg-transparent'}`} />
              ))}
            </div>

            {/* Linhas de Marcação do Campo (Cor Branca Translúcida) */}
            <div className="absolute inset-0 pointer-events-none border border-slate-300/45 m-3">
              {/* Linha do Meio Campo */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-300/45 -translate-y-1/2" />
              {/* Círculo Central */}
              <div className="absolute top-1/2 left-1/2 w-28 h-28 border border-slate-300/45 rounded-full -translate-x-1/2 -translate-y-1/2" />
              {/* Grande Área Inferior */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t border-x border-slate-300/45" />
              {/* Pequena Área Inferior */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 border-t border-x border-slate-300/45" />
              {/* Grande Área Superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b border-x border-slate-300/45" />
              {/* Pequena Área Superior */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 border-b border-x border-slate-300/45" />
            </div>

            {/* Renderização Dinâmica de cada Slot por Formação na Posição de Campo */}
            {slots.map((slot) => {
              const playerInSlot = selectedSquad[slot.index] 
                ? LEAGUES_DATA[activeLeagueId]?.players.find(p => p.id === selectedSquad[slot.index]) 
                : null;
              const isActive = activeSlotIndex === slot.index;

              return (
                <div
                  id={`league-field-slot-${slot.index}`}
                  key={slot.index}
                  style={{ top: slot.top, left: slot.left }}
                  onClick={() => setActiveSlotIndex(slot.index)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center cursor-pointer group"
                >
                  {/* Camisa Nº Badge flutuante - Clicável para customizar número */}
                  {playerInSlot && (
                    <div 
                      onClick={(e) => openJerseyModal(slot.index, e)}
                      title="Editar número da camisa"
                      className="absolute -top-1.5 -left-1.5 bg-blue-600 hover:bg-blue-700 text-white w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] font-mono z-30 shadow-md border border-white cursor-help active:scale-95 transition-all"
                    >
                      {jerseyNumbers[slot.index] || (slot.index + 1)}
                    </div>
                  )}
                  
                  {/* Círculo do Jogador */}
                  <div className={`relative transition-all duration-300 rounded-full flex items-center justify-center ${
                    playerInSlot ? 'w-14 h-14' : 'w-11 h-11'
                  } ${
                    isActive 
                      ? 'border-2 border-blue-600 bg-blue-50 shadow-md scale-110' 
                      : 'border-2 border-slate-200 bg-white group-hover:border-slate-400 group-hover:bg-slate-50'
                  }`}>
                    
                    {playerInSlot ? (
                       // Cartão / Avatar Simplificado do Craque Escalado da Liga
                      <div className="w-full h-full flex flex-col items-center justify-center rounded-full overflow-hidden text-center select-none bg-white border border-slate-150 relative">
                        <div className="absolute top-1 text-[11px] text-slate-800 font-extrabold tracking-tight select-none leading-none">
                          {playerInSlot.rating}
                        </div>
                        <div 
                          className="absolute inset-x-0 bottom-0 h-4 bg-slate-50 border-t border-slate-100"
                        />
                        <div className="font-sans text-[8px] font-bold text-slate-750 mt-2.5 leading-none select-none z-10 px-0.5 truncate max-w-[50px]">
                          {playerInSlot.name.split(' ').pop()?.toUpperCase()}
                        </div>
                        
                        {/* Indicador de Posição ou Preço */}
                        <div className="absolute bottom-0 text-[7px] font-mono leading-none scale-90 select-none z-10 mb-0.5">
                          {useBudgetLimit ? (
                            <span className="text-blue-600 font-black">${getPlayerPrice(playerInSlot.rating)}M</span>
                          ) : (
                            playerInSlot.position === slot.position ? (
                              <span className="text-emerald-600 font-bold uppercase">{playerInSlot.position}</span>
                            ) : (
                              <span className="text-red-500 font-bold uppercase">{playerInSlot.position} ⚠️</span>
                            )
                          )}
                        </div>

                        {/* Botão X para retirar jogador do slot */}
                        <button
                          onClick={(e) => handleRemovePlayerFromSlot(slot.index, e)}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-35"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      // Placeholder para slot Vazio
                      <div className="flex flex-col items-center justify-center">
                        <Plus className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Nome da Posição / Categoria de Slot */}
                  <span className={`text-[8.5px] mt-1.5 font-bold tracking-tight rounded-xs px-1 select-none whitespace-nowrap transition-all uppercase ${
                    playerInSlot 
                      ? 'bg-slate-900/35 text-white/90 font-medium' 
                      : isActive 
                        ? 'bg-blue-600 text-white font-extrabold' 
                        : 'bg-transparent text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {playerInSlot ? `${playerInSlot.flag} ${playerInSlot.name.split(' ').pop()}` : slot.label}
                  </span>
                </div>
              );
            })}

            {/* Identificação Reduzida da Liga */}
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-xs border border-white/10 rounded-sm px-3 py-1.5 flex items-center gap-2 text-white pointer-events-none">
              <span className="text-lg leading-none">{LEAGUES_DATA[activeLeagueId]?.emoji}</span>
              <div>
                <span className="block text-[7px] font-mono font-bold tracking-wider text-slate-400 uppercase">Campeonato</span>
                <span className="block text-[9.5px] font-display font-black uppercase text-white tracking-tight">{LEAGUES_DATA[activeLeagueId]?.name}</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-xs border border-white/10 rounded-sm px-3 py-1.5 flex items-center gap-2 text-white pointer-events-none">
              <div className="text-right">
                <span className="block text-[7px] font-mono font-bold tracking-wider text-slate-400 uppercase">Alinhamento</span>
                <span className="block text-[9.5px] font-mono font-black text-white tracking-tight">{formation}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Catálogo de Jogadores (Lado Direito - Col 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-sm p-4 space-y-4 shadow-xs relative">
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-black uppercase text-slate-400 block tracking-widest leading-none">
                MERCADO DE CONTRATAÇÕES (40 CRAQUES DA LIGA)
              </span>
              <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-600 rounded-xs px-1.5 font-mono leading-none py-0.5">
                Roster Liga
              </span>
            </div>

            {/* Barra de Busca */}
            <input
              id="search-players-ligas"
              type="text"
              placeholder="Buscar por craque, clube ou nação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-250 focus:border-blue-500 rounded-sm px-3 py-2 text-slate-800 font-bold text-xs focus:ring-1 focus:ring-blue-500/10 focus:outline-none"
            />

            {/* Abas Rápidas de Filtro de Posição */}
            <div className="grid grid-cols-5 gap-1">
              {[
                { id: 'ALL', label: 'TODOS' },
                { id: 'GK', label: 'GK' },
                { id: 'DF', label: 'DEF' },
                { id: 'MC', label: 'MEI' },
                { id: 'AT', label: 'ATA' }
              ].map(pos => (
                <button
                  key={pos.id}
                  onClick={() => setFilterPos(pos.id)}
                  className={`py-1.5 rounded-sm font-mono text-[9px] font-black text-center cursor-pointer transition-all border ${
                    filterPos === pos.id 
                      ? 'bg-slate-950 text-white border-slate-950' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listagem */}
          <div className="divide-y divide-slate-100 max-h-[464px] overflow-y-auto pr-1">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => {
                const isEscalado = selectedSquad.includes(player.id);
                const hasActiveSlot = activeSlotIndex !== null;
                const slotObj = activeSlotIndex !== null ? slots[activeSlotIndex] : null;

                // Verificar se a posição é taticamente compatível
                const isPosCompatible = slotObj && player.position === slotObj.position;

                return (
                  <div 
                    key={player.id}
                    className={`py-2 px-2 transition-all flex items-center justify-between rounded-sm ${
                      isEscalado 
                        ? 'bg-slate-50 opacity-60' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Badge do Rating */}
                      <div className="w-9 h-11 bg-slate-950 text-amber-400 font-display font-black text-sm rounded-xs flex flex-col items-center justify-center shadow-xs border border-slate-800 shrink-0">
                        <span className="leading-none text-[12.5px] font-extrabold">{player.rating}</span>
                        <span className="text-[7.5px] font-bold text-slate-300 leading-none uppercase mt-0.5">{player.position}</span>
                      </div>

                      {/* Nome, Clube e País */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-800">{player.name}</span>
                          <span className="text-sm shrink-0 leading-none" title={player.country}>{player.flag}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                          <span className="text-[8.5px] font-mono text-slate-500 uppercase font-bold">
                            {player.role} • {player.club}
                          </span>
                          <span className="text-[9px] text-blue-600 font-mono font-black uppercase flex items-center gap-0.5">
                            ${getPlayerPrice(player.rating)}M
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Adicionar / Escalado */}
                    <div>
                      {isEscalado ? (
                        <div className="px-2.5 py-1.5 rounded-sm bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          <span>Escalado</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSelectPlayer(player)}
                          disabled={!hasActiveSlot}
                          className={`py-1.5 px-3 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 border ${
                            hasActiveSlot
                              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-750'
                              : 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Escalar</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Users className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-semibold">Nenhum jogador encontrado com as características buscadas.</p>
                <p className="text-[10px] text-slate-400 mt-1">Refine a busca por filtro de posições acima.</p>
              </div>
            )}
          </div>

          {/* Dica da Vaga Ativa de Recrutamento */}
          {activeSlotIndex !== null && slots[activeSlotIndex] && (
            <div className="bg-blue-50 border border-blue-150 p-3 rounded-sm flex items-start gap-2 text-xs text-blue-750">
              <Star className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold leading-snug">VAGA FOCADA DE RECRUTAMENTO</p>
                <p className="text-[10px] text-blue-600 mt-0.5 leading-snug">
                  Você selecionou o slot <strong>{slots[activeSlotIndex].label}</strong>. Jogadores de categoria <strong>{slots[activeSlotIndex].position}</strong> ganharão bônus de entrosamento (+4 química) se posicionados aqui.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Caixa de Visualização da Linup Copiada como Caixa de Texto (HUD Adicional) */}
      {exportedText && (
        <div className="bg-slate-905 border border-slate-800 p-5 rounded-sm space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-mono font-black text-slate-500 uppercase tracking-widest block leading-none">
              TEXTO EXPORTADO PARA COMPARTILHAMENTO
            </span>
            <button
              onClick={() => setExportedText(null)}
              className="text-slate-400 hover:text-white font-mono text-[9px] uppercase tracking-wider cursor-pointer"
            >
              Fechar painel [X]
            </button>
          </div>
          <pre className="bg-slate-950 text-white p-3.5 rounded-sm font-mono text-[10.5px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-all">
            {exportedText}
          </pre>
          <p className="text-[9px] text-slate-500 leading-none">
            Dica: O texto acima foi copiado automaticamente para sua área de transferência. Basta colar nas redes sociais ou nos grupos de Whatsapp de futebol!
          </p>
        </div>
      )}

      {/* 1. Modal Customizado: Editar de Camisa do Jogador */}
      {editingJerseyIndex !== null && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-90 animate-fadeIn">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-sm p-6 shadow-2xl relative flex flex-col space-y-4 animate-scaleUp">
            <button
              onClick={() => setEditingJerseyIndex(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-xs font-bold uppercase transition-colors cursor-pointer"
            >
              [X] Cancelar
            </button>
            
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-sm font-display font-black text-slate-950 uppercase tracking-tight">
                Número de Camisa Personalizado
              </h3>
              <p className="text-slate-400 text-[10.5px] leading-snug">
                Escolha o número de camisa ideal para vestir seu jogador escalado no slot. Ex: 1 a 99 (Máximo 3 algarismos).
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                id="jersey-input-edit"
                type="text"
                placeholder="Ex: 10"
                maxLength={3}
                value={tempJerseyNum}
                onChange={(e) => setTempJerseyNum(e.target.value.replace(/\D/g, '').slice(0, 3))}
                className="w-full bg-slate-50 border border-slate-250 focus:border-blue-500 rounded-sm px-3.5 py-2.5 text-slate-800 text-center font-black text-sm tracking-widest font-mono"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingJerseyIndex(null)}
                className="flex-1 py-2 px-3 border border-slate-200 text-slate-500 rounded-sm hover:text-slate-800 hover:bg-slate-55 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={saveJerseyNumber}
                className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-sm hover:bg-blue-750 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Salvar Número
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal de Confirmação: Limpar Completo */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-90 animate-fadeIn">
          <div className="bg-white border border-slate-200 max-w-sm w-full rounded-sm p-6 shadow-2xl relative flex flex-col space-y-4 animate-scaleUp">
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 border border-red-200 text-red-500 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-3">
                ⚠️
              </div>
              <h3 className="text-sm font-display font-black text-slate-950 uppercase tracking-tight">
                Limpar Equipe Ativa?
              </h3>
              <p className="text-slate-450 text-[10.5px] mt-1 pr-1.5 leading-snug">
                Tem certeza que deseja remover os 11 jogadores escalados nesta liga? Esta ação não pode ser desfeita e irá resetar seu progresso atual no campeonato selecionado.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 px-3 border border-slate-200 text-slate-500 rounded-sm hover:text-slate-800 hover:bg-slate-55 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearSquad}
                className="flex-1 py-2 px-3 bg-red-650 text-white rounded-sm hover:bg-red-750 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Sim, Limpar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
