/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Team {
  id: string;
  name: string;
  code: string; // ISO 3-letter code, e.g., BRA, ARG, USA
  emoji: string;
  rating: number; // 1-100 indicating performance level (for probabilistic simulation)
  group: string; // 'A' through 'L'
}

export interface GroupStanding {
  teamId: string;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface MotmInfo {
  playerName: string;
  teamId: string;
  rating: number; // e.g. 5.5 - 10.0
  goals: number;
  assists: number;
  saves?: number;
  tackles?: number;
  impactDescription: string;
}

export interface GoalScorer {
  playerName: string;
  teamId: string;
  minute?: number;
}

export interface Match {
  id: number; // 1 to 72 for group stage, 73 to 104 for playoffs
  group?: string; // e.g. 'A', undefined for playoff
  team1Id: string; // empty string if not decided yet (playoff placeholders)
  team2Id: string;
  team1Score?: number;
  team2Score?: number;
  team1PenScore?: number; // penalties
  team2PenScore?: number;
  status: 'scheduled' | 'completed';
  winnerId?: string; // manual playoff override or penalty winner
  date: string;
  time: string;
  stadium: string;
  city: string;
  country: 'USA' | 'Mexico' | 'Canada';
  phase: 'group' | 'round_of_32' | 'round_of_16' | 'quarter_finals' | 'semi_finals' | 'third_place' | 'final';
  motm?: MotmInfo;
  scorers?: GoalScorer[];
}

export interface UserPrediction {
  id: string;
  userName: string;
  championId: string;
  championName: string;
  championEmoji: string;
  createdAt: string;
}
