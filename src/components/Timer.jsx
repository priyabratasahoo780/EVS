import React from 'react';
import styles from './Timer.module.css';

const Timer = ({ time }) => {
  const isWarning = time <= 5;
  
  return (
    <div className={`${styles.timerContainer} ${isWarning ? styles.warning : ''}`}>
      <div className={`neumorph-inner ${styles.timerCircle}`}>
        <span className={styles.timeText}>{time}s</span>
      </div>
    </div>
  );
};

export default Timer;
