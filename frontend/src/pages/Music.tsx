import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music as MusicIcon } from 'lucide-react';
import axios from 'axios';

interface MusicTrack {
  id: number;
  title: string;
  duration: string;
  audioUrl: string;
}

const Music = () => {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    axios.get('/api/v1/music')
      .then(res => setTracks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handlePlayPause = (track: MusicTrack) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current?.play();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen py-24 px-8 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-serif text-royal-gold mb-6">Sonic Mastery</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Custom sound design and premium tracks that give your visual content the ultimate royal feel.</p>
      </div>

      <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <MusicIcon size={200} className="text-royal-gold" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          {/* Current Track Info */}
          <div className="flex-1 flex flex-col justify-center border-r border-royal-gold/10 pr-8">
            <h3 className="text-royal-purple-light uppercase tracking-widest text-sm mb-4">Now Playing</h3>
            <h4 className="text-3xl font-serif text-white mb-2">{currentTrack ? currentTrack.title : "Select a Track"}</h4>
            <p className="text-gray-400 mb-8">{currentTrack ? "Visualix Original Composition" : "Explore our majestic library of sounds."}</p>
            
            {/* Visualizer Mock */}
            <div className="flex items-end gap-1 h-16 w-full opacity-60">
              {[...Array(30)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: isPlaying ? ['20%', '100%', '30%'] : '20%' }}
                  transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.5 }}
                  className="bg-royal-gold w-full rounded-t-sm"
                  style={{ minHeight: '4px' }}
                />
              ))}
            </div>
            
            {audioRef && (
              <audio 
                ref={audioRef} 
                src={currentTrack?.audioUrl} 
                onEnded={() => setIsPlaying(false)}
              />
            )}
          </div>

          {/* Playlist */}
          <div className="flex-1 space-y-4">
            <h3 className="font-serif text-xl border-b border-royal-gold/20 pb-4 mb-6">Royal Playlist</h3>
            {tracks.map((track) => (
              <div 
                key={track.id} 
                className={`flex items-center justify-between p-4 rounded cursor-pointer transition-all ${currentTrack?.id === track.id ? 'bg-royal-gold/10 border border-royal-gold/30' : 'hover:bg-white/5'}`}
                onClick={() => handlePlayPause(track)}
              >
                <div className="flex items-center gap-4">
                  <button className="h-10 w-10 rounded-full bg-royal-black flex items-center justify-center border border-royal-gold/50 text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-colors">
                    {currentTrack?.id === track.id && isPlaying ? <Pause size={18}/> : <Play size={18} className="translate-x-[2px]"/>}
                  </button>
                  <span className={`font-medium ${currentTrack?.id === track.id ? 'text-royal-gold' : 'text-gray-300'}`}>{track.title}</span>
                </div>
                <span className="text-sm text-gray-500">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;
