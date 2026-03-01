import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";

interface OnboardingOverlayProps {
  step: number;
  setStep: (step: number) => void;
  questionRef: RefObject<HTMLDivElement>;
}

const OnboardingOverlay = ({ step, setStep, questionRef }: OnboardingOverlayProps) => {
  // if (step !== 1) return null;

  // Modular overlay function for a spotlighted overlay with custom text
  interface SpotlightOverlayProps {
    x: number;
    y: number;
    text: string;
    onConfirm?: () => void;
    confirmLabel?: string;
  }

  function SpotlightOverlay({
    x,
    y,
    text,
    onConfirm,
    confirmLabel = "Got it",
  }: SpotlightOverlayProps) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-start justify-end"
        style={{
          background: `radial-gradient(ellipse 500px 200px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.7) 100%)`,
        }}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl px-6 py-4 shadow-lg max-w-sm text-center"
          style={{ marginTop: `calc(${y}px + 120px)` }}
        >
          <p className="text-foreground text-sm mb-4">{text}</p>
          {onConfirm && (
            <Button size="sm" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </motion.div>
      </motion.div>
    );
  }

  if (step === 1) {
    // Get question card position for spotlight
    const rect = questionRef.current?.getBoundingClientRect();
    // const cx = rect ? rect.left : window.innerWidth / 2;
    const cx = 300;
    const cy = rect ? rect.top + rect.height / 2 : 100;

    return (
      <SpotlightOverlay
        x={cx}
        y={cy}
        text="Start by carefully reading the question."
        onConfirm={() => setStep(2)}
        confirmLabel="Got it"
      />
    );
  } else if (step === 2) {
    const rect = questionRef.current?.getBoundingClientRect();
    const cx = 300;
    // const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + 100 : 100;

    return (
      <SpotlightOverlay
        x={cx}
        y={cy}
        text="I've started solving, go ahead and complete the solution."
        onConfirm={() => {
          setStep(3)
          setTimeout(() => setStep(4), 2000);
          // setTimeout(() => setStep(44), 2000);
          // setTimeout(() => setStep(444), 4000);
          setTimeout(() => setStep(5), 4000);
          setTimeout(() => setStep(6), 6000);
          // setTimeout(() => setStep(7), 8000);
        }}
        confirmLabel="Sure"
      />
    );
  } else if (step === 5) {
    const rect = questionRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width : window.innerWidth / 2;
    const cy = rect ? rect.top + 100 : 100;

    return (
      <SpotlightOverlay
        x={cx}
        y={cy}
        text="Oh oh, there's an error. Tap the yellow dot to see feedback."
        confirmLabel="Ok"
      />
    )
  } else if (step === 9) {
    const rect = questionRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width/2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height/2 : 100;

    return (
      <SpotlightOverlay
        x={cx}
        y={cy}
        text="Try checking your work"
        confirmLabel="Ok"
      />
    )
  }
}

export default OnboardingOverlay;
