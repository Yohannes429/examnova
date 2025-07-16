import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { ExamTypeCard } from "@/components/ExamTypeCard";
import { FeatureCard } from "@/components/FeatureCard";
import { StatsCard } from "@/components/StatsCard";
import { 
  GraduationCap, 
  Users, 
  Shield, 
  Clock, 
  BarChart3, 
  Smartphone,
  CheckCircle2,
  FileText,
  Target,
  Zap,
  Globe,
  Award,
  BookOpen,
  PenTool,
  MousePointer,
  ToggleLeft
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                🚀 Smart. Simple. Powerful.
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="text-accent animate-glow">ExamNova</span>
                <br />
                <span className="text-3xl lg:text-4xl font-medium">Your Gateway to Smarter Exams!</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-lg">
                The all-in-one online exam platform designed for teachers and students. 
                Create, manage, and track exams with real-time feedback and anti-cheat protection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="accent" className="text-lg px-8">
                  <Users className="mr-2" size={20} />
                  Start Teaching
                </Button>
                <Button size="lg" variant="hero" className="text-lg px-8">
                  <BookOpen className="mr-2" size={20} />
                  Take Exam
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  Mobile-friendly
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  Anti-cheat enabled
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  Instant results
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-3xl animate-glow"></div>
              <img 
                src={heroImage} 
                alt="ExamNova Platform" 
                className="relative rounded-2xl shadow-elevated w-full animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard 
              number="10K+" 
              label="Active Users" 
              description="Teachers & Students"
            />
            <StatsCard 
              number="50K+" 
              label="Exams Created" 
              description="Across all subjects"
            />
            <StatsCard 
              number="99.9%" 
              label="Uptime" 
              description="Reliable platform"
            />
            <StatsCard 
              number="4.9★" 
              label="User Rating" 
              description="Loved by educators"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✨ Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Everything You Need for Modern Education
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools for both teachers and students to create, manage, and excel in online examinations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Users}
              title="Multi-Role Support"
              description="Separate dashboards for teachers and students with role-specific features and permissions."
            />
            <FeatureCard
              icon={Shield}
              title="Anti-Cheat Protection"
              description="Advanced monitoring and security features to ensure exam integrity and prevent cheating."
            />
            <FeatureCard
              icon={Clock}
              title="Time Management"
              description="Set custom time limits, automatic submission, and real-time countdown timers."
            />
            <FeatureCard
              icon={BarChart3}
              title="Detailed Analytics"
              description="Comprehensive reports on student performance, question analysis, and progress tracking."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile Responsive"
              description="Take exams on any device - desktop, tablet, or smartphone with optimized experience."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Results"
              description="Automatic grading and immediate feedback for both teachers and students."
            />
          </div>
        </div>
      </section>

      {/* Exam Types Section */}
      <section id="exam-types" className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              📚 Exam Types
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Flexible Question Formats
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Support for multiple question types to create diverse and engaging assessments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExamTypeCard
              icon={MousePointer}
              title="Multiple Choice"
              description="Traditional MCQ format with single or multiple correct answers."
              features={[
                "Single/Multiple select",
                "Randomized options",
                "Partial scoring"
              ]}
              isPopular
            />
            <ExamTypeCard
              icon={ToggleLeft}
              title="True/False"
              description="Simple binary choice questions for quick assessments."
              features={[
                "Quick to answer",
                "Perfect for facts",
                "Easy grading"
              ]}
            />
            <ExamTypeCard
              icon={Target}
              title="Matching"
              description="Connect related items from two columns or groups."
              features={[
                "Drag & drop",
                "Visual connections",
                "Multi-pair matching"
              ]}
            />
            <ExamTypeCard
              icon={PenTool}
              title="Fill-in-the-Blanks"
              description="Test knowledge by completing sentences or phrases."
              features={[
                "Text input fields",
                "Multiple blanks",
                "Auto-complete hints"
              ]}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🔄 How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Simple Steps to Get Started
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a teacher or student, getting started with ExamNova is quick and easy.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Teachers */}
            <Card className="border-0 shadow-elevated bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">For Teachers</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Register & Setup</h4>
                      <p className="text-muted-foreground">Create your teacher account and set up your first class.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Create Exams</h4>
                      <p className="text-muted-foreground">Build custom exams with various question types and time limits.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Track Progress</h4>
                      <p className="text-muted-foreground">Monitor student performance and analyze detailed results.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* For Students */}
            <Card className="border-0 shadow-elevated bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-accent text-accent-foreground">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">For Students</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Join Platform</h4>
                      <p className="text-muted-foreground">Register and join your teacher's class with invite code.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Take Exams</h4>
                      <p className="text-muted-foreground">Access assigned exams and complete them within time limits.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Get Results</h4>
                      <p className="text-muted-foreground">Receive instant feedback and track your learning progress.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Exams?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of educators and students who are already using ExamNova to create better learning experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="accent" className="text-lg px-8">
              <Award className="mr-2" size={20} />
              Start Free Trial
            </Button>
            <Button size="lg" variant="hero" className="text-lg px-8 border-primary-foreground/30">
              <Globe className="mr-2" size={20} />
              View Demo
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-primary-foreground/60">
            🌍 Learn anywhere. Test anytime. 📲 Join ExamNova today!
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-accent">
                <GraduationCap size={20} className="text-accent-foreground" />
              </div>
              <span className="text-lg font-bold">
                Exam<span className="text-accent">Nova</span>
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <span>© 2024 ExamNova. All rights reserved.</span>
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
