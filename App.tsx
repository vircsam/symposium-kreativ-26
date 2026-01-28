
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Wind, Sun, TreeDeciduous, Building2, Zap, ArrowDown, Rocket, Stars, Globe } from 'lucide-react';
import { CityScene } from './components/CityScene';
import { GeminiAssistant } from './components/GeminiAssistant';
import { EventTimeline } from './components/EventTimeline';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgentMobile = /Mobi|Android/i.test(navigator.userAgent);
      const widthMobile = window.innerWidth < 768; // Standard tablet/mobile breakpoint
      setIsMobile(userAgentMobile || widthMobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const Section = ({ children, className, contentClassName = "max-w-2xl" }: { children?: React.ReactNode, className?: string, contentClassName?: string }) => (
  <section className={`min-h-screen flex items-center px-6 md:px-24 relative z-10 py-20 ${className}`}>
    <div className={`${contentClassName} pointer-events-auto w-full`}>
      {children}
    </div>
  </section>
);

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  const isMobile = useIsMobile();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for 3D synchronization
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[500vh] bg-[#020210]">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <CityScene scrollY={scrollY} isMobile={isMobile} />
        </Canvas>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2 group cursor-pointer pointer-events-auto">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-lg flex items-center justify-center font-black text-white italic shadow-[0_0_20px_rgba(236,72,153,0.6)]">CC</div>
          <span className="text-xl font-bold tracking-tighter uppercase text-white">Kreativ<span className="text-pink-500 italic">'26</span></span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[14px] font-bold uppercase text-white pointer-events-auto">
          {/* Logo */}
          <img
            src="https://kreative25.netlify.app/static/media/logok.8ee34d39ac88ac2bbf82.jpeg"
            alt="Kamaraj Logo"
            className="w-8 h-8 object-contain"
          />
          {/* College Name */}
          <a href="#" className="hover:text-purple-400 transition-colors font-normal">
            Kamaraj College of Engineering & Technology
          </a>
        </div>


      </nav>

      {/* Content Layers */}
      <div className="relative z-10 pointer-events-none">
        <Section>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none tracking-tighter text-white">
  <span
    className="
      inline-block
      text-[28px] md:text-[28px]
      font-black
      uppercase
      tracking-[0.6em]
      mb-3
      text-pink-500
    "
  >
    Track Beta
  </span>

  <div>Kreativ</div>

  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 italic">
    2026
  </span>
</h1>



            <p className="text-lg text-blue-100/40 max-w-md mb-10 leading-relaxed font-light italic">
              Flagship Event of Kamaraj College of Engineering and Technology by Department of Computer Science & Engineering.
            </p>

            <div className="flex gap-4 pointer-events-auto">
              <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all shadow-xl">
                Register Now
              </button>
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="mt-20 flex items-center gap-3 text-pink-400/40 text-[10px] font-black tracking-[0.4em] uppercase"
            >
              Scroll to Dock <ArrowDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </Section>
        <h1
          className="
    text-4xl sm:text-7xl md:text-[9.0rem]
    font-black
    mb-6
    leading-none
    tracking-tighter
    text-center
    italic
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-pink-500
    to-blue-500
  "
        >
          Track Beta Events
        </h1>
        <h1
          className="
    text-[34px]
    font-semibold
    mb-6
    leading-snug
    tracking-tighter
    text-center
    italic
    text-transparent
    bg-gradient-to-r
    from-pink-500
    via-purple-500
    to-blue-500
    bg-clip-text
  "
        >
          Business x Coding
        </h1>





        <Section className="justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-right flex flex-col items-end"
          >
            {/* Project Sprint Card */}
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
              <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/30">
                <Globe className="w-8 h-8 text-pink-500" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase text-white tracking-tighter">
                Project Sprint
              </h2>
              <p className="text-blue-100/50 text-lg font-bold italic mb-2">Technical</p>
              <p className="text-blue-100/50 text-lg font-light">
                From concept to production — a rapid assembly line for building market-ready products.
              </p>
              <button className="mt-6 bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all shadow-md">
              <a
              href="/technical.pdf"
              download
              className="mt-6 bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-md inline-block"
            >
              Know More
            </a>
              </button>
            </div>

          </motion.div>
        </Section>

        <Section>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Marketing Mania Card */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-black mb-4 uppercase text-white tracking-tighter">
                Market-o-Mania
              </h2>
              <p className="text-blue-100/50 text-lg font-bold italic mb-2">Non-Technical</p>
              <p className="text-blue-100/50 text-lg font-light">
                A tactical arena where perception, positioning, and persuasion decide market dominance.
              </p>
              <button className="mt-6 bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-md">
              <a
              href="/nontechnical.pdf"
              download
              className="mt-6 bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-md inline-block"
            >
              Know More
            </a>

              </button>
            </div>
          </motion.div>
        </Section>

        <Section className="justify-center text-center">
          <div className="max-w-4xl md:max-w-6xl mx-auto bg-[#111827] rounded-3xl shadow-2xl p-8 sm:p-12 md:p-20 space-y-10 border border-gray-800 min-h-[400px] sm:min-h-[500px]">

            {/* JOIN LIVE Header */}
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-12 italic text-white tracking-tighter">
              JOIN <span className="text-pink-500">LIVE</span>
            </h2>

            {/* Stats Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {[
    { label: '', val: '13', icon: Wind },
    { label: '', val: '02', icon: Zap },
    { label: '', val: '2026', icon: Building2 }
  ].map((stat, i) => (
    <div
      key={i}
      className="bg-gray-900 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-pink-500/50 transition-all"
    >
      <stat.icon className="w-8 h-8 mb-4 text-pink-500" />
      <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.val}</div>
      <div className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">{stat.label}</div>
    </div>
  ))}
</div> {/* ← GRID ENDS HERE */}

{/* Venue — responsive layout */}
<div className="flex justify-center">
  <div
    className="
      flex flex-col sm:flex-row
      items-center
      gap-2 sm:gap-3
      text-base sm:text-lg md:text-xl
      font-black uppercase tracking-[0.3em]
      text-blue-100/40
    "
  >
    <span className="text-pink-500">Venue:</span>
    <span className="text-white">Edusat Hall</span>
  </div>
</div>



            <button className="px-12 py-6 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full font-black uppercase text-xs tracking-[0.3em] pointer-events-auto shadow-[0_0_40px_rgba(139,92,246,0.3)]">
            <a
            href="/rulebook.pdf"
            download
            className="px-12 py-6 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full font-black uppercase text-xs tracking-[0.3em] pointer-events-auto shadow-[0_0_40px_rgba(139,92,246,0.3)] inline-block"
          >
            <span className="text-white">Download the Rule Book</span>
          </a>

            </button>

          </div>
        </Section>

        <Section className="justify-center" contentClassName="max-w-4xl">
          <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl w-full">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl sm:text-6xl font-black mb-12 text-center text-white tracking-tighter italic">
                Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">Timeline</span>
              </h2>

              {/* Center the timeline container */}
              <div className="w-full">
                <EventTimeline />
              </div>
            </div>
          </div>
        </Section>


      </div>
      <Section className="justify-center text-center mb-12 sm:mb-16">
        <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-xl p-8 md:p-12 space-y-10">

          {/* Contacts Header */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 text-white tracking-tighter">
            Contacts
          </h2>

          {/* Contacts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Sangaresh Waran", role: "Overall Coordinator", location: "+91 8148117181" },
              { name: "Deepthikaa N", role: "Overall Coordinator", location: "+91 6379279629" },
              { name: "Mohammed Aflal", role: "Event Coordinator", location: "+91 9751110206" },
              { name: "Meerthika S R", role: "Event Coordinator", location: "+91 9095111965" },
              { name: "Muthu Muhilan", role: "Event Coordinator", location: "+91 8608978866" },
              { name: "Narmadha D", role: "Event Coordinator", location: "+91 7695937272" },
            ].map((contact, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl hover:border-pink-500/50 transition-all"
              >
                <div className="text-2xl font-bold text-white mb-2">{contact.name}</div>
                <div className="text-sm text-blue-100/50 mb-1">{contact.role}</div>
                <div className="text-xs text-white/30 uppercase tracking-wider">{contact.location}</div>
              </div>
            ))}
          </div>

          {/* Google Map */}
          <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-white/20">
            <iframe
              title="Kamaraj College of Engineering & Technology Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.570803967352!2d77.96171191528119!3d9.673324992744713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b012a8e3d378b53%3A0x15d8265b00bea0df!2sKamaraj%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v170##INSERT_ACTUAL_MAP_ID##!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <p className="text-center text-sm text-white/50 mt-2">
            S.P.G. Chidambara Nadar ‑ C. Nagammal Campus, Virudhunagar, Tamil Nadu 626001, India
          </p>

          {/* Footer */}
          <div className="w-full py-4 bg-black/20 rounded-2xl mt-6 text-center">
            <p className="text-white text-sm sm:text-base font-medium">
              Built by III CSE - B Batch 2023 - 2027
            </p>
          </div>

        </div>
      </Section>



      {/* <GeminiAssistant /> */}

      {/* Side HUD */}
      {/* <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <div 
          key={i} 
          className={`w-[2px] h-12 rounded-full transition-all duration-700 ${
            Math.floor((scrollY / window.innerHeight) + 0.5) === i ? 'bg-pink-500 scale-x-2 shadow-[0_0_15px_#ec4899]' : 'bg-white/10'
          }`} 
        />
      ))}
    </div> */}

      {/* Cinematic Frame */}
      <div className="fixed inset-0 pointer-events-none border-[2rem] border-black/80 z-30 opacity-40"></div>
    </div>
  );
}
