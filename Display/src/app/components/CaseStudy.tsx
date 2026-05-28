import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

const metrics = [
  { label: 'Jobs procesados/día', value: 1200, suffix: '+', color: 'cyan' },
  { label: 'Latencia API (p95)', value: 200, suffix: 'ms', color: 'violet', prefix: '< ' },
  { label: 'Cobertura tests', value: 87, suffix: '%', color: 'green' },
  { label: 'Precisión promedio', value: 92.4, suffix: '%', color: 'cyan', decimals: 1 },
];

const challenges = [
  'Procesamiento eficiente de grandes volúmenes de datos históricos',
  'Diseño de pipeline ETL incremental para actualizaciones diarias',
  'Integración de modelos ML en arquitectura de microservicios',
  'Optimización de consultas SQL para dashboards en tiempo real',
  'Implementación de CI/CD con testing automatizado',
];

// SVG architecture nodes
const archNodes = [
  { id: 'webapp', label: 'WebApp', sub: 'React + TS', x: 30, color: '#22d3ee' },
  { id: 'api', label: 'API', sub: 'C# ASP.NET', x: 170, color: '#a78bfa' },
  { id: 'worker', label: 'Worker', sub: 'Python ML', x: 310, color: '#22d3ee' },
  { id: 'db', label: 'DB', sub: 'MySQL', x: 450, color: '#a78bfa' },
  { id: 'etl', label: 'ETL', sub: 'Pentaho', x: 590, color: '#22d3ee' },
];

const archArrows = [
  { id: 'a1', d: 'M 130,70 L 165,70', color: '#22d3ee' },
  { id: 'a2', d: 'M 270,70 L 305,70', color: '#a78bfa' },
  { id: 'a3', d: 'M 410,70 L 445,70', color: '#22d3ee' },
  { id: 'a4', d: 'M 550,70 L 585,70', color: '#a78bfa' },
];

function MetricCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  color,
  active,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  color: string;
  active: boolean;
}) {
  const count = useCountUp(value, 1400, active, decimals);
  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
  const colorClass =
    color === 'cyan'
      ? 'text-cyan-400'
      : color === 'violet'
      ? 'text-violet-400'
      : 'text-green-400';

  return (
    <span className={`text-2xl font-bold ${colorClass}`}>
      {prefix}{display}{suffix}
    </span>
  );
}

function ArchitectureDiagram({ animate }: { animate: boolean }) {
  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox="0 0 720 140"
        className="w-full min-w-[480px]"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <marker id="arrow-cyan" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#22d3ee" opacity="0.8" />
          </marker>
          <marker id="arrow-violet" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#a78bfa" opacity="0.8" />
          </marker>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Animated arrows */}
        {archArrows.map((arrow, i) => (
          <motion.path
            key={arrow.id}
            d={arrow.d}
            stroke={arrow.color}
            strokeWidth="1.5"
            fill="none"
            strokeOpacity="0.7"
            markerEnd={`url(#arrow-${arrow.color === '#22d3ee' ? 'cyan' : 'violet'})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.25 + 0.6, duration: 0.35 }}
          />
        ))}

        {/* Nodes */}
        {archNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, y: 12 }}
            animate={animate ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12 + 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Node box */}
            <rect
              x={node.x}
              y={35}
              width={100}
              height={70}
              rx={8}
              fill="#18181b"
              stroke={node.color}
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            {/* Subtle inner fill */}
            <rect
              x={node.x + 1}
              y={36}
              width={98}
              height={68}
              rx={7}
              fill={node.color}
              fillOpacity="0.04"
            />
            {/* Label */}
            <text
              x={node.x + 50}
              y={67}
              textAnchor="middle"
              fill="white"
              fontSize={13}
              fontWeight={700}
              fontFamily="Inter, -apple-system, sans-serif"
            >
              {node.label}
            </text>
            {/* Sublabel */}
            <text
              x={node.x + 50}
              y={84}
              textAnchor="middle"
              fill={node.color}
              fontSize={10}
              fontFamily="Inter, -apple-system, sans-serif"
              opacity="0.8"
            >
              {node.sub}
            </text>
          </motion.g>
        ))}
      </svg>

      <div className="mt-3 text-center text-zinc-500 text-xs">
        Deployado en AWS con Docker + CI/CD automatizado
      </div>
    </div>
  );
}

export function CaseStudy({ isOpen, onClose }: CaseStudyProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700 rounded-2xl max-w-6xl w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="p-8 lg:p-12 space-y-12">
                  {/* Header */}
                  <div className="text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl sm:text-4xl font-bold mb-4"
                    >
                      <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                        Caso de Estudio: Evalutia
                      </span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-zinc-400 text-lg"
                    >
                      Plataforma de predicción de ventas con ML, ETL y aplicación web
                    </motion.p>
                  </div>

                  {/* Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className={`bg-zinc-800/60 border rounded-xl p-5 text-center ${
                          m.color === 'cyan'
                            ? 'border-cyan-500/20'
                            : m.color === 'violet'
                            ? 'border-violet-500/20'
                            : 'border-green-500/20'
                        }`}
                      >
                        <MetricCounter
                          value={m.value}
                          suffix={m.suffix}
                          prefix={m.prefix}
                          decimals={m.decimals}
                          color={m.color}
                          active={isOpen}
                        />
                        <p className="text-zinc-400 text-xs mt-2">{m.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Problem */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-400 text-sm font-bold">01</span>
                      </div>
                      Problema
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                      Las empresas necesitan predecir demanda futura para optimizar inventario y compras.
                      El cliente requería una solución automatizada que procesara datos históricos de ventas,
                      generara forecasts confiables y presentara resultados en una interfaz intuitiva,
                      todo integrado con sus sistemas existentes.
                    </p>
                  </motion.div>

                  {/* Approach */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-sm font-bold">02</span>
                      </div>
                      Enfoque
                    </h3>
                    <p className="text-zinc-300 leading-relaxed">
                      Diseñamos una arquitectura de microservicios que separa concerns: web app para UI/UX,
                      API REST para lógica de negocio, worker para procesamiento ML, y pipeline ETL para
                      ingesta incremental de datos. Implementamos Git Flow, TDD y deployment automatizado.
                    </p>
                  </motion.div>

                  {/* Architecture SVG Diagram */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-8"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-400 text-sm font-bold">03</span>
                      </div>
                      Arquitectura
                    </h3>
                    <ArchitectureDiagram animate={isOpen} />
                  </motion.div>

                  {/* Challenges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400 text-sm font-bold">04</span>
                      </div>
                      Desafíos Técnicos
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {challenges.map((challenge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.65 + index * 0.07 }}
                          className="flex items-start gap-3 bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-zinc-300 text-sm">{challenge}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Results */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-400 text-sm font-bold">05</span>
                      </div>
                      Resultados
                    </h3>
                    <div className="p-5 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl">
                      <p className="text-zinc-300 text-sm text-center leading-relaxed">
                        <span className="text-white font-bold">Sistema en producción</span> en evalutia.net
                        con cliente activo. Procesamiento automatizado diario y forecasts actualizados en tiempo real.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
