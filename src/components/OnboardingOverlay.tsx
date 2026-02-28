import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Brain, Timer, ArrowRight } from "lucide-react";

interface OnboardingOverlayProps {
  step: number;
  onNext: () => void;
  onSkip: () => void;
}

const steps = [
  {
    icon: Brain,
    title: "Welcome to MathBoard",
    description: "An interactive space to practice math problems with a beautiful canvas for your solutions.",
    color: "text-primary",
  },
  {
    icon: Pencil,
    title: "Draw Your Solution",
    description: "Use the pen tool to write and sketch your work. Switch to eraser to correct mistakes.",
    color: "text-primary",
  },
  {
    icon: Timer,
    title: "Track Your Progress",
    description: "A timer runs while you work. Mark problems as done or try them again to improve.",
    color: "text-primary",
  },
];

const OnboardingOverlay = ({ step, onNext, onSkip }: OnboardingOverlayProps) => {
  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "hsl(220 15% 15% / 0.6)", backdropFilter: "blur(8px)" }}
      >
        <motion.div
          key={step}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="problem-card rounded-3xl p-10 max-w-md w-full mx-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 400 }}
            className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-6"
          >
            <current.icon size={28} className={current.color} />
          </motion.div>

          <h2 className="text-2xl font-bold text-foreground mb-3">{current.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{current.description}</p>

          {/* Step dots */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? "w-8 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={onSkip}
              className="px-5 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              Skip
            </button>
            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center gap-2"
            >
              {isLast ? "Get Started" : "Next"}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingOverlay;
