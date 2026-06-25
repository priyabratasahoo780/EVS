import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from '../components/QuestionCard';
import OptionCard from '../components/OptionCard';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import styles from './Quiz.module.css';

const Quiz = ({ quizState }) => {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedAnswer,
    timer,
    progress,
    isLocked,
    handleAnswerSelect
  } = quizState;

  if (!currentQuestion) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className={styles.quizContainer}
    >
      <div className={styles.topBar}>
        <Timer time={timer} />
      </div>

      <ProgressBar progress={progress} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard 
            question={currentQuestion} 
            index={currentIndex} 
            total={totalQuestions} 
          />

          <div className={styles.optionsGrid}>
            {currentQuestion.options.map((option, idx) => (
              <OptionCard
                key={idx}
                option={option}
                index={idx}
                isSelected={selectedAnswer === option}
                isCorrect={option === currentQuestion.answer}
                isWrong={selectedAnswer === option && option !== currentQuestion.answer}
                isLocked={isLocked}
                onSelect={handleAnswerSelect}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Quiz;
