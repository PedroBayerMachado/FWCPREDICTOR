/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS, GROUPS_LIST } from '../data/teams';
import { TeamFlag } from './TeamFlag';

interface GroupRankingSelectorProps {
  selectedGroup: string;
  onSelectGroup: (groupChar: string) => void;
}

export const GroupRankingSelector: React.FC<GroupRankingSelectorProps> = ({
  selectedGroup,
  onSelectGroup
}) => {
  const { groupStandingsOrder } = useSimulator();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {GROUPS_LIST.map(gChar => {
        const isSelected = selectedGroup === gChar;
        const teamIds = groupStandingsOrder[gChar] || [];
        
        // Obter os times na ordem atual
        const ordered = teamIds
          .map(id => TEAMS.find(t => t.id === id))
          .filter(Boolean) as typeof TEAMS;

        return (
          <button
            id={`group-card-selector-${gChar}`}
            key={gChar}
            onClick={() => onSelectGroup(gChar)}
            className={`w-full text-left p-4 rounded-none border-2 transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-white border-slate-950 ring-2 ring-slate-950/20 scale-[1.02] shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-1.5">
              <span className={`text-[10px] font-display tracking-widest font-bold uppercase ${isSelected ? 'text-slate-950' : 'text-slate-450'}`}>
                Grupo {gChar}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
            </div>

            {/* Listagem de 4 flags em ordem rankeada */}
            <div className="space-y-2">
              {ordered.map((team, index) => {
                const isQualifier = index <= 1; // 1o e 2o classificados
                const isThird = index === 2;     // 3o colocado
                
                let rankDotColor = 'bg-slate-200';
                if (index === 0) rankDotColor = 'bg-emerald-500';
                else if (index === 1) rankDotColor = 'bg-emerald-400/60';
                else if (index === 2) rankDotColor = 'bg-amber-400/80';

                return (
                  <div key={team.id} className="flex items-center gap-2 text-[10px] truncate">
                    <span className={`w-1 h-3 rounded-full ${rankDotColor} shrink-0`}></span>
                    <TeamFlag code={team.code} name={team.name} size="xs" />
                    <span className={`truncate font-display font-medium uppercase text-[10px] tracking-wide transition-colors ${
                      isSelected 
                        ? (isQualifier ? 'text-slate-950 font-bold' : isThird ? 'text-slate-600' : 'text-slate-400')
                        : (isQualifier ? 'text-slate-800' : isThird ? 'text-slate-500' : 'text-slate-400')
                    }`}>
                      {team.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
};
