import { useState, useEffect, useMemo, useCallback } from 'react';
import { questions as defaultQuestions } from '../data/questions';

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const [currentCategory, setCurrentCategory] = useState('All');

  // Initialize quiz with randomized questions
  const initializeQuiz = useCallback((category = 'All') => {
    let filteredQuestions = [...defaultQuestions];
    if (category !== 'All') {
      filteredQuestions = filteredQuestions.filter(q => q.category === category);
    }
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentCategory(category);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setTimer(60);
    setIsCompleted(false);
    setSelectedAnswer(null);
    setIsLocked(false);
    setUserAnswers([]);
  }, []);

  useEffect(() => {
    initializeQuiz();
  }, [initializeQuiz]);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  const progress = useMemo(() => {
    if (questions.length === 0) return 0;
    return ((currentIndex) / questions.length) * 100;
  }, [currentIndex, questions.length]);

  // Timer logic
  useEffect(() => {
    if (isCompleted || isLocked || !currentQuestion) return;

    if (timer === 0) {
      handleTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isCompleted, isLocked, currentQuestion]);

  const handleTimeOut = useCallback(() => {
    setIsLocked(true);
    setWrongCount((prev) => prev + 1);
    
    setUserAnswers((prev) => [...prev, {
      question: currentQuestion.question,
      selected: null,
      correct: currentQuestion.answer,
      isCorrect: false
    }]);
    
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  }, [currentIndex, questions.length]);

  const handleAnswerSelect = useCallback((answer) => {
    if (isLocked) return;

    setSelectedAnswer(answer);
    setIsLocked(true);

    let isAnswerCorrect = false;

    if (answer === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      isAnswerCorrect = true;
    } else {
      setWrongCount((prev) => prev + 1);
    }

    setUserAnswers((prev) => [...prev, {
      question: currentQuestion.question,
      selected: answer,
      correct: currentQuestion.answer,
      isCorrect: isAnswerCorrect
    }]);

    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  }, [isLocked, currentQuestion]);

  const moveToNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsLocked(false);
      setTimer(60);
    } else {
      setIsCompleted(true);
    }
  }, [currentIndex, questions.length]);

  const restartQuiz = useCallback((category) => {
    initializeQuiz(category !== undefined ? category : currentCategory);
  }, [initializeQuiz, currentCategory]);

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    score,
    wrongCount,
    timer,
    progress,
    isCompleted,
    isLocked,
    currentCategory,
    userAnswers,
    handleAnswerSelect,
    restartQuiz
  };
};
