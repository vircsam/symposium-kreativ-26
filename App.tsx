
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Wind, Sun, TreeDeciduous, Building2, Zap, ArrowDown, Rocket, Stars, Globe } from 'lucide-react';
import { CityScene } from './components/CityScene';
import { GeminiAssistant } from './components/GeminiAssistant';

const Section = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <section className={`h-screen flex items-center px-6 md:px-24 relative z-10 ${className}`}>
    <div className="max-w-2xl pointer-events-auto">
      {children}
    </div>
  </section>
);

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();
  
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
          <CityScene scrollY={scrollY} />
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
    src="logo.jpeg" 
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
            <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none text-white tracking-tighter">
              Kreativ<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 italic">2026</span>
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
  Events
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
            <div className="w-20 h-20 bg-pink-500/10 rounded-3xl flex items-center justify-center mb-8 border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
              <Globe className="w-10 h-10 text-pink-500" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tighter text-white text-right sm:text-left">
  Project Sprint
</h2>


            <p className="text-blue-100/50 text-xl leading-relaxed max-w-md font-bold italic">
              Technical
            </p>
            <p className="text-blue-100/50 text-xl leading-relaxed max-w-md font-light">
            From concept to code — a rapid assembly line for building market-ready products.
            </p>
            <div className="flex gap-4 pointer-events-auto">
              <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all shadow-xl">
                Know more
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
            <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <Building2 className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tighter text-white text-center sm:text-left">
  Marketing Mania
</h2>


            <p className="text-blue-100/50 text-xl leading-relaxed max-w-md font-bold italic">
              Non-Technical
            </p>

            <p className="text-blue-100/50 text-xl leading-relaxed max-w-md font-light">
            A tactical arena where perception, positioning, and persuasion decide market dominance.
            </p>
            <div className="flex gap-4 pointer-events-auto">
              <button className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-pink-500 hover:text-white transition-all shadow-xl">
                Know More
              </button>
            </div>
          </motion.div>
        </Section>

        <Section className="justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 md:mb-12 italic text-white tracking-tighter">
            JOIN <span className="text-pink-500">LIVE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto justify-center">
              {[
                { label: 'Altitude', val: '13', icon: Wind },
                { label: 'Network', val: '01', icon: Zap },
                { label: 'Nodes', val: '2026', icon: Building2 }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] hover:border-pink-500/50 transition-all group">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-white/20 group-hover:text-pink-500 transition-colors" />
                  <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center justify-center w-full text-center"
          >
            <h2 className="text-3xl sm:text-5xl font-black mb-8 text-white max-w-xl sm:max-w-2xl leading-tight mx-auto">
            THE FRONTIER OF SYMPOSIUMS</h2>
            <p className="text-blue-200/30 mb-12 max-w-lg italic text-lg">
              "We didn't just conduct a symposium. We opened a doorway to the tech world."
            </p>
            <button className="group relative px-12 py-6 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full font-black uppercase text-xs tracking-[0.3em] overflow-hidden pointer-events-auto shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-pink-500/40 transition-shadow">
              <span className="relative z-10 text-white">Download the Rule book</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </motion.div>
        </Section>
      </div>
      <Section className="justify-center text-center">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="w-full"
  >
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-12 text-white tracking-tighter">
      Contacts
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {[
        { name: "Sangaresh waran.", role: "Overall Coordinator", location: "+91 8148117181" },
        { name: "Mohammed Aflal.", role: "Event Coordinator", location: "+91 9751110206" },
        { name: "Meerthika S R.", role: "Event Coordinator", location: "+91 9095111965" },
      ].map((contact, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-2xl hover:border-pink-500/50 transition-all">
          <div className="text-2xl font-bold text-white mb-2">{contact.name}</div>
          <div className="text-sm text-blue-100/50 mb-1">{contact.role}</div>
          <div className="text-xs text-white/30 uppercase tracking-wider">{contact.location}</div>
        </div>
      ))}
    </div>
  </motion.div>

 {/* Google Map Embed */}
 {/* Google Map Section */}
<section className="flex justify-center w-full py-10">
  <div className="w-full max-w-4xl mx-auto">
    <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">Location</h3>
    <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/20">
      <iframe
        title="Kamaraj College of Engineering & Technology Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.570803967352!2d77.96171191528119!3d9.673324992744713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b012a8e3d378b53%3A0x15d8265b00bea0df!2sKamaraj%20College%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v170##INSERT_ACTUAL_MAP_ID##!5m2!1sen!2sin"
        width="100%"
        height="100%"
        className="border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <p className="text-center text-sm text-white/50 mt-2">
      S.P.G. Chidambara Nadar ‑ C. Nagammal Campus, Virudhunagar, Tamil Nadu 626001, India
    </p>
  </div>
</section>

<div className="w-full py-6 mt-12 bg-black text-center">
  <p className="text-white text-sm sm:text-base font-medium">
    Built by III CSE - B Batch 2023 - 2027
  </p>
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
