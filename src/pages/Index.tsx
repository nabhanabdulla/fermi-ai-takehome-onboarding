import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import CanvasBoard from "@/components/CanvasBoard";
import TutorPanel from "@/components/TutorPanel";
import OnboardingOverlay from "@/components/OnboardingOverlay";

const problems = [
  {
    text: "If a = 2012, b = −1005, c = −1007, then the value of",
    latex: "a⁴/(b+c) + b⁴/(c+a) + c⁴/(a+b) + 3abc is",
  },
  {
    text: "Find the sum of all positive integers n such that",
    latex: "n² + 12n − 2007 is a perfect square",
  },
  {
    text: "If x + y = 5 and xy = 3, find the value of",
    latex: "x³ + y³",
  },
];

const useWindowSize = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handle = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return size;
};

const Index = () => {
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [problemIndex, setProblemIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const finishOnboarding = useCallback(() => {
    setShowOnboarding(false);
    setIsRunning(true);
  }, []);

  const handleNext = () => {
    if (onboardingStep >= 2) {
      finishOnboarding();
    } else {
      setOnboardingStep((s) => s + 1);
    }
  };

  const handleMarkDone = () => {
    setIsRunning(false);
    setProblemIndex((i) => (i + 1) % problems.length);
    setTime(0);
    setTimeout(() => setIsRunning(true), 100);
  };

  const handleSolveAgain = () => {
    setTime(0);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Top bar with timer */}
      <header className="relative z-10">
        <TutorPanel
          problem={problems[problemIndex]}
          time={time}
          onMarkDone={handleMarkDone}
          onSolveAgain={handleSolveAgain}
        />
      </header>

      {/* Canvas area */}
      <main className="flex-1 relative">
        <CanvasBoard width={width} height={height - 120} />
      </main>

      {/* Onboarding */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingOverlay
            step={onboardingStep}
            onNext={handleNext}
            onSkip={finishOnboarding}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
