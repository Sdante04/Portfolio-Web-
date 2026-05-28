import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { CaseStudy } from './components/CaseStudy';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { InteractiveLab } from './components/InteractiveLab';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CursorGlow } from './components/CursorGlow';

export default function App() {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-white font-['Inter',sans-serif] relative">
      {/* Background Effects */}
      <BackgroundEffects />

      <Header />
      
      <main>
        <Hero />
        <div className="h-24" />
        <About />
        <div className="h-24" />
        <Projects onExpandCaseStudy={() => setCaseStudyOpen(true)} />
        <div className="h-24" />
        <Skills />
        <div className="h-24" />
        <Education />
        <div className="h-24" />
        <InteractiveLab />
        <div className="h-24" />
        <Contact />
      </main>

      <Footer />

      {/* Case Study Modal */}
      <CaseStudy isOpen={caseStudyOpen} onClose={() => setCaseStudyOpen(false)} />

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Custom cursor glow (desktop only) */}
      <CursorGlow />
    </div>
  );
}