/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { Trophy, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useSimulator();

  return (
    <footer className="bg-white border-t border-slate-200 py-8 text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-sm rotate-45 flex items-center justify-center shadow-md shadow-blue-500/10">
                <span className="-rotate-45 font-black text-white text-xs">W26</span>
              </div>
              <div>
                <span className="text-slate-900 font-extrabold uppercase tracking-tighter text-sm block leading-none">
                  WC Predictor <span className="text-blue-600">26</span>
                </span>
                <span className="text-[9px] font-semibold uppercase text-slate-400 tracking-widest block mt-0.5 leading-none">
                  2026 WORLD CUP SIMULATOR
                </span>
              </div>
            </div>
            <a
              id="footer-ext-link-vercel"
              href="https://fwcpredictor.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-colors gap-1.5 text-[11px] font-mono font-medium text-blue-600 hover:text-blue-700 transition-colors mt-1"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>fwcpredictor.vercel.app</span>
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs text-slate-450">
              © 2026 World Cup 2026 Predictor. Todos os direitos reservados.
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Inspirado na Copa do Mundo FIFA 2026™ — América do Norte (Canadá, México e EUA)
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
