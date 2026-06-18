/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Match } from '../types';
import { TEAMS } from './teams';

// Cidades e estádios oficiais da Copa 2026
interface HostVenue {
  city: string;
  stadium: string;
  country: 'USA' | 'Mexico' | 'Canada';
}

const VENUES: HostVenue[] = [
  { city: 'Dallas', stadium: 'AT&T Stadium', country: 'USA' },
  { city: 'Nova York/Nova Jersey', stadium: 'MetLife Stadium', country: 'USA' },
  { city: 'Los Angeles', stadium: 'SoFi Stadium', country: 'USA' },
  { city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', country: 'USA' },
  { city: 'Miami', stadium: 'Hard Rock Stadium', country: 'USA' },
  { city: 'Houston', stadium: 'NRG Stadium', country: 'USA' },
  { city: 'Cidade do México', stadium: 'Estadio Azteca', country: 'Mexico' },
  { city: 'Vancouver', stadium: 'BC Place', country: 'Canada' },
  { city: 'Toronto', stadium: 'BMO Field', country: 'Canada' },
  { city: 'Monterrey', stadium: 'Estadio BBVA', country: 'Mexico' },
  { city: 'Guadalajara', stadium: 'Estadio Akron', country: 'Mexico' },
  { city: 'Seattle', stadium: 'Lumen Field', country: 'USA' },
  { city: 'São Francisco/Santa Clara', stadium: 'Levi\'s Stadium', country: 'USA' },
  { city: 'Filadélfia', stadium: 'Lincoln Financial Field', country: 'USA' },
  { city: 'Kansas City', stadium: 'Arrowhead Stadium', country: 'USA' },
  { city: 'Boston/Foxborough', stadium: 'Gillette Stadium', country: 'USA' }
];

export function getInitialMatches(): Match[] {
  const matches: Match[] = [];
  let matchId = 1;

  // 1. GERAÇÃO DA FASE DE GRUPOS (72 JOGOS)
  const groupsTemp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  
  groupsTemp.forEach((groupChar, groupIndex) => {
    // Pegar as 4 seleções deste grupo
    const groupTeams = TEAMS.filter(t => t.group === groupChar);
    if (groupTeams.length < 4) return;

    // Cronograma do grupo (Round Robin de 4 times = 6 jogos)
    // Usando estrutura padrão de confrontos de grupos
    const pairings = [
      { t1: 0, t2: 1, round: 1 },
      { t1: 2, t2: 3, round: 1 },
      { t1: 0, t2: 2, round: 2 },
      { t1: 1, t2: 3, round: 2 },
      { t1: 0, t2: 3, round: 3 },
      { t1: 1, t2: 2, round: 3 }
    ];

    pairings.forEach((pair, pairIndex) => {
      const venue = VENUES[(groupIndex * 3 + pairIndex) % VENUES.length];
      const matchDayOffset = Math.floor(groupIndex / 2) * 2 + pair.round;
      const day = 11 + matchDayOffset; // Começa dia 12 de Junho em diante
      const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
      
      const hours = ['14:00', '17:00', '21:00'];
      const timeStr = hours[(pairIndex + groupIndex) % hours.length];

      matches.push({
        id: matchId++,
        group: groupChar,
        team1Id: groupTeams[pair.t1].id,
        team2Id: groupTeams[pair.t2].id,
        status: 'scheduled',
        date: dateStr,
        time: timeStr,
        stadium: venue.stadium,
        city: venue.city,
        country: venue.country,
        phase: 'group'
      });
    });
  });

  // 2. GERAÇÃO DOS SLOTS DE MATA-MATA (32-AVOS ATÉ A FINAL - JOGO 73 AO JOGO 104)
  // Jogo 73 ao Jogo 88 (32-avos de final)
  const roundOf32Descriptions = [
    { id: 73, date: '2026-06-28', stadium: 'SoFi Stadium', city: 'Los Angeles', country: 'USA' },
    { id: 74, date: '2026-06-28', stadium: 'MetLife Stadium', city: 'Nova York/Nova Jersey', country: 'USA' },
    { id: 75, date: '2026-06-29', stadium: 'BMO Field', city: 'Toronto', country: 'Canada' },
    { id: 76, date: '2026-06-29', stadium: 'Estadio Azteca', city: 'Cidade do México', country: 'Mexico' },
    { id: 77, date: '2026-06-30', stadium: 'AT&T Stadium', city: 'Dallas', country: 'USA' },
    { id: 78, date: '2026-06-30', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA' },
    { id: 79, date: '2026-06-30', stadium: 'Hard Rock Stadium', city: 'Miami', country: 'USA' },
    { id: 80, date: '2026-07-01', stadium: 'BC Place', city: 'Vancouver', country: 'Canada' },
    { id: 81, date: '2026-07-01', stadium: 'Levi\'s Stadium', city: 'São Francisco/Santa Clara', country: 'USA' },
    { id: 82, date: '2026-07-01', stadium: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico' },
    { id: 83, date: '2026-07-02', stadium: 'Gillette Stadium', city: 'Boston/Foxborough', country: 'USA' },
    { id: 84, date: '2026-07-02', stadium: 'Lumen Field', city: 'Seattle', country: 'USA' },
    { id: 85, date: '2026-07-02', stadium: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA' },
    { id: 86, date: '2026-07-03', stadium: 'Lincoln Financial Field', city: 'Filadélfia', country: 'USA' },
    { id: 87, date: '2026-07-03', stadium: 'NRG Stadium', city: 'Houston', country: 'USA' },
    { id: 88, date: '2026-07-03', stadium: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico' }
  ];

  roundOf32Descriptions.forEach(desc => {
    matches.push({
      id: desc.id,
      team1Id: '', // Determinado pela classificação final dos grupos
      team2Id: '',
      status: 'scheduled',
      date: desc.date,
      time: '18:00',
      stadium: desc.stadium,
      city: desc.city,
      country: desc.country as 'USA' | 'Mexico' | 'Canada',
      phase: 'round_of_32'
    });
  });

  // Jogo 89 ao Jogo 96 (Oitavas de final)
  const r16Cities = [
    { id: 89, date: '2026-07-04', city: 'Los Angeles', stadium: 'SoFi Stadium' },
    { id: 90, date: '2026-07-04', city: 'Houston', stadium: 'NRG Stadium' },
    { id: 91, date: '2026-07-05', city: 'Nova York/Nova Jersey', stadium: 'MetLife Stadium' },
    { id: 92, date: '2026-07-05', city: 'Cidade do México', stadium: 'Estadio Azteca' },
    { id: 93, date: '2026-07-06', city: 'Dallas', stadium: 'AT&T Stadium' },
    { id: 94, date: '2026-07-06', city: 'Seattle', stadium: 'Lumen Field' },
    { id: 95, date: '2026-07-07', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
    { id: 96, date: '2026-07-07', city: 'Vancouver', stadium: 'BC Place' }
  ];

  r16Cities.forEach(item => {
    matches.push({
      id: item.id,
      team1Id: '',
      team2Id: '',
      status: 'scheduled',
      date: item.date,
      time: '19:00',
      stadium: item.stadium,
      city: item.city,
      country: item.city === 'Vancouver' ? 'Canada' : (item.city === 'Cidade do México' ? 'Mexico' : 'USA'),
      phase: 'round_of_16'
    });
  });

  // Jogo 97 ao Jogo 100 (Quartas de final)
  const qfCities = [
    { id: 97, date: '2026-07-09', city: 'Boston/Foxborough', stadium: 'Gillette Stadium' },
    { id: 98, date: '2026-07-10', city: 'Los Angeles', stadium: 'SoFi Stadium' },
    { id: 99, date: '2026-07-11', city: 'Miami', stadium: 'Hard Rock Stadium' },
    { id: 100, date: '2026-07-11', city: 'Kansas City', stadium: 'Arrowhead Stadium' }
  ];

  qfCities.forEach(item => {
    matches.push({
      id: item.id,
      team1Id: '',
      team2Id: '',
      status: 'scheduled',
      date: item.date,
      time: '17:00',
      stadium: item.stadium,
      city: item.city,
      country: 'USA',
      phase: 'quarter_finals'
    });
  });

  // Jogo 101 ao Jogo 102 (Semifinais)
  matches.push({
    id: 101,
    team1Id: '',
    team2Id: '',
    status: 'scheduled',
    date: '2026-07-14',
    time: '20:00',
    stadium: 'AT&T Stadium',
    city: 'Dallas',
    country: 'USA',
    phase: 'semi_finals'
  });

  matches.push({
    id: 102,
    team1Id: '',
    team2Id: '',
    status: 'scheduled',
    date: '2026-07-15',
    time: '20:00',
    stadium: 'Mercedes-Benz Stadium',
    city: 'Atlanta',
    country: 'USA',
    phase: 'semi_finals'
  });

  // Jogo 103 (Disputa do 3º Lugar)
  matches.push({
    id: 103,
    team1Id: '',
    team2Id: '',
    status: 'scheduled',
    date: '2026-07-18',
    time: '16:00',
    stadium: 'Hard Rock Stadium',
    city: 'Miami',
    country: 'USA',
    phase: 'third_place'
  });

  // Jogo 104 (Finalíssima)
  matches.push({
    id: 104,
    team1Id: '',
    team2Id: '',
    status: 'scheduled',
    date: '2026-07-19',
    time: '16:00',
    stadium: 'MetLife Stadium',
    city: 'Nova York/Nova Jersey',
    country: 'USA',
    phase: 'final'
  });

  return matches;
}
