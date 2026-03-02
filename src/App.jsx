import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);

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
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="app">
      <Header />
      <MenuIcon />
      
      <AnimatePresence mode="wait">
        <Section 
          key={currentSection}
          data={sections[currentSection]}
        />
      </AnimatePresence>

      <Navigation 
        onNext={nextSection}
        onPrev={prevSection}
        canNext={currentSection < sections.length - 1}
        canPrev={currentSection > 0}
      />
    </div>
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

function MenuIcon() {
  return (
    <div className="menu-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2">
        <rect x="3" y="5" width="18" height="2" />
        <rect x="3" y="11" width="18" height="2" />
        <rect x="3" y="17" width="18" height="2" />
      </svg>
    </div>
  );
}

function Section({ data }) {
  return (
    <motion.div
      className="section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <img src={data.bg} alt="" className="bg-image" />
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
    >
      <div className="card-frame">
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

        <button className="watch-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          WATCH
        </button>
      </div>
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