import { useState, useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <div className="flex-1 flex items-center gap-2 bg-nothing-gray px-4 py-3">
        <span className="text-nothing-red">&gt;</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ENTER TASK..."
          className="bg-transparent outline-none flex-1 placeholder-opacity-50"
        />
        <span className="animate-blink">_</span>
      </div>
      <button
        type="submit"
        className="w-12 h-12 bg-nothing-red text-black flex items-center justify-center hover:animate-glitch text-xl"
      >
        +
      </button>
    </form>
  );
};

export default AddTaskForm;