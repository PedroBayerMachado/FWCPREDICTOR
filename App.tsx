/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SimulatorProvider, useSimulator } from './contexts/SimulatorContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Predictions } from './pages/Predictions';
import { GroupStage } from './pages/GroupStage';
import { H2HSandbox } from './pages/H2HSandbox';
import { MataMata } from './pages/MataMata';
import { Stats } from './pages/Stats';
import { UltimateTeam } from './pages/UltimateTeam';
import { UltimateLigas } from './pages/UltimateLigas';

function AppContent() {
  const { activeTab } = useSimulator();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-950 flex flex-col font-sans selection:bg-slate-950 selection:text-white relative overflow-x-hidden">
      {/* Background Typography Watermark */}
      <div className="absolute top-1/4 -right-16 text-[180px] sm:text-[280px] md:text-[380px] font-display font-black text-slate-200/10 pointer-events-none select-none italic tracking-tighter uppercase leading-none">
        2026
      </div>
      <div className="absolute bottom-10 -left-16 text-[140px] sm:text-[220px] md:text-[300px] font-display font-black text-slate-200/10 pointer-events-none select-none italic tracking-tighter uppercase leading-none">
        USA
      </div>

      {/* Barra de Navegação */}
      <Navbar />

      {/* Conteúdo Principal Paginado */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'home' && <Home />}
        {activeTab === 'predictions' && <Predictions />}
        {activeTab === 'groups' && <GroupStage />}
        {activeTab === 'h2h-sandbox' && <H2HSandbox />}
        {activeTab === 'stats' && <Stats />}
        {activeTab === 'ultimate-team' && <UltimateTeam />}
        {activeTab === 'ultimate-ligas' && <UltimateLigas />}
      </main>

      {/* Rodapé institucional */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SimulatorProvider>
      <AppContent />
    </SimulatorProvider>
  );
}

