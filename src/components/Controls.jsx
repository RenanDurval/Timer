import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

const Controls = ({ isPaused, toggleTimer, resetTimer }) => {
  return (
    <div className="flex flex-col gap-4 p-8 w-full max-w-md mx-auto mb-8 z-10">
      <button 
        onClick={toggleTimer}
        className={`w-full py-6 rounded-2xl flex items-center justify-center gap-4 text-3xl font-bold uppercase tracking-widest transition-all active:scale-95 shadow-xl
          ${isPaused 
            ? 'bg-jiu-jitsu-green text-white hover:bg-green-600' 
            : 'bg-jiu-jitsu-yellow text-black hover:bg-yellow-500'}`}
      >
        {isPaused ? <><Play className="w-8 h-8 fill-current" /> INICIAR</> : <><Pause className="w-8 h-8 fill-current" /> PAUSAR</>}
      </button>

      <button 
        onClick={resetTimer}
        className="w-full py-4 bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 text-xl font-semibold backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all"
      >
        <RefreshCw className="w-6 h-6" /> REINICIAR
      </button>
    </div>
  );
};

export default Controls;
