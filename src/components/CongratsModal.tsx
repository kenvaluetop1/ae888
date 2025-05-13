import React from 'react';
import { X, PartyPopper } from 'lucide-react';

interface CongratsModalProps {
  prize: string;
  prizeLink: string;
  onClose: () => void;
}

export const CongratsModal: React.FC<CongratsModalProps> = ({
  prize,
  prizeLink,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-gradient-to-b from-[#000066] to-[#000033] border-4 border-[#FFD700] rounded-lg w-[90%] max-w-md p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-[#FFD700] transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex justify-center gap-2">
            <PartyPopper className="h-8 w-8 text-[#FFD700] animate-bounce" />
            <PartyPopper className="h-8 w-8 text-[#B22222] animate-bounce" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">Chúc mừng!</h2>
          
          <div className="py-4">
            <p className="text-xl text-white mb-1">Bạn đã nhận được:</p>
            <p className="text-2xl font-bold text-[#FFD700] mb-4">{prize}</p>
          </div>
          
          <a
            href={prizeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 bg-gradient-to-r from-[#B22222] to-[#FF4500] text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
          >
            NHẬN THƯỞNG NGAY
          </a>
          
          <p className="mt-4 text-sm text-white/70">
            Đăng ký 1 tài khoản để nhận thưởng!
          </p>
        </div>
      </div>
    </div>
  );
};