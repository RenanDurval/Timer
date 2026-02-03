import React from 'react';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const BigTimer = ({ time, phase, round, totalRounds }) => {
  const getPhaseText = () => {
    switch(phase) {
      case 'FIGHT': return 'COMBATE';
      case 'WORK': return 'WORK (TABATA)';
      case 'REST': return 'DESCANSO';
      case 'END': return 'FIM DO TREINO';
      case 'PREPARE': return 'PREPARAR';
      default: return 'PRONTO';
    }
  };

  // Dynamic text color
  const textColor = phase === 'REST' ? 'text-white' : 'text-jiu-jitsu-white';

  return (
    <div className="flex flex-col items-center justify-center flex-grow z-0">
      <div className={`text-2xl font-bold mb-4 uppercase tracking-[0.2em] ${textColor} opacity-90`}>
        {getPhaseText()}
      </div>
      
      <div className={`font-mono font-bold text-[20vw] leading-none ${textColor} drop-shadow-lg tabular-nums`}>
        {formatTime(time)}
      </div>

      <div className={`mt-8 text-3xl font-bold bg-white/10 px-6 py-2 rounded-xl backdrop-blur-sm ${textColor}`}>
        ROUND {round} <span className="text-sm opacity-60">/ {totalRounds}</span>
      </div>
    </div>
  );
};

export default BigTimer;
