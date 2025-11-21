import React from 'react';
import { motion } from 'framer-motion';

export default function StatsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-20"
    >
      <h1 className="text-9xl font-black text-white mb-32">СТАТИСТИКА</h1>
      <div className="text-9xl font-black text-red-500">89%</div>
      <p className="text-6xl text-white/50 mt-12">выполнено за неделю</p>
      <p className="text-5xl text-white/30 mt-20">127 дней подряд без пропусков</p>
    </motion.div>
  );
}