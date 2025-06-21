"use client";

import { useEffect, useState } from "react";
import { Heart, BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { HeartAnimation } from "@/components/heart-animation";
import { AnimatedCounter } from "@/components/animated-counter";
import { ConfettiEffect } from "@/components/confetti-effect";
import "./globals.css";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import firestore from "@/firebase/firestore";

export default function HomePage() {
  const [userInput, setUserInput] = useState("");
  const [hearts, setHearts] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [triggerHeartAnimation, setTriggerHeartAnimation] = useState(false);
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerseHidden, setIsVerseHidden] = useState(false);

  useEffect(() => {
    const fetchHearts = async () => {
      const docId = process.env
        .NEXT_PUBLIC_FIREBASE_HEARTS_COLLECTION_DOC_ID as string;
      const docRef = doc(firestore, "hearts", docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHearts(docSnap.data().heartsCount || 0);
      } else {
        setHearts(0);
      }
    };

    fetchHearts();
  }, []);

  useEffect(() => {
    if (hearts === 0) return;

    const updateHearts = async () => {
      const docId = process.env
        .NEXT_PUBLIC_FIREBASE_HEARTS_COLLECTION_DOC_ID as string;
      const docRef = doc(firestore, "hearts", docId);
      await updateDoc(docRef, { heartsCount: hearts });
    };

    updateHearts();
  }, [hearts]);

  const todayVerse = {
    reference: "요한복음 13:34-35",
    text: "내가 너희에게 새 계명을 준다 서로 사랑하라 내가 너희를 사랑한 것같이 너희도 서로 사랑하라 너희가 서로 사랑하면 이로써 모든 사람들이 너희가 내 제자임을 알게 될 것이다",
  };

  const verseText = todayVerse.text.replace(/\s/g, "");

  const handleSubmit = async () => {
    if (userInput.trim() && !isSubmitting) {
      setIsSubmitting(true);
      if (verseText !== userInput.replace(/\s/g, "")) {
        setIsSubmitting(false);
        alert("입력한 말씀이 올바르지 않습니다. 다시 확인해주세요.");
        return;
      }

      // 제출 애니메이션 시작
      setTriggerHeartAnimation(true);

      // 잠시 후 하트 증가 및 성공 메시지
      setTimeout(() => {
        setHearts((prev) => prev + 1);
        setShowSuccess(true);
        setUserInput("");
      }, 1000);

      // 성공 메시지 숨기기
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 relative">
      {/* 애니메이션 컴포넌트들 */}
      <HeartAnimation
        trigger={triggerHeartAnimation}
        onComplete={() => setTriggerHeartAnimation(false)}
      />
      <ConfettiEffect
        trigger={triggerConfetti}
        onComplete={() => setTriggerConfetti(false)}
      />

      {/* Header */}
      <div className="text-center py-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          📖 오늘의 말씀 암송 ✨
        </h1>
        <p className="text-gray-600 text-sm">
          하나님의 말씀을 마음에 새겨 하트를 모아보세요
        </p>
      </div>

      {showSuccess && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg animate-pulse">
          <CardContent className="text-center">
            <div className="text-green-600 font-bold text-xl mb-2">
              훌륭합니다!
            </div>
            <div className="text-green-700 text-lg">
              하트 +1개를 획득하셨습니다!
            </div>
            <div className="text-green-600 text-sm mt-2">
              하나님의 말씀이 마음에 새겨졌어요
            </div>
          </CardContent>
        </Card>
      )}

      {/* Heart Counter */}
      {!showSuccess && (
        <Card className="shadow-lg border-red-100 bg-gradient-to-r from-red-50 to-pink-50">
          <CardContent className="p-5">
            <div className="flex items-center justify-center space-x-4">
              <div className="heart-pulse">
                <Heart className="w-10 h-10 text-red-500 fill-current" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">
                  <AnimatedCounter value={hearts} />
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  모은 하트
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Verse */}
      <Card className="border-l-4 border-l-blue-500 shadow-lg gap-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-md">
              <BookOpen className="w-5 h-5 text-blue-500" />
              오늘의 말씀
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVerseHidden(!isVerseHidden)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isVerseHidden ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="relative">
              <p
                className={`text-md leading-relaxed text-gray-800 bg-blue-50 p-4 rounded-lg transition-all duration-300 ${
                  isVerseHidden ? "blur-md select-none" : ""
                }`}
              >
                {todayVerse.text}
              </p>
              {isVerseHidden && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-600">
                      말씀이 숨겨져 있습니다
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-right text-blue-600 font-semibold text-sm">
              - {todayVerse.reference} -
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card className="shadow-lg gap-2">
        <CardHeader>
          <CardTitle className="text-md">말씀을 정확히 입력해주세요</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="위의 성경 구절을 정확히 입력해주세요..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[120px] text-base leading-relaxed  focus:border-blue-400 border-gray-200 focus:border-2"
            disabled={isSubmitting}
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
            disabled={!userInput.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>제출 중...</span>
              </div>
            ) : (
              <>제출하기</>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Encouragement */}
      <Card className="bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 shadow-lg">
        <CardContent className="text-center">
          <p className="text-gray-700 italic text-sm leading-relaxed">
            {"주의 말씀은 내 발에 등이요 내 길에 빛이니이다"}
          </p>
          <p className="text-purple-600 font-semibold mt-2 text-sm">
            - 시편 119:105 -
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
