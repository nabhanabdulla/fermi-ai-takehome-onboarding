import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorCardProps {
  onIgnore: () => void;
  onShowHint: () => void;
}

const ErrorCard = ({ onIgnore, onShowHint }: ErrorCardProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute top-1/3 right-12 z-30 w-80"
    >
      <Card className="border-destructive/30 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-destructive flex items-center gap-2 text-base">
            <AlertTriangle size={18} />
            ERROR
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-mono">b + c = −2012</span>, which equals{" "}
            <span className="font-mono font-semibold">−a</span>, not{" "}
            <span className="font-mono">a</span>.
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onIgnore} className="flex-1">
              IGNORE
            </Button>
            <Button size="sm" onClick={onShowHint} className="flex-1">
              SHOW HINT
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ErrorCard;
