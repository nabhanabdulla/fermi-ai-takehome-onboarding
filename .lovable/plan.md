

## Plan: Add Onboarding Step Breakdown to README

Rewrite `README.md` to be recruiter-friendly and include a detailed step-by-step walkthrough of the onboarding flow.

### Steps derived from the codebase:

| Step | What Happens |
|------|-------------|
| 1 | Spotlight overlay on question card — "Read the question" |
| 2 | Spotlight on canvas — "Start from given starter solution" |
| 3–4 | Auto-advance: math text appears on canvas (b+c = -1005-1007 = -2012 = a) |
| 5 | Overlay: "There's an error — tap the yellow dot" |
| 6 | Error card appears with IGNORE / SHOW HINT buttons |
| 7 | Correction applied (= a → = -a), auto-advances |
| 8 | Tutor panel appears (draggable chat) |
| 9 | Canvas shows full substitution (c+a = -b, a+b = -c); tutor ready for interaction |
| 10 | User clicks "Check my work" or "Guide me" — tutor responds |
| 11 | Final solution written on canvas (= 0) |
| 12 | Mark as Done — glow → confetti → success panel |

### README structure:
1. **Hero** — Project name, tagline, live demo link
2. **What is this?** — 2-sentence product summary
3. **Live Demo** — Link to https://onboarding-task.lovable.app
4. **Onboarding Flow** — The step-by-step table above, formatted cleanly
5. **Tech Stack** — React 18, TypeScript, TailwindCSS, Framer Motion, react-konva, shadcn/ui, canvas-confetti
6. **Architecture Highlights** — State machine, micro-interaction timeline, component breakdown
7. **Getting Started** — npm install + dev

Single file change: `README.md`.

