import { useRef, useState, useCallback, useEffect } from "react";
import { Stage, Layer, Line, Text, Rect, Circle } from "react-konva";
import { motion } from "framer-motion";
import { Pen, Eraser, Undo2, Redo2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Konva from "konva";

interface LineData {
  points: number[];
  stroke: string;
  strokeWidth: number;
  tool: "pen" | "eraser";
}

interface CanvasBoardProps {
  step: number;
  setStep: (step) => void;
  onErrorClick: () => void;
  corrected: boolean;
}

const useContainerSize = (ref: React.RefObject<HTMLDivElement>) => {
  const [size, setSize] = useState({ width: 800, height: 600 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return size;
};

const CanvasBoard = ({ step, setStep, onErrorClick, corrected }: CanvasBoardProps) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { width, height } = useContainerSize(containerRef);
  const [lines, setLines] = useState<LineData[]>([]);
  const [redoStack, setRedoStack] = useState<LineData[]>([]);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const isDrawing = useRef(false);
  const [pulseRadius, setPulseRadius] = useState(12);
  const pulseRef = useRef<Konva.Circle>(null);

  // Pulse animation for error dot
  useEffect(() => {
    if (step !== 4 || !pulseRef.current) return;
    const anim = new Konva.Animation((frame) => {
      if (!frame) return;
      const scale = 1 + 0.3 * Math.sin((frame.time / 400) * Math.PI);
      setPulseRadius(12 * scale);
    }, pulseRef.current.getLayer());
    anim.start();
    return () => { anim.stop(); };
  }, [step]);

  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    console.log("Handlemousedown called: ", isDrawing.current)
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setRedoStack([]);
    setLines((prev) => [
      ...prev,
      {
        points: [pos.x, pos.y],
        stroke: tool === "eraser" ? "hsl(40, 15%, 97%)" : "hsl(220, 15%, 15%)",
        strokeWidth: tool === "eraser" ? 20 : 2.5,
        tool,
      },
    ]);
  }, [tool]);

  const handleMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawing.current) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;
    setLines((prev) => {
      const last = prev[prev.length - 1];
      const updated = { ...last, points: [...last.points, pos.x, pos.y] };
      return [...prev.slice(0, -1), updated];
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    console.log("Handlemouseup called: ", isDrawing.current)

    isDrawing.current = false;
  }, []);

  console.log(step)
  // const handleMouseUp = () => {
  //   isDrawing.current = false;
  //   console.log("Called")

  //   if (step == 3) {
  //     setStep(4)
  //   } else if (step == 4) {
  //     setStep(5)
  //   } else if (step == 5) {
  //     setStep(6)
  //   }
  // };

  const undo = () => {
    if (lines.length === 0) return;
    setRedoStack((prev) => [lines[lines.length - 1], ...prev]);
    setLines((prev) => prev.slice(0, -1));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    setLines((prev) => [...prev, redoStack[0]]);
    setRedoStack((prev) => prev.slice(1));
  };

  // Math text positions
  const textX = 80;
  const textY = 60;
  const lineHeight = 40;
  const mathLines = [
    "",
    "b + c = -1005 - 1007",
    "= ",
  ];

  const mathLines_with_a = [
    "",
    "b + c = -1005 - 1007",
    "= -2012",
    corrected ? "= -a" : "= a",
  ];


  const mathLines_checkpoint1 = [
    "",
    "b + c = -1005 - 1007",
    "= -2012",
    "= -a",
    " ",
    "c + a = -1007 + 2012",
    "= 1005",
    "= -b",
    " ",
    "a + b = 2012 - 1005",
    "= 1007",
    "= -c",
    " "
  ];

  const mathLines_checkpoint3 = [
    "",
    "b + c = -1005 - 1007",
    "= -2012",
    "= -a",
    " ",
    "c + a = -1007 + 2012",
    "= 1005",
    "= -b",
    " ",
    "a + b = 2012 - 1005",
    "= 1007",
    "= -c",
    " ",
    "a⁴/(b+c) + b⁴/(c+a) + c⁴/(a+b) + 3abc",
    "= a⁴/(-a) + b⁴/(-b) + c⁴/(-c) + 3abc",
    "= -a\u00B3 - b\u00B3 - c\u00B3 + 3abc",
    "= 3(a + b + c)(ab + bc + ca)",
    "= 3 x 0 x (ab + bc + ca)",
    "= 0"
  ];

  // 1. full lines (what you have now)
  // const fullLines = mathLines_with_a;

  // 2. local state for what is currently visible
  // const [typedLines, setTypedLines] = useState<string[]>(
  //   () => mathLines
  // );

  // 3. start typing animation when step === 4
  // useEffect(() => {
  //   if (step !== 4) return;

  //   let lineIndex = 0;
  //   let charIndex = 0;

  //   const interval = setInterval(() => {
  //     setTypedLines((prev) => {
  //       const next = [...prev];

  //       // append one more character of current line
  //       next[lineIndex] = fullLines[lineIndex].slice(0, charIndex + 1);

  //       return next;
  //     });

  //     charIndex++;

  //     // finished current line → move to next line
  //     if (charIndex >= fullLines[lineIndex].length) {
  //       lineIndex++;
  //       charIndex = 0;

  //       // finished all lines → stop
  //       if (lineIndex >= fullLines.length) {
  //         clearInterval(interval);
  //       }
  //     }
  //   }, 40); // typing speed (ms per character)

  //   return () => clearInterval(interval);
  // }, [step, fullLines]);


  const lastLineY = textY + (mathLines_with_a.length - 1) * lineHeight;

  const tools = [
    { id: "pen" as const, icon: Pen, label: "Pen" },
    { id: "eraser" as const, icon: Eraser, label: "Eraser" },
  ];

  // Error dot position
  const dotX = width - 60;
  const dotY = lastLineY + 10;

  return (
    <div ref={containerRef} className="relative w-full h-screen canvas-dots">
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: tool === "eraser" ? "cell" : "crosshair" }}
      >
        <Layer>
          {/* Handwritten math text */}
          {(step == 2 || step == 3) && mathLines.map((text, i) => (
            <Text
              key={i}
              x={textX}
              y={textY + i * lineHeight}
              text={text}
              fontSize={24}
              fontFamily="'Patrick Hand', cursive"
              fill="#2d3748"
            />
          ))}

          {/* Not functional - 4. render typedLines instead of full mathLines_with_a */}
          {/* {(step === 4 || step === 44 || step === 444) &&
            mathLines_with_a.map((text, i) => {
              if (
                (step === 4 && i >0) ||
                (step === 44 && i >1)
                ) {
                return 
              }
              (<Text
                key={i}
                x={textX}
                y={textY + i * lineHeight}
                text={text}
                fontSize={24}
                fontFamily="'Patrick Hand', cursive"
                fill="#2d3748"
              />)
            }
          )} */}

          {(step >= 4 && step <= 8) && mathLines_with_a.map((text, i) => (
            <Text
              key={i}
              x={textX}
              y={textY + i * lineHeight}
              text={text}
              fontSize={24}
              fontFamily="'Patrick Hand', cursive"
              fill="#2d3748"
            />
          ))}

          {(step == 9 || step == 10) && mathLines_checkpoint1.map((text, i) => (
            <Text
              key={i}
              x={textX}
              y={textY + i * lineHeight}
              text={text}
              fontSize={24}
              fontFamily="'Patrick Hand', cursive"
              fill="#2d3748"
            />
          ))}

          {step >= 11 && mathLines_checkpoint3.map((text, i) => (
            <Text
              key={i}
              x={textX}
              y={textY + i * lineHeight}
              text={text}
              fontSize={24}
              fontFamily="'Patrick Hand', cursive"
              fill="#2d3748"
            />
          ))}

          {/* Dashed highlight rect around last line when step >= 2 and not corrected */}
          {step >= 5 && !corrected && (
            <Rect
              x={textX - 8}
              y={lastLineY - 6}
              width={120}
              height={36}
              stroke="#e53e3e"
              strokeWidth={1.5}
              dash={[6, 4]}
              cornerRadius={6}
            />
          )}

          {/* Yellow error dot at step 3 */}
          {step === 5 && (
            <Circle
              ref={pulseRef}
              x={dotX}
              y={dotY}
              radius={pulseRadius}
              fill="#ECC94B"
              shadowColor="#ECC94B"
              shadowBlur={16}
              shadowOpacity={0.5}
              onClick={() => onErrorClick()}
              onTap={() => onErrorClick()}
              style={{ cursor: "pointer" }}
            />
          )}
        </Layer>
      </Stage>

      {/* Error badge at step 3 */}
      {/* {step === 5 && (
        <>
          <Badge className="absolute top-4 right-4 bg-amber-500 text-white border-0">
            Error noticed
          </Badge>
          <div className="absolute bottom-20 right-6 bg-card border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground shadow-md">
            Tap the yellow dot to see feedback
          </div>
        </>
      )} */}

      {/* User-drawn lines */}
      {/* {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={line.stroke}
          strokeWidth={line.strokeWidth}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation={
            line.tool === "eraser" ? "destination-out" : "source-over"
          }
        />
      ))} */}

      {/* Bottom-left toolbar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-6 right-32 toolbar-float rounded-2xl px-2 py-2 flex items-center gap-1"
      >
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`p-2.5 rounded-xl transition-all ${tool === t.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-secondary"
              }`}
            title={t.label}
          >
            <t.icon size={18} />
          </button>
        ))}
      </motion.div>

      {/* Bottom-right undo/redo */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute top-6 right-6 toolbar-float rounded-2xl px-2 py-2 flex items-center gap-1"
      >
        <button
          onClick={undo}
          disabled={lines.length === 0}
          className="p-2.5 rounded-xl text-muted-foreground hover:bg-secondary disabled:opacity-30 transition-all"
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={redo}
          disabled={redoStack.length === 0}
          className="p-2.5 rounded-xl text-muted-foreground hover:bg-secondary disabled:opacity-30 transition-all"
          title="Redo"
        >
          <Redo2 size={18} />
        </button>
      </motion.div>
    </div>
  );
};

export default CanvasBoard;
