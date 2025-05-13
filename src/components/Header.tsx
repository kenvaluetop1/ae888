import React from 'react';
import { Trophy } from 'lucide-react';
export const Header: React.FC = () => {
  return (
    <header className="w-full flex flex-col items-center py-4 px-6">
      <div className="flex items-center gap-2">
        <Trophy className="h-10 w-10 text-[#FFD700] animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">
          <span className="text-[#B79126]">AE</span><span className="text-[#e90b16]">888</span>
        </h1>
        <Trophy className="h-10 w-10 text-[#FFD700] animate-pulse" />
      </div>
      
      <h2 className="mt-3 text-xl md:text-2xl text-white text-center font-light max-w-lg">
        Vòng quay may mắn <span className="font-medium text-[#B79126]">AE888</span>
      </h2>
      <p className=" text-white text-center font-light">
        Quay là trúng, nhận thưởng liền tay
      </p>
    </header>
  );
};