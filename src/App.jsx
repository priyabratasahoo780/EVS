import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import ResultCard from './components/ResultCard';
import { useQuiz } from './hooks/useQuiz';
import { questions as allQuestions } from './data/questions';

const categories = ['All', ...new Set(allQuestions.map(q => q.category))];

function App() {
  const [appState, setAppState] = useState('home'); // home, quiz, result
  const quizState = useQuiz();

  const handleStart = (category) => {
    quizState.restartQuiz(category);
    setAppState('quiz');
  };

  const handleRestart = () => {
    quizState.restartQuiz();
    setAppState('home');
  };

  // Check if quiz is completed to move to result state
  React.useEffect(() => {
    if (quizState.isCompleted && appState === 'quiz') {
      setAppState('result');
    }
  }, [quizState.isCompleted, appState]);

  return (
    <div className="container">
      <Navbar />
      
      <main className="flex-center" style={{ flex: 1 }}>
        {appState === 'home' && (
          <Home 
            onStart={handleStart} 
            totalQuestions={quizState.totalQuestions} 
            categories={categories}
            allQuestionsCount={allQuestions.length}
          />
        )}
        
        {appState === 'quiz' && (
          <Quiz quizState={quizState} />
        )}
        
        {appState === 'result' && (
          <ResultCard 
            score={quizState.score}
            total={quizState.totalQuestions}
            userAnswers={quizState.userAnswers}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;
