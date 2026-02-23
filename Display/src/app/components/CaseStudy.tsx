import { motion, AnimatePresence } from 'motion/react';
import { X, Database, Server, Cloud, Code, Activity, CheckCircle2 } from 'lucide-react';

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
}

const metrics = [
  { label: 'Jobs procesados/día', value: '1,200+', color: 'cyan' },
  { label: 'Latencia API (p95)', value: '< 200ms', color: 'violet' },
  { label: 'Cobertura tests', value: '87%', color: 'green' },
  { label: 'Precisión promedio', value: '92.4%', color: 'cyan' },
];

const challenges = [
  'Procesamiento eficiente de grandes volúmenes de datos históricos',
  'Diseño de pipeline ETL incremental para actualizaciones diarias',
  'Integración de modelos ML en arquitectura de microservicios',
  'Optimización de consultas SQL para dashboards en tiempo real',
  'Implementación de CI/CD con testing automatizado',
];

export function CaseStudy({ isOpen, onClose }: CaseStudyProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-700 rounded-2xl max-w-6xl w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
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

                  {/* Problem */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-400">01</span>
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
                        <span className="text-violet-400">02</span>
                      </div>
                      Enfoque
                    </h3>
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      Diseñamos una arquitectura de microservicios que separa concerns: web app para UI/UX, 
                      API REST para lógica de negocio, worker para procesamiento ML, y pipeline ETL para 
                      ingesta incremental de datos. Implementamos Git Flow, TDD y deployment automatizado.
                    </p>
                  </motion.div>

                  {/* Architecture Diagram */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-8"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-400">03</span>
                      </div>
                      Arquitectura
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {/* WebApp */}
                      <div className="bg-zinc-900/80 border border-cyan-500/30 rounded-lg p-4 text-center">
                        <Code className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-sm mb-1">WebApp</p>
                        <p className="text-zinc-400 text-xs">React + TS</p>
                      </div>

                      {/* API */}
                      <div className="bg-zinc-900/80 border border-violet-500/30 rounded-lg p-4 text-center">
                        <Server className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-sm mb-1">API</p>
                        <p className="text-zinc-400 text-xs">C# ASP.NET</p>
                      </div>

                      {/* Worker */}
                      <div className="bg-zinc-900/80 border border-cyan-500/30 rounded-lg p-4 text-center">
                        <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-sm mb-1">Worker</p>
                        <p className="text-zinc-400 text-xs">Python ML</p>
                      </div>

                      {/* Database */}
                      <div className="bg-zinc-900/80 border border-violet-500/30 rounded-lg p-4 text-center">
                        <Database className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-sm mb-1">DB</p>
                        <p className="text-zinc-400 text-xs">MySQL</p>
                      </div>

                      {/* ETL */}
                      <div className="bg-zinc-900/80 border border-cyan-500/30 rounded-lg p-4 text-center">
                        <Cloud className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <p className="text-white font-bold text-sm mb-1">ETL</p>
                        <p className="text-zinc-400 text-xs">Pentaho</p>
                      </div>
                    </div>

                    <div className="mt-4 text-center text-zinc-500 text-sm">
                      Deployado en AWS con Docker + CI/CD
                    </div>
                  </motion.div>

                  {/* Challenges */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-violet-400">04</span>
                      </div>
                      Desafíos Técnicos
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {challenges.map((challenge, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <p className="text-zinc-300 text-sm">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Results/Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-cyan-400">05</span>
                      </div>
                      Resultados
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className={`bg-zinc-800/50 border ${
                            metric.color === 'cyan'
                              ? 'border-cyan-500/30'
                              : metric.color === 'violet'
                              ? 'border-violet-500/30'
                              : 'border-green-500/30'
                          } rounded-lg p-4 text-center`}
                        >
                          <p className="text-zinc-400 text-sm mb-2">{metric.label}</p>
                          <p
                            className={`text-2xl font-bold ${
                              metric.color === 'cyan'
                                ? 'text-cyan-400'
                                : metric.color === 'violet'
                                ? 'text-violet-400'
                                : 'text-green-400'
                            }`}
                          >
                            {metric.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-lg">
                      <p className="text-zinc-300 text-sm text-center">
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
