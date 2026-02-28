import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";

interface OnboardingOverlayProps {
  step: number;
  setStep: (step: number) => void;
  questionRef: RefObject<HTMLDivElement>;
}

const OnboardingOverlay = ({ step, setStep, questionRef }: OnboardingOverlayProps) => {
  if (step !== 1) return null;

  // Get question card position for spotlight
  const rect = questionRef.current?.getBoundingClientRect();
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-start justify-center"
      style={{
        background: `radial-gradient(ellipse 500px 200px at ${cx}px ${cy}px, transparent 0%, rgba(0,0,0,0.7) 100%)`,
      }}
    >
      {/* Tooltip below question card */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-32 bg-card border border-border rounded-xl px-6 py-4 shadow-lg max-w-sm text-center"
      >
        <p className="text-foreground text-sm mb-4">
          Start by carefully reading the question.
        </p>
        <Button size="sm" onClick={() => setStep(2)}>
          Got it
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingOverlay;
