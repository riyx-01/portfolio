"use client";

import React, { ReactNode } from 'react';
import './CyberContainer.css';

interface CyberContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  highlight?: string;
  prompt?: string;
}

const CyberContainer: React.FC<CyberContainerProps> = ({ 
  children, 
  title, 
  subtitle, 
  highlight, 
  prompt = "HOVER TO VIEW" 
}) => {
  return (
    <div className="cyber-container-wrapper">
      <div className="container noselect">
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className={`tr-${i + 1} tracker`}></div>
        ))}
        
        <div id="card">
            <div className="card-content">
              {prompt && <p id="prompt">{prompt}</p>}
              {title && <h1 className="title">{title}</h1>}
              {subtitle && (
                <p className="subtitle">
                  {subtitle} {highlight && <span className="highlight">{highlight}</span>}
                </p>
              )}
              
              <div className="glowing-elements">
                <div className="glow-1"></div>
                <div className="glow-2"></div>
                <div className="glow-3"></div>
              </div>

              <div className="cyber-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="card-particles">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="corner-elements">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="scan-line"></div>
              <div className="card-glare"></div>
              
              <div className="inner-content">
                {children}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CyberContainer;
