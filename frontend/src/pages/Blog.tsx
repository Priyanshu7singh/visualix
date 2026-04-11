import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AnimatedSection from '../components/AnimatedSection';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  createdAt: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    axios.get('/api/v1/blog')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen py-24 px-8 max-w-6xl mx-auto">
      <AnimatedSection direction="down" className="text-center mb-16">
        <h2 className="text-5xl font-serif text-royal-gold mb-6">Insights & Behind the Scenes</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Learn from the experts at Visualix as we share our creative processes and industry knowledge.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-10">
        {posts.map((post, idx) => (
          <AnimatedSection key={post.id} delay={idx * 0.1} direction={idx % 2 === 0 ? 'left' : 'right'}>
            <motion.article 
              className="glass-panel overflow-hidden rounded-xl border border-royal-gold/20 group cursor-pointer hover:border-royal-purple/50 transition-colors h-full"
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-royal-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                {post.coverImageUrl ? (
                  <img 
                    src={post.coverImageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-royal-navy flex items-center justify-center text-royal-gold font-serif text-4xl opacity-50">♛</div>
                )}
              </div>
              
              <div className="p-8">
                <span className="text-xs text-royal-purple-light uppercase tracking-widest font-semibold block mb-3">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">{post.title}</h3>
                <p className="text-gray-400 line-clamp-3 mb-6">{post.summary}</p>
                
                <div className="text-royal-gold font-semibold uppercase text-sm tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read Article <span>→</span>
                </div>
              </div>
            </motion.article>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Blog;
