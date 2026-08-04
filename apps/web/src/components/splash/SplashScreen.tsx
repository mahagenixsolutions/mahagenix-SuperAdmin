import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, MessageSquare, LineChart, Calendar, CheckSquare } from 'lucide-react';
import styles from './splash.module.css';

interface SplashScreenProps {
  onClose?: () => void;
  autoCloseOnEnd?: boolean;
}

const MODULES = [
  { icon: BookOpen, color: '#3b82f6', tx: '-140px', ty: '-100px', delay: 0 },
  { icon: Users, color: '#10b981', tx: '140px', ty: '-80px', delay: 0.3 },
  { icon: MessageSquare, color: '#f59e0b', tx: '-160px', ty: '60px', delay: 0.6 },
  { icon: LineChart, color: '#8b5cf6', tx: '120px', ty: '120px', delay: 0.9 },
  { icon: Calendar, color: '#ef4444', tx: '-80px', ty: '160px', delay: 1.2 },
  { icon: CheckSquare, color: '#06b6d4', tx: '60px', ty: '180px', delay: 1.5 },
];

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onClose,
  autoCloseOnEnd = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const hasClosedRef = useRef(false);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = () => {
    if (hasClosedRef.current) return;
    hasClosedRef.current = true;
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  useEffect(() => {
    // Total animation time is roughly max delay (1.5s) + animation duration (1s) + buffer
    const totalTimeMs = 3500;
    
    fallbackTimerRef.current = setTimeout(() => {
      if (autoCloseOnEnd) {
        handleClose();
      }
    }, totalTimeMs);

    const handleKeyDown = () => handleClose();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleClose);

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleClose);
    };
  }, [autoCloseOnEnd]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.splashContainer}
        onClick={handleClose}
      >
        <div className={styles.logoWrapper}>
          <div className={`${styles.logoContainer} ${styles.logoPulse}`}>
             <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor" />
                <path
                  d="M2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
          </div>
          
          {MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                className={styles.moduleIcon}
                style={{
                  '--tx': mod.tx,
                  '--ty': mod.ty,
                  animationDelay: `${mod.delay}s`,
                  color: mod.color,
                } as React.CSSProperties}
              >
                <Icon size={24} />
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.loadingText}
        >
          Packing your backpack...
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={styles.loadingSubText}
        >
          Getting everything ready for EduVerse
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;


