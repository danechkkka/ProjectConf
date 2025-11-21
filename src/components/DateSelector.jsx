import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateSelector = () => {
  const [date, setDate] = useState(new Date());

  const prevDay = () => setDate(d => new Date(d.getTime() - 86400000));
  const nextDay = () => setDate(d => new Date(d.getTime() + 86400000));

  const format = (d) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="bg-nothing-black border-2 border-white/30 p-4 mb-6 text-center pixel-border">
      <div className="flex items-center justify-between">
        <button onClick={prevDay} className="p-1 hover:animate-glitch text-white">
          <ChevronLeft size={18} />
        </button>
        <div className="text-lg tracking-widest pixel-text font-mono">
          {format(date)}
        </div>
        <button onClick={nextDay} className="p-1 hover:animate-glitch text-white">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default DateSelector;