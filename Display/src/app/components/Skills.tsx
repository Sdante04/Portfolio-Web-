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
      { name: 'React', level: 90, used: 'Evalutia', evidence: 'SPA con estado complejo' },
      { name: 'TypeScript', level: 85, used: 'Evalutia', evidence: 'Type-safe development' },
      { name: 'CSS/Tailwind', level: 80, used: 'Evalutia', evidence: 'Diseño responsive' },
      { name: 'Angular', level: 70, used: 'Proyectos académicos', evidence: 'Enterprise apps' },
    ],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'violet',
    skills: [
      { name: 'C# / ASP.NET', level: 85, used: 'Evalutia', evidence: 'REST API + JWT auth' },
      { name: 'SQL / MySQL', level: 85, used: 'Evalutia', evidence: 'Queries optimizadas' },
      { name: 'Authentication', level: 80, used: 'Evalutia', evidence: 'JWT + hashing' },
    ],
  },
  {
    title: 'Data / ML',
    icon: Database,
    color: 'cyan',
    skills: [
      { name: 'Python', level: 80, used: 'Evalutia', evidence: 'ML pipelines' },
      { name: 'Machine Learning', level: 75, used: 'Evalutia', evidence: 'Forecasting models' },
      { name: 'Pentaho / Kettle', level: 75, used: 'Evalutia', evidence: 'ETL incremental' },
      { name: 'Data Processing', level: 80, used: 'Evalutia', evidence: 'Batch processing' },
    ],
  },
  {
    title: 'DevOps / Infra',
    icon: Cloud,
    color: 'violet',
    skills: [
      { name: 'Docker', level: 80, used: 'Evalutia', evidence: 'Containerización' },
      { name: 'AWS', level: 70, used: 'Evalutia', evidence: 'EC2, RDS, S3' },
      { name: 'Git / Git Flow', level: 85, used: 'Evalutia', evidence: 'Branching strategy' },
      { name: 'CI/CD', level: 75, used: 'Evalutia', evidence: 'Automated deployment' },
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
                          <span className="text-zinc-400 text-xs">{skill.level}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span className="text-cyan-400">→</span>
                          <span>{skill.used}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400">{skill.evidence}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-zinc-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.1, duration: 0.8 }}
                        className={`h-full ${
                          category.color === 'cyan'
                            ? 'bg-gradient-to-r from-cyan-500 to-cyan-400'
                            : 'bg-gradient-to-r from-violet-500 to-violet-400'
                        }`}
                      />
                    </div>
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
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{skill.name}</span>
                  <span className="text-zinc-400 text-xs">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-zinc-700/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ delay: 0.8 + index * 0.05, duration: 0.8 }}
                    className={`h-full ${
                      skill.color === 'cyan'
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-400'
                        : 'bg-gradient-to-r from-violet-500 to-violet-400'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
