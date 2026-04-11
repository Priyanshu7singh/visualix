import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  return (
    <div className="min-h-screen pt-12 pb-24 px-8 max-w-6xl mx-auto">
      <AnimatedSection direction="down" className="mb-16 text-center">
        <h2 className="text-5xl font-serif text-royal-gold">The Visualix Legacy</h2>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">A boutique agency built on excellence and passion</p>
      </AnimatedSection>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <AnimatedSection direction="left" className="flex-1 w-full">
          <div className="relative p-2 border border-royal-gold/30 rounded-lg group">
            <div className="absolute inset-0 bg-royal-gold/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Founder of Visualix" 
              className="w-full h-auto object-cover rounded shadow-2xl"
            />
          </div>
        </AnimatedSection>
        
        <div className="flex-1 space-y-6">
          <AnimatedSection direction="right" delay={0.1}>
            <p className="text-gray-300 text-lg leading-relaxed">
              Visualix is a boutique creative agency led by a seasoned specialist with over <span className="text-royal-gold font-semibold">2+ years of professional experience</span> in video editing, motion graphics, thumbnail artistry, and music production. 
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.2}>
            <p className="text-gray-300 text-lg leading-relaxed">
              We transform ideas into royal-quality visuals and sound that command attention. Whether you are a top-tier creator or an emerging brand, we craft cinematic experiences that leave a lasting impact.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 gap-6 pt-6">
            {[
              { value: '2+', label: 'Years Exp.' },
              { value: '100+', label: 'Projects' },
            ].map((stat, i) => (
              <AnimatedSection key={i} direction="down" delay={0.3 + i * 0.1}>
                <div className="glass-panel p-6 rounded text-center">
                  <motion.div 
                    className="text-4xl text-royal-gold font-serif mb-2"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
