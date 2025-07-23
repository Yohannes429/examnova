import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Plus, 
  Users, 
  Trophy, 
  Clock, 
  FileText, 
  BarChart3,
  Settings,
  LogOut,
  Play,
  PenTool,
  Search
} from "lucide-react";
import ExamCreator from "@/components/ExamCreator";
import ResultsViewer from "@/components/ResultsViewer";
import { useAuth } from "@/hooks/useAuth";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

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
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name || 'Teacher'}!
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
                    <p className="text-sm font-medium text-muted-foreground">Total Exams</p>
                    <p className="text-3xl font-bold text-primary">12</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Students</p>
                    <p className="text-3xl font-bold text-accent">156</p>
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
                    <p className="text-3xl font-bold text-success">85%</p>
                  </div>
                  <Trophy className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Exams</p>
                    <p className="text-3xl font-bold text-warning">3</p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="create">Create Exam</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Exams</h2>
                <Button 
                  onClick={() => setActiveTab("create")}
                  className="bg-gradient-primary hover:shadow-glow"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Exam
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Mathematics Quiz", type: "MCQ", students: 45, status: "Active" },
                  { title: "Science Test", type: "Mixed", students: 32, status: "Draft" },
                  { title: "History Assessment", type: "True/False", students: 28, status: "Completed" },
                ].map((exam, index) => (
                  <Card key={index} className="shadow-card hover:shadow-large transition-all cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{exam.title}</CardTitle>
                        <Badge variant={exam.status === "Active" ? "default" : exam.status === "Draft" ? "secondary" : "outline"}>
                          {exam.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {exam.type} • {exam.students} students
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setActiveTab("results")}>
                          <Play className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setActiveTab("create")}>
                          <PenTool className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create">
              <ExamCreator />
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <ResultsViewer userRole="teacher" currentUser={user} />
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Analytics Dashboard
                  </CardTitle>
                  <CardDescription>Performance insights and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics data will be loaded from Supabase.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;