import { useState } from 'react';
import { Menu, X, Download, Code2, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Sobre mí', id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Educación', id: 'education' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800/50"
    >
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
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-zinc-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => setDemoMode(!demoMode)}
              className={`px-3 py-2 text-sm rounded-lg transition-all flex items-center gap-2 ${
                demoMode 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4" />
              Demo
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2 text-sm text-zinc-300 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver proyectos
            </motion.button>
            <motion.a
              href="#"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-3"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-zinc-400 hover:text-cyan-400 transition-colors py-2"
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
                href="#"
                className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg flex items-center gap-2 justify-center"
              >
                <Download className="w-4 h-4" />
                Descargar CV
              </a>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}