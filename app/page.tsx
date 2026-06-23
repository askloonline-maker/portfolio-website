import React from "react";
import Hero from "../components/Hero";
import RecentQuestions from "../components/RecentQuestions";

export default function HomePage() {
  return (
    <div className="space-y-5">
      {/* Top Value Banner */}
      <Hero />

      {/* Live Content Query Stream */}
      <RecentQuestions />
    </div>
  );
}
