import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, RefreshCw } from "lucide-react";

interface SuccessPanelProps {
  onLevelUp: () => void;
  onTryTwist: () => void;
}

const SuccessPanel = ({ onLevelUp, onTryTwist }: SuccessPanelProps) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 260, delay: 1.0 }}
      className="fixed bottom-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
      style={{ height: "40%" }}
    >
      <Card className="w-full max-w-2xl mx-4 mb-0 rounded-b-none rounded-t-2xl shadow-2xl border-t border-x border-border bg-card pointer-events-auto flex flex-col">
        <CardContent className="flex-1 flex flex-col items-center justify-center gap-6 px-8 py-10 text-center">
          {/* Checkmark */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, type: "spring", damping: 12 }}
          >
            <div className="h-16 w-16 rounded-full bg-green-500/15 flex items-center justify-center">
              <motion.svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(142, 71%, 45%)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
                />
              </motion.svg>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="space-y-2"
          >
            <p className="text-2xl font-semibold text-foreground">
              ✔ You cracked a zero-sum identity
            </p>
          </motion.div>

          {/* Insight */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Since <span className="font-mono font-medium text-foreground">a + b + c = 0</span>, the expression collapses using a cubic identity.
              <br />
              <span className="italic">Big powers. Small trick.</span>
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.4 }}
            className="flex gap-3 pt-2"
          >
            <Button size="lg" className="gap-2 text-base px-6" onClick={onLevelUp}>
              <Rocket size={18} />
              Level Up This Concept
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-base px-6"
              onClick={onTryTwist}
            >
              <RefreshCw size={18} />
              Try a Twist on This Problem
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SuccessPanel;
