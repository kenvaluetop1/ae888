import React, { useState } from 'react';
import { Header } from './components/Header';
import { PrizeWheel } from './components/PrizeWheel';
import { CongratsModal } from './components/CongratsModal';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Footer } from './components/Footer';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [prize, setPrize] = useState('');
  const [prizeLink, setPrizeLink] = useState('');

  const handleWheelStop = (selectedPrize: string, link: string) => {
    setPrize(selectedPrize);
    setPrizeLink(link);
    setShowModal(true);
  };

  return (
    <div className="relative overflow-hidden w-screen h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#006719] to-[#004d13]">
      <BackgroundEffects />
      
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-between h-full py-4">
        <Header />
        
        <main className="flex-1 w-full flex items-center justify-center">
          <PrizeWheel onWheelStop={handleWheelStop} />
        </main>
        
        <Footer />
      </div>
      
      {showModal && (
        <CongratsModal
          prize={prize}
          prizeLink={prizeLink}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;