/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { Heart, Trophy, User, Trash2, ShieldCheck, BarChart3, AlertCircle } from 'lucide-react';
import { TeamFlag } from '../components/TeamFlag';

export const Predictions: React.FC = () => {
  const {
    userName,
    setUserName,
    favoriteChampion,
    setFavoriteChampion,
    savePrediction,
    deletePrediction,
    userPredictions
  } = useSimulator();

  const [searchTeam, setSearchTeam] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Filtrar equipes para escolha do campeão
  const filteredTeams = TEAMS.filter(t =>
    t.name.toLowerCase().includes(searchTeam.toLowerCase()) ||
    t.code.toLowerCase().includes(searchTeam.toLowerCase())
  ).sort((a, b) => b.rating - a.rating); // Mostrar os mais fortes primeiro

  // Contar votos por seleção para a estatística
  const voteStats = userPredictions.reduce((acc, curr) => {
    acc[curr.championId] = (acc[curr.championId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Rankear as seleções por número de votos
  const rankedVoteStats = (Object.entries(voteStats) as [string, number][])
    .map(([teamId, count]) => {
      const team = TEAMS.find(t => t.id === teamId);
      return {
        teamId,
        count,
        name: team?.name || 'Indefinido',
        emoji: team?.emoji || '🏳️',
        code: team?.code || 'UNK',
        pct: userPredictions.length > 0 ? Math.round((count / userPredictions.length) * 100) : 0
      };
    })
    .sort((a, b) => b.count - a.count);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setErrorMessage('Por favor, informe seu nome.');
      return;
    }
    if (!favoriteChampion) {
      setErrorMessage('Por favor, selecione uma seleção campeã da lista.');
      return;
    }

    setErrorMessage('');
    savePrediction();
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-300 pb-5">
        <div className="inline-flex items-center gap-2 bg-slate-950 text-white px-3 py-1 text-[9px] font-display font-bold uppercase tracking-widest leading-none mb-3">
          FAÇA SUAS APOSTAS INICIAIS
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
          PALPITES DO <span className="text-slate-500 underline decoration-slate-950 decoration-4 underline-offset-4">CAMPEÃO</span>
        </h1>
        <p className="text-slate-500 font-medium text-xs mt-2 uppercase tracking-wider">
          Registre seu palpite do Campeão e confira o ranking geral das seleções preferidas dos seus amigos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FORMULÁRIO DE PALPITE (col-span-5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-sm p-6 shadow-xs relative self-start">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/[0.015] rounded-full blur-2xl pointer-events-none"></div>

          <h2 className="text-lg font-black uppercase tracking-wider italic text-slate-900 mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-blue-600" />
            Cadastrar Palpite
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome */}
            <div>
              <label htmlFor="user-name" className="block text-[10px] font-mono font-black uppercase text-slate-500 mb-2 tracking-widest">
                Qual o seu Nome?
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="user-name"
                  type="text"
                  maxLength={25}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ex: Carlos Roberto"
                  className="w-full bg-slate-50 border border-slate-250 rounded-sm py-3.5 pl-10 pr-4 text-slate-800 font-bold text-sm focus:outline-none focus:border-blue-500 transition-colors uppercase"
                  required
                />
              </div>
            </div>

            {/* Campo Campeão */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-mono font-black uppercase text-slate-500 tracking-widest">
                  Seleção Campeã da Copa
                </label>
                {favoriteChampion && (
                  <span className="text-[9px] bg-blue-50 text-blue-600 font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm border border-blue-200">
                    Selecionado!
                  </span>
                )}
              </div>

              {/* Barra de Pesquisa Rápida */}
              <input
                id="search-team-champ"
                type="text"
                value={searchTeam}
                onChange={(e) => setSearchTeam(e.target.value)}
                placeholder="Pesquise por país (Ex: Brasil, França...)"
                className="w-full bg-slate-50 border border-slate-250 rounded-t-sm py-2.5 px-3 text-slate-800 text-xs focus:outline-none focus:border-blue-500 mb-0 border-b-0 font-bold"
              />

              {/* Grid Selecionável com Rolagem */}
              <div className="bg-slate-50 border border-slate-250 border-t-0 rounded-b-sm max-h-52 overflow-y-auto divide-y divide-slate-200 grid grid-cols-1">
                {filteredTeams.map(t => {
                  const isSelected = favoriteChampion === t.id;
                  return (
                    <button
                      id={`pred-champ-${t.code}`}
                      key={t.id}
                      type="button"
                      onClick={() => setFavoriteChampion(t.id)}
                      className={`flex items-center justify-between px-3 py-2.5 text-left text-xs transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-blue-50 hover:bg-blue-100/50 text-blue-600' 
                          : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <TeamFlag code={t.code} name={t.name} size="sm" />
                        <span className="font-bold uppercase tracking-wide">{t.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({t.code})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono bg-white text-slate-500 px-1.5 py-0.5 rounded-sm border border-slate-200">
                          Rating: {t.rating}
                        </span>
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <span className="text-[8px] text-white font-black">✓</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mensagem de erro/sucesso */}
            {errorMessage && (
              <div className="bg-red-50/55 border border-red-200 rounded-sm p-3 text-red-600 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-sm p-3 text-green-600 text-xs font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Voto computado com sucesso! Salvo localmente.
              </div>
            )}

            {/* Submit */}
            <button
              id="submit-palpite-btn"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-4 rounded-sm text-center text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xs"
            >
              Salvar Meu Palpite
            </button>
          </form>
        </div>

        {/* LISTAGEM DE VOTOS E PALPITES REGISTRADOS (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Votos Acumulados / Gráficos de barra */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <BarChart3 className="text-blue-600 h-5 w-5" />
              Seleções Mais Votadas ({userPredictions.length} votos totais)
            </h2>

            {rankedVoteStats.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2 text-center">
                Sem votos salvos. Cadastre seu palpite ao lado!
              </p>
            ) : (
              <div className="space-y-4">
                {rankedVoteStats.slice(0, 4).map((stat, i) => (
                  <div key={stat.teamId} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold items-center">
                      <div className="flex items-center gap-1.5">
                        <TeamFlag code={stat.code} name={stat.name} size="sm" />
                        <span className="text-slate-800 font-extrabold uppercase tracking-wide">{stat.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">({stat.code})</span>
                      </div>
                      <div className="text-slate-650 text-xs uppercase font-bold">
                        <strong className="text-blue-600 font-extrabold">{stat.count}</strong> {stat.count === 1 ? 'voto' : 'votos'} ({stat.pct}%)
                      </div>
                    </div>
                    {/* Barra de Progresso */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-sm overflow-hidden border border-slate-200/50">
                      <div
                        className="bg-blue-650 h-full rounded-sm transition-all duration-500 bg-blue-600"
                        style={{ width: `${stat.pct}%` }}
                      ></div>
                    </div>
                  </div>
                ))}

                {rankedVoteStats.length > 4 && (
                  <p className="text-[10px] text-slate-400 text-right italic font-mono pt-1 uppercase">
                    + {rankedVoteStats.length - 4} outras seleções receberam votos.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Leaderboard Completo de Palpites passados */}
          <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-xs space-y-4">
            <h2 className="text-base font-black uppercase tracking-wider italic text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              👑 Feed de Palpites do LocalStorage
            </h2>

            <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100 pr-1 space-y-1">
              {userPredictions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8 italic">
                  Nenhum palpite foi cadastrado ainda.
                </p>
              ) : (
                userPredictions.map(p => {
                  const pTeam = TEAMS.find(t => t.id === p.championId);
                  return (
                    <div key={p.id} className="flex justify-between items-center py-3 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-blue-600 text-xs uppercase font-mono italic">
                          {p.userName.slice(0, 2)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block uppercase">
                            {p.userName}
                          </span>
                          <span className="text-[10px] text-slate-405 font-mono block">
                            {new Date(p.createdAt).toLocaleDateString()} às {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-xs font-mono font-black uppercase bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded-sm border border-blue-200 flex items-center gap-2.5 italic">
                            <TeamFlag code={pTeam?.code || ''} name={p.championName} size="sm" />
                            <span>{p.championName}</span>
                          </span>
                        </div>
                        <button
                          id={`delete-btn-${p.id}`}
                          onClick={() => deletePrediction(p.id)}
                          className="p-1 px-1.5 text-slate-400 hover:text-red-500 cursor-pointer rounded transition-all opacity-100 lg:opacity-0 group-hover:opacity-100"
                          title="Deletar palpite"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
