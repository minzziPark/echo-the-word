"use client";
import { BookOpen } from "lucide-react";
import "./../app/globals.css";

export function Navigation() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center h-13">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-md font-bold text-gray-800">
              아웃리치 말씀 암송
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
