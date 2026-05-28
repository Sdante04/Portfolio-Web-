import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Code2, Database, Cloud, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'cyan',
    skills: [
      { name: 'React',         used: 'Evalutia',    evidence: 'SPA con estado complejo' },
      { name: 'TypeScript',    used: 'Evalutia',    evidence: 'Desarrollo tipado y escalable' },
      { name: 'HTML / CSS',    used: 'CV projects', evidence: 'Interfaces responsivas y accesibles' },
      { name: 'Tailwind CSS',  used: 'Evalutia',    evidence: 'Diseño rápido y consistente' },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'violet',
    skills: [
      { name: 'C# / ASP.NET', used: 'Evalutia',    evidence: 'APIs REST con seguridad y manejo de datos' },
      { name: 'SQL / MySQL',   used: 'CV projects', evidence: 'Modelado relacional y consultas optimizadas' },
      { name: 'REST APIs',     used: 'CV projects', evidence: 'Servicios backend para integración de clientes' },
    ],
  },
  {
    title: 'Data / ML',
    icon: Database,
    color: 'cyan',
    skills: [
      { name: 'Python',           used: 'Evalutia',    evidence: 'Pipelines y scripts de datos' },
      { name: 'Machine Learning', used: 'Evalutia',    evidence: 'Modelos de predicción y análisis de datos' },
      { name: 'Pentaho / Kettle', used: 'Evalutia',    evidence: 'ETL y orquestación de datos' },
      { name: 'Data Processing',  used: 'CV projects', evidence: 'Transformación y limpieza de datos' },
    ],
  },
  {
    title: 'DevOps / Infra',
    icon: Cloud,
    color: 'violet',
    skills: [
      { name: 'Docker', used: 'Evalutia',    evidence: 'Contenedores para despliegues reproducibles' },
      { name: 'AWS',    used: 'Evalutia',    evidence: 'Despliegue y gestión en la nube' },
      { name: 'Git',    used: 'Evalutia',    evidence: 'Control de versiones y workflows colaborativos' },
      { name: 'CI/CD',  used: 'Evalutia',    evidence: 'Integración y despliegue automatizado' },
    ],
  },
];

const softSkills = [
  { name: 'Colaboración',          color: 'cyan' },
  { name: 'Gestión del tiempo',    color: 'violet' },
  { name: 'Adaptabilidad',         color: 'cyan' },
  { name: 'Orientación a calidad', color: 'violet' },
  { name: 'Escucha activa',        color: 'cyan' },
  { name: 'Autonomía',             color: 'violet' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
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
              Skills Demostrables
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Capacidades técnicas con evidencia real de proyectos en producción
          </motion.p>
        </motion.div>

        {/* Technical Skills — 2×2 grid of category cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, catIdx) => {
            const isCyan = category.color === 'cyan';
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + catIdx * 0.1, duration: 0.55 }}
                className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-zinc-600 transition-all"
              >
                {/* Card header */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isCyan
                        ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/5'
                        : 'bg-gradient-to-br from-violet-500/20 to-violet-500/5'
                    }`}
                  >
                    <category.icon
                      className={`w-5 h-5 ${isCyan ? 'text-cyan-400' : 'text-violet-400'}`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-3 justify-center">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + catIdx * 0.08 + skillIdx * 0.06 }}
                      whileHover={{ y: -2 }}
                      className={`group relative px-4 py-2.5 rounded-lg border cursor-default transition-all duration-200 ${
                        isCyan
                          ? 'border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/50 hover:bg-cyan-500/10'
                          : 'border-violet-500/20 bg-violet-500/5 hover:border-violet-500/50 hover:bg-violet-500/10'
                      }`}
                    >
                      <p className={`text-sm font-semibold text-center ${isCyan ? 'text-cyan-100' : 'text-violet-100'}`}>
                        {skill.name}
                      </p>
                      {/* Context revealed on hover */}
                      <p className="text-xs text-zinc-500 mt-0.5 group-hover:text-zinc-400 transition-colors text-center">
                        {skill.evidence}
                      </p>
                      {/* Origin tag */}
                      <span
                        className={`absolute -top-2 -right-2 text-[10px] font-medium px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                          isCyan
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                        }`}
                      >
                        {skill.used}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.55 }}
          className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur border border-zinc-700/50 rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Soft Skills</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.07 }}
                whileHover={{ scale: 1.03 }}
                className={`border rounded-lg p-4 flex items-center justify-center text-center cursor-default transition-all ${
                  skill.color === 'cyan'
                    ? 'border-cyan-500/30 hover:bg-cyan-500/8 hover:border-cyan-500/60'
                    : 'border-violet-500/30 hover:bg-violet-500/8 hover:border-violet-500/60'
                }`}
              >
                <span className="text-white font-medium text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
