import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = "neutral" 
}: StatsCardProps) {
  const changeColor = {
    positive: "text-success",
    negative: "text-error", 
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="bg-gradient-card shadow-card border-0 hover:shadow-medium transition-all duration-300">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-muted-foreground mb-1 truncate">
              {title}
            </p>
            <p className="text-2xl lg:text-3xl font-bold text-foreground">
              {value}
            </p>
            {change && (
              <p className={`text-xs lg:text-sm mt-1 ${changeColor} truncate`}>
                {change}
              </p>
            )}
          </div>
          <div className="bg-primary/10 p-2 lg:p-3 rounded-xl flex-shrink-0 ml-2">
            <Icon className="text-primary" size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}