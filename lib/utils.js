// lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import confetti from 'canvas-confetti';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// ✅ DEFAULT export (NO curly braces needed when importing)
export default function runConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  });
}
