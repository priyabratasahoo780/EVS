import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './ResultCard.module.css';

const ResultCard = ({ score, total, userAnswers, onRestart }) => {
  const [showReview, setShowReview] = useState(false);
  const percentage = Math.round((score / total) * 100);
  
  let grade = 'D';
  let message = 'Keep Practicing!';
  
  if (percentage >= 90) { grade = 'A+'; message = 'Excellent Work!'; }
  else if (percentage >= 80) { grade = 'A'; message = 'Great Job!'; }
  else if (percentage >= 60) { grade = 'B'; message = 'Good Job!'; }
  else if (percentage >= 40) { grade = 'C'; message = 'Not Bad!'; }

  useEffect(() => {
    if (percentage === 100) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      className={`neumorph ${styles.resultCard}`}
    >
      <h2 className={styles.title}>🎉 Quiz Completed</h2>
      
      <div className={styles.performanceCircle}>
        <div className={`neumorph-inner ${styles.circleInner}`}>
          <div className={styles.scoreText}>
            <span className={styles.percentage}>{percentage}%</span>
            <span className={styles.grade}>Grade: {grade}</span>
          </div>
        </div>
      </div>

      <h3 className={styles.message}>{message}</h3>

      <div className={styles.stats}>
        <div className={`neumorph-inner ${styles.statItem}`}>
          <span className={styles.statLabel}>Total</span>
          <span className={styles.statValue}>{total}</span>
        </div>
        <div className={`neumorph-inner ${styles.statItem} ${styles.correct}`}>
          <span className={styles.statLabel}>Correct</span>
          <span className={styles.statValue}>{score}</span>
        </div>
        <div className={`neumorph-inner ${styles.statItem} ${styles.wrong}`}>
          <span className={styles.statLabel}>Wrong</span>
          <span className={styles.statValue}>{total - score}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={`neumorph-btn ${styles.reviewBtn}`} 
          onClick={() => setShowReview(!showReview)}
          style={{ marginRight: '10px' }}
        >
          {showReview ? 'Hide Review' : 'Review Answers'}
        </button>
        <button className={`neumorph-btn ${styles.restartBtn}`} onClick={onRestart}>
          Restart Quiz
        </button>
      </div>

      {showReview && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={styles.reviewSection}
        >
          <h3 className={styles.reviewTitle}>Your Answers</h3>
          <div className={styles.reviewList}>
            {userAnswers && userAnswers.map((ans, idx) => (
              <div key={idx} className={`neumorph-inner ${styles.reviewItem} ${ans.isCorrect ? styles.reviewCorrect : styles.reviewWrong}`}>
                <p className={styles.reviewQuestion}><strong>Q{idx + 1}:</strong> {ans.question}</p>
                <p className={styles.reviewSelected}>
                  Your Answer: <span className={ans.isCorrect ? styles.textSuccess : styles.textError}>{ans.selected || 'No Answer (Time Out)'}</span>
                </p>
                {!ans.isCorrect && (
                  <p className={styles.reviewCorrectAns}>
                    Correct Answer: <span className={styles.textSuccess}>{ans.correct}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultCard;
