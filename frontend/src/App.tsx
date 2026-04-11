import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Music from './pages/Music';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ParticleBackground from './components/ParticleBackground';

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
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Beautiful floating particle backdrop — sits behind everything */}
      <ParticleBackground />

      {/* Ambient glow orbs fixed in the background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full bg-royal-purple/10 blur-[120px] animate-[drift_22s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-royal-gold/8 blur-[100px] animate-[drift_28s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[40%] left-[60%] w-[350px] h-[350px] rounded-full bg-royal-purple/8 blur-[90px] animate-[drift_18s_ease-in-out_infinite_1s]" />
      </div>

      <div className="min-h-screen flex flex-col pt-20 relative z-10">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const Navbar = () => {
  const location = useLocation();
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
    <nav className="fixed top-0 left-0 right-0 h-20 bg-royal-black/80 backdrop-blur-xl border-b border-royal-gold/15 z-50 flex items-center justify-between px-8">
      <motion.div
        className="text-2xl font-serif text-royal-gold flex items-center gap-2"
        whileHover={{ scale: 1.03 }}
      >
        <motion.span
          className="text-3xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          ♛
        </motion.span>
        Visualix
      </motion.div>
      <div className="hidden md:flex gap-6 text-sm uppercase tracking-widest">
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
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-royal-black/90 border-t border-royal-gold/15 py-8 text-center text-gray-400 text-sm relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-royal-gold/3 to-transparent pointer-events-none" />
    <div className="text-xl font-serif text-royal-gold mb-3 relative z-10">♛ Visualix</div>
    <p className="relative z-10">© 2026 Visualix Agency. Crafted with Royal Elegance.</p>
    <a href="/admin" className="absolute bottom-4 right-8 text-royal-gold/30 hover:text-royal-gold transition-colors text-xs flex items-center gap-1 z-10">
      <span className="text-[10px]">🔒</span> Host Access
    </a>
  </footer>
);

export default App;
