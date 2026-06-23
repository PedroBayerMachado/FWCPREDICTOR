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
      { id: 'cl_11', name: 'Trent Alexander-Arnold', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Liverpool' },
      { id: 'cl_12', name: 'Theo Hernández', country: 'França', flag: '🇫🇷', rating: 87, position: 'DF', role: 'Lateral Esquerdo', club: 'AC Milan' },
      { id: 'cl_13', name: 'Joško Gvardiol', country: 'Croácia', flag: '🇭🇷', rating: 86, position: 'DF', role: 'Lateral Esquerdo', club: 'Manchester City' },
      { id: 'cl_14', name: 'Alessandro Bastoni', country: 'Itália', flag: '🇮🇹', rating: 87, position: 'DF', role: 'Zagueiro', club: 'Inter de Milão' },
      { id: 'cl_15', name: 'Gleison Bremer', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Juventus' },
      { id: 'cl_16', name: 'Achraf Hakimi', country: 'Marrocos', flag: '🇲🇦', rating: 85, position: 'DF', role: 'Lateral Direito', club: 'PSG' },

      // Meias (14)
      { id: 'cl_17', name: 'Rodri Hernández', country: 'Espanha', flag: '🇪🇸', rating: 91, position: 'MC', role: 'Volante', club: 'Manchester City' },
      { id: 'cl_18', name: 'Kevin De Bruyne', country: 'Bélgica', flag: '🇧🇪', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Manchester City' },
      { id: 'cl_19', name: 'Jude Bellingham', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 90, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'cl_20', name: 'Federico Valverde', country: 'Uruguai', flag: '🇺🇾', rating: 89, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'cl_21', name: 'Florian Wirtz', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayer Leverkusen' },
      { id: 'cl_22', name: 'Jamal Musiala', country: 'Alemanha', flag: '🇩🇪', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Bayern de Munique' },
      { id: 'cl_23', name: 'Martin Ødegaard', country: 'Noruega', flag: '🇳🇴', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Arsenal' },
      { id: 'cl_24', name: 'Bernardo Silva', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meio-Campista', club: 'Manchester City' },
      { id: 'cl_25', name: 'Nicolò Barella', country: 'Itália', flag: '🇮🇹', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Inter de Milão' },
      { id: 'cl_26', name: 'Declan Rice', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 88, position: 'MC', role: 'Volante', club: 'Arsenal' },
      { id: 'cl_27', name: 'Pedri González', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'cl_28', name: 'Hakan Çalhanoglu', country: 'Turquia', flag: '🇹🇷', rating: 86, position: 'MC', role: 'Volante', club: 'Inter de Milão' },
      { id: 'cl_29', name: 'Eduardo Camavinga', country: 'França', flag: '🇫🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'cl_30', name: 'Aurélien Tchouaméni', country: 'França', flag: '🇫🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Real Madrid' },

      // Atacantes (10)
      { id: 'cl_31', name: 'Vinícius Júnior', country: 'Brasil', flag: '🇧🇷', rating: 91, position: 'AT', role: 'Ponta Esquerda', club: 'Real Madrid' },
      { id: 'cl_32', name: 'Kylian Mbappé', country: 'França', flag: '🇫🇷', rating: 91, position: 'AT', role: 'Centroavante', club: 'Real Madrid' },
      { id: 'cl_33', name: 'Erling Haaland', country: 'Noruega', flag: '🇳🇴', rating: 91, position: 'AT', role: 'Centroavante', club: 'Manchester City' },
      { id: 'cl_34', name: 'Harry Kane', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 90, position: 'AT', role: 'Centroavante', club: 'Bayern de Munique' },
      { id: 'cl_35', name: 'Mohamed Salah', country: 'Egito', flag: '🇪🇬', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Liverpool' },
      { id: 'cl_36', name: 'Lamine Yamal', country: 'Espanha', flag: '🇪🇸', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'cl_37', name: 'Robert Lewandowski', country: 'Polônia', flag: '🇵🇱', rating: 89, position: 'AT', role: 'Centroavante', club: 'Barcelona' },
      { id: 'cl_38', name: 'Bukayo Saka', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Arsenal' },
      { id: 'cl_39', name: 'Phil Foden', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Manchester City' },
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
      { id: 'pl_4', name: 'Jordan Pickford', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 84, position: 'GK', role: 'Goleiro', club: 'Everton' },

      // Defensores (12)
      { id: 'pl_5', name: 'Virgil van Dijk', country: 'Holanda', flag: '🇳🇱', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },
      { id: 'pl_6', name: 'Rúben Dias', country: 'Portugal', flag: '🇵🇹', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'pl_7', name: 'William Saliba', country: 'França', flag: '🇫🇷', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'pl_8', name: 'Trent Alexander-Arnold', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Liverpool' },
      { id: 'pl_9', name: 'Joško Gvardiol', country: 'Croácia', flag: '🇭🇷', rating: 86, position: 'DF', role: 'Lateral Esquerdo', club: 'Manchester City' },
      { id: 'pl_10', name: 'Gabriel Magalhães', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'pl_11', name: 'John Stones', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'pl_12', name: 'Pedro Porro', country: 'Espanha', flag: '🇪🇸', rating: 84, position: 'DF', role: 'Lateral Direito', club: 'Tottenham' },
      { id: 'pl_13', name: 'Andrew Robertson', country: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rating: 84, position: 'DF', role: 'Lateral Esquerdo', club: 'Liverpool' },
      { id: 'pl_14', name: 'Cristian Romero', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Tottenham' },
      { id: 'pl_15', name: 'Destiny Udogie', country: 'Itália', flag: '🇮🇹', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'Tottenham' },
      { id: 'pl_16', name: 'Ibrahima Konaté', country: 'França', flag: '🇫🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },

      // Meias (14)
      { id: 'pl_17', name: 'Rodri Hernández', country: 'Espanha', flag: '🇪🇸', rating: 91, position: 'MC', role: 'Volante', club: 'Manchester City' },
      { id: 'pl_18', name: 'Kevin De Bruyne', country: 'Bélgica', flag: '🇧🇪', rating: 90, position: 'MC', role: 'Meia Armador', club: 'Manchester City' },
      { id: 'pl_19', name: 'Martin Ødegaard', country: 'Noruega', flag: '🇳🇴', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Arsenal' },
      { id: 'pl_20', name: 'Bruno Fernandes', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meia Armador', club: 'Manchester United' },
      { id: 'pl_21', name: 'Cole Palmer', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Chelsea' },
      { id: 'pl_22', name: 'Declan Rice', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 88, position: 'MC', role: 'Volante', club: 'Arsenal' },
      { id: 'pl_23', name: 'Bernardo Silva', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meio-Campista', club: 'Manchester City' },
      { id: 'pl_24', name: 'Alexis Mac Allister', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Liverpool' },
      { id: 'pl_25', name: 'Dominik Szoboszlai', country: 'Hungria', flag: '🇭🇺', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Liverpool' },
      { id: 'pl_26', name: 'Enzo Fernández', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Chelsea' },
      { id: 'pl_27', name: 'Moisés Caicedo', country: 'Equador', flag: '🇪🇨', rating: 85, position: 'MC', role: 'Volante', club: 'Chelsea' },
      { id: 'pl_28', name: 'Bruno Guimarães', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Newcastle' },
      { id: 'pl_29', name: 'James Maddison', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Tottenham' },
      { id: 'pl_30', name: 'Kobbie Mainoo', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'Manchester United' },

      // Atacantes (10)
      { id: 'pl_31', name: 'Erling Haaland', country: 'Noruega', flag: '🇳🇴', rating: 91, position: 'AT', role: 'Centroavante', club: 'Manchester City' },
      { id: 'pl_32', name: 'Mohamed Salah', country: 'Egito', flag: '🇪🇬', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Liverpool' },
      { id: 'pl_33', name: 'Bukayo Saka', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Arsenal' },
      { id: 'pl_34', name: 'Phil Foden', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Manchester City' },
      { id: 'pl_35', name: 'Son Heung-min', country: 'Coreia do Sul', flag: '🇰🇷', rating: 87, position: 'AT', role: 'Ponta Esquerda', club: 'Tottenham' },
      { id: 'pl_36', name: 'Luis Díaz', country: 'Colômbia', flag: '🇨🇴', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'Liverpool' },
      { id: 'pl_37', name: 'Alexander Isak', country: 'Suécia', flag: '🇸🇪', rating: 86, position: 'AT', role: 'Centroavante', club: 'Newcastle' },
      { id: 'pl_38', name: 'Ollie Watkins', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 85, position: 'AT', role: 'Centroavante', club: 'Aston Villa' },
      { id: 'pl_39', name: 'Marcus Rashford', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 84, position: 'AT', role: 'Ponta Esquerda', club: 'Manchester United' },
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
      { id: 'lal_17', name: 'Jude Bellingham', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 90, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
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
      { id: 'lal_28', name: 'Conor Gallagher', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Atlético de Madrid' },
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
      { id: 'out_31', name: 'Harry Kane', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 90, position: 'AT', role: 'Centroavante', club: 'Bayern de Munique' },
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
  },
  selecao_brasil: {
    id: 'selecao_brasil',
    name: 'Seleção Brasileira',
    emoji: '🇧🇷',
    description: 'Convocação oficial da Seleção Brasileira de Futebol 2026. A Amarelinha com todos os seus craques.',
    color: 'bg-yellow-500 text-slate-900',
    players: [
      // Goleiros (3)
      { id: 'sel_br_1', name: 'Alisson', country: 'Brasil', flag: '🇧🇷', rating: 89, position: 'GK', role: 'Goleiro', club: 'Liverpool' },
      { id: 'sel_br_2', name: 'Ederson', country: 'Brasil', flag: '🇧🇷', rating: 89, position: 'GK', role: 'Goleiro', club: 'Fenerbahçe' },
      { id: 'sel_br_3', name: 'Weverton', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'GK', role: 'Goleiro', club: 'Grêmio' },
      // Defensores (8)
      { id: 'sel_br_4', name: 'Marquinhos', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'DF', role: 'Zagueiro', club: 'PSG' },
      { id: 'sel_br_5', name: 'Gabriel Magalhães', country: 'Brasil', flag: '🇧🇷', rating: 86, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'sel_br_6', name: 'Bremer', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Juventus' },
      { id: 'sel_br_7', name: 'Danilo', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'DF', role: 'Lateral Direito', club: 'Flamengo' },
      { id: 'sel_br_8', name: 'Alex Sandro', country: 'Brasil', flag: '🇧🇷', rating: 79, position: 'DF', role: 'Lateral Esquerdo', club: 'Flamengo' },
      { id: 'sel_br_9', name: 'Douglas Santos', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'DF', role: 'Lateral Esquerdo', club: 'Zenit' },
      { id: 'sel_br_10', name: 'Ibañez', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Al-Ahli' },
      { id: 'sel_br_11', name: 'Léo Pereira', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'DF', role: 'Zagueiro', club: 'Flamengo' },
      // Meias (6)
      { id: 'sel_br_12', name: 'Bruno Guimarães', country: 'Brasil', flag: '🇧🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Newcastle' },
      { id: 'sel_br_13', name: 'Casemiro', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'MC', role: 'Volante', club: 'Manchester United' },
      { id: 'sel_br_14', name: 'Danilo Santos', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'MC', role: 'Volante', club: 'Botafogo' },
      { id: 'sel_br_15', name: 'Fabinho', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'MC', role: 'Volante', club: 'Al-Ittihad' },
      { id: 'sel_br_16', name: 'Lucas Paquetá', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Flamengo' },
      { id: 'sel_br_17', name: 'Éderson', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Atalanta' },
      // Atacantes (9)
      { id: 'sel_br_18', name: 'Vini Jr.', country: 'Brasil', flag: '🇧🇷', rating: 91, position: 'AT', role: 'Ponta Esquerda', club: 'Real Madrid' },
      { id: 'sel_br_19', name: 'Raphinha', country: 'Brasil', flag: '🇧🇷', rating: 87, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'sel_br_20', name: 'Neymar', country: 'Brasil', flag: '🇧🇷', rating: 88, position: 'AT', role: 'Ponta Esquerda', club: 'Santos' },
      { id: 'sel_br_21', name: 'Gabriel Martinelli', country: 'Brasil', flag: '🇧🇷', rating: 84, position: 'AT', role: 'Ponta Esquerda', club: 'Arsenal' },
      { id: 'sel_br_22', name: 'Endrick', country: 'Brasil', flag: '🇧🇷', rating: 81, position: 'AT', role: 'Centroavante', club: 'Lyon' },
      { id: 'sel_br_23', name: 'Luiz Henrique', country: 'Brasil', flag: '🇧🇷', rating: 83, position: 'AT', role: 'Ponta Direita', club: 'Zenit' },
      { id: 'sel_br_24', name: 'Igor Thiago', country: 'Brasil', flag: '🇧🇷', rating: 80, position: 'AT', role: 'Centroavante', club: 'Brentford' },
      { id: 'sel_br_25', name: 'Matheus Cunha', country: 'Brasil', flag: '🇧🇷', rating: 82, position: 'AT', role: 'Centroavante', club: 'Manchester United' },
      { id: 'sel_br_26', name: 'Rayan', country: 'Brasil', flag: '🇧🇷', rating: 76, position: 'AT', role: 'Ponta Direita', club: 'Bournemouth' }
    ]
  },
  selecao_franca: {
    id: 'selecao_franca',
    name: 'Seleção Francesa',
    emoji: '🇫🇷',
    description: 'Convocação atual oficial da Seleção da França (Les Bleus). Poder físico e velocidade incríveis.',
    color: 'bg-blue-850 text-white',
    players: [
      // Goleiros (3)
      { id: 'sel_fr_1', name: 'Mike Maignan', country: 'França', flag: '🇫🇷', rating: 87, position: 'GK', role: 'Goleiro', club: 'AC Milan' },
      { id: 'sel_fr_2', name: 'Brice Samba', country: 'França', flag: '🇫🇷', rating: 82, position: 'GK', role: 'Goleiro', club: 'Lens' },
      { id: 'sel_fr_3', name: 'Alphonse Areola', country: 'França', flag: '🇫🇷', rating: 82, position: 'GK', role: 'Goleiro', club: 'West Ham' },
      // Defensores (8)
      { id: 'sel_fr_4', name: 'William Saliba', country: 'França', flag: '🇫🇷', rating: 89, position: 'DF', role: 'Zagueiro', club: 'Arsenal' },
      { id: 'sel_fr_5', name: 'Ibrahima Konaté', country: 'França', flag: '🇫🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Liverpool' },
      { id: 'sel_fr_6', name: 'Dayot Upamecano', country: 'França', flag: '🇫🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Bayern de Munique' },
      { id: 'sel_fr_7', name: 'Jules Koundé', country: 'França', flag: '🇫🇷', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Barcelona' },
      { id: 'sel_fr_8', name: 'Theo Hernández', country: 'França', flag: '🇫🇷', rating: 87, position: 'DF', role: 'Lateral Esquerdo', club: 'AC Milan' },
      { id: 'sel_fr_9', name: 'Benjamin Pavard', country: 'França', flag: '🇫🇷', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Inter de Milão' },
      { id: 'sel_fr_10', name: 'Ferland Mendy', country: 'França', flag: '🇫🇷', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'Real Madrid' },
      { id: 'sel_fr_11', name: 'Wesley Fofana', country: 'França', flag: '🇫🇷', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Chelsea' },
      // Meias (7)
      { id: 'sel_fr_12', name: 'Eduardo Camavinga', country: 'França', flag: '🇫🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'sel_fr_13', name: 'Aurélien Tchouaméni', country: 'França', flag: '🇫🇷', rating: 85, position: 'MC', role: 'Volante', club: 'Real Madrid' },
      { id: 'sel_fr_14', name: 'Warren Zaïre-Emery', country: 'França', flag: '🇫🇷', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'PSG' },
      { id: 'sel_fr_15', name: 'Adrien Rabiot', country: 'França', flag: '🇫🇷', rating: 84, position: 'MC', role: 'Meio-Campista', club: 'Olympique de Marseille' },
      { id: 'sel_fr_16', name: 'N\'Golo Kanté', country: 'França', flag: '🇫🇷', rating: 84, position: 'MC', role: 'Volante', club: 'Al-Ittihad' },
      { id: 'sel_fr_17', name: 'Youssouf Fofana', country: 'França', flag: '🇫🇷', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'AC Milan' },
      { id: 'sel_fr_18', name: 'Mattéo Guendouzi', country: 'França', flag: '🇫🇷', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'Lazio' },
      // Atacantes (8)
      { id: 'sel_fr_19', name: 'Kylian Mbappé', country: 'França', flag: '🇫🇷', rating: 91, position: 'AT', role: 'Centroavante', club: 'Real Madrid' },
      { id: 'sel_fr_20', name: 'Antoine Griezmann', country: 'França', flag: '🇫🇷', rating: 88, position: 'AT', role: 'Segundo Atacante', club: 'Atlético de Madrid' },
      { id: 'sel_fr_21', name: 'Ousmane Dembélé', country: 'França', flag: '🇫🇷', rating: 86, position: 'AT', role: 'Ponta Direita', club: 'PSG' },
      { id: 'sel_fr_22', name: 'Bradley Barcola', country: 'França', flag: '🇫🇷', rating: 84, position: 'AT', role: 'Ponta Esquerda', club: 'PSG' },
      { id: 'sel_fr_23', name: 'Marcus Thuram', country: 'França', flag: '🇫🇷', rating: 84, position: 'AT', role: 'Centroavante', club: 'Inter de Milão' },
      { id: 'sel_fr_24', name: 'Randal Kolo Muani', country: 'França', flag: '🇫🇷', rating: 82, position: 'AT', role: 'Centroavante', club: 'PSG' },
      { id: 'sel_fr_25', name: 'Kingsley Coman', country: 'França', flag: '🇫🇷', rating: 83, position: 'AT', role: 'Ponta Esquerda', club: 'Bayern de Munique' },
      { id: 'sel_fr_26', name: 'Michael Olise', country: 'França', flag: '🇫🇷', rating: 84, position: 'AT', role: 'Ponta Direita', club: 'Bayern de Munique' }
    ]
  },
  selecao_inglaterra: {
    id: 'selecao_inglaterra',
    name: 'Seleção Inglesa',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    description: 'Convocação atual oficial da Inglaterra (Three Lions). Geração de ouro com jovens astros modernos.',
    color: 'bg-white border-2 border-red-500 text-slate-900',
    players: [
      // Goleiros (3)
      { id: 'sel_en_1', name: 'Jordan Pickford', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 84, position: 'GK', role: 'Goleiro', club: 'Everton' },
      { id: 'sel_en_2', name: 'Aaron Ramsdale', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 81, position: 'GK', role: 'Goleiro', club: 'Southampton' },
      { id: 'sel_en_3', name: 'Dean Henderson', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 80, position: 'GK', role: 'Goleiro', club: 'Crystal Palace' },
      // Defensores (8)
      { id: 'sel_en_4', name: 'John Stones', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'sel_en_5', name: 'Marc Guéhi', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Crystal Palace' },
      { id: 'sel_en_6', name: 'Trent Alexander-Arnold', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 86, position: 'DF', role: 'Lateral Direito', club: 'Liverpool' },
      { id: 'sel_en_7', name: 'Kyle Walker', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 84, position: 'DF', role: 'Lateral Direito', club: 'Manchester City' },
      { id: 'sel_en_8', name: 'Kieran Trippier', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 82, position: 'DF', role: 'Lateral Direito', club: 'Newcastle' },
      { id: 'sel_en_9', name: 'Luke Shaw', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 81, position: 'DF', role: 'Lateral Esquerdo', club: 'Manchester United' },
      { id: 'sel_en_10', name: 'Ezri Konsa', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Aston Villa' },
      { id: 'sel_en_11', name: 'Rico Lewis', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 80, position: 'DF', role: 'Lateral Direito', club: 'Manchester City' },
      // Meias (8)
      { id: 'sel_en_12', name: 'Jude Bellingham', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 90, position: 'MC', role: 'Meio-Campista', club: 'Real Madrid' },
      { id: 'sel_en_13', name: 'Declan Rice', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 88, position: 'MC', role: 'Volante', club: 'Arsenal' },
      { id: 'sel_en_14', name: 'Cole Palmer', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'MC', role: 'Meia Armador', club: 'Chelsea' },
      { id: 'sel_en_15', name: 'Kobbie Mainoo', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Manchester United' },
      { id: 'sel_en_16', name: 'Conor Gallagher', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Atlético de Madrid' },
      { id: 'sel_en_17', name: 'James Maddison', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 84, position: 'MC', role: 'Meia Armador', club: 'Tottenham' },
      { id: 'sel_en_18', name: 'Morgan Gibbs-White', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 81, position: 'MC', role: 'Meia Armador', club: 'Nottingham Forest' },
      { id: 'sel_en_19', name: 'Angel Gomes', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 80, position: 'MC', role: 'Meio-Campista', club: 'Lille' },
      // Atacantes (7)
      { id: 'sel_en_20', name: 'Harry Kane', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 90, position: 'AT', role: 'Centroavante', club: 'Bayern de Munique' },
      { id: 'sel_en_21', name: 'Bukayo Saka', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Arsenal' },
      { id: 'sel_en_22', name: 'Phil Foden', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 89, position: 'AT', role: 'Ponta Direita', club: 'Manchester City' },
      { id: 'sel_en_23', name: 'Ollie Watkins', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 85, position: 'AT', role: 'Centroavante', club: 'Aston Villa' },
      { id: 'sel_en_24', name: 'Anthony Gordon', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 83, position: 'AT', role: 'Ponta Esquerda', club: 'Newcastle' },
      { id: 'sel_en_25', name: 'Jack Grealish', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 83, position: 'AT', role: 'Ponta Esquerda', club: 'Manchester City' },
      { id: 'sel_en_26', name: 'Noni Madueke', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rating: 80, position: 'AT', role: 'Ponta Direita', club: 'Chelsea' }
    ]
  },
  selecao_espanha: {
    id: 'selecao_espanha',
    name: 'Seleção Espanhola',
    emoji: '🇪🇸',
    description: 'Convocação atual oficial da Seleção da Espanha (La Roja) - Campeã da Eurocopa.',
    color: 'bg-red-700 text-yellow-400',
    players: [
      // Goleiros (3)
      { id: 'sel_es_1', name: 'Unai Simón', country: 'Espanha', flag: '🇪🇸', rating: 86, position: 'GK', role: 'Goleiro', club: 'Athletic Bilbao' },
      { id: 'sel_es_2', name: 'David Raya', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'GK', role: 'Goleiro', club: 'Arsenal' },
      { id: 'sel_es_3', name: 'Álex Remiro', country: 'Espanha', flag: '🇪🇸', rating: 82, position: 'GK', role: 'Goleiro', club: 'Real Sociedad' },
      // Defensores (8)
      { id: 'sel_es_4', name: 'Dani Carvajal', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'DF', role: 'Lateral Direito', club: 'Real Madrid' },
      { id: 'sel_es_5', name: 'Robin Le Normand', country: 'Espanha', flag: '🇪🇸', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Atlético de Madrid' },
      { id: 'sel_es_6', name: 'Aymeric Laporte', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Al-Nassr' },
      { id: 'sel_es_7', name: 'Marc Cucurella', country: 'Espanha', flag: '🇪🇸', rating: 82, position: 'DF', role: 'Lateral Esquerdo', club: 'Chelsea' },
      { id: 'sel_es_8', name: 'Alejandro Grimaldo', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'DF', role: 'Lateral Esquerdo', club: 'Bayer Leverkusen' },
      { id: 'sel_es_9', name: 'Pau Cubarsí', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Barcelona' },
      { id: 'sel_es_10', name: 'Pau Torres', country: 'Espanha', flag: '🇪🇸', rating: 82, position: 'DF', role: 'Zagueiro', club: 'Aston Villa' },
      { id: 'sel_es_11', name: 'Pedro Porro', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'DF', role: 'Lateral Direito', club: 'Tottenham' },
      // Meias (8)
      { id: 'sel_es_12', name: 'Rodri Hernández', country: 'Espanha', flag: '🇪🇸', rating: 91, position: 'MC', role: 'Volante', club: 'Manchester City' },
      { id: 'sel_es_13', name: 'Pedri González', country: 'Espanha', flag: '🇪🇸', rating: 87, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'sel_es_14', name: 'Dani Olmo', country: 'Espanha', flag: '🇪🇸', rating: 86, position: 'MC', role: 'Meia Armador', club: 'Barcelona' },
      { id: 'sel_es_15', name: 'Martin Zubimendi', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'MC', role: 'Volante', club: 'Real Sociedad' },
      { id: 'sel_es_16', name: 'Fabián Ruiz', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'PSG' },
      { id: 'sel_es_17', name: 'Gavi Páez', country: 'Espanha', flag: '🇪🇸', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Barcelona' },
      { id: 'sel_es_18', name: 'Mikel Merino', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Arsenal' },
      { id: 'sel_es_19', name: 'Álex Baena', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Villarreal' },
      // Atacantes (7)
      { id: 'sel_es_20', name: 'Lamine Yamal', country: 'Espanha', flag: '🇪🇸', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'sel_es_21', name: 'Nico Williams', country: 'Espanha', flag: '🇪🇸', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'Athletic Bilbao' },
      { id: 'sel_es_22', name: 'Álvaro Morata', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'AT', role: 'Centroavante', club: 'AC Milan' },
      { id: 'sel_es_23', name: 'Mikel Oyarzabal', country: 'Espanha', flag: '🇪🇸', rating: 83, position: 'AT', role: 'Ponta Esquerda', club: 'Real Sociedad' },
      { id: 'sel_es_24', name: 'Ferran Torres', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'AT', role: 'Ponta Direita', club: 'Barcelona' },
      { id: 'sel_es_25', name: 'Ayoze Pérez', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'AT', role: 'Segundo Atacante', club: 'Villarreal' },
      { id: 'sel_es_26', name: 'Samu Omorodion', country: 'Espanha', flag: '🇪🇸', rating: 81, position: 'AT', role: 'Centroavante', club: 'Porto' }
    ]
  },
  selecao_argentina: {
    id: 'selecao_argentina',
    name: 'Seleção Argentina',
    emoji: '🇦🇷',
    description: 'Convocação atual oficial da Seleção Argentina de Futebol (La Albiceleste). Campeões mundiais.',
    color: 'bg-sky-400 text-slate-900',
    players: [
      // Goleiros (3)
      { id: 'sel_ar_1', name: 'Emiliano Martínez', country: 'Argentina', flag: '🇦🇷', rating: 88, position: 'GK', role: 'Goleiro', club: 'Aston Villa' },
      { id: 'sel_ar_2', name: 'Gerónimo Rulli', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'GK', role: 'Goleiro', club: 'Olympique de Marseille' },
      { id: 'sel_ar_3', name: 'Walter Benítez', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'GK', role: 'Goleiro', club: 'PSV' },
      // Defensores (8)
      { id: 'sel_ar_4', name: 'Cristian Romero', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'DF', role: 'Zagueiro', club: 'Tottenham' },
      { id: 'sel_ar_5', name: 'Lisandro Martínez', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'DF', role: 'Zagueiro', club: 'Manchester United' },
      { id: 'sel_ar_6', name: 'Nicolás Otamendi', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'DF', role: 'Zagueiro', club: 'Benfica' },
      { id: 'sel_ar_7', name: 'Nahuel Molina', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'DF', role: 'Lateral Direito', club: 'Atlético de Madrid' },
      { id: 'sel_ar_8', name: 'Nicolás Tagliafico', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'DF', role: 'Lateral Esquerdo', club: 'Lyon' },
      { id: 'sel_ar_9', name: 'Marcos Acuña', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'DF', role: 'Lateral Esquerdo', club: 'River Plate' },
      { id: 'sel_ar_10', name: 'Leonardo Balerdi', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Olympique de Marseille' },
      { id: 'sel_ar_11', name: 'Gonzalo Montiel', country: 'Argentina', flag: '🇦🇷', rating: 79, position: 'DF', role: 'Lateral Direito', club: 'Sevilla' },
      // Meias (7)
      { id: 'sel_ar_12', name: 'Rodrigo De Paul', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'MC', role: 'Meio-Campista', club: 'Atlético de Madrid' },
      { id: 'sel_ar_13', name: 'Alexis Mac Allister', country: 'Argentina', flag: '🇦🇷', rating: 86, position: 'MC', role: 'Meio-Campista', club: 'Liverpool' },
      { id: 'sel_ar_14', name: 'Enzo Fernández', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'Chelsea' },
      { id: 'sel_ar_15', name: 'Leandro Paredes', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'MC', role: 'Volante', club: 'Roma' },
      { id: 'sel_ar_16', name: 'Giovani Lo Celso', country: 'Argentina', flag: '🇦🇷', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'Real Betis' },
      { id: 'sel_ar_17', name: 'Exequiel Palacios', country: 'Argentina', flag: '🇦🇷', rating: 83, position: 'MC', role: 'Meio-Campista', club: 'Bayer Leverkusen' },
      { id: 'sel_ar_18', name: 'Facundo Buonanotte', country: 'Argentina', flag: '🇦🇷', rating: 79, position: 'MC', role: 'Meio-Campista', club: 'Leicester City' },
      // Atacantes (7)
      { id: 'sel_ar_19', name: 'Lionel Messi', country: 'Argentina', flag: '🇦🇷', rating: 90, position: 'AT', role: 'Ponta Direita', club: 'Inter Miami' },
      { id: 'sel_ar_20', name: 'Julián Álvarez', country: 'Argentina', flag: '🇦🇷', rating: 85, position: 'AT', role: 'Centroavante', club: 'Atlético de Madrid' },
      { id: 'sel_ar_21', name: 'Lautaro Martínez', country: 'Argentina', flag: '🇦🇷', rating: 89, position: 'AT', role: 'Centroavante', club: 'Inter de Milão' },
      { id: 'sel_ar_22', name: 'Alejandro Garnacho', country: 'Argentina', flag: '🇦🇷', rating: 80, position: 'AT', role: 'Ponta Esquerda', club: 'Manchester United' },
      { id: 'sel_ar_23', name: 'Nicolás González', country: 'Argentina', flag: '🇦🇷', rating: 81, position: 'AT', role: 'Ponta Esquerda', club: 'Juventus' },
      { id: 'sel_ar_24', name: 'Paulo Dybala', country: 'Argentina', flag: '🇦🇷', rating: 84, position: 'AT', role: 'Segundo Atacante', club: 'Roma' },
      { id: 'sel_ar_25', name: 'Valentín Castellanos', country: 'Argentina', flag: '🇦🇷', rating: 79, position: 'AT', role: 'Centroavante', club: 'Lazio' }
    ]
  },
  selecao_portugal: {
    id: 'selecao_portugal',
    name: 'Seleção Portuguesa',
    emoji: '🇵🇹',
    description: 'Convocação atual oficial da Seleção de Portugal (Seleção das Quinas). Mestres do drible e da tática.',
    color: 'bg-emerald-700 text-yellow-400',
    players: [
      // Goleiros (3)
      { id: 'sel_pt_1', name: 'Diogo Costa', country: 'Portugal', flag: '🇵🇹', rating: 86, position: 'GK', role: 'Goleiro', club: 'Porto' },
      { id: 'sel_pt_2', name: 'Rui Silva', country: 'Portugal', flag: '🇵🇹', rating: 81, position: 'GK', role: 'Goleiro', club: 'Real Betis' },
      { id: 'sel_pt_3', name: 'José Sá', country: 'Portugal', flag: '🇵🇹', rating: 80, position: 'GK', role: 'Goleiro', club: 'Wolverhampton' },
      // Defensores (8)
      { id: 'sel_pt_4', name: 'Rúben Dias', country: 'Portugal', flag: '🇵🇹', rating: 90, position: 'DF', role: 'Zagueiro', club: 'Manchester City' },
      { id: 'sel_pt_5', name: 'João Cancelo', country: 'Portugal', flag: '🇵🇹', rating: 84, position: 'DF', role: 'Lateral Direito', club: 'Al-Hilal' },
      { id: 'sel_pt_6', name: 'Diogo Dalot', country: 'Portugal', flag: '🇵🇹', rating: 83, position: 'DF', role: 'Lateral Direito', club: 'Manchester United' },
      { id: 'sel_pt_7', name: 'Nuno Mendes', country: 'Portugal', flag: '🇵🇹', rating: 83, position: 'DF', role: 'Lateral Esquerdo', club: 'PSG' },
      { id: 'sel_pt_8', name: 'Gonçalo Inácio', country: 'Portugal', flag: '🇵🇹', rating: 83, position: 'DF', role: 'Zagueiro', club: 'Sporting' },
      { id: 'sel_pt_9', name: 'António Silva', country: 'Portugal', flag: '🇵🇹', rating: 81, position: 'DF', role: 'Zagueiro', club: 'Benfica' },
      { id: 'sel_pt_10', name: 'Nélson Semedo', country: 'Portugal', flag: '🇵🇹', rating: 80, position: 'DF', role: 'Lateral Direito', club: 'Wolverhampton' },
      { id: 'sel_pt_11', name: 'Renato Veiga', country: 'Portugal', flag: '🇵🇹', rating: 78, position: 'DF', role: 'Zagueiro', club: 'Chelsea' },
      // Meias (7)
      { id: 'sel_pt_12', name: 'Bruno Fernandes', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meia Armador', club: 'Manchester United' },
      { id: 'sel_pt_13', name: 'Bernardo Silva', country: 'Portugal', flag: '🇵🇹', rating: 88, position: 'MC', role: 'Meio-Campista', club: 'Manchester City' },
      { id: 'sel_pt_14', name: 'Vitinha Ferreira', country: 'Portugal', flag: '🇵🇹', rating: 85, position: 'MC', role: 'Meio-Campista', club: 'PSG' },
      { id: 'sel_pt_15', name: 'João Neves', country: 'Portugal', flag: '🇵🇹', rating: 82, position: 'MC', role: 'Meio-Campista', club: 'PSG' },
      { id: 'sel_pt_16', name: 'Rúben Neves', country: 'Portugal', flag: '🇵🇹', rating: 84, position: 'MC', role: 'Volante', club: 'Al-Hilal' },
      { id: 'sel_pt_17', name: 'João Palhinha', country: 'Portugal', flag: '🇵🇹', rating: 84, position: 'MC', role: 'Volante', club: 'Bayern de Munique' },
      { id: 'sel_pt_18', name: 'Otávio Monteiro', country: 'Portugal', flag: '🇵🇹', rating: 81, position: 'MC', role: 'Meio-Campista', club: 'Al-Nassr' },
      // Atacantes (7)
      { id: 'sel_pt_19', name: 'Cristiano Ronaldo', country: 'Portugal', flag: '🇵🇹', rating: 89, position: 'AT', role: 'Centroavante', club: 'Al-Nassr' },
      { id: 'sel_pt_20', name: 'Rafael Leão', country: 'Portugal', flag: '🇵🇹', rating: 86, position: 'AT', role: 'Ponta Esquerda', club: 'AC Milan' },
      { id: 'sel_pt_21', name: 'Diogo Jota', country: 'Portugal', flag: '🇵🇹', rating: 84, position: 'AT', role: 'Centroavante', club: 'Liverpool' },
      { id: 'sel_pt_22', name: 'João Félix', country: 'Portugal', flag: '🇵🇹', rating: 81, position: 'AT', role: 'Segundo Atacante', club: 'Chelsea' },
      { id: 'sel_pt_23', name: 'Francisco Conceição', country: 'Portugal', flag: '🇵🇹', rating: 80, position: 'AT', role: 'Ponta Direita', club: 'Juventus' },
      { id: 'sel_pt_24', name: 'Gonçalo Ramos', country: 'Portugal', flag: '🇵🇹', rating: 81, position: 'AT', role: 'Centroavante', club: 'PSG' },
      { id: 'sel_pt_25', name: 'Francisco Trincão', country: 'Portugal', flag: '🇵🇹', rating: 81, position: 'AT', role: 'Ponta Direita', club: 'Sporting' }
    ]
  }
};

