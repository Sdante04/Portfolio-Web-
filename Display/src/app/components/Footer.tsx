import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Sobre mí', id: 'about' },
    { label: 'Proyectos', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Educación', id: 'education' },
    { label: 'Contacto', id: 'contact' },
  ];

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
            >
              Santiago Dante
            </motion.button>
            <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
              Full-stack developer construyendo soluciones end-to-end 
              con foco en calidad y aprendizaje continuo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Enlaces rápidos</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-zinc-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:santiagodante4@gmail.com"
                className="block text-zinc-400 hover:text-cyan-400 transition-colors"
              >
                santiagodante4@gmail.com
              </a>
              <p className="text-zinc-400">Montevideo, Uruguay</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-sm text-center sm:text-left">
              © 2025 Santiago Dante Couto. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <span>Construido con foco en calidad y aprendizaje continuo</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
