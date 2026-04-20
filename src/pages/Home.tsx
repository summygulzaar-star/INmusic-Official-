import React, { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Music, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Play,
  Instagram,
  Youtube,
  Apple,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  MessageCircle,
  CheckCircle2
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useGLTF, Html } from "@react-three/drei";
import { cn } from "../lib/utils";
import { LoadingSpinner } from "../components/ui/Loading";

const PLATFORMS = [
  { name: "Spotify", gradient: "from-[#1DB954] to-[#1ed760]" },
  { name: "Apple Music", gradient: "from-[#fc3c44] to-[#fa243c]" },
  { name: "YouTube", gradient: "from-[#ff0000] to-[#cc0000]" },
  { name: "Instagram", gradient: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]" },
  { name: "Amazon Music", gradient: "from-[#ff9900] to-[#ffb700]" },
  { name: "TikTok", gradient: "from-[#00f2ea] to-[#ff0050]" },
  { name: "JioSaavn", gradient: "from-[#00b0f0] to-[#0089bd]" },
  { name: "Gaana", gradient: "from-[#e72c33] to-[#ff5252]" },
  { name: "Wynk", gradient: "from-[#ff2d55] to-[#ff3b30]" },
  { name: "Hungama", gradient: "from-[#f16322] to-[#ffb347]" }
];

