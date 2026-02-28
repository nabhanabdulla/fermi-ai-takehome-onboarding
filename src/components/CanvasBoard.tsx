import { useRef, useState, useCallback } from "react";
import { Stage, Layer, Line } from "react-konva";
import { motion } from "framer-motion";
import { Pen, Eraser, Undo2, Redo2 } from "lucide-react";
import Konva from "konva";

interface LineData {
  points: number[];
  stroke: string;
  strokeWidth: number;
  tool: "pen" | "eraser";
}

interface CanvasBoardProps {
  width: number;
  height: number;
}

const CanvasBoard = ({ width, height }: CanvasBoardProps) => {
  const [lines, setLines] = useState<LineData[]>([]);
  const [redoStack, setRedoStack] = useState<LineData[]>([]);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const isDrawing = useRef(false);

  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
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
    isDrawing.current = false;
  }, []);

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

  const clear = () => {
    setLines([]);
    setRedoStack([]);
  };

  const tools = [
    { id: "pen" as const, icon: Pen, label: "Pen" },
    { id: "eraser" as const, icon: Eraser, label: "Eraser" },
  ];

  return (
    <div className="relative w-full h-full canvas-dots">
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
          {lines.map((line, i) => (
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
          ))}
        </Layer>
      </Stage>

      {/* Bottom-left toolbar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-6 left-6 toolbar-float rounded-2xl px-2 py-2 flex items-center gap-1"
      >
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`p-2.5 rounded-xl transition-all ${
              tool === t.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
            title={t.label}
          >
            <t.icon size={18} />
          </button>
        ))}
      </motion.div>

      {/* Bottom-right actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 right-6 toolbar-float rounded-2xl px-2 py-2 flex items-center gap-1"
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
        <button
          onClick={clear}
          className="p-2.5 rounded-xl text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-all"
          title="Clear"
        >
          <Eraser size={18} />
        </button>
      </motion.div>
    </div>
  );
};

export default CanvasBoard;
