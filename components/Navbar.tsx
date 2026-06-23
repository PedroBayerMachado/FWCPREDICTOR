/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSimulator } from '../contexts/SimulatorContext';
import { Trophy, Calendar, Heart, GitMerge, BarChart3, Menu, X, Users, Shield, Zap, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useSimulator();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início', icon: Trophy },
    { id: 'predictions', label: 'Palpites', icon: Heart },
    { id: 'groups', label: 'Simulador', icon: Calendar },
    { id: 'h2h-sandbox', label: 'H2H & Quiz', icon: Zap },
    { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
    { id: 'ultimate-team', label: 'Ultimate Team', icon: Users },
    { id: 'ultimate-ligas', label: 'UT Ligas', icon: Shield }
  ] as const;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      {/* Editorial Thin Top Status Bar */}
      <div className="bg-slate-950 text-[10px] font-display font-medium uppercase tracking-widest text-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 border-b border-slate-900 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Simulador Oficial Copa do Mundo 2026 • 48 Seleções • 104 Jogos</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[9px] text-slate-450">
          <span>USA • MEXICO • CANADA</span>
          <span className="text-slate-600">|</span>
          <span>ESTADIONAIS PREMIUM</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Elegant & Striking Minimalist Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 bg-slate-950 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-display font-black text-white text-sm tracking-tighter">W26</span>
            </div>
            <div>
              <span className="text-slate-950 font-display font-bold uppercase tracking-widest text-base block leading-none">
                WC PREDICTOR <span className="text-slate-500 font-normal">26</span>
              </span>
              <span className="text-[8px] font-mono font-medium uppercase text-slate-400 tracking-widest block mt-1 leading-none">
                SIMULATION & ANALYTICS CHANNELS
              </span>
            </div>
          </div>

          {/* Desktop Menu - Spacious, Minimalist & Uppercase */}
          <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-btn-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 text-[11px] font-display font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer h-20 relative ${
                    isActive
                      ? 'text-slate-950 font-extrabold'
                      : 'text-slate-500 hover:text-slate-950'
                  }`}
                >
                  <Icon className={`h-3 w-3 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-slate-950" />
                  )}
                </button>
              );
            })}

            <a
              id="ext-nav-link-vercel"
              href="https://fwcpredictor.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-display font-bold uppercase tracking-widest bg-slate-950 text-white hover:bg-slate-800 transition-all cursor-pointer ml-3 shadow-xs"
            >
              <ExternalLink className="h-3 w-3 shrink-0" />
              <span>LIVE COPA 2026</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-mobile-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3.5 text-xs font-display font-bold uppercase tracking-widest transition-all ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 px-2">
              <a
                id="ext-nav-mobile-vercel"
                href="https://fwcpredictor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-display font-bold uppercase tracking-widest bg-slate-950 text-white hover:bg-slate-900 shadow-sm"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                <span>LIVE COPA 2026</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
