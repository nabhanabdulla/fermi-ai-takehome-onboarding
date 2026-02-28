import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface QuestionCardProps {
  problem: {
    text: string;
    latex: string;
  };
  time: number;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const QuestionCard = ({ problem, time }: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="shadow-sm">
        <CardContent className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-relaxed text-foreground">
                {problem.text}
              </p>
              <p className="mt-1 text-base font-medium text-foreground font-mono">
                {problem.latex}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono shrink-0">
              <Clock size={12} />
              <span>Time: {formatTime(time)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
