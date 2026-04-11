import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Testimonials from '../components/Testimonials';
import WordReveal from '../components/WordReveal';

/* ─────────────────────────────────────────────────────────────
   FLOATING RINGS
───────────────────────────────────────────────────────────── */
const RINGS = [
  { size: 520, cx: '50%',  cy: '50%',  delay: 0,  dur: 40, op: 0.045 },
  { size: 320, cx: '-8%',  cy: '15%',  delay: 5,  dur: 28, op: 0.07  },
  { size: 200, cx: '82%',  cy: '68%',  delay: 2,  dur: 22, op: 0.09  },
  { size: 160, cx: '65%',  cy: '-4%',  delay: 8,  dur: 18, op: 0.06  },
  { size: 400, cx: '90%',  cy: '30%',  delay: 3,  dur: 34, op: 0.03  },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────────── */
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const StatItem = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 1600, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-serif text-royal-gold tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-gray-500 text-xs tracking-widest uppercase mt-1">{label}</div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   SERVICE CARDS
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
    ),
    title: 'Video Editing',
    desc: 'Transforming raw footage into high-retention, cinematic masterpieces for top creators.',
    tag: 'Premiere · DaVinci',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    ),
    title: 'Motion Graphics',
    desc: 'Dynamic, royal-quality animations and visual effects that command attention.',
    tag: 'After Effects · C4D',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    ),
    title: 'Music Production',
    desc: "Custom sound design and premium tracks that elevate your brand's sonic identity.",
    tag: 'FL Studio · Ableton',
  },
];

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────────────── */
const Home = () => {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const rawY      = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentY  = useSpring(rawY, { stiffness: 70, damping: 18 });
  const contentOp = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgScale   = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const indicOp   = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const ring0Y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const ring1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ringYs = [ring0Y, ring1Y, ring0Y, ring1Y, ring0Y];

  return (
    <div className="min-h-screen bg-[#050505]">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Grid overlay — Linear-style */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* Noise texture (Stripe-style) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
          }}
        />

        {/* Background video with parallax scale */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: bgScale }}>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]" />
        </motion.div>

        {/* Ambient glow blobs — Arc-style */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full -top-32 -left-32 opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, rgba(212,175,55,1) 0%, transparent 70%)' }} />
          <div className="absolute w-[500px] h-[500px] rounded-full bottom-0 right-0 opacity-[0.05]"
            style={{ background: 'radial-gradient(circle, rgba(109,40,217,1) 0%, transparent 70%)' }} />
        </div>

        {/* Ambient light rays */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div style={{ position:'absolute', top:'-10%', left:'20%', width:'1px', height:'120%',
            background:'linear-gradient(180deg,transparent,rgba(212,175,55,0.09),transparent)',
            transform:'rotate(-28deg)', filter:'blur(14px)',
            animation:'rayA 9s ease-in-out infinite alternate' }} />
          <div style={{ position:'absolute', top:'-10%', right:'25%', width:'1px', height:'120%',
            background:'linear-gradient(180deg,transparent,rgba(109,40,217,0.07),transparent)',
            transform:'rotate(22deg)', filter:'blur(18px)',
            animation:'rayA 13s ease-in-out infinite alternate-reverse' }} />
        </div>

        {/* Floating rings */}
        {RINGS.map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-royal-gold pointer-events-none"
            style={{ width: r.size, height: r.size, left: r.cx, top: r.cy,
              marginLeft: -r.size/2, marginTop: -r.size/2, opacity: r.op, y: ringYs[i] }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: r.dur, ease: 'linear', delay: r.delay }}
          />
        ))}

        {/* ── Hero content ── */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ y: contentY, opacity: contentOp }}
        >
          {/* Badge — Stripe-style pill */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-royal-gold/25
                        bg-royal-gold/5 text-royal-gold/80 text-xs tracking-widest uppercase mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold animate-pulse" />
            Premium Creative Agency · Est. 2022
          </motion.div>

          {/* Crown */}
          <motion.div className="flex justify-center mb-5"
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.215,0.61,0.355,1] }}>
            <span className="text-5xl text-royal-gold animate-float drop-shadow-[0_0_24px_rgba(212,175,55,0.6)]">♛</span>
          </motion.div>

          {/* Headline — word by word */}
          <WordReveal as="h1"
            className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-1"
            delay={0.35} stagger={0.09}>
            Crafting Cinematic
          </WordReveal>
          <WordReveal as="h1"
            className="text-5xl md:text-7xl font-serif leading-[1.15] mb-7"
            delay={0.6} stagger={0.09}>
            Visuals & Sonic Mastery
          </WordReveal>

          {/* Gradient headline text via inline style */}
          <style>{`
            .grad-text { background: linear-gradient(135deg, #d4af37 0%, #f5e8c7 50%, #9b59b6 100%);
              -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            @keyframes rayA { from{opacity:.5;transform:rotate(-28deg) translateX(0)} to{opacity:1;transform:rotate(-28deg) translateX(28px)} }
            @keyframes shimmerCard { from{background-position:200% 0} to{background-position:-200% 0} }
          `}</style>

          {/* Sub-headline */}
          <WordReveal as="p"
            className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            delay={1.05} stagger={0.032}>
            Premium Video Editing Motion Graphics Thumbnail Design & Music Production — 2+ Years Elevating Creators & Brands Worldwide
          </WordReveal>

          {/* CTA row */}
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 0.7, ease: [0.215,0.61,0.355,1] }}>

            {/* Primary — breathing glow */}
            <motion.a href="/portfolio"
              className="px-8 py-3.5 bg-royal-gold text-[#0a0a0a] font-semibold text-sm
                         tracking-wide rounded-full hover:scale-105 transition-transform relative overflow-hidden"
              animate={{ boxShadow: [
                '0 0 20px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0)',
                '0 0 50px rgba(212,175,55,0.7), 0 0 80px rgba(212,175,55,0.2)',
                '0 0 20px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0)',
              ]}}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}>
              Discover Our Craft
              <span className="ml-2">→</span>
            </motion.a>

            {/* Secondary */}
            <a href="/contact"
              className="px-8 py-3.5 border border-white/15 text-gray-300 text-sm tracking-wide
                         rounded-full hover:border-royal-gold/40 hover:text-royal-gold
                         transition-all duration-300 backdrop-blur-sm">
              Start Your Project
            </a>
          </motion.div>

          {/* Social proof micro-line */}
          <motion.p
            className="text-gray-600 text-xs mt-6 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.8 }}>
            Trusted by 100+ creators · 500+ projects delivered
          </motion.p>
        </motion.div>

        {/* Scroll indicator — fades out on scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
          style={{ opacity: indicOp }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}>
          <span className="text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-1">Scroll</span>
          <motion.div className="w-px bg-gradient-to-b from-royal-gold/60 to-transparent"
            initial={{ height: 0 }} animate={{ height: 44 }}
            transition={{ delay: 2.5, duration: 0.7, ease: 'easeOut' }} />
          {[0, 1].map(i => (
            <motion.svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.5" className="text-royal-gold/60"
              style={{ opacity: 1 - i * 0.5 }}
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut', delay: i * 0.2 }}>
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          ))}
        </motion.div>
      </section>

      {/* ══ STATS BAR ══════════════════════════════════════════ */}
      <section className="py-14 border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto px-8 grid grid-cols-3 gap-8">
          <StatItem value={2}   suffix="+"  label="Years of Excellence" />
          <StatItem value={500} suffix="+"  label="Projects Delivered" />
          <StatItem value={100} suffix="+"  label="Creators & Brands" />
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════════════════ */}
      <section className="py-28 px-8 max-w-7xl mx-auto">

        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215,0.61,0.355,1] }}>
          <span className="text-royal-gold/50 text-[11px] tracking-[0.35em] uppercase block mb-3">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            What We <span className="text-royal-gold">Do</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Every deliverable is crafted with cinematic precision and creative obsession.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.14, duration: 0.7, ease: [0.215,0.61,0.355,1] }}>
              <div className="group relative rounded-2xl p-8 h-full border border-white/[0.06]
                              bg-white/[0.02] backdrop-blur-sm hover:-translate-y-1.5
                              transition-all duration-500 overflow-hidden cursor-default">

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                                rounded-2xl bg-gradient-to-br from-royal-gold/5 to-purple-900/5" />

                {/* Top border glow on hover */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent
                                via-royal-gold/0 to-transparent group-hover:via-royal-gold/40
                                transition-all duration-700" />

                {/* Icon */}
                <div className="text-royal-gold mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {s.icon}
                </div>

                <h3 className="text-xl font-serif text-white mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>

                {/* Tool tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                                border border-white/10 text-gray-600 text-[11px] tracking-wide">
                  <span className="w-1 h-1 rounded-full bg-royal-gold/50" />
                  {s.tag}
                </div>

                {/* Bottom accent line reveals on scroll */}
                <motion.div className="absolute bottom-0 left-0 h-px bg-gradient-to-r
                                       from-transparent via-royal-gold/40 to-transparent"
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 0.9, ease: 'easeOut' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════ */}
      <Testimonials />
    </div>
  );
};

export default Home;
