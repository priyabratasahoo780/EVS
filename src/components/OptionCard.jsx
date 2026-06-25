import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';
import styles from './OptionCard.module.css';

const OptionCard = ({ 
  option, 
  index, 
  isSelected, 
  isCorrect, 
  isWrong, 
  isLocked, 
  onSelect 
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  let statusClass = '';
  if (isSelected && isCorrect) statusClass = styles.correct;
  if (isSelected && isWrong) statusClass = styles.wrong;
  if (!isSelected && isCorrect && isLocked) statusClass = styles.correct; // Show correct answer if missed

  return (
    <motion.button
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`neumorph-btn ${styles.optionBtn} ${statusClass} ${isLocked ? styles.locked : ''}`}
      onClick={() => onSelect(option)}
      disabled={isLocked}
    >
      <div className={styles.optionContent}>
        <div className={`neumorph-inner ${styles.letterBadge}`}>
          {letters[index]}
        </div>
        <span className={styles.optionText}>{option}</span>
      </div>
      
      {statusClass === styles.correct && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.iconCorrect}>
          <FiCheck size={20} />
        </motion.div>
      )}
      
      {statusClass === styles.wrong && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={styles.iconWrong}>
          <FiX size={20} />
        </motion.div>
      )}
    </motion.button>
  );
};

export default OptionCard;
