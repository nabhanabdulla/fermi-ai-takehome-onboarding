import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import CanvasBoard from "@/components/CanvasBoard";
import TutorPanel from "@/components/TutorPanel";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import ErrorCard from "@/components/ErrorCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [step, setStep] = useState(1);
  const [corrected, setCorrected] = useState(false);
  const { toast } = useToast();
  const questionRef = useRef<HTMLDivElement>(null);

  const handleErrorClick = () => {
    setStep(4);
  };

  const handleShowHint = () => {
    setCorrected(true);
    setStep(5);
  };

  const handleIgnore = () => {
    setStep(3);
  };

  // Step 5 → show toast & advance to 6
  useEffect(() => {
    if (step === 5 && corrected) {
      toast({ title: "Corrected ✔", duration: 2000 });
      const timer = setTimeout(() => setStep(6), 800);
      return () => clearTimeout(timer);
    }
  }, [step, corrected, toast]);

  const handleMarkDone = () => {
    console.log("Marked as done");
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Question card - top center */}
      <div className="flex justify-center pt-4 px-4 relative z-20" ref={questionRef}>
        <Card className="max-w-2xl w-full">
          <CardContent className="py-4 px-6">
            <p className="text-sm text-muted-foreground mb-1">Question</p>
            <p className="text-base leading-relaxed text-foreground">
              If <span className="font-mono font-medium">a = 2012</span>,{" "}
              <span className="font-mono font-medium">b = −1005</span>,{" "}
              <span className="font-mono font-medium">c = −1007</span>, then find the value of
            </p>
            <p className="mt-2 text-lg font-medium text-foreground font-mono">
              a⁴/(b+c) + b⁴/(c+a) + c⁴/(a+b) + 3abc
            </p>
          </CardContent>
        </Card>

        {/* Mark as Done button - top right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <Button variant="outline" onClick={handleMarkDone} className="gap-2">
            <CheckSquare size={16} />
            Mark as Done
          </Button>
        </div>
      </div>

      {/* Main content area: grid */}
      <div className="flex-1 grid grid-cols-[360px_1fr] overflow-hidden relative">
        {/* Tutor Panel */}
        <TutorPanel step={step} setStep={setStep} />

        {/* Canvas area */}
        <div className="relative overflow-hidden">
          <CanvasBoard
            step={step}
            onErrorClick={handleErrorClick}
            corrected={corrected}
          />

          {/* Error Card overlay at step 4 */}
          <AnimatePresence>
            {step === 4 && (
              <ErrorCard onIgnore={handleIgnore} onShowHint={handleShowHint} />
            )}
          </AnimatePresence>

          {/* Start Real Practice button at step 7+ */}
          {step >= 7 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
              <Button
                size="lg"
                className="text-base px-8 py-6"
                onClick={() => console.log("Onboarding complete")}
              >
                Start Real Practice
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Onboarding overlays */}
      <AnimatePresence>
        {step === 1 && (
          <OnboardingOverlay
            step={step}
            setStep={setStep}
            questionRef={questionRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
