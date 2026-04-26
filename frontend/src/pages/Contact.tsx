import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Youtube, Clock, Send, ChevronDown, MessageCircle, Twitter } from 'lucide-react';
import axios from 'axios';

/* ── Reusable field label ── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.18em] mb-2"
    style={{ color: 'rgba(212,175,55,0.65)' }}>
    {children}
  </p>
);

/* ── Input style shared ── */
const inputCls = "w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none transition-all duration-300";
const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(212,175,55,0.18)',
};
const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)');
const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
  (e.currentTarget.style.borderColor = 'rgba(212,175,55,0.18)');

/* ── Social link row ── */
const SocialRow = ({
  href, icon, label, sub, iconBg,
}: {
  href: string; icon: React.ReactNode; label: string; sub?: string; iconBg: string;
}) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer"
    whileHover={{ x: 4, borderColor: 'rgba(212,175,55,0.45)' }}
    className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all cursor-pointer"
    style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(212,175,55,0.12)',
    }}
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: iconBg }}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-white leading-tight">{label}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>}
    </div>
    <svg className="ml-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M7 3l4 4-4 4" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </motion.a>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', projectType: 'Select a topic…', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.projectType === 'Select a topic…') return;
    setStatus('submitting');
    axios.post('/api/v1/contact', { ...formData })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  };

  return (
    <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">

      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
        className="mb-14 text-center"
      >
        <span className="section-tag mb-4">✦ Get In Touch</span>
        <h1 className="text-5xl lg:text-6xl font-serif text-white mt-4 mb-4">
          Start Your <span className="shimmer-text">Project</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Ready to bring your vision to life? Drop us a message and we'll get back to you within 2 hours.
        </p>
      </motion.div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

        {/* ══ LEFT: Contact form ══ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="glass-panel rounded-3xl p-16 text-center"
              >
                <div className="text-7xl mb-6">🎉</div>
                <h3 className="text-3xl font-serif text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 mb-8">We'll be in touch shortly to discuss your project.</p>
                <motion.button
                  type="button" onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', projectType: 'Select a topic…', message: '' }); }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="px-8 py-3 rounded-full font-serif font-bold text-sm tracking-widest"
                  style={{
                    background: 'linear-gradient(135deg, #7A5C10, #F5E67A, #7A5C10)',
                    color: '#000',
                    boxShadow: '0 0 24px rgba(212,175,55,0.3)',
                  }}
                >
                  Send Another →
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-panel rounded-3xl p-8 lg:p-10 space-y-5"
              >
                {/* Name */}
                <div>
                  <Label>Your Name</Label>
                  <input
                    id="contact-name" type="text" required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    className={inputCls} style={{ ...inputStyle }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />
                </div>

                {/* Email */}
                <div>
                  <Label>Email Address</Label>
                  <input
                    id="contact-email" type="email" required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@email.com"
                    className={inputCls} style={{ ...inputStyle }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />
                </div>

                {/* Subject dropdown */}
                <div>
                  <Label>Subject</Label>
                  <div className="relative">
                    <select
                      id="contact-subject"
                      value={formData.projectType}
                      onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                      className={`${inputCls} appearance-none cursor-pointer pr-10`}
                      style={{ ...inputStyle }}
                      onFocus={focusBorder} onBlur={blurBorder}
                    >
                      <option disabled>Select a topic…</option>
                      <option>Video Editing</option>
                      <option>Motion Graphics</option>
                      <option>Thumbnail Design</option>
                      <option>Music Production</option>
                      <option>Brand Identity</option>
                      <option>Social Media Content</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ color: 'rgba(212,175,55,0.5)' }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <Label>Message</Label>
                  <textarea
                    id="contact-message" required rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help…"
                    className={`${inputCls} resize-none`}
                    style={{ ...inputStyle }}
                    onFocus={focusBorder} onBlur={blurBorder}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>
                )}

                {/* Submit */}
                <motion.button
                  id="contact-submit" type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
                  className="w-full py-4 rounded-xl font-serif font-bold tracking-widest text-sm flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #7A5C10 0%, #C9962A 35%, #F5E67A 60%, #C9962A 80%, #7A5C10 100%)',
                    backgroundSize: '200% auto',
                    color: '#000',
                    boxShadow: '0 0 28px rgba(212,175,55,0.3)',
                    opacity: status === 'submitting' ? 0.7 : 1,
                  }}
                >
                  {status === 'submitting'
                    ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    : <><Send size={15} /> Send Message</>
                  }
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ══ RIGHT: Info panel ══ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Social links */}
          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: 'rgba(212,175,55,0.5)' }}>
              Find Us Online
            </p>

            <SocialRow
              href="mailto:visualixofficial@gmail.com"
              icon={<Mail size={18} style={{ color: '#fff' }} />}
              iconBg="linear-gradient(135deg, #EA4335, #c0392b)"
              label="visualixofficial@gmail.com"
              sub="Email us anytime"
            />
            <SocialRow
              href="https://wa.me/917458071361"
              icon={
                <svg width="18" height="18" viewBox="0 0 32 32" fill="white">
                  <path d="M16.004 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.356.629 4.667 1.82 6.688L2.667 29.333l6.823-1.787A13.27 13.27 0 0 0 16.004 29.333C23.372 29.333 29.333 23.364 29.333 16S23.372 2.667 16.004 2.667zm0 24.133a11.008 11.008 0 0 1-5.632-1.548l-.4-.24-4.053 1.061 1.08-3.952-.264-.408A10.993 10.993 0 0 1 5.001 16c0-6.068 4.936-11.001 11.003-11.001S27.001 9.932 27.001 16s-4.93 10.8-10.997 10.8zm6.036-8.208c-.328-.164-1.944-.956-2.244-1.064-.3-.112-.52-.164-.74.164-.22.324-.848 1.064-.04 1.288-.348-.324-.684-.324-.684-.324s-1.804-.9-3.18-2.276c-.7-.7-.94-1.048-.34-1.48.44-.32.56-.68.56-.68s.188-.488.136-.856c-.052-.368-.484-1.48-.668-2.02-.176-.52-.356-.448-.488-.456-.124-.008-.268-.008-.412-.008s-.376.056-.572.28c-.196.22-.756.736-.756 1.792 0 1.056.776 2.076.884 2.22.104.144 1.528 2.332 3.704 3.272.52.224.924.356 1.24.456.52.164.996.14 1.372.084.42-.06 1.296-.528 1.48-1.04.18-.508.18-.944.124-1.036-.052-.096-.196-.148-.412-.248z"/>
                </svg>
              }
              iconBg="linear-gradient(135deg, #128C7E, #25D366)"
              label="WhatsApp"
              sub="+91 74580 71361"
            />
            <SocialRow
              href="https://instagram.com/visualixofficial"
              icon={<Instagram size={18} style={{ color: '#fff' }} />}
              iconBg="linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)"
              label="@visualixofficial"
              sub="Instagram"
            />
            <SocialRow
              href="https://youtube.com/@visualixofficial"
              icon={<Youtube size={18} style={{ color: '#fff' }} />}
              iconBg="linear-gradient(135deg, #FF0000, #cc0000)"
              label="Visualix"
              sub="YouTube Channel"
            />
            <SocialRow
              href="https://twitter.com/visualixofficial"
              icon={<Twitter size={18} style={{ color: '#fff' }} />}
              iconBg="linear-gradient(135deg, #1DA1F2, #0d7ec9)"
              label="@visualixofficial"
              sub="Twitter / X"
            />
          </div>

          {/* Fast response card */}
          <motion.div
            className="rounded-3xl p-5 flex items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.04) 100%)',
              border: '1px solid rgba(212,175,55,0.25)',
            }}
            animate={{ boxShadow: ['0 0 0px rgba(212,175,55,0)', '0 0 20px rgba(212,175,55,0.1)', '0 0 0px rgba(212,175,55,0)'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}
            >
              <Clock size={20} style={{ color: '#D4AF37' }} />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-sm">Fast Response</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Average reply time under 2 hours
              </p>
            </div>
          </motion.div>

          {/* Direct message card */}
          <motion.a
            href="https://wa.me/917458071361?text=Hi%20Visualix!%20I%20want%20to%20discuss%20a%20project."
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="rounded-3xl p-5 flex items-center gap-4 cursor-pointer transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(18,140,126,0.08) 100%)',
              border: '1px solid rgba(37,211,102,0.25)',
              textDecoration: 'none',
            }}
          >
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #128C7E, #25D366)' }}
            >
              <MessageCircle size={20} style={{ color: '#fff' }} />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-sm">Chat Instantly</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Open WhatsApp and message now
              </p>
            </div>
            <svg className="ml-auto" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="rgba(37,211,102,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
