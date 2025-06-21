"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import "./../app/globals.css";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

interface HeartAnimationProps {
  trigger: boolean;
  onComplete: () => void;
}

export function HeartAnimation({ trigger, onComplete }: HeartAnimationProps) {
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts: FloatingHeart[] = [];

      // 여러 개의 하트를 랜덤 위치에 생성
      for (let i = 0; i < 8; i++) {
        newHearts.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight - 100,
        });
      }

      setFloatingHearts(newHearts);

      // 애니메이션 완료 후 하트들 제거
      setTimeout(() => {
        setFloatingHearts([]);
        onComplete();
      }, 2000);
    }
  }, [trigger, onComplete]);

  return (
    <>
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart heart-float"
          style={{
            left: heart.x,
            top: heart.y,
          }}
        >
          <Heart className="w-8 h-8 text-red-500 fill-current" />
        </div>
      ))}
    </>
  );
}
