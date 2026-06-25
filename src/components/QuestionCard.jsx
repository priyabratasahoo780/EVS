import React from 'react';
import { motion } from 'framer-motion';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ question, index, total }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`neumorph ${styles.card}`}
    >
      <div className={styles.header}>
        <span className={styles.questionNumber}>Question {index + 1} / {total}</span>
        <div className={styles.badges}>
          <span className={`neumorph-inner ${styles.badge}`}>{question.category}</span>
          <span className={`neumorph-inner ${styles.badge} ${styles[question.difficulty.toLowerCase()]}`}>
            {question.difficulty}
          </span>
        </div>
      </div>
      <h2 className={styles.questionText}>{question.question}</h2>
    </motion.div>
  );
};

export default QuestionCard;
