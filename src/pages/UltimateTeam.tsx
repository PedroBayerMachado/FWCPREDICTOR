/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Users, Shield, Plus, X, RotateCcw, Save, Trash2, Check, Star, Sparkles, AlertCircle, Download, Copy, Camera } from 'lucide-react';

export interface Player {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  position: 'GK' | 'DF' | 'MC' | 'AT';
  role: string;
  club: string;
}

// Lista oficial dos craques da Copa do Mundo 2026 e Ídolos Históricos (Expandida para 120 jogadores)
export const WORLD_PLAYERS: Player[] = [
  // Goleiros (11)
  { id: 'p_1', name: 'Thibaut Courtois', country: 'Bélgica', flag: '🇧🇪', rating: 90, position: 'GK', role: 'Goleiro', club: 'Real Madrid' },
  { id: 'p_2', name: 'Alisson Becker', country: 'Brasil', flag: '🇧🇷', rating: 89, position: 'GK', role: 'Goleiro', club: 'Liverpool' },
  { id: 'p_3', name: 'Emiliano Martínez', country: 'Argentina', flag: '🇦🇷', rating: 88, position: 'GK', role: 'Goleiro', club: 'Aston Villa' },
  { id: 'p_4', name: 'Mike Maignan', country: 'França', flag: '🇫🇷', rating: 87, position: 'GK', role: 'Goleiro', club: 'AC Milan' },
  { id: 'p_38', name: 'Gianluigi Donnarumma', country: 'Itália', flag: '🇮🇹', rating: 88, position: 'GK', role: 'Goleiro', club: 'PSG' },
  { id: 'p_39', name: 'Gregor Kobel', country: 'Suíça', flag: '🇨🇭', rating: 87, position: 'GK', role: 'Goleiro', club: 'Borussia Dortmund' },
  { id: 'p_40', name: 'Guillermo Ochoa', country: 'México', flag: '🇲🇽', rating: 81, position: 'GK', role: 'Goleiro', club: 'Club León' },
  { id: 'p_70', name: 'Ederson Moraes', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'GK', role: 'Goleiro', club: 'Manchester City' },
  { id: 'p_71', name: 'Marc-André ter Stegen', country: 'Alemanha', flag: '🇩🇪', rating: 88, position: 'GK', role: 'Goleiro', club: 'Barcelona' },
  { id: 'p_72', name: 'Manuel Neuer', country: 'Alemanha', flag: '🇩🇪', rating: 84, position: 'GK', role: 'Goleiro', club: 'Bayern München' },
  { id: 'p_73', name: 'Jan Oblak', country: 'Eslovênia', flag: '🇸🇮', rating: 86, position: 'GK', role: 'Goleiro', club: 'Atlético de Madrid' },

  // Defensores (21)
  { id: 'p_5', name: 'Virgil van Dijk', country: 'Holanda', flag: '🇳🇱', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },
  { id: 'p_6', name: 'Rúben Dias', country: 'Portugal', flag: '🇵🇹', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
  { id: 'p_7', name: 'William Saliba', country: 'França', flag: '🇫🇷', rating: 87, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
  { id: 'p_8', name: 'Achraf Hakimi', country: 'Marrocos', flag: '🇲🇦', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'PSG' },
  { id: 'p_9', name: 'Ronald Araújo', country: 'Uruguai', flag: '🇺🇾', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Barcelona' },
  { id: 'p_10', name: 'Theo Hernández', country: 'França', flag: '🇫🇷', rating: 85, position: 'DF', role: 'Lateral Esquerdo', club: 'AC Milan' },
  { id: 'p_11', name: 'Marquinhos', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'PSG' },
  { id: 'p_12', name: 'Joško Gvardiol', country: 'Croácia', flag: '🇭🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
  { id: 'p_13', name: 'Alphonso Davies', country: 'Canadá', flag: '🇨🇦', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'Bayern München' },
  { id: 'p_14', name: 'Kyle Walker', country: 'Inglaterra', flag: '🏴', rating: 84, position: 'DF', role: 'Lateral Direito', club: 'Manchester City' },
  { id: 'p_41', name: 'Éder Militão', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Real Madrid' },
  { id: 'p_42', name: 'Gabriel Magalhães', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
  { id: 'p_43', name: 'Trent Alexander-Arnold', country: 'Inglaterra', flag: '🏴', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Liverpool' },
  { id: 'p_44', name: 'Piero Hincapié', country: 'Equador', flag: '🇪🇨', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Bayer Leverkusen' },
  { id: 'p_45', name: 'Alessandro Bastoni', country: 'Itália', flag: '🇮🇹', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Inter de Milão' },
  { id: 'p_74', name: 'Antonio Rüdiger', country: 'Alemanha', flag: '🇩🇪', rating: 87, position: 'DF', role: 'Zagueiro', club: 'Real Madrid' },
  { id: 'p_75', name: 'John Stones', country: 'Inglaterra', flag: '🏴', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
  { id: 'p_76', name: 'Jules Koundé', country: 'França', flag: '🇫🇷', rating: 85, position: 'DF', role: 'Lateral Direito', club: 'Barcelona' },
  { id: 'p_77', name: 'Jeremie Frimpong', country: 'Holanda', flag: '🇳🇱', rating: 85, position: 'DF', role: 'Lateral Direito', club: 'Bayer Leverkusen' },
  { id: 'p_78', name: 'Andrew Robertson', country: 'Escócia', flag: '🏴', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'Liverpool' },
  { id: 'p_79', name: 'Gleison Bremer', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Juventus' },

  // Meio-campistas (26)
  { id: 'p_15', name: 'Rodri', country: 'Espanha', flag: '🇪🇸', rating: 92, position: 'MC', role: 'Volante', club: 'Manchester City' },
  { id: 'p_16', name: 'Kevin De Bruyne', country: 'Bélgica', flag: '🇧🇪', rating: 91, position: 'MC', role: 'Meia Armador', club: 'Manchester City' },
  { id: 'p_17', name: 'Jude Bellingham', country: 'Inglaterra', flag: '🏴', rating: 91, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
  { id: 'p_18', name: 'Martin Ødegaard', country: 'Noruega', flag: '🇳🇴', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Arsenal' },
  { id: 'p_19', name: 'Federico Valverde', country: 'Uruguai', flag: '🇺🇾', rating: 89, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
  { id: 'p_20', name: 'Bruno Fernandes', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meia Armador', club: 'Manchester United' },
  { id: 'p_21', name: 'Jamal Musiala', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayern München' },
  { id: 'p_22', name: 'Bernardo Silva', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meio-Campista', club: 'Manchester City' },
  { id: 'p_23', name: 'Luka Modrić', country: 'Croácia', flag: '🇭🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
  { id: 'p_24', name: 'Pedri', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
  { id: 'p_25', name: 'Frenkie de Jong', country: 'Holanda', flag: '🇳🇱', rating: 86, position: 'MC', role: 'Volante', club: 'Barcelona' },
  { id: 'p_26', name: 'Alexis Mac Allister', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Liverpool' },
  { id: 'p_46', name: 'Florian Wirtz', country: 'Alemanha', flag: '🇩🇪', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Bayer Leverkusen' },
  { id: 'p_47', name: 'Declan Rice', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'MC', role: 'Volante', club: 'Arsenal' },
  { id: 'p_48', name: 'Eduardo Camavinga', country: 'França', flag: '🇫🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
  { id: 'p_49', name: 'Bruno Guimarães', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'MC', role: 'Volante', club: 'Newcastle' },
  { id: 'p_50', name: 'Vitinha', country: 'Portugal', flag: '🇵🇹', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'PSG' },
  { id: 'p_51', name: 'Gavi', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
  { id: 'p_61', name: 'Cole Palmer', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Chelsea' },
  { id: 'p_62', name: 'Phil Foden', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Manchester City' },
  { id: 'p_80', name: 'Aurélien Tchouaméni', country: 'França', flag: '🇫🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Real Madrid' },
  { id: 'p_81', name: 'Enzo Fernández', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'MC', role: 'Meio-Campista', club: 'Chelsea' },
  { id: 'p_82', name: 'Ilkay Gündogan', country: 'Alemanha', flag: '🇩🇪', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
  { id: 'p_83', name: 'Hakan Çalhanoğlu', country: 'Turquia', flag: '🇹🇷', rating: 86, position: 'MC', role: 'Volante', club: 'Inter de Milão' },
  { id: 'p_84', name: 'James Maddison', country: 'Inglaterra', flag: '🏴', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Tottenham' },
  { id: 'p_85', name: 'Douglas Luiz', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'MC', role: 'Volante', club: 'Juventus' },

  // Atacantes (27)
  { id: 'p_27', name: 'Kylian Mbappé', country: 'França', flag: '🇫🇷', rating: 92, position: 'AT', role: 'Ponta Esquerda', club: 'Real Madrid' },
  { id: 'p_28', name: 'Vinicius Júnior', country: 'Brasil', flag: '🇧🇷', rating: 92, position: 'AT', role: 'Ponta Esquerda', club: 'Real Madrid' },
  { id: 'p_29', name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Inter Miami' },
  { id: 'p_30', name: 'Erling Haaland', country: 'Noruega', flag: '🇳🇴', rating: 91, position: 'AT', role: 'Centroavante', club: 'Manchester City' },
  { id: 'p_31', name: 'Harry Kane', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'AT', role: 'Centroavante', club: 'Bayern München' },
  { id: 'p_32', name: 'Mohamed Salah', country: 'Egito', flag: '🇪🇬', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Liverpool' },
  { id: 'p_33', name: 'Bukayo Saka', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Arsenal' },
  { id: 'p_35', name: 'Antoine Griezmann', country: 'França', flag: '🇫🇷', rating: 86, position: 'AT', role: 'Segundo Atacante', club: 'Atlético Madrid' },
  { id: 'p_34', name: 'Son Heung-min', country: 'Coreia do Sul', flag: '🇰🇷', rating: 87, position: 'AT', role: 'Ponta Esquerda', club: 'Tottenham' },
  { id: 'p_36', name: 'Lautaro Martínez', country: 'Argentina', flag: '🇦🇷', rating: 89, position: 'AT', role: 'Centroavante', club: 'Inter' },
  { id: 'p_37', name: 'Rafael Leão', country: 'Portugal', flag: '🇵🇹', rating: 87, position: 'AT', role: 'Ponta Esquerda', club: 'AC Milan' },
  { id: 'p_52', name: 'Lamine Yamal', country: 'Espanha', flag: '🇪🇸', rating: 91, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
  { id: 'p_53', name: 'Neymar Jr.', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Ponta Esquerda', club: 'Al-Hilal' },
  { id: 'p_54', name: 'Cristiano Ronaldo', country: 'Portugal', flag: '🇵🇹', rating: 87, position: 'AT', role: 'Centroavante', club: 'Al-Nassr' },
  { id: 'p_55', name: 'Nico Williams', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'AT', role: 'Ponta Esquerda', club: 'Athletic Club' },
  { id: 'p_56', name: 'Luis Díaz', country: 'Colômbia', flag: '🇨🇴', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'Liverpool' },
  { id: 'p_57', name: 'Christian Pulisic', country: 'Estados Unidos', flag: '🇺🇸', rating: 85, position: 'AT', role: 'Ponta Direita', club: 'AC Milan' },
  { id: 'p_58', name: 'Rodrygo Goes', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Ponta Direita', club: 'Real Madrid' },
  { id: 'p_59', name: 'Julián Álvarez', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'AT', role: 'Centroavante', club: 'Atlético de Madrid' },
  { id: 'p_60', name: 'Viktor Gyökeres', country: 'Suécia', flag: '🇸🇪', rating: 89, position: 'AT', role: 'Centroavante', club: 'Sporting CP' },
  { id: 'p_86', name: 'Robert Lewandowski', country: 'Polônia', flag: '🇵🇱', rating: 88, position: 'AT', role: 'Centroavante', club: 'Barcelona' },
  { id: 'p_87', name: 'Victor Osimhen', country: 'Nigéria', flag: '🇳🇬', rating: 87, position: 'AT', role: 'Centroavante', club: 'Galatasaray' },
  { id: 'p_88', name: 'Khvicha Kvaratskhelia', country: 'Geórgia', flag: '🇬🇪', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'Napoli' },
  { id: 'p_89', name: 'Dušan Vlahović', country: 'Sérvia', flag: '🇷🇸', rating: 85, position: 'AT', role: 'Centroavante', club: 'Juventus' },
  { id: 'p_90', name: 'Endrick Felipe', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'AT', role: 'Centroavante', club: 'Real Madrid' },
  { id: 'p_91', name: 'Raphinha Dias', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
  { id: 'p_92', name: 'Gabriel Martinelli', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'AT', role: 'Ponta Esquerda', club: 'Arsenal' },

  // Ídolos das Copas Do Mundo (35 Atletas Lendários)
  { id: 'p_101', name: 'Pelé', country: 'Brasil', flag: '🇧🇷', rating: 99, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_102', name: 'Diego Maradona', country: 'Argentina', flag: '🇦🇷', rating: 99, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_103', name: 'Ronaldo Nazário', country: 'Brasil', flag: '🇧🇷', rating: 98, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_104', name: 'Johan Cruyff', country: 'Países Baixos', flag: '🇳🇱', rating: 98, position: 'AT', role: 'Segundo Atacante', club: 'Ícone' },
  { id: 'p_105', name: 'Zinedine Zidane', country: 'França', flag: '🇫🇷', rating: 98, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_106', name: 'Franz Beckenbauer', country: 'Alemanha', flag: '🇩🇪', rating: 98, position: 'DF', role: 'Líbero', club: 'Ícone' },
  { id: 'p_107', name: 'Garrincha', country: 'Brasil', flag: '🇧🇷', rating: 98, position: 'AT', role: 'Ponta Direita', club: 'Ícone' },
  { id: 'p_108', name: 'Ronaldinho Gaúcho', country: 'Brasil', flag: '🇧🇷', rating: 98, position: 'AT', role: 'Ponta Esquerda', club: 'Ícone' },
  { id: 'p_109', name: 'Alfredo Di Stéfano', country: 'Argentina/Espanha', flag: '🇦🇷', rating: 98, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_110', name: 'Ferenc Puskás', country: 'Hungria', flag: '🇭🇺', rating: 97, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_111', name: 'Eusébio', country: 'Portugal', flag: '🇵🇹', rating: 97, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_112', name: 'Zico', country: 'Brasil', flag: '🇧🇷', rating: 97, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_113', name: 'Michel Platini', country: 'França', flag: '🇫🇷', rating: 97, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_114', name: 'Gerd Müller', country: 'Alemanha', flag: '🇩🇪', rating: 97, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_115', name: 'Marco van Basten', country: 'Países Baixos', flag: '🇳🇱', rating: 97, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_116', name: 'Romário', country: 'Brasil', flag: '🇧🇷', rating: 97, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_117', name: 'Paolo Maldini', country: 'Itália', flag: '🇮🇹', rating: 97, position: 'DF', role: 'Lateral Esquerdo', club: 'Ícone' },
  { id: 'p_118', name: 'Lev Yashin', country: 'União Soviética', flag: '☭', rating: 97, position: 'GK', role: 'Goleiro', club: 'Ícone' },
  { id: 'p_119', name: 'Bobby Charlton', country: 'Inglaterra', flag: '🏴', rating: 97, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_120', name: 'Kaká', country: 'Brasil', flag: '🇧🇷', rating: 96, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_121', name: 'Roberto Carlos', country: 'Brasil', flag: '🇧🇷', rating: 96, position: 'DF', role: 'Lateral Esquerdo', club: 'Ícone' },
  { id: 'p_122', name: 'Thierry Henry', country: 'França', flag: '🇫🇷', rating: 96, position: 'AT', role: 'Centroavante', club: 'Ícone' },
  { id: 'p_123', name: 'Franco Baresi', country: 'Itália', flag: '🇮🇹', rating: 96, position: 'DF', role: 'Zagueiro', club: 'Ícone' },
  { id: 'p_124', name: 'Gianluigi Buffon', country: 'Itália', flag: '🇮🇹', rating: 96, position: 'GK', role: 'Goleiro', club: 'Ícone' },
  { id: 'p_125', name: 'George Best', country: 'Irlanda do Norte', flag: '🏴', rating: 96, position: 'AT', role: 'Ponta Direita', club: 'Ícone' },
  { id: 'p_126', name: 'Ruud Gullit', country: 'Países Baixos', flag: '🇳🇱', rating: 96, position: 'MC', role: 'Meio-Campista', club: 'Ícone' },
  { id: 'p_127', name: 'Lothar Matthäus', country: 'Alemanha', flag: '🇩🇪', rating: 96, position: 'MC', role: 'Volante', club: 'Ícone' },
  { id: 'p_128', name: 'Rivaldo', country: 'Brasil', flag: '🇧🇷', rating: 96, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_129', name: 'Xavi Hernández', country: 'Espanha', flag: '🇪🇸', rating: 96, position: 'MC', role: 'Meio-Campista', club: 'Ícone' },
  { id: 'p_130', name: 'Andrés Iniesta', country: 'Espanha', flag: '🇪🇸', rating: 96, position: 'MC', role: 'Meio-Campista', club: 'Ícone' },
  { id: 'p_131', name: 'Sandro Mazzola', country: 'Itália', flag: '🇮🇹', rating: 96, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_132', name: 'Sócrates', country: 'Brasil', flag: '🇧🇷', rating: 96, position: 'MC', role: 'Meia Armador', club: 'Ícone' },
  { id: 'p_133', name: 'Carlos Alberto Torres', country: 'Brasil', flag: '🇧🇷', rating: 96, position: 'DF', role: 'Lateral Direito', club: 'Ícone' },
  { id: 'p_134', name: 'Gordon Banks', country: 'Inglaterra', flag: '🏴', rating: 96, position: 'GK', role: 'Goleiro', club: 'Ícone' },
  { id: 'p_135', name: 'Luís Figo', country: 'Portugal', flag: '🇵🇹', rating: 96, position: 'AT', role: 'Ponta Direita', club: 'Ícone' }
];

export type Formation = 
  | '4-3-3' 
  | '4-4-2' 
  | '3-4-3' 
  | '3-5-2'
  | '4-1-2-1-2'
  | '4-2-3-1'
  | '4-5-1'
  | '4-3-2-1'
  | '5-3-2'
  | '5-4-1'
  | '3-4-1-2'
  | '3-4-2-1'
  | '4-2-4'
  | '4-2-2-2'
  | '4-3-1-2'
  | '4-1-4-1'
  | '4-4-1-1'
  | '5-2-1-2'
  | '3-1-4-2';

export interface FormationSlot {
  index: number;
  label: string;
  position: 'GK' | 'DF' | 'MC' | 'AT';
  // Posições no campo (percentual top/left) para renderização visual
  top: string;
  left: string;
}

export const FORMATIONS: Record<Formation, FormationSlot[]> = {
  '4-3-3': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Meio-Campo Esq.', position: 'MC', top: '39%', left: '24%' },
    { index: 6, label: 'Volante', position: 'MC', top: '44%', left: '50%' },
    { index: 7, label: 'Meio-Campo Dir.', position: 'MC', top: '39%', left: '76%' },
    { index: 8, label: 'Ponta Esquerda', position: 'AT', top: '15%', left: '18%' },
    { index: 9, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' },
    { index: 10, label: 'Ponta Direita', position: 'AT', top: '15%', left: '82%' }
  ],
  '4-4-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Meia Esq.', position: 'MC', top: '40%', left: '15%' },
    { index: 6, label: 'Volante Esq.', position: 'MC', top: '44%', left: '37%' },
    { index: 7, label: 'Volante Dir.', position: 'MC', top: '44%', left: '63%' },
    { index: 8, label: 'Meia Dir.', position: 'MC', top: '40%', left: '85%' },
    { index: 9, label: 'Atacante Rec.', position: 'AT', top: '15%', left: '34%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '66%' }
  ],
  '3-4-3': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '22%' },
    { index: 2, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '78%' },
    { index: 4, label: 'Meia Esq.', position: 'MC', top: '40%', left: '15%' },
    { index: 5, label: 'Meio-Campo Central', position: 'MC', top: '44%', left: '37%' },
    { index: 6, label: 'Meio-Campo Central', position: 'MC', top: '44%', left: '63%' },
    { index: 7, label: 'Meia Dir.', position: 'MC', top: '40%', left: '85%' },
    { index: 8, label: 'Ponta Esquerda', position: 'AT', top: '15%', left: '18%' },
    { index: 9, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' },
    { index: 10, label: 'Ponta Direita', position: 'AT', top: '15%', left: '82%' }
  ],
  '3-5-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '22%' },
    { index: 2, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '78%' },
    { index: 4, label: 'Meia Lateral Esq.', position: 'MC', top: '41%', left: '15%' },
    { index: 5, label: 'Volante', position: 'MC', top: '47%', left: '34%' },
    { index: 6, label: 'Volante', position: 'MC', top: '47%', left: '66%' },
    { index: 7, label: 'Meia Armador', position: 'MC', top: '32%', left: '50%' },
    { index: 8, label: 'Meia Lateral Dir.', position: 'MC', top: '41%', left: '85%' },
    { index: 9, label: 'Atacante Esq.', position: 'AT', top: '11%', left: '31%' },
    { index: 10, label: 'Atacante Dir.', position: 'AT', top: '11%', left: '69%' }
  ],
  '4-1-2-1-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Volante', position: 'MC', top: '51%', left: '50%' },
    { index: 6, label: 'Meia Esq.', position: 'MC', top: '40%', left: '26%' },
    { index: 7, label: 'Meia Dir.', position: 'MC', top: '40%', left: '74%' },
    { index: 8, label: 'Meia Armador', position: 'MC', top: '30%', left: '50%' },
    { index: 9, label: 'Atacante Rec.', position: 'AT', top: '15%', left: '34%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '66%' }
  ],
  '4-2-3-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Volante Esq.', position: 'MC', top: '48%', left: '36%' },
    { index: 6, label: 'Volante Dir.', position: 'MC', top: '48%', left: '64%' },
    { index: 7, label: 'Meia Esq.', position: 'MC', top: '30%', left: '22%' },
    { index: 8, label: 'Meia Armador', position: 'MC', top: '30%', left: '50%' },
    { index: 9, label: 'Meia Dir.', position: 'MC', top: '30%', left: '78%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '4-5-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Meia Esq.', position: 'MC', top: '40%', left: '15%' },
    { index: 6, label: 'Meio-Campo Esq.', position: 'MC', top: '44%', left: '34%' },
    { index: 7, label: 'Meio Central', position: 'MC', top: '47%', left: '50%' },
    { index: 8, label: 'Meio-Campo Dir.', position: 'MC', top: '44%', left: '66%' },
    { index: 9, label: 'Meia Dir.', position: 'MC', top: '40%', left: '85%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '4-3-2-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Meio Esq.', position: 'MC', top: '47%', left: '26%' },
    { index: 6, label: 'Volante Central', position: 'MC', top: '50%', left: '50%' },
    { index: 7, label: 'Meio Dir.', position: 'MC', top: '47%', left: '74%' },
    { index: 8, label: 'Meia Armador Esq.', position: 'MC', top: '31%', left: '34%' },
    { index: 9, label: 'Meia Armador Dir.', position: 'MC', top: '31%', left: '66%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '5-3-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Ala Esquerdo', position: 'DF', top: '59%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '32%' },
    { index: 3, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 4, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '68%' },
    { index: 5, label: 'Ala Direito', position: 'DF', top: '59%', left: '85%' },
    { index: 6, label: 'Meio-Campo Esq.', position: 'MC', top: '41%', left: '28%' },
    { index: 7, label: 'Volante', position: 'MC', top: '46%', left: '50%' },
    { index: 8, label: 'Meio-Campo Dir.', position: 'MC', top: '41%', left: '72%' },
    { index: 9, label: 'Atacante Esq.', position: 'AT', top: '11%', left: '34%' },
    { index: 10, label: 'Atacante Dir.', position: 'AT', top: '11%', left: '66%' }
  ],
  '5-4-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Ala Esquerdo', position: 'DF', top: '59%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '32%' },
    { index: 3, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 4, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '68%' },
    { index: 5, label: 'Ala Direito', position: 'DF', top: '59%', left: '85%' },
    { index: 6, label: 'Meia Esq.', position: 'MC', top: '41%', left: '23%' },
    { index: 7, label: 'Volante Esq.', position: 'MC', top: '45%', left: '42%' },
    { index: 8, label: 'Volante Dir.', position: 'MC', top: '45%', left: '58%' },
    { index: 9, label: 'Meia Dir.', position: 'MC', top: '41%', left: '77%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '3-4-1-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '22%' },
    { index: 2, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '78%' },
    { index: 4, label: 'Meia Lateral Esq.', position: 'MC', top: '41%', left: '15%' },
    { index: 5, label: 'Volante Esq.', position: 'MC', top: '47%', left: '36%' },
    { index: 6, label: 'Volante Dir.', position: 'MC', top: '47%', left: '64%' },
    { index: 7, label: 'Meia Lateral Dir.', position: 'MC', top: '41%', left: '85%' },
    { index: 8, label: 'Meia Armador', position: 'MC', top: '30%', left: '50%' },
    { index: 9, label: 'Atacante Esq.', position: 'AT', top: '11%', left: '31%' },
    { index: 10, label: 'Atacante Dir.', position: 'AT', top: '11%', left: '69%' }
  ],
  '3-4-2-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '22%' },
    { index: 2, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '78%' },
    { index: 4, label: 'Meia Lateral Esq.', position: 'MC', top: '41%', left: '15%' },
    { index: 5, label: 'Volante Esq.', position: 'MC', top: '47%', left: '36%' },
    { index: 6, label: 'Volante Dir.', position: 'MC', top: '47%', left: '64%' },
    { index: 7, label: 'Meia Lateral Dir.', position: 'MC', top: '41%', left: '85%' },
    { index: 8, label: 'Meia Armador Esq.', position: 'MC', top: '28%', left: '30%' },
    { index: 9, label: 'Meia Armador Dir.', position: 'MC', top: '28%', left: '70%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '4-2-4': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Volante Esq.', position: 'MC', top: '44%', left: '38%' },
    { index: 6, label: 'Volante Dir.', position: 'MC', top: '44%', left: '62%' },
    { index: 7, label: 'Ponta Esquerda', position: 'AT', top: '15%', left: '18%' },
    { index: 8, label: 'Centroavante Esq.', position: 'AT', top: '11%', left: '39%' },
    { index: 9, label: 'Centroavante Dir.', position: 'AT', top: '11%', left: '61%' },
    { index: 10, label: 'Ponta Direita', position: 'AT', top: '15%', left: '82%' }
  ],
  '4-2-2-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Volante Esq.', position: 'MC', top: '48%', left: '35%' },
    { index: 6, label: 'Volante Dir.', position: 'MC', top: '48%', left: '65%' },
    { index: 7, label: 'Meia Armador Esq.', position: 'MC', top: '30%', left: '26%' },
    { index: 8, label: 'Meia Armador Dir.', position: 'MC', top: '30%', left: '74%' },
    { index: 9, label: 'Centroavante Esq.', position: 'AT', top: '11%', left: '34%' },
    { index: 10, label: 'Centroavante Dir.', position: 'AT', top: '11%', left: '66%' }
  ],
  '4-3-1-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Meio Central Esq.', position: 'MC', top: '45%', left: '28%' },
    { index: 6, label: 'Volante Central', position: 'MC', top: '49%', left: '50%' },
    { index: 7, label: 'Meio Central Dir.', position: 'MC', top: '45%', left: '72%' },
    { index: 8, label: 'Meia Armador', position: 'MC', top: '31%', left: '50%' },
    { index: 9, label: 'Centroavante Esq.', position: 'AT', top: '11%', left: '34%' },
    { index: 10, label: 'Centroavante Dir.', position: 'AT', top: '11%', left: '66%' }
  ],
  '4-1-4-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Volante', position: 'MC', top: '50%', left: '50%' },
    { index: 6, label: 'Meia Lateral Esq.', position: 'MC', top: '36%', left: '15%' },
    { index: 7, label: 'Meio-Campo Esq.', position: 'MC', top: '38%', left: '36%' },
    { index: 8, label: 'Meio-Campo Dir.', position: 'MC', top: '38%', left: '64%' },
    { index: 9, label: 'Meia Lateral Dir.', position: 'MC', top: '36%', left: '85%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '4-4-1-1': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Lateral Esq.', position: 'DF', top: '61%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '37%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '63%' },
    { index: 4, label: 'Lateral Dir.', position: 'DF', top: '61%', left: '85%' },
    { index: 5, label: 'Meia Lateral Esq.', position: 'MC', top: '41%', left: '15%' },
    { index: 6, label: 'Volante Esq.', position: 'MC', top: '45%', left: '37%' },
    { index: 7, label: 'Volante Dir.', position: 'MC', top: '45%', left: '63%' },
    { index: 8, label: 'Meia Lateral Dir.', position: 'MC', top: '41%', left: '85%' },
    { index: 9, label: 'Meia Ofensivo', position: 'MC', top: '24%', left: '50%' },
    { index: 10, label: 'Centroavante', position: 'AT', top: '11%', left: '50%' }
  ],
  '5-2-1-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Ala Esquerdo', position: 'DF', top: '59%', left: '15%' },
    { index: 2, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '32%' },
    { index: 3, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 4, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '68%' },
    { index: 5, label: 'Ala Direito', position: 'DF', top: '59%', left: '85%' },
    { index: 6, label: 'Volante Esq.', position: 'MC', top: '46%', left: '36%' },
    { index: 7, label: 'Volante Dir.', position: 'MC', top: '46%', left: '64%' },
    { index: 8, label: 'Meia Armador', position: 'MC', top: '31%', left: '50%' },
    { index: 9, label: 'Centroavante Esq.', position: 'AT', top: '11%', left: '34%' },
    { index: 10, label: 'Centroavante Dir.', position: 'AT', top: '11%', left: '66%' }
  ],
  '3-1-4-2': [
    { index: 0, label: 'Goleiro', position: 'GK', top: '86%', left: '50%' },
    { index: 1, label: 'Zagueiro Esq.', position: 'DF', top: '66%', left: '22%' },
    { index: 2, label: 'Zagueiro Central', position: 'DF', top: '68%', left: '50%' },
    { index: 3, label: 'Zagueiro Dir.', position: 'DF', top: '66%', left: '78%' },
    { index: 4, label: 'Volante Central', position: 'MC', top: '50%', left: '50%' },
    { index: 5, label: 'Meia Lateral Esq.', position: 'MC', top: '37%', left: '15%' },
    { index: 6, label: 'Meio-Campo Esq.', position: 'MC', top: '39%', left: '34%' },
    { index: 7, label: 'Meio-Campo Dir.', position: 'MC', top: '39%', left: '66%' },
    { index: 8, label: 'Meia Lateral Dir.', position: 'MC', top: '37%', left: '85%' },
    { index: 9, label: 'Centroavante Esq.', position: 'AT', top: '11%', left: '31%' },
    { index: 10, label: 'Centroavante Dir.', position: 'AT', top: '11%', left: '69%' }
  ]
};

// Tabela de preços / valores fictícios baseada nas faixas de ratings da FIFA
const getPlayerPrice = (rating: number): number => {
  if (rating >= 92) return 30; // ex: Mbappé, Vinicius Jr (superestrelas = $30M)
  if (rating === 91) return 25; // ex: Messi, Haaland ($25M)
  if (rating === 90) return 20; // ex: Bellingham, Courtois ($20M)
  if (rating === 89) return 15; // ex: van Dijk, Wirtz ($15M)
  if (rating === 88) return 12; // ex: Martinez, Pedri ($12M)
  if (rating === 87) return 10; // ex: Donnarumma ($10M)
  if (rating === 86) return 8;  // $8M
  if (rating === 85) return 6;  // $6M
  if (rating === 84) return 5;  // $5M
  return 4; // $4M para jogadores complementares
};

export const UltimateTeam: React.FC = () => {
  const [teamName, setTeamName] = useState<string>('Meus Galácticos 2026');
  const [formation, setFormation] = useState<Formation>('4-3-3');
  
  // Array de 11 strings (IDs dos jogadores) correspondente a cada slot da formação ativa
  const [selectedSquad, setSelectedSquad] = useState<(string | null)[]>(Array(11).fill(null));

  // Números personalizados das camisas dos 11 slots
  const [jerseyNumbers, setJerseyNumbers] = useState<string[]>(['1', '6', '3', '4', '2', '5', '8', '10', '11', '9', '7']);
  
  // Slot atualmente selecionado pelo usuário para editar
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(0);
  
  // Jersey theme color
  const [jerseyColor, setJerseyColor] = useState<string>('#10b981'); // Emerald por padrão

  // Sistema de Toasts e Modais sem window.alert ou confirm
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info' }[]>([]);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);
  const [exportedText, setExportedText] = useState<string | null>(null);

  const addNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  // Filtro de pesquisa de jogadores na sidebar
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPos, setFilterPos] = useState<string>('ALL');

  // Modo Limite de Orçamento canônico ($100M)
  const [useBudgetLimit, setUseBudgetLimit] = useState<boolean>(() => {
    return localStorage.getItem('wc_use_budget_limit') === 'true';
  });

  // Carregar do localStorage
  useEffect(() => {
    const storedSquad = localStorage.getItem('wc_dream_squad');
    const storedName = localStorage.getItem('wc_dream_team_name');
    const storedForm = localStorage.getItem('wc_dream_formation');
    const storedColor = localStorage.getItem('wc_dream_jersey_color');
    const storedNumbers = localStorage.getItem('wc_dream_jersey_numbers');

    if (storedSquad) {
      try {
        const parsed = JSON.parse(storedSquad);
        if (Array.isArray(parsed)) {
          setSelectedSquad(parsed);
        }
      } catch (e) {
        // Ignora
      }
    }
    if (storedNumbers) {
      try {
        const parsed = JSON.parse(storedNumbers);
        if (Array.isArray(parsed)) {
          setJerseyNumbers(parsed);
        }
      } catch (e) {
        // Ignora
      }
    }
    if (storedName) setTeamName(storedName);
    if (storedForm) setFormation(storedForm as Formation);
    if (storedColor) setJerseyColor(storedColor);
  }, []);

  // Persistir estado do interruptor do limite de orçamento
  useEffect(() => {
    localStorage.setItem('wc_use_budget_limit', String(useBudgetLimit));
  }, [useBudgetLimit]);

  // Jogadores atualmente escalados (ignorando os slots vazios)
  const squadPlayers = useMemo(() => {
    const list = Array.isArray(selectedSquad) ? selectedSquad : [];
    return list
      .map(id => WORLD_PLAYERS.find(p => p.id === id))
      .filter((p): p is Player => !!p);
  }, [selectedSquad]);

  // Custo agregado do time
  const totalSquadCost = useMemo(() => {
    return squadPlayers.reduce((acc, p) => acc + getPlayerPrice(p.rating), 0);
  }, [squadPlayers]);

  const budgetRemaining = 100 - totalSquadCost;

  const saveSquad = () => {
    if (useBudgetLimit && totalSquadCost > 100) {
      addNotification('Não é possível salvar! Seu elenco atual ultrapassa o teto salarial de $100M. Remova algumas estrelas.', 'error');
      return;
    }
    localStorage.setItem('wc_dream_squad', JSON.stringify(selectedSquad));
    localStorage.setItem('wc_dream_team_name', teamName);
    localStorage.setItem('wc_dream_formation', formation);
    localStorage.setItem('wc_dream_jersey_color', jerseyColor);
    localStorage.setItem('wc_dream_jersey_numbers', JSON.stringify(jerseyNumbers));
    
    addNotification('Escalação dos Galácticos salva com sucesso no navegador! 💾', 'success');
  };

  const clearSquad = () => {
    setSelectedSquad(Array(11).fill(null));
    setJerseyNumbers(['1', '6', '3', '4', '2', '5', '8', '10', '11', '9', '7']);
    setActiveSlotIndex(0);
    setShowClearConfirm(false);
    addNotification('Sua escalação ideal foi totalmente limpa! 🧼', 'success');
  };

  const exportToPNG = () => {
    const scale = 2.5; // Premium High-DPI super-sampling (renders at 2.5x resolution for ultra-sharp poster exports)
    const canvas = document.createElement('canvas');
    canvas.width = 800 * scale;
    canvas.height = 1000 * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      addNotification('Falha ao iniciar o sistema gráfico para criar PNG. ⚠️', 'error');
      return;
    }

    // Scale context to work in normal 800x1000 coordinator units
    ctx.scale(scale, scale);

    // --- Background (Dark Cyber Stadium Gradient) ---
    const bgGradient = ctx.createRadialGradient(400, 500, 100, 400, 500, 700);
    bgGradient.addColorStop(0, '#0f172a'); // Teal-slate center
    bgGradient.addColorStop(0.5, '#020617'); // Pitch deep blue
    bgGradient.addColorStop(1, '#050508'); // High-contrast midnight black border
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 800, 1000);

    // Fine tech-blueprint grid lines for digital tactical board aesthetic
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 800; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1000);
      ctx.stroke();
    }
    for (let y = 0; y < 1000; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(800, y);
      ctx.stroke();
    }

    // --- Pitch Styling (Immersive Cyber Green Turf) ---
    const marginPad = 40;
    const fieldWidth = 800 - marginPad * 2; // 720
    const fieldHeight = 1000 - marginPad * 2 - 165; // 755
    const fieldY = 155;

    // Outer framing glow around pitch
    ctx.shadowColor = 'rgba(16, 185, 129, 0.1)';
    ctx.shadowBlur = 30;
    
    // Turf base color with center neon green gradient
    const pitchGrad = ctx.createRadialGradient(400, fieldY + fieldHeight/2, 60, 400, fieldY + fieldHeight/2, 530);
    pitchGrad.addColorStop(0, '#0c1d15'); // Glowing neon green stadium center
    pitchGrad.addColorStop(0.3, '#07120e'); // Forest turf dark tone
    pitchGrad.addColorStop(0.85, '#030707'); // Deep slate dark teal
    pitchGrad.addColorStop(1, '#010204'); // Pitch border darkness
    ctx.fillStyle = pitchGrad;
    ctx.fillRect(marginPad, fieldY, fieldWidth, fieldHeight);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Grass stripes (alternating horizontal strips)
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 15; i++) {
      const stripeY = fieldY + (i * (fieldHeight / 15));
      const stripeH = fieldHeight / 15;
      if (i % 2 === 0) {
        ctx.globalAlpha = 0.015;
        ctx.fillRect(marginPad, stripeY, fieldWidth, stripeH);
      }
    }
    ctx.globalAlpha = 1.0;

    // --- Pitch Architectural Markup (Futuristic Stadium Blueprint Lines) ---
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1.6;

    // Main Field Outer Border
    ctx.strokeRect(marginPad, fieldY, fieldWidth, fieldHeight);
    
    // Double line frame for ultimate television style
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 5;
    ctx.strokeRect(marginPad - 3, fieldY - 3, fieldWidth + 6, fieldHeight + 6);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1.6;

    // Midfield line
    ctx.beginPath();
    ctx.moveTo(marginPad, fieldY + fieldHeight / 2);
    ctx.lineTo(marginPad + fieldWidth, fieldY + fieldHeight / 2);
    ctx.stroke();

    // Center Circle
    ctx.beginPath();
    ctx.arc(400, fieldY + fieldHeight / 2, 80, 0, Math.PI * 2);
    ctx.stroke();

    // Center Spot
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    ctx.arc(400, fieldY + fieldHeight / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    // Penalty Points
    ctx.beginPath();
    ctx.arc(400, fieldY + 95, 3.5, 0, Math.PI * 2); // Top penalty spot
    ctx.arc(400, fieldY + fieldHeight - 95, 3.5, 0, Math.PI * 2); // Bottom penalty spot
    ctx.fill();

    // Penalty Box (Grande Área) + Goal Box (Pequena Área)
    // Top
    ctx.strokeRect(400 - 160, fieldY, 320, 110);
    ctx.strokeRect(400 - 70, fieldY, 140, 40);
    ctx.beginPath();
    ctx.arc(400, fieldY + 95, 55, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Bottom
    ctx.strokeRect(400 - 160, fieldY + fieldHeight - 110, 320, 110);
    ctx.strokeRect(400 - 70, fieldY + fieldHeight - 40, 140, 40);
    ctx.beginPath();
    ctx.arc(400, fieldY + fieldHeight - 95, 55, 1.15 * Math.PI, 1.85 * Math.PI);
    ctx.stroke();

    // Corner curves (Escanteios)
    const cr = 14;
    ctx.beginPath(); ctx.arc(marginPad, fieldY, cr, 0, 0.5 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(marginPad + fieldWidth, fieldY, cr, 0.5 * Math.PI, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(marginPad, fieldY + fieldHeight, cr, 1.5 * Math.PI, 2 * Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(marginPad + fieldWidth, fieldY + fieldHeight, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();


    // --- Golden Trophy Icon Drawing Helper ---
    const drawTrophyIcon = (c: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
      c.save();
      c.fillStyle = '#fbbf24'; // Gold
      c.strokeStyle = '#d97706'; // Amber shadow border
      c.lineWidth = 1.5;
      
      // Cup head
      c.beginPath();
      c.moveTo(cx - size, cy - size);
      c.lineTo(cx + size, cy - size);
      c.quadraticCurveTo(cx + size, cy + size * 0.3, cx + size * 0.4, cy + size * 0.8);
      c.lineTo(cx - size * 0.4, cy + size * 0.8);
      c.quadraticCurveTo(cx - size, cy + size * 0.3, cx - size, cy - size);
      c.closePath();
      c.fill();
      c.stroke();
      
      // Stem/Base
      c.beginPath();
      c.fillRect(cx - size * 0.15, cy + size * 0.6, size * 0.3, size * 0.4);
      c.fillRect(cx - size * 0.6, cy + size * 0.95, size * 1.2, size * 0.25);
      
      // Handles
      c.beginPath();
      c.arc(cx - size * 1.05, cy - size * 0.35, size * 0.45, 0, Math.PI * 2);
      c.strokeStyle = '#fbbf24';
      c.lineWidth = 2;
      c.stroke();
      
      c.beginPath();
      c.arc(cx + size * 1.05, cy - size * 0.35, size * 0.45, 0, Math.PI * 2);
      c.stroke();
      
      c.restore();
    };

    // --- Vector Soccer Jersey Drawing Helper ---
    const drawJersey = (c: CanvasRenderingContext2D, cx: number, cy: number, mainColor: string, jNum: string) => {
      c.save();
      let accentColor = '#ffffff';
      if (mainColor === '#ffffff') accentColor = '#1d4ed8'; // Royal Blue
      else if (mainColor === '#10b981') accentColor = '#fbbf24'; // Golden
      else if (mainColor === '#ef4444') accentColor = '#ffffff'; // White
      else if (mainColor === '#3b82f6') accentColor = '#fbbf24'; // Gold
      else if (mainColor === '#f59e0b') accentColor = '#1e293b'; // Slate
      else accentColor = '#ffffff';

      c.beginPath();
      c.moveTo(cx - 4, cy - 12);
      c.lineTo(cx + 4, cy - 12); // Neck collar
      c.lineTo(cx + 9, cy - 12); // Shoulder right
      c.lineTo(cx + 17, cy - 5);  // sleeve top
      c.lineTo(cx + 13, cy - 1);  // cuff edge
      c.lineTo(cx + 9, cy - 4);   // armpit
      c.lineTo(cx + 9, cy + 12);  // jersey hem right
      c.lineTo(cx - 9, cy + 12);  // jersey hem left
      c.lineTo(cx - 9, cy - 4);   // armpit left
      c.lineTo(cx - 13, cy - 1);  // cuff edge left
      c.lineTo(cx - 17, cy - 5);  // sleeve top left
      c.lineTo(cx - 9, cy - 12);  // shoulder left
      c.closePath();

      // Draw shadow representation
      c.shadowColor = 'rgba(0, 0, 0, 0.45)';
      c.shadowBlur = 6;
      c.shadowOffsetY = 3;
      c.fillStyle = mainColor;
      c.fill();

      // Reset shadow for fine work
      c.shadowColor = 'transparent';
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;

      // Draw sleeve cuffs
      c.lineWidth = 1.8;
      c.strokeStyle = accentColor;
      c.beginPath();
      c.moveTo(cx - 17, cy - 5);
      c.lineTo(cx - 13, cy - 1);
      c.stroke();
      c.beginPath();
      c.moveTo(cx + 13, cy - 1);
      c.lineTo(cx + 17, cy - 5);
      c.stroke();

      // V-neck collar detail
      c.beginPath();
      c.moveTo(cx - 4, cy - 12);
      c.lineTo(cx, cy - 8);
      c.lineTo(cx + 4, cy - 12);
      c.stroke();

      // Sports Stripe aesthetics
      c.globalAlpha = 0.22;
      c.fillStyle = accentColor;
      c.fillRect(cx - 1.5, cy - 8, 3, 20);
      c.globalAlpha = 1.0;

      // Jersey Chest Squad Number
      c.font = '900 10.5px "JetBrains Mono", monospace';
      c.fillStyle = mainColor === '#ffffff' ? '#0f172a' : '#ffffff';
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillText(jNum, cx, cy + 2.5);

      c.restore();
    };

    // --- Elegant Header Glass Panel Board ---
    ctx.save();
    const headX = marginPad;
    const headY = 24;
    const headW = fieldWidth;
    const headH = 112;

    const headGrad = ctx.createLinearGradient(headX, headY, headX, headY + headH);
    headGrad.addColorStop(0, 'rgba(15, 23, 42, 0.94)'); // Deep charcoal slate
    headGrad.addColorStop(1, 'rgba(30, 41, 59, 0.82)');
    ctx.fillStyle = headGrad;

    // Draw rounded header card
    ctx.beginPath();
    ctx.roundRect(headX, headY, headW, headH, 6);
    ctx.fill();

    // Board Fine Border
    ctx.strokeStyle = teamRating >= 90 ? 'rgba(251, 191, 36, 0.35)' : 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    
    // Symmetrical Trophy design
    drawTrophyIcon(ctx, 400, 46, 11);

    // Main Title Typo (Beautiful Brazilian-Swiss inspired layout)
    ctx.textAlign = 'center';
    
    // Draw Text Glow
    ctx.shadowColor = jerseyColor;
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 24px "Inter", sans-serif';
    ctx.fillText(teamName.toUpperCase(), 400, 83);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Metadata Subtitle Info Bar
    ctx.fillStyle = '#94a3b8';
    ctx.font = '900 9px monospace';
    ctx.fillText(`ESQUEMA TÁTICO: ${formation}   •   GERAL DO TIME: ${teamRating} GER   •   ENTROSAMENTO: ${teamChemistry}/100`, 400, 108);
    ctx.restore();


    // --- FUT Shield drawing path helper ---
    const drawFUTShieldPath = (c: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number) => {
      const x = cx - w / 2;
      const y = cy - h / 2;
      const r = 6;
      c.beginPath();
      c.moveTo(x, y + r * 1.5);
      c.lineTo(x + r * 1.5, y);
      c.lineTo(x + w - r * 1.5, y);
      c.lineTo(x + w, y + r * 1.5);
      c.lineTo(x + w, y + h * 0.72);
      c.lineTo(x + w / 2, y + h);
      c.lineTo(x, y + h * 0.72);
      c.closePath();
    };


    // --- Iterating Squad Slots to Draw ---
    slots.forEach((slot) => {
      const topPct = parseFloat(slot.top);
      const leftPct = parseFloat(slot.left);

      // Interpolate center positions
      const x = marginPad + (leftPct / 100) * fieldWidth;
      const y = fieldY + (topPct / 100) * fieldHeight;

      const player = selectedSquad[slot.index]
        ? WORLD_PLAYERS.find(pl => pl.id === selectedSquad[slot.index])
        : null;

      if (player) {
        // --- DRAWS FILLED CARD (Gold, Silver, Bronze custom tier layouts) ---
        const jNum = jerseyNumbers[slot.index] || (slot.index + 1).toString();
        const cardW = 90;
        const cardH = 125;

        // Determine Elite Medal Tiers for extreme quality fidelity
        const ratingVal = player.rating;
        let borderStroke = jerseyColor;
        let cardBgGrad = ctx.createLinearGradient(x - cardW/2, y - cardH/2, x + cardW/2, y + cardH/2);
        let goldGlow = false;
        let starCount = 3;

        if (ratingVal >= 90) { // GOLD ELITE CHAMPION
          borderStroke = '#fbbf24'; // Gold hex
          cardBgGrad.addColorStop(0, '#1c1303');
          cardBgGrad.addColorStop(0.4, '#3e2908');
          cardBgGrad.addColorStop(0.75, '#221603');
          cardBgGrad.addColorStop(1, '#0e0902');
          goldGlow = true;
          starCount = 5;
        } else if (ratingVal >= 87) { // SILVER MASTER
          borderStroke = '#cbd5e1'; // Metallic Silver
          cardBgGrad.addColorStop(0, '#0f172a');
          cardBgGrad.addColorStop(0.5, '#1e293b');
          cardBgGrad.addColorStop(1, '#020617');
          starCount = 4;
        } else { // BRONZE TEAM PLAYER
          borderStroke = '#475569'; // Slate Charcoal
          cardBgGrad.addColorStop(0, '#0c0a09');
          cardBgGrad.addColorStop(0.6, '#1c1917');
          cardBgGrad.addColorStop(1, '#020101');
        }

        // Draw shadow on card
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.48)';
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 8;
        
        drawFUTShieldPath(ctx, x, y, cardW, cardH);
        ctx.fillStyle = cardBgGrad;
        ctx.fill();
        ctx.restore();

        // Draw shiny metallic diagonal reflection stripes for legendary gold cards
        if (goldGlow) {
          ctx.save();
          drawFUTShieldPath(ctx, x, y, cardW, cardH);
          ctx.clip(); // Bind inside FUT card
          
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.1)';
          ctx.lineWidth = 14;
          ctx.moveTo(x - cardW, y + cardH);
          ctx.lineTo(x + cardW, y - cardH);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.16)';
          ctx.lineWidth = 4;
          ctx.moveTo(x - cardW + 18, y + cardH);
          ctx.lineTo(x + cardW + 18, y - cardH);
          ctx.stroke();
          ctx.restore();
        }

        // Card Border Stroke (Brilliant light vector frame)
        ctx.save();
        drawFUTShieldPath(ctx, x, y, cardW, cardH);
        ctx.strokeStyle = borderStroke;
        ctx.lineWidth = goldGlow ? 1.8 : 1.2;
        ctx.stroke();
        ctx.restore();

        // --- Left-Side Attributes Typography (Beautifully paired) ---
        ctx.textAlign = 'left';
        
        // 1. Rating value
        ctx.font = 'italic 900 18px "Inter", sans-serif';
        ctx.fillStyle = goldGlow ? '#fbbf24' : '#ffffff';
        ctx.fillText(`${player.rating}`, x - cardW/2 + 9, y - 38);

        // 2. Position Label
        ctx.font = '900 8.5px monospace';
        ctx.fillStyle = player.position === slot.position ? '#22c55e' : '#f59e0b';
        ctx.fillText(player.position, x - cardW/2 + 9, y - 25);

        // 3. Country Flag representation
        ctx.font = '14px "Inter", system-ui, sans-serif';
        ctx.fillText(player.flag, x - cardW/2 + 9, y - 10);

        // --- Right-Side Vector Apparel Graphic ---
        drawJersey(ctx, x + 16, y - 23, jerseyColor, jNum);

        // --- Middle horizontal divider line ---
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - cardW/2 + 8, y + 6);
        ctx.lineTo(x + cardW/2 - 8, y + 6);
        ctx.stroke();

        // --- Glassmorphism Name Badge Banner ---
        ctx.save();
        const bW = 76;
        const bH = 15;
        const bX = x - bW/2;
        const bY = y + 12;

        // Banner backdrop
        ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
        ctx.beginPath();
        ctx.roundRect(bX, bY, bW, bH, 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Render player's last name
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic 900 9px "Inter", sans-serif';
        const pLastName = player.name.split(' ').pop()?.toUpperCase() || player.name.toUpperCase();
        ctx.fillText(pLastName, x, y + 22.5);
        ctx.restore();

        // Club details below
        ctx.textAlign = 'center';
        ctx.fillStyle = '#94a3b8';
        ctx.font = '700 7.5px "Inter", sans-serif';
        const shortClub = player.club.length > 14 ? player.club.slice(0, 13) + '...' : player.club;
        ctx.fillText(shortClub.toUpperCase(), x, y + 35);

        // --- Custom Gold Coin Balance Badge (Aesthetic In-Game Gold Token) ---
        ctx.save();
        const coinW = 60;
        const coinH = 11;
        const coinX = x - coinW/2;
        const coinY = y + 43;

        // Draw pill card background for coins value
        ctx.fillStyle = 'rgba(245, 158, 11, 0.11)';
        ctx.beginPath();
        ctx.roundRect(coinX, coinY, coinW, coinH, 6);
        ctx.fill();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.22)';
        ctx.stroke();

        // Tiny vector gold coin shape
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(x - 19, y + 48.5, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#78350f';
        ctx.font = '900 6px "Inter", sans-serif';
        ctx.fillText('$', x - 19, y + 50);

        // Value in text (Label is GER to follow the overall team classification)
        ctx.fillStyle = '#f59e0b';
        ctx.font = '900 7.5px monospace';
        ctx.fillText(`$${getPlayerPrice(player.rating)}M GER`, x + 5, y + 51.5);
        ctx.restore();

      } else {
        // --- DRAW EMPTY SLOT DESIGN (Sophisticated dashboard grid placeholders) ---
        const emptyW = 74;
        const emptyH = 100;

        ctx.save();
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.35;
        
        drawFUTShieldPath(ctx, x, y, emptyW, emptyH);
        ctx.stroke();
        ctx.setLineDash([]); // clear dash

        // Soft internal shading
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        drawFUTShieldPath(ctx, x, y, emptyW, emptyH);
        ctx.fill();

        // Draw soft "+" circle icon
        ctx.beginPath();
        ctx.arc(x, y - 5, 8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = '200 13px "Inter", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.textAlign = 'center';
        ctx.fillText('+', x, y - 1);

        // Position label
        ctx.font = '950 8px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillText(slot.label.toUpperCase(), x, y + 18);
        ctx.restore();
      }
    });


    // --- High-Gloss Metrics Dashboard Box (y = 1000 - 155 to 1000 - 65) ---
    // Beautiful glassy tactical telemetry card replacing the empty footer space!
    const dashX = marginPad;
    const dashY = 1000 - 156;
    const dashW = fieldWidth;
    const dashH = 92;

    ctx.save();
    const dGrad = ctx.createLinearGradient(dashX, dashY, dashX, dashY + dashH);
    dGrad.addColorStop(0, 'rgba(15, 23, 42, 0.94)'); // Matching glass card theme
    dGrad.addColorStop(1, 'rgba(8, 12, 21, 0.98)');
    ctx.fillStyle = dGrad;

    ctx.beginPath();
    ctx.roundRect(dashX, dashY, dashW, dashH, 5);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // --- Col 1: Squad GER Star Rating ---
    const col1X = dashX + 120;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = '900 8.5px monospace';
    ctx.fillText('GER GERAL DO TIME', col1X, dashY + 30);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 21px "Inter", sans-serif';
    ctx.fillText(`${teamRating} GER`, col1X, dashY + 54);

    // Dynamic mini golden stars
    let starSymbol = '★★★';
    if (teamRating >= 90) starSymbol = '★★★★★';
    else if (teamRating >= 85) starSymbol = '★★★★';
    ctx.fillStyle = '#fbbf24';
    ctx.font = '10px "Inter", sans-serif';
    ctx.fillText(starSymbol, col1X, dashY + 68);

    // --- Col 2: Tactical Squad Chemistry ---
    const col2X = 400;
    ctx.fillStyle = '#64748b';
    ctx.font = '900 8.5px monospace';
    ctx.fillText('ENTROSAMENTO TÁTICO', col2X, dashY + 30);

    ctx.fillStyle = teamChemistry >= 80 ? '#10b981' : teamChemistry >= 50 ? '#f59e0b' : '#3b82f6';
    ctx.font = 'italic 900 21px "Inter", sans-serif';
    ctx.fillText(`${teamChemistry}/100`, col2X, dashY + 54);

    // Draw little colorful progress line representing chemistry
    const barW = 120;
    const barH = 3.5;
    const barX = col2X - barW/2;
    const barY = dashY + 63;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 2);
    ctx.fill();

    const filledLength = (teamChemistry / 100) * barW;
    const barGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    barGrad.addColorStop(0, '#3b82f6');
    barGrad.addColorStop(1, '#10b981');
    ctx.fillStyle = barGrad;
    ctx.beginPath();
    ctx.roundRect(barX, barY, filledLength, barH, 2);
    ctx.fill();

    // --- Col 3: Budget Gasto & Coins Limit ---
    const col3X = 800 - marginPad - 120;
    ctx.fillStyle = '#64748b';
    ctx.font = '900 8.5px monospace';
    ctx.fillText('VALOR DO SQUAD', col3X, dashY + 30);

    const isExceeded = useBudgetLimit && budgetRemaining < 0;
    ctx.fillStyle = isExceeded ? '#ef4444' : '#ffffff';
    ctx.font = 'italic 900 21px "Inter", sans-serif';
    ctx.fillText(`$${totalSquadCost}M`, col3X, dashY + 54);

    ctx.fillStyle = isExceeded ? '#ef4444' : '#94a3b8';
    ctx.font = '800 8px monospace';
    ctx.fillText(useBudgetLimit ? `SALDO: $${budgetRemaining}M / $100M` : 'ORÇAMENTO ILIMITADO', col3X, dashY + 68);

    ctx.restore();


    // --- Symmetrical Footer branding notes ---
    ctx.textAlign = 'center';
    ctx.font = '900 9.5px monospace';
    ctx.fillStyle = '#475569';
    ctx.fillText('COPA WORLD CUP 2026 • SIMULADOR OFICIAL FANTASY', 400, 1000 - 38);

    ctx.font = '500 7.5px monospace';
    ctx.fillStyle = '#334155';
    ctx.fillText('FANTASY ULTIMATE TEAM DE EXPORTAÇÃO EM ALTA RESOLUÇÃO', 400, 1000 - 24);

    try {
      const url = canvas.toDataURL('image/png', 1.0); // Maximum quality factor
      const tempLink = document.createElement('a');
      tempLink.download = `${teamName.toLowerCase().replace(/\s+/g, '_')}_escalacao_alta_resolucao.png`;
      tempLink.href = url;
      tempLink.click();
      addNotification('Imagem em alta resolução exportada com sucesso! 📸', 'success');
    } catch (_) {
      addNotification('Falha ao exportar a imagem da escalação. Verifique se o navegador suporta downloads de Canvas.', 'error');
    }
  };

  const exportToText = () => {
    const averageRating = teamRating;
    const chemistry = teamChemistry;
    const totalSpent = totalSquadCost;

    let textOut = `MEU SQUAD DOS SONHOS GERAL\n\n`;
    textOut += `Seleção: ${teamName.toUpperCase()}\n`;
    textOut += `Esquema Tático: ${formation}\n`;
    textOut += `Geral: ${averageRating} GER\n`;
    textOut += `Entrosamento: ${chemistry}/100\n`;
    textOut += `Investimento: $${totalSpent}M\n\n`;

    textOut += `ESCALAÇÃO TITULAR:\n`;

    const getSectorLines = (roleSlots: FormationSlot[]) => {
      let lines = '';
      roleSlots.forEach(slot => {
        const pId = selectedSquad[slot.index];
        const p = pId ? WORLD_PLAYERS.find(pl => pl.id === pId) : null;
        const num = jerseyNumbers[slot.index] || (slot.index + 1).toString();
        if (p) {
          lines += `• Nº${num} ${p.flag} ${p.name.toUpperCase()} (${slot.label}) - ${p.rating} GER\n`;
        } else {
          lines += `• Nº${num} 🚫 [Posição Vazia] (${slot.label})\n`;
        }
      });
      return lines;
    };

    const currentSlots = FORMATIONS[formation] || FORMATIONS['4-3-3'];
    const atSlots = currentSlots.filter(s => parseFloat(s.top) < 30).sort((a,b) => parseFloat(a.left) - parseFloat(b.left));
    const mcSlots = currentSlots.filter(s => parseFloat(s.top) >= 30 && parseFloat(s.top) < 55).sort((a,b) => parseFloat(a.left) - parseFloat(b.left));
    const dfSlots = currentSlots.filter(s => parseFloat(s.top) >= 55 && parseFloat(s.top) < 75).sort((a,b) => parseFloat(a.left) - parseFloat(b.left));
    const gkSlots = currentSlots.filter(s => parseFloat(s.top) >= 75).sort((a,b) => parseFloat(a.left) - parseFloat(b.left));

    if (atSlots.length > 0) {
      textOut += `\nATAQUE:\n` + getSectorLines(atSlots);
    }
    if (mcSlots.length > 0) {
      textOut += `\nMEIO-CAMPO:\n` + getSectorLines(mcSlots);
    }
    if (dfSlots.length > 0) {
      textOut += `\nDEFESA:\n` + getSectorLines(dfSlots);
    }
    if (gkSlots.length > 0) {
      textOut += `\nGOLEIRO:\n` + getSectorLines(gkSlots);
    }

    textOut += `\nMonte seu time no Copa do Mundo 2026 Simulator!\n`;
    textOut += `#WorldCup2026 #UltimateTeam #LineupSimulator #FantasyFut #CopaSimulador`;

    setExportedText(textOut);
    try {
      navigator.clipboard.writeText(textOut);
      addNotification('Escalação copiada para o clipboard! Visualize e copie abaixo se necessário.', 'success');
    } catch (e) {
      addNotification('Erro ao copiar automaticamente. Selecione o texto na caixa para copiar manualmente.', 'warning');
    }
  };

  // Estatística: Média de rating (Rating Geral do Time - GER)
  // Fórmula de Squad Rating inspirada na mecânica oficial do EA Sports FC / FIFA:
  // 1. Calcula a média simples das classificações nos 11 slots (posições vazias contam como 0 no progresso geral)
  // 2. Acrescenta o Fator de Correção de Força (bônus proporcional à diferença positiva das estrelas sobre a média simples)
  const teamRating = useMemo(() => {
    if (squadPlayers.length === 0) return 0;
    
    const ratings = Array(11).fill(0);
    selectedSquad.forEach((pId, idx) => {
      if (pId) {
        const player = WORLD_PLAYERS.find(p => p.id === pId);
        if (player) ratings[idx] = player.rating;
      }
    });

    const sum = ratings.reduce((acc, r) => acc + r, 0);
    const rawAverage = sum / 11;

    let correctionSum = 0;
    ratings.forEach(r => {
      if (r > rawAverage) {
        correctionSum += (r - rawAverage);
      }
    });

    const finalGER = Math.round(rawAverage + (correctionSum / 11));
    return Math.max(0, Math.min(99, finalGER));
  }, [selectedSquad, squadPlayers]);

  // Estatística: Entrosamento (Chemistry)
  // Calculado baseado em:
  // - Jogadores do mesmo país (afinidade)
  // - Posições jogadas corretamente (afinidade de posição de campo: se o jogador escalado no slot é daquela categoria de posição)
  const teamChemistry = useMemo(() => {
    if (squadPlayers.length === 0) return 0;

    let chemPoints = 0;
    const currentSlots = FORMATIONS[formation] || FORMATIONS['4-3-3'];

    // 1. Afinidade de categoria de posição (GK, DF, MC, AT)
    selectedSquad.forEach((pId, idx) => {
      if (!pId) return;
      const player = WORLD_PLAYERS.find(p => p.id === pId);
      const slot = currentSlots[idx];
      if (player && slot && player.position === slot.position) {
        chemPoints += 4; // Bônus significativo por jogar na faixa certa de campo
      }
    });

    // 2. Afinidade por países iguais jogando juntos
    const countriesCount: Record<string, number> = {};
    squadPlayers.forEach(p => {
      countriesCount[p.country] = (countriesCount[p.country] || 0) + 1;
    });
    
    Object.values(countriesCount).forEach(count => {
      if (count >= 2) {
        chemPoints += count * 4.5; // Combo de nação
      }
    });

    return Math.min(100, Math.round(chemPoints + (squadPlayers.length * 2)));
  }, [selectedSquad, formation, squadPlayers]);

  const slots = FORMATIONS[formation] || FORMATIONS['4-3-3'];

  // Atribuir o jogador ao slot que está ativo
  const handleSelectPlayer = (player: Player) => {
    if (activeSlotIndex === null) return;

    // Verificar se o jogador já está escalado em algum outro slot do time
    const existingIndex = selectedSquad.indexOf(player.id);
    const updatedSquad = [...selectedSquad];

    // Verificar limite de orçamento de moedas virtuais ($100M)
    if (useBudgetLimit && existingIndex === -1) {
      // Se houver substituição de jogador no slot atual, calculamos a diferença de custo
      const prevPlayerId = selectedSquad[activeSlotIndex];
      const prevPlayer = prevPlayerId ? WORLD_PLAYERS.find(p => p.id === prevPlayerId) : null;
      const prevCost = prevPlayer ? getPlayerPrice(prevPlayer.rating) : 0;
      const newCost = getPlayerPrice(player.rating);
      const netCostChange = newCost - prevCost;

      if (totalSquadCost + netCostChange > 100) {
        addNotification(`🚨 Teto Salarial Excedido! ${player.name} custa $${newCost}M (Limite para este slot: $${budgetRemaining + prevCost}M).`, 'error');
        return;
      }
    }

    if (existingIndex !== -1) {
      // Se ele já estava em outro slot, remove do outro slot (evita duplicar jogador)
      updatedSquad[existingIndex] = null;
    }

    updatedSquad[activeSlotIndex] = player.id;
    setSelectedSquad(updatedSquad);

    // Mover automaticamente para o próximo slot vazio para agilizar a criação
    const nextEmptyIndex = updatedSquad.findIndex((sKey, i) => i > activeSlotIndex && sKey === null);
    if (nextEmptyIndex !== -1) {
      setActiveSlotIndex(nextEmptyIndex);
    } else {
      const anyEmptyIndex = updatedSquad.indexOf(null);
      if (anyEmptyIndex !== -1) {
        setActiveSlotIndex(anyEmptyIndex);
      } else {
        setActiveSlotIndex(null); // time completo!
      }
    }
  };

  const handleRemovePlayerFromSlot = (slotIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = [...selectedSquad];
    updated[slotIdx] = null;
    setSelectedSquad(updated);
    setActiveSlotIndex(slotIdx);
  };

  const activeSlot = activeSlotIndex !== null ? slots[activeSlotIndex] : null;

  // Filtrar catálogo de craques na sidebar
  const filteredCatalog = useMemo(() => {
    return WORLD_PLAYERS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPosition = filterPos === 'ALL' || p.position === filterPos;
      
      return matchesSearch && matchesPosition;
    });
  }, [searchQuery, filterPos]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Banner Superior com Logo de Fantasy Cup */}
      <div className="bg-white border border-slate-200 rounded-sm p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-black italic">
            <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
            Recurso Exclusivo • Fantasy FIFA World Cup 2026
          </div>
          <h1 className="text-3xl sm:text-4.5xl font-black text-slate-900 italic uppercase tracking-tighter">
            Copa Ultimate Team
          </h1>
          <p className="text-slate-500 text-xs max-w-xl font-medium">
            Monte seu esquadrão ideal com 11 autênticas lendas selecionadas entre as 120 estrelas mundiais e ídolos históricos das Copas. Escolha a tática, organize a formação e analise o entrosamento definitivo.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <button
            onClick={saveSquad}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            title="Salvar Escalação atual no Navegador"
          >
            <Save className="h-3.5 w-3.5" />
            Salvar Escalação
          </button>
          <button
            onClick={exportToPNG}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            title="Exportar escalação como pôster em Alta Resolução (PNG)"
          >
            <Camera className="h-3.5 w-3.5" />
            Exportar Imagem
          </button>
          <button
            onClick={exportToText}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-white border border-slate-205 hover:bg-slate-50 hover:border-slate-350 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-sm shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
            title="Copiar escalação em formato de texto"
          >
            <Copy className="h-3.5 w-3.5" />
            Exportar Texto
          </button>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-red-50 border border-red-200 hover:bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer rounded-sm hover:-translate-y-0.5 active:translate-y-0"
            title="Limpar Escalação"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Limpar
          </button>
        </div>
      </div>

      {/* Editor de Nome do Time e Formação */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-slate-200 p-4 rounded-sm shadow-xs">
        
        <div>
          <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Nome da sua Seleção Ideal</label>
          <input
            id="ultimate-team-name-input"
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1.5 w-full bg-slate-50 border border-slate-250 focus:border-blue-500 rounded-sm px-3 py-2 text-slate-800 font-bold text-xs focus:ring-1 focus:ring-blue-500/10 focus:outline-none"
            placeholder="Ex: Dream Team Brasil"
          />
        </div>

        <div>
          <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Esquema Tático (Formação)</label>
          <select
            id="ultimate-formation-select"
            value={formation}
            onChange={(e) => {
              const newForm = e.target.value as Formation;
              setFormation(newForm);
              // Transpor as escolhas anteriores ou resetar se mudou de tamanho drástico
              // Para garantir consistência, limpamos e mantemos os que cabem ou apenas adaptamos
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
          <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Cor do Uniforme dos Craques</label>
          <div className="flex gap-2 mt-1.5">
            {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#ec4899', '#ffffff'].map((color) => (
              <button
                key={color}
                onClick={() => setJerseyColor(color)}
                style={{ backgroundColor: color }}
                className={`w-7 h-7 rounded-sm border cursor-pointer transition-all ${
                  jerseyColor === color ? 'border-slate-800 scale-110 shadow-xs' : 'border-slate-200 opacity-80 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Desafio de Orçamento ($100M)</label>
          <div className="mt-1.5 flex gap-2">
            <button
              id="budget-limit-toggle-btn"
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

      {/* Grid de Duas Colunas: Campo de Futebol (Lado Esquerdo) + Seletor/Detalhes (Lado Direito) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Campo de Futebol (Col 7 / 12) */}
        <div id="soccer-field-container" className="lg:col-span-7 space-y-4">
          
          {/* Caixa de Scorecard do Time */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Rating Geral do Time */}
            <div className="bg-white border border-slate-200 p-3 rounded-sm flex items-center justify-between shadow-xs shadow-slate-100">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Geral do Squad</span>
                <span className="text-2xl font-mono font-black text-slate-900">{teamRating}</span>
              </div>
              <div className="w-10 h-10 bg-blue-50 border border-blue-200 text-blue-600 rounded-sm flex items-center justify-center font-black text-xs font-mono">
                GER
              </div>
            </div>

            {/* Entrosamento Completo */}
            <div className="bg-white border border-slate-200 p-3 rounded-sm flex items-center justify-between shadow-xs shadow-slate-100">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Química</span>
                <span className="text-2xl font-mono font-black text-slate-900">{teamChemistry}<span className="text-xs text-slate-400 relative -top-1">/100</span></span>
              </div>
              <div className="w-10 h-10 bg-blue-50 border border-blue-200 text-[10px] text-blue-600 rounded-sm flex items-center justify-center font-mono font-black">
                CHEM
              </div>
            </div>

            {/* Escarpas/Jogadores Cadastrados */}
            <div className="bg-white border border-slate-200 p-3 rounded-sm flex items-center justify-between shadow-xs shadow-slate-100">
              <div>
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Escalados</span>
                <span className="text-2xl font-mono font-black text-slate-900">{squadPlayers.length}<span className="text-xs text-slate-400 relative -top-1">/11</span></span>
              </div>
              <div className="w-10 h-10 bg-slate-50 text-[10px] text-slate-500 border border-slate-200 rounded-sm flex items-center justify-center font-mono font-black">
                SQUAD
              </div>
            </div>

            {/* Quadro de Orçamento ($100M) */}
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
                <span className="text-[9px] font-mono font-black uppercase text-slate-400 block">Value / Saldo</span>
                <span className={`text-xl font-mono font-black leading-tight ${
                  useBudgetLimit 
                    ? budgetRemaining < 0 
                      ? 'text-red-650' 
                      : budgetRemaining < 15 
                        ? 'text-amber-600' 
                        : 'text-blue-650'
                    : 'text-slate-800'
                }`}>
                  {useBudgetLimit ? `$${budgetRemaining}M` : `$${totalSquadCost}M`}
                </span>
                <span className="text-[8px] text-slate-500 font-mono block uppercase mt-0.5 leading-none">
                  Total spent: ${totalSquadCost}M
                </span>
              </div>
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-black text-xs ${
                useBudgetLimit
                  ? budgetRemaining < 0
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                $
              </div>
            </div>
          </div>

          {/* Banner de Warning por Estouro de Orçamento */}
          {useBudgetLimit && budgetRemaining < 0 && (
            <div id="budget-limit-warning-banner" className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-sm text-xs flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>
                <strong>Teto salarial ultra-estourado!</strong> Seu time atual custa <strong>${totalSquadCost}M</strong>, excedendo as moedas permitidas ($100M). Ajuste ou desative o Limite de Orçamento.
              </span>
            </div>
          )}

          {/* O Campo de Futebol Visual em si */}
          <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-950 to-slate-900 border border-white/10 rounded-sm overflow-hidden shadow-2xl relative select-none">
            
            {/* Visual Grass Lines Overlay */}
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
                ? WORLD_PLAYERS.find(p => p.id === selectedSquad[slot.index]) 
                : null;
              const isActive = activeSlotIndex === slot.index;

              return (
                <div
                  id={`field-slot-${slot.index}`}
                  key={slot.index}
                  style={{ top: slot.top, left: slot.left }}
                  onClick={() => setActiveSlotIndex(slot.index)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center cursor-pointer group"
                >
                  {/* Camisa Nº Badge flutuante */}
                  {playerInSlot && (
                    <div className="absolute -top-1.5 -left-1.5 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] font-mono z-30 shadow-md border border-white">
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
                       // Exibir Cartão / Avatar Simplificado do Craque Escalado
                      <div className="w-full h-full flex flex-col items-center justify-center rounded-full overflow-hidden text-center select-none bg-white border border-slate-150 relative">
                        <div className="absolute top-1.5 text-[12px] text-slate-800 font-extrabold tracking-tight select-none leading-none">
                          {playerInSlot.rating}
                        </div>
                        <div 
                          className="absolute inset-x-0 bottom-0 h-4 bg-slate-50 border-t border-slate-100"
                        />
                        <div className="font-sans text-[8.5px] font-bold text-slate-700 mt-2.5 leading-none select-none z-10">
                          {playerInSlot.name.split(' ').pop()?.toUpperCase()}
                        </div>
                        {/* Indicador de Faixa de Posição ou Preço com Base na Opção Ativa */}
                        <div className="absolute bottom-0 text-[7.5px] font-mono leading-none scale-90 select-none z-10 mb-0.5">
                          {useBudgetLimit ? (
                            <span className="text-blue-600 font-black">${getPlayerPrice(playerInSlot.rating)}M</span>
                          ) : (
                            playerInSlot.position === slot.position ? (
                              <span className="text-green-600 font-bold uppercase">{playerInSlot.position}</span>
                            ) : (
                              <span className="text-red-500 font-bold uppercase">{playerInSlot.position} ⚠️</span>
                            )
                          )}
                        </div>
                        {/* Botão X para retirar jogador do slot de forma rápida */}
                        <button
                          onClick={(e) => handleRemovePlayerFromSlot(slot.index, e)}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-650 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-35"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      // Slot Vazio
                      <div className="flex flex-col items-center justify-center">
                        <Plus className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      </div>
                    )}
                  </div>

                  {/* Nome da Posição / Etiqueta do Slot de Campo */}
                  <div className={`mt-1 font-mono text-[8px] font-black uppercase text-center px-1.5 py-0.5 rounded-xs tracking-wider ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : playerInSlot 
                        ? 'text-slate-700 bg-white border border-slate-200 shadow-xs' 
                        : 'text-slate-450 bg-slate-100 border border-slate-150'
                  }`}>
                    {playerInSlot ? `${playerInSlot.flag} ${playerInSlot.name.split(' ').pop()} (#${jerseyNumbers[slot.index] || (slot.index + 1)})` : slot.label}
                  </div>

                </div>
              );
            })}

          </div>

          {/* Painel de Customização de Números das Camisas */}
          <div className="bg-white border border-slate-200 p-4 rounded-sm space-y-3 shadow-xs">
            <div>
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span>🔢 Customizar Números das Camisas</span>
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">Defina o número de cada um dos titulares escalados no campo.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {slots.map((slot) => {
                const pId = selectedSquad[slot.index];
                const player = pId ? WORLD_PLAYERS.find(p => p.id === pId) : null;
                if (!player) return null;
                return (
                  <div key={slot.index} className="bg-slate-50 border border-slate-200 p-2 rounded-sm flex flex-col gap-1.5 items-center justify-center">
                    <span className="text-[8.5px] font-mono font-black text-slate-600 truncate w-full text-center tracking-tight">
                      {player.name.split(' ').pop()?.toUpperCase()}
                    </span>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-[9px] font-mono font-bold text-slate-400">Nº</span>
                      <input
                        type="text"
                        maxLength={3}
                        value={jerseyNumbers[slot.index] || ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const updated = [...jerseyNumbers];
                          updated[slot.index] = val;
                          setJerseyNumbers(updated);
                        }}
                        className="w-12 bg-white border border-slate-250 focus:border-blue-500 max-w-full rounded-xs text-center py-0.5 text-xs text-slate-800 font-mono font-black focus:outline-none"
                      />
                    </div>
                  </div>
                );
              })}
              {squadPlayers.length === 0 && (
                <div className="col-span-full py-3 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Nenhum craque escalado no campo.</span>
                  <span className="text-[9px] text-slate-500 block uppercase mt-0.5">Selecione atletas no campo acima.</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-3 rounded-sm">
            <span className="text-[10px] font-mono font-black text-blue-600 uppercase flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              💡 DICA: Clique em qualquer slot no campo para selecionar o jogador para aquela posição na barra lateral direita.
            </span>
          </div>

        </div>

        {/* Sidebar Seleta de Atletas (Col 5 / 12) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Slot de Foco de Escalação Ativo */}
          <div className="bg-white border-2 border-blue-650 p-4 rounded-sm space-y-2.5 shadow-sm">
            <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-200 rounded-sm">
              <span className="text-[9px] font-mono font-black uppercase text-slate-500 tracking-wider">Passo Ativo: Seleção</span>
              <span className="bg-blue-50 border border-blue-200 text-blue-600 font-mono text-[9px] px-2 py-0.5 rounded-xs uppercase font-black">
                {activeSlot ? `Slot #${activeSlot.index + 1}` : 'Nenhum Slot Ativo'}
              </span>
            </div>

            {activeSlot ? (
              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-sm">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                      Escalar para: <span className="text-blue-600 italic font-black">{activeSlot.label}</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase font-mono mt-0.5">
                      Selecione um dos astros {activeSlot.position} exibidos abaixo para o preenchimento ideal.
                    </p>
                  </div>
                </div>
                {selectedSquad[activeSlot.index] && (
                  <button
                    onClick={(e) => handleRemovePlayerFromSlot(activeSlot.index, e)}
                    className="w-full py-1.5 px-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-xs text-[10px] font-black uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-1.5 font-mono"
                    title="Remover jogador escalado desta posição"
                  >
                    <X className="h-3 w-3" />
                    Limpar Jogador Desta Posição
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-[10px] text-slate-500 uppercase font-mono font-extrabold">
                  ⚠️ Esquadrão concluído! Clique em salvar ou remova um astro para continuar editando.
                </p>
              </div>
            )}
          </div>

          {/* Catálogo de 120 Príncipes da Bola */}
          <div className="bg-white border border-slate-200 rounded-sm p-4 space-y-4 relative shadow-xs">
            
            <div className="space-y-2.5">
              <span className="text-slate-800 font-mono text-[11px] font-black uppercase tracking-wider">
                Catálogo Geral de Craques (120 Atletas)
              </span>

              {/* Filtros e Busca */}
              <div className="space-y-2">
                <input
                  id="player-search-box"
                  type="text"
                  placeholder="Pesquisar por nome, país, clube..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-sm px-3 py-2 text-slate-850 font-bold text-xs focus:ring-1 focus:ring-blue-500/10 focus:outline-none"
                />

                {/* Filtro Rápido de Posição de Campo */}
                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { key: 'ALL', label: 'Todos' },
                    { key: 'GK', label: 'Goleiros' },
                    { key: 'DF', label: 'Defesa' },
                    { key: 'MC', label: 'Meio' },
                    { key: 'AT', label: 'Atque' }
                  ].map((pos) => (
                    <button
                      key={pos.key}
                      onClick={() => setFilterPos(pos.key)}
                      className={`flex-shrink-0 px-3 py-1.5 font-mono text-[9px] font-black uppercase rounded-xs border transition-all cursor-pointer ${
                        filterPos === pos.key
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Listagem do Escopo de 37 Atletas */}
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {filteredCatalog.map(player => {
                // Verificar se o jogador já está escalado
                const isSelected = selectedSquad.includes(player.id);
                // Sugerir se é o encaixe ideal da posição atual ativa
                const isIdealPosition = activeSlot && activeSlot.position === player.position;

                return (
                  <div
                    id={`player-card-btn-${player.id}`}
                    key={player.id}
                    onClick={() => handleSelectPlayer(player)}
                    className={`p-2 rounded-sm border cursor-pointer flex items-center justify-between transition-all duration-200 ${
                      isSelected 
                        ? 'bg-blue-50/70 border-blue-300 text-slate-900 shadow-xs' 
                        : isIdealPosition
                          ? 'bg-amber-50/50 hover:bg-slate-50 border-amber-300 hover:border-amber-400'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-350'
                    }`}
                  >
                    
                    <div className="flex items-center gap-2.5">
                      {/* Badge do Overrating */}
                      <div className="w-10 h-10 bg-slate-50 rounded border border-slate-200 flex flex-col items-center justify-center relative shrink-0">
                        {/* Jersey small badge */}
                        <div 
                          className="absolute top-0 inset-x-0 h-1 rounded-sm opacity-65" 
                          style={{ backgroundColor: isSelected ? jerseyColor : '#cbd5e1' }} 
                        />
                        <span className="text-[14px] font-mono font-black text-slate-800 leading-none mt-1">{player.rating}</span>
                        <span className="text-[8px] font-mono text-slate-500 font-bold leading-none mt-0.5">{player.position}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-900 text-xs font-black truncate max-w-[150px]" title={player.name}>
                            {player.name}
                          </span>
                          <span className="text-[10px]" title={player.country}>{player.flag}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                          <span className="text-[8.5px] font-mono text-slate-500 uppercase font-bold">
                            {player.role} • {player.club}
                          </span>
                          <span className="text-[9px] text-blue-600 font-mono font-black uppercase flex items-center">
                            ${getPlayerPrice(player.rating)}M
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <div className="w-6 h-6 bg-blue-650 text-white font-black rounded flex items-center justify-center text-[10px] shadow-sm">
                          ✓
                        </div>
                      ) : isIdealPosition ? (
                        <span className="text-[8px] font-mono font-black border border-amber-300 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                          Ideal
                        </span>
                      ) : (
                        <div className="w-6 h-6 border border-slate-200 rounded flex items-center justify-center hover:bg-slate-100 transition-all text-slate-400 text-xs font-bold shadow-xs">
                          +
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}

              {filteredCatalog.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-xs text-slate-500 font-mono uppercase font-bold">Nenhum jogador encontrado com os filtros indicados.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none p-4">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-sm border shadow-2xl flex items-start gap-2.5 transition-all duration-300 animate-fadeIn ${
              n.type === 'success' ? 'bg-slate-900 border-emerald-500/30 text-white' :
              n.type === 'error' ? 'bg-slate-950 border-rose-500/40 text-rose-200' :
              n.type === 'warning' ? 'bg-slate-900 border-amber-500/30 text-amber-200' :
              'bg-slate-900 border-white/10 text-slate-200'
            }`}
          >
            <div className="mt-1 shrink-0">
              {n.type === 'success' && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
              {n.type === 'error' && <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
              {n.type === 'warning' && <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />}
              {n.type === 'info' && <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />}
            </div>
            <div className="flex-1 text-[11px] font-medium leading-relaxed font-sans">
              {n.message}
            </div>
            <button
              onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
              className="text-slate-500 hover:text-slate-300 text-xs font-bold leading-none cursor-pointer self-start"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Custom Confirmation Modal: Clear Squad */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-sm p-6 shadow-2xl relative space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 text-red-650">
              <div className="p-2.5 bg-red-50 rounded-sm">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">Limpar Escalação do Ultimate Team?</h3>
                <p className="text-[10px] text-slate-550 uppercase font-mono font-bold mt-0.5">Operação irreversível</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Tem certeza que deseja zerar a sua escalação atual? Todos os 11 jogadores e as táticas customizadas voltarão ao estado padrão.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-sm text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={clearSquad}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-sm text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                Zerar e Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Text Export Modal */}
      {exportedText && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-sm p-6 shadow-2xl relative flex flex-col space-y-4 animate-scaleUp max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider font-mono">Escalação do FIFA World Cup 2026 em Texto</h3>
              </div>
              <button
                onClick={() => setExportedText(null)}
                className="w-7 h-7 bg-slate-50 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-xs transition-all cursor-pointer"
                title="Fechar"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
              Abaixo está o rascunho de texto formatado com o esquema tático em campo. Ideal para copiar e compartilhar no WhatsApp, Discord, Telegram ou redes sociais!
            </p>

            <div className="relative flex-1 min-h-[250px] overflow-hidden rounded-xs border border-slate-200">
              <textarea
                readOnly
                value={exportedText}
                className="w-full h-full bg-slate-50 p-4 font-mono text-[10px] text-slate-800 leading-normal select-all outline-none focus:ring-1 focus:ring-blue-500 resize-none overflow-y-auto block whitespace-pre"
                onClick={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.select();
                }}
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] text-slate-550 font-mono font-medium">
                💡 Dica: Clique dentro do texto para selecionar tudo
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(exportedText);
                      addNotification('Copiado com sucesso para a área de transferência!', 'success');
                    } catch (e) {
                      addNotification('Erro ao copiar. Selecione manualmente o texto acima.', 'error');
                    }
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-sm text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-xs hover:shadow-md"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copiar Todo o Texto
                </button>
                <button
                  onClick={() => setExportedText(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-sm text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
