import React from 'react';
import ThemeToggle from './ThemeToggle';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <div className={`neumorph ${styles.logoIcon}`}>
          <span>Q</span>
        </div>
        <h1 className={styles.appName}>NeumorphQuiz</h1>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