function VinylRecord() {
  const vinylRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (vinylRef.current) {
      vinylRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group rotation={[0.4, -0.2, 0]}>
      {/* Vinyl Disc */}
      <mesh ref={vinylRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.05, 64]} />
        <meshStandardMaterial 
          color="#080808" 
          roughness={0.15} 
          metalness={0.9} 
        />
        
        {/* Subtle Grooves */}
        <mesh position={[0, 0.03, 0]}>
          <ringGeometry args={[0.6, 2.4, 64]} />
          <meshStandardMaterial 
            color="#111" 
            transparent 
            opacity={0.4} 
            roughness={0.5}
          />
        </mesh>
      </mesh>

      {/* Glossy Center Label */}
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.01, 32]} />
        <meshStandardMaterial color="#0066FF" emissive="#0022FF" emissiveIntensity={2} />
      </mesh>

      {/* Center Hole */}
      <mesh position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#000" />
      </mesh>

      {/* Neon Rim Glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[2.52, 2.6, 64]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function ParticleGlow() {
  const points = useRef<THREE.Points>(null);
  const count = 200;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
      points.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#0066FF" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function OrbitingLogos() {
  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg", radius: 4, speed: 0.4, delay: 0 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_Music_logo.svg", radius: 4.5, speed: 0.3, delay: 1.2 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", radius: 5, speed: 0.25, delay: 2.5 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg", radius: 3.8, speed: 0.35, delay: 0.8 },
  ];

  return (
    <>
      {logos.map((logo, i) => (
        <Float 
          key={i} 
          speed={1.5} 
          rotationIntensity={0.5} 
          floatIntensity={1}
          position={[
            Math.cos(i * (Math.PI * 2 / logos.length)) * logo.radius,
            Math.sin(i * (Math.PI * 2 / logos.length)) * 1.5,
            Math.sin(i * (Math.PI * 2 / logos.length)) * logo.radius / 2
          ]}
        >
          <Html distanceFactor={10}>
            <div className="w-16 h-16 glass rounded-2xl p-3 flex items-center justify-center hover:scale-125 transition-transform duration-500 cursor-pointer shadow-2xl">
              <img src={logo.src} alt="DSP" className="w-full h-full object-contain pointer-events-none" referrerPolicy="no-referrer" />
            </div>
          </Html>
        </Float>
      ))}
    </>
  );
}



export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-brand-blue/10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center rotate-12 shadow-[0_0_20px_rgba(0,102,255,0.4)]">
            <Music className="text-white w-6 h-6 -rotate-12" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter text-brand-dark">IND<span className="text-brand-blue">.</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/40">
          <Link to="/features" className="hover:text-brand-blue transition-all">Features</Link>
          <a href="#pricing" className="hover:text-brand-blue transition-all">Pricing</a>
          <a href="#platforms" className="hover:text-brand-blue transition-all">Platforms</a>
          <a href="#contact" className="hover:text-brand-blue transition-all">Contact</a>
          <a href="#" className="hover:text-brand-blue transition-all">Support</a>
        </div>

        <div className="flex items-center gap-8">
          <Link to="/auth?mode=login" className="text-xs font-black uppercase tracking-widest text-brand-dark/60 hover:text-brand-blue transition-all">Login</Link>
          <Link to="/auth?mode=signup" className="px-8 py-3 bg-brand-dark text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 shadow-xl transition-all">
            Join IND
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="w-full min-h-screen grid lg:grid-cols-2 items-center px-6 lg:px-20 relative pt-24 overflow-hidden"
      >
        {/* Abstract Light Streaks Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-blue/10 blur-[160px] rounded-full"
          ></motion.div>
          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/10 blur-[160px] rounded-full"
          ></motion.div>
        </div>

        {/* LEFT CONTENT */}
        <div className="relative z-10 py-12 will-change-transform">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/5 border border-brand-blue/10 mb-8 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-brand-blue" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">Premier Distribution</span>
            </div>
            
            <h1 className="text-6xl lg:text-[7.5rem] font-black lg:leading-[0.85] tracking-[-0.04em] font-display text-brand-dark mb-10">
              DISTRIBUTE YOUR <br />
              <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-pink-500 text-transparent bg-clip-text animate-gradient inline-block">
                MUSIC WORLDWIDE
              </span>
            </h1>

            <p className="mt-4 text-brand-dark/40 text-lg lg:text-xl font-medium leading-relaxed max-w-lg mb-12">
              Deliver your music like a pro across 250+ platforms with real-time tracking, AI-powered insights, and lightning-fast royalties.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/auth?mode=signup" 
                className="group relative px-10 py-5 bg-black text-white rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(0,102,255,0.2)]"
              >
                <div className="absolute inset-0 bg-linear-to-r from-brand-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 font-black text-xs uppercase tracking-[0.3em]">Launch Your Career →</span>
              </Link>
              
              <button className="flex items-center gap-4 px-10 py-5 bg-white border border-brand-dark/5 rounded-2xl hover:border-brand-dark/20 hover:bg-brand-light transition-all duration-300 font-black text-xs uppercase tracking-[0.3em] group shadow-sm hover:shadow-md">
                <div className="w-8 h-8 bg-brand-dark rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </div>
                See Process
              </button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT 3D SCENE */}
        <div className="h-[600px] lg:h-screen relative perspective-[2000px] will-change-transform">
          <div className="absolute inset-0 z-0">
            <Canvas 
              camera={{ position: [0, 0, 15], fov: 40 }}
              onCreated={({ gl }) => {
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.outputColorSpace = THREE.SRGBColorSpace;
              }}
            >
              <ambientLight intensity={0.4} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
              <pointLight position={[-10, -10, -10]} intensity={1} color="#7c3aed" />
              <pointLight position={[10, 5, 5]} intensity={3} color="#0066FF" />
              
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <VinylRecord />
                <OrbitingLogos />
              </Float>

              {/* Particle Background */}
              <ParticleGlow />
            </Canvas>
          </div>
          
          {/* Subtle Mouse Interaction Layer (Simulated via overlay for now) */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center lg:justify-end lg:pr-20 pointer-events-none">
             <div className="glass px-6 py-3 rounded-full flex items-center gap-3 animate-bounce">
                <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping"></div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Interactive 3D Engine Active</span>
             </div>
          </div>
        </div>
      </section>

      {/* Partners/Platforms */}
      <section id="platforms" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-16 underline decoration-blue-500/30 underline-offset-8">Distribute to all major platforms</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 items-center">
            {PLATFORMS.map((p, i) => (
              <motion.div 
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.15, y: -5 }}
                className="group cursor-pointer relative"
              >
                 <span className={cn(
                   "font-display text-2xl md:text-5xl font-black uppercase tracking-tight transition-all duration-300",
                   "bg-gradient-to-r text-transparent bg-clip-text opacity-30 group-hover:opacity-100",
                   "drop-shadow-sm group-hover:drop-shadow-xl",
                   p.gradient
                 )}>
                    {p.name}
                 </span>
                 <div className={cn(
                   "absolute -bottom-3 left-0 w-0 h-1.5 bg-gradient-to-r rounded-full transition-all duration-500 group-hover:w-full",
                   p.gradient
                 )}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="py-32 px-6 bg-brand-light relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-blue/10 mb-6"
              >
                <Zap className="w-4 h-4 text-brand-blue" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">Platform Features</span>
              </motion.div>
              <h2 className="font-display text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                CRAFTED FOR <br />
                <span className="text-gradient">INDEPENDENT</span> <br />
                EXCELLENCE
              </h2>
            </div>
            <p className="text-brand-dark/50 max-w-md text-lg font-light leading-relaxed mb-4">
              We've built the most comprehensive toolkit for modern musicians. From pixel-perfect distribution to deep data insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {/* Feature 1: Worldwide Distribution (Large) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6 lg:col-span-8 group relative overflow-hidden rounded-[4rem] glass p-12 border-none transition-all duration-500 hover:shadow-2xl hover:shadow-brand-blue/5"
            >
              <div className="flex flex-col h-full justify-between gap-12">
                <div>
                  <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center text-white shadow-lg mb-8 rotate-3 transition-transform group-hover:rotate-12">
                    <Globe className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-black font-display mb-4">250+ GLOBAL STORES</h3>
                  <p className="text-brand-dark/60 text-lg font-light max-w-md">Your music everywhere. From Spotify and Apple Music to TikTok, Instagram, and regional giants like JioSaavn.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Spotify", "Apple Music", "TikTok", "Amazon", "Deezer", "Tidal", "Pandora", "Boomplay"].map(s => (
                    <span key={s} className="px-5 py-2 rounded-full bg-brand-dark/5 text-xs font-bold uppercase tracking-wider">{s}</span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-64 h-64 rotate-12" />
              </div>
            </motion.div>

            {/* Feature 2: Analytics (Vertical Slim) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-6 lg:col-span-4 rounded-[4rem] bg-brand-dark p-12 text-white relative overflow-hidden group border-none"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md mb-8">
                    <BarChart3 className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="text-4xl font-black font-display mb-4">REAL-TIME DATA</h3>
                  <p className="text-white/60 font-light leading-relaxed">Daily trend reports and deep analytics on who's listening and where they are located.</p>
                </div>
                <div className="mt-8 space-y-4">
                  {[45, 80, 60].map((w, i) => (
                    <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${w}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className="h-full bg-linear-to-r from-brand-blue to-brand-purple"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-linear-to-br from-brand-blue/20 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Feature 3: Rights Management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-3 lg:col-span-4 rounded-[4rem] glass p-10 group border-none"
            >
              <div className="w-14 h-14 bg-brand-purple rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-4 uppercase">CONTENT ID & RIGHTS</h3>
              <p className="text-brand-dark/50 font-light text-sm leading-relaxed">Official protection for your audio on YouTube, Facebook, and Instagram. Never lose a cent on unauthorized usage.</p>
            </motion.div>

            {/* Feature 4: Fast Approval */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 lg:col-span-4 rounded-[4rem] glass p-10 group border-none bg-brand-blue/5"
            >
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-4 uppercase">24HR APPROVAL</h3>
              <p className="text-brand-dark/50 font-light text-sm leading-relaxed">Our dedicated review team ensures your release is perfect and approved for delivery within 24 hours.</p>
            </motion.div>

            {/* Feature 5: Artist Development */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-6 lg:col-span-4 rounded-[4rem] glass p-10 group border-none overflow-hidden relative"
            >
              <div className="relative z-10">
                 <div className="w-14 h-14 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                  <Play className="w-6 h-6 fill-white" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-4 uppercase">OAC & VEVO</h3>
                <p className="text-brand-dark/50 font-light text-sm leading-relaxed">Upgrade to an Official Artist Channel on YouTube and get your music videos on Vevo worldwide.</p>
              </div>
              <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Youtube className="w-20 h-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-40 px-6 bg-brand-dark text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-brand-blue/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-brand-purple/20 blur-[130px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Fair & Transparent</span>
            </motion.div>
            <h2 className="font-display text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              SIMPLE <span className="text-brand-blue">PRICING</span> <br />
              GLOBAL <span className="text-brand-purple">REACH</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-lg font-light">Choose the plan that fits your career stage. No hidden fees, just pure growth.</p>
          </div>
 
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {[
              { name: "Artist", price: "299", features: ["Single Artist Dashboard", "Unlimited Uploads", "85% Royalties", "15 Days Standard Support"], popular: false, color: "from-blue-500/20" },
              { name: "Pro Label", price: "999", features: ["Up to 10 Artists", "Priority Approval", "90% Royalties", "Vevo Channel & OAC", "YouTube Content ID", "Dedicated Support"], popular: true, color: "from-brand-blue" },
              { name: "Enterprise", price: "2,499", features: ["Unlimited Artists", "95% Royalties", "White Label Options", "Custom UPC/ISRC", "Dedicated Manager", "Direct Editorial Pitching"], popular: false, color: "from-purple-500/20" }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={cn(
                  "relative p-12 rounded-[4rem] border transition-all duration-700 flex flex-col items-center text-center",
                  p.popular 
                    ? "bg-brand-blue border-white/20 shadow-[0_0_100px_rgba(0,102,255,0.3)] scale-105 z-20" 
                    : "bg-white/5 border-white/10 backdrop-blur-3xl hover:bg-white/10"
                )}
              >
                {p.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-brand-blue px-8 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-3xl font-black font-display mb-2 uppercase tracking-tight">{p.name}</h3>
                <div className="flex items-baseline mb-10">
                  <span className="text-5xl font-black">₹{p.price}</span>
                  <span className="opacity-60 text-sm ml-2">/ YEAR</span>
                </div>

                <div className="w-full h-px bg-white/10 mb-10"></div>

                <ul className="space-y-6 mb-12 text-sm font-light text-left w-full">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", p.popular ? "bg-white/20" : "bg-brand-blue/20")}>
                        <ShieldCheck className={cn("w-3 h-3", p.popular ? "text-white" : "text-brand-blue")} />
                      </div>
                      <span className="opacity-80 tracking-wide">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/auth?mode=signup" 
                  className={cn(
                    "w-full py-6 rounded-3xl font-black uppercase tracking-widest text-sm transition-all duration-300",
                    p.popular 
                      ? "bg-white text-brand-blue hover:scale-[1.02] active:scale-95 shadow-2xl" 
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                  )}
                >
                  Start with {p.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left side: Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-brand-light/50 p-8 md:p-12 rounded-[3.5rem] border border-brand-dark/5 backdrop-blur-sm"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/5 border border-brand-blue/10 mb-8">
                <MessageSquare className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue">Contact Support</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-[1] mb-8">
                READY TO <br />
                <span className="text-gradient">CONNECT?</span>
              </h2>
              
              <p className="text-brand-dark/50 text-base font-light leading-relaxed mb-10">
                Our support team is active **Mon - Sat (10am - 7pm)** to help you with your distribution needs.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: "Email Us", value: "musicdistributionindia.in@gmail.com", href: "mailto:musicdistributionindia.in@gmail.com" },
                  { icon: Phone, label: "Official Line", value: "011-69652811", href: "tel:01169652811" },
                  { icon: MessageCircle, label: "Direct WhatsApp", value: "+91 7742789827", href: "https://wa.me/917742789827" }
                ].map((item, i) => (
                  <a key={i} href={item.href} className="flex gap-5 items-center group">
                    <div className="w-11 h-11 rounded-xl bg-white border border-brand-dark/5 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm">
                      <item.icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-brand-dark/30 mb-0.5">{item.label}</p>
                      <p className="text-base font-bold text-brand-dark group-hover:text-[#25D366] transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <motion.a
                href="https://wa.me/917742789827"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-5 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            {/* Right side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-8 md:p-12 rounded-[3.5rem] relative z-10 border-none shadow-2xl shadow-brand-blue/5 overflow-hidden"
            >
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-[400px] flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-black font-display text-brand-dark mb-4">MESSAGE TRANSMITTED</h3>
                  <p className="text-brand-dark/50 font-medium">Our neural network has received your inquiry. A specialist will touch base shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe" 
                        className="w-full px-6 py-4 bg-brand-light border border-transparent rounded-2xl focus:border-brand-blue focus:bg-white outline-none transition-all font-medium text-brand-dark"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-6 py-4 bg-brand-light border border-transparent rounded-2xl focus:border-brand-blue focus:bg-white outline-none transition-all font-medium text-brand-dark"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-2">Subject</label>
                      <select className="w-full px-6 py-4 bg-brand-light border border-transparent rounded-2xl focus:border-brand-blue focus:bg-white outline-none transition-all font-medium text-brand-dark appearance-none">
                        <option>Account Support</option>
                        <option>Distribution Query</option>
                        <option>Royalties & Payments</option>
                        <option>Marketing Services</option>
                      </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-2">Your Message</label>
                    <textarea 
                      required
                      rows={4} 
                      placeholder="How can we help you?" 
                      className="w-full px-6 py-4 bg-brand-light border border-transparent rounded-2xl focus:border-brand-blue focus:bg-white outline-none transition-all font-medium text-brand-dark resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={formState === 'loading'}
                    type="submit" 
                    className="w-full py-6 bg-brand-dark text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-blue hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-brand-blue/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {formState === 'loading' ? (
                      <>
                        <LoadingSpinner size="sm" className="!border-white/20 !border-t-white" />
                        Synchronizing...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-brand-dark/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center rotate-12 shadow-lg">
                <Music className="text-white w-6 h-6 -rotate-12" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tighter">IND Distribution</span>
            </div>
            <p className="text-brand-dark/50 max-w-sm font-light">Join the revolution of music distribution. Empowering 50k+ independent artists across Asia.</p>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-brand-dark/50 font-light">
               <li><Link to="/features" className="hover:text-brand-blue">Features</Link></li>
               <li><a href="#distribution" className="hover:text-brand-blue">Distribution</a></li>
               <li><a href="#" className="hover:text-brand-blue">Marketing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
            <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer"><Instagram className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer"><Youtube className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all cursor-pointer"><MessageCircle className="w-5 h-5" /></div>
               <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all cursor-pointer"><Apple className="w-5 h-5" /></div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase font-bold text-brand-dark/30">
          <p>© 2026 IND Distribution BY SK JI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
