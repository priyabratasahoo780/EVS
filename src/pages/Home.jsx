import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.css';

const Home = ({ onStart, totalQuestions, categories, allQuestionsCount }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={styles.homeContainer}
    >
      <div className={`neumorph ${styles.heroCard}`}>
        <div className={styles.heroImage}>
          {/* A simple placeholder or illustration could go here */}
          <div className={`neumorph-inner ${styles.iconPlaceholder}`}>
            📚
          </div>
        </div>
        
        <h2 className={styles.title}>Test Your Knowledge</h2>
        <p className={styles.subtitle}>
          Challenge yourself with our interactive quiz. 
          {allQuestionsCount} questions waiting for you!
        </p>

        <div className={styles.categorySelectWrapper}>
          <label className={styles.categoryLabel}>Select Chapter:</label>
          <select 
            className={`neumorph-inner ${styles.categorySelect}`}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.details}>
          <div className={styles.detailBadge}>
            <span className={styles.label}>Questions</span>
            <span className={styles.value}>{totalQuestions}</span>
          </div>
          <div className={styles.detailBadge}>
            <span className={styles.label}>Difficulty</span>
            <span className={styles.value}>Mixed</span>
          </div>
        </div>

        <button 
          className={`neumorph-btn ${styles.startBtn}`}
          onClick={() => onStart(selectedCategory)}
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
