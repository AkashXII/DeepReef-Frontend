import React from "react";
import CoralAnalyzer from "./components/CoralAnalyzer";
import ReefRiskDashboard from "./components/ReefRiskDashboard";
import TextType from "./components/TextType/TextType";
import LightRays from "./components/LightRays/LightRays";
import "./global.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br bg-black p-6" style={{ width: '100%', height: '600px', position: 'relative' }}>
        <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Doto:wght@100..900&family=Fira+Code:wght@300..700&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Jersey+10&family=Julius+Sans+One&family=Londrina+Shadow&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+MX+Guides&family=Prata&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
      <TextType
          text={["DeepReef AI"]}
          as="h1"                    
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter=""
          className="text-8xl font-bold mb-6 pl-96 ml-4 text-center playfair-display-400" 
          textColors={["#1E40AF", "#047857", "#B91C1C"]}
        />
      <div className="max-w-4xl mx-auto">
        <CoralAnalyzer />
        <ReefRiskDashboard />
      </div>
    </div>
  );
}
