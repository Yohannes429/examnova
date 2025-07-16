interface StatsCardProps {
  number: string;
  label: string;
  description: string;
}

export const StatsCard = ({ number, label, description }: StatsCardProps) => {
  return (
    <div className="text-center group">
      <div className="text-4xl md:text-5xl font-bold text-accent mb-2 animate-slide-up">
        {number}
      </div>
      <div className="text-lg font-semibold text-foreground mb-1">{label}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
};