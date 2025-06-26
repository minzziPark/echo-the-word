"use client";
import { BookOpen, Calendar } from "lucide-react";
import "./../app/globals.css";

export function Navigation() {
  const today = new Date();
  const outreachDate = new Date("2025-07-25");
  const timeDiff = outreachDate.getTime() - today.getTime();
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              아웃리치 말씀 암송
            </span>
          </div>

          {/* D-Day Counter */}
          <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            <Calendar className="w-4 h-4 text-orange-600" />
            <div className="text-sm font-semibold text-orange-800">
              D-{Math.ceil(timeDiff / (1000 * 60 * 60 * 24))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
