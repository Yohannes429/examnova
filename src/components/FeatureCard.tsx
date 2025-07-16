import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient = false 
}: FeatureCardProps) => {
  return (
    <Card className={`border-0 shadow-soft hover:shadow-elevated transition-all duration-300 transform hover:scale-105 ${
      gradient ? 'bg-gradient-card' : 'bg-card'
    }`}>
      <CardContent className="p-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icon size={32} className="text-primary" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};