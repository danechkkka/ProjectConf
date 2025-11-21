import { useContext, useMemo, useState } from 'react';
import TaskContext from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

const TaskList = () => {
  const { tasks, filter, setFilter, updateTaskOrder, clearCompleted } = useContext(TaskContext);
  const [isSorting, setIsSorting] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) updateTaskOrder(active.id, over.id);
  };

  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const filteredTasks = useMemo(() => {
    let list = tasks.filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });
    if (isSorting) {
      return [...list].sort((a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4));
    }
    return list;
  }, [tasks, filter, isSorting]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <div className="flex gap-3">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${filter === f ? 'text-white' : 'text-white/50'} hover:text-white`}
            >
              [{f.toUpperCase()}]
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsSorting(!isSorting)} className="hover:animate-glitch">
            [SORT]
          </button>
          {tasks.some(t => t.completed) && (
            <button onClick={clearCompleted} className="text-nothing-red">[X] CLEAR</button>
          )}
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-8 opacity-50">
          NO TASKS <span className="animate-blink">_</span>
        </div>
      )}
    </div>
  );
};

export default TaskList;