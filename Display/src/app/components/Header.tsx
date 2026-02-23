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

  const handleDownloadCV = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch("/santiago_cv.pdf");
        if (!res.ok) throw new Error("No se pudo descargar el archivo");
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Santiago_Dante_CV.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          } catch (err) {
              console.error(err);
              window.open("/santiago_cv.pdf", "_blank", "noopener noreferrer");
          }
  };

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
              aria-label="Descargar CV"
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
                onClick={() => scrollToSection("projects")}
                className="px-4 py-2 text-sm text-zinc-300 hover:text-cyan-400 transition-colors text-left"
              >
                Ver proyectos
              </button>

              {/** Opción visible: anchor con download (funcionará normalmente) */}
              <a
                href="/santiago_cv.pdf"
                download="Santiago_Dante_CV.pdf"
                onClick={(e) => {
                  // prevenir doble-behavior en navegadores problemáticos y usar nuestra función robusta
                  e.preventDefault();
                  handleDownloadCV(e);
                }}
                className="inline-block px-4 py-2 bg-zinc-900/60 text-white rounded-md hover:bg-zinc-900 transition-colors text-sm"
                aria-label="Descargar CV"
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