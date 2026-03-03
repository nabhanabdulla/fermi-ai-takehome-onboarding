import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CanvasBoard from "@/components/CanvasBoard";
import TutorPanel from "@/components/TutorPanel";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import ErrorCard from "@/components/ErrorCard";
import SuccessPanel from "@/components/SuccessPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Draggable from 'react-draggable';
import confetti from "canvas-confetti";

const Index = () => {
  const [step, setStep] = useState(1);
  const [corrected, setCorrected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [doneGlow, setDoneGlow] = useState(false);
  const { toast } = useToast();
  const questionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const tutorPanelRef = useRef(null);

  const handleErrorClick = () => {
    setStep(6);
  };

  const handleShowHint = () => {
    // setCorrected(true);
    // setStep(8);
    setStep(7);
    setCorrected(true);
    setTimeout(() => setStep(9), 4000)
  };

  const handleIgnore = () => {
    setStep(7);
    setCorrected(true);
    setTimeout(() => setStep(9), 4000)
  };

  // Step 5 → show toast & advance to 6
  // useEffect(() => {
  //   if (step === 9 && corrected) {
  //     toast({ title: "Corrected ✔", duration: 2000 });
  //     const timer = setTimeout(() => setStep(6), 800);
  //     return () => clearTimeout(timer);
  //   }
  // }, [step, corrected, toast]);

  useEffect(() => {
    if (step == 12) {
      handleMarkDone()
    }
  }, [step])

  const handleMarkDone = () => {
    // 0.2s — button glow
    setDoneGlow(true);

    // 0.5s — confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.3 },
        colors: ["#f97316", "#22c55e", "#3b82f6", "#eab308", "#ec4899"],
      });
    }, 500);

    // 1.2s — success panel slides up
    setTimeout(() => {
      setShowSuccess(true);
    }, 1200);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Question card - top center */}
      <div className="pt-4 px-4 relative z-20" ref={questionRef}>
        {/* Top row: Mark as Done on the right */}
        <div className="flex justify-end mx-auto mb-3">
          <Button
            variant="outline"
            onClick={handleMarkDone}
            className={`gap-2 transition-all duration-300 ${doneGlow
              ? "ring-2 ring-green-500 ring-offset-2 bg-green-50 border-green-300 text-green-700"
              : ""
              }`}
          >
            <CheckSquare size={16} />
            Mark as Done
          </Button>
        </div>

        {/* Question card: left-aligned text, below the button */}
        <Card className="mx-auto w-full">
          <CardContent className="py-4 px-6">
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
      </div>

      {/* Main content area: grid */}
      <div className="flex-1  overflow-hidden relative">
        {/* Tutor Panel */}
        {step >= 8 && (
          <Draggable nodeRef={tutorPanelRef} handle=".drag-handle">
            <div ref={tutorPanelRef} className="fixed top-[250px] right-0 z-[50] w-[400px]">
              <TutorPanel step={step} setStep={setStep} />
            </div>
          </Draggable>
        )}

        {/* Canvas area */}
        <div className="relative overflow-hidden" ref={canvasRef}>
          <CanvasBoard
            step={step}
            setStep={setStep}
            onErrorClick={handleErrorClick}
            corrected={corrected}
          />

          {/* Error Card overlay at step 4 */}
          <AnimatePresence>
            {step === 6 && (
              <ErrorCard onIgnore={handleIgnore} onShowHint={handleShowHint} />
            )}
          </AnimatePresence>

          {/* Start Real Practice button at step 7+ */}
          {/* {step >= 10 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
              <Button
                size="lg"
                className="text-base px-8 py-6"
                onClick={() => console.log("Onboarding complete")}
              >
                Start Real Practice
              </Button>
            </div>
          )} */}
        </div>
      </div>

      {/* Success panel */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessPanel
            onLevelUp={() => console.log("Level up")}
            onTryTwist={() => console.log("Try twist")}
          />
        )}
      </AnimatePresence>

      {/* Onboarding overlays */}
      <AnimatePresence>
        {step === 1 && (
          <OnboardingOverlay
            step={step}
            setStep={setStep}
            questionRef={questionRef}
          />
        )}
        {step === 2 && (
          <OnboardingOverlay
            step={step}
            setStep={setStep}
            questionRef={canvasRef}
          />
        )}
        {step === 5 && (
          <OnboardingOverlay
            step={step}
            setStep={setStep}
            questionRef={canvasRef}
          />
        )}
        {/*{step === 9 && (
          <OnboardingOverlay
            step={step}
            setStep={setStep}
            questionRef={tutorPanelRef}
          />
        )}*/}
      </AnimatePresence>
    </div>
  );
};

export default Index;
