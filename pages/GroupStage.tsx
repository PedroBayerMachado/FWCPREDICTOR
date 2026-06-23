/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { MatchCard } from '../components/MatchCard';
import { GROUPS_LIST } from '../data/teams';
import { Calendar, Play, RotateCcw, Sliders, Layers, HelpCircle } from 'lucide-react';

// Novos Componentes
import { GroupRankingSelector } from '../components/GroupRankingSelector';
import { DragGroupTable } from '../components/DragGroupTable';
import { ThirdPlaceRanking } from '../components/ThirdPlaceRanking';
import { QualificationGenerator } from '../components/QualificationGenerator';
import { AutoBracketGenerator } from '../components/AutoBracketGenerator';
import { MataMata } from './MataMata';

export const GroupStage: React.FC = () => {
  const {
    matches,
    simulateFullGroupStage,
    resetSimulator,
    simulationMode,
    setSimulationMode,
    simulationStep,
    setSimulationStep
  } = useSimulator();

  const [selectedGroup, setSelectedGroup] = useState<string>('A');
  const [activeDirectGroup, setActiveDirectGroup] = useState<string>('A');

  const completedGroupMatches = matches.filter(m => m.phase === 'group' && m.status === 'completed').length;
  const isGroupStageComplete = completedGroupMatches === 72;

  const handleSimulateAndGoPlayoffs = () => {
    if (!isGroupStageComplete) {
      simulateFullGroupStage();
    }
    setSimulationStep('playoffs');
  };

  const handleGoPlayoffsDirectly = () => {
    setSimulationStep('playoffs');
  };

  // Filtrar jogos correspondentes à fase de grupos e ao grupo selecionado (para o modo tradicional)
  const groupMatches = matches.filter(
    m => m.phase === 'group' && m.group === selectedGroup
  );

  return (
    <div className="space-y-8 animate-fadeIn text-slate-950">
      {/* Barra de Passos Editorial do Simulador (GE-like flow) */}
      <div className="flex border border-slate-300 bg-white p-1 shadow-xs">
        <button
          type="button"
          onClick={() => setSimulationStep('groups')}
          className={`flex-1 py-3 text-[10px] font-display font-black uppercase tracking-widest transition-all cursor-pointer ${
            simulationStep === 'groups'
              ? 'bg-slate-950 text-white font-extrabold'
              : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
          }`}
        >
          1. Fase de Grupos
        </button>
        <button
          type="button"
          disabled={!isGroupStageComplete}
          onClick={() => setSimulationStep('playoffs')}
          className={`flex-1 py-3 text-[10px] font-display font-black uppercase tracking-widest transition-all cursor-pointer ${
            simulationStep === 'playoffs'
              ? 'bg-slate-950 text-white font-extrabold'
              : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
          title={!isGroupStageComplete ? 'Conclua a fase de grupos primeiro ou clique em Avançar' : ''}
        >
          2. Mata-Mata (Chaveamento)
        </button>
      </div>

      {simulationStep === 'groups' ? (
        <div className="space-y-12">
          {/* SELETOR PRINCIPAL DE MODO DE SIMULAÇÃO (Top Header) - Elegant High-Fashion Grid */}
          <div className="bg-white border border-slate-300 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
        <div>
          <span className="text-slate-500 font-display text-[9px] uppercase tracking-widest font-bold block mb-1">
            SISTEMA DE CONFIGURAÇÃO DE SIMULAÇÃO
          </span>
          <h2 className="text-xl font-display font-black text-slate-950 uppercase tracking-tight">
            ESCOLHA O MODO DE DIRECIONAMENTO
          </h2>
        </div>

        <div className="flex bg-slate-50 p-1 border border-slate-200 rounded-none w-full md:w-auto">
          <button
            id="mode-scores-btn"
            onClick={() => setSimulationMode('scores')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 text-[10px] font-display font-bold uppercase tracking-widest transition-all cursor-pointer ${
              simulationMode === 'scores'
                ? 'bg-slate-950 text-white font-extrabold'
                : 'text-slate-550 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Sliders className="h-3 w-3" />
            1. Ponto a Ponto (Placar)
          </button>
          <button
            id="mode-standings-btn"
            onClick={() => setSimulationMode('standings')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 text-[10px] font-display font-bold uppercase tracking-widest transition-all cursor-pointer ${
              simulationMode === 'standings'
                ? 'bg-slate-950 text-white font-extrabold'
                : 'text-slate-550 hover:text-slate-950 hover:bg-slate-100'
            }`}
          >
            <Layers className="h-3 w-3" />
            2. Por Classificação (Rápido)
          </button>
        </div>
      </div>

      {/* BANNER RAPIDO DE TRAMITAÇÃO PARA MATA-MATA (ATALHO) */}
      <div className="bg-white border-2 border-slate-950 p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-105/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 text-white p-3.5 rounded-none font-bold shrink-0 text-xl flex items-center justify-center w-12 h-12">
            {isGroupStageComplete ? '✓' : '*'}
          </div>
          <div>
            <h3 className="text-sm font-display font-black uppercase text-slate-950 tracking-wide flex items-center gap-2 flex-wrap">
              {isGroupStageComplete 
                ? 'Fase de Grupos de 2026 Terminada!' 
                : `Simulação de Grupos (${completedGroupMatches}/72 jogos)`}
              <span className="text-[8px] font-display font-bold text-slate-950 uppercase px-1.5 py-0.5 bg-slate-100 border border-slate-200">
                Playoffs Link
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium max-w-2xl mt-1.5 font-sans leading-relaxed">
              {isGroupStageComplete
                ? 'Todos os 72 jogos foram concluídos e validados! Os dados foram preservados no seu local storage seguro. Você está qualificado para visualizar e configurar o chaveamento oficial.'
                : 'Selecione, arraste ou preencha a sua tabela. Todos os resultados são computados e salvos instantaneamente para preencher sua chave de mata-mata.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          {!isGroupStageComplete && (
            <button
              id="go-to-playoffs-direct-btn"
              onClick={handleGoPlayoffsDirectly}
              className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-5 py-3.5 bg-transparent hover:bg-slate-50 text-slate-900 border border-slate-300 font-display font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-all"
            >
              IGNORAR E IR
            </button>
          )}
          <button
            id="go-to-playoffs-shortcut-btn"
            onClick={handleSimulateAndGoPlayoffs}
            className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-6 py-4 text-white font-display font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-all border-none ${
              isGroupStageComplete 
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-slate-950 hover:bg-slate-800'
            }`}
          >
            {isGroupStageComplete ? 'Ver Mata-Mata Ativo' : 'Simular Restantes e Avançar'}
          </button>
        </div>
      </div>

      {/* RENDERIZADOR CONDICIONAL BASEADO NO MODO */}
      {simulationMode === 'scores' ? (
        // ==================== MODO 1: PLACAR POR PLACAR (TRADICIONAL) ====================
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-300 pb-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
                JOGO A JOGO <span className="text-slate-500 underline decoration-slate-950 decoration-4 underline-offset-4">GRUPOS</span>
              </h1>
              <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-wider">
                Simule os placares de cada jogo manualmente ou utilize a predição probabilística computadorizada.
              </p>
            </div>

            {/* Botões Rápidos */}
            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <button
                id="sim-group-all-btn"
                onClick={simulateFullGroupStage}
                className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-5 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-display font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-all border-none"
              >
                <Play className="h-3 w-3 fill-white text-white" />
                SIMULAR JOGOS RESTANTES
              </button>
              <button
                id="reset-group-all-btn"
                onClick={resetSimulator}
                className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-5 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 bg-white font-display font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                RESETAR TUDO
              </button>
            </div>
          </div>

          {/* Navegação Secundária Horizontal (Abas de Grupos A até L) */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {GROUPS_LIST.map(gChar => {
              const isSelected = selectedGroup === gChar;
              return (
                <button
                  id={`group-tab-btn-${gChar}`}
                  key={gChar}
                  onClick={() => setSelectedGroup(gChar)}
                  className={`flex-shrink-0 w-11 h-11 text-xs font-display font-bold flex items-center justify-center cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? 'bg-slate-955 text-white border-slate-950 font-black scale-[1.02]'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {gChar}
                </button>
              );
            })}
          </div>

          {/* Grid de Partidas do Grupo Selecionado */}
          <div>
            <div className="bg-slate-100 border border-slate-200 px-4 py-2.5 mb-6 rounded-none">
              <span className="text-slate-700 font-display text-[9px] uppercase tracking-widest font-bold block">
                PARTIDAS CONFIRMADAS • GRUPO {selectedGroup}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupMatches.map(m => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          </div>

          {/* Rodapé Informativo */}
          <div className="bg-slate-100 border border-slate-200 rounded-none p-4 text-center">
            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">
              * A alteração de qualquer placar recalcula os pontos na Home e atualiza os confrontos gerados na chave de Mata-Mata.
            </p>
          </div>
        </div>
      ) : (
        // ==================== MODO 2: CLASSIFICAÇÃO DIRETA (RÁPIDO) ====================
        <div className="space-y-8 animate-fadeIn">
          {/* Header das instruções */}
          <div className="border-b border-slate-355 pb-4">
            <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
              DIRETAMENTE POR <span className="text-slate-500 underline decoration-slate-950 decoration-4 underline-offset-4">POSIÇÃO</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-wider">
              Defina a classificação final de cada grupo arrastando as seleções. Os classificados, melhores terceiros e o chaveamento de mata-mata oficial serão montados em tempo real!
            </p>
          </div>

          {/* Container Grande: Seletor Geral (Lado Esquerdo) + Ordenador Detalhado (Lado Direito) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Lado Esquerdo/Centro: Grid de escolha dos grupos (ocupa 2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-slate-300 p-4 rounded-none flex items-center justify-between">
                <span className="text-slate-700 font-display text-[9px] font-bold uppercase tracking-widest">
                  Selecione um grupo para organizar as colocações:
                </span>
                <span className="bg-slate-950 border border-slate-800 text-white font-display text-[8px] px-2 py-1 rounded-none uppercase font-black tracking-widest">
                  EDITANDO: GRUPO {activeDirectGroup}
                </span>
              </div>
              <GroupRankingSelector
                selectedGroup={activeDirectGroup}
                onSelectGroup={setActiveDirectGroup}
              />
            </div>

            {/* Lado Direito: Editor de Drag and Drop para o grupo selecionado (ocupa 1 col) */}
            <div className="lg:col-span-1">
              <DragGroupTable groupChar={activeDirectGroup} />
            </div>

          </div>

          {/* Bloco 2: Repescagem e Qualificações */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
            <div>
              <ThirdPlaceRanking />
            </div>
            <div>
              <QualificationGenerator />
            </div>
          </div>

          {/* Bloco 3: Painel de Controle e Chaveamento Automatizado */}
          <div>
            <AutoBracketGenerator />
          </div>

          {/* Nota de rodapé explicativa */}
          <div className="bg-white border border-slate-300 rounded-none p-5 flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-slate-950 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-relaxed">
              * O sistema preenche automaticamente os grupos com placares simulados consistentes de modo a bater exatamente com as colocações que você estipulou por arrasto, habilitando a integridade de cálculo da sua Copa do Mundo nas estatísticas e no mata-mata.
            </p>
          </div>
        </div>
      )}
      </div>
    ) : (
      <MataMata />
    )}

    </div>
  );
};
