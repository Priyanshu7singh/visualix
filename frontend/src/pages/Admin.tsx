import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Upload, Music, Image, MessageSquare, Trash2, RefreshCw, Edit } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  projectType: string;
  message: string;
  submittedAt: string;
}

const Admin = () => {
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  const isAuthenticated = !!token;
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('Messages');
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ title: '', category: 'Video', description: '', duration: '' });
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Messages and Portfolio state
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);

  const AUTH_HEADER = { 'Authorization': `Bearer ${token}` };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/login', { adminId, password });
      if (res.data.token) {
        setToken(res.data.token);
        sessionStorage.setItem('adminToken', res.data.token);
        setAuthError('');
      }
    } catch (err) {
      setAuthError('Invalid Royal Password');
    }
  };

  const fetchMessages = async () => {
    setLoadingMessages(true);
    try {
      const res = await axios.get('/api/v1/contact', { headers: AUTH_HEADER });
      setMessages(res.data.reverse()); // newest first
    } catch {
      console.error('Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchPortfolio = async () => {
    setLoadingPortfolio(true);
    try {
      const res = await axios.get('/api/v1/portfolio', { headers: AUTH_HEADER });
      setPortfolioItems(res.data.reverse());
    } catch {
      console.error('Failed to load portfolio');
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setToken('');
          sessionStorage.removeItem('adminToken');
          alert('Session expired. Please log in again.');
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'Messages') fetchMessages();
      if (activeTab === 'Portfolio') fetchPortfolio();
    }
  }, [isAuthenticated, activeTab]);

  const handleEditPortfolio = (item: any) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      duration: '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePortfolio = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/v1/portfolio/${id}`, { headers: AUTH_HEADER });
      fetchPortfolio();
    } catch (err: any) {
      console.error('Failed to delete item', err);
      alert('Failed to delete item: ' + (err.response?.data || err.message));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('uploading...');
    try {
      let fileUrl = '';
      if (file) {
        const uploadData = new FormData();
        uploadData.append('file', file);
        const uploadRes = await axios.post('/api/v1/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data', ...AUTH_HEADER }
        });
        fileUrl = uploadRes.data.url;
      } else {
        setStatus('error: please select a file');
        return;
      }

      setStatus('saving...');
      if (activeTab === 'Portfolio') {
        const payload = {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          mediaUrl: fileUrl,
        };
        if (editingId) {
          await axios.put(`/api/v1/portfolio/${editingId}`, payload, { headers: AUTH_HEADER });
        } else {
          await axios.post('/api/v1/portfolio', payload, { headers: AUTH_HEADER });
        }
        fetchPortfolio();
      } else if (activeTab === 'Music Tracks') {
        await axios.post('/api/v1/music', {
          title: formData.title,
          duration: formData.duration,
          audioUrl: fileUrl,
        }, { headers: AUTH_HEADER });
      }
      
      setStatus('✅ Saved successfully!');
      setFile(null);
      setEditingId(null);
      setFormData({ title: '', category: 'Video', description: '', duration: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (err: unknown) {
      console.error(err);
      const msg = (err as {response?: {data?: string}})?.response?.data || 'error submitting';
      setStatus(`❌ ${msg}`);
    }
  };

  // ─── Login Screen ───
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="glass-panel p-10 rounded-2xl text-center max-w-sm w-full"
        >
          <div className="text-5xl text-royal-gold mb-4">♛</div>
          <h2 className="text-3xl font-serif text-royal-gold mb-2">Admin Access</h2>
          <p className="text-gray-400 text-sm mb-8">Royal Dashboard — Host Only</p>
          {authError && <p className="text-red-400 mb-4 text-sm">{authError}</p>}
          <input 
            type="text" 
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            placeholder="Admin ID"
            className="w-full bg-royal-black/50 border border-royal-gold/30 rounded-lg px-4 py-3 mb-4 text-white focus:border-royal-gold focus:outline-none text-center"
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Royal Password"
            className="w-full bg-royal-black/50 border border-royal-gold/30 rounded-lg px-4 py-3 mb-6 text-white focus:border-royal-gold focus:outline-none text-center"
          />
          <button type="submit" className="w-full bg-royal-gold text-royal-black font-bold py-3 rounded-lg hover:bg-royal-gold-light transition-colors">
            Access Palace
          </button>
        </motion.form>
      </div>
    );
  }

  const tabs = [
    { id: 'Messages', label: 'Client Messages', icon: <MessageSquare size={18} /> },
    { id: 'Portfolio', label: 'Portfolio', icon: <Image size={18} /> },
    { id: 'Music Tracks', label: 'Music Tracks', icon: <Music size={18} /> },
  ];

  return (
    <div className="min-h-screen py-16 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <AnimatedSection direction="down" className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-serif text-royal-gold">Royal Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your content & client inquiries</p>
        </div>
        <button onClick={() => { setToken(''); sessionStorage.removeItem('adminToken'); }} className="px-4 py-2 border border-royal-gold/30 text-royal-gold rounded-lg hover:bg-royal-gold/10 transition text-sm">
          Logout
        </button>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection direction="up" delay={0.1} className="flex gap-3 mb-8 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'border-royal-gold bg-royal-gold/10 text-royal-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                : 'border-royal-gold/20 text-gray-400 hover:border-royal-gold/40 hover:text-white'
            }`}
          >
            {tab.icon} {tab.label}
            {tab.id === 'Messages' && messages.length > 0 && (
              <span className="bg-royal-gold text-black text-xs rounded-full px-2 py-0.5 font-bold">
                {messages.length}
              </span>
            )}
          </button>
        ))}
      </AnimatedSection>

      {/* ── Messages Tab ── */}
      {activeTab === 'Messages' && (
        <AnimatedSection direction="up" delay={0.15}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-serif text-white">Client Inquiries</h3>
            <button
              onClick={fetchMessages}
              className="flex items-center gap-2 text-royal-gold border border-royal-gold/30 px-4 py-2 rounded-lg hover:bg-royal-gold/10 transition text-sm"
            >
              <RefreshCw size={15} className={loadingMessages ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {loadingMessages ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-royal-gold" />
            </div>
          ) : messages.length === 0 ? (
            <div className="glass-panel rounded-2xl p-16 text-center text-gray-500">
              <Mail size={48} className="mx-auto mb-4 opacity-30" />
              <p>No client messages yet. They will appear here when clients contact you.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-panel rounded-xl p-6 hover:border-royal-gold/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h4 className="text-lg font-serif text-royal-gold">{msg.name}</h4>
                        <span className="text-xs bg-royal-gold/10 text-royal-gold border border-royal-gold/20 px-2 py-0.5 rounded-full">
                          {msg.projectType}
                        </span>
                      </div>
                      <a href={`mailto:${msg.email}`} className="text-blue-400 hover:underline text-sm flex items-center gap-1 mb-3">
                        <Mail size={13} /> {msg.email}
                      </a>
                      <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-500">
                        {msg.submittedAt ? new Date(msg.submittedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}
                      </p>
                      <a
                        href={`mailto:${msg.email}?subject=Re: Your ${msg.projectType} inquiry&body=Hi ${msg.name},%0A%0AThank you for reaching out to Visualix!%0A%0A`}
                        className="mt-2 inline-flex items-center gap-1 text-xs text-royal-gold border border-royal-gold/30 px-3 py-1.5 rounded-lg hover:bg-royal-gold/10 transition"
                      >
                        <Mail size={12} /> Reply
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatedSection>
      )}

      {/* ── Upload Tabs ── */}
      {(activeTab === 'Portfolio' || activeTab === 'Music Tracks') && (
        <AnimatedSection direction="up" delay={0.15}>
          <div className="glass-panel p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-8">
              <Upload size={22} className="text-royal-gold" />
              <h3 className="text-2xl font-serif text-white">{editingId ? 'Edit Item' : `Upload to ${activeTab}`}</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-royal-gold mb-2 text-sm uppercase tracking-wide">Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-royal-black/50 border border-royal-gold/30 rounded-lg px-4 py-3 text-white outline-none focus:border-royal-gold transition"
                />
              </div>

              {activeTab === 'Portfolio' && (
                <>
                  <div>
                    <label className="block text-royal-gold mb-2 text-sm uppercase tracking-wide">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-royal-black border border-royal-gold/30 rounded-lg px-4 py-3 text-white outline-none focus:border-royal-gold transition"
                    >
                      <option>Video</option>
                      <option>Motion Graphics</option>
                      <option>Thumbnails</option>
                      <option>Pictures</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-royal-gold mb-2 text-sm uppercase tracking-wide">Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-royal-black/50 border border-royal-gold/30 rounded-lg px-4 py-3 text-white outline-none focus:border-royal-gold h-24 transition"
                    />
                  </div>
                </>
              )}

              {activeTab === 'Music Tracks' && (
                <div>
                  <label className="block text-royal-gold mb-2 text-sm uppercase tracking-wide">Duration (e.g. 3:45)</label>
                  <input 
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full bg-royal-black/50 border border-royal-gold/30 rounded-lg px-4 py-3 text-white outline-none focus:border-royal-gold transition"
                  />
                </div>
              )}

              <div>
                <label className="block text-royal-gold mb-2 text-sm uppercase tracking-wide">Media File</label>
                <input 
                  type="file" required={!editingId} onChange={handleFileChange}
                  className="w-full border border-royal-gold/30 rounded-lg p-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-royal-gold file:text-royal-black hover:file:bg-royal-gold-light transition"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'uploading...' || status === 'saving...'}
                className="w-full bg-royal-gold text-royal-black font-bold py-4 rounded-xl hover:bg-royal-gold-light transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                {status || (editingId ? 'Save Changes' : 'Upload & Save')}
              </button>
            </form>
          </div>

          {activeTab === 'Portfolio' && (
            <div className="mt-10">
              <h3 className="text-2xl font-serif text-white mb-6">Manage Portfolio</h3>
              {loadingPortfolio ? (
                <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-royal-gold" /></div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {portfolioItems.map(item => (
                    <div key={item.id} className="glass-panel p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-serif text-royal-gold font-bold">{item.title}</h4>
                          <span className="text-xs bg-royal-gold/10 text-royal-gold border border-royal-gold/20 px-2 py-0.5 rounded-full">{item.category}</span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                      </div>
                      <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-royal-gold/20">
                        <button onClick={() => handleEditPortfolio(item)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeletePortfolio(item.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </AnimatedSection>
      )}
    </div>
  );
};

export default Admin;
