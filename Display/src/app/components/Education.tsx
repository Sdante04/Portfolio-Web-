import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const education = [
  {
    institution: 'Universidad ORT',
    degree: 'Licenciatura en Sistemas',
    period: '2022 – Actualidad',
    status: '8º semestre en curso',
    highlight: true,
    icon: GraduationCap,
  },
  {
    institution: 'Preuniversitario (PRE/U)',
    degree: 'Físico-Matemático',
    period: '2020 – 2022',
    status: 'Completado',
    highlight: false,
    icon: GraduationCap,
  },
  {
    institution: 'St. Georges Secondary School',
    degree: 'Educación Secundaria',
    period: '2016 – 2020',
    status: 'Completado',
    highlight: false,
    icon: GraduationCap,
  },
];

const certifications = [
  {
    title: 'Cambridge IGCSE ICT',
    issuer: 'Cambridge Assessment',
    year: '2019',
    icon: Award,
  },
  {
    title: 'Michigan Proficiency (Inglés)',
    issuer: 'Michigan University',
    year: '2021',
    icon: Award,
  },
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="education" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
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
              Educación y Certificaciones
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Formación académica y certificaciones que complementan mi desarrollo profesional
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              Educación
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent" />

              <div className="space-y-8">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="relative pl-14"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        edu.highlight
                          ? 'bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border-2 border-cyan-500/50'
                          : 'bg-zinc-800/50 border border-zinc-700'
                      }`}
                    >
                      <edu.icon
                        className={`w-5 h-5 ${
                          edu.highlight ? 'text-cyan-400' : 'text-zinc-400'
                        }`}
                      />
                    </div>

                    <div
                      className={`bg-zinc-800/50 backdrop-blur border ${
                        edu.highlight ? 'border-cyan-500/30' : 'border-zinc-700/50'
                      } rounded-xl p-6 hover:border-zinc-600 transition-all`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h4
                            className={`font-bold mb-1 ${
                              edu.highlight ? 'text-cyan-400' : 'text-white'
                            }`}
                          >
                            {edu.degree}
                          </h4>
                          <p className="text-zinc-400 text-sm">{edu.institution}</p>
                        </div>
                        <div className="flex items-center gap-1 text-zinc-500 text-xs shrink-0">
                          <Calendar className="w-3 h-3" />
                          {edu.period}
                        </div>
                      </div>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs ${
                          edu.highlight
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-zinc-700/50 text-zinc-400'
                        }`}
                      >
                        {edu.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-violet-400" />
              </div>
              Certificaciones
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-violet-500/30 hover:bg-zinc-800/80 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500/20 to-violet-500/5 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <cert.icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-1">{cert.title}</h4>
                      <p className="text-zinc-400 text-sm mb-2">{cert.issuer}</p>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 bg-violet-500/20 rounded-full text-violet-400 text-xs">
                          {cert.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Aprendizaje Continuo</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Además de la formación académica, mantengo actualización constante a través 
                    de documentación oficial, cursos online y proyectos prácticos. Enfoque en 
                    arquitecturas modernas, DevOps y ML engineering.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
