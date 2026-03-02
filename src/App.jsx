import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './App.css';

function ParticleBackground() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#00ff41",
          },
          links: {
            color: "#00ff41",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800,
            },
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

function ProgressIndicator({ current, total }) {
  return (
    <div className="progress-indicator">
      <div className="progress-dots">
        {Array.from({ length: total }).map((_, index) => (
          <motion.div
            key={index}
            className={`progress-dot ${current === index ? 'active' : ''}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
      <div className="progress-text">
        {current + 1} / {total}
      </div>
    </div>
  );
}

function SoundToggle({ isMuted, onToggle }) {
  return (
    <div className="sound-toggle" onClick={onToggle}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2">
        {isMuted ? (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
          </>
        )}
      </svg>
    </div>
  );
}

function AutoPlayToggle({ isPlaying, onToggle }) {
  return (
    <div className="autoplay-toggle" onClick={onToggle}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2">
        {isPlaying ? (
          <>
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </>
        ) : (
          <polygon points="5 3 19 12 5 21 5 3" />
        )}
      </svg>
    </div>
  );
}

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [slideDirection, setSlideDirection] = useState(1);

  const sections = [
    { 
      id: 0, 
      type: 'hero',
      bg: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80'
    },
    { 
      id: 1, 
      type: 'quote',
      quote: 'Just because something works doesn\'t mean it can\'t be improved',
      author: 'SHURI',
      subtitle: 'SCIENTIST & INNOVATOR',
      bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80'
    },
    { 
      id: 2, 
      type: 'card',
      name: 'HANNAH BEACHLER',
      role: 'PRODUCTION DESIGNER',
      bg: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80'
    },
    { 
      id: 3, 
      type: 'card',
      name: 'JASMINE ALEXIA',
      role: 'STORYBOARD ARTIST',
      bg: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1600&q=80'
    },
    { 
      id: 4, 
      type: 'card',
      name: 'ALÍCIA DÍAZ',
      role: 'SCULPTOR',
      bg: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1600&q=80'
    },
    { 
      id: 5, 
      type: 'gallery',
      title: 'ORIGIN STORIES',
      subtitle: 'Find Your Inspiration',
      bg: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80'
    },
    { 
      id: 6, 
      type: 'final',
      bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80'
    }
  ];

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setSlideDirection(1);
      setCurrentSection(currentSection + 1);
      playSound();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setSlideDirection(-1);
      setCurrentSection(currentSection - 1);
      playSound();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    playSound();
  };

  const playSound = () => {
    if (!isSoundMuted) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGe77OmfTAzjT6bf8Mhhuw==');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  };

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay || isLoading || isMenuOpen) return;

    const interval = setInterval(() => {
      if (currentSection < sections.length - 1) {
        nextSection();
      } else {
        setIsAutoPlay(false);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, currentSection, isLoading, isMenuOpen]);

  // Wheel scroll detection
  useEffect(() => {
    if (isLoading || isMenuOpen || isAutoPlay) return;

    let isScrolling = false;
    const handleWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;
      
      if (e.deltaY > 0) {
        nextSection();
      } else {
        prevSection();
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isLoading, isMenuOpen, isAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    if (isLoading || isMenuOpen) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevSection();
      } else if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSection, isLoading, isMenuOpen, isAutoPlay]);

  // Touch gestures
  useEffect(() => {
    if (isLoading || isMenuOpen) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (touchStartX - touchEndX > 50) {
        nextSection();
      }
      if (touchEndX - touchStartX > 50) {
        prevSection();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, isLoading, isMenuOpen]);

  return (
    <div className="app">
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <Header />
            <MenuIcon onClick={toggleMenu} isOpen={isMenuOpen} />
            <ProgressIndicator current={currentSection} total={sections.length} />
            <SoundToggle isMuted={isSoundMuted} onToggle={() => setIsSoundMuted(!isSoundMuted)} />
            <AutoPlayToggle isPlaying={isAutoPlay} onToggle={() => setIsAutoPlay(!isAutoPlay)} />
            
            <AnimatePresence>
              {isMenuOpen && (
                <CircularMenu
                  sections={sections}
                  currentSection={currentSection}
                  onSelect={(index) => {
                    setCurrentSection(index);
                    setIsMenuOpen(false);
                    playSound();
                  }}
                  isOpen={isMenuOpen}
                  onClose={() => setIsMenuOpen(false)}
                />
              )}
            </AnimatePresence>

            <Section 
              key={currentSection}
              data={sections[currentSection]}
              direction={slideDirection}
            />

            <Navigation 
              onNext={nextSection}
              onPrev={prevSection}
              canNext={currentSection < sections.length - 1}
              canPrev={currentSection > 0}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-content">
        <h2 className="loading-title">
          THE <span className="hall">HALL</span> OF<br />
          <span className="zero">ZERO LIMITS</span>
        </h2>
        
        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        
        <p className="loading-text">Loading Experience...</p>
      </div>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>
        THE <span className="hall">HALL</span> OF<br />
        <span className="zero">ZERO LIMITS</span>
      </h1>
    </header>
  );
}

function MenuIcon({ onClick, isOpen }) {
  return (
    <div className="menu-icon" onClick={onClick}>
      <motion.svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#00ff41" 
        strokeWidth="2"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <rect x="3" y="5" width="18" height="2" />
        <rect x="3" y="11" width="18" height="2" />
        <rect x="3" y="17" width="18" height="2" />
      </motion.svg>
    </div>
  );
}

function CircularMenu({ sections, currentSection, onSelect, isOpen, onClose }) {
  return (
    <motion.div
      className="circular-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="circular-menu" onClick={(e) => e.stopPropagation()}>
        <div className="menu-center">
          <svg viewBox="0 0 100 100" className="center-icon">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#00ff41" strokeWidth="2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
            <circle cx="50" cy="50" r="5" fill="#00ff41" />
          </svg>
        </div>

        {sections.map((section, index) => {
          const angle = (index / sections.length) * 2 * Math.PI - Math.PI / 2;
          const radius = 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={section.id}
              className={`menu-item ${currentSection === index ? 'active' : ''}`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => onSelect(index)}
            >
              <div className="menu-item-hex">
                <span>{index + 1}</span>
              </div>
              <p className="menu-item-label">
                {section.type === 'hero' && 'WELCOME'}
                {section.type === 'quote' && 'QUOTE'}
                {section.type === 'card' && section.name.split(' ')[0]}
                {section.type === 'gallery' && 'GALLERY'}
                {section.type === 'final' && 'END'}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function Section({ data, direction }) {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.05
    })
  };

  return (
    <motion.div
      className="section"
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }}
    >
      <motion.img 
        src={data.bg} 
        alt="" 
        className="bg-image"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="overlay" />
      
      <div className="content-wrapper">
        {data.type === 'hero' && <HeroContent />}
        {data.type === 'quote' && <QuoteContent quote={data.quote} author={data.author} subtitle={data.subtitle} />}
        {data.type === 'card' && <CardContent name={data.name} role={data.role} />}
        {data.type === 'gallery' && <GalleryContent title={data.title} subtitle={data.subtitle} />}
        {data.type === 'final' && <FinalContent />}
      </div>
    </motion.div>
  );
}

function HeroContent() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="hero-content"
    >
      <div className="hero-frame">
        <p className="hero-text">
          You have entered the Hall of Zero Limits. 
          <span className="green-text"> Great things lie ahead for all who open themselves to finding their gift.</span>
        </p>
      </div>
      <div className="scroll-hint">Scroll to Explore</div>
    </motion.div>
  );
}

function QuoteContent({ quote, author, subtitle }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="quote-content"
    >
      <div className="quote-frame">
        <div className="quote-accent"></div>
        <h2 className="quote-text">"{quote}"</h2>
        <div className="quote-divider"></div>
        <p className="quote-author">{author}</p>
        <p className="quote-subtitle">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function CardContent({ name, role }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="card-content"
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="card-frame"
        whileHover={{ 
          boxShadow: '0 0 60px rgba(0, 255, 65, 0.5)',
          borderColor: '#00ff41'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-corners"></div>
        
        <svg className="hex-icon" viewBox="0 0 50 50">
          <polygon 
            points="25,5 45,15 45,35 25,45 5,35 5,15" 
            fill="none" 
            stroke="#00ff41" 
            strokeWidth="2" 
          />
          <circle cx="25" cy="25" r="3" fill="#00ff41" />
        </svg>

        <h2 className="card-name">{name}</h2>
        <p className="card-role">{role}</p>

        <motion.button 
          className="watch-btn"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: 'rgba(0, 255, 65, 0.3)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          WATCH
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function GalleryContent({ title, subtitle }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="gallery-content"
    >
      <div className="gallery-frame">
        <svg className="gallery-icon" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="#00ff41" strokeWidth="2" />
          <circle cx="30" cy="30" r="18" fill="none" stroke="#00ff41" strokeWidth="1" opacity="0.5" />
          <circle cx="30" cy="30" r="3" fill="#00ff41" />
        </svg>
        
        <h2 className="gallery-title">{title}</h2>
        <p className="gallery-subtitle">{subtitle}</p>
        
        <div className="gallery-grid">
          <div className="gallery-item">
            <div className="item-hex"></div>
            <span>WISDOM</span>
          </div>
          <div className="gallery-item">
            <div className="item-hex"></div>
            <span>COURAGE</span>
          </div>
          <div className="gallery-item">
            <div className="item-hex"></div>
            <span>VISION</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FinalContent() {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="final-content"
    >
      <div className="final-frame">
        <h2 className="final-title">
          THE <span className="hall">HALL</span> OF<br />
          <span className="zero">ZERO LIMITS</span>
        </h2>
        <div className="final-divider"></div>
        <p className="final-text">Your journey continues</p>
        <p className="final-credit">Built with React & Framer Motion</p>
      </div>
    </motion.div>
  );
}

function Navigation({ onNext, onPrev, canNext, canPrev }) {
  return (
    <div className="nav-controls">
      <button 
        className="nav-btn" 
        onClick={onPrev} 
        disabled={!canPrev}
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <span className="nav-label">PREV</span>
      <span className="nav-label">NEXT</span>

      <button 
        className="nav-btn" 
        onClick={onNext} 
        disabled={!canNext}
      >
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

export default App;