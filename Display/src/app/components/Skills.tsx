import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Code2, Database, Cloud, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'cyan',
    skills: [
      { name: 'React', level: 82, used: 'Evalutia', evidence: 'SPA con estado complejo' },
      { name: 'TypeScript', level: 78, used: 'Evalutia', evidence: 'Desarrollo tipado y escalable' },
      { name: 'HTML / CSS', level: 88, used: 'CV projects', evidence: 'Interfaces responsivas y accesibles' },
      { name: 'Tailwind CSS', level: 82, used: 'Evalutia', evidence: 'Diseño rápido y consistente' },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'violet',
    skills: [
      { name: 'C# / ASP.NET', level: 78, used: 'Evalutia', evidence: 'APIs REST con seguridad y manejo de datos' },
      { name: 'SQL / MySQL', level: 74, used: 'CV projects', evidence: 'Modelado relacional y consultas optimizadas' },
      { name: 'REST APIs', level: 80, used: 'CV projects', evidence: 'Servicios backend para integración de clientes' },
    ],
  },
  {
    title: 'Data / ML',
    icon: Database,
    color: 'cyan',
    skills: [
      { name: 'Python', level: 72, used: 'Evalutia', evidence: 'Pipelines y scripts de datos' },
      { name: 'Machine Learning', level: 65, used: 'Evalutia', evidence: 'Modelos de predicción y análisis de datos' },
      { name: 'Pentaho / Kettle', level: 62, used: 'Evalutia', evidence: 'ETL y orquestación de datos' },
      { name: 'Data Processing', level: 70, used: 'CV projects', evidence: 'Transformación y limpieza de datos' },
    ],
  },
  {
    title: 'DevOps / Infra',
    icon: Cloud,
    color: 'violet',
    skills: [
      { name: 'Docker', level: 68, used: 'Evalutia', evidence: 'Contenedores para despliegues reproducibles' },
      { name: 'AWS', level: 62, used: 'Evalutia', evidence: 'Despliegue y gestión en la nube' },
      { name: 'Git', level: 85, used: 'Evalutia', evidence: 'Control de versiones y workflows colaborativos' },
      { name: 'CI/CD', level: 68, used: 'Evalutia', evidence: 'Integración y despliegue automatizado' },
    ],
  },
];

const softSkills = [
  { name: 'Colaboración', color: 'cyan' },
  { name: 'Gestión del tiempo', color: 'violet' },
  { name: 'Adaptabilidad', color: 'cyan' },
  { name: 'Orientación a calidad', color: 'violet' },
  { name: 'Escucha activa', color: 'cyan' },
  { name: 'Autonomía', color: 'violet' },
];

type LevelLabel = 'Avanzado' | 'Intermedio' | 'Básico';

function getLevelLabel(level: number): LevelLabel {
  if (level >= 78) return 'Avanzado';
  if (level >= 65) return 'Intermedio';
  return 'Básico';
}

const levelStyle: Record<LevelLabel, string> = {
  Avanzado: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  Intermedio: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
  Básico: 'bg-zinc-700/50 text-zinc-400 border border-zinc-600/30',
};

function SkillBar({
  name,
  level,
  color,
  evidence,
  used,
  active,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  evidence: string;
  used: string;
  active: boolean;
  delay: number;
}) {
  const label = getLevelLabel(level);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-white font-medium text-sm">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelStyle[label]}`}
        >
          {label}
        </motion.span>
      </div>
      {/* Bar */}
      <div className="h-1.5 bg-zinc-700/60 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            color === 'cyan'
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-300'
              : 'bg-gradient-to-r from-violet-500 to-violet-300'
          }`}
          initial={{ scaleX: 0 }}
          animate={active ? { scaleX: 1 } : {}}
          transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left', width: `${level}%` }}
        />
      </div>
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <span className="text-cyan-400/70">→</span>
        <span>{used}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-400">{evidence}</span>
      </div>
    </div>
  );
}

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
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
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

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-zinc-600 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    category.color === 'cyan'
                      ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/5'
                      : 'bg-gradient-to-br from-violet-500/20 to-violet-500/5'
                  }`}
                >
                  <category.icon
                    className={`w-5 h-5 ${
                      category.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    evidence={skill.evidence}
                    used={skill.used}
                    active={isInView}
                    delay={0.35 + categoryIndex * 0.1 + skillIndex * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.55 }}
          className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur border border-zinc-700/50 rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
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
                transition={{ delay: 0.75 + index * 0.07 }}
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
