import React from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center px-20"
    >
      <h1 className="text-9xl font-black text-white mb-40">НАСТРОЙКИ</h1>
      <div className="text-6xl text-white/40">Скоро здесь будут тумблеры и красота</div>
    </motion.div>
  );
}