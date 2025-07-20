import { useState, useEffect } from 'react';

interface ExamResult {
  id: string;
  studentName: string;
  studentUsername: string;
  examTitle: string;
  score: number;
  completedAt: string;
  answers: Record<string, string>;
  teacherUsername: string;
}

export const useExamResults = (userRole: 'teacher' | 'student', currentUser?: any) => {
  const [results, setResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    
    if (userRole === 'teacher' && currentUser) {
      // Filter results to show only exams created by this teacher
      const teacherResults = storedResults.filter((result: ExamResult) => 
        result.teacherUsername === currentUser.username
      );
      setResults(teacherResults);
    } else if (userRole === 'student' && currentUser) {
      // Filter results to show only this student's results
      const studentResults = storedResults.filter((result: ExamResult) => 
        result.studentUsername === currentUser.username
      );
      setResults(studentResults);
    }
  }, [userRole, currentUser]);

  const addResult = (result: Omit<ExamResult, 'id' | 'completedAt'>) => {
    const newResult: ExamResult = {
      ...result,
      id: Date.now().toString(),
      completedAt: new Date().toISOString()
    };
    
    const storedResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    const updatedResults = [...storedResults, newResult];
    localStorage.setItem('examResults', JSON.stringify(updatedResults));
    setResults(prev => [...prev, newResult]);
  };

  return { results, addResult };
};