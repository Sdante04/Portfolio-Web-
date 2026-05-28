import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ExternalLink, Github, ChevronRight, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

const techBadges = [
  'React', 'TypeScript', 'C#', 'ASP.NET', 'MySQL/SQL',
  'Python', 'ML', 'Pentaho (Kettle)', 'Docker', 'AWS',
  'Git', 'Shell', 'CSS',
];

const otherProjects = [
  {
    title: 'Sistema de Remates Online C# Cliente-Servidor',
    description: 'Desarrollo de sistema de subastas online con arquitectura cliente-servidor y gestión de usuarios.',
    tech: ['C#', 'Sockets TCP', 'MySQL', 'Windows Forms'],
    repo: 'https://github.com/Sdante04/Sistema-de-Remates-Online-C-Cliente-Servidor-',
  },
  {
    title: 'Smart Home Device Management API',
    description: 'API REST para la administración de dispositivos de hogar inteligente y gestión de estados.',
    tech: ['C#', 'ASP.NET', 'MySQL', 'REST API'],
    repo: 'https://github.com/Sdante04/Smart-Home-Device-Management-API',
  },
];

interface ProjectsProps {
  onExpandCaseStudy: () => void;
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 7, y: nx * 7 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{ transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function Projects({ onExpandCaseStudy }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Experiencia
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Soluciones end-to-end que integran desarrollo web, datos y machine learning
          </motion.p>
        </motion.div>

        {/* Featured Experience */}
        <motion.div
          id="case-study"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <TiltCard className="relative z-10 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-cyan-500/30 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all">
            {/* Featured Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Evalutia</h3>
                    <p className="text-cyan-400 mb-4">2025 • Experiencia profesional</p>
                    <p className="text-zinc-300 leading-relaxed">
                      Plataforma de predicción de ventas con ML + pipeline ETL + aplicación web.
                      Construida desde cero en equipo de 4 desarrolladores. Operacional en{' '}
                      <a
                        href="https://evalutia.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        evalutia.net
                      </a>{' '}
                      con cliente activo.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { color: 'cyan', label: 'Predicción ML', desc: 'Forecasting de ventas con modelos de machine learning' },
                      { color: 'violet', label: 'Pipeline ETL', desc: 'Procesamiento incremental con Pentaho/Kettle' },
                      { color: 'cyan', label: 'App Web', desc: 'React + TypeScript con API REST en C#/ASP.NET' },
                      { color: 'violet', label: 'Infraestructura', desc: 'Docker + AWS con CI/CD automatizado' },
                    ].map(({ color, label, desc }) => (
                      <div key={label} className="flex items-start gap-3">
                        <ChevronRight
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'}`}
                        />
                        <p className="text-zinc-400">
                          <span className="text-white">{label}:</span> {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <MagneticButton>
                      <motion.button
                        onClick={onExpandCaseStudy}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Caso de estudio
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </MagneticButton>
                    <MagneticButton>
                      <motion.a
                        href="https://evalutia.net"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        Ver sitio
                      </motion.a>
                    </MagneticButton>
                  </div>
                </div>

                {/* Right Content */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-bold mb-4">Stack Tecnológico</h4>
                    <div className="flex flex-wrap gap-2">
                      {techBadges.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.4 + index * 0.03 }}
                          className="px-3 py-1.5 bg-zinc-800/80 border border-zinc-700 rounded-md text-zinc-300 text-sm hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-zinc-700/80 transition-all"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700/50">
                      <p className="text-zinc-400 text-sm mb-1">Equipo</p>
                      <p className="text-2xl font-bold text-cyan-400">4 devs</p>
                    </div>
                    <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700/50">
                      <p className="text-zinc-400 text-sm mb-1">Estado</p>
                      <p className="text-2xl font-bold text-green-400">Producción</p>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      <span className="text-white font-bold">Metodología:</span> Git Flow,
                      TDD, code reviews, sprints ágiles y deployment automatizado con Docker.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-500/10 blur-3xl" />
          </TiltCard>
        </motion.div>

        <div className="text-center mt-16 mb-10">
          <p className="text-lg sm:text-xl uppercase tracking-[0.35em] text-cyan-400 font-semibold">
            Proyectos
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          {otherProjects.map((project) => (
            <motion.div key={project.title} variants={itemVariants} className="w-full">
              <TiltCard className="h-full">
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-cyan-500/50 hover:bg-zinc-800/60 transition-all group"
                >
                  <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium">
                    <Github className="w-4 h-4" />
                    Ver repositorio
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
