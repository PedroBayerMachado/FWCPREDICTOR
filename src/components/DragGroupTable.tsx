/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { TeamFlag } from './TeamFlag';
import { ArrowUp, ArrowDown, MoveVertical } from 'lucide-react';

interface DragGroupTableProps {
  groupChar: string;
}

export const DragGroupTable: React.FC<DragGroupTableProps> = ({ groupChar }) => {
  const { groupStandingsOrder, updateGroupStandingsOrder } = useSimulator();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Obter a ordem dos IDs para este grupo
  const teamIds = groupStandingsOrder[groupChar] || [];
  
  // Mapear IDs para os objetos reais de seleção
  const orderedTeams = teamIds
    .map(id => TEAMS.find(t => t.id === id))
    .filter(Boolean) as typeof TEAMS;

  // Se por acaso a lista de IDs vier vazia, usar a ordem padrão
  if (orderedTeams.length === 0) {
    const defaultTeams = TEAMS.filter(t => t.group === groupChar);
    const defaultIds = defaultTeams.map(t => t.id);
    orderedTeams.push(...defaultTeams);
  }

  // Mover um time para cima/baixo na classificação do grupo
  const moveTeam = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= orderedTeams.length) return;

    const updated = [...orderedTeams];
    // Swap
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;

    updateGroupStandingsOrder(groupChar, updated.map(t => t.id));
  };

  // Mudar posição do time através de dropdown manual
  const handlePositionChange = (currentIndex: number, targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= orderedTeams.length) return;
    
    const updated = [...orderedTeams];
    const [movedTeam] = updated.splice(currentIndex, 1);
    updated.splice(targetIndex, 0, movedTeam);
    
    updateGroupStandingsOrder(groupChar, updated.map(t => t.id));
  };

  // Funções para drag e drop HTML5 Nativo
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Ocultar dados para navegadores antigos
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const updated = [...orderedTeams];
    const draggedItem = updated[draggedIndex];
    
    // Deleta o item arrastado de sua posição original e insere na nova
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    updateGroupStandingsOrder(groupChar, updated.map(t => t.id));
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="bg-white border border-slate-300 rounded-none p-5 w-full shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h3 className="font-display text-xs font-black uppercase text-slate-950 tracking-wider">
          Classificação • Grupo {groupChar}
        </h3>
        <span className="text-[9px] text-slate-400 font-display tracking-widest font-bold">
          ARRASTE PARA ORDENAR
        </span>
      </div>

      <div className="space-y-3">
        {orderedTeams.map((team, index) => {
          const positionLabel = index + 1;
          const isWinnerSlot = positionLabel <= 2; // 1o e 2o de cada grupo classificam direto
          const isThirdPlaceSlot = positionLabel === 3; // 3o colocado entra na repescagem de melhores terceiros
          
          let positionBadgeColor = 'bg-slate-100 text-slate-400';
          if (positionLabel === 1) positionBadgeColor = 'bg-slate-950 text-white font-black';
          else if (positionLabel === 2) positionBadgeColor = 'bg-slate-200 text-slate-800 font-bold';
          else if (positionLabel === 3) positionBadgeColor = 'bg-amber-100 text-amber-800 font-bold';

          return (
            <div
              id={`drag-row-${groupChar}-${team.id}`}
              key={team.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 bg-slate-50 border border-slate-200 hover:border-slate-950 hover:bg-white p-3 rounded-none transition-all cursor-grab active:cursor-grabbing select-none ${
                draggedIndex === index ? 'opacity-40 scale-[0.98] border-dashed border-slate-550 bg-slate-100' : ''
              }`}
            >
              {/* Drag Handle */}
              <div className="text-slate-400 hover:text-slate-900 cursor-grab-handle">
                <MoveVertical className="h-4 w-4" />
              </div>

              {/* Posição */}
              <div className={`w-6 h-6 rounded-none flex items-center justify-center text-[10px] font-display font-bold shrink-0 ${positionBadgeColor}`}>
                {positionLabel}º
              </div>

              {/* Seleção */}
              <div className="flex items-center gap-2 flex-grow min-w-0">
                <TeamFlag code={team.code} name={team.name} size="sm" />
                <span className="text-slate-950 font-display font-bold uppercase text-xs truncate tracking-wide">
                  {team.name}
                </span>
                <span className="text-[9px] font-mono text-slate-450 uppercase font-bold shrink-0">
                  {team.code}
                </span>
              </div>

              {/* Controles de classificação */}
              <div className="flex items-center gap-2">
                {/* Seletor dropdown alternativo */}
                <select
                  aria-label="Selecionar posição"
                  value={index}
                  onChange={(e) => handlePositionChange(index, Number(e.target.value))}
                  className="bg-white text-slate-800 border border-slate-300 text-[10px] py-1 px-1.5 rounded-none font-display font-semibold uppercase tracking-wider cursor-pointer focus:outline-none focus:border-slate-950 select-dropdown"
                >
                  <option value={0}>1º</option>
                  <option value={1}>2º</option>
                  <option value={2}>3º</option>
                  <option value={3}>4º</option>
                </select>

                {/* Setas de subir / descer */}
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => moveTeam(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded-none bg-white border border-slate-200 text-slate-400 hover:text-slate-950 hover:border-slate-950 disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-200 transition-colors cursor-pointer"
                    title="Subir posição"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveTeam(index, 'down')}
                    disabled={index === orderedTeams.length - 1}
                    className="p-1 rounded-none bg-white border border-slate-200 text-slate-400 hover:text-slate-950 hover:border-slate-950 disabled:opacity-20 disabled:hover:text-slate-400 disabled:hover:border-slate-200 transition-colors cursor-pointer"
                    title="Descer posição"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between items-center text-[9px] text-slate-500 border-t border-slate-200 pt-3 font-display uppercase tracking-wider font-bold">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-950"></span> 1º e 2º Passam
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span> 3º Repescagem
        </span>
      </div>
    </div>
  );
};
