/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

// Classificação e Mapeamento dos códigos FIFA (3 letras) para ISO 3166-1-alpha-2 (2 letras) da Copa do Mundo
const FIFA_TO_ISO_MAP: Record<string, string> = {
  MEX: 'mx',
  ECU: 'ec',
  CRC: 'cr',
  NZL: 'nz',
  CAN: 'ca',
  SUI: 'ch',
  MLI: 'ml',
  HON: 'hn',
  USA: 'us',
  JAM: 'jm',
  SEN: 'sn',
  OMA: 'om',
  ARG: 'ar',
  ALG: 'dz',
  POL: 'pl',
  KOR: 'kr',
  BRA: 'br',
  SWE: 'se',
  CMR: 'cm',
  IRN: 'ir',
  FRA: 'fr',
  TUN: 'tn',
  GEO: 'ge',
  AUS: 'au',
  ESP: 'es',
  COL: 'co',
  NGR: 'ng',
  UZB: 'uz',
  ENG: 'gb-eng', // Bandeira oficial da Inglaterra na FlagCDN
  EGY: 'eg',
  CHI: 'cl',
  UAE: 'ae',
  POR: 'pt',
  GHA: 'gh',
  ROU: 'ro',
  PER: 'pe',
  ITA: 'it',
  MAR: 'ma',
  JPN: 'jp',
  PAN: 'pa',
  GER: 'de',
  URU: 'uy',
  KSA: 'sa',
  SCO: 'gb-sct', // Bandeira oficial da Escócia na FlagCDN
  BEL: 'be',
  CRO: 'hr',
  TUR: 'tr',
  IRQ: 'iq',
  RSA: 'za', // África do Sul
  CZE: 'cz', // República Tcheca
  BIH: 'ba', // Bósnia e Herzegovina
  QAT: 'qa', // Catar
  HAI: 'ht', // Haiti
  PAR: 'py', // Paraguai
  CUW: 'cw', // Curaçau
  CIV: 'ci', // Costa do Marfim
  NED: 'nl', // Holanda (Países Baixos)
  CPV: 'cv', // Cabo Verde
  NOR: 'no', // Noruega
  AUT: 'at', // Áustria
  JOR: 'jo', // Jordânia
  COD: 'cd'  // República Democrática do Congo
};

interface TeamFlagProps {
  code: string;
  name?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const TeamFlag: React.FC<TeamFlagProps> = ({ 
  code, 
  name = 'Seleção', 
  className = '', 
  size = 'md' 
}) => {
  const [imgError, setImgError] = useState(false);
  const cleanCode = code ? code.toUpperCase() : '';
  const isoCode = FIFA_TO_ISO_MAP[cleanCode] || 'un'; // Fallback para bandeira ONU/genérica se não houver mapeamento

  // Dimensões elegantes de bandeira em proporção 3:2 ou 4:3
  const sizeClasses = {
    xs: 'w-4 h-3 text-[10px]',
    sm: 'w-5 h-3.5 text-xs',
    md: 'w-7 h-5 text-sm',
    lg: 'w-10 h-7 text-base',
    xl: 'w-14 h-9.5 text-lg'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  const initials = cleanCode.slice(0, 2);

  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 bg-slate-900 border border-white/20 rounded-xs shadow-md overflow-hidden ${selectedSize} ${className}`}>
      {!imgError ? (
        <img
          src={`https://flagcdn.com/w80/${isoCode}.png`}
          srcSet={`https://flagcdn.com/w80/${isoCode}.png 2x`}
          alt={`Bandeira oficial da seleção ${name}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover"
          onError={() => {
            setImgError(true);
          }}
        />
      ) : (
        <span className="font-mono font-bold text-[9px] text-slate-300 pointer-events-none select-none">
          {initials}
        </span>
      )}
    </div>
  );
};
