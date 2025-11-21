import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

const Header = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING';
    if (hour < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  return (
    <header className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl md:text-4xl tracking-widest animate-pulse-slow">
          NOVA
        </h1>
        <p className="mt-1 text-lg opacity-80">
          {getGreeting()} <span className="animate-blink">_</span>
        </p>
      </div>
      <div className="text-2xl opacity-50">●</div>
    </header>
  );
};

export default Header;