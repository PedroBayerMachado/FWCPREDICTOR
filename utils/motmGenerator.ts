import { MotmInfo } from '../types';
import { TEAMS } from '../data/teams';

// Comprehensive database of prominent star players for all 48 World Cup nations 
export const NATIONAL_STARS: Record<string, string[]> = {
  'México': ['Santiago Giménez', 'Hirving Lozano', 'Edson Álvarez', 'Luis Chávez', 'Memo Ochoa', 'Orbelín Pineda'],
  'África do Sul': ['Percy Tau', 'Themba Zwane', 'Ronwen Williams', 'Teboho Mokoena', 'Aubrey Modiba'],
  'República da Coreia': ['Heung-min Son', 'Kang-in Lee', 'Min-jae Kim', 'Hee-chan Hwang', 'In-beom Hwang'],
  'República Tcheca': ['Patrik Schick', 'Tomáš Souček', 'Adam Hložek', 'Vladimír Coufal', 'Jindřich Staněk'],
  'Canadá': ['Alphonso Davies', 'Jonathan David', 'Cyle Larin', 'Stephen Eustáquio', 'Tajon Buchanan'],
  'Bósnia e Herzegovina': ['Edin Džeko', 'Miralem Pjanić', 'Sead Kolašinac', 'Amar Dedić', 'Anel Ahmedhodžić'],
  'Catar': ['Akram Afif', 'Almoez Ali', 'Hassan Al-Haydos', 'Lucas Mendes'],
  'Suíça': ['Granit Xhaka', 'Yann Sommer', 'Manuel Akanji', 'Xherdan Shaqiri', 'Breel Embolo', 'Denis Zakaria'],
  'Brasil': ['Neymar Jr', 'Vinícius Jr', 'Rodrygo', 'Raphinha', 'Endrick', 'Bruno Guimarães', 'Lucas Paquetá', 'Alisson Becker', 'Gabriel Martinelli'],
  'Marrocos': ['Achraf Hakimi', 'Brahim Díaz', 'Yassine Bounou', 'Hakim Ziyech', 'Sofyan Amrabat', 'Youssef En-Nesyri', 'Azzedine Ounahi'],
  'Haiti': ['Duckens Nazon', 'Frantzdy Pierrot', 'Dany Jean', 'Fafà Picault'],
  'Escócia': ['Scott McTominay', 'John McGinn', 'Andrew Robertson', 'Billy Gilmour', 'Che Adams', 'Lewis Ferguson'],
  'Estados Unidos': ['Christian Pulisic', 'Weston McKennie', 'Timothy Weah', 'Folarin Balogun', 'Gio Reyna', 'Yunus Musah', 'Antonee Robinson'],
  'Paraguai': ['Miguel Almirón', 'Julio Enciso', 'Antonio Sanabria', 'Gustavo Gómez', 'Ramón Sosa'],
  'Austrália': ['Mathew Ryan', 'Harry Souttar', 'Jackson Irvine', 'Craig Goodwin', 'Nestory Irankunda'],
  'Turquia': ['Arda Güler', 'Hakan Çalhanoğlu', 'Kerem Aktürkoğlu', 'Barış Alper Yılmaz', 'Kenan Yıldız', 'Ferdi Kadıoğlu'],
  'Alemanha': ['Jamal Musiala', 'Florian Wirtz', 'Kai Havertz', 'Leroy Sané', 'Joshua Kimmich', 'İlkay Gündoğan', 'Manuel Neuer', 'Antonio Rüdiger'],
  'Curaçau': ['Juninho Bacuna', 'Leandro Bacuna', 'Rangelo Janga', 'Gervane Kastaneer'],
  'Costa do Marfim': ['Sébastien Haller', 'Franck Kessié', 'Simon Adingra', 'Ibrahim Sangaré', 'Ousmane Diomandé', 'Seko Fofana'],
  'Equador': ['Enner Valencia', 'Moisés Caicedo', 'Pervis Estupiñán', 'Piero Hincapié', 'Kendry Páez', 'Willian Pacho'],
  'Holanda': ['Virgil van Dijk', 'Frenkie de Jong', 'Memphis Depay', 'Cody Gakpo', 'Xavi Simons', 'Jeremie Frimpong', 'Nathan Aké'],
  'Japão': ['Kaoru Mitoma', 'Takefusa Kubo', 'Wataru Endo', 'Ritsu Doan', 'Takumi Minamino', 'Ayase Ueda', 'Hiroki Ito'],
  'Suécia': ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski', 'Emil Forsberg', 'Victor Lindelöf', 'Anthony Elanga'],
  'Tunísia': ['Youssef Msakni', 'Elyes Skhiri', 'Hannibal Mejbri', 'Aissa Laïdouni'],
  'Bélgica': ['Kevin De Bruyne', 'Romelu Lukaku', 'Leandro Trossard', 'Jérémy Doku', 'Amadou Onana', 'Lois Openda', 'Yannick Carrasco'],
  'Egito': ['Mohamed Salah', 'Omar Marmoush', 'Mostafa Mohamed', 'Trézéguet', 'Mohamed Elneny'],
  'Irã': ['Mehdi Taremi', 'Sardar Azmoun', 'Alireza Jahanbakhsh', 'Samaman Ghoddos'],
  'Nova Zelândia': ['Chris Wood', 'Liberato Cacace', 'Sarpreet Singh', 'Marko Stamenic'],
  'Espanha': ['Lamine Yamal', 'Rodri', 'Pedri', 'Gavi', 'Dani Olmo', 'Nico Williams', 'Álvaro Morata', 'Dani Carvajal', 'Fabián Ruiz'],
  'Cabo Verde': ['Ryan Mendes', 'Garry Rodrigues', 'Bebé', 'Jovane Cabral'],
  'Arábia Saudita': ['Salem Al-Dawsari', 'Firas Al-Buraikan', 'Saud Abdulhamid', 'Abdulrahman Ghareeb'],
  'Uruguai': ['Federico Valverde', 'Darwin Núñez', 'Ronald Araújo', 'Luis Suárez', 'Giorgian De Arrascaeta', 'Rodrigo Bentancur', 'Manuel Ugarte'],
  'França': ['Kylian Mbappé', 'Antoine Griezmann', 'Ousmane Dembélé', 'Eduardo Camavinga', 'William Saliba', 'Mike Maignan', 'Aurélien Tchouaméni'],
  'Senegal': ['Sadio Mané', 'Nicolas Jackson', 'Kalidou Koulibaly', 'Ismaïla Sarr', 'Édouard Mendy', 'Pape Matar Sarr'],
  'Iraque': ['Aymen Hussein', 'Ali Jasim', 'Mohanad Ali', 'Ibrahim Bayesh'],
  'Irlanda do Norte': ['Conor Bradley', 'Shea Charles', 'Paddy McNair', 'Isaac Price'],
  'Inglaterra': ['Jude Bellingham', 'Harry Kane', 'Bukayo Saka', 'Phil Foden', 'Declan Rice', 'Cole Palmer', 'Ollie Watkins', 'Trent Alexander-Arnold'],
  'Colômbia': ['Luis Díaz', 'James Rodríguez', 'Jhon Durán', 'Daniel Muñoz', 'Jefferson Lerma', 'Davinson Sánchez', 'Richard Ríos'],
  'Uzbequistão': ['Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Oston Urunov', 'Valeri Kichin'],
  'Gabão': ['Pierre-Emerick Aubameyang', 'Denis Bouanga', 'Mario Lemina', 'Guélor Kanga'],
  'Argentina': ['Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez', 'Enzo Fernández', 'Alexis Mac Allister', 'Rodrigo de Paul', 'Emiliano Martínez', 'Ángel Di María'],
  'Ucrânia': ['Artem Dovbyk', 'Mykhailo Mudryk', 'Oleksandr Zinchenko', 'Andriy Lunin', 'Viktor Tsygankov', 'Illia Zabarnyi'],
  'Jamaica': ['Leon Bailey', 'Michail Antonio', 'Bobby Decordova-Reid', 'Demarai Gray', 'Ethan Pinnock'],
  'Nova Caledônia': ['Georges Gope-Fenepej', 'Roy Kayara', 'César Zeoula'],
  'Portugal': ['Cristiano Ronaldo', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'João Félix', 'Diogo Costa', 'Rúben Dias', 'Vitinha', 'João Palhinha'],
  'Argélia': ['Riyad Mahrez', 'Saïd Benrahma', 'Amine Gouiri', 'Ismaël Bennacer', 'Rayan Aït-Nouri'],
  'Honduras': ['Luis Palma', 'Alberth Elis', 'Antony Lozano', 'Andy Najar'],
  'Fiji': ['Roy Krishna', 'Savenaca Baledrokadroka', 'Filipe Baravilala']
};

