import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Target, Code2, Users, TrendingUp } from 'lucide-react';

const priorities = [
  { icon: Target, title: 'Calidad', description: 'Código limpio, testeado y mantenible' },
  { icon: Code2, title: 'Mantenibilidad', description: 'Arquitecturas escalables y documentadas' },
  { icon: TrendingUp, title: 'Entrega de valor', description: 'Foco en resolver problemas reales' },
  { icon: Users, title: 'Aprendizaje', description: 'Mejora continua y adaptación' },
];

const timeline = [
  { year: '2022', event: 'Inicio Lic. en Sistemas — ORT', highlight: true },
  { year: '2023', event: 'Primer proyecto personal' },
  { year: '2024', event: 'Full-stack development' },
  { year: '2025', event: 'Experiencia profesional en Evalutia', highlight: true },
];

const softSkills = [
  'Colaboración', 'Gestión del tiempo', 'Adaptabilidad', 'Orientación a calidad',
  'Escucha activa', 'Autonomía', 'Pensamiento analítico', 'Apertura al feedback',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
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
              Sobre mí
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Desarrollador proactivo con fuerte orientación a la calidad y el aprendizaje continuo
          </motion.p>
        </motion.div>

        <div className="relative grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                Soy un desarrollador full-stack con pasión por construir soluciones tecnológicas
                completas, desde interfaces de usuario hasta pipelines de datos y modelos de ML.
                Mi enfoque combina <span className="text-cyan-400">proactividad</span>,{' '}
                <span className="text-violet-400">autonomía</span> y una fuerte{' '}
                <span className="text-cyan-400">orientación a la calidad</span>.
              </p>
              <p>
                Me destaco por mi <span className="text-violet-400">pensamiento analítico</span> y
                capacidad de <span className="text-cyan-400">colaboración en equipo</span>.
                Valoro la retroalimentación como herramienta de crecimiento y aprovecho la IA
                como complemento para acelerar el desarrollo sin comprometer la calidad del código.
              </p>
              <p>
                Actualmente cursando el 8º semestre de Licenciatura en Sistemas en Universidad ORT,
                cuento con experiencia profesional en Evalutia, donde integré desarrollo web,
                procesamiento de datos y machine learning con énfasis en TDD, Git Flow y mejores prácticas.
              </p>
            </div>

            {/* Timeline */}
            <div className="pt-6">
              <h3 className="text-xl font-bold text-white mb-6">Trayectoria</h3>
              <div className="relative space-y-4 pl-6 border-l border-zinc-700/50">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.45 }}
                    className="relative"
                  >
                    {/* dot */}
                    <div
                      className={`absolute -left-[25px] w-3 h-3 rounded-full mt-1 border-2 ${
                        item.highlight
                          ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
                          : 'bg-zinc-700 border-zinc-600'
                      }`}
                    />
                    <div className="flex items-baseline gap-3">
                      <span className={`font-bold text-sm w-12 shrink-0 ${item.highlight ? 'text-cyan-400' : 'text-zinc-500'}`}>
                        {item.year}
                      </span>
                      <span className={item.highlight ? 'text-white' : 'text-zinc-400'}>
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
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Mis Prioridades</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {priorities.map((priority, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-default"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg flex items-center justify-center mb-4">
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
                {softSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    whileHover={{ scale: 1.06 }}
                    className="px-3 py-1 bg-zinc-700/50 text-zinc-300 rounded-full text-sm border border-zinc-600/50 hover:border-violet-500/50 hover:text-violet-400 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
