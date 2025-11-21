// src/components/Micro.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

export default function Micro() {
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const tick = () => {
        if (!analyserRef.current) return;
        const data = new Uint8Array(analyser.fftSize);
        analyserRef.current.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setVolume(avg / 255);
        animationFrameRef.current = requestAnimationFrame(tick);
      };
      tick();

      setIsRecording(true);
    } catch (err) {
      console.log('Микрофон не доступен или запрещён');
    }
  };

  const stopRecording = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setVolume(0);
  };

  // Очистка при выходе
  useEffect(() => {
    return () => stopRecording();
  }, []);

  return (
    <motion.button
      onClick={() => (isRecording ? stopRecording() : startRecording())}
      whileTap={{ scale: 0.88 }}
      className="relative flex items-center justify-center p-4"
    >
      {/* Пульсирующие кольца при записи */}
      {isRecording && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/30"
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20"
            animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.3 }}
          />
        </>
      )}

      {/* Волна или иконка */}
      {isRecording ? (
        <div className="flex gap-1.5 items-end h-14">
          {[0, 1, 2, 3, 4].map(i => (
            <motion.div
              key={i}
              className="w-2 bg-red-500 rounded-full"
              animate={{ height: [12, 48 + volume * 70, 12] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
      ) : (
        <Mic size={54} className="text-white/70" />
      )}
    </motion.button>
  );
}