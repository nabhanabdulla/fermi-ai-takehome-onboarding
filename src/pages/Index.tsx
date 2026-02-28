import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import CanvasBoard from "@/components/CanvasBoard";
import TutorPanel from "@/components/TutorPanel";
import QuestionCard from "@/components/QuestionCard";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import { Button } from "@/components/ui/button";
import { CheckSquare, RotateCcw } from "lucide-react";

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

const Index = () => {
  const [step, setStep] = useState(1);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [problemIndex, setProblemIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Measure canvas container
  useEffect(() => {
    const measure = () => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        setCanvasSize({ width: rect.width, height: rect.height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [showOnboarding]);

  // Timer
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
    setStep((s) => Math.min(s + 1, 3));
    setTimeout(() => setIsRunning(true), 100);
  };

  const handleSolveAgain = () => {
    setTime(0);
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-background">
      {/* Left: Tutor Panel (fixed 360px) */}
      <TutorPanel time={time} step={step} />

      {/* Center + Right: Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar: Question card center + Mark as Done right */}
        <header className="flex items-start gap-4 px-5 pt-4 pb-2 z-10">
          <div className="flex-1 min-w-0">
            <QuestionCard problem={problems[problemIndex]} time={time} />
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <Button variant="outline" size="sm" onClick={handleMarkDone}>
              <CheckSquare size={16} className="mr-1.5" />
              Mark as Done
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSolveAgain}>
              <RotateCcw size={16} className="mr-1.5" />
              Solve Again
            </Button>
          </div>
        </header>

        {/* Canvas area */}
        <div ref={canvasContainerRef} className="flex-1 relative">
          <CanvasBoard width={canvasSize.width} height={canvasSize.height} />
        </div>
      </div>

      {/* Onboarding overlay */}
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
