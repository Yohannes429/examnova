import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Question {
  id: string;
  type: "mcq" | "true-false" | "matching" | "fill-blank";
  question: string;
  options?: string[];
  points: number;
}

interface ExamData {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

interface ExamTakerProps {
  exam: ExamData;
  onComplete: (answers: Record<string, string>, score: number, status: 'completed' | 'disqualified') => void;
}

const ExamTaker = ({ exam, onComplete }: ExamTakerProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(exam?.duration ? exam.duration * 60 : 0); // Convert to seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [examStatus, setExamStatus] = useState<'completed' | 'disqualified'>('completed');

  // Safety checks
  if (!exam || !exam.questions || exam.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="shadow-card max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No exam data available</p>
            <Button onClick={() => window.location.href = "/student-dashboard"} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  // Anti-cheat: Fullscreen monitoring
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement;
      setIsFullscreen(!!fullscreenElement);
      
      if (!fullscreenElement && !isSubmitted && isFullscreen) {
        setShowExitWarning(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isSubmitted, isFullscreen]);

  // Anti-cheat: Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isSubmitted && isFullscreen) {
        setShowExitWarning(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isSubmitted, isFullscreen]);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      toast({
        title: "Exam Started",
        description: "Good luck! Remember to stay in fullscreen mode."
      });
    } catch (error) {
      toast({
        title: "Fullscreen Required",
        description: "Please enable fullscreen mode to start the exam.",
        variant: "destructive"
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    // This would calculate against correct answers in a real app
    // For demo, we'll simulate a score
    const totalQuestions = exam.questions.length;
    const answeredQuestions = Object.keys(answers).length;
    return Math.floor((answeredQuestions / totalQuestions) * 85); // Simulated score
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setIsSubmitted(true);
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    
    onComplete(answers, score, examStatus);
    
    toast({
      title: examStatus === 'disqualified' ? "Exam Disqualified" : "Exam Submitted",
      description: examStatus === 'disqualified' 
        ? "You exited the exam and have been disqualified." 
        : `Your score: ${score}%`,
      variant: examStatus === 'disqualified' ? "destructive" : "default"
    });
  };

  const handleConfirmExit = () => {
    setExamStatus('disqualified');
    setShowExitWarning(false);
    handleSubmit();
  };

  const handleCancelExit = async () => {
    setShowExitWarning(false);
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } catch (error) {
      console.error('Failed to re-enter fullscreen:', error);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "mcq":
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "true-false":
        return (
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true" className="cursor-pointer">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false" className="cursor-pointer">False</Label>
            </div>
          </RadioGroup>
        );
      
      case "fill-blank":
        return (
          <Input
            placeholder="Enter your answer"
            value={answers[currentQuestion.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full"
          />
        );
      
      case "matching":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Enter matching pairs separated by commas (e.g., "Paris-France, London-England")
            </p>
            <Input
              placeholder="Enter your matches"
              value={answers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  if (!isFullscreen) {
    return (
      <Card className="shadow-card max-w-md mx-auto">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
          <CardTitle>{exam.title}</CardTitle>
          <CardDescription>{exam.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Duration: {exam.duration} minutes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Questions: {exam.questions.length}
            </div>
          </div>
          
          <div className="bg-warning/10 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-warning">Anti-Cheat Protection</h4>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Fullscreen mode required</li>
                  <li>• Tab switching monitored</li>
                  <li>• Time limits enforced</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={enterFullscreen}
            className="w-full bg-gradient-primary hover:shadow-glow"
          >
            Start Exam
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-card/50 backdrop-blur-sm p-4 rounded-lg border">
        <div>
          <h1 className="text-xl font-bold">{exam.title}</h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {exam.questions.length}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {warningCount > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {warningCount} Warning{warningCount > 1 ? 's' : ''}
            </Badge>
          )}
          
          <div className="flex items-center gap-2 text-lg font-mono">
            <Clock className="h-5 w-5" />
            <span className={timeLeft < 300 ? "text-destructive" : ""}>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          {Math.round(progress)}% Complete
        </p>
      </div>

      {/* Question */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline">{currentQuestion.type.toUpperCase()}</Badge>
            <Badge variant="secondary">{currentQuestion.points} point{currentQuestion.points > 1 ? 's' : ''}</Badge>
          </div>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent>
          {renderQuestion()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {exam.questions.map((_, index) => (
            <Button
              key={index}
              variant={index === currentQuestionIndex ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 p-0 ${answers[exam.questions[index].id] ? "bg-success/20 border-success" : ""}`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        
        {currentQuestionIndex === exam.questions.length - 1 ? (
          <Button
            onClick={handleSubmit}
            className="bg-gradient-primary hover:shadow-glow"
          >
            Submit Exam
          </Button>
        ) : (
          <Button onClick={nextQuestion}>
            Next
          </Button>
        )}
      </div>

      {/* Exit Warning Dialog */}
      <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Anti-Cheat Warning
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>You have exited fullscreen mode or switched tabs during the exam.</p>
              <p className="font-semibold text-foreground">If you leave the exam, it will be marked as disqualified.</p>
              <p>Do you want to continue with the exam or exit and be disqualified?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelExit}>
              Continue Exam
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmExit} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Exit & Disqualify
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamTaker;