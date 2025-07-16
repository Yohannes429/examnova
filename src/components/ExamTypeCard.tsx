import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ExamTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const ExamTypeCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  isPopular 
}: ExamTypeCardProps) => {
  return (
    <Card className="relative h-full bg-gradient-card border-0 shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:scale-105 group">
      {isPopular && (
        <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground animate-glow">
          Popular
        </Badge>
      )}
      
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Icon size={24} />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};