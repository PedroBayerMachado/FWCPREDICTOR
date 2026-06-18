/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeaguePlayer {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  position: 'GK' | 'DF' | 'MC' | 'AT';
  role: string;
  club: string;
}

export interface LeagueInfo {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string; // Tailwind bg color for league badge
  players: LeaguePlayer[];
}

export const LEAGUES_DATA: Record<string, LeagueInfo> = {
  brasileirao_26: {
    id: 'brasileirao_26',
    name: 'Brasileirão 26',
    emoji: '🇧🇷',
    description: 'Série A do Campeonato Brasileiro 2026. O campeonato mais equilibrado do futebol mundial.',
    color: 'bg-emerald-600 text-white',
    players: [
      // Goleiros (4)
      { id: 'br_1', name: 'Agustín Rossi', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'GK', role: 'Goleiro', club: 'Flamengo' },
      { id: 'br_2', name: 'Weverton Silva', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'GK', role: 'Goleiro', club: 'Palmeiras' },
      { id: 'br_3', name: 'John Victor', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'GK', role: 'Goleiro', club: 'Botafogo' },
      { id: 'br_4', name: 'Rafael Pires', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'GK', role: 'Goleiro', club: 'São Paulo' },
      
      // Defensores (12)
      { id: 'br_5', name: 'Thiago Silva', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Fluminense' },
      { id: 'br_6', name: 'Gustavo Gómez', country: 'Paraguai', flag: '🇵🇾', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Palmeiras' },
      { id: 'br_7', name: 'Guilherme Arana', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'Atlético-MG' },
      { id: 'br_8', name: 'Joaquín Piquerez', country: 'Uruguai', flag: '🇺🇾', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'Palmeiras' },
      { id: 'br_9', name: 'Bastos Quissanga', country: 'Angola', flag: '🇦🇴', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Botafogo' },
      { id: 'br_10', name: 'Alexander Barboza', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Botafogo' },
      { id: 'br_11', name: 'Murilo Cerqueira', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Palmeiras' },
      { id: 'br_12', name: 'Fabrício Bruno', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Flamengo' },
      { id: 'br_13', name: 'Léo Ortiz', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Flamengo' },
      { id: 'br_14', name: 'Fabricio Bustos', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'DF', role: 'Lateral Direito', club: 'River/Inter' },
      { id: 'br_15', name: 'William Furtado', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'DF', role: 'Lateral Direito', club: 'Cruzeiro' },
      { id: 'br_16', name: 'Vitinho Santos', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'DF', role: 'Lateral Direito', club: 'Botafogo' },

      // Meias (12)
      { id: 'br_17', name: 'Giorgian de Arrascaeta', country: 'Uruguai', flag: '🇺🇾', rating: 88, position: 'MC', role: 'Meia Armador', club: 'Flamengo' },
      { id: 'br_18', name: 'Gerson Santos', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Flamengo' },
      { id: 'br_19', name: 'Raphael Veiga', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'MC', role: 'Meia Armador', club: 'Palmeiras' },
      { id: 'br_20', name: 'Thiago Almada', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Botafogo' },
      { id: 'br_21', name: 'Matheus Pereira', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Meia Armador', club: 'Cruzeiro' },
      { id: 'br_22', name: 'Rodrigo Garro', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'MC', role: 'Meia Armador', club: 'Corinthians' },
      { id: 'br_23', name: 'Alan Patrick', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Meia Armador', club: 'Internacional' },
      { id: 'br_24', name: 'Philippe Coutinho', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Vasco' },
      { id: 'br_25', name: 'Éverton Ribeiro', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Bahia' },
      { id: 'br_26', name: 'Marlon Freitas', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'MC', role: 'Volante', club: 'Botafogo' },
      { id: 'br_27', name: 'Richard Ríos', country: 'Colômbia', flag: '🇨🇴', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Palmeiras' },
      { id: 'br_28', name: 'Nicolas de la Cruz', country: 'Uruguai', flag: '🇺🇾', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Flamengo' },

      // Atacantes (12)
      { id: 'br_29', name: 'Pedro Guilherme', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Centroavante', club: 'Flamengo' },
      { id: 'br_30', name: 'Estêvão Willian', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Ponta Direita', club: 'Palmeiras' },
      { id: 'br_31', name: 'Luiz Henrique', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Ponta Direita', club: 'Botafogo' },
      { id: 'br_32', name: 'Lucas Moura', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'São Paulo' },
      { id: 'br_33', name: 'Hulk Paraíba', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Segundo Atacante', club: 'Atlético-MG' },
      { id: 'br_34', name: 'Memphis Depay', country: 'Holanda', flag: '🇳🇱', rating: 86, position: 'AT', role: 'Avançado', club: 'Corinthians' },
      { id: 'br_35', name: 'Jhon Arias', country: 'Colômbia', flag: '🇨🇴', rating: 85, position: 'AT', role: 'Ponta Esquerda', club: 'Fluminense' },
      { id: 'br_36', name: 'Paulinho Filho', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'AT', role: 'Atacante', club: 'Atlético-MG' },
      { id: 'br_37', name: 'Igor Jesus', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'AT', role: 'Centroavante', club: 'Botafogo' },
      { id: 'br_38', name: 'Enner Valencia', country: 'Equador', flag: '🇪🇨', rating: 83, position: 'AT', role: 'Centroavante', club: 'Internacional' },
      { id: 'br_39', name: 'Martin Braithwaite', country: 'Dinamarca', flag: '🇩🇰', rating: 83, position: 'AT', role: 'Centroavante', club: 'Grêmio' },
      { id: 'br_40', name: 'Luciano Neves', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'AT', role: 'Segundo Atacante', club: 'São Paulo' }
    ]
  },
  libertadores: {
    id: 'libertadores',
    name: 'Libertadores',
    emoji: '🇦🇷',
    description: 'Copa Conmebol Libertadores da América. A glória eterna do continente sul-americano.',
    color: 'bg-amber-500 text-slate-950',
    players: [
      // Goleiros (4)
      { id: 'lib_1', name: 'Agustín Rossi', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'GK', role: 'Goleiro', club: 'Flamengo' },
      { id: 'lib_2', name: 'Franco Armani', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'GK', role: 'Goleiro', club: 'River Plate' },
      { id: 'lib_3', name: 'Weverton Silva', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'GK', role: 'Goleiro', club: 'Palmeiras' },
      { id: 'lib_4', name: 'Washington Aguerre', country: 'Uruguai', flag: '🇺🇾', rating: 82, position: 'GK', role: 'Goleiro', club: 'Peñarol' },

      // Defensores (12)
      { id: 'lib_5', name: 'Thiago Silva', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Fluminense' },
      { id: 'lib_6', name: 'Marcos Acuña', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'River Plate' },
      { id: 'lib_7', name: 'Germán Pezzella', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'River Plate' },
      { id: 'lib_8', name: 'Gustavo Gómez', country: 'Paraguai', flag: '🇵🇾', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Palmeiras' },
      { id: 'lib_9', name: 'Bastos Quissanga', country: 'Angola', flag: '🇦🇴', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Botafogo' },
      { id: 'lib_10', name: 'Fabricio Bustos', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'DF', role: 'Lateral Direito', club: 'River Plate' },
      { id: 'lib_11', name: 'Gabriel Mercado', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Internacional' },
      { id: 'lib_12', name: 'Paulo Díaz', country: 'Chile', flag: '🇨🇱', rating: 82, position: 'DF', role: 'Zagueiro', club: 'River Plate' },
      { id: 'lib_13', name: 'Guilherme Arana', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'Atlético-MG' },
      { id: 'lib_14', name: 'Joaquín Piquerez', country: 'Uruguai', flag: '🇺🇾', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'Palmeiras' },
      { id: 'lib_15', name: 'Agustín Sant\'Anna', country: 'Uruguai', flag: '🇺🇾', rating: 81, position: 'DF', role: 'Lateral Direito', club: 'River Plate' },
      { id: 'lib_16', name: 'Renzo Saravia', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'DF', role: 'Lateral Direito', club: 'Atlético-MG' },

      // Meias (12)
      { id: 'lib_17', name: 'Nicolas de la Cruz', country: 'Uruguai', flag: '🇺🇾', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Flamengo' },
      { id: 'lib_18', name: 'Giorgian de Arrascaeta', country: 'Uruguai', flag: '🇺🇾', rating: 88, position: 'MC', role: 'Meia Armador', club: 'Flamengo' },
      { id: 'lib_19', name: 'Gerson Santos', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Flamengo' },
      { id: 'lib_20', name: 'Thiago Almada', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Botafogo' },
      { id: 'lib_21', name: 'Manuel Lanzini', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meia Armador', club: 'River Plate' },
      { id: 'lib_22', name: 'Maximiliano Meza', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'River Plate' },
      { id: 'lib_23', name: 'Nacho Fernández', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'River Plate' },
      { id: 'lib_24', name: 'Richard Ríos', country: 'Colômbia', flag: '🇨🇴', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Palmeiras' },
      { id: 'lib_25', name: 'Aníbal Moreno', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'MC', role: 'Volante', club: 'Palmeiras' },
      { id: 'lib_26', name: 'Alan Patrick', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Meia Armador', club: 'Internacional' },
      { id: 'lib_27', name: 'Franco Mastantuono', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meia Armador', club: 'River Plate' },
      { id: 'lib_28', name: 'Leo Fernández', country: 'Uruguai', flag: '🇺🇾', rating: 82, position: 'MC', role: 'Meia Armador', club: 'Peñarol' },

      // Atacantes (12)
      { id: 'lib_29', name: 'Luiz Henrique', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Ponta Direita', club: 'Botafogo' },
      { id: 'lib_30', name: 'Pedro Guilherme', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Centroavante', club: 'Flamengo' },
      { id: 'lib_31', name: 'Estêvão Willian', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Ponta Direita', club: 'Palmeiras' },
      { id: 'lib_32', name: 'Hulk Paraíba', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Segundo Atacante', club: 'Atlético-MG' },
      { id: 'lib_33', name: 'Paulinho Filho', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'AT', role: 'Atacante', club: 'Atlético-MG' },
      { id: 'lib_34', name: 'Miguel Borja', country: 'Colômbia', flag: '🇨🇴', rating: 84, position: 'AT', role: 'Centroavante', club: 'River Plate' },
      { id: 'lib_35', name: 'Junior Santos', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'AT', role: 'Atacante', club: 'Botafogo' },
      { id: 'lib_36', name: 'Jhon Arias', country: 'Colômbia', flag: '🇨🇴', rating: 85, position: 'AT', role: 'Ponta Esquerda', club: 'Fluminense' },
      { id: 'lib_37', name: 'Jonathan Calleri', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'AT', role: 'Centroavante', club: 'São Paulo' },
      { id: 'lib_38', name: 'Tiquinho Soares', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'AT', role: 'Centroavante', club: 'Botafogo' },
      { id: 'lib_39', name: 'Claudio Echeverri', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'AT', role: 'Segundo Atacante', club: 'River Plate' },
      { id: 'lib_40', name: 'Deyverson Silva', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'AT', role: 'Centroavante', club: 'Atlético-MG' }
    ]
  },
  champions_league: {
    id: 'champions_league',
    name: 'Champions League',
    emoji: '🇪🇺',
    description: 'UEFA Champions League. O apogeu e o refino tático supremo do futebol europeu.',
    color: 'bg-blue-900 text-white',
    players: [
      // Goleiros (4)
      { id: 'cl_1', name: 'Thibaut Courtois', country: 'Bélgica', flag: '🇧🇪', rating: 91, position: 'GK', role: 'Goleiro', club: 'Real Madrid' },
      { id: 'cl_2', name: 'Marc-André ter Stegen', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'GK', role: 'Goleiro', club: 'Barcelona' },
      { id: 'cl_3', name: 'Ederson Moraes', country: 'Brasil', flag: '🇧🇷', rating: 90, position: 'GK', role: 'Goleiro', club: 'Manchester City' },
      { id: 'cl_4', name: 'Alisson Becker', country: 'Brasil', flag: '🇧🇷', rating: 90, position: 'GK', role: 'Goleiro', club: 'Liverpool' },

      // Defensores (12)
      { id: 'cl_5', name: 'Rúben Dias', country: 'Portugal', flag: '🇵🇹', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'cl_6', name: 'Virgil van Dijk', country: 'Holanda', flag: '🇳🇱', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },
      { id: 'cl_7', name: 'Antonio Rüdiger', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Real Madrid' },
      { id: 'cl_8', name: 'William Saliba', country: 'França', flag: '🇫🇷', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'cl_9', name: 'Jules Koundé', country: 'França', flag: '🇫🇷', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Barcelona' },
      { id: 'cl_10', name: 'Dani Carvajal', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'DF', role: 'Lateral Direito', club: 'Real Madrid' },
      { id: 'cl_11', name: 'Trent Alexander-Arnold', country: 'Inglaterra', flag: '🏴', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Liverpool' },
      { id: 'cl_12', name: 'Theo Hernández', country: 'França', flag: '🇫🇷', rating: 87, position: 'DF', role: 'Lateral Esquerdo', club: 'AC Milan' },
      { id: 'cl_13', name: 'Joško Gvardiol', country: 'Croácia', flag: '🇭🇷', rating: 86, position: 'DF', role: 'Lateral Esquerdo', club: 'Manchester City' },
      { id: 'cl_14', name: 'Alessandro Bastoni', country: 'Itália', flag: '🇮🇹', rating: 87, position: 'DF', role: 'Zagueiro', club: 'Inter de Milão' },
      { id: 'cl_15', name: 'Gleison Bremer', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Juventus' },
      { id: 'cl_16', name: 'Achraf Hakimi', country: 'Marrocos', flag: '🇲🇦', rating: 85, position: 'DF', role: 'Lateral Direito', club: 'PSG' },

      // Meias (14)
      { id: 'cl_17', name: 'Rodri Hernández', country: 'Espanha', flag: '🇪🇸', rating: 91, position: 'MC', role: 'Volante', club: 'Manchester City' },
      { id: 'cl_18', name: 'Kevin De Bruyne', country: 'Bélgica', flag: '🇧🇪', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Manchester City' },
      { id: 'cl_19', name: 'Jude Bellingham', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'cl_20', name: 'Federico Valverde', country: 'Uruguai', flag: '🇺🇾', rating: 89, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'cl_21', name: 'Florian Wirtz', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayer Leverkusen' },
      { id: 'cl_22', name: 'Jamal Musiala', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayern de Munique' },
      { id: 'cl_23', name: 'Martin Ødegaard', country: 'Noruega', flag: '🇳🇴', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Arsenal' },
      { id: 'cl_24', name: 'Bernardo Silva', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meio-Campista', club: 'Manchester City' },
      { id: 'cl_25', name: 'Nicolò Barella', country: 'Itália', flag: '🇮🇹', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Inter de Milão' },
      { id: 'cl_26', name: 'Declan Rice', country: 'Inglaterra', flag: '🏴', rating: 88, position: 'MC', role: 'Volante', club: 'Arsenal' },
      { id: 'cl_27', name: 'Pedri González', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'cl_28', name: 'Hakan Çalhanoglu', country: 'Turquia', flag: '🇹🇷', rating: 86, position: 'MC', role: 'Volante', club: 'Inter de Milão' },
      { id: 'cl_29', name: 'Eduardo Camavinga', country: 'França', flag: '🇫🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'cl_30', name: 'Aurélien Tchouaméni', country: 'França', flag: '🇫🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Real Madrid' },

      // Atacantes (10)
      { id: 'cl_31', name: 'Vinícius Júnior', country: 'Brasil', flag: '🇧🇷', rating: 91, position: 'AT', role: 'Ponta Esquerda', club: 'Real Madrid' },
      { id: 'cl_32', name: 'Kylian Mbappé', country: 'França', flag: '🇫🇷', rating: 91, position: 'AT', role: 'Centroavante', club: 'Real Madrid' },
      { id: 'cl_33', name: 'Erling Haaland', country: 'Noruega', flag: '🇳🇴', rating: 91, position: 'AT', role: 'Centroavante', club: 'Manchester City' },
      { id: 'cl_34', name: 'Harry Kane', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'AT', role: 'Centroavante', club: 'Bayern de Munique' },
      { id: 'cl_35', name: 'Mohamed Salah', country: 'Egito', flag: '🇪🇬', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Liverpool' },
      { id: 'cl_36', name: 'Lamine Yamal', country: 'Espanha', flag: '🇪🇸', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'cl_37', name: 'Robert Lewandowski', country: 'Polônia', flag: '🇵🇱', rating: 89, position: 'AT', role: 'Centroavante', club: 'Barcelona' },
      { id: 'cl_38', name: 'Bukayo Saka', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Arsenal' },
      { id: 'cl_39', name: 'Phil Foden', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Manchester City' },
      { id: 'cl_40', name: 'Lautaro Martínez', country: 'Argentina', flag: '🇦🇷', rating: 89, position: 'AT', role: 'Centroavante', club: 'Inter de Milão' }
    ]
  },
  sudamericana: {
    id: 'sudamericana',
    name: 'Sudamericana',
    emoji: '🇺🇾',
    description: 'Copa Conmebol Sudamericana. Intensidade pura, raça e a busca constante pela taça de prata.',
    color: 'bg-slate-500 text-white',
    players: [
      // Goleiros (4)
      { id: 'sud_1', name: 'Cássio Ramos', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'GK', role: 'Goleiro', club: 'Cruzeiro' },
      { id: 'sud_2', name: 'Hugo Souza', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'GK', role: 'Goleiro', club: 'Corinthians' },
      { id: 'sud_3', name: 'Gabriel Arias', country: 'Chile', flag: '🇨🇱', rating: 82, position: 'GK', role: 'Goleiro', club: 'Racing' },
      { id: 'sud_4', name: 'João Ricardo', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'GK', role: 'Goleiro', club: 'Fortaleza' },

      // Defensores (12)
      { id: 'sud_5', name: 'Tinga Ceará', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'DF', role: 'Lateral Direito', club: 'Fortaleza' },
      { id: 'sud_6', name: 'Emanuel Brítez', country: 'Argentina', flag: '🇦🇷', rating: 80, position: 'DF', role: 'Zagueiro', club: 'Fortaleza' },
      { id: 'sud_7', name: 'Benjamin Kuscevic', country: 'Chile', flag: '🇨🇱', rating: 79, position: 'DF', role: 'Zagueiro', club: 'Fortaleza' },
      { id: 'sud_8', name: 'João Marcelo', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Cruzeiro' },
      { id: 'sud_9', name: 'Lucas Villalba', country: 'Argentina', flag: '🇦🇷', rating: 80, position: 'DF', role: 'Zagueiro', club: 'Cruzeiro' },
      { id: 'sud_10', name: 'William Furtado', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'DF', role: 'Lateral Direito', club: 'Cruzeiro' },
      { id: 'sud_11', name: 'André Ramalho', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'DF', role: 'Zagueiro', club: 'Corinthians' },
      { id: 'sud_12', name: 'Félix Torres', country: 'Equador', flag: '🇪🇨', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Corinthians' },
      { id: 'sud_13', name: 'Matheuzinho Silva', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'DF', role: 'Lateral Direito', club: 'Corinthians' },
      { id: 'sud_14', name: 'Gabriel Rojas', country: 'Argentina', flag: '🇦🇷', rating: 80, position: 'DF', role: 'Lateral Esquerdo', club: 'Racing' },
      { id: 'sud_15', name: 'Marco Di Cesare', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Racing' },
      { id: 'sud_16', name: 'Kaiki Bruno', country: 'Brasil', flag: '🇧🇷', rating: 79, position: 'DF', role: 'Lateral Esquerdo', club: 'Cruzeiro' },

      // Meias (12)
      { id: 'sud_17', name: 'Rodrigo Garro', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'MC', role: 'Meia Armador', club: 'Corinthians' },
      { id: 'sud_18', name: 'Igor Coronado', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'MC', role: 'Meia Armador', club: 'Corinthians' },
      { id: 'sud_19', name: 'Matheus Pereira', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Meia Armador', club: 'Cruzeiro' },
      { id: 'sud_20', name: 'Lucas Romero', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'MC', role: 'Volante', club: 'Cruzeiro' },
      { id: 'sud_21', name: 'Álvaro Barreal', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'Cruzeiro' },
      { id: 'sud_22', name: 'Walace Souza', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'MC', role: 'Volante', club: 'Cruzeiro' },
      { id: 'sud_23', name: 'Hércules Pereira', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Fortaleza' },
      { id: 'sud_24', name: 'Tomás Pochettino', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meia Armador', club: 'Fortaleza' },
      { id: 'sud_25', name: 'Juan Fernando Quintero', country: 'Colômbia', flag: '🇨🇴', rating: 83, position: 'MC', role: 'Meia Armador', club: 'Racing' },
      { id: 'sud_26', name: 'Agustín Almendra', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'Racing' },
      { id: 'sud_27', name: 'Marcelino Moreno', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meia Armador', club: 'Lanús' },
      { id: 'sud_28', name: 'Fernandinho Rosa', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Athletico-PR' },

      // Atacantes (12)
      { id: 'sud_29', name: 'Memphis Depay', country: 'Holanda', flag: '🇳🇱', rating: 86, position: 'AT', role: 'Atacante', club: 'Corinthians' },
      { id: 'sud_30', name: 'Yuri Alberto', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'AT', role: 'Centroavante', club: 'Corinthians' },
      { id: 'sud_31', name: 'Kaio Jorge', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'AT', role: 'Centroavante', club: 'Cruzeiro' },
      { id: 'sud_32', name: 'Lautaro Díaz', country: 'Argentina', flag: '🇦🇷', rating: 80, position: 'AT', role: 'Atacante', club: 'Cruzeiro' },
      { id: 'sud_33', name: 'Juan Martín Lucero', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'AT', role: 'Centroavante', club: 'Fortaleza' },
      { id: 'sud_34', name: 'Yago Pikachu', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'AT', role: 'Atacante', club: 'Fortaleza' },
      { id: 'sud_35', name: 'Breno Lopes', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'AT', role: 'Ponta Esquerda', club: 'Fortaleza' },
      { id: 'sud_36', name: 'Adrián Martínez', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'AT', role: 'Centroavante', club: 'Racing' },
      { id: 'sud_37', name: 'Walter Bou', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'AT', role: 'Centroavante', club: 'Lanús' },
      { id: 'sud_38', name: 'Gonzalo Mastriani', country: 'Uruguai', flag: '🇺🇾', rating: 81, position: 'AT', role: 'Centroavante', club: 'Athletico-PR' },
      { id: 'sud_39', name: 'Agustín Canobbio', country: 'Uruguai', flag: '🇺🇾', rating: 82, position: 'AT', role: 'Ponta Direita', club: 'Athletico-PR' },
      { id: 'sud_40', name: 'Lucas Di Yorio', country: 'Argentina', flag: '🇦🇷', rating: 80, position: 'AT', role: 'Centroavante', club: 'Athletico-PR' }
    ]
  },
  premier_league: {
    id: 'premier_league',
    name: 'Premier League',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    description: 'Premier League Inglesa. Velocidade estonteante, teto tático e intensidade física incomparável.',
    color: 'bg-fuchsia-700 text-white',
    players: [
      // Goleiros (4)
      { id: 'pl_1', name: 'Alisson Becker', country: 'Brasil', flag: '🇧🇷', rating: 90, position: 'GK', role: 'Goleiro', club: 'Liverpool' },
      { id: 'pl_2', name: 'Ederson Moraes', country: 'Brasil', flag: '🇧🇷', rating: 90, position: 'GK', role: 'Goleiro', club: 'Manchester City' },
      { id: 'pl_3', name: 'David Raya', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'GK', role: 'Goleiro', club: 'Arsenal' },
      { id: 'pl_4', name: 'Jordan Pickford', country: 'Inglaterra', flag: '🏴', rating: 84, position: 'GK', role: 'Goleiro', club: 'Everton' },

      // Defensores (12)
      { id: 'pl_5', name: 'Virgil van Dijk', country: 'Holanda', flag: '🇳🇱', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },
      { id: 'pl_6', name: 'Rúben Dias', country: 'Portugal', flag: '🇵🇹', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'pl_7', name: 'William Saliba', country: 'França', flag: '🇫🇷', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'pl_8', name: 'Trent Alexander-Arnold', country: 'Inglaterra', flag: '🏴', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Liverpool' },
      { id: 'pl_9', name: 'Joško Gvardiol', country: 'Croácia', flag: '🇭🇷', rating: 86, position: 'DF', role: 'Lateral Esquerdo', club: 'Manchester City' },
      { id: 'pl_10', name: 'Gabriel Magalhães', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'pl_11', name: 'John Stones', country: 'Inglaterra', flag: '🏴', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'pl_12', name: 'Pedro Porro', country: 'Espanha', flag: '🇪🇸', rating: 84, position: 'DF', role: 'Lateral Direito', club: 'Tottenham' },
      { id: 'pl_13', name: 'Andrew Robertson', country: 'Escócia', flag: '🏴', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'Liverpool' },
      { id: 'pl_14', name: 'Cristian Romero', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Tottenham' },
      { id: 'pl_15', name: 'Destiny Udogie', country: 'Itália', flag: '🇮🇹', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'Tottenham' },
      { id: 'pl_16', name: 'Ibrahima Konaté', country: 'França', flag: '🇫🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },

      // Meias (14)
      { id: 'pl_17', name: 'Rodri Hernández', country: 'Espanha', flag: '🇪🇸', rating: 91, position: 'MC', role: 'Volante', club: 'Manchester City' },
      { id: 'pl_18', name: 'Kevin De Bruyne', country: 'Bélgica', flag: '🇧🇪', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Manchester City' },
      { id: 'pl_19', name: 'Martin Ødegaard', country: 'Noruega', flag: '🇳🇴', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Arsenal' },
      { id: 'pl_20', name: 'Bruno Fernandes', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meia Armador', club: 'Manchester United' },
      { id: 'pl_21', name: 'Cole Palmer', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Chelsea' },
      { id: 'pl_22', name: 'Declan Rice', country: 'Inglaterra', flag: '🏴', rating: 88, position: 'MC', role: 'Volante', club: 'Arsenal' },
      { id: 'pl_23', name: 'Bernardo Silva', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meio-Campista', club: 'Manchester City' },
      { id: 'pl_24', name: 'Alexis Mac Allister', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Liverpool' },
      { id: 'pl_25', name: 'Dominik Szoboszlai', country: 'Hungria', flag: '🇭🇺', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Liverpool' },
      { id: 'pl_26', name: 'Enzo Fernández', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Chelsea' },
      { id: 'pl_27', name: 'Moisés Caicedo', country: 'Equador', flag: '🇪🇨', rating: 85, position: 'MC', role: 'Volante', club: 'Chelsea' },
      { id: 'pl_28', name: 'Bruno Guimarães', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Newcastle' },
      { id: 'pl_29', name: 'James Maddison', country: 'Inglaterra', flag: '🏴', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Tottenham' },
      { id: 'pl_30', name: 'Kobbie Mainoo', country: 'Inglaterra', flag: '🏴', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'Manchester United' },

      // Atacantes (10)
      { id: 'pl_31', name: 'Erling Haaland', country: 'Noruega', flag: '🇳🇴', rating: 91, position: 'AT', role: 'Centroavante', club: 'Manchester City' },
      { id: 'pl_32', name: 'Mohamed Salah', country: 'Egito', flag: '🇪🇬', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Liverpool' },
      { id: 'pl_33', name: 'Bukayo Saka', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Arsenal' },
      { id: 'pl_34', name: 'Phil Foden', country: 'Inglaterra', flag: '🏴', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Manchester City' },
      { id: 'pl_35', name: 'Son Heung-min', country: 'Coreia do Sul', flag: '🇰🇷', rating: 87, position: 'AT', role: 'Ponta Esquerda', club: 'Tottenham' },
      { id: 'pl_36', name: 'Luis Díaz', country: 'Colômbia', flag: '🇨🇴', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'Liverpool' },
      { id: 'pl_37', name: 'Alexander Isak', country: 'Suécia', flag: '🇸🇪', rating: 86, position: 'AT', role: 'Centroavante', club: 'Newcastle' },
      { id: 'pl_38', name: 'Ollie Watkins', country: 'Inglaterra', flag: '🏴', rating: 85, position: 'AT', role: 'Centroavante', club: 'Aston Villa' },
      { id: 'pl_39', name: 'Marcus Rashford', country: 'Inglaterra', flag: '🏴', rating: 84, position: 'AT', role: 'Ponta Esquerda', club: 'Manchester United' },
      { id: 'pl_40', name: 'Gabriel Martinelli', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'AT', role: 'Ponta Esquerda', club: 'Arsenal' }
    ]
  },
  la_liga: {
    id: 'la_liga',
    name: 'La Liga',
    emoji: '🇪🇸',
    description: 'La Liga Espanhola. Refinamento técnico, controle posicional exímio e astros do futebol mundial.',
    color: 'bg-red-650 text-white',
    players: [
      // Goleiros (4)
      { id: 'lal_1', name: 'Thibaut Courtois', country: 'Bélgica', flag: '🇧🇪', rating: 91, position: 'GK', role: 'Goleiro', club: 'Real Madrid' },
      { id: 'lal_2', name: 'Marc-André ter Stegen', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'GK', role: 'Goleiro', club: 'Barcelona' },
      { id: 'lal_3', name: 'Jan Oblak', country: 'Eslovênia', flag: '🇸🇮', rating: 86, position: 'GK', role: 'Goleiro', club: 'Atlético de Madrid' },
      { id: 'lal_4', name: 'Giorgi Mamardashvili', country: 'Geórgia', flag: '🇬🇪', rating: 84, position: 'GK', role: 'Goleiro', club: 'Valencia' },

      // Defensores (12)
      { id: 'lal_5', name: 'Antonio Rüdiger', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Real Madrid' },
      { id: 'lal_6', name: 'Jules Koundé', country: 'França', flag: '🇫🇷', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Barcelona' },
      { id: 'lal_7', name: 'Ronald Araujo', country: 'Uruguai', flag: '🇺🇾', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Barcelona' },
      { id: 'lal_8', name: 'Dani Carvajal', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'DF', role: 'Lateral Direito', club: 'Real Madrid' },
      { id: 'lal_9', name: 'Éder Militão', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Real Madrid' },
      { id: 'lal_10', name: 'Pau Cubarsí', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Barcelona' },
      { id: 'lal_11', name: 'Alejandro Balde', country: 'Espanha', flag: '🇪🇸', rating: 82, position: 'DF', role: 'Lateral Esquerdo', club: 'Barcelona' },
      { id: 'lal_12', name: 'Ferland Mendy', country: 'França', flag: '🇫🇷', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'Real Madrid' },
      { id: 'lal_13', name: 'Robin Le Normand', country: 'Espanha', flag: '🇪🇸', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Atlético de Madrid' },
      { id: 'lal_14', name: 'José María Giménez', country: 'Uruguai', flag: '🇺🇾', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Atlético de Madrid' },
      { id: 'lal_15', name: 'David Alaba', country: 'Áustria', flag: '🇦🇹', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Real Madrid' },
      { id: 'lal_16', name: 'Fran García', country: 'Espanha', flag: '🇪🇸', rating: 80, position: 'DF', role: 'Lateral Esquerdo', club: 'Real Madrid' },

      // Meias (14)
      { id: 'lal_17', name: 'Jude Bellingham', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'lal_18', name: 'Federico Valverde', country: 'Uruguai', flag: '🇺🇾', rating: 89, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'lal_19', name: 'Gavi Páez', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'lal_20', name: 'Pedri González', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'lal_21', name: 'Frenkie de Jong', country: 'Holanda', flag: '🇳🇱', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'lal_22', name: 'Eduardo Camavinga', country: 'França', flag: '🇫🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'lal_23', name: 'Aurélien Tchouaméni', country: 'França', flag: '🇫🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Real Madrid' },
      { id: 'lal_24', name: 'Rodrigo De Paul', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'MC', role: 'Meio-Campista', club: 'Atlético de Madrid' },
      { id: 'lal_25', name: 'Koke Resurrección', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Atlético de Madrid' },
      { id: 'lal_26', name: 'Martín Zubimendi', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'MC', role: 'Volante', club: 'Real Sociedad' },
      { id: 'lal_27', name: 'Álex Baena', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Villarreal' },
      { id: 'lal_28', name: 'Conor Gallagher', country: 'Inglaterra', flag: '🏴', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Atlético de Madrid' },
      { id: 'lal_29', name: 'Fermín López', country: 'Espanha', flag: '🇪🇸', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'lal_30', name: 'Luka Modric', country: 'Croácia', flag: '🇭🇷', rating: 84, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },

      // Atacantes (10)
      { id: 'lal_31', name: 'Vinícius Júnior', country: 'Brasil', flag: '🇧🇷', rating: 91, position: 'AT', role: 'Ponta Esquerda', club: 'Real Madrid' },
      { id: 'lal_32', name: 'Kylian Mbappé', country: 'França', flag: '🇫🇷', rating: 91, position: 'AT', role: 'Centroavante', club: 'Real Madrid' },
      { id: 'lal_33', name: 'Lamine Yamal', country: 'Espanha', flag: '🇪🇸', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'lal_34', name: 'Robert Lewandowski', country: 'Polônia', flag: '🇵🇱', rating: 89, position: 'AT', role: 'Centroavante', club: 'Barcelona' },
      { id: 'lal_35', name: 'Raphinha Dias', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'lal_36', name: 'Rodrygo Goes', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'AT', role: 'Ponta Direita', club: 'Real Madrid' },
      { id: 'lal_37', name: 'Antoine Griezmann', country: 'França', flag: '🇫🇷', rating: 88, position: 'AT', role: 'Segundo Atacante', club: 'Atlético de Madrid' },
      { id: 'lal_38', name: 'Julián Álvarez', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'AT', role: 'Centroavante', club: 'Atlético de Madrid' },
      { id: 'lal_39', name: 'Nico Williams', country: 'Espanha', flag: '🇪🇸', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'Athletic Bilbao' },
      { id: 'lal_40', name: 'Alexander Sørloth', country: 'Noruega', flag: '🇳🇴', rating: 83, position: 'AT', role: 'Centroavante', club: 'Atlético de Madrid' }
    ]
  },
  outras_ligas: {
    id: 'outras_ligas',
    name: 'Outras Ligas',
    emoji: '🇺🇳',
    description: 'Bundesliga, Saudi Pro League e Major League Soccer reunidas com os astros e ídolos que cruzaram fronteiras.',
    color: 'bg-slate-805 text-white',
    players: [
      // Goleiros (4)
      { id: 'out_1', name: 'Manuel Neuer', country: 'Alemanha', flag: '🇩🇪', rating: 88, position: 'GK', role: 'Goleiro', club: 'Bayern de Munique' },
      { id: 'out_2', name: 'Gregor Kobel', country: 'Suíça', flag: '🇨🇭', rating: 87, position: 'GK', role: 'Goleiro', club: 'Borussia Dortmund' },
      { id: 'out_3', name: 'Yassine Bono', country: 'Marrocos', flag: '🇲🇦', rating: 85, position: 'GK', role: 'Goleiro', club: 'Al-Hilal' },
      { id: 'out_4', name: 'Hugo Lloris', country: 'França', flag: '🇫🇷', rating: 82, position: 'GK', role: 'Goleiro', club: 'Los Angeles FC' },

      // Defensores (12)
      { id: 'out_5', name: 'Alejandro Grimaldo', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'DF', role: 'Lateral Esquerdo', club: 'Bayer Leverkusen' },
      { id: 'out_6', name: 'Jeremie Frimpong', country: 'Holanda', flag: '🇳🇱', rating: 85, position: 'DF', role: 'Lateral Direito', club: 'Bayer Leverkusen' },
      { id: 'out_7', name: 'Dayot Upamecano', country: 'França', flag: '🇫🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Bayern de Munique' },
      { id: 'out_8', name: 'Kim Min-jae', country: 'Coreia do Sul', flag: '🇰🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Bayern de Munique' },
      { id: 'out_9', name: 'Jonathan Tah', country: 'Alemanha', flag: '🇩🇪', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Bayer Leverkusen' },
      { id: 'out_10', name: 'Kalidou Koulibaly', country: 'Senegal', flag: '🇸🇳', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Al-Hilal' },
      { id: 'out_11', name: 'Aymeric Laporte', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Al-Nassr' },
      { id: 'out_12', name: 'Jordi Alba', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'DF', role: 'Lateral Esquerdo', club: 'Inter Miami' },
      { id: 'out_13', name: 'Walker Zimmerman', country: 'Estados Unidos', flag: '🇺🇸', rating: 79, position: 'DF', role: 'Zagueiro', club: 'Nashville SC' },
      { id: 'out_14', name: 'Nico Schlotterbeck', country: 'Alemanha', flag: '🇩🇪', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Borussia Dortmund' },
      { id: 'out_15', name: 'Waldemar Anton', country: 'Alemanha', flag: '🇩🇪', rating: 82, position: 'DF', role: 'Zagueiro', club: 'Borussia Dortmund' },
      { id: 'out_16', name: 'Niklas Süle', country: 'Alemanha', flag: '🇩🇪', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Borussia Dortmund' },

      // Meias (12)
      { id: 'out_17', name: 'Jamal Musiala', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayern de Munique' },
      { id: 'out_18', name: 'Florian Wirtz', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayer Leverkusen' },
      { id: 'out_19', name: 'Granit Xhaka', country: 'Suíça', flag: '🇨🇭', rating: 86, position: 'MC', role: 'Volante', club: 'Bayer Leverkusen' },
      { id: 'out_20', name: 'Rúben Neves', country: 'Portugal', flag: '🇵🇹', rating: 84, position: 'MC', role: 'Volante', club: 'Al-Hilal' },
      { id: 'out_21', name: 'S. Milinkovic-Savic', country: 'Sérvia', flag: '🇷🇸', rating: 84, position: 'MC', role: 'Meio-Campista', club: 'Al-Hilal' },
      { id: 'out_22', name: 'N\'Golo Kanté', country: 'França', flag: '🇫🇷', rating: 84, position: 'MC', role: 'Volante', club: 'Al-Ittihad' },
      { id: 'out_23', name: 'Sergio Busquets', country: 'Espanha', flag: '🇪🇸', rating: 82, position: 'MC', role: 'Volante', club: 'Inter Miami' },
      { id: 'out_24', name: 'Riqui Puig', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'LA Galaxy' },
      { id: 'out_25', name: 'Lucho Acosta', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'MC', role: 'Meia Armador', club: 'FC Cincinnati' },
      { id: 'out_26', name: 'Marcel Sabitzer', country: 'Áustria', flag: '🇦🇹', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Borussia Dortmund' },
      { id: 'out_27', name: 'Julian Brandt', country: 'Alemanha', flag: '🇩🇪', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Borussia Dortmund' },
      { id: 'out_28', name: 'Joshua Kimmich', country: 'Alemanha', flag: '🇩🇪', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Bayern de Munique' },

      // Atacantes (12)
      { id: 'out_29', name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Inter Miami' },
      { id: 'out_30', name: 'Cristiano Ronaldo', country: 'Portugal', flag: '🇵🇹', rating: 89, position: 'AT', role: 'Centroavante', club: 'Al-Nassr' },
      { id: 'out_31', name: 'Harry Kane', country: 'Inglaterra', flag: '🏴', rating: 90, position: 'AT', role: 'Centroavante', club: 'Bayern de Munique' },
      { id: 'out_32', name: 'Neymar Jr', country: 'Brasil', flag: '🇧🇷', rating: 88, position: 'AT', role: 'Ponta Esquerda', club: 'Al-Hilal' },
      { id: 'out_33', name: 'Karim Benzema', country: 'França', flag: '🇫🇷', rating: 86, position: 'AT', role: 'Centroavante', club: 'Al-Ittihad' },
      { id: 'out_34', name: 'Luis Suárez', country: 'Uruguai', flag: '🇺🇾', rating: 83, position: 'AT', role: 'Centroavante', club: 'Inter Miami' },
      { id: 'out_35', name: 'Sadio Mané', country: 'Senegal', flag: '🇸🇳', rating: 84, position: 'AT', role: 'Ponta Esquerda', club: 'Al-Nassr' },
      { id: 'out_36', name: 'Aleksandar Mitrovic', country: 'Sérvia', flag: '🇷🇸', rating: 84, position: 'AT', role: 'Centroavante', club: 'Al-Hilal' },
      { id: 'out_37', name: 'Riyad Mahrez', country: 'Argélia', flag: '🇩🇿', rating: 83, position: 'AT', role: 'Ponta Direita', club: 'Al-Ahli' },
      { id: 'out_38', name: 'Denis Bouanga', country: 'Gabão', flag: '🇬🇦', rating: 82, position: 'AT', role: 'Ponta Esquerda', club: 'LAFC' },
      { id: 'out_39', name: 'Victor Boniface', country: 'Nigéria', flag: '🇳🇬', rating: 83, position: 'AT', role: 'Centroavante', club: 'Bayer Leverkusen' },
      { id: 'out_40', name: 'Serhou Guirassy', country: 'Guiné', flag: '🇬🇳', rating: 84, position: 'AT', role: 'Centroavante', club: 'Borussia Dortmund' }
    ]
  }
};
