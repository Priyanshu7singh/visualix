import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo: simulate a sign-in (replace with real API call as needed)
    await new Promise(r => setTimeout(r, 1400));

    if (email && password) {
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } else {
      setError('Please enter your email and password.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-stretch" style={{ background: '#000' }}>

      {/* ── Left: Form Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        className="flex flex-col justify-center px-10 py-16 w-full md:w-[48%] lg:w-[42%] relative z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(10,8,4,0.98) 0%, rgba(16,12,4,0.97) 100%)',
          borderRight: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        {/* Top brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-10 flex items-center gap-3"
        >
          <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gold-si" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7A5C10"/>
                <stop offset="35%" stopColor="#F5E67A"/>
                <stop offset="55%" stopColor="#D4AF37"/>
                <stop offset="100%" stopColor="#7A5C10"/>
              </linearGradient>
            </defs>
            <path d="M 6 20 L 114 20 L 60 110 Z" fill="none" stroke="url(#gold-si)" strokeWidth="8" strokeLinejoin="round"/>
            <path d="M 36 42 L 58 60 L 36 78 Z" fill="none" stroke="url(#gold-si)" strokeWidth="10" strokeLinejoin="round"/>
          </svg>
          <span className="font-serif text-lg tracking-[0.22em] shimmer-text">VISUALIX</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif text-white mb-2 leading-tight">Welcome<br /><span className="shimmer-text">Back</span></h1>
          <p className="text-gray-500 text-sm tracking-wide">Sign in to your Visualix account</p>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="mb-5 px-4 py-3 rounded-xl border text-sm"
              style={{
                background: 'rgba(239,68,68,0.08)',
                borderColor: 'rgba(239,68,68,0.3)',
                color: '#f87171',
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 px-4 py-3 rounded-xl border text-sm flex items-center gap-2"
              style={{
                background: 'rgba(212,175,55,0.1)',
                borderColor: 'rgba(212,175,55,0.4)',
                color: '#D4AF37',
              }}
            >
              <Sparkles size={15} /> Signed in! Redirecting…
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: 'rgba(212,175,55,0.6)' }}>
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)')}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs uppercase tracking-widest" style={{ color: 'rgba(212,175,55,0.6)' }}>
                Password
              </label>
              <a
                href="#"
                className="text-xs transition-colors"
                style={{ color: 'rgba(212,175,55,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.55)')}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="signin-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)')}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'rgba(212,175,55,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.45)')}
              >
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            id="signin-submit"
            type="submit"
            disabled={isLoading || success}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="w-full py-4 rounded-xl font-serif font-bold tracking-widest text-sm relative overflow-hidden flex items-center justify-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg, #7A5C10 0%, #C9962A 35%, #F5E67A 60%, #C9962A 80%, #7A5C10 100%)',
              backgroundSize: '200% auto',
              color: '#000',
              boxShadow: '0 0 28px rgba(212,175,55,0.3)',
            }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="gold-divider my-6 text-[0.6rem]"
        >
          OR CONTINUE WITH
        </motion.div>

        {/* Social buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex gap-3 justify-center"
        >
          {[
            {
              id: 'signin-google',
              label: 'Google',
              icon: (
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              ),
            },
            {
              id: 'signin-x',
              label: 'X',
              icon: (
                <svg width="16" height="16" viewBox="0 0 1200 1227" fill="white">
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
                </svg>
              ),
            },
            {
              id: 'signin-facebook',
              label: 'Facebook',
              icon: (
                <svg width="18" height="18" viewBox="0 0 32 32" fill="#1877F2">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 7.98 5.836 14.601 13.469 15.797V20.625H9.411V16h4.058v-3.47c0-4.01 2.386-6.226 6.043-6.226 1.75 0 3.582.312 3.582.312v3.934h-2.018c-1.988 0-2.606 1.233-2.606 2.498V16h4.435l-.709 4.625h-3.726v11.172C26.164 30.601 32 23.98 32 16c0-8.837-7.163-16-16-16z"/>
                </svg>
              ),
            },
          ].map(s => (
            <motion.button
              key={s.id}
              id={s.id}
              type="button"
              whileHover={{ scale: 1.07, borderColor: 'rgba(212,175,55,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-12 rounded-xl transition-all"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(212,175,55,0.18)',
              }}
              aria-label={s.label}
            >
              {s.icon}
            </motion.button>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="text-center text-xs mt-8"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Don't have an account?{' '}
          <a
            href="/register"
            className="transition-colors font-semibold"
            style={{ color: 'rgba(212,175,55,0.7)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.7)')}
          >
            Register for free →
          </a>
        </motion.p>
      </motion.div>

      {/* ── Right: Visual Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
        className="hidden md:flex flex-1 relative overflow-hidden items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0a0600 0%, #120d02 40%, #1a1104 100%)',
        }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 60% 30%, rgba(212,175,55,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(160,120,32,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content card */}
        <div className="relative z-10 flex flex-col items-center text-center px-12">
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: '#D4AF37',
            }}
          >
            ✦ Premium Creative Studio
          </motion.div>

          {/* Illustration frame */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="relative mb-8"
            style={{
              width: 280,
              height: 340,
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0.4) 100%)',
              borderRadius: 24,
              border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 80px rgba(212,175,55,0.08)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Camera icon illustration */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-28 h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                  <path d="M23 7l-7 5 7 5V7z" fill="rgba(212,175,55,0.7)"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="rgba(212,175,55,0.4)" stroke="rgba(212,175,55,0.8)" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="space-y-2">
                {[80, 60, 70].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full mx-auto" style={{ width: w, background: 'rgba(212,175,55,0.2)' }} />
                ))}
              </div>
            </div>

            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-serif text-2xl text-white mb-3 leading-snug"
          >
            Craft Visual{' '}
            <span className="shimmer-text">Masterpieces</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: 'rgba(255,255,255,0.38)' }}
          >
            Join the Visualix studio — where cinematic storytelling meets premium creative direction.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-8 mt-8"
          >
            {[
              { val: '500+', label: 'Projects' },
              { val: '98%', label: 'Satisfaction' },
              { val: '50+', label: 'Clients' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-xl shimmer-text">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: 'rgba(212,175,55,0.5)',
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SignIn;
