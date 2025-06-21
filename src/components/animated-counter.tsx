"use client";

import { useEffect, useState } from "react";
import "./../app/globals.css";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (displayValue !== value) {
      setIsAnimating(true);
      const startValue = displayValue;
      const difference = value - startValue;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // easeOutCubic 함수
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);

        if (progress < 1) {
          const currentValue = Math.round(
            startValue + difference * easedProgress
          );
          setDisplayValue(currentValue);
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value); // 마지막 값 명확하게 설정
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, displayValue, duration]);

  return (
    <span className={`${className} ${isAnimating ? "number-count" : ""}`}>
      {displayValue}
    </span>
  );
}
