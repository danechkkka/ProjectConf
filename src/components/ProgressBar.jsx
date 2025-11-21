import { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

const ProgressBar = () => {
  const { tasks } = useContext(TaskContext);
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  const bars = Math.round((progress / 100) * 10);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>PROGRESS</span>
        <span>{progress}%</span>
      </div>
      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 border ${i < bars ? 'bg-white' : 'border-white/30'}`}
          />
        ))}
      </div>
      <div className="text-center text-sm opacity-70">
        {completed} OF {total} TASKS
      </div>
    </div>
  );
};

export default ProgressBar;