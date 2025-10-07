import React from "react";
import CoralAnalyzer from "./components/CoralAnalyzer";
import ReefRiskDashboard from "./components/ReefRiskDashboard";
import TextType from "./components/TextType/TextType";
import "./global.css";
import Prism from './components/Prism/Prism';

export default function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Prism background: full screen, behind everything */}
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0.5}
        glow={1}
        transparent={true}
      />

      {/* Foreground content */}
      <div className="relative z-10 p-6">
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Doto:wght@100..900&family=Fira+Code:wght@300..700&family=Fira+Sans:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />

        {/* Title */}
        <TextType
          text={["DeepReef AI"]}
          as="h1"
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter=""
          className="font-bold mb-10 text-center playfair-display-400"
          textColors={["#1E40AF", "#047857", "#B91C1C"]}
        />

        {/* Main content */}
        <div className="max-w-4xl mx-auto space-y-10">
          <CoralAnalyzer />
          <ReefRiskDashboard />
        </div>
      </div>
    </div>
  );
}
