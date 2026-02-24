import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Target, Code2, Users, TrendingUp } from 'lucide-react';

const priorities = [
  {
    icon: Target,
    title: 'Calidad',
    description: 'Código limpio, testeado y mantenible',
  },
  {
    icon: Code2,
    title: 'Mantenibilidad',
    description: 'Arquitecturas escalables y documentadas',
  },
  {
    icon: TrendingUp,
    title: 'Entrega de valor',
    description: 'Foco en resolver problemas reales',
  },
  {
    icon: Users,
    title: 'Aprendizaje',
    description: 'Mejora continua y adaptación',
  },
];

const timeline = [
  { year: '2022', event: 'Inicio Lic. en Sistemas - ORT', highlight: true },
  { year: '2023', event: 'Comienzo de primer proyecto personal' },
  { year: '2024', event: 'Full-stack development' },
  { year: '2025', event: 'Evalutia ML Platform', highlight: true },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Sobre mí
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-zinc-400 text-lg max-w-3xl mx-auto"
            >
              Desarrollador proactivo con fuerte orientación a la calidad y el aprendizaje continuo
            </motion.p>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-start">
            {/* About gif between columns: place file at public/about.gif */}
            <motion.img
              src="/About.gif"
              alt="About gif"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pointer-events-none select-none absolute bottom-0 left-[36%] lg:left-[38%] -translate-x-1/2 w-48 md:w-56 opacity-100"
            />
            {/* Left Column - About Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 leading-relaxed">
                  Soy un desarrollador full-stack con pasión por construir soluciones tecnológicas 
                  completas, desde algunas sencillas como interfaces de usuario o paginas web hasta 
                  mas complejas como pipelines de datos y modelos de ML. 
                  Mi enfoque combina <span className="text-cyan-400">proactividad</span>, 
                  <span className="text-violet-400"> autonomía</span> y una fuerte 
                  <span className="text-cyan-400"> orientación a la calidad</span>.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  Me destaco por mi <span className="text-violet-400">pensamiento analítico</span> y 
                  capacidad de <span className="text-cyan-400">colaboración en equipo</span>. 
                  Valoro la retroalimentación como herramienta de crecimiento y aprovecho la IA 
                  como complemento para acelerar el desarrollo sin comprometer la calidad del código.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  Actualmente cursando el 8º semestre de Licenciatura en Sistemas en Universidad ORT, 
                  he trabajado en proyectos reales que integran desarrollo web, procesamiento de datos 
                  y machine learning, siempre con énfasis en TDD, Git Flow y mejores prácticas.
                </p>
              </div>

              {/* Mini Timeline */}
              <div className="pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Trayectoria</h3>
                <div className="space-y-3">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-16 font-bold ${item.highlight ? 'text-cyan-400' : 'text-zinc-500'}`}>
                        {item.year}
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.highlight ? 'bg-cyan-400' : 'bg-zinc-600'}`} />
                        <span className={`${item.highlight ? 'text-white' : 'text-zinc-400'}`}>
                          {item.event}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Priorities */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Mis Prioridades</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {priorities.map((priority, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group cursor-default"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <priority.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h4 className="text-white font-bold mb-2">{priority.title}</h4>
                    <p className="text-zinc-400 text-sm">{priority.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Soft Skills */}
              <div className="mt-8 p-6 bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur border border-zinc-700/50 rounded-xl">
                <h4 className="text-white font-bold mb-4">Habilidades clave</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Colaboración',
                    'Gestión del tiempo',
                    'Adaptabilidad',
                    'Orientación a calidad',
                    'Escucha activa',
                    'Autonomía',
                    'Pensamiento analítico',
                    'Apertura al feedback',
                  ].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="px-3 py-1 bg-zinc-700/50 text-zinc-300 rounded-full text-sm border border-zinc-600/50 hover:border-violet-500/50 hover:text-violet-400 transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
