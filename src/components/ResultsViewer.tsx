import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  Users, 
  TrendingUp, 
  Download, 
  Search, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface StudentResult {
  id: string;
  studentName: string;
  email: string;
  score: number;
  totalPoints: number;
  timeSpent: number;
  submittedAt: string;
  status: "completed" | "in-progress" | "not-started";
}

interface ExamResult {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  students: StudentResult[];
  averageScore: number;
  completionRate: number;
}

interface ResultsViewerProps {
  userRole: "teacher" | "student";
  studentResults?: StudentResult[];
  examResults?: ExamResult[];
}

const ResultsViewer = ({ userRole, studentResults = [], examResults = [] }: ResultsViewerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedExam, setSelectedExam] = useState<string>("");

  // Mock data for demonstration
  const mockExamResults: ExamResult[] = [
    {
      id: "1",
      title: "Mathematics Quiz",
      description: "Basic algebra and geometry",
      createdAt: "2024-01-15",
      averageScore: 85,
      completionRate: 94,
      students: [
        {
          id: "1",
          studentName: "Alice Johnson",
          email: "alice@example.com",
          score: 92,
          totalPoints: 100,
          timeSpent: 25,
          submittedAt: "2024-01-15T10:30:00Z",
          status: "completed"
        },
        {
          id: "2",
          studentName: "Bob Smith",
          email: "bob@example.com",
          score: 78,
          totalPoints: 100,
          timeSpent: 28,
          submittedAt: "2024-01-15T11:15:00Z",
          status: "completed"
        },
        {
          id: "3",
          studentName: "Carol Davis",
          email: "carol@example.com",
          score: 0,
          totalPoints: 100,
          timeSpent: 0,
          submittedAt: "",
          status: "not-started"
        }
      ]
    },
    {
      id: "2",
      title: "Science Test",
      description: "Physics and chemistry basics",
      createdAt: "2024-01-12",
      averageScore: 76,
      completionRate: 87,
      students: [
        {
          id: "4",
          studentName: "David Wilson",
          email: "david@example.com",
          score: 88,
          totalPoints: 100,
          timeSpent: 42,
          submittedAt: "2024-01-12T14:20:00Z",
          status: "completed"
        }
      ]
    }
  ];

  const mockStudentResults: StudentResult[] = [
    {
      id: "1",
      studentName: "John Doe",
      email: "john@example.com",
      score: 92,
      totalPoints: 100,
      timeSpent: 25,
      submittedAt: "2024-01-15T10:30:00Z",
      status: "completed"
    },
    {
      id: "2",
      studentName: "John Doe",
      email: "john@example.com",
      score: 78,
      totalPoints: 100,
      timeSpent: 28,
      submittedAt: "2024-01-12T14:20:00Z",
      status: "completed"
    }
  ];

  const displayExamResults = examResults.length > 0 ? examResults : mockExamResults;
  const displayStudentResults = studentResults.length > 0 ? studentResults : mockStudentResults;

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-warning" />;
      case "not-started":
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const filteredStudents = selectedExam 
    ? displayExamResults.find(exam => exam.id === selectedExam)?.students || []
    : [];

  const searchFilteredStudents = filteredStudents.filter(student => 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === "all" || student.status === filterStatus)
  );

  if (userRole === "student") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Exams Taken</p>
                  <p className="text-3xl font-bold text-primary">{displayStudentResults.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-success">
                    {Math.round(displayStudentResults.reduce((acc, result) => acc + result.score, 0) / displayStudentResults.length)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Best Score</p>
                  <p className="text-3xl font-bold text-accent">
                    {Math.max(...displayStudentResults.map(r => r.score))}%
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>My Exam Results</CardTitle>
            <CardDescription>View your performance across all exams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayStudentResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(result.status)}
                    <div>
                      <h4 className="font-medium">Exam #{index + 1}</h4>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(result.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {result.timeSpent} min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Exams</p>
                <p className="text-3xl font-bold text-primary">{displayExamResults.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-accent">
                  {displayExamResults.reduce((acc, exam) => acc + exam.students.length, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Score</p>
                <p className="text-3xl font-bold text-success">
                  {Math.round(displayExamResults.reduce((acc, exam) => acc + exam.averageScore, 0) / displayExamResults.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold text-warning">
                  {Math.round(displayExamResults.reduce((acc, exam) => acc + exam.completionRate, 0) / displayExamResults.length)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="exams">Exam Overview</TabsTrigger>
          <TabsTrigger value="students">Student Details</TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Exam Results</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Results
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayExamResults.map((exam) => (
              <Card key={exam.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                    <Badge variant="outline">
                      {exam.students.filter(s => s.status === "completed").length}/{exam.students.length} completed
                    </Badge>
                  </div>
                  <CardDescription>{exam.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className={`text-2xl font-bold ${getScoreColor(exam.averageScore)}`}>
                          {exam.averageScore}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Rate</p>
                        <p className="text-2xl font-bold">{exam.completionRate}%</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Created: {new Date(exam.createdAt).toLocaleDateString()}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedExam(exam.id)}
                    >
                      View Student Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Student Performance</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  {displayExamResults.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedExam ? (
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="space-y-0">
                  {searchFilteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(student.status)}
                        <div>
                          <h4 className="font-medium">{student.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className={`text-lg font-bold ${getScoreColor(student.score)}`}>
                            {student.score}%
                          </p>
                          <p className="text-xs text-muted-foreground">Score</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-lg font-bold">{student.timeSpent}</p>
                          <p className="text-xs text-muted-foreground">Minutes</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm">
                            {student.submittedAt 
                              ? new Date(student.submittedAt).toLocaleDateString()
                              : "Not submitted"
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">Submitted</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {searchFilteredStudents.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      No students found matching your criteria.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Select an exam to view student results.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsViewer;