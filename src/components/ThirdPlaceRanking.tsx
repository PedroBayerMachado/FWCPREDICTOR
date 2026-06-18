/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { TeamFlag } from './TeamFlag';
import { Zap, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ThirdPlaceRanking: React.FC = () => {
  const {
    thirdPlaceTeams,
    customThirdPlaceQualifierIds,
    setCustomThirdPlaceQualifierIds,
    defaultSortedThirds
  } = useSimulator();

  // Selecionar ou deselecionar um terceiro colocado
  const handleToggleSelect = (teamId: number) => {
    const isSelected = customThirdPlaceQualifierIds.includes(teamId);
    
    if (isSelected) {
      // Se já está selecionado, apenas remove
      const updated = customThirdPlaceQualifierIds.filter(id => id !== teamId);
      setCustomThirdPlaceQualifierIds(updated);
    } else {
      // Se não está selecionado, adiciona (máximo de 8)
      if (customThirdPlaceQualifierIds.length >= 8) {
        return; // não permite mais de 8
      }
      const updated = [...customThirdPlaceQualifierIds, teamId];
      setCustomThirdPlaceQualifierIds(updated);
    }
  };

  // Autopreencher com a lógica oficial da FIFA
  const handleAutoFillOfficial = () => {
    const top8Ids = defaultSortedThirds.slice(0, 8).map(st => st.teamId);
    setCustomThirdPlaceQualifierIds(top8Ids);
  };

  const selectedCount = customThirdPlaceQualifierIds.length;
  const isSelectionPerfect = selectedCount === 8;

  return (
    <div className="bg-white border border-slate-300 rounded-none p-6 shadow-xs space-y-6">
      
      {/* Cabeçalho do Bloco */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-lg font-display font-black text-slate-950 uppercase tracking-tighter flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-slate-950 fill-amber-400" />
            REPESCAGEM • 8 MELHORES TERCEIROS COLOCADOS
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium uppercase tracking-wide">
            Selecione manualmente ou preencha o ranking oficial pelas regras da FIFA.
          </p>
        </div>

        <button
          id="autofill-thirds-btn"
          onClick={handleAutoFillOfficial}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-slate-955 hover:bg-slate-800 text-white font-display font-bold text-[10px] rounded-none cursor-pointer tracking-widest uppercase transition-all shrink-0"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Preencher por Regra FIFA
        </button>
      </div>

      {/* Caixa de Alerta / Sucesso dinâmico */}
      <div className={`p-4 rounded-none border flex items-start gap-3 transition-colors duration-200 ${
        isSelectionPerfect
          ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900 font-sans'
          : 'bg-amber-50/50 border-amber-300 text-amber-900 font-sans'
      }`}>
        {isSelectionPerfect ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        )}
        <div className="text-xs">
          <p className="font-display font-bold uppercase tracking-wider text-slate-905">
            {isSelectionPerfect 
              ? 'TABELA DE TERCEIROS COMPLETA' 
              : `SELEÇÃO MANUAL REQUERIDA (${selectedCount} de 8)`}
          </p>
          <p className="mt-1 text-slate-600 leading-relaxed">
            {isSelectionPerfect
              ? 'Exatamente 8 seleções de 3º lugar foram designadas. Os confrontos de mata-mata da Copa foram recalculados e salvos de forma impecável.'
              : 'Clique nos cards das seleções desejadas para compor as 8 vagas. Desmarque uma seleção ativa para abrir vaga para outra de grupo concorrente.'}
          </p>
        </div>
      </div>

      {/* Grid de Cards dos 12 Terceiros Colocados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {thirdPlaceTeams.map(item => {
          const isSelected = customThirdPlaceQualifierIds.includes(item.teamId);
          // Verificar posição teórica do time no ranking matemático oficial
          const mathRankIndex = defaultSortedThirds.findIndex(m => m.teamId === item.teamId);
          const earnsSpotByMath = mathRankIndex < 8;

          return (
            <button
              id={`third-team-card-${item.team.id}`}
              key={item.teamId}
              onClick={() => handleToggleSelect(item.teamId)}
              disabled={!isSelected && selectedCount >= 8}
              className={`w-full text-left p-4 rounded-none border-2 transition-all relative select-none cursor-pointer ${
                isSelected
                  ? 'bg-white border-slate-950 ring-2 ring-slate-950/10'
                  : !isSelected && selectedCount >= 8
                    ? 'bg-slate-50 border-slate-200 opacity-40 cursor-not-allowed'
                    : 'bg-white border-slate-300 hover:border-slate-800'
              }`}
            >
              {/* Etiqueta do Grupo Originário */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-display font-bold text-slate-500 uppercase tracking-widest">
                  Grupo {item.team.group} • 3º Lugar
                </span>
                {isSelected ? (
                  <span className="bg-slate-955 text-white font-display font-bold text-[8px] px-1.5 py-0.5 rounded-none uppercase tracking-wider">
                    SIMULADO
                  </span>
                ) : (
                  <span className="bg-slate-100 text-slate-500 font-display font-bold text-[8px] px-1.5 py-0.5 rounded-none uppercase tracking-wider">
                    FORA
                  </span>
                )}
              </div>

              {/* Bandeira & Nome do Time */}
              <div className="flex items-center gap-3 mb-3">
                <TeamFlag code={item.team.code} name={item.team.name} size="md" />
                <div className="min-w-0">
                  <h4 className="font-display font-black text-slate-955 uppercase text-xs truncate tracking-wide">
                    {item.team.name}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-450 uppercase font-bold block">
                    {item.team.code}
                  </span>
                </div>
              </div>

              {/* Métricas e Ranking Matemático */}
              <div className="flex justify-between items-center border-t border-slate-200 pt-2.5 mt-1">
                <div className="flex gap-2.5 text-[10px] font-mono text-slate-500">
                  <span>PTS: <strong className="text-slate-950">{item.points}</strong></span>
                  <span>SG: <strong className={item.goalDifference >= 0 ? "text-emerald-600" : "text-rose-600"}>{item.goalDifference >= 0 ? `+${item.goalDifference}` : item.goalDifference}</strong></span>
                </div>
                <div className="text-[8px] font-display font-bold text-slate-400 uppercase tracking-widest">
                  Rank FIFA: <span className="font-mono text-slate-655 font-bold">{item.team.rating}</span>
                </div>
              </div>

              {/* Selo se passaria de fase matematicamente pelas regras originais */}
              {earnsSpotByMath && (
                <div className="absolute -bottom-1.5 -right-1" title="Passaria pelo critério matemático oficial">
                  <span className="bg-amber-100 text-amber-800 font-display font-bold border border-amber-300 text-[6px] px-1 py-0.5 rounded-none uppercase tracking-widest">
                    Top 8 FIFA
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
