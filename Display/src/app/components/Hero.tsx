import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { useCountUp } from '../hooks/useCountUp';
import { MagneticButton } from './MagneticButton';

const techStack = [
  'React', 'TypeScript', 'C#', 'ASP.NET', 'MySQL/SQL',
  'Python', 'ML', 'Pentaho/Kettle', 'Docker', 'AWS', 'Git',
];

const mockData = [
  { name: 'Ene', value: 4200 },
  { name: 'Feb', value: 4800 },
  { name: 'Mar', value: 5100 },
  { name: 'Abr', value: 4900 },
  { name: 'May', value: 5400 },
  { name: 'Jun', value: 5800 },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

function KpiCounter({
  value,
  suffix = '',
  decimals = 0,
  active,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  active: boolean;
}) {
  const count = useCountUp(value, 1600, active, decimals);
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
  return (
    <span>
      {display}{suffix}
    </span>
  );
}

export function Hero() {
  const dashboardRef = useRef(null);
  const dashboardInView = useInView(dashboardRef, { once: true, amount: 0.5 });

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full py-12 sm:py-20">
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
                Full-Stack Developer • ML Enthusiast • DevOps
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mt-6"
            >
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                Construyo software
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                end-to-end
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-zinc-400 leading-relaxed mt-6"
            >
              Web, datos y predicción. Estudiante avanzado de{' '}
              <span className="text-cyan-400">Licenciatura en Sistemas</span>{' '}
              (Universidad ORT, 2022–Actualidad, 8º semestre) con experiencia
              en desarrollo full-stack, ML y DevOps.
            </motion.p>

            {/* Tech Stack Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-6">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-md text-zinc-300 text-sm hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
              <MagneticButton>
                <motion.button
                  onClick={() => document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Explorar caso Evalutia
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </MagneticButton>

              <MagneticButton>
                <motion.button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Ver proyectos
                </motion.button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Content - Mini Dashboard */}
          <motion.div
            ref={dashboardRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30"
          >
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-zinc-400 text-sm">Predicción de ventas</h3>
                  <p className="text-2xl font-bold text-white mt-1">Evalutia ML</p>
                </div>
                <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-xs flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Operacional
                </div>
              </div>

              {/* KPI Cards with counter animation */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700/30">
                  <p className="text-zinc-400 text-xs mb-1">Precisión promedio</p>
                  <p className="text-2xl font-bold text-cyan-400">
                    <KpiCounter value={91.4} decimals={1} suffix="%" active={dashboardInView} />
                  </p>
                  <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +5.2%
                  </div>
                </div>
                <div className="bg-zinc-800/50 backdrop-blur rounded-lg p-4 border border-zinc-700/30">
                  <p className="text-zinc-400 text-xs mb-1">SKUs procesados</p>
                  <p className="text-2xl font-bold text-violet-400">
                    <KpiCounter value={1247} active={dashboardInView} />
                  </p>
                  <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +18
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-zinc-800/30 backdrop-blur rounded-lg p-4 border border-zinc-700/30">
                <p className="text-zinc-400 text-xs mb-3">Forecast últimos 6 meses</p>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={mockData}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22d3ee"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-zinc-700/30 flex items-center justify-between text-xs text-zinc-500">
                <span>Última actualización: Hoy, 03:00</span>
                <span className="text-cyan-400">evalutia.net</span>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
