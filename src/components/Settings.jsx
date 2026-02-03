import React from 'react';
import { Mic, MicOff, Dumbbell, Timer } from 'lucide-react';

const Settings = ({ setRoundTime, setRestTime, setTotalRounds, setMode, setVoiceEnabled, currentMode, voiceEnabled, close }) => {
  return (
    <div className="w-full max-w-md mx-auto px-8 py-4 flex flex-col gap-6 text-white h-full justify-center overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">CONFIGURAÇÕES</h2>

      {/* Sports Presets */}
      <div className="space-y-2">
        <label className="text-lg opacity-80 uppercase font-semibold">Esporte (Presets)</label>
        <div className="grid grid-cols-2 gap-2">
            {[
                {id: 'BJJ', label: 'Jiu-Jitsu', mode: 'STANDARD', round: 5*60, rest: 60, rounds: 5}, 
                {id: 'BOXING', label: 'Boxe', mode: 'STANDARD', round: 3*60, rest: 60, rounds: 12}, 
                {id: 'MMA', label: 'MMA', mode: 'STANDARD', round: 5*60, rest: 60, rounds: 5}, 
                {id: 'MUAY', label: 'Muay Thai', mode: 'STANDARD', round: 3*60, rest: 120, rounds: 5}
            ].map(p => (
                <button 
                    key={p.id}
                    onClick={() => {
                        setMode(p.mode);
                        setRoundTime(p.round);
                        setRestTime(p.rest);
                        setTotalRounds(p.rounds);
                        // Optional: close();
                    }}
                    className="p-3 bg-white/10 rounded-lg font-bold text-sm border border-white/20 hover:bg-white/20"
                >
                    {p.label}
                </button>
            ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="text-lg opacity-80 uppercase font-semibold">Modo de Treino</label>
        <div className="grid grid-cols-2 gap-2">
            {[
                {id: 'STANDARD', label: 'Padrão (Round)'}, 
                {id: 'TABATA', label: 'Tabata'}, 
                {id: 'EMOM', label: 'EMOM'}, 
                {id: 'OPEN_MAT', label: 'Open Mat'}
            ].map(m => (
                <button 
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`p-3 rounded-lg font-bold text-sm border ${currentMode === m.id ? 'bg-blue-600 border-blue-400' : 'bg-gray-800 border-gray-700'}`}
                >
                    {m.label}
                </button>
            ))}
        </div>
      </div>

      {/* Voice Toggle */}
      <button 
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className={`w-full p-4 rounded-xl flex items-center justify-center gap-3 font-bold text-xl border ${voiceEnabled ? 'bg-green-700 border-green-500' : 'bg-red-900 border-red-800'}`}
      >
         {voiceEnabled ? <><Mic /> Voz Ativada</> : <><MicOff /> Voz Desativada</>}
      </button>

      {/* Only show time settings if NOT in fixed modes like TABATA/EMOM if desired, but allowing override is better */}
      
      <div className="space-y-2">
        <label className="text-lg opacity-80 uppercase font-semibold">Tempo de Round (min)</label>
        <div className="grid grid-cols-4 gap-2">
            {[2, 3, 5, 6, 8, 10].map(m => (
                <button 
                    key={m} 
                    onClick={() => setRoundTime(m * 60)}
                    className="p-3 bg-gray-800 rounded-lg font-bold hover:bg-gray-700 border border-gray-700"
                >
                    {m}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-lg opacity-80 uppercase font-semibold">Tempo de Descanso (seg)</label>
        <div className="grid grid-cols-4 gap-2">
            {[10, 30, 45, 60].map(s => (
                <button 
                    key={s} 
                    onClick={() => setRestTime(s)}
                    className="p-3 bg-gray-800 rounded-lg font-bold hover:bg-gray-700 border border-gray-700"
                >
                    {s}
                </button>
            ))}
        </div>
      </div>

       <div className="space-y-2">
        <label className="text-lg opacity-80 uppercase font-semibold">Total de Rounds</label>
        <div className="grid grid-cols-5 gap-2">
            {[1, 3, 5, 8, 10].map(r => (
                <button 
                    key={r} 
                    onClick={() => setTotalRounds(r)}
                    className="p-3 bg-gray-800 rounded-lg font-bold hover:bg-gray-700 border border-gray-700"
                >
                    {r}
                </button>
            ))}
        </div>
      </div>
      
      <button onClick={close} className="mt-4 w-full py-4 bg-blue-600 rounded-xl text-xl font-bold mb-8">
        SALVAR E VOLTAR
      </button>
    </div>
  );
};

export default Settings;
