import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Music from './pages/Music';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ParticleBackground from './components/ParticleBackground';
import LoadingScreen from './components/LoadingScreen';

// ── WhatsApp floating button (global) ──
const WHATSAPP_NUMBER = '917458071361';
const WHATSAPP_MESSAGE = 'Hi Visualix! I saw your portfolio and would love to discuss a project. You can also reach me at visualixofficial@gmail.com';

const WhatsAppFAB = () => {
  const [hovered, setHovered] = useState(false);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 3.2, type: 'spring', stiffness: 260, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Popup bubble — visible only on hover ── */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.75, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 8 }}
            transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-full select-none cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #aaff00 0%, #7BEC00 60%, #57d900 100%)',
              boxShadow: '0 6px 32px rgba(100,230,0,0.45), 0 2px 8px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.25)',
              textDecoration: 'none',
            }}
          >
            <span className="text-sm font-black tracking-tight whitespace-nowrap"
              style={{ color: '#0a2200', fontFamily: '"Inter", sans-serif' }}>
              Join our WhatsApp community!
            </span>
            <span className="text-base">🛍️</span>

            {/* Tail pointing down toward button */}
            <span
              className="absolute -bottom-3 right-10"
              style={{
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '12px solid #7BEC00',
              }}
            />
          </motion.a>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Button ── */}
      <motion.a
        id="whatsapp-fab"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="relative flex items-center justify-center w-16 h-16 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #1aad1a 0%, #25D366 50%, #aaff00 100%)',
          boxShadow: hovered
            ? '0 0 0 6px rgba(170,255,0,0.2), 0 8px 32px rgba(37,211,102,0.55)'
            : '0 6px 28px rgba(37,211,102,0.45)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Outer pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ background: 'rgba(170,255,0,0.2)', animationDuration: '2s' }} />

        {/* WhatsApp icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
          <path d="M16.004 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.356.629 4.667 1.82 6.688L2.667 29.333l6.823-1.787A13.27 13.27 0 0 0 16.004 29.333C23.372 29.333 29.333 23.364 29.333 16S23.372 2.667 16.004 2.667zm0 24.133a11.008 11.008 0 0 1-5.632-1.548l-.4-.24-4.053 1.061 1.08-3.952-.264-.408A10.993 10.993 0 0 1 5.001 16c0-6.068 4.936-11.001 11.003-11.001S27.001 9.932 27.001 16s-4.93 10.8-10.997 10.8zm6.036-8.208c-.328-.164-1.944-.956-2.244-1.064-.3-.112-.52-.164-.74.164-.22.324-.848 1.064-.04 1.288-.348-.324-.684-.324-.684-.324s-1.804-.9-3.18-2.276c-.7-.7-.94-1.048-.34-1.48.44-.32.56-.68.56-.68s.188-.488.136-.856c-.052-.368-.484-1.48-.668-2.02-.176-.52-.356-.448-.488-.456-.124-.008-.268-.008-.412-.008s-.376.056-.572.28c-.196.22-.756.736-.756 1.792 0 1.056.776 2.076.884 2.22.104.144 1.528 2.332 3.704 3.272.52.224.924.356 1.24.456.52.164.996.14 1.372.084.42-.06 1.296-.528 1.48-1.04.18-.508.18-.944.124-1.036-.052-.096-.196-.148-.412-.248z" />
        </svg>

        {/* Cursor / arrow badge — top-right of button */}
        <motion.span
          animate={{ rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-sm"
          style={{
            background: 'linear-gradient(135deg, #aaff00, #7BEC00)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
            border: '2px solid white',
          }}
        >
          ↗
        </motion.span>
      </motion.a>
    </motion.div>
  );
};

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1.0] }}
  >
    {children}
  </motion.div>
);

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/music" element={<PageTransition><Music /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LoadingScreen duration={2800} onComplete={() => setLoading(false)} />
      <BrowserRouter>
        {/* Beautiful floating particle backdrop — sits behind everything */}
        <ParticleBackground />

        {/* Ambient glow orbs — gold only, matching brand palette */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-220px] left-[-180px] w-[640px] h-[640px] rounded-full blur-[130px] animate-[drift_22s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[-180px] right-[-120px] w-[520px] h-[520px] rounded-full blur-[110px] animate-[drift_28s_ease-in-out_infinite_reverse]" style={{ background: 'radial-gradient(circle, rgba(160,120,32,0.07) 0%, transparent 70%)' }} />
          <div className="absolute top-[35%] left-[55%] w-[360px] h-[360px] rounded-full blur-[90px] animate-[drift_18s_ease-in-out_infinite_1s]" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
        </div>

        <div className="min-h-screen flex flex-col pt-20 relative z-10">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
        {/* Global WhatsApp floating action button */}
        <WhatsAppFAB />
      </BrowserRouter>
    </>
  );
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/music', label: 'Music' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 z-50 flex items-center px-6 lg:px-8"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,175,55,0.14)' }}>

      {/* Logo — left */}
      <motion.a
        href="/"
        className="flex items-center gap-3 select-none shrink-0"
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <svg width="44" height="44" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gold-grad-nav" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7A5C10" />
              <stop offset="15%" stopColor="#C9962A" />
              <stop offset="35%" stopColor="#FFF4A0" />
              <stop offset="55%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#F5E67A" />
              <stop offset="100%" stopColor="#7A5C10" />
            </linearGradient>
            <filter id="gold-glow-nav" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.7" />
            </filter>
          </defs>
          <g filter="url(#gold-glow-nav)">
            <path d="M 6 20 L 114 20 L 60 110 Z" fill="none" stroke="url(#gold-grad-nav)" strokeWidth="8" strokeLinejoin="round" />
            <path d="M 36 42 L 58 60 L 36 78 Z" fill="none" stroke="url(#gold-grad-nav)" strokeWidth="10" strokeLinejoin="round" />
            <path d="M 63 60 H 65 V 66 A 1.5 1.5 0 0 0 68 66 V 48 A 1.5 1.5 0 0 1 71 48 V 66 A 1.5 1.5 0 0 0 74 66 V 36 A 1.5 1.5 0 0 1 77 36 V 66 A 1.5 1.5 0 0 0 80 66 V 46 A 1.5 1.5 0 0 1 83 46 V 62 A 1.5 1.5 0 0 0 86 62 V 54 A 1.5 1.5 0 0 1 89 54 V 60 A 1.5 1.5 0 0 0 92 60 H 104" fill="none" stroke="url(#gold-grad-nav)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
        <span className="font-serif text-xl tracking-[0.18em] shimmer-text">VISUALIX</span>
      </motion.a>

      {/* Nav links — absolutely centered */}
      <div className="hidden md:flex gap-5 lg:gap-7 text-sm uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
        {links.map(link => {
          const isActive = location.pathname === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`relative transition-colors group ${isActive ? 'text-royal-gold' : 'text-gray-300 hover:text-royal-gold'}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-royal-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </a>
          );
        })}
      </div>

      {/* Sign In button — right */}
      <motion.button
        id="navbar-signin-btn"
        onClick={() => navigate('/signin')}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="ml-auto shrink-0 hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-serif uppercase tracking-widest transition-all"
        style={{
          background: 'linear-gradient(135deg, #7A5C10 0%, #C9962A 40%, #F5E67A 65%, #C9962A 85%, #7A5C10 100%)',
          backgroundSize: '200% auto',
          color: '#000',
          fontWeight: 700,
          boxShadow: '0 0 18px rgba(212,175,55,0.22)',
        }}
      >
        Sign In
      </motion.button>
    </nav>
  );
};

const Footer = () => (
  <footer className="relative overflow-hidden py-12 text-center text-sm" style={{ background: 'rgba(0,0,0,0.95)', borderTop: '1px solid rgba(212,175,55,0.12)' }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 70%)' }} />
    {/* Footer logo */}
    <div className="flex flex-col items-center gap-3 relative z-10">
      <svg width="38" height="38" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gold-grad-foot" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7A5C10" />
            <stop offset="15%" stopColor="#C9962A" />
            <stop offset="35%" stopColor="#FFF4A0" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#F5E67A" />
            <stop offset="100%" stopColor="#7A5C10" />
          </linearGradient>
          <filter id="gold-glow-foot" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.9" />
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.7" />
          </filter>
        </defs>
        <g filter="url(#gold-glow-foot)">
          <path d="M 6 20 L 114 20 L 60 110 Z" fill="none" stroke="url(#gold-grad-foot)" strokeWidth="8" strokeLinejoin="round" />
          <path d="M 36 42 L 58 60 L 36 78 Z" fill="none" stroke="url(#gold-grad-foot)" strokeWidth="10" strokeLinejoin="round" />
          <path d="M 63 60 H 65 V 66 A 1.5 1.5 0 0 0 68 66 V 48 A 1.5 1.5 0 0 1 71 48 V 66 A 1.5 1.5 0 0 0 74 66 V 36 A 1.5 1.5 0 0 1 77 36 V 66 A 1.5 1.5 0 0 0 80 66 V 46 A 1.5 1.5 0 0 1 83 46 V 62 A 1.5 1.5 0 0 0 86 62 V 54 A 1.5 1.5 0 0 1 89 54 V 60 A 1.5 1.5 0 0 0 92 60 H 104" fill="none" stroke="url(#gold-grad-foot)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      <div className="font-serif tracking-[0.22em] text-sm shimmer-text">VISUALIX</div>
      <div className="text-[0.6rem] tracking-[0.28em] uppercase" style={{ color: 'rgba(212,175,55,0.45)' }}>Video · Motion · Sound</div>
    </div>
    <p className="mt-6 relative z-10" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>© 2026 Visualix Agency. All Rights Reserved.</p>
    <a href="/admin" className="absolute bottom-4 right-8 transition-colors z-10" style={{ color: 'rgba(212,175,55,0.18)' }} aria-label="Admin">
      <span className="text-[11px]">🔒</span>
    </a>
  </footer>
);

export default App;
