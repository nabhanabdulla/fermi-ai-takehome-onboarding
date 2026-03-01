import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Sparkles, Search } from "lucide-react";

interface Message {
  id: number;
  text: string;
  from: "tutor" | "system";
}

interface TutorPanelProps {
  step: number;
  setStep: (step: number) => void;
}

const TutorPanel = ({ step, setStep }: TutorPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your Fermi tutor. Let's work through this problem together.", from: "tutor" },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Step 6 → add glow to "Check my work" button
  // Step 7 → append tutor message
  useEffect(() => {
    if (step === 7) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Great correction! Since b + c = −a, try substituting −a into the denominator of the first fraction.",
          from: "tutor",
        },
      ]);
    }
  }, [step]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCheckWork = () => {
    if (step === 6) {
      setStep(7);
    }
  };

  const handleGuideMe = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: "Let's take it step by step. What do you notice about b + c?", from: "tutor" },
    ]);
  };

  return (
    <Card className="h-full max-h-[40vh] md:max-h-none rounded-none border-t-0 border-b-0 border-l-0 flex flex-col">
      <CardHeader className="pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10 bg-accent">
              <AvatarFallback className="bg-accent text-accent-foreground">
                <Bot size={20} />
              </AvatarFallback>
            </Avatar>
            {step >= 7 && (
              <Badge className="absolute -top-1 -right-2 text-[10px] px-1.5 py-0 bg-green-500 text-white border-0">
                Nice work!
              </Badge>
            )}
          </div>
          <div>
            <CardTitle className="text-base">Chatting with Fermi tutor</CardTitle>
            <p className="text-xs text-muted-foreground">AI-powered math assistant</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === "tutor"
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {/* Action buttons */}
        <div className="p-4 border-t border-border flex gap-2">
          <Button
            variant="outline"
            className={`flex-1 gap-2 ${step === 6 ? "animate-pulse ring-2 ring-primary ring-offset-2" : ""}`}
            onClick={handleCheckWork}
          >
            <Search size={16} />
            Check my work
          </Button>
          <Button
            variant="secondary"
            className="flex-1 gap-2"
            onClick={handleGuideMe}
          >
            <Sparkles size={16} />
            Guide me
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorPanel;
