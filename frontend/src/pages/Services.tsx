import AnimatedSection from '../components/AnimatedSection';
import { Video, Sparkles, Image as ImageIcon, Music as MusicIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface Service {
  title: string;
  description: string;
  icon: ReactNode;
}

const services: Service[] = [
  {
    title: 'Video Editing & Post-Production',
    description: 'Transforming raw footage into high-retention, cinematic masterpieces for top creators and brands. Fast pacing, color grading, and storytelling.',
    icon: <Video size={40} className="text-royal-gold" />
  },
  {
    title: 'Motion Graphics & VFX',
    description: 'Dynamic, royal-quality animations and visual effects that command attention and elevate the production value of any project.',
    icon: <Sparkles size={40} className="text-royal-gold" />
  },
  {
    title: 'YouTube Thumbnail Design',
    description: 'Highly clickable, vibrant, and perfectly branded thumbnails designed to maximize CTR and viewer intrigue.',
    icon: <ImageIcon size={40} className="text-royal-gold" />
  },
  {
    title: 'Music Production',
    description: 'Custom sound design, scoring, and beat production that gives your visual content the ultimate premium feel.',
    icon: <MusicIcon size={40} className="text-royal-gold" />
  }
];

const Services = () => {
  return (
    <div className="min-h-screen py-24 px-8 max-w-7xl mx-auto">
      <AnimatedSection direction="down" className="text-center mb-16">
        <h2 className="text-5xl font-serif text-royal-gold mb-4">Our Creative Arsenal</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Exclusive services tailored for those who demand excellence.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((svc, idx) => (
          <AnimatedSection key={idx} delay={idx * 0.12} direction={idx % 2 === 0 ? 'left' : 'right'}>
            <div className="glass-panel p-10 rounded-lg group hover:border-royal-purple/50 transition-colors relative overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/5 to-royal-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-start gap-6">
                <div className="p-4 bg-royal-black/50 rounded-full border border-royal-gold/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-royal-gold transition-colors">{svc.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{svc.description}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Services;
