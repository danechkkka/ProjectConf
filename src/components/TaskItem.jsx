import { useContext, useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskContext from '../contexts/TaskContext';
import { GripVertical, Trash2 } from 'lucide-react';

const priorityIcons = { high: '●', medium: '○', low: '-' };

const TaskItem = ({ task }) => {
  const { deleteTask, toggleTaskCompletion, editTask, updateTaskPriority } = useContext(TaskContext);
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: task.id });
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const style = { transform: CSS.Transform.toString(transform) };

  const handleSave = () => {
    if (editText.trim()) editTask(task.id, editText.trim());
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-3 py-2 group"
    >
      <div {...listeners} className="cursor-grab opacity-50 group-hover:opacity-100">
        <GripVertical size={16} />
      </div>
      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className="w-6 h-6 border flex items-center justify-center"
      >
        {task.completed && '×'}
      </button>
      <div className="flex-1">
        {isEditing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            className="bg-transparent border-b border-white outline-none"
          />
        ) : (
          <span
            onDoubleClick={() => !task.completed && setIsEditing(true)}
            className={`${task.completed ? 'opacity-50 line-through' : ''}`}
          >
            {task.title}
          </span>
        )}
      </div>
      <button
        onClick={() => updateTaskPriority(task.id, 
          task.priority === 'high' ? 'medium' : 
          task.priority === 'medium' ? 'low' : 'high'
        )}
        className="opacity-50 hover:opacity-100"
      >
        {priorityIcons[task.priority]}
      </button>
      <button
        onClick={() => deleteTask(task.id)}
        className="opacity-0 group-hover:opacity-100 text-nothing-red"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TaskItem;