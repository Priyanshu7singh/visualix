import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Video Editing',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    axios.post('/api/v1/contact', formData)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  };

  return (
    <div className="min-h-screen py-24 px-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
      <div className="flex-1">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-5xl font-serif text-royal-gold mb-6">Start Your Legacy</h2>
          <p className="text-gray-400 text-lg mb-12">
            Ready to elevate your brand to royal status? Reach out and let's craft a cinematic masterpiece together.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 p-6 glass-panel rounded cursor-pointer hover:border-royal-purple/50 transition-colors">
              <div className="bg-royal-gold/10 p-4 rounded-full text-royal-gold">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl">Email Us</h4>
                <p className="text-gray-400">hello@visualix.agency</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 p-6 glass-panel rounded cursor-pointer hover:border-royal-purple/50 transition-colors">
              <div className="bg-royal-gold/10 p-4 rounded-full text-royal-gold">
                <MessageSquare size={24} />
              </div>
              <div>
                <h4 className="font-serif text-xl">WhatsApp</h4>
                <p className="text-gray-400">+1 (555) 019-2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex-1">
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel p-10 rounded-xl"
          onSubmit={handleSubmit}
        >
          {status === 'success' ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-3xl font-serif text-royal-gold mb-4">Request Sent</h3>
              <p className="text-gray-400">We will be in touch shortly to discuss your project.</p>
              <button 
                type="button" 
                onClick={() => setStatus('idle')}
                className="mt-8 px-6 py-2 border border-royal-gold text-royal-gold rounded hover:bg-royal-gold/10 transition"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-royal-black/50 border border-royal-gold/30 rounded px-4 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors"
                  placeholder="Lord Chamberlain"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-royal-black/50 border border-royal-gold/30 rounded px-4 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors"
                  placeholder="royal@domain.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Project Type</label>
                <select 
                  className="w-full bg-royal-black border border-royal-gold/30 rounded px-4 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors appearance-none"
                  value={formData.projectType}
                  onChange={e => setFormData({...formData, projectType: e.target.value})}
                >
                  <option>Video Editing</option>
                  <option>Motion Graphics</option>
                  <option>Thumbnail Design</option>
                  <option>Music Production</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-royal-black/50 border border-royal-gold/30 rounded px-4 py-3 text-white focus:outline-none focus:border-royal-gold transition-colors"
                  placeholder="Describe your vision..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-royal-gold text-royal-black font-bold py-4 rounded hover:bg-royal-gold-light hover:scale-[1.02] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] disabled:opacity-50"
              >
                {status === 'submitting' ? 'Commanding...' : 'Submit Request'}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
