import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Database, Cloud, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'cyan',
    skills: [
      { name: 'React', used: 'Evalutia', evidence: 'SPA con estado complejo' },
      { name: 'TypeScript', used: 'Evalutia', evidence: 'Desarrollo tipado y escalable' },
      { name: 'HTML / CSS', used: 'CV projects', evidence: 'Interfaces responsivas y accesibles' },
      { name: 'Tailwind CSS', used: 'Evalutia', evidence: 'Diseño rápido y consistente' },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'violet',
    skills: [
      { name: 'C# / ASP.NET', used: 'Evalutia', evidence: 'APIs REST con seguridad y manejo de datos' },
      { name: 'SQL / MySQL', used: 'CV projects', evidence: 'Modelado relacional y consultas optimizadas' },
      { name: 'REST APIs', used: 'CV projects', evidence: 'Servicios backend para integración de clientes' },
    ],
  },
  {
    title: 'Data / ML',
    icon: Database,
    color: 'cyan',
    skills: [
      { name: 'Python', used: 'Evalutia', evidence: 'Pipelines y scripts de datos' },
      { name: 'Machine Learning', used: 'Evalutia', evidence: 'Modelos de predicción y análisis de datos' },
      { name: 'Pentaho / Kettle', used: 'Evalutia', evidence: 'ETL y orquestación de datos' },
      { name: 'Data Processing', used: 'CV projects', evidence: 'Transformación y limpieza de datos' },
    ],
  },
  {
    title: 'DevOps / Infra',
    icon: Cloud,
    color: 'violet',
    skills: [
      { name: 'Docker', used: 'Evalutia', evidence: 'Contenedores para despliegues reproducibles' },
      { name: 'AWS', used: 'Evalutia', evidence: 'Despliegue y gestión en la nube' },
      { name: 'Git', used: 'Evalutia', evidence: 'Control de versiones y workflows colaborativos' },
      { name: 'CI/CD', used: 'Evalutia', evidence: 'Integración y despliegue automatizado' },
    ],
  },
];

const softSkills = [
  { name: 'Colaboración', level: 90, icon: Users, color: 'cyan' },
  { name: 'Gestión del tiempo', level: 85, icon: Users, color: 'violet' },
  { name: 'Adaptabilidad', level: 90, icon: Users, color: 'cyan' },
  { name: 'Orientación a calidad', level: 95, icon: Users, color: 'violet' },
  { name: 'Escucha activa', level: 85, icon: Users, color: 'cyan' },
  { name: 'Autonomía', level: 90, icon: Users, color: 'violet' },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
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
              Skills Demostrables
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Capacidades técnicas con evidencia real de proyectos en producción
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-zinc-600 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${
                    category.color === 'cyan'
                      ? 'from-cyan-500/20 to-cyan-500/5'
                      : 'from-violet-500/20 to-violet-500/5'
                  } rounded-lg flex items-center justify-center`}
                >
                  <category.icon
                    className={`w-5 h-5 ${
                      category.color === 'cyan' ? 'text-cyan-400' : 'text-violet-400'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium text-sm">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span className="text-cyan-400">→</span>
                          <span>{skill.used}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400">{skill.evidence}</span>
                        </div>
                      </div>
                    </div>
                    {/* end skill info */}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur border border-zinc-700/50 rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Soft Skills</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`border rounded-lg p-4 hover:border-zinc-600 transition-all flex items-center justify-center text-center ${
                  skill.color === 'cyan'
                    ? 'border-cyan-500/30 hover:bg-cyan-500/5'
                    : 'border-violet-500/30 hover:bg-violet-500/5'
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
