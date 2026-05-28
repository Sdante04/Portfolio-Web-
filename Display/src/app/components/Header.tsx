import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const NAV_ITEMS = [
  { label: 'Sobre mí', id: 'about' },
  { label: 'Proyectos', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Educación', id: 'education' },
  { label: 'Contacto', id: 'contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Scroll progress (0–100)
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 160, damping: 28 });
  const progressWidth = useTransform(smoothProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      rawProgress.set(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawProgress]);

  // Active section highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleDownloadCV = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch('/santiago_cv.pdf');
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Santiago_Dante_CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open('/santiago_cv.pdf', '_blank', 'noopener noreferrer');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50"
    >
      {/* Scroll progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400"
        style={{ width: progressWidth }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Santiago Dante
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm transition-colors duration-200"
              >
                <span
                  className={`transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-cyan-400'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-[22px] left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2 text-sm text-zinc-300 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver proyectos
            </motion.button>
            <motion.a
              href="/santiago_cv.pdf"
              download="Santiago_Dante_CV.pdf"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleDownloadCV(e);
              }}
              className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              Descargar CV
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left py-2 transition-colors ${
                  activeSection === item.id
                    ? 'text-cyan-400'
                    : 'text-zinc-400 hover:text-cyan-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-cyan-400 transition-colors text-left"
              >
                Ver proyectos
              </button>
              <a
                href="/santiago_cv.pdf"
                download="Santiago_Dante_CV.pdf"
                onClick={(e) => { e.preventDefault(); handleDownloadCV(e); }}
                className="inline-block px-4 py-2 bg-zinc-900/60 text-white rounded-md hover:bg-zinc-900 transition-colors text-sm"
              >
                Descargar CV
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
