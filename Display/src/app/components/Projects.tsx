import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Github, ChevronRight, Sparkles } from 'lucide-react';

const techBadges = [
  'React', 'TypeScript', 'C#', 'ASP.NET', 'MySQL/SQL',
  'Python', 'ML', 'Pentaho (Kettle)', 'Docker', 'AWS',
  'Git', 'Shell', 'CSS'
];

const otherProjects = [
  {
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con carrito, pagos y gestión de inventario',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    placeholder: true,
  },
  {
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con colaboración en tiempo real',
    tech: ['TypeScript', 'React', 'WebSockets', 'PostgreSQL'],
    placeholder: true,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Dashboard de analytics con visualizaciones interactivas y reportes',
    tech: ['React', 'D3.js', 'Python', 'FastAPI'],
    placeholder: true,
  },
];

interface ProjectsProps {
  onExpandCaseStudy: () => void;
}

export function Projects({ onExpandCaseStudy }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="projects" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Proyectos
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Soluciones end-to-end que integran desarrollo web, datos y machine learning
          </p>
        </motion.div>

        {/* Featured Project */}
        <motion.div
          id="case-study"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="mb-12 relative"
        >
          <div className="relative z-10 bg-gradient-to-br from-zinc-900 to-zinc-800 border border-cyan-500/30 rounded-2xl overflow-hidden group hover:border-cyan-500/50 transition-all">
            {/* Featured Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-400 text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Featured
            </div>

            {/* Project gif above the card (right) - placed after the card so it layers on top. */}

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      Evalutia
                    </h3>
                    <p className="text-cyan-400 mb-4">2025 • Proyecto en producción</p>
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
                      </a>
                      {' '}con cliente activo.
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-zinc-400">
                        <span className="text-white">Predicción ML:</span> Forecasting de ventas con modelos de machine learning
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                      <p className="text-zinc-400">
                        <span className="text-white">Pipeline ETL:</span> Procesamiento incremental con Pentaho/Kettle
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <p className="text-zinc-400">
                        <span className="text-white">App Web:</span> React + TypeScript con API REST en C#/ASP.NET
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                      <p className="text-zinc-400">
                        <span className="text-white">Infraestructura:</span> Docker + AWS con CI/CD automatizado
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <motion.button
                      onClick={onExpandCaseStudy}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Caso de estudio
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <motion.a
                      href="https://github.com/Evalutia/App-Forecast"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-5 h-5" />
                      Ver Repositorio
                    </motion.a>
                  </div>
                </div>

                {/* Right Content - Tech Stack */}
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

                  {/* Stats */}
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

                  {/* Additional Info */}
                  <div className="p-4 bg-zinc-800/30 border border-zinc-700/50 rounded-lg">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      <span className="text-white font-bold">Metodología:</span> Git Flow, 
                      TDD, code reviews, sprints ágiles y deployment automatizado con Docker.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all" />
          </div>
            {/* Project gif positioned above the card so it appears on top. */}
            <motion.img
              src="/project.gif"
              alt="Project gif"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pointer-events-none select-none absolute -top-20 right-6 w-28 md:w-36 opacity-100 -z-10"
            />
          </motion.div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all group cursor-pointer"
            >
              {project.placeholder && (
                <div className="mb-4 px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-500 text-xs inline-block">
                  En proceso
                </div>
              )}
              <h4 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h4>
              <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}