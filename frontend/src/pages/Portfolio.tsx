import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AnimatedSection from '../components/AnimatedSection';
import Lightbox from '../components/Lightbox';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  mediaUrl: string;
  thumbnailUrl: string;
  description: string;
}

const CATEGORIES = ['All', 'Video', 'Motion Graphics', 'Thumbnails', 'Pictures'];

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/v1/portfolio${filter !== 'All' ? `?category=${filter}` : ''}`)
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching portfolio items", err);
        setLoading(false);
      });
  }, [filter]);

  return (
    <>
      {/* Animated Lightbox popup */}
      <Lightbox item={selected} onClose={() => setSelected(null)} />

      <div className="min-h-screen py-24 px-8 max-w-7xl mx-auto">
        <AnimatedSection direction="down" className="text-center mb-12">
          <h2 className="text-5xl font-serif text-royal-gold mb-6">Masterpieces</h2>
          <p className="text-gray-400 mb-8">Click any item to play or view full screen</p>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                onClick={() => { setFilter(cat); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full border transition-all ${
                  filter === cat 
                    ? 'border-royal-gold bg-royal-gold text-royal-black font-semibold' 
                    : 'border-royal-gold/30 text-gray-400 hover:border-royal-gold hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal-gold"></div>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <AnimatedSection key={item.id} delay={idx * 0.07} direction="down">
                <motion.div
                  layout
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onClick={() => setSelected(item)}
                  className="group cursor-pointer relative overflow-hidden rounded-xl bg-royal-navy border border-royal-gold/20 hover:border-royal-gold/60 transition-colors h-full"
                >
                  {/* Thumbnail */}
                  <div className="aspect-video overflow-hidden relative">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-royal-black flex items-center justify-center text-royal-gold font-serif text-4xl">♛</div>
                    )}

                    {/* Play icon overlay for videos */}
                    {item.mediaUrl && (item.mediaUrl.toLowerCase().includes('.mp4') || item.mediaUrl.toLowerCase().includes('.webm') || item.mediaUrl.toLowerCase().includes('.mov')) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-royal-gold/90 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.15 }}
                        >
                          <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Info overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-black via-royal-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                    <span className="text-royal-gold text-xs font-semibold uppercase tracking-widest mb-1">{item.category}</span>
                    <h3 className="text-lg font-serif text-white mb-1">{item.title}</h3>
                    {item.description && <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>}
                    <p className="text-royal-gold/70 text-xs mt-2 uppercase tracking-wide">Click to {item.mediaUrl?.includes('.mp4') ? 'Play' : 'View'} →</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
            {items.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-20">
                <div className="text-5xl mb-4 opacity-30">♛</div>
                <p>No projects found in this category yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