export const GENERIC_NAMES: Record<string, string[]> = {
  Latino: ['G. Ramírez', 'J. Silva', 'R. Castaneda', 'M. Santos', 'F. Morales', 'A. Guerrero', 'E. Vargas', 'L. Cardozo'],
  Euro: ['M. Janssen', 'T. Novak', 'P. Kowalski', 'J. Larsen', 'O. Weber', 'A. Rossi', 'S. Lindqvist', 'K. Petrov'],
  Africa: ['S. Diallo', 'M. Traoré', 'K. Koné', 'O. Mensah', 'B. Diop', 'A. Sow', 'M. Keita', 'J. Okoro'],
  Asia: ['K. Tanaka', 'J. Kim', 'L. Chen', 'S. Takahashi', 'H. Nguyen', 'Y. Sato', 'A. Al-Faraj', 'T. Wang'],
};

// Determines region style for generic name fallbacks
function getFallbackName(countryName: string): string {
  const c = countryName.toLowerCase();
  
  if (c.includes('brasil') || c.includes('argentina') || c.includes('paraguai') || c.includes('equador') || 
      c.includes('uruguai') || c.includes('colômbia') || c.includes('médico') || c.includes('méxico') || 
      c.includes('honduras') || c.includes('jamaica') || c.includes('haiti') || c.includes('curaçau') ||
      c.includes('espanha') || c.includes('portugal') || c.includes('itália')) {
    const list = GENERIC_NAMES.Latino;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  if (c.includes('áfrica') || c.includes('marrocos') || c.includes('egito') || c.includes('senegal') || 
      c.includes('tunísia') || c.includes('costa do marfim') || c.includes('gabão') || c.includes('argélia') || c.includes('cabo verde')) {
    const list = GENERIC_NAMES.Africa;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  if (c.includes('coreia') || c.includes('catar') || c.includes('japão') || c.includes('irã') || 
      c.includes('arábia') || c.includes('iraque') || c.includes('uzbequistão')) {
    const list = GENERIC_NAMES.Asia;
    return list[Math.floor(Math.random() * list.length)];
  }
  
  const list = GENERIC_NAMES.Euro;
  return list[Math.floor(Math.random() * list.length)];
}

export function generateMotm(
  team1Id: string,
  team2Id: string,
  team1Score: number,
  team2Score: number,
  isPlayoff: boolean,
  team1PenScore?: number,
  team2PenScore?: number
): MotmInfo {
  const t1 = TEAMS.find(t => t.id === team1Id);
  const t2 = TEAMS.find(t => t.id === team2Id);

  // Fallback to avoid empty errors
  const name1 = t1 ? t1.name : 'Time A';
  const name2 = t2 ? t2.name : 'Time B';

  // Determine which team wins the MotM. Generally, the winner, or if 0-0/draw, we pick one of them.
  let winningTeamName = name1;
  let winningTeamId = team1Id;
  let loserTeamName = name2;
  let wonByShootout = false;

  if (team1Score > team2Score) {
    winningTeamName = name1;
    winningTeamId = team1Id;
    loserTeamName = name2;
  } else if (team2Score > team1Score) {
    winningTeamName = name2;
    winningTeamId = team2Id;
    loserTeamName = name1;
  } else if (isPlayoff && team1PenScore !== undefined && team2PenScore !== undefined) {
    wonByShootout = true;
    if (team1PenScore > team2PenScore) {
      winningTeamName = name1;
      winningTeamId = team1Id;
      loserTeamName = name2;
    } else {
      winningTeamName = name2;
      winningTeamId = team2Id;
      loserTeamName = name1;
    }
  } else {
    // Regular draw in group stage
    if (Math.random() > 0.5) {
      winningTeamName = name1;
      winningTeamId = team1Id;
      loserTeamName = name2;
    } else {
      winningTeamName = name2;
      winningTeamId = team2Id;
      loserTeamName = name1;
    }
  }

  // Get score values of winning team and losing team
  const winningScore = winningTeamId === team1Id ? team1Score : team2Score;
  const losingScore = winningTeamId === team1Id ? team2Score : team1Score;

  // Retrieve player repository
  const roster = NATIONAL_STARS[winningTeamName] || [];
  let playerName = '';
  if (roster.length > 0) {
    playerName = roster[Math.floor(Math.random() * roster.length)];
  } else {
    playerName = getFallbackName(winningTeamName);
  }

  // Determine main position context to mock metrics: Forward/Midfielder or Goalkeeper/Defender
  const isGkOrDef = (playerName.toLowerCase().includes('ochoa') || 
                    playerName.toLowerCase().includes('sommer') ||
                    playerName.toLowerCase().includes('bounou') ||
                    playerName.toLowerCase().includes('alisson') ||
                    playerName.toLowerCase().includes('neuer') ||
                    playerName.toLowerCase().includes('mendy') ||
                    playerName.toLowerCase().includes('martínez') ||
                    playerName.toLowerCase().includes('costa') ||
                    playerName.toLowerCase().includes('mignan') ||
                    playerName.toLowerCase().includes('ryan') ||
                    playerName.toLowerCase().includes('van dijk') || 
                    playerName.toLowerCase().includes('araujo') || 
                    playerName.toLowerCase().includes('saliba') || 
                    playerName.toLowerCase().includes('gundogan') || 
                    playerName.toLowerCase().includes('kimmich') || 
                    playerName.toLowerCase().includes('akanji') || 
                    playerName.toLowerCase().includes('gomez') || 
                    playerName.toLowerCase().includes('dias') || 
                    playerName.toLowerCase().includes('rudiger') || 
                    Math.random() < 0.15); // 15% other positions default to GK/DEF behavior

  let rating = 7.5;
  let goals = 0;
  let assists = 0;
  let saves: number | undefined;
  let tackles: number | undefined;
  let impactDescription = '';

  if (isGkOrDef) {
    // Goalkeeper or Defender outstanding metrics
    tackles = Math.floor(Math.random() * 5) + 3; // 3 to 7
    saves = Math.floor(Math.random() * 6) + 4; // 4 to 9 saves for outstanding games
    
    // Decent rating based on clean sheets or low conceding
    if (losingScore === 0) {
      rating = +(8.2 + Math.random() * 1.5).toFixed(1);
      if (wonByShootout) {
        rating = +(8.8 + Math.random() * 1.2).toFixed(1);
        impactDescription = `Uma verdadeira muralha intransponível! Pegou pênaltis cruciais na disputa e guardou a trave limpa no tempo regular contra ${loserTeamName}.`;
      } else {
        impactDescription = `Liderança implacável na zaga! Neutralizou completamente os atacantes rivais de ${loserTeamName} e garantiu o saldo de gols zerado.`;
      }
    } else {
      rating = +(7.6 + Math.random() * 1.2).toFixed(1);
      impactDescription = `Segurança absoluta lá atrás! Com ${saves} defesas difíceis e botes limpos, evitou um empate doloroso contra ${loserTeamName}.`;
    }
  } else {
    // Attackers or Midfielders statistics
    if (winningScore > 0) {
      // Allocate portion of team goals to this player
      if (winningScore === 1) {
        goals = 1;
        assists = 0;
        rating = +(8.0 + Math.random() * 1.0).toFixed(1);
        impactDescription = `O herói do jogo! Marcou o único e salvador gol da partida para cravar a consagração máxima em cima de ${loserTeamName}.`;
      } else if (winningScore === 2) {
        const rng = Math.random();
        if (rng < 0.4) {
          goals = 2;
          rating = +(8.8 + Math.random() * 0.9).toFixed(1);
          impactDescription = `Avassalador! Marcou duas vezes na partida com finalizações impecáveis e decretou o triunfo sobre ${loserTeamName}.`;
        } else if (rng < 0.8) {
          goals = 1;
          assists = 1;
          rating = +(8.4 + Math.random() * 0.9).toFixed(1);
          impactDescription = `Performance mágica! Comandou a armação ofensiva com passes refinados, deixando um gol e uma assistência genial.`;
        } else {
          goals = 0;
          assists = 2;
          rating = +(8.1 + Math.random() * 0.8).toFixed(1);
          impactDescription = `Visão de jogo sublime! Distribuiu dois passes magistrais para gol, abrindo caminhos na defesa de ${loserTeamName}.`;
        }
      } else {
        // 3 or more goals
        const rng = Math.random();
        if (rng < 0.3) {
          goals = 3;
          rating = +(9.6 + Math.random() * 0.4).toFixed(1); // Near perfect rating for a hat-trick
          impactDescription = `HAT-TRICK HISTÓRICO! Uma atuação lendária que ficará marcada na Copa com 3 gols fantásticos contra ${loserTeamName}.`;
        } else if (rng < 0.7) {
          goals = 2;
          assists = 1;
          rating = +(9.2 + Math.random() * 0.6).toFixed(1);
          impactDescription = `Participou de quase todos os lances de perigo! Anotou um doblete fantástico e ainda deu assistência milimétrica.`;
        } else {
          goals = 1;
          assists = 2;
          rating = +(8.8 + Math.random() * 0.8).toFixed(1);
          impactDescription = `O maestro orquestrando o ataque! Um gol fantástico de fora da área e dois passes sublimes para estraçalhar ${loserTeamName}.`;
        }
      }
    } else {
      // Draw 0-0, striker could just be highly impactful midfield playmaker
      rating = +(7.5 + Math.random() * 0.8).toFixed(1);
      impactDescription = `Criou ótimas chances e distribuiu bolas venenosas no ataque, sendo a principal fonte de perigo tático no clássico equilibrado contra ${loserTeamName}.`;
    }
  }

  // Double check bounds
  if (rating > 10.0) rating = 10.0;
  if (rating < 7.0) rating = 7.0;

  return {
    playerName,
    teamId: winningTeamId,
    rating,
    goals,
    assists,
    saves,
    tackles,
    impactDescription
  };
}
