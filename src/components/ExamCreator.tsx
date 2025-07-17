import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  type: "mcq" | "true-false" | "matching" | "fill-blank";
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

interface ExamData {
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

const ExamCreator = () => {
  const { toast } = useToast();
  const [exam, setExam] = useState<ExamData>({
    title: "",
    description: "",
    duration: 30,
    questions: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "",
    type: "mcq",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 1
  });

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) return;
    
    const newQuestion = {
      ...currentQuestion,
      id: Date.now().toString()
    };
    
    setExam(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    
    setCurrentQuestion({
      id: "",
      type: "mcq",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 1
    });
    
    toast({
      title: "Question Added",
      description: "Question has been added to the exam."
    });
  };

  const removeQuestion = (id: string) => {
    setExam(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const saveExam = () => {
    if (!exam.title.trim() || exam.questions.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add a title and at least one question.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would save to Supabase
    toast({
      title: "Exam Saved",
      description: `"${exam.title}" has been saved successfully.`
    });
  };

  const renderQuestionEditor = () => {
    switch (currentQuestion.type) {
      case "mcq":
        return (
          <div className="space-y-4">
            <div>
              <Label>Options</Label>
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(currentQuestion.options || [])];
                      newOptions[index] = e.target.value;
                      setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                    }}
                  />
                </div>
              ))}
            </div>
            <div>
              <Label>Correct Answer</Label>
              <Select
                value={currentQuestion.correctAnswer as string}
                onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select correct option" />
                </SelectTrigger>
                <SelectContent>
                  {currentQuestion.options?.filter(option => option.trim() !== "").map((option, index) => (
                    <SelectItem key={index} value={option}>
                      Option {index + 1}: {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case "true-false":
        return (
          <div>
            <Label>Correct Answer</Label>
            <Select
              value={currentQuestion.correctAnswer as string}
              onValueChange={(value) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select correct answer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">True</SelectItem>
                <SelectItem value="false">False</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      
      case "fill-blank":
        return (
          <div>
            <Label>Correct Answer</Label>
            <Input
              placeholder="Enter the correct answer"
              value={currentQuestion.correctAnswer as string}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
            />
          </div>
        );
      
      case "matching":
        return (
          <div>
            <Label>Matching Pairs (format: "Left side|Right side" per line)</Label>
            <Textarea
              placeholder="Paris|France&#10;London|England&#10;Rome|Italy"
              value={Array.isArray(currentQuestion.correctAnswer) ? currentQuestion.correctAnswer.join('\n') : ''}
              onChange={(e) => setCurrentQuestion(prev => ({ 
                ...prev, 
                correctAnswer: e.target.value.split('\n').filter(line => line.trim())
              }))}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Exam Details */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
          <CardDescription>Basic information about your exam</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Exam Title</Label>
            <Input
              id="title"
              placeholder="Enter exam title"
              value={exam.title}
              onChange={(e) => setExam(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter exam description"
              value={exam.description}
              onChange={(e) => setExam(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={exam.duration}
                onChange={(e) => setExam(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={saveExam} className="bg-gradient-primary hover:shadow-glow">
                <Save className="h-4 w-4 mr-2" />
                Save Exam
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="add-question" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add-question">Add Questions</TabsTrigger>
          <TabsTrigger value="review">Review & Manage</TabsTrigger>
        </TabsList>

        <TabsContent value="add-question" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Add New Question</CardTitle>
              <CardDescription>Create questions for your exam</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Question Type</Label>
                  <Select
                    value={currentQuestion.type}
                    onValueChange={(value: Question["type"]) => setCurrentQuestion(prev => ({ 
                      ...prev, 
                      type: value,
                      options: value === "mcq" ? ["", "", "", ""] : undefined,
                      correctAnswer: ""
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="matching">Matching</SelectItem>
                      <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>
              
              <div>
                <Label>Question</Label>
                <Textarea
                  placeholder="Enter your question"
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                />
              </div>
              
              {renderQuestionEditor()}
              
              <Button onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Questions ({exam.questions.length})</h3>
              <p className="text-sm text-muted-foreground">
                Total Points: {exam.questions.reduce((sum, q) => sum + q.points, 0)}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {exam.duration} minutes
            </div>
          </div>
          
          <div className="space-y-4">
            {exam.questions.map((question, index) => (
              <Card key={question.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{question.type.toUpperCase()}</Badge>
                        <Badge variant="secondary">{question.points} pts</Badge>
                      </div>
                      <p className="font-medium">Q{index + 1}: {question.question}</p>
                      {question.options && (
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          {question.options.map((option, i) => (
                            <li key={i} className={option === question.correctAnswer ? "text-success font-medium" : ""}>
                              {String.fromCharCode(65 + i)}. {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeQuestion(question.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {exam.questions.length === 0 && (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No questions added yet. Switch to "Add Questions" tab to get started.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExamCreator;