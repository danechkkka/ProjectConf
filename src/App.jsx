import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Pause, Play, RotateCw, Mic, Send, Edit2, Trash2, Square, CheckSquare, X, LogOut, BarChart, CalendarDays, List, User, Settings, Check, Clock, Coffee, Plus, Minus, BookOpen, MapPin, UserSquare, Calendar } from 'lucide-react';

// --- КОНСТАНТЫ СТИЛЯ (Wireframe) ---
const BORDER_STYLE = 'border-2 border-white/80';
const ACCENT_COLOR = 'text-white';
const FONT_CLASS = 'font-mono uppercase tracking-widest';
const INPUT_STYLE = 'bg-transparent outline-none flex-1 text-white placeholder-white/50 ' + FONT_CLASS;
const ICON_SIZE = 24;

// --- СЛОВАРЬ ПЕРЕВОДОВ ---
const translations = {
    ru: {
        appName: "NOVAI",
        schedule: "РАСПИСАНИЕ",
        allTasks: "ВСЕ ЗАДАЧИ",
        stats: "СТАТИСТИКА",
        profile: "ПРОФИЛЬ",
        settings: "НАСТРОЙКИ",
        logout: "ВЫЙТИ",
        hideChat: "СКРЫТЬ ЧАТ",
        showChat: "ПОКАЗАТЬ ЧАТ",
        plansPlaceholder: "КАКИЕ У ВАС СЕГОДНЯ ПЛАНЫ?",
        addTask: "+ ЗАДАЧА",
        newTaskPlaceholder: "НОВАЯ ЗАДАЧА...",
        // Scheduler
        scheduleTitle: "УЧЕБНОЕ РАСПИСАНИЕ",
        addLesson: "ДОБАВИТЬ УРОК",
        lessonName: "НАЗВАНИЕ ПАРЫ",
        teacher: "ПРЕПОДАВАТЕЛЬ",
        room: "КАБИНЕТ",
        start: "НАЧАЛО",
        end: "ОКОНЧАНИЕ",
        save: "СОХРАНИТЬ",
        lessonDetails: "ДЕТАЛИ УРОКА",
        dayOfWeek: "ДЕНЬ НЕДЕЛИ",
        // Tasks
        allTasksTitle: "ВСЕ ЗАДАЧИ",
        currentTasks: "ТЕКУЩИЕ ЗАДАЧИ",
        completedTasks: "ЗАВЕРШЕННЫЕ ЗАДАЧИ",
        // Stats
        statsTitle: "СТАТИСТИКА",
        pomodoroCycles: "ЦИКЛОВ POMODORO",
        taskSuccess: "УСПЕШНОСТЬ ЗАДАЧ",
        mostProductive: "САМЫЙ ПРОДУКТИВНЫЙ ДЕНЬ",
        // Settings
        settingsTitle: "НАСТРОЙКИ",
        pomodoroTime: "ВРЕМЯ POMODORO",
        breakTime: "ВРЕМЯ ПЕРЕРЫВА",
        language: "ЯЗЫК ИНТЕРФЕЙСА",
        breakButton: "ПЕРЕРЫВ",
        pomodoroButton: "POMODORO",
        // Profile
        profileTitle: "ПРОФИЛЬ",
        idPrefix: "ID:",
        // Timer
        timerBreak: "ПЕРЕРЫВ",
        timerPomodoro: "ФОКУС",
    },
    en: {
        appName: "NOVAI",
        schedule: "SCHEDULE",
        allTasks: "ALL TASKS",
        stats: "STATISTICS",
        profile: "PROFILE",
        settings: "SETTINGS",
        logout: "LOGOUT",
        hideChat: "HIDE CHAT",
        showChat: "SHOW CHAT",
        plansPlaceholder: "WHAT ARE YOUR PLANS TODAY?",
        addTask: "+ TASK",
        newTaskPlaceholder: "NEW TASK...",
        // Scheduler
        scheduleTitle: "EDUCATIONAL SCHEDULE",
        addLesson: "ADD LESSON",
        lessonName: "LESSON NAME",
        teacher: "TEACHER",
        room: "ROOM",
        start: "START",
        end: "END",
        save: "SAVE",
        lessonDetails: "LESSON DETAILS",
        dayOfWeek: "DAY OF WEEK",
        // Tasks
        allTasksTitle: "ALL TASKS",
        currentTasks: "CURRENT TASKS",
        completedTasks: "COMPLETED TASKS",
        // Stats
        statsTitle: "STATISTICS",
        pomodoroCycles: "POMODORO CYCLES",
        taskSuccess: "TASK SUCCESS RATE",
        mostProductive: "MOST PRODUCTIVE DAY",
        // Settings
        settingsTitle: "SETTINGS",
        pomodoroTime: "POMODORO TIME",
        breakTime: "BREAK TIME",
        language: "INTERFACE LANGUAGE",
        breakButton: "BREAK",
        pomodoroButton: "POMODORO",
        // Profile
        profileTitle: "PROFILE",
        idPrefix: "ID:",
        // Timer
        timerBreak: "BREAK",
        timerPomodoro: "FOCUS",
    }
};

// --- КОМПОНЕНТЫ ЗАГЛУШКИ ---

const Micro = ({ className, onClick }) => (
    <button onClick={onClick} className={`p-2 transition-colors hover:text-green-400 ${className}`}>
        <Mic size={ICON_SIZE + 4} />
    </button>
);

