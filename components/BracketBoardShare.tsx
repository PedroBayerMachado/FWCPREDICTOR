/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { TEAMS } from '../data/teams';
import { Match, Team } from '../types';
import { 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Twitter, 
  MessageCircle, 
  Sparkles,
  RefreshCw,
  Trophy,
  Award
} from 'lucide-react';

export const BracketBoardShare: React.FC = () => {
  const { matches } = useSimulator();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('wc_username') || '';
  });
  const [copied, setCopied] = useState(false);
  const [redrawKey, setRedrawKey] = useState(0);

  // Filtros dos jogos de mata-mata essenciais
  const q1 = matches.find(m => m.id === 97); // Quartas 1
  const q2 = matches.find(m => m.id === 98); // Quartas 2
  const q3 = matches.find(m => m.id === 99); // Quartas 3
  const q4 = matches.find(m => m.id === 100); // Quartas 4
  const s1 = matches.find(m => m.id === 101); // Semifinal 1
  const s2 = matches.find(m => m.id === 102); // Semifinal 2
  const tpl = matches.find(m => m.id === 103); // 3º Lugar
  const fin = matches.find(m => m.id === 104); // Grande Final

  // Helpers para encontrar os times
  const getTeam = (id?: string): Team | undefined => {
    if (!id) return undefined;
    return TEAMS.find(t => t.id === id);
  };

  const champion = fin && fin.status === 'completed' && fin.winnerId ? getTeam(fin.winnerId) : null;
  const runnerUp = fin && fin.status === 'completed' && fin.winnerId 
    ? getTeam(fin.winnerId === fin.team1Id ? fin.team2Id : fin.team1Id) 
    : null;
  const thirdPlace = tpl && tpl.status === 'completed' && tpl.winnerId ? getTeam(tpl.winnerId) : null;

  // Gerador de Texto Formatado para Redes Sociais
  const generateShareText = () => {
    const title = `MEUS PALPITES DA COPA DO MUNDO 2026\n\n`;
    
    let podium = '';
    if (champion) {
      podium += `🥇 Campeão: ${champion.emoji} **${champion.name.toUpperCase()}** ${champion.emoji}\n`;
    } else {
      podium += `🥇 Campeão: [A definir]\n`;
    }
    if (runnerUp) {
      podium += `🥈 Vice-Campeão: ${runnerUp.emoji} ${runnerUp.name}\n`;
    }
    if (thirdPlace) {
      podium += `🥉 Terceiro Lugar: ${thirdPlace.emoji} ${thirdPlace.name}\n`;
    }
    podium += `\n`;

    const getMatchSummary = (m?: Match) => {
      if (!m) return '';
      const team1 = getTeam(m.team1Id);
      const team2 = getTeam(m.team2Id);
      const t1Name = team1 ? `${team1.emoji} ${team1.code}` : '❓ TBD';
      const t2Name = team2 ? `${team2.code} ${team2.emoji}` : 'TBD ❓';
      
      if (m.status === 'completed') {
        const pStr = m.team1PenScore !== undefined && m.team2PenScore !== undefined
          ? ` (${m.team1PenScore}-${m.team2PenScore} Pên.)`
          : '';
        const winner = getTeam(m.winnerId);
        return `${t1Name} ${m.team1Score}x${m.team2Score} ${t2Name}${pStr} ➔ Vencedor: ${winner ? winner.name : '?'}`;
      }
      return `${t1Name} vs ${t2Name} (A disputar)`;
    };

    let bracketLines = `JORNADA ATÉ A GLÓRIA:\n\n`;
    bracketLines += `QUARTAS DE FINAL:\n`;
    bracketLines += `• Jogo 97: ${getMatchSummary(q1)}\n`;
    bracketLines += `• Jogo 98: ${getMatchSummary(q2)}\n`;
    bracketLines += `• Jogo 99: ${getMatchSummary(q3)}\n`;
    bracketLines += `• Jogo 100: ${getMatchSummary(q4)}\n\n`;

    bracketLines += `SEMIFINAIS:\n`;
    bracketLines += `• Jogo 101: ${getMatchSummary(s1)}\n`;
    bracketLines += `• Jogo 102: ${getMatchSummary(s2)}\n\n`;

    if (fin) {
      bracketLines += `👑 GRANDE FINAL:\n`;
      bracketLines += `• ${getMatchSummary(fin)}\n\n`;
    }

    const footer = `Monte o seu chaveamento de graça em: ${window.location.origin}\n#CopaDoMundo2026 #WorldCup2026 #Predictions`;
    
    return `${title}${podium}${bracketLines}${footer}`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    let text = `Meus palpites para as finais da Copa do Mundo 2026!\n\n`;
    if (champion) {
      text += `🥇 Campeão: ${champion.emoji} ${champion.name}\n`;
    }
    if (runnerUp) {
      text += `🥈 Vice: ${runnerUp.emoji} ${runnerUp.name}\n`;
    }
    text += `\nSimule grátis em: `;
    const url = window.location.origin;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=Copa2026,Predictions`;
    window.open(twitterUrl, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = generateShareText();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Renderizador do Canvas Gráfico de Alta Resolução (1200x1200px)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resgatar dados das partidas
    const getMatchData = (m?: Match) => {
      if (!m) return { t1: 'A definir', t2: 'A definir', s1: '', s2: '', c1: 'TBD', c2: 'TBD', e1: '❓', e2: '❓', completed: false };
      const team1 = getTeam(m.team1Id);
      const team2 = getTeam(m.team2Id);
      return {
        t1: team1 ? team1.name : 'A definir',
        t2: team2 ? team2.name : 'A definir',
        c1: team1 ? team1.code : 'TBD',
        c2: team2 ? team2.code : 'TBD',
        e1: team1 ? team1.emoji : '❓',
        e2: team2 ? team2.emoji : '❓',
        s1: m.status === 'completed' ? String(m.team1Score) : '-',
        s2: m.status === 'completed' ? String(m.team2Score) : '-',
        completed: m.status === 'completed',
        winnerId: m.winnerId,
        t1Id: m.team1Id,
        t2Id: m.team2Id,
        pen1: m.team1PenScore,
        pen2: m.team2PenScore
      };
    };

    // Configurando Background moderno (Slate-950 com Glow Emerald)
    const width = 1200;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;

    // 1. Fundo Gradiente
    const bgGrad = ctx.createRadialGradient(width/2, height/2, 200, width/2, height/2, width * 0.7);
    bgGrad.addColorStop(0, '#0f172a'); // slate-900
    bgGrad.addColorStop(1, '#020617'); // slate-950
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Globo Holográfico/Glow Esmeralda no centro
    ctx.beginPath();
    const glowGrad = ctx.createRadialGradient(width/2, height/2 + 100, 10, width/2, height/2 + 100, 500);
    glowGrad.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
    glowGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
    ctx.fillStyle = glowGrad;
    ctx.arc(width/2, height/2 + 100, 500, 0, Math.PI * 2);
    ctx.fill();

    // 3. Moldura elegante no card
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // 4. Linhas de Grid Estilizadas (Fundo Esportivo Dinâmico)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
    ctx.lineWidth = 1;
    for (let i = 100; i < width; i += 100) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // 5. Cabeçalho Principal (Título)
    ctx.textBaseline = 'middle';
    
    // Marca d'água / Logo superior
    ctx.fillStyle = '#10b981'; // Emerald
    ctx.font = 'black italic 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MATA-MATA EXCLUSIVO', width / 2, 60);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 italic 38px sans-serif';
    ctx.fillText('MEU CHAVEAMENTO DA COPA DO MUNDO 2026', width / 2, 110);

    // Subtítulo de data e usuário
    ctx.fillStyle = '#94a3b8'; // Slate-400
    ctx.font = '600 18px monospace';
    const tagUser = userName.trim() ? `Simulado por: @${userName.toUpperCase()}` : 'Simulação de Chaveamento Final';
    ctx.fillText(tagUser, width / 2, 150);

    // 6. Desenhar Pódio dos Campeões (Zona de Cesta Estilizada de 150px a 400px)
    // Caixa Central do Campeão
    const drawChampionBox = (x: number, y: number) => {
      // Sombra
      ctx.shadowColor = 'rgba(16, 185, 129, 0.3)';
      ctx.shadowBlur = 40;
      
      // Card do Campeão
      ctx.fillStyle = 'rgba(6, 78, 59, 0.9)'; // emerald-900 / dark-green extremely glossy
      ctx.strokeStyle = '#34d399'; // Emerald-400
      ctx.lineWidth = 3;
      
      const boxW = 340;
      const boxH = 140;
      const rX = x - boxW/2;
      
      // Retângulo com cantos arredondados simples
      ctx.fillRect(rX, y, boxW, boxH);
      ctx.strokeRect(rX, y, boxW, boxH);
      ctx.shadowBlur = 0; // reset shadow

      // Distintivo Dourado "CAMPEÃO"
      ctx.fillStyle = '#f59e0b'; // Amber-500
      ctx.font = '900 italic 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★  CAMPEÃO DO MUNDO  ★', x, y + 25);

      if (champion) {
        // Emoji de Bandeira grande
        ctx.font = '48px sans-serif';
        ctx.fillText(champion.emoji, x, y + 70);

        // Nome do Time
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 italic 26px sans-serif';
        ctx.fillText(champion.name.toUpperCase(), x, y + 115);
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '900 italic 22px sans-serif';
        ctx.fillText('A DEFINIR', x, y + 80);
      }
    };

    drawChampionBox(width / 2, 190);

    // Caixas de Vice e 3º Lugar
    const drawRunnerUpBox = (x: number, y: number, title: string, color: string, team: Team | null) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)'; // slate-900
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      const boxW = 240;
      const boxH = 90;
      const rX = x - boxW/2;
      
      ctx.fillRect(rX, y, boxW, boxH);
      ctx.strokeRect(rX, y, boxW, boxH);

      ctx.fillStyle = color;
      ctx.font = '900 italic 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, x, y + 20);

      if (team) {
        ctx.font = '24px sans-serif';
        ctx.fillText(team.emoji, x - 70, y + 55);

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 italic 16px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(team.name.toUpperCase(), x - 45, y + 55);
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.font = '700 italic 14px sans-serif';
        ctx.fillText('A DEFINIR', x, y + 55);
      }
    };

    // Prata
    drawRunnerUpBox(width / 2 - 320, 215, '🥈 VICE-CAMPEÃO', '#cbd5e1', runnerUp);
    // Bronze
    drawRunnerUpBox(width / 2 + 320, 215, '🥉 TERCEIRO CLOCADO', '#f59e0b', thirdPlace);


    // 7. ARQUITETURA DO CHAVEAMENTO GRÁFICO (Quartas, Semis, Final)
    // Função para desenhar as caixas de Match normais
    const drawMatchBox = (x: number, y: number, matchId: number, title: string) => {
      const data = getMatchData(matches.find(m => m.id === matchId));
      
      const boxW = 200;
      const boxH = 84;
      const rX = x - boxW/2;

      // Card
      ctx.fillStyle = 'rgba(2, 6, 23, 0.9)'; // deep dark state
      ctx.strokeStyle = data.completed ? '#10b981' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = data.completed ? 2 : 1;
      
      ctx.fillRect(rX, y, boxW, boxH);
      ctx.strokeRect(rX, y, boxW, boxH);

      // Jogo ID / Título da fase
      ctx.fillStyle = '#64748b'; // slate-500
      ctx.font = '700 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${title} • JOGO ${matchId}`, x, y + 15);

      // Linha de Divisória
      ctx.beginPath();
      ctx.moveTo(rX + 10, y + 25);
      ctx.lineTo(rX + boxW - 10, y + 25);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.stroke();

      // Time 1
      const isWinner1 = data.completed && data.winnerId === data.t1Id;
      ctx.textAlign = 'left';
      ctx.font = '16px sans-serif';
      ctx.fillText(data.e1, rX + 15, y + 44);
      
      ctx.fillStyle = isWinner1 ? '#e2e8f0' : '#64748b';
      ctx.font = isWinner1 ? '900 italic 13px sans-serif' : '500 13px sans-serif';
      ctx.fillText(data.c1, rX + 42, y + 44);

      // Score 1
      ctx.textAlign = 'right';
      ctx.fillStyle = isWinner1 ? '#10b981' : '#cbd5e1';
      ctx.font = '900 15px monospace';
      const pen1Str = data.pen1 !== undefined ? `(${data.pen1}) ` : '';
      ctx.fillText(`${pen1Str}${data.s1}`, rX + boxW - 15, y + 44);

      // Time 2
      const isWinner2 = data.completed && data.winnerId === data.t2Id;
      ctx.textAlign = 'left';
      ctx.font = '16px sans-serif';
      ctx.fillText(data.e2, rX + 15, y + 66);
      
      ctx.fillStyle = isWinner2 ? '#e2e8f0' : '#64748b';
      ctx.font = isWinner2 ? '900 italic 13px sans-serif' : '500 13px sans-serif';
      ctx.fillText(data.c2, rX + 42, y + 66);

      // Score 2
      ctx.textAlign = 'right';
      ctx.fillStyle = isWinner2 ? '#10b981' : '#cbd5e1';
      ctx.font = '900 15px monospace';
      const pen2Str = data.pen2 !== undefined ? `(${data.pen2}) ` : '';
      ctx.fillText(`${pen2Str}${data.s2}`, rX + boxW - 15, y + 66);

      return { x, y, width: boxW, height: boxH };
    };

    // Coordenadas das Caixas
    // Coluna 1: Quartas (Left)
    const q1Box = drawMatchBox(150, 480, 97, 'QUARTAS');
    const q2Box = drawMatchBox(150, 680, 98, 'QUARTAS');

    // Coluna 2: Semifinal (Left)
    const s1Box = drawMatchBox(400, 580, 101, 'SEMIFINAL');

    // Coluna 4: Semifinal (Right)
    const s2Box = drawMatchBox(800, 580, 102, 'SEMIFINAL');

    // Coluna 5: Quartas (Right)
    const q3Box = drawMatchBox(1050, 480, 99, 'QUARTAS');
    const q4Box = drawMatchBox(1050, 680, 100, 'QUARTAS');

    // Coluna 3: Grande Final (Central Bottom)
    const fBox = drawMatchBox(600, 780, 104, 'GRANDE FINAL');

    // 3º Lugar (Lower central)
    const tBox = drawMatchBox(600, 930, 103, 'DISPUTA DE BRONZE');


    // 8. DESENHAR LINHAS DE CONEXÃO E RUMOS ENTRE OS JOGOS
    const drawLineBetween = (x1: number, y1: number, x2: number, y2: number, flowCompleted: boolean) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      
      // Desenhar curva ou quebra em ângulo reto (Orthogonal line)
      const midX = (x1 + x2) / 2;
      ctx.lineTo(midX, y1);
      ctx.lineTo(midX, y2);
      ctx.lineTo(x2, y2);
      
      ctx.strokeStyle = flowCompleted ? 'rgba(16, 185, 129, 0.45)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = flowCompleted ? 3 : 1.5;
      ctx.stroke();
    };

    // Quartas Esquerda para Semifinal Esquerda
    const q1Comp = getMatchData(matches.find(m => m.id === 97)).completed;
    const q2Comp = getMatchData(matches.find(m => m.id === 98)).completed;
    drawLineBetween(q1Box.x + q1Box.width/2, q1Box.y + q1Box.height/2, s1Box.x - s1Box.width/2, s1Box.y + s1Box.height/4, q1Comp);
    drawLineBetween(q2Box.x + q2Box.width/2, q2Box.y + q2Box.height/2, s1Box.x - s1Box.width/2, s1Box.y + s1Box.height * 0.75, q2Comp);

    // Quartas Direita para Semifinal Direita
    const q3Comp = getMatchData(matches.find(m => m.id === 99)).completed;
    const q4Comp = getMatchData(matches.find(m => m.id === 100)).completed;
    drawLineBetween(q3Box.x - q3Box.width/2, q3Box.y + q3Box.height/2, s2Box.x + s2Box.width/2, s2Box.y + s2Box.height/4, q3Comp);
    drawLineBetween(q4Box.x - q4Box.width/2, q4Box.y + q4Box.height/2, s2Box.x + s2Box.width/2, s2Box.y + s2Box.height * 0.75, q4Comp);

    // Semifinais para a Grande Final
    const s1Comp = getMatchData(matches.find(m => m.id === 101)).completed;
    const s2Comp = getMatchData(matches.find(m => m.id === 102)).completed;
    drawLineBetween(s1Box.x + s1Box.width/2, s1Box.y + s1Box.height/2, fBox.x - fBox.width/2, fBox.y + fBox.height * 0.35, s1Comp);
    drawLineBetween(s2Box.x - s2Box.width/2, s2Box.y + s2Box.height/2, fBox.x + fBox.width/2, fBox.y + fBox.height * 0.35, s2Comp);

    // Conexão da Grande Final até a taça do campeão
    const finalComp = getMatchData(matches.find(m => m.id === 104)).completed;
    if (finalComp) {
      ctx.beginPath();
      ctx.moveTo(fBox.x, fBox.y);
      ctx.lineTo(fBox.x, 340); // sobe até a base do pódio
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // 9. Rodapé / Assinatura do Card
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.font = '500 italic 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Simulador de Copa do Mundo 2026 - Desenvolvido em Cloud Run Sandbox', width / 2, height - 70);
    ctx.fillStyle = '#10b981'; // emerald-500
    ctx.font = '900 13px monospace';
    ctx.fillText('TODOS OS RECURSOS GRATUITOS E REAIS', width / 2, height - 48);

  }, [matches, champion, runnerUp, thirdPlace, userName, redrawKey]);

  // Download real do Canvas como imagem PNG
  const handleDownloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Obter URI de dados
    const dataUrl = canvas.toDataURL('image/png');
    
    // Forçar download
    const link = document.createElement('a');
    link.download = `meu_chaveamento_copado_mundo_2026.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="bracket-board-share-root" className="bg-slate-900 border-2 border-white/10 rounded-sm p-5 sm:p-6 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-widest font-black flex items-center gap-1.5 leading-none mb-1">
            <Sparkles className="h-3.5 w-3.5 fill-emerald-400 animate-pulse" />
            Novo Recurso Gratuito
          </span>
          <h3 className="text-lg font-black text-white uppercase italic tracking-tight">
            Exportador de Chaveamento (Bracket Board Share)
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Gere uma bela imagem em alta resolução ou copie o chaveamento resumido para as redes sociais!
          </p>
        </div>

        {/* Nome do Simulador para Watermark */}
        <div className="w-full sm:w-auto">
          <label className="block text-[10px] font-mono font-black text-slate-500 uppercase tracking-wider mb-1">Assinar meu Chaveamento</label>
          <div className="flex gap-2">
            <input 
              id="bracket-share-username-input"
              type="text" 
              placeholder="@seu_perfil" 
              value={userName}
              onChange={(e) => {
                const val = e.target.value.replace(/[^a-zA-Z0-9_@]/g, '');
                setUserName(val);
                localStorage.setItem('wc_username', val);
              }}
              className="px-3 py-1.5 bg-slate-950 border border-white/10 text-white rounded-xs text-xs font-mono w-full sm:w-36 focus:outline-none focus:border-emerald-500 text-center"
            />
            <button
              onClick={() => setRedrawKey(prev => prev + 1)}
              title="Redesenhar Card"
              className="p-1.5 border border-white/10 hover:border-white rounded-xs text-white bg-slate-950 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PARTE ESQUERDA: Live rendering preview do Canvas */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="border border-white/5 p-4 rounded-sm bg-slate-950 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <span className="absolute top-3 left-4 text-[10px] font-mono font-black text-slate-550 flex items-center gap-1">
              <Award className="h-3 w-3 text-emerald-400" />
              PREVIEW DO CARD (1200x1200px)
            </span>
            
            {/* O Canvas real que desenha em alta resolução. Ele fica visível mas com CSS para torná-lo responsivo */}
            <div className="mt-4 w-full max-w-sm border-2 border-emerald-500/20 rounded-md shadow-2xl overflow-hidden aspect-square">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full bg-slate-950" 
              />
            </div>

            <p className="text-slate-450 text-[10px] font-mono uppercase tracking-wider mt-4">
              Altere os jogos acima e veja o pódio e o grid atualizarem na hora!
            </p>
          </div>

          <button
            id="download-bracket-board-btn"
            onClick={handleDownloadCard}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-sm cursor-pointer shadow-lg shadow-emerald-500/10 transition-all uppercase tracking-widest"
          >
            <Download className="h-4.5 w-4.5 stroke-[2.5px]" />
            Baixar Card Gráfico (PNG)
          </button>
        </div>

        {/* PARTE DIREITA: Compartilhamento Textual Perfeito para Twitter / WhatsApp */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="border border-white/5 p-4 rounded-sm bg-slate-950 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <span className="text-[10px] font-mono font-black text-slate-550 uppercase tracking-widest flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5 text-emerald-400" />
                Texto Formatado para Redes Sociais
              </span>
              <button
                onClick={handleCopyText}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-mono font-black flex items-center gap-1 uppercase tracking-tight cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>

            {/* Visualização de Texto */}
            <div className="bg-slate-900 border border-white/5 p-3 rounded-xs font-mono text-[10.5px] text-slate-300 overflow-y-auto max-h-72 select-all h-64 whitespace-pre-wrap leading-tight text-left">
              {generateShareText()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleShareTwitter}
              className="flex items-center justify-center gap-1.5 px-4 py-3 bg-sky-500 hover:bg-sky-450 text-white font-black text-xs rounded-sm cursor-pointer transition-all uppercase tracking-widest"
            >
              <Twitter className="h-4 w-4 fill-current text-white" />
              Tweetar No X
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-1.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-sm cursor-pointer transition-all uppercase tracking-widest"
            >
              <MessageCircle className="h-4 w-4 fill-current text-white" />
              Enviar Zap
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
