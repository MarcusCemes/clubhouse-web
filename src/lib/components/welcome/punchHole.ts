import { expoInOut } from "svelte/easing";
import type { EasingFunction, TransitionConfig } from "svelte/transition";

export interface PunchHoleParams {
  delay?: number;
  duration?: number;
  easing?: EasingFunction;
}

/**
 * Transition that shows/hides an element by cutting-out an expanding circle
 * from the center.
 *
 * This transition sets a CSS variable on the element, and
 * should be used in conjunction with `punchHole.module.css` class that
 * is pre-processed with proper vendor prefixing.
 */
export function punchHole(
  node: Element,
  { delay = 0, duration = 1000, easing = expoInOut }: PunchHoleParams = {}
): TransitionConfig {
  let maxSize = 0;

  return {
    delay,
    duration,
    easing,
    css: (t, u) => {
      if (t * u === 0) maxSize = calculateMaxSize(node);
      return `--mask-size: ${u * maxSize}%;`;
    },
  };
}

function calculateMaxSize(node: Element) {
  const { width, height } = node.getBoundingClientRect();

  const w = width / 2;
  const h = height / 2;
  const hypotenuse = Math.sqrt(w * w + h * h);

  const max = Math.max(w, h);
  const diagonal = Math.sqrt(2) * max;

  // Extra .1% helps to compensate for the inexact mask
  // size to ensure that corners are properly covered
  return (100.1 * hypotenuse) / diagonal;
}
