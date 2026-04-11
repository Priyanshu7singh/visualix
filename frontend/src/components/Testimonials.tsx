import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import axios from 'axios';

interface Testimonial {
  id: number;
  clientName: string;
  companyRole: string;
  rating: number;
  quote: string;
  avatarUrl: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('/api/v1/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-32 px-8 max-w-6xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-royal-gold mb-4">What Our Clients Say</h2>
        <p className="text-gray-400">The Visualix standard of excellence, verified by top creators.</p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto glass-panel p-12 rounded-2xl">
        <Quote size={60} className="text-royal-gold/20 absolute top-8 left-8" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < current.rating ? "text-royal-gold fill-royal-gold" : "text-gray-600"} />
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-white italic font-serif leading-relaxed mb-10">
              "{current.quote}"
            </p>
            
            <div className="flex flex-col items-center">
              <img 
                src={current.avatarUrl || "https://ui-avatars.com/api/?name=" + current.clientName + "&background=D4AF37&color=0A0A0A"} 
                alt={current.clientName} 
                className="w-16 h-16 rounded-full border-2 border-royal-gold mb-4 object-cover"
              />
              <h4 className="text-lg font-bold text-royal-gold uppercase tracking-wider">{current.clientName}</h4>
              <p className="text-sm text-gray-400">{current.companyRole}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2">
          <button onClick={handlePrev} className="p-3 rounded-full bg-royal-black border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-colors shadow-lg">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -right-4 md:-right-8 -translate-y-1/2">
          <button onClick={handleNext} className="p-3 rounded-full bg-royal-black border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-colors shadow-lg">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-8 gap-2 relative z-10">
        {testimonials.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-royal-gold w-8' : 'bg-royal-gold/30'}`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
