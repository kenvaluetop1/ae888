import React, { useState, useRef } from 'react';
import { prizes } from '../data/prizes';

interface PrizeWheelProps {
  onWheelStop: (prize: string, link: string) => void;
}

export const PrizeWheel: React.FC<PrizeWheelProps> = ({ onWheelStop }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    
    // Minimum 5 full rotations (1800 degrees) plus random additional rotation
    const minRotation = 1800;
    const additionalRotation = Math.random() * 360;
    const totalRotation = minRotation + additionalRotation;
    
    // Calculate final position and prize
    const finalPosition = totalRotation % 360;
    const degreesPerPrize = 360 / prizes.length;
    
    // Calculate prize index (accounting for reverse rotation)
    const normalizedPosition = (360 - finalPosition) % 360;
    const prizeIndex = Math.floor(normalizedPosition / degreesPerPrize);
    const selectedPrize = prizes[prizeIndex];
    
    // Set the new total rotation (current + new rotation)
    const newRotation = rotation + totalRotation;
    setRotation(newRotation);
    
    // Notify parent after animation completes
    setTimeout(() => {
      setSpinning(false);
      onWheelStop(selectedPrize.name, selectedPrize.link);
    }, 5000);
  };

  const segmentAngle = 360 / prizes.length;
  
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Prize indicator */}
        <div className="absolute z-10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-[#FFD700]" />
        
        {/* Wheel */}
        <div 
          ref={wheelRef}
          className="relative h-[350px] w-[350px] rounded-full bg-[#333366] border-8 border-[#FEB305] shadow-lg transform-gpu overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
          }}
        >
          {prizes.map((prize, index) => {
            const rotation = index * segmentAngle;
            return (
              <div
                key={index}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: '50% 50%',
                  clipPath: `polygon(50% 50%, 50% -25%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%)`
                }}
              >
                <div 
                  className={`absolute top-0 left-0 w-full h-full ${index % 2 === 0 ? 'bg-[#B22222]' : 'bg-[#000080]'}`}
                >
                  <div 
                    className="absolute w-32 text-center text-white font-bold text-sm whitespace-nowrap"
                    style={{
                      left: '60%',
                      top: '15%', // Moved text closer to the edge
                      transform: `translateX(-50%) rotate(${90 + segmentAngle / 2}deg)`,
                      transformOrigin: 'center bottom'
                    }}
                  >
                    {prize.name}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[40px] w-[40px] rounded-full bg-[#FFD700] border-4 border-white z-10 shadow-md" />
        </div>
      </div>
      
      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`px-8 py-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#000080] font-bold text-xl shadow-lg transform hover:scale-105 transition-transform ${spinning ? 'opacity-50 cursor-not-allowed' : 'animate-pulse'}`}
      >
        {spinning ? 'Chờ kết quả...' : 'Quay ngay!'}
      </button>
    </div>
  );
};