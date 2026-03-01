import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Sparkles,
  Search,
  GripVertical,
  Volume2,
  X,
  MicOff,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import OnboardingOverlay from "./OnboardingOverlay";

interface Message {
  id: number;
  text: string;
  from: "tutor" | "user";
}

interface TutorPanelProps {
  step: number;
  setStep: (step: number) => void;
}

const TutorPanel = ({ step, setStep }: TutorPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const checkMyWorkRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (step === 10) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Try substituting these values into the denominator of the fractions.",
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
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: "Can you please check my work?", from: "user" },
    ]);
    if (step === 9) {
      setTimeout(() => setStep(10), 1000);
      setTimeout(() => setStep(11), 4000);
      setTimeout(() => setStep(12), 8000);
    }
  };

  const handleGuideMe = () => {
    // setMessages((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now(),
    //     text: "Let's take it step by step. What do you notice about b + c?",
    //     from: "tutor",
    //   },
    // ]);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: "Can you please guide me?", from: "user" },
    ]);
    if (step === 9) {
      setTimeout(() => setStep(10), 1000);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue.trim(), from: "user" },
    ]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <Card className="h-full rounded-none border-t-0 border-b-0 border-l-0 flex flex-col bg-card">
        {/* Header bar */}
        <CardHeader className="px-4 py-3 border-b border-border flex-row items-center gap-2 space-y-0">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <GripVertical size={18} />
          </button>
          <Avatar className="h-9 w-9 relative">
            <AvatarFallback className="bg-accent text-accent-foreground text-xs">
              <Bot size={18} />
            </AvatarFallback>
            {step >= 7 && (
              <Badge className="absolute -top-1 -right-2 text-[9px] px-1.5 py-0 bg-green-500 text-white border-0 leading-tight">
                Nice!
              </Badge>
            )}
          </Avatar>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Volume2 size={18} />
          </button>
          <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1.5 flex-1 min-w-0">
            {isCollapsed ? (
              <button
                onClick={() => setIsCollapsed(false)}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground truncate"
              >
                <MessageCircle size={14} className="text-muted-foreground shrink-0" />
                <span className="truncate">Chat with Fermi tutor</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close tutor chat"
                >
                  <X size={14} className="shrink-0" />
                </button>
                <span className="text-sm font-medium text-foreground truncate">
                  Chatting with Fermi tutor
                </span>
              </>
            )}
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <MicOff size={18} />
          </button>
        </CardHeader>

        {!isCollapsed && (
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-[200px]">
            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-3 max-h-[50vh] overflow-auto" ref={scrollRef}>
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-2.5 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      <Avatar className="h-8 w-8 shrink-0 mt-1">
                        {msg.from === "tutor" ? (
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                            <Bot size={16} />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                            N
                          </AvatarFallback>
                        )}
                      </Avatar>

                      {/* Bubble + feedback */}
                      <div
                        className={`flex flex-col gap-1.5 max-w-[80%] ${msg.from === "user" ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.from === "tutor"
                              ? "bg-accent text-accent-foreground rounded-tl-sm"
                              : "bg-secondary text-secondary-foreground rounded-tr-sm"
                            }`}
                        >
                          {msg.text}
                        </div>
                        {/* Thumbs */}
                        {msg.from === "tutor" && (
                          <div className="flex items-center gap-2 pl-1">
                            <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
                              <ThumbsUp size={13} />
                            </button>
                            <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
                              <ThumbsDown size={13} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            {/* Action buttons */}
            <div className="px-4 pb-2 flex gap-2" ref={checkMyWorkRef}>
              <Button
                variant="outline"
                size="sm"
                className={`flex-1 gap-1.5 rounded-full text-xs ${step === 6
                    ? "animate-pulse ring-2 ring-primary ring-offset-2"
                    : ""
                  }`}
                onClick={handleCheckWork}
              >
                <Search size={14} />
                Check my work
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5 rounded-full text-xs"
                onClick={handleGuideMe}
              >
                <Sparkles size={14} />
                Guide me
              </Button>
            </div>

            {/* Input field */}
            <div className="px-4 pb-4 pt-1">
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-primary/40 outline-none"
                />
                <button
                  onClick={handleSend}
                  className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      <AnimatePresence>
      {/* {step === 9 && (
          <OnboardingOverlay
            step={step}
            setStep={setStep}
            questionRef={checkMyWorkRef}
          />
        )} */}
      </AnimatePresence>
    </div>
  );
};

export default TutorPanel;
