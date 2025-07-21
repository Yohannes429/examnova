import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";

const SafeLink = ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: any }) => {
  const handleClick = () => {
    window.location.href = to;
  };

  return (
    <span onClick={handleClick} style={{ cursor: 'pointer' }} {...props}>
      {children}
    </span>
  );
};

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <GraduationCap size={24} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Exam<span className="text-accent">Nova</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-foreground hover:text-accent transition-colors">
            Features
          </a>
          <a href="#exam-types" className="text-foreground hover:text-accent transition-colors">
            Exam Types
          </a>
          <a href="#how-it-works" className="text-foreground hover:text-accent transition-colors">
            How It Works
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:flex" asChild>
            <SafeLink to="/auth">Sign In</SafeLink>
          </Button>
          <Button variant="accent" asChild>
            <SafeLink to="/auth">Get Started</SafeLink>
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};