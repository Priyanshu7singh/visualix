import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Sparkles, User, Mail, Lock, CheckCircle2, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/* ── Small labelled input helper ── */
const Field = ({
  id, label, type = 'text', value, onChange, placeholder, icon, required = true, rightSlot,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  icon: React.ReactNode; required?: boolean; rightSlot?: React.ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="block text-xs uppercase tracking-widest mb-2"
      style={{ color: 'rgba(212,175,55,0.6)' }}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'rgba(212,175,55,0.35)' }}>
        {icon}
      </span>
      <input
        id={id} type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        className="w-full pl-10 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.2)' }}
        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.65)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)')}
      />
      {rightSlot && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</span>
      )}
    </div>
  </div>
);

/* ── Password strength bar ── */
const StrengthBar = ({ password }: { password: string }) => {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#22c55e', '#D4AF37'];
  return password ? (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
            style={{ background: i <= score ? colors[score] : 'rgba(255,255,255,0.08)' }} />
        ))}
      </div>
      <span className="text-[10px] tracking-wide" style={{ color: colors[score] }}>
        {labels[score]}
      </span>
    </div>
  ) : null;
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (phone && !/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (!agreed) { setError('Please accept the terms to continue.'); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    // TODO: replace with real registration API call
    setSuccess(true);
    setTimeout(() => navigate('/signin'), 1400);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-stretch" style={{ background: '#000' }}>

      {/* ── Left: Visual Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
        className="hidden md:flex w-[42%] lg:w-[38%] relative overflow-hidden items-center justify-center shrink-0"
        style={{
          background: 'linear-gradient(135deg, #0a0600 0%, #120d02 40%, #1a1104 100%)',
          borderRight: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 60% at 40% 30%, rgba(212,175,55,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(160,120,32,0.08) 0%, transparent 60%)',
        }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mb-8 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}
          >
            ✦ Join Visualix Studio
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            className="mb-8 relative"
            style={{
              width: 260, padding: '28px 24px',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0.4) 100%)',
              borderRadius: 20, border: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.06)',
            }}
          >
            {[
              { icon: '🎬', label: 'Submit your project' },
              { icon: '✨', label: 'We craft your vision' },
              { icon: '🏆', label: 'Deliver premium results' },
            ].map((step, i) => (
              <motion.div key={step.label}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="flex items-center gap-3 mb-4 last:mb-0"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)' }}>
                  {step.icon}
                </div>
                <span className="text-sm text-left" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="font-serif text-2xl text-white mb-3 leading-snug"
          >
            Start Your <span className="shimmer-text">Creative Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Create an account and unlock access to Visualix's premium creative direction and media production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className="flex gap-8 mt-8"
          >
            {[{ val: 'Free', label: 'To Join' }, { val: '2 min', label: 'Setup' }, { val: '100%', label: 'Secure' }].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-lg shimmer-text">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {[...Array(7)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 4 + 2, height: Math.random() * 4 + 2,
              background: 'rgba(212,175,55,0.5)',
              left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`,
            }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 3, delay: Math.random() * 2, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* ── Right: Form Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
        className="flex flex-col justify-center px-8 lg:px-14 py-12 flex-1 overflow-y-auto"
        style={{ background: 'linear-gradient(135deg, rgba(10,8,4,0.99) 0%, rgba(16,12,4,0.98) 100%)' }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-8 flex items-center gap-3"
        >
          <svg width="38" height="38" viewBox="0 0 120 120" fill="none">
            <defs>
              <linearGradient id="gold-reg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7A5C10"/>
                <stop offset="35%" stopColor="#F5E67A"/>
                <stop offset="55%" stopColor="#D4AF37"/>
                <stop offset="100%" stopColor="#7A5C10"/>
              </linearGradient>
            </defs>
            <path d="M 6 20 L 114 20 L 60 110 Z" fill="none" stroke="url(#gold-reg)" strokeWidth="8" strokeLinejoin="round"/>
            <path d="M 36 42 L 58 60 L 36 78 Z" fill="none" stroke="url(#gold-reg)" strokeWidth="10" strokeLinejoin="round"/>
          </svg>
          <span className="font-serif text-lg tracking-[0.22em] shimmer-text">VISUALIX</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-7"
        >
          <h1 className="text-3xl font-serif text-white mb-1.5 leading-tight">
            Create your<br /><span className="shimmer-text">Account</span>
          </h1>
          <p className="text-gray-500 text-sm">Join the Visualix studio — it's free</p>
        </motion.div>

        {/* Alerts */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-5 px-4 py-3 rounded-xl border text-sm"
              style={{ background: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.3)', color: '#f87171' }}
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="mb-5 px-4 py-3 rounded-xl border text-sm flex items-center gap-2"
              style={{ background: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }}
            >
              <Sparkles size={14} /> Account created! Redirecting to sign in…
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
          className="space-y-4"
        >
          <Field id="reg-name" label="Full Name" value={name} onChange={setName}
            placeholder="Your name" icon={<User size={15} />} />

          <Field id="reg-email" label="Email Address" type="email" value={email} onChange={setEmail}
            placeholder="you@example.com" icon={<Mail size={15} />} />

          <Field id="reg-phone" label="Phone Number" type="tel" value={phone}
            onChange={v => setPhone(v.replace(/[^0-9+ \-]/g, ''))}
            placeholder="e.g. 98765 43210"
            icon={<Phone size={15} />}
            required={false}
          />
          <p className="-mt-2 text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Optional — used only for project communication
          </p>


          <div>
            <Field id="reg-password" label="Password" type={showPass ? 'text' : 'password'}
              value={password} onChange={setPassword} placeholder="Min. 8 characters"
              icon={<Lock size={15} />}
              rightSlot={
                <button type="button" onClick={() => setShowPass(v => !v)}
                  style={{ color: 'rgba(212,175,55,0.45)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.45)')}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <StrengthBar password={password} />
          </div>

          <div>
            <Field id="reg-confirm" label="Confirm Password" type={showConfirm ? 'text' : 'password'}
              value={confirm} onChange={setConfirm} placeholder="Repeat password"
              icon={confirm && confirm === password
                ? <CheckCircle2 size={15} style={{ color: '#22c55e' }} />
                : <Lock size={15} />}
              rightSlot={
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  style={{ color: 'rgba(212,175,55,0.45)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.45)')}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            {confirm && confirm !== password && (
              <p className="mt-1 text-[11px]" style={{ color: '#f87171' }}>Passwords don't match</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative mt-0.5">
              <input id="reg-terms" type="checkbox" checked={agreed}
                onChange={e => setAgreed(e.target.checked)} className="sr-only" />
              <div className="w-4 h-4 rounded flex items-center justify-center transition-all"
                style={{
                  background: agreed ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${agreed ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.25)'}`,
                }}>
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#D4AF37" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              I agree to the{' '}
              <a href="#" className="transition-colors" style={{ color: 'rgba(212,175,55,0.7)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.7)')}>
                Terms of Service
              </a>{' '}and{' '}
              <a href="#" className="transition-colors" style={{ color: 'rgba(212,175,55,0.7)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.7)')}>
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit */}
          <motion.button id="reg-submit" type="submit"
            disabled={isLoading || success}
            whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
            className="w-full py-4 rounded-xl font-serif font-bold tracking-widest text-sm flex items-center justify-center gap-2 mt-2"
            style={{
              background: 'linear-gradient(135deg, #7A5C10 0%, #C9962A 35%, #F5E67A 60%, #C9962A 80%, #7A5C10 100%)',
              backgroundSize: '200% auto', color: '#000',
              boxShadow: '0 0 28px rgba(212,175,55,0.28)',
              opacity: isLoading || success ? 0.7 : 1,
            }}
          >
            {isLoading
              ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              : <><span>Create Account</span> <ArrowRight size={15} /></>
            }
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="gold-divider my-5 text-[0.58rem]">OR SIGN UP WITH</div>

        {/* Social */}
        <div className="flex gap-3 justify-center">
          {[
            { id: 'reg-google', label: 'Google', icon: (
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            )},
            { id: 'reg-x', label: 'X', icon: (
              <svg width="16" height="16" viewBox="0 0 1200 1227" fill="white">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
              </svg>
            )},
            { id: 'reg-facebook', label: 'Facebook', icon: (
              <svg width="18" height="18" viewBox="0 0 32 32" fill="#1877F2">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 7.98 5.836 14.601 13.469 15.797V20.625H9.411V16h4.058v-3.47c0-4.01 2.386-6.226 6.043-6.226 1.75 0 3.582.312 3.582.312v3.934h-2.018c-1.988 0-2.606 1.233-2.606 2.498V16h4.435l-.709 4.625h-3.726v11.172C26.164 30.601 32 23.98 32 16c0-8.837-7.163-16-16-16z"/>
              </svg>
            )},
          ].map(s => (
            <motion.button key={s.id} id={s.id} type="button" aria-label={s.label}
              whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-11 rounded-xl transition-all"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.18)' }}
            >
              {s.icon}
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Already have an account?{' '}
          <a href="/signin" className="font-semibold transition-colors"
            style={{ color: 'rgba(212,175,55,0.7)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(212,175,55,0.7)')}>
            Sign In →
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
