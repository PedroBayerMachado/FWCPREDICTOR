/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GroupStanding } from '../types';
import { TeamFlag } from './TeamFlag';

interface GroupTableProps {
  groupName: string;
  standings: GroupStanding[];
}

export const GroupTable: React.FC<GroupTableProps> = ({ groupName, standings }) => {
  if (!standings || standings.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-4 text-center text-slate-400 border border-slate-700/50 animate-pulse">
        Carregando standings do Grupo {groupName}...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border-2 border-white/10 rounded-sm py-4 px-1 sm:px-2 shadow-2xl relative overflow-hidden">
      {/* Cabeçalho do Grupo */}
      <div className="px-3 pb-2.5 mb-2 border-b border-white/5 flex justify-between items-center">
        <span className="text-sm font-black text-emerald-400 tracking-wider italic uppercase">
          GRUPO {groupName}
        </span>
        <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
          standings
        </span>
      </div>

      {/* Tabela de Classificação */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-500 font-mono text-[10px] uppercase border-b border-white/5">
              <th className="py-2 px-3 text-center w-8">#</th>
              <th className="py-2">Seleção</th>
              <th className="py-2 text-center w-10">J</th>
              <th className="py-2 text-center w-8 hidden sm:table-cell">V</th>
              <th className="py-2 text-center w-8 hidden sm:table-cell">E</th>
              <th className="py-2 text-center w-8 hidden sm:table-cell">D</th>
              <th className="py-2 text-center w-12 table-cell sm:hidden">V-E-D</th>
              <th className="py-2 text-center w-10 hidden sm:table-cell">GP</th>
              <th className="py-2 text-center w-10 hidden sm:table-cell">GC</th>
              <th className="py-2 text-center w-12">SG</th>
              <th className="py-2 text-center w-12 text-white font-bold">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => {
              const { team } = row;
              
              // Qualitativo das posições (Copa do Mundo 2026: Top 2 passam, 3º colocado pode passar se for um dos 8 melhores)
              let positionColorClass = 'text-slate-400';
              let badgeBgClass = 'bg-slate-800 text-slate-400 border border-slate-700/40';
              
              if (index < 2) {
                // Classificação Direta (Fundo Verde Sutil)
                positionColorClass = 'text-emerald-400 font-black';
                badgeBgClass = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
              } else if (index === 2) {
                // Classificação Possível de Melhores 3ºs
                positionColorClass = 'text-slate-300 font-bold';
                badgeBgClass = 'bg-slate-800 text-slate-300 border border-slate-700';
              }

              return (
                <tr
                  key={row.teamId}
                  className={`group/row border-b border-white/5 hover:bg-slate-800/45 transition-colors last:border-0 ${
                    index < 2 ? 'bg-emerald-500/[0.01]' : ''
                  }`}
                >
                  {/* Posição */}
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-sm text-[10px] font-mono leading-none ${badgeBgClass}`}>
                      {index + 1}
                    </span>
                  </td>

                  {/* Seleção */}
                  <td className="py-2.5 font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <TeamFlag code={team.code} name={team.name} size="sm" />
                      <span className="truncate max-w-[100px] sm:max-w-[130px]" title={team.name}>
                        {team.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-normal">
                        ({team.code})
                      </span>
                    </div>
                  </td>

                  {/* Detalhes de Jogos */}
                  <td className="py-2.5 text-center text-slate-300 font-mono">{row.played}</td>
                  <td className="py-2.5 text-center text-slate-400 font-mono hidden sm:table-cell group-hover/row:text-slate-200">{row.won}</td>
                  <td className="py-2.5 text-center text-slate-400 font-mono hidden sm:table-cell group-hover/row:text-slate-200">{row.drawn}</td>
                  <td className="py-2.5 text-center text-slate-400 font-mono hidden sm:table-cell group-hover/row:text-slate-200">{row.lost}</td>
                  
                  {/* Responsivo simplificado */}
                  <td className="py-2.5 text-center text-slate-400 font-mono table-cell sm:hidden group-hover/row:text-slate-200">
                    {row.won}-{row.drawn}-{row.lost}
                  </td>

                  <td className="py-2.5 text-center text-slate-550 font-mono hidden sm:table-cell">{row.goalsFor}</td>
                  <td className="py-2.5 text-center text-slate-550 font-mono hidden sm:table-cell">{row.goalsAgainst}</td>
                  
                  {/* Saldo de gols */}
                  <td className={`py-2.5 text-center font-mono font-medium ${
                    row.goalDifference > 0 ? 'text-emerald-400' : row.goalDifference < 0 ? 'text-rose-450' : 'text-slate-400'
                  }`}>
                    {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                  </td>

                  {/* Pontos */}
                  <td className="py-2.5 text-center text-white font-extrabold text-sm font-mono">
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
