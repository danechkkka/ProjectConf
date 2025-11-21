import React from 'react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-20"
    >
      <div className="w-80 h-80 rounded-full bg-gradient-to-br from-red-600 to-pink-700 mb-20 shadow-2xl" />
      <h1 className="text-9xl font-black text-white">ТЫ</h1>
      <p className="text-6xl text-white/60 mt-8">Легенда</p>
      <p className="text-5xl text-white/40 mt-4">Уровень 88 • 127 дней подряд</p>
    </motion.div>
  );
}