const ChatMainView = ({ input, setInput, handleSend, t }) => {
    // Центральный блок - Чат
    return (
        <div className="flex flex-col h-full p-8">
            <div className="flex-1 overflow-y-auto custom-scrollbar-minimal pb-4">
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-xl p-4 border border-white/50 text-right">
                            Hello, Novai! What are my tasks for today?
                        </motion.div>
                    </div>
                    <div className="flex justify-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-xl p-4 border border-white/50 text-left">
                            Hi! You have 3 tasks today: Gym, Shopping, and a 4:30 PM meeting.
                        </motion.div>
                    </div>
                    <div className="w-full h-48 border border-white/50 mt-12 flex items-center justify-center text-white/30">
                        {t.appName} CORE VISUALIZATION BLOCK
                    </div>
                    <div className="flex items-center justify-center pt-8 text-white">
                        <Check size={ICON_SIZE * 2} className="mx-4 border-2 border-white p-2 hover:bg-white hover:text-black cursor-pointer transition-colors" />
                        <X size={ICON_SIZE * 2} className="mx-4 border-2 border-white p-2 hover:bg-white hover:text-black cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>

            <div className={`flex items-center mt-4 h-16 px-6 ${BORDER_STYLE} rounded-lg`}>
                <input
                    type="text"
                    className={`${INPUT_STYLE} text-2xl font-light`}
                    placeholder={t.plansPlaceholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Micro onClick={handleSend} className="text-white/80 hover:text-white" />
            </div>
        </div>
    );
};

// 3. Страница Статистики (с SVG-диаграммами)
const StatsPage = ({ t }) => {
    // Используем фейковые данные для диаграмм
    const stats = useMemo(() => ({
        pomodoro: 42,
        successRate: 91,
        productiveDay: 'ВТ',
        taskDistribution: [
            { label: 'РАБОТА', value: 45, color: '#FFFFFF' },
            { label: 'ОБУЧЕНИЕ', value: 30, color: '#AAAAAA' },
            { label: 'ЛИЧНОЕ', value: 25, color: '#555555' },
        ]
    }), []);

    const total = stats.taskDistribution.reduce((sum, item) => sum + item.value, 0);

    // Функция для отрисовки круговой диаграммы (Pie Chart) с использованием SVG
    const PieChart = ({ data }) => {
        let cumulativeAngle = 0;
        return (
            <svg width="200" height="200" viewBox="0 0 40 40" className="flex-shrink-0">
                {data.map((item, index) => {
                    const angle = (item.value / total) * 360;
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    const x1 = 20 + 20 * Math.sin(cumulativeAngle * (Math.PI / 180));
                    const y1 = 20 - 20 * Math.cos(cumulativeAngle * (Math.PI / 180));
                    cumulativeAngle += angle;
                    const x2 = 20 + 20 * Math.sin(cumulativeAngle * (Math.PI / 180));
                    const y2 = 20 - 20 * Math.cos(cumulativeAngle * (Math.PI / 180));
                    
                    const path = `M 20,20 L ${x1},${y1} A 20,20 0 ${largeArcFlag},1 ${x2},${y2} Z`;

                    return (
                        <g key={index} className="transition-transform duration-300 hover:scale-105">
                            <path d={path} fill="transparent" stroke={item.color} strokeWidth="1" className="fill-current text-white/5" />
                            <path d={path} fill="transparent" stroke="white" strokeWidth="0.5" />
                        </g>
                    );
                })}
                 <circle cx="20" cy="20" r="10" fill="transparent" stroke="white" strokeWidth="0.5" />
                 <text x="20" y="22" textAnchor="middle" fill="white" fontSize="4" className={FONT_CLASS}>{stats.successRate}%</text>
            </svg>
        );
    };
    
    // Функция для отрисовки столбчатой диаграммы (Bar Chart) с использованием SVG
    const BarChartComp = () => {
        const barData = [
            { day: 'ПН', hours: 7 }, { day: 'ВТ', hours: 9 }, { day: 'СР', hours: 5 }, 
            { day: 'ЧТ', hours: 8 }, { day: 'ПТ', hours: 6 }, { day: 'СБ', hours: 3 }, { day: 'ВС', hours: 2 }
        ];
        const maxHours = 10;
        const barWidth = 8;
        const spacing = 4;
        const chartHeight = 100;

        return (
            <svg width="250" height="120" viewBox="0 0 100 120" className="flex-shrink-0 overflow-visible">
                {barData.map((bar, index) => {
                    const height = (bar.hours / maxHours) * chartHeight;
                    const x = index * (barWidth + spacing);
                    const y = chartHeight - height;

                    return (
                        <g key={bar.day}>
                            <motion.rect
                                x={x}
                                y={chartHeight}
                                width={barWidth}
                                height={0}
                                fill="transparent"
                                stroke="white"
                                strokeWidth="1"
                                initial={{ height: 0 }}
                                animate={{ height: height }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                transform={`translate(0, ${y})`}
                                className="hover:fill-white/20 transition-all cursor-pointer"
                            />
                            <text x={x + barWidth / 2} y={chartHeight + 15} textAnchor="middle" fill="white" fontSize="8" className={FONT_CLASS}>{bar.day}</text>
                        </g>
                    );
                })}
                 <line x1="0" y1={chartHeight} x2="100" y2={chartHeight} stroke="white" strokeWidth="1" />
            </svg>
        );
    };

    return (
        <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-16 h-full w-full overflow-y-auto custom-scrollbar-minimal">
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${FONT_CLASS} border-b border-white/80 pb-2`}>
                <BarChart size={ICON_SIZE} className="inline mr-4" /> {t.statsTitle}
            </h2>

            {/* Блок с текстовой статистикой */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center text-white/80">
                <div className={`${BORDER_STYLE} p-4`}>
                    <p className="text-4xl font-bold text-white">{stats.pomodoro}</p>
                    <p className="text-sm mt-2">{t.pomodoroCycles}</p>
                </div>
                <div className={`${BORDER_STYLE} p-4`}>
                    <p className="text-4xl font-bold text-white">{stats.successRate}%</p>
                    <p className="text-sm mt-2">{t.taskSuccess}</p>
                </div>
                <div className={`${BORDER_STYLE} p-4`}>
                    <p className="text-4xl font-bold text-white">{stats.productiveDay}</p>
                    <p className="text-sm mt-2">{t.mostProductive}</p>
                </div>
            </div>

            {/* Блок с диаграммами */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Круговая диаграмма (Распределение задач) */}
                <div className={`flex flex-col items-center ${BORDER_STYLE} p-8`}>
                    <h3 className="text-xl mb-6 border-b border-white/50 pb-2">РАСПРЕДЕЛЕНИЕ ЗАДАЧ (%)</h3>
                    <PieChart data={stats.taskDistribution} />
                    <div className="mt-6 space-y-2 text-sm">
                        {stats.taskDistribution.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <span style={{ backgroundColor: item.color }} className="w-3 h-3 border border-white mr-3"></span>
                                <span>{item.label} ({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Столбчатая диаграмма (Продуктивность по дням) */}
                <div className={`flex flex-col items-center ${BORDER_STYLE} p-8`}>
                    <h3 className="text-xl mb-6 border-b border-white/50 pb-2">ЧАСЫ ФОКУСА (НЕДЕЛЯ)</h3>
                    <BarChartComp />
                    <p className="mt-6 text-sm text-white/70">УРОВЕНЬ ПРОДУКТИВНОСТИ ПО ДНЯМ НЕДЕЛИ</p>
                </div>
            </div>
        </motion.div>
    );
};

// 4. Страница Расписания (Scheduler)
const LessonDetailsModal = ({ lesson, onClose, t }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg ${BORDER_STYLE} bg-black p-8 rounded-xl relative`}
        >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X size={ICON_SIZE} /></button>
            <h3 className={`text-3xl font-bold mb-6 ${FONT_CLASS} border-b border-white/50 pb-2`}>{t.lessonDetails}</h3>
            
            <div className="space-y-4 text-xl">
                <p className="flex justify-between items-center text-white">
                    <BookOpen size={ICON_SIZE - 4} className="inline mr-3 text-white/70" /> {t.lessonName}:
                    <span className="text-white/80 font-light">{lesson.name}</span>
                </p>
                <p className="flex justify-between items-center text-white">
                    <UserSquare size={ICON_SIZE - 4} className="inline mr-3 text-white/70" /> {t.teacher}:
                    <span className="text-white/80 font-light">{lesson.teacher}</span>
                </p>
                <p className="flex justify-between items-center text-white">
                    <MapPin size={ICON_SIZE - 4} className="inline mr-3 text-white/70" /> {t.room}:
                    <span className="text-white/80 font-light">{lesson.room}</span>
                </p>
                <p className="flex justify-between items-center text-white">
                    <Calendar size={ICON_SIZE - 4} className="inline mr-3 text-white/70" /> {t.dayOfWeek}:
                    <span className="text-white/80 font-light">{lesson.dayLabel}</span>
                </p>
                <p className="flex justify-between items-center text-white">
                    <Clock size={ICON_SIZE - 4} className="inline mr-3 text-white/70" /> {t.start}:
                    <span className="text-white/80 font-light">{lesson.timeStart}</span>
                </p>
                <p className="flex justify-between items-center text-white">
                    <Clock size={ICON_SIZE - 4} className="inline mr-3 text-white/70" /> {t.end}:
                    <span className="text-white/80 font-light">{lesson.timeEnd}</span>
                </p>
            </div>
        </motion.div>
    </motion.div>
);

const SchedulerPage = ({ t, weekDays, schedule, setSchedule }) => {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newLesson, setNewLesson] = useState({
        day: weekDays[0]?.label || 'ПН',
        num: 1,
        name: '',
        teacher: '',
        room: '',
        timeStart: '09:00',
        timeEnd: '10:30'
    });
    
    useEffect(() => {
        // При смене языка или инициализации, убедиться, что новый урок имеет корректный день
        if (weekDays.length > 0 && !newLesson.day) {
            setNewLesson(prev => ({ ...prev, day: weekDays[0].label }));
        }
    }, [t, weekDays, newLesson.day]);

    const handleAddLesson = useCallback(() => {
        if (!newLesson.name || !newLesson.day) return;

        setSchedule(prev => ({
            ...prev,
            [newLesson.day]: [...(prev[newLesson.day] || []), { ...newLesson, id: Date.now() }]
                .sort((a, b) => a.num - b.num)
        }));
        
        setNewLesson(prev => ({ 
            ...prev, 
            name: '', teacher: '', room: '', 
            num: (prev.num % 6) + 1 // Increment for next lesson, cycle after 6
        })); 
        setIsAdding(false);
    }, [newLesson, setSchedule]);

    // Компонент для ввода нового урока
    const AddLessonForm = () => (
        <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            transition={{ duration: 0.2 }}
            className={`p-6 mb-8 w-full max-w-xl ${BORDER_STYLE} mx-auto`}
            style={{ overflow: 'hidden' }}
        >
            <h4 className="text-2xl mb-4">{t.addLesson}</h4>
            <div className="grid grid-cols-2 gap-4">
                {/* День недели */}
                <select
                    value={newLesson.day}
                    onChange={(e) => setNewLesson(p => ({ ...p, day: e.target.value }))}
                    className={`${INPUT_STYLE} border border-white/30 p-2`}
                >
                    {weekDays.map((d) => (
                        <option key={d.label} value={d.label} className="bg-black text-white">{d.label}</option>
                    ))}
                </select>
                {/* Порядковый номер */}
                <input
                    type="number"
                    value={newLesson.num}
                    onChange={(e) => setNewLesson(p => ({ ...p, num: Math.max(1, parseInt(e.target.value) || 1) }))}
                    placeholder="№"
                    className={`${INPUT_STYLE} border border-white/30 p-2`}
                />
                {/* Название */}
                <input
                    type="text"
                    value={newLesson.name}
                    onChange={(e) => setNewLesson(p => ({ ...p, name: e.target.value.toUpperCase() }))}
                    placeholder={t.lessonName}
                    className={`${INPUT_STYLE} border border-white/30 p-2 col-span-2`}
                />
                {/* Преподаватель */}
                <input
                    type="text"
                    value={newLesson.teacher}
                    onChange={(e) => setNewLesson(p => ({ ...p, teacher: e.target.value.toUpperCase() }))}
                    placeholder={t.teacher}
                    className={`${INPUT_STYLE} border border-white/30 p-2`}
                />
                {/* Кабинет */}
                <input
                    type="text"
                    value={newLesson.room}
                    onChange={(e) => setNewLesson(p => ({ ...p, room: e.target.value.toUpperCase() }))}
                    placeholder={t.room}
                    className={`${INPUT_STYLE} border border-white/30 p-2`}
                />
                {/* Начало */}
                <input
                    type="time"
                    value={newLesson.timeStart}
                    onChange={(e) => setNewLesson(p => ({ ...p, timeStart: e.target.value }))}
                    placeholder={t.start}
                    className={`${INPUT_STYLE} border border-white/30 p-2`}
                />
                {/* Окончание */}
                <input
                    type="time"
                    value={newLesson.timeEnd}
                    onChange={(e) => setNewLesson(p => ({ ...p, timeEnd: e.target.value }))}
                    placeholder={t.end}
                    className={`${INPUT_STYLE} border border-white/30 p-2`}
                />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
                 <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-white/70 hover:text-red-500 transition-colors">
                    <X size={ICON_SIZE - 4} className="inline mr-2" /> ОТМЕНА
                </button>
                <button onClick={handleAddLesson} className="px-4 py-2 border border-white/80 hover:bg-white hover:text-black transition-colors">
                    <Check size={ICON_SIZE - 4} className="inline mr-2" /> {t.save}
                </button>
            </div>
        </motion.div>
    );

    return (
        <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-16 h-full w-full overflow-y-auto custom-scrollbar-minimal">
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${FONT_CLASS} border-b border-white/80 pb-2`}>
                <CalendarDays size={ICON_SIZE} className="inline mr-4" /> {t.scheduleTitle}
            </h2>
            
            <AnimatePresence mode="wait">
                {isAdding && <AddLessonForm key="lesson-form" />}
            </AnimatePresence>
            
            {!isAdding && (
                 <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isAdding ? 0 : 0.3 }}
                    onClick={() => setIsAdding(true)} 
                    className="px-6 py-3 mb-8 text-xl border border-white/80 hover:bg-white hover:text-black transition-colors"
                >
                    <Plus size={ICON_SIZE - 4} className="inline mr-2" /> {t.addLesson}
                </motion.button>
            )}

            <div className="grid grid-cols-7 gap-4 w-full h-auto">
                {weekDays.map(day => (
                    <div key={day.label} className="flex flex-col">
                        <h3 className={`text-xl font-bold mb-4 text-center ${day.isSelected ? 'text-white border-b-2 border-white' : 'text-white/50'}`}>
                            {day.label}
                        </h3>
                        <div className="flex-1 space-y-3">
                            {(schedule[day.label] || []).map((lesson, index) => (
                                <motion.div 
                                    key={lesson.id || index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setSelectedLesson({ ...lesson, dayLabel: day.label })}
                                    className={`p-3 cursor-pointer transition-all ${BORDER_STYLE} border-white/30 hover:border-white hover:shadow-white-glow`}
                                >
                                    <p className="text-lg font-bold">{lesson.num}. {lesson.name}</p>
                                    <p className="text-sm text-white/70">{lesson.timeStart} - {lesson.timeEnd}</p>
                                    <p className="text-xs text-white/50">{lesson.room}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedLesson && <LessonDetailsModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} t={t} />}
            </AnimatePresence>
        </motion.div>
    );
};

// 5. Страница Все Задачи (с разделением)
const AllTasksPage = ({ tasks, toggleTask, deleteTask, t }) => {
    const allTasks = useMemo(() => Object.values(tasks).flat(), [tasks]);
    const currentTasks = allTasks.filter(task => !task.done);
    const completedTasks = allTasks.filter(task => task.done);

    const TaskItem = ({ task }) => (
        <motion.div 
            key={task.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-xl p-4 flex justify-between items-center group border-b border-white/10"
        >
            <span className={`font-medium ${task.done ? 'line-through text-white/40' : 'text-white'}`}>
                {task.text}
            </span>
            <div className="flex items-center space-x-4">
                <button className="text-white/50 hover:text-yellow-400"><Edit2 size={ICON_SIZE} /></button>
                <button onClick={() => deleteTask(task.id)} className="text-white/50 hover:text-red-500"><Trash2 size={ICON_SIZE} /></button>
                <button onClick={() => toggleTask(task.id)} className="transition-transform duration-100 active:scale-90">
                    {task.done
                        ? <CheckSquare size={ICON_SIZE} className="text-white" />
                        : <Square size={ICON_SIZE} className="text-white/50 hover:text-white" />
                    }
                </button>
            </div>
        </motion.div>
    );

    return (
        <motion.div key="alltasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-16 h-full w-full overflow-y-auto custom-scrollbar-minimal">
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${FONT_CLASS} border-b border-white/80 pb-2`}>
                <List size={ICON_SIZE} className="inline mr-4" /> {t.allTasksTitle} ({allTasks.length})
            </h2>

            <h3 className="text-2xl mt-10 mb-6 border-b border-white/50 pb-1">{t.currentTasks} ({currentTasks.length})</h3>
            <div className="space-y-4 max-w-4xl">
                <AnimatePresence mode="popLayout">
                    {currentTasks.map(task => <TaskItem key={task.id} task={task} />)}
                    {currentTasks.length === 0 && <p className="text-white/50 text-xl pt-4">НЕТ ТЕКУЩИХ ЗАДАЧ</p>}
                </AnimatePresence>
            </div>

            <h3 className="text-2xl mt-10 mb-6 border-b border-white/50 pb-1">{t.completedTasks} ({completedTasks.length})</h3>
            <div className="space-y-4 max-w-4xl">
                <AnimatePresence mode="popLayout">
                    {completedTasks.map(task => <TaskItem key={task.id} task={task} />)}
                    {completedTasks.length === 0 && <p className="text-white/50 text-xl pt-4">НЕТ ЗАВЕРШЕННЫХ ЗАДАЧ</p>}
                </AnimatePresence>
            </div>

        </motion.div>
    );
};

