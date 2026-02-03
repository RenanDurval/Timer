import { useState, useEffect, useRef, useCallback } from 'react';

const useTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  
  // Settings
  const [mode, setMode] = useState('STANDARD'); // STANDARD, TABATA, EMOM, OPEN_MAT
  const [roundTime, setRoundTime] = useState(300); // Standard: 5 min
  const [restTime, setRestTime] = useState(60); // Standard: 1 min
  const [totalRounds, setTotalRounds] = useState(5);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // State
  const [currentTime, setCurrentTime] = useState(300);
  const [currentRound, setCurrentRound] = useState(1);
  const [phase, setPhase] = useState('PREPARE'); // PREPARE, FIGHT, REST, END, WORK (Tabata)

  const wakeLockRef = useRef(null);

  // --- Voice Coach ---
  const speak = useCallback((text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  // --- Wake Lock ---
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.log('Wake Lock error:', err);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => releaseWakeLock();
  }, [isActive, isPaused]);

  // --- Timer Logic Helpers ---
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setIsPaused(true);
    setCurrentRound(1);
    setPhase('PREPARE');
    
    if (mode === 'OPEN_MAT') {
      setCurrentTime(0);
    } else if (mode === 'TABATA') {
      setCurrentTime(20); // Default Tabata work
    } else {
      setCurrentTime(roundTime);
    }
  }, [roundTime, mode]);

  // When mode changes, reset
  useEffect(() => {
    resetTimer();
    // Set defaults for specific modes if needed
    if (mode === 'TABATA') {
        setRoundTime(20); // Work
        setRestTime(10);  // Rest
        setTotalRounds(8);
    } else if (mode === 'STANDARD') {
        setRoundTime(300);
        setRestTime(60);
        setTotalRounds(5);
    } else if (mode === 'EMOM') {
        setRoundTime(60);
        setRestTime(0);
        setTotalRounds(10);
    }
  }, [mode]); // Don't add resetTimer dependency to avoid loop, it depends on mode indirectly

  const toggleTimer = useCallback(() => {
    setIsPaused((prev) => !prev);
    setIsActive(true);
    if (phase === 'PREPARE') {
        setPhase(mode === 'TABATA' ? 'WORK' : 'FIGHT');
        speak('Combate iniciado!');
    }
  }, [phase, mode, speak]);


  const finishTraining = () => {
    setPhase('END');
    setIsPaused(true);
    speak('Treino finalizado.');
  };

  const handlePhaseChange = () => {
    if (mode === 'STANDARD') {
        if (phase === 'FIGHT') {
            speak('Fim do round!');
            if (currentRound < totalRounds) {
                setPhase('REST');
                setCurrentTime(restTime);
                speak('Descanse.');
            } else {
                finishTraining();
            }
        } else if (phase === 'REST') {
            setPhase('FIGHT');
            setCurrentRound(c => c + 1);
            setCurrentTime(roundTime);
            speak('Combate!');
        }
    } 
    else if (mode === 'TABATA') {
        if (phase === 'WORK') {
            speak('Descanso!');
            if (currentRound < totalRounds) {
                setPhase('REST');
                setCurrentTime(restTime);
            } else {
                finishTraining();
            }
        } else if (phase === 'REST') {
            setPhase('WORK');
            setCurrentRound(c => c + 1);
            setCurrentTime(roundTime);
            speak('Vai!');
        }
    }
    else if (mode === 'EMOM') {
        speak('Minuto!');
        if (currentRound < totalRounds) {
            setCurrentRound(c => c + 1);
            setCurrentTime(60); // EMOM is always 60s
        } else {
            finishTraining();
        }
    }
  };

  // --- Main Tick ---
  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          
          // OPEN MAT Logic (Count Up)
          if (mode === 'OPEN_MAT') {
            return prevTime + 1;
          }

          // Count Down Logic (Standard, Tabata, EMOM)
          if (prevTime <= 1) {
            handlePhaseChange();
            return 0; // Will be overwritten by handlePhaseChange logic mostly
          }
          
          // Voice Announcements (Countdown 10s)
          if (prevTime === 11) speak('Dez segundos!');
          if (prevTime <= 4 && prevTime > 1) speak(String(prevTime - 1));

          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, phase, roundTime, restTime, currentRound, totalRounds, mode, speak]);



  return {
    isActive,
    isPaused,
    currentTime,
    currentRound,
    totalRounds,
    phase,
    mode,
    voiceEnabled,
    toggleTimer,
    resetTimer,
    setRoundTime,
    setRestTime,
    setTotalRounds,
    setMode,
    setVoiceEnabled,
  };
};

export default useTimer;
