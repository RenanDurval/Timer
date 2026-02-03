import { useState } from 'react';
import useTimer from './hooks/useTimer';
import BigTimer from './components/BigTimer';
import Controls from './components/Controls';
import Settings from './components/Settings';
import Scoreboard from './components/Scoreboard';
import { Settings as SettingsIcon, X, ClipboardList, Timer } from 'lucide-react';

function App() {
  const {
    currentTime,
    currentRound,
    totalRounds,
    phase,
    mode,
    isPaused,
    voiceEnabled,
    toggleTimer,
    resetTimer,
    setRoundTime,
    setRestTime,
    setTotalRounds,
    setMode,
    setVoiceEnabled,
  } = useTimer();

  const [view, setView] = useState('TIMER'); // TIMER, SETTINGS, SCOREBOARD

  // Background color based on phase
  const getPhaseColor = () => {
    if (view === 'SCOREBOARD') return 'bg-jiu-jitsu-black';
    switch (phase) {
      case 'FIGHT': 
      case 'WORK': return 'bg-jiu-jitsu-black';
      case 'REST': return 'bg-jiu-jitsu-red'; 
      case 'END': return 'bg-blue-900';
      default: return 'bg-jiu-jitsu-black';
    }
  };

  if (view === 'SCOREBOARD') {
    return <Scoreboard onClose={() => setView('TIMER')} />;
  }

  return (
    <div className={`h-full w-full flex flex-col justify-between transition-colors duration-500 ${getPhaseColor()} relative overflow-hidden`}>
      
      {/* Header / Info */}
      <div className="flex justify-between items-center p-6 z-10">
        <div className="flex flex-col">
            <div className="text-xl font-bold uppercase tracking-wider text-jiu-jitsu-white opacity-80">
            {mode === 'STANDARD' 
                ? (totalRounds === 12 ? 'BOXE TIMER' : (currentRound === 1 && totalRounds === 5 && currentTime === 300) ? 'JIU-JITSU' : 'TIMER ESPORTIVO') 
                : mode.replace('_', ' ')}
            </div>
            {voiceEnabled && <span className='text-xs text-green-400 font-mono'>VOZ ATIVA</span>}
        </div>
        
        <div className="flex gap-2">
            <button 
            onClick={() => setView('SCOREBOARD')}
            className="p-2 bg-white/10 rounded-full backdrop-blur-sm active:scale-95 transition-transform"
            >
            <ClipboardList className="text-white w-6 h-6" />
            </button>
            <button 
            onClick={() => setView(view === 'SETTINGS' ? 'TIMER' : 'SETTINGS')}
            className="p-2 bg-white/10 rounded-full backdrop-blur-sm active:scale-95 transition-transform"
            >
            {view === 'SETTINGS' ? <X className="text-white w-6 h-6" /> : <SettingsIcon className="text-white w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Main Timer Display */}
      {view === 'SETTINGS' ? (
        <Settings 
           setRoundTime={setRoundTime} 
           setRestTime={setRestTime} 
           setTotalRounds={setTotalRounds}
           setMode={setMode}
           setVoiceEnabled={setVoiceEnabled}
           currentMode={mode}
           voiceEnabled={voiceEnabled}
           close={() => setView('TIMER')}
        />
      ) : (
        <BigTimer 
          time={currentTime} 
          phase={phase} 
          round={currentRound} 
          totalRounds={totalRounds} 
          mode={mode}
        />
      )}

      {/* Controls */}
      {view !== 'SETTINGS' && (
        <Controls 
          isPaused={isPaused} 
          toggleTimer={toggleTimer} 
          resetTimer={resetTimer} 
        />
      )}
    </div>
  );
}

export default App;
