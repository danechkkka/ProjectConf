import { useState, useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            alert("TIME FOR A BREAK!");
            resetTimer();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="bg-nothing-gray p-6 text-center space-y-4">
      <div className="text-6xl tracking-widest font-mono">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="w-12 h-12 bg-white text-black flex items-center justify-center hover:animate-glitch"
        >
          {isActive ? <Square size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={resetTimer}
          className="w-12 h-12 bg-nothing-red text-black flex items-center justify-center hover:animate-glitch"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;