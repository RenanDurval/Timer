import React, { useState } from 'react';
import { RotateCcw, MonitorPlay, Minus, Plus } from 'lucide-react';

const Scoreboard = ({ onClose }) => {
  const [scoreA, setScoreA] = useState({ points: 0, adv: 0, pen: 0 });
  const [scoreB, setScoreB] = useState({ points: 0, adv: 0, pen: 0 });

  const updateScore = (player, type, value) => {
    if (player === 'A') {
      setScoreA(prev => ({ ...prev, [type]: Math.max(0, prev[type] + value) }));
    } else {
      setScoreB(prev => ({ ...prev, [type]: Math.max(0, prev[type] + value) }));
    }
  };

  const resetMatch = () => {
    if(window.confirm('Zerar placar?')) {
        setScoreA({ points: 0, adv: 0, pen: 0 });
        setScoreB({ points: 0, adv: 0, pen: 0 });
    }
  };

  const PointButton = ({ value, player, type, label, color }) => (
    <button
      onClick={() => updateScore(player, type, value)}
      className={`flex-1 py-4 rounded-xl text-xl font-bold transition-transform active:scale-95 ${color} text-white shadow-lg border-b-4 border-black/20`}
    >
      {label || `+${value}`}
    </button>
  );

  return (
    <div className="h-full w-full flex flex-col bg-jiu-jitsu-black text-white relative">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white/5">
        <button onClick={onClose} className="text-gray-400 font-bold uppercase text-sm">Voltar</button>
        <h2 className="text-lg font-bold uppercase tracking-widest">PLACAR</h2>
        <button onClick={resetMatch}><RotateCcw className="w-6 h-6 text-red-500" /></button>
      </div>

      {/* Players Area */}
      <div className="flex-grow flex flex-col">
        {['A', 'B'].map((player, idx) => (
          <div key={player} className={`flex-1 flex flex-col p-2 border-b-2 border-white/10 ${idx === 0 ? 'bg-blue-900/20' : 'bg-white/5'}`}>
            <div className="flex justify-between items-center mb-2 px-2">
              <span className={`text-2xl font-black uppercase ${idx === 0 ? 'text-blue-400' : 'text-white'}`}>
                ATLETA {player}
              </span>
              <div className="text-5xl font-mono font-bold">
                {idx === 0 ? scoreA.points : scoreB.points}
              </div>
            </div>

            {/* Adv / Pen */}
            <div className="flex gap-4 mb-4 px-2">
                <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold text-sm">VANT</span>
                    <span className="text-2xl font-mono">{idx === 0 ? scoreA.adv : scoreB.adv}</span>
                    <button onClick={() => updateScore(player, 'adv', 1)} className="p-1 bg-yellow-400/20 rounded text-yellow-400"><Plus size={16}/></button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-red-400 font-bold text-sm">PEN</span>
                    <span className="text-2xl font-mono">{idx === 0 ? scoreA.pen : scoreB.pen}</span>
                     <button onClick={() => updateScore(player, 'pen', 1)} className="p-1 bg-red-400/20 rounded text-red-400"><Plus size={16}/></button>
                </div>
            </div>

            {/* Point Controls */}
            <div className="grid grid-cols-3 gap-2 mt-auto">
              <PointButton value={2} player={player} type="points" color={idx === 0 ? "bg-blue-600" : "bg-gray-600"} />
              <PointButton value={3} player={player} type="points" color={idx === 0 ? "bg-blue-700" : "bg-gray-700"} />
              <PointButton value={4} player={player} type="points" color={idx === 0 ? "bg-blue-800" : "bg-gray-800"} />
            </div>
             <div className="flex mt-2 justify-end">
                <button 
                  onClick={() => updateScore(player, 'points', -1)} 
                  className="px-4 py-2 bg-red-900/50 rounded text-red-300 text-sm font-bold flex items-center gap-1"
                >
                    <Minus size={14} /> Corrigir
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