// 6. Страница Профиля
const ProfilePage = ({ t }) => {
    // Используем заглушки для ID и Имени
    const userId = "USER-NOVAI-2049-F0E8C7A3B1D5";
    const userName = "CYBER_NOMAD_01";
    
    return (
        <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-16 h-full w-full">
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${FONT_CLASS} border-b border-white/80 pb-2`}>
                <User size={ICON_SIZE} className="inline mr-4" /> {t.profileTitle}
            </h2>
            <div className={`space-y-6 max-w-xl ${BORDER_STYLE} p-8`}>
                <div className="text-2xl">
                    <p className="text-white/80 mb-2">USERNAME:</p>
                    <p className="text-white text-4xl">{userName}</p>
                </div>
                <div className="text-lg">
                    <p className="text-white/80 mb-2">{t.idPrefix}</p>
                    <p className="text-white break-all">{userId}</p>
                </div>
                <p className="text-white/50 pt-4">СТАТУС: АКТИВЕН / ВАШИ ДАННЫЕ В БЕЗОПАСНОСТИ</p>
            </div>
        </motion.div>
    );
};


// 7. Страница Настроек (Settings)
const SettingsPage = ({ t, pomodoroDuration, setPomodoroDuration, breakDuration, setBreakDuration, lang, setLang }) => {
    
    const durationControl = (label, value, setter) => (
        <div className="flex justify-between items-center border border-white/30 p-4">
            <span className="text-white/80">{label}:</span>
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => setter(Math.max(1, value - 1))} 
                    className="p-1 border border-white/50 hover:border-white transition-colors"
                >
                    <Minus size={ICON_SIZE - 8} />
                </button>
                <span className="text-white text-2xl font-bold w-12 text-center">{value}</span>
                <button 
                    onClick={() => setter(Math.min(60, value + 1))} 
                    className="p-1 border border-white/50 hover:border-white transition-colors"
                >
                    <Plus size={ICON_SIZE - 8} />
                </button>
                <span className="text-white/50 text-sm">МИН</span>
            </div>
        </div>
    );

    return (
        <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 md:p-16 h-full w-full">
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 ${FONT_CLASS} border-b border-white/80 pb-2`}>
                <Settings size={ICON_SIZE} className="inline mr-4" /> {t.settingsTitle}
            </h2>
            <div className="space-y-6 max-w-xl">
                {durationControl(t.pomodoroTime, pomodoroDuration, setPomodoroDuration)}
                {durationControl(t.breakTime, breakDuration, setBreakDuration)}
                
                {/* Выбор языка */}
                <div className="flex justify-between items-center border border-white/30 p-4">
                    <span className="text-white/80">{t.language}:</span>
                    <div className="flex space-x-4">
                        <button 
                            onClick={() => setLang('ru')} 
                            className={`px-4 py-2 ${lang === 'ru' ? 'bg-white text-black' : 'border border-white/50 hover:border-white'} transition-colors`}
                        >
                            РУССКИЙ
                        </button>
                         <button 
                            onClick={() => setLang('en')} 
                            className={`px-4 py-2 ${lang === 'en' ? 'bg-white text-black' : 'border border-white/50 hover:border-white'} transition-colors`}
                        >
                            ENGLISH
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ---

export default function App() {
  const [lang, setLang] = useState('ru');
  const t = translations[lang];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDays, setWeekDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [tasks, setTasks] = useState({
      // Инициализация задач для ПН (для визуального соответствия референсу)
      'ПН': [ 
          { id: 1, text: 'ЗАЛ', done: false, time: null, dateKey: 'ПН' },
          { id: 2, text: 'МАГАЗИН', done: true, time: null, dateKey: 'ПН' },
          { id: 3, text: 'ВСТРЕЧА 16:30', done: false, time: '16:30', dateKey: 'ПН' },
      ],
      'ВТ': [
          { id: 4, text: 'ПРОЕКТ NOVAI', done: false, time: null, dateKey: 'ВТ' }
      ]
  });
  const [schedule, setSchedule] = useState({
      'ПН': [
          { id: 101, num: 1, name: 'МАТЕМАТИКА', teacher: 'СИДОРОВ', room: '301', timeStart: '9:00', timeEnd: '10:30' },
          { id: 102, num: 2, name: 'ФИЗИКА', teacher: 'ИВАНОВА', room: '405', timeStart: '10:40', timeEnd: '12:10' }
      ]
  });

  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timer, setTimer] = useState(pomodoroDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro'); // 'pomodoro' | 'break'
  const [currentPage, setCurrentPage] = useState('chat');
  const [chatInput, setChatInput] = useState('');
  const [editingTask, setEditingTask] = useState(null); // {id, text, dayKey}

  // Обновление таймера при смене настроек или типа
  useEffect(() => {
    setIsRunning(false);
    if (timerType === 'pomodoro') {
      setTimer(pomodoroDuration * 60);
    } else {
      setTimer(breakDuration * 60);
    }
  }, [pomodoroDuration, breakDuration, timerType]);

  // Инициализация недели
  useEffect(() => {
    const initWeek = (locale) => {
        const dayLabels = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        const dayLabelsEn = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        const currentLabels = locale === 'ru' ? dayLabels : dayLabelsEn;

        // Фиксируем дату на 24 Ноября 2025 для соответствия референсу
        const date = new Date('2025-11-24T12:00:00'); 
        
        const day = date.getDay(); // 0 (ВС) to 6 (СБ). 24 Ноября 2025 - Понедельник (1)
        const diff = day === 0 ? -6 : 1 - day; // Сдвиг к ПН

        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);

        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            days.push({
                label: currentLabels[i],
                number: d.getDate(),
                fullDate: d.toISOString().split('T')[0],
                formatted: d.toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).replace('г.', '').trim(),
                isSelected: i === 0,
            });
        }
        setWeekDays(days);
        setSelectedDayIndex(0);
    };
    initWeek(lang);
  }, [lang]);

  // Таймер логика
  useEffect(() => {
    if (isRunning && timer > 0) {
      const id = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(id);
    }
    if (timer === 0) {
        setIsRunning(false);
        // Можно добавить уведомление о завершении
        console.log(`Таймер ${timerType === 'pomodoro' ? 'Pomodoro' : 'Перерыва'} завершен!`);
    }
  }, [isRunning, timer, timerType]);

  const formatTime = (s) => {
    const m = String(Math.floor(s / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${m}:${sec}`;
  };

  const currentDay = weekDays[selectedDayIndex];
  // Задачи теперь хранятся по меткам дня ('ПН', 'ВТ', ...)
  const currentTasks = currentDay?.label ? (tasks[currentDay.label] || []) : [];
  const completed = currentTasks.filter(t => t.done).length;
  const total = currentTasks.length;
  // Фиксируем прогресс для стиля UI
  const progress = total > 0 ? Math.round((completed / total) * 100) : 67; 
  // Форматируем дату (убрана "г." и гарантированно одна строка)
  const displayedDate = currentDay?.formatted.toUpperCase().replace(/\./g, '') || 'ПОНЕДЕЛЬНИК, 24 НОЯБРЯ 2025';

  const addTask = useCallback(() => {
    if (!newTask.trim() || !currentDay?.label) return;
    
    // Если мы в режиме редактирования
    if (editingTask) {
        setTasks(prev => ({
            ...prev,
            [editingTask.dayKey]: prev[editingTask.dayKey].map(t => 
                t.id === editingTask.id ? { ...t, text: newTask.trim().toUpperCase() } : t
            )
        }));
        setEditingTask(null);
    } else {
        // Режим добавления
        setTasks(prev => ({
            ...prev,
            [currentDay.label]: [...(prev[currentDay.label] || []), { id: Date.now(), text: newTask.trim().toUpperCase(), done: false, dateKey: currentDay.label }]
        }));
    }
    
    setNewTask('');
    setShowInput(false);
  }, [newTask, currentDay, editingTask]);

  const toggleTask = useCallback((id) => {
      // Ищем задачу по всем дням, т.к. `AllTasksPage` показывает все
    let dayKeyToUpdate = Object.keys(tasks).find(day => tasks[day].some(t => t.id === id));
    
    if (dayKeyToUpdate) {
        setTasks(prev => ({
            ...prev,
            [dayKeyToUpdate]: prev[dayKeyToUpdate].map(t => t.id === id ? { ...t, done: !t.done } : t)
        }));
    }
  }, [tasks]);

  const deleteTask = useCallback((id) => {
    let dayKeyToUpdate = Object.keys(tasks).find(day => tasks[day].some(t => t.id === id));
    
    if (dayKeyToUpdate) {
        setTasks(prev => ({
            ...prev,
            [dayKeyToUpdate]: prev[dayKeyToUpdate].filter(t => t.id !== id)
        }));
    }
  }, [tasks]);

  const startEditTask = useCallback((task) => {
      // Это нужно для передачи в правую панель
      setEditingTask({ id: task.id, text: task.text, dayKey: task.dateKey });
      setNewTask(task.text);
      setShowInput(true);
  }, []);


  const handleSend = useCallback(() => {
    if (!chatInput.trim()) return;
    console.log("Отправка сообщения:", chatInput.trim());
    setChatInput('');
  }, [chatInput]);

  const handleDaySelect = (i) => {
    setSelectedDayIndex(i);
    // Сброс поля ввода задачи при смене дня
    setNewTask('');
    setShowInput(false);
    setEditingTask(null);
  }

  const renderContent = () => {
      switch (currentPage) {
          case 'chat':
              return <ChatMainView t={t} input={chatInput} setInput={setChatInput} handleSend={handleSend} />;
          case 'stats':
              return <StatsPage t={t} />;
          case 'schedule':
              return <SchedulerPage t={t} weekDays={weekDays} schedule={schedule} setSchedule={setSchedule} />;
          case 'alltasks':
              return <AllTasksPage tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} t={t} />;
          case 'profile':
              return <ProfilePage t={t} />;
          case 'settings':
              return <SettingsPage 
                t={t} 
                pomodoroDuration={pomodoroDuration} 
                setPomodoroDuration={setPomodoroDuration}
                breakDuration={breakDuration}
                setBreakDuration={setBreakDuration}
                lang={lang}
                setLang={setLang}
              />;
          default:
              return <ChatMainView t={t} input={chatInput} setInput={setChatInput} handleSend={handleSend} />;
      }
  };


  return (
    <div className={`h-screen w-screen bg-black text-white ${FONT_CLASS} p-3 md:p-6 overflow-hidden`}>
      {/* ГЛАВНАЯ РАМКА ПРИЛОЖЕНИЯ */}
      <div className={`h-full w-full ${BORDER_STYLE} rounded-xl p-4 flex gap-4`}>
        
        {/* ЛЕВАЯ КОЛОНКА (НАВИГАЦИЯ) */}
        <nav className="w-48 md:w-64 flex-shrink-0 flex flex-col justify-between pt-4 pb-4">
          <div className="space-y-8 md:space-y-12">
            <h1 className="text-3xl md:text-4xl font-extrabold select-none hover:text-green-400 transition-colors cursor-pointer">{t.appName}</h1>
            <div className="space-y-4 md:space-y-6 text-base md:text-xl">
              {[
                  { key: 'chat', label: t.appName, icon: Menu },
                  { key: 'schedule', label: t.schedule, icon: CalendarDays },
                  { key: 'alltasks', label: t.allTasks, icon: List },
                  { key: 'stats', label: t.stats, icon: BarChart },
                  { key: 'profile', label: t.profile, icon: User },
              ].map(item => (
                  <motion.button 
                      key={item.key}
                      onClick={() => setCurrentPage(item.key)} 
                      whileHover={{ scale: 1.05, originX: 0 }}
                      className={`block text-left transition-colors flex items-center gap-3 ${
                          currentPage === item.key ? 'text-white border-b border-white' : 'text-white/60 hover:text-white/90'
                      }`}
                  >
                      <item.icon size={ICON_SIZE - 4} />{item.label}
                  </motion.button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6 text-base md:text-xl">
            <button onClick={() => setCurrentPage('settings')} className={`block text-left transition-colors flex items-center gap-3 ${
                currentPage === 'settings' ? 'text-white border-b border-white' : 'text-white/60 hover:text-white/90'
            }`}>
                 <Settings size={ICON_SIZE - 4} />{t.settings}
            </button>
            <button className="block text-left text-red-500/80 hover:text-red-500 flex items-center gap-3">
              <LogOut size={ICON_SIZE - 4} />{t.logout}
            </button>
          </div>
        </nav>

        {/* ЦЕНТРАЛЬНАЯ КОЛОНКА (ЧАТ/КОНТЕНТ) */}
        <main className={`flex-1 ${BORDER_STYLE} rounded-xl overflow-hidden flex flex-col`}>
            {/* Кнопка "СКРЫТЬ ЧАТ" */}
            <div className="flex justify-center -translate-y-4">
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentPage(currentPage === 'chat' ? 'schedule' : 'chat')} 
                    className="text-white/80 text-xs px-4 py-1 border border-white/80 rounded-full bg-black hover:text-white transition-colors flex items-center"
                >
                    {currentPage === 'chat' ? t.hideChat : t.showChat} <Clock size={12} className="ml-1" />
                </motion.button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 h-full w-full"
              >
                  {renderContent()}
              </motion.div>
            </AnimatePresence>
        </main>

        {/* ПРАВАЯ КОЛОНКА (ТАЙМЕР И ЗАДАЧИ) */}
        <aside className="w-64 md:w-80 flex-shrink-0 flex flex-col items-end pt-4 space-y-8">
            {/* ТАЙМЕР */}
            <div className="w-full flex justify-end items-center gap-4">
                {/* Метка типа таймера */}
                <span className={`text-base font-light ${timerType === 'break' ? 'text-green-400' : 'text-white/70'}`}>
                    {timerType === 'pomodoro' ? t.timerPomodoro : t.timerBreak}
                </span>

                <div className="flex items-center gap-4 text-5xl md:text-6xl">
                    {formatTime(timer)}
                </div>
            </div>

            {/* КНОПКИ УПРАВЛЕНИЯ ТАЙМЕРОМ */}
            <div className="flex items-center gap-2 self-end">
                {/* Кнопка Перерыв */}
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTimerType(timerType === 'pomodoro' ? 'break' : 'pomodoro')}
                    className={`w-10 h-10 border-2 rounded-full flex items-center justify-center transition-colors ${timerType === 'break' ? 'border-green-400 text-green-400' : 'border-white/50 hover:border-white text-white/50 hover:text-white'}`}
                    title={timerType === 'pomodoro' ? t.breakButton : t.pomodoroButton}
                >
                    <Coffee size={ICON_SIZE - 4} />
                </motion.button>
                
                {/* Кнопка Старт/Пауза */}
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { if (timer === 0) setTimer(pomodoroDuration * 60); setIsRunning(!isRunning); }}
                    className={`w-10 h-10 border-2 rounded-full flex items-center justify-center ${isRunning ? 'border-white/50 text-white/50' : 'border-white hover:bg-white hover:text-black'} transition-all`}
                    title={isRunning ? 'Пауза' : 'Старт'}
                >
                    {isRunning ? <Pause size={ICON_SIZE - 4} /> : <Play size={ICON_SIZE - 4} className="ml-1" />}
                </motion.button>
                
                {/* Кнопка Сброс */}
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { 
                        setIsRunning(false); 
                        setTimer(timerType === 'pomodoro' ? pomodoroDuration * 60 : breakDuration * 60); 
                    }}
                    className="w-10 h-10 border-2 border-white/50 rounded-full flex items-center justify-center hover:border-white transition-all text-white/50 hover:text-white"
                    title="Сброс"
                >
                    <RotateCw size={ICON_SIZE - 4} />
                </motion.button>
            </div>


            {/* ДАТА */}
            <div className="text-sm font-light text-right w-full border-b border-white/10 pb-4">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {displayedDate.toUpperCase()}
                </div>
            </div>

            {/* ДНИ НЕДЕЛИ */}
            <div className="grid grid-cols-7 gap-1 w-full text-center text-lg mb-6">
              {weekDays.map((day, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleDaySelect(i)}
                  whileHover={{ scale: 1.1, color: '#ffffff' }}
                  whileTap={{ scale: 0.9 }}
                  className={`py-1 transition-colors ${selectedDayIndex === i ? 'text-white border-b-2 border-white' : 'text-white/50 hover:text-white/80'}`}
                >
                  {day.label}
                </motion.button>
              ))}
            </div>

            {/* ЗАДАЧИ */}
            <div className="flex-1 w-full space-y-4 overflow-y-auto custom-scrollbar-minimal">
              <AnimatePresence mode="popLayout">
                {currentTasks.map(task => (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center text-xl pb-2 border-b border-white/20"
                  >
                    <span className={`font-medium ${task.done ? 'line-through text-white/40' : 'text-white'}`}>
                      {task.text}
                    </span>
                    <div className="flex items-center space-x-3">
                        <motion.button 
                            onClick={() => startEditTask(task)} 
                            whileHover={{ scale: 1.1, color: '#FCD34D' }}
                            className="text-white/50"
                        >
                            <Edit2 size={ICON_SIZE - 4} />
                        </motion.button>
                        <motion.button 
                            onClick={() => deleteTask(task.id)} 
                            whileHover={{ scale: 1.1, color: '#EF4444' }}
                            className="text-white/50"
                        >
                            <Trash2 size={ICON_SIZE - 4} />
                        </motion.button>
                        <motion.button 
                            onClick={() => toggleTask(task.id)} 
                            whileTap={{ scale: 0.9 }}
                            className="transition-transform duration-100"
                        >
                            {task.done 
                                ? <CheckSquare size={ICON_SIZE - 4} className="text-white" /> 
                                : <Square size={ICON_SIZE - 4} className="text-white/50 hover:text-white" />
                            }
                        </motion.button>
                    </div>
                  </motion.div>
                ))}

                {/* ДОБАВЛЕНИЕ/РЕДАКТИРОВАНИЕ ЗАДАЧИ */}
                <AnimatePresence mode="wait">
                    {(showInput || editingTask) ? (
                        <motion.input
                            key="task-input"
                            initial={{ opacity: 0, y: 10 }} // Изменение здесь
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }} // Изменение здесь
                            autoFocus
                            value={newTask}
                            onChange={e => setNewTask(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addTask()}
                            onBlur={() => !newTask.trim() && !editingTask && setShowInput(false)}
                            className={`w-full ${INPUT_STYLE} text-xl border-b border-white/50 mt-4`}
                            placeholder={editingTask ? 'РЕДАКТИРОВАНИЕ...' : t.newTaskPlaceholder}
                        />
                    ) : (
                        <motion.button
                            key="add-task-btn"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ opacity: 0.8 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowInput(true)}
                            className="w-full pt-4 text-xl text-white/80 hover:text-white transition-colors"
                        >
                            {t.addTask}
                        </motion.button>
                    )}
                </AnimatePresence>
              </AnimatePresence>
            </div>

            {/* ПРОГРЕСС БАР */}
            <div className="w-full mt-6 flex flex-col items-center">
                <div className="text-sm self-end mb-1">{progress}%</div>
                <div className={`relative w-full h-4 ${BORDER_STYLE}`}>
                    <motion.div
                        key={progress}
                        className="absolute inset-0 bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 140, damping: 24, mass: 1.3 }}
                    />
                </div>
            </div>
        </aside>
      </div>
      <style>{`
          .custom-scrollbar-minimal::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar-minimal::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar-minimal::-webkit-scrollbar-thumb {
            background-color: #ffffff40;
            border-radius: 2px;
          }
          .custom-scrollbar-minimal::-webkit-scrollbar-thumb:hover {
            background-color: #ffffff80;
          }
          /* Custom glow for interactive elements */
          .hover\\:shadow-white-glow:hover {
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.2);
          }
      `}</style>
    </div>
  );
}