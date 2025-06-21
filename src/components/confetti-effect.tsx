"use client";

import { useEffect, useState } from "react";
import "./../app/globals.css";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface ConfettiEffectProps {
  trigger: boolean;
  onComplete: () => void;
}

export function ConfettiEffect({ trigger, onComplete }: ConfettiEffectProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
      ];
      const newConfetti: ConfettiPiece[] = [];

      for (let i = 0; i < 20; i++) {
        newConfetti.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight - 50,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
        });
      }

      setConfetti(newConfetti);

      setTimeout(() => {
        setConfetti([]);
        onComplete();
      }, 3000);
    }
  }, [trigger, onComplete]);

  return (
    <>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="confetti fixed pointer-events-none z-50"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: "50%",
          }}
        />
      ))}
    </>
  );
}
