import { motion } from "framer-motion";
import { Clock, BookOpen, Lightbulb, MessageCircle } from "lucide-react";

interface TutorPanelProps {
  time: number;
  step: number;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const hints = [
  { icon: Lightbulb, text: "Notice that a + b + c = 0. This is a key identity." },
  { icon: MessageCircle, text: "Try factoring the expression using symmetric sums." },
  { icon: BookOpen, text: "Recall: if a+b+c=0, then a³+b³+c³ = 3abc." },
];

const TutorPanel = ({ time, step }: TutorPanelProps) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-[360px] h-full bg-card border-r border-border flex flex-col shrink-0"
    >
      {/* Avatar & Timer header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <BookOpen size={18} className="text-accent-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Math Tutor</p>
            <p className="text-xs text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
          <Clock size={14} />
          <span>Time: {formatTime(time)}</span>
        </div>
      </div>

      {/* Hints section */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Hints & Guidance
        </p>
        <div className="space-y-3">
          {hints.map((hint, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex gap-3 p-3 rounded-xl bg-secondary/50"
            >
              <hint.icon size={16} className="text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed">{hint.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-5 py-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
          <MessageCircle size={16} />
          Ask for Help
        </button>
      </div>
    </motion.aside>
  );
};

export default TutorPanel;
