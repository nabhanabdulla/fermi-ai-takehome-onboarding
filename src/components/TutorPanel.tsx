import { motion } from "framer-motion";
import { CheckSquare, RotateCcw, Clock } from "lucide-react";

interface TutorPanelProps {
  problem: {
    text: string;
    latex: string;
  };
  time: number;
  onMarkDone: () => void;
  onSolveAgain: () => void;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const TutorPanel = ({ problem, time, onMarkDone, onSolveAgain }: TutorPanelProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="problem-card rounded-2xl px-6 py-5 mx-6 mt-4"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Problem content */}
        <div className="flex-1 min-w-0">
          <p className="text-base leading-relaxed text-foreground" style={{ fontFamily: "var(--font-sans)" }}>
            {problem.text}
          </p>
          <p className="mt-1 text-lg font-medium text-foreground" style={{ fontFamily: "var(--font-mono)" }}>
            {problem.latex}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onMarkDone}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            <CheckSquare size={16} />
            Mark as Done
          </button>
          <button
            onClick={onSolveAgain}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-sm font-medium text-primary hover:bg-accent transition-colors"
          >
            <RotateCcw size={16} />
            Solve Again
          </button>
        </div>
      </div>

      {/* Timer */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-muted-foreground text-sm">
        <Clock size={14} />
        <span style={{ fontFamily: "var(--font-mono)" }}>
          Time: {formatTime(time)}
        </span>
      </div>
    </motion.div>
  );
};

export default TutorPanel;
