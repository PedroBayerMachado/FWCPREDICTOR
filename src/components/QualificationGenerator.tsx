/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS, GROUPS_LIST } from '../data/teams';
import { TeamFlag } from './TeamFlag';
import { Award, Zap, Shield, Sparkles } from 'lucide-react';

export const QualificationGenerator: React.FC = () => {
  const { groupStandings, customThirdPlaceQualifierIds } = useSimulator();

  // 1. Encontrar vencedores de grupos (1º colocado)
  const groupWinners = useMemo(() => {
    return GROUPS_LIST.map(g => {
      const standings = groupStandings[g];
      return standings && standings.length >= 1 ? standings[0].team : null;
    }).filter(Boolean) as typeof TEAMS;
  }, [groupStandings]);

  // 2. Encontrar vices de grupos (2º colocado)
  const groupRunnersUp = useMemo(() => {
    return GROUPS_LIST.map(g => {
      const standings = groupStandings[g];
      return standings && standings.length >= 2 ? standings[1].team : null;
    }).filter(Boolean) as typeof TEAMS;
  }, [groupStandings]);

  // 3. Encontrar os 8 melhores terceiros colocados qualificados
  const bestThirdsQualified = useMemo(() => {
    return customThirdPlaceQualifierIds
      .map(id => TEAMS.find(t => t.id === id))
      .filter(Boolean) as typeof TEAMS;
  }, [customThirdPlaceQualifierIds]);

  const totalQualifiedCount = groupWinners.length + groupRunnersUp.length + bestThirdsQualified.length;

  return (
    <div className="bg-slate-900 border border-white/10 rounded-sm p-4 sm:p-6 shadow-xl space-y-6">
      
      {/* Cabeçalho do Bloco */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <h2 className="text-lg font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            Classificados Habilitados ({totalQualifiedCount} de 32)
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Lista oficial de seleções que avançam para constituir o chaveamento oficial do Mata-Mata FIFA 2026™.
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-sm">
          <span className="font-mono text-xs font-black text-emerald-400 tracking-wider">
            FASE FINAL COMPLETA
          </span>
        </div>
      </div>

      {/* Grid das três colunas de qualificações */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Coluna 1: Líderes de Grupos (Sementes Principais) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Award className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <h3 className="font-mono text-xs font-black uppercase text-slate-300 tracking-wider">
              1ºs Colocados (Líderes)
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
            {groupWinners.map(team => (
              <div
                id={`qualified-winner-${team.id}`}
                key={team.id}
                className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-white/5 rounded-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <TeamFlag code={team.code} name={team.name} size="sm" />
                  <span className="font-bold text-white text-xs truncate uppercase tracking-wide">
                    {team.name}
                  </span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[8px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                  Grupo {team.group}
                </span>
              </div>
            ))}
            {groupWinners.length === 0 && (
              <p className="text-[11px] text-slate-500 font-mono uppercase italic">Ninguém habilitado ainda...</p>
            )}
          </div>
        </div>

        {/* Coluna 2: Vices de Grupos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Shield className="h-4.5 w-4.5 text-emerald-500/50 shrink-0" />
            <h3 className="font-mono text-xs font-black uppercase text-slate-300 tracking-wider">
              2ºs Colocados (Vices)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
            {groupRunnersUp.map(team => (
              <div
                id={`qualified-runner-${team.id}`}
                key={team.id}
                className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-white/5 rounded-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <TeamFlag code={team.code} name={team.name} size="sm" />
                  <span className="font-bold text-white text-xs truncate uppercase tracking-wide">
                    {team.name}
                  </span>
                </div>
                <span className="bg-slate-800 text-slate-400 font-mono text-[8px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                  Grupo {team.group}
                </span>
              </div>
            ))}
            {groupRunnersUp.length === 0 && (
              <p className="text-[11px] text-slate-500 font-mono uppercase italic">Ninguém habilitado ainda...</p>
            )}
          </div>
        </div>

        {/* Coluna 3: Melhores 3ºs Qualificados */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <Zap className="h-4.5 w-4.5 text-amber-500 shrink-0" />
            <h3 className="font-mono text-xs font-black uppercase text-slate-300 tracking-wider">
              Melhores 3ºs (Repescados)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
            {bestThirdsQualified.map(team => (
              <div
                id={`qualified-third-${team.id}`}
                key={team.id}
                className="flex items-center justify-between p-2.5 bg-slate-950/50 border border-white/5 rounded-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <TeamFlag code={team.code} name={team.name} size="sm" />
                  <span className="font-bold text-white text-xs truncate uppercase tracking-wide">
                    {team.name}
                  </span>
                </div>
                <span className="bg-amber-500/15 text-amber-450 font-mono text-[8px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                  Grupo {team.group}
                </span>
              </div>
            ))}
            {bestThirdsQualified.length !== 8 && (
              <div className="p-3 text-center bg-amber-500/5 border border-amber-500/10 rounded-sm text-amber-400 font-mono text-[10px] uppercase">
                ⚠️ Seleção parcial: selecione exatamente 8 terceiros colocados na guia abaixo.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
