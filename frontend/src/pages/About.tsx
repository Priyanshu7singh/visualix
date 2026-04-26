import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 px-8 max-w-6xl mx-auto">

      {/* ── Header ── */}
      <AnimatedSection direction="down" className="mb-16">
        <span className="section-tag mb-4">Who we are</span>
        <h1 className="text-5xl md:text-6xl font-serif text-white mt-4 mb-5 leading-tight">
          Just a team that<br />
          <span className="shimmer-text">really loves this stuff</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
          No corporate mission statements. No buzzwords. We're a small creative studio that's genuinely obsessed with making great-looking, great-sounding content.
        </p>
      </AnimatedSection>

      {/* ── Main two-col ── */}
      <div className="flex flex-col md:flex-row gap-14 items-start mb-20">

        {/* Image */}
        <AnimatedSection direction="left" className="md:w-[45%] shrink-0">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(212,175,55,0.2)' }}>
            <img
              src="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="The Visualix team at work"
              className="w-full h-auto object-cover"
            />
            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
              <p className="text-sm text-white font-medium">Priyanshu — Founder, Visualix</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(212,175,55,0.6)' }}>Editing since 2022</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Story */}
        <div className="flex-1 space-y-6">
          <AnimatedSection direction="right" delay={0.1}>
            <p className="text-gray-300 text-lg leading-relaxed">
              Visualix started because I was frustrated — frustrated with editors who didn't care about pacing, with motion designers who just downloaded templates, and with music that felt completely disconnected from the video.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <p className="text-gray-300 text-lg leading-relaxed">
              So I built the kind of studio I'd actually want to work with. One that pays attention, communicates clearly, and genuinely gives a damn about the final result.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.3}>
            <p className="text-gray-300 text-lg leading-relaxed">
              Over <span className="text-royal-gold font-semibold">2+ years</span>, we've worked with YouTube creators, brands, and startups across India — helping them go from "it looks okay" to "this is exactly what I wanted."
            </p>
          </AnimatedSection>

          {/* Inline stats */}
          <AnimatedSection direction="up" delay={0.4}>
            <div className="flex gap-8 pt-4 border-t" style={{ borderColor: 'rgba(212,175,55,0.12)' }}>
              {[
                { val: '2+', label: 'Years doing this' },
                { val: '500+', label: 'Projects delivered' },
                { val: '100+', label: 'Happy clients' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-serif shimmer-text">{s.val}</div>
                  <div className="text-xs uppercase tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* ── Values — no cards, just honest statements ── */}
      <AnimatedSection direction="up" delay={0.1} className="mb-6">
        <h2 className="text-3xl font-serif text-white mb-8">
          How we work
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(212,175,55,0.08)', borderRadius: 16, overflow: 'hidden' }}>
        {[
          {
            num: '01',
            title: 'We actually listen',
            body: "We spend time understanding what you need before we touch anything. References, goals, audience — all of it matters.",
          },
          {
            num: '02',
            title: 'Revisions without the drama',
            body: "Feedback rounds are part of the job, not a favour. We want you to be happy with it, full stop.",
          },
          {
            num: '03',
            title: 'On time, every time',
            body: "Deadlines are a promise, not a suggestion. We've never missed one — and we're not planning to start.",
          },
        ].map((v, i) => (
          <AnimatedSection key={i} direction="up" delay={0.1 + i * 0.1}>
            <div className="p-8 h-full" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <span className="font-serif text-xs tracking-widest" style={{ color: 'rgba(212,175,55,0.4)' }}>{v.num}</span>
              <h3 className="text-xl font-serif text-white mt-3 mb-3">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* ── CTA ── */}
      <AnimatedSection direction="up" delay={0.2} className="mt-16 text-center">
        <p className="text-gray-500 text-sm mb-6">Ready to work together?</p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-serif font-bold text-sm tracking-widest"
          style={{
            background: 'linear-gradient(135deg, #7A5C10, #F5E67A, #7A5C10)',
            color: '#000',
            boxShadow: '0 0 24px rgba(212,175,55,0.25)',
          }}
        >
          Let's work together →
        </motion.a>
      </AnimatedSection>
    </div>
  );
};

export default About;
