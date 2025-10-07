import React from "react";
import CoralAnalyzer from "./components/CoralAnalyzer";
import ReefRiskDashboard from "./components/ReefRiskDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        🌊 DeepReef-Ai
      </h1>

      <div className="max-w-4xl mx-auto">
        <CoralAnalyzer />
        <ReefRiskDashboard />
      </div>
    </div>
  );
}
