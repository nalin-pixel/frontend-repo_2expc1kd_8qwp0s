import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HorizontalStory from './components/HorizontalStory';
import { SocialProof, LiquidityYields, SecurityMechanics, FeesSla, FaqCta } from './components/Sections';

function App() {
  return (
    <div className="min-h-screen bg-[#0B0D12] text-white font-inter">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <HorizontalStory />
        <LiquidityYields />
        <SecurityMechanics />
        <FeesSla />
        <FaqCta />
      </main>
    </div>
  );
}

export default App;
