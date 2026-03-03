# 🧮 Fermi — Interactive Math Tutor Onboarding

> A polished, step-by-step onboarding prototype for an AI math tutoring app — built to showcase interaction design, canvas rendering, and micro-animation craft.

**[▶ Live Demo](https://onboarding-task.lovable.app)**

---

## What is this?

An interactive onboarding experience that walks students through solving a competition-style math problem on a digital canvas. It combines spotlight overlays, handwriting-style canvas rendering, error detection, an AI tutor chat panel, and a celebration sequence — all orchestrated through a 12-step state machine.

---

## Onboarding Flow

| Step | What Happens | Key Interaction |
|------|-------------|-----------------|
| **1** | Spotlight overlay on question card | "Read the question" — user taps to continue |
| **2** | Spotlight shifts to canvas | "Start from the given starter solution" |
| **3–4** | Math text auto-writes on canvas | `b + c = −1005 − 1007 = −2012 = a` appears stroke-by-stroke |
| **5** | Overlay prompts error detection | "There's an error — tap the yellow dot" |
| **6** | Error card slides in | User chooses **IGNORE** or **SHOW HINT** |
| **7** | Correction applied on canvas | `= a` morphs to `= −a`, auto-advances |
| **8** | Tutor panel appears | Draggable chat panel with AI tutor avatar |
| **9** | Full substitution on canvas | `c + a = −b`, `a + b = −c` written out; tutor ready |
| **10** | User interacts with tutor | "Check my work" or "Guide me" triggers tutor response |
| **11** | Final solution on canvas | `= 0` — the answer reveals itself |
| **12** | Mark as Done celebration | Button glow → confetti burst → success panel slides up |

### Micro-Interaction Timeline (Step 12)

```
0.0s  Tap "Mark Done"
0.2s  Button ink glow (ring + bg transition)
0.5s  Confetti burst (120 particles, 5 colors)
1.2s  Success panel slides up with animated checkmark
```

---

## Tech Stack

| Technology | Role |
|-----------|------|
| **React 18** | Component architecture & state management |
| **TypeScript** | Type safety across the entire codebase |
| **TailwindCSS** | Utility-first styling with semantic design tokens |
| **Framer Motion** | Orchestrated animations, `AnimatePresence` transitions |
| **react-konva** | HTML5 Canvas rendering for math handwriting |
| **shadcn/ui** | Accessible UI primitives (cards, buttons, dialogs) |
| **canvas-confetti** | Celebration particle effects |
| **react-draggable** | Draggable tutor panel positioning |

---

## Architecture Highlights

- **State Machine Pattern** — A single `step` integer (1–12) drives the entire onboarding flow. Components conditionally render based on step, making the flow easy to extend or reorder.
- **Micro-Interaction Timelines** — `setTimeout` chains create deliberate emotional pacing (glow → confetti → slide-up) rather than instant transitions.
- **Component Isolation** — `CanvasBoard`, `TutorPanel`, `ErrorCard`, `SuccessPanel`, and `OnboardingOverlay` are fully decoupled; each owns its own animation logic.
- **Spotlight Overlay System** — SVG-based spotlight with computed positions from `ref.getBoundingClientRect()`, creating focused attention on specific UI regions.

---

## Getting Started

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

---

Built with [Lovable](https://lovable.dev)
