import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  Clock, 
  BarChart3,
  Settings,
  LogOut,
  Play
} from "lucide-react";
import ExamTaker from "@/components/ExamTaker";
import ResultsViewer from "@/components/ResultsViewer";

const StudentDashboard = () => {
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [examResult, setExamResult] = useState<{score: number, answers: Record<string, string>} | null>(null);

  // Mock exam data - filtered by teacher username
  const teacherUsername = "dr_smith"; // This would come from student's registration
  
  const mockExam = {
    id: "1",
    title: "Mathematics Quiz",
    description: "Basic algebra and geometry questions",
    duration: 30,
    teacherUsername: "dr_smith",
    questions: [
      {
        id: "q1",
        type: "mcq" as const,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        points: 1
      },
      {
        id: "q2", 
        type: "true-false" as const,
        question: "The square root of 16 is 4.",
        points: 1
      },
      {
        id: "q3",
        type: "fill-blank" as const,
        question: "The area of a circle with radius 5 is ___π.",
        points: 2
      }
    ]
  };

  // Filter exams by teacher username
  const availableExams = [
    { ...mockExam, teacher: "Dr. Smith", deadline: "Today, 5:00 PM" },
    { 
      id: "2",
      title: "Science Test", 
      teacher: "Dr. Smith", 
      teacherUsername: "dr_smith",
      duration: 45, 
      deadline: "Tomorrow, 2:00 PM",
      description: "Physics and chemistry basics",
      questions: []
    }
  ].filter(exam => exam.teacherUsername === teacherUsername);

  const handleExamComplete = (answers: Record<string, string>, score: number) => {
    setExamResult({ answers, score });
    setSelectedExam(null);
    setShowResults(true);
  };

  if (selectedExam) {
    return <ExamTaker exam={selectedExam} onComplete={handleExamComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, Student!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.href = "/"}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold text-primary">8</p>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <p className="text-3xl font-bold text-accent">3</p>
                  </div>
                  <Clock className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                    <p className="text-3xl font-bold text-success">92%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rank</p>
                    <p className="text-3xl font-bold text-warning">#5</p>
                  </div>
                  <Trophy className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="exams" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-[300px]">
              <TabsTrigger value="exams">Available Exams</TabsTrigger>
              <TabsTrigger value="results">My Results</TabsTrigger>
            </TabsList>

            <TabsContent value="exams" className="space-y-6">
              <h2 className="text-2xl font-bold">Available Exams</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableExams.map((exam, index) => (
                  <Card key={index} className="shadow-card hover:shadow-large transition-all cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{exam.title}</CardTitle>
                      <CardDescription>
                        By {exam.teacher} • {exam.duration} min
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Due: {exam.deadline}
                        </div>
                        <Button 
                          className="w-full bg-gradient-primary hover:shadow-glow"
                          onClick={() => setSelectedExam(exam.id === "1" ? mockExam : exam)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Exam
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results">
              <ResultsViewer userRole="student" />
            </TabsContent>
          </Tabs>

          {examResult && showResults && (
            <Card className="shadow-card border-success">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Trophy className="h-5 w-5" />
                  Exam Completed!
                </CardTitle>
                <CardDescription>Your results are ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-success">{examResult.score}%</div>
                  <p className="text-muted-foreground">
                    Great job! You can view detailed results in the "My Results" tab.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowResults(false)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;