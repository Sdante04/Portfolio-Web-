import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Code2, TrendingUp, Database, Play, CheckCircle2, Terminal, Loader2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const forecastData = [
  { date: '2025-02', value: 4200 },
  { date: '2025-03', value: 4800 },
  { date: '2025-04', value: 5100 },
  { date: '2025-05', value: 4900 },
  { date: '2025-06', value: 5400 },
  { date: '2025-07', value: 5800 },
  { date: '2025-08', value: 6100 },
];

const apiEndpoints = [
  { method: 'GET', path: '/api/forecast/{sku}', description: 'Obtener predicción para un SKU' },
  { method: 'POST', path: '/api/forecast/bulk', description: 'Predicción masiva de SKUs' },
  { method: 'GET', path: '/api/metrics', description: 'Métricas del sistema' },
  { method: 'POST', path: '/api/auth/login', description: 'Autenticación JWT' },
];

const STEPS_INITIAL = [
  { id: 1, name: 'Extract', time: '2.3s', status: 'pending' as const },
  { id: 2, name: 'Transform', time: '8.7s', status: 'pending' as const },
  { id: 3, name: 'Validate', time: '1.2s', status: 'pending' as const },
  { id: 4, name: 'Load', time: '3.8s', status: 'pending' as const },
  { id: 5, name: 'Index', time: '2.1s', status: 'pending' as const },
];

type StepStatus = 'pending' | 'running' | 'completed';

interface Step {
  id: number;
  name: string;
  time: string;
  status: StepStatus;
}

const STEP_DELAYS = [900, 1600, 1200, 1400, 1100];

function useEtlAutoplay(active: boolean) {
  const [steps, setSteps] = useState<Step[]>(STEPS_INITIAL);
  const [running, setRunning] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reset = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setSteps(STEPS_INITIAL);
    setRunning(false);
  };

  const run = () => {
    reset();
    setRunning(true);
    let cumulative = 200;

    STEPS_INITIAL.forEach((_, i) => {
      // Mark current step as running
      const t1 = setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'running' } : s)),
        );
      }, cumulative);

      cumulative += STEP_DELAYS[i];

      // Mark current step as completed
      const t2 = setTimeout(() => {
        setSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'completed' } : s)),
        );
        if (i === STEPS_INITIAL.length - 1) setRunning(false);
      }, cumulative);

      timeoutsRef.current.push(t1, t2);
    });
  };

  // Auto-run when tab becomes active
  useEffect(() => {
    if (active) {
      run();
    } else {
      reset();
    }
    return () => { timeoutsRef.current.forEach(clearTimeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const allDone = steps.every((s) => s.status === 'completed');

  return { steps, running, allDone, run, reset };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<'api' | 'forecast' | 'etl'>('api');
  const [selectedSku, setSelectedSku] = useState('SKU-1001');
  const { steps, running, allDone, run, reset } = useEtlAutoplay(activeTab === 'etl');

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const logLines = steps.flatMap((s) => {
    if (s.status === 'completed') return [`[✓] ${s.name} completado en ${s.time}`];
    if (s.status === 'running') return [`[→] Ejecutando ${s.name}...`];
    return [];
  });

  return (
    <section id="interactive-lab" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
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
              Maqueta interactiva
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Exploración interactiva de la arquitectura y capacidades técnicas
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Tabs */}
          <div className="border-b border-zinc-700/50 bg-zinc-900/50 backdrop-blur">
            <div className="flex overflow-x-auto">
              {[
                { key: 'api', label: 'API Endpoints', Icon: Code2, color: 'cyan' },
                { key: 'forecast', label: 'Forecast Demo', Icon: TrendingUp, color: 'violet' },
                { key: 'etl', label: 'ETL Pipeline', Icon: Database, color: 'cyan' },
              ].map(({ key, label, Icon, color }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as typeof activeTab)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === key
                      ? `${color === 'cyan' ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5' : 'text-violet-400 border-b-2 border-violet-400 bg-violet-500/5'}`
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {/* API Tab */}
              {activeTab === 'api' && (
                <motion.div
                  key="api"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">REST API Endpoints</h3>
                    <p className="text-zinc-400 text-sm">ASP.NET Core API con autenticación JWT y documentación OpenAPI</p>
                  </div>

                  {apiEndpoints.map((endpoint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold shrink-0 ${
                            endpoint.method === 'GET'
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : 'bg-violet-500/20 text-violet-400'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <div className="flex-1">
                          <code className="text-white font-mono text-sm">{endpoint.path}</code>
                          <p className="text-zinc-400 text-sm mt-1">{endpoint.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-6 bg-zinc-950/80 border border-zinc-700/50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-zinc-500 mb-2">// Ejemplo de respuesta JSON</div>
                    <pre className="text-cyan-400 overflow-x-auto">{`{
  "sku": "SKU-1001",
  "forecast": [
    { "date": "2025-02", "value": 4200 },
    { "date": "2025-03", "value": 4800 }
  ],
  "confidence": 0.924
}`}</pre>
                  </div>
                </motion.div>
              )}

              {/* Forecast Tab */}
              {activeTab === 'forecast' && (
                <motion.div
                  key="forecast"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Predicción de Ventas</h3>
                      <p className="text-zinc-400 text-sm">Modelo ML con forecasting basado en datos históricos</p>
                    </div>
                    <select
                      value={selectedSku}
                      onChange={(e) => setSelectedSku(e.target.value)}
                      className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
                    >
                      <option value="SKU-1001">SKU-1001</option>
                      <option value="SKU-1002">SKU-1002</option>
                      <option value="SKU-1003">SKU-1003</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Precisión', value: '92.4%', color: 'text-violet-400' },
                      { label: 'Tendencia', value: '+12%', color: 'text-green-400' },
                      { label: 'Confianza', value: 'Alta', color: 'text-cyan-400' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                        <p className="text-zinc-400 text-xs mb-1">{label}</p>
                        <p className={`text-2xl font-bold ${color}`}>{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-6">
                    <p className="text-white font-bold mb-4">Forecast 7 meses — {selectedSku}</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={forecastData}>
                        <XAxis dataKey="date" stroke="#71717a" />
                        <YAxis stroke="#71717a" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            borderRadius: '8px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#a78bfa"
                          strokeWidth={2}
                          dot={{ fill: '#a78bfa', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* ETL Tab */}
              {activeTab === 'etl' && (
                <motion.div
                  key="etl"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Pipeline ETL</h3>
                      <p className="text-zinc-400 text-sm">Pentaho/Kettle con procesamiento incremental automatizado</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={run}
                        disabled={running}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg text-sm disabled:opacity-60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                        whileHover={{ scale: running ? 1 : 1.05 }}
                        whileTap={{ scale: running ? 1 : 0.95 }}
                      >
                        {running ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        {running ? 'Ejecutando...' : allDone ? 'Re-ejecutar' : 'Ejecutar'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Pipeline Steps */}
                  <div className="space-y-3">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border rounded-lg p-4 flex items-center gap-4 transition-all duration-300 ${
                          step.status === 'running'
                            ? 'border-cyan-500/40 bg-cyan-500/5'
                            : step.status === 'completed'
                            ? 'border-green-500/30 bg-green-500/5'
                            : 'bg-zinc-800/50 border-zinc-700/50'
                        }`}
                      >
                        <div className="w-8 h-8 bg-zinc-700/50 rounded-lg flex items-center justify-center shrink-0">
                          <span className="text-zinc-400 font-bold text-sm">{step.id}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">{step.name}</span>
                            {step.status === 'completed' && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              </motion.div>
                            )}
                            {step.status === 'running' && (
                              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                            )}
                          </div>
                          <p className="text-zinc-400 text-xs">
                            {step.status === 'pending' ? 'En espera' : `Tiempo: ${step.time}`}
                          </p>
                        </div>
                        <AnimatePresence>
                          {step.status !== 'pending' && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className={`px-3 py-1 rounded-full text-xs ${
                                step.status === 'completed'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-cyan-500/20 text-cyan-400'
                              }`}
                            >
                              {step.status === 'completed' ? 'Completado' : 'Ejecutando'}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  {/* Terminal Output */}
                  <div className="bg-zinc-950/80 border border-zinc-700/50 rounded-lg p-4 font-mono text-sm min-h-[120px]">
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span className="text-zinc-400 text-xs">ETL Job Log</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <AnimatePresence>
                        {logLines.map((line, i) => (
                          <motion.div
                            key={line}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={
                              line.startsWith('[✓]')
                                ? 'text-green-400'
                                : 'text-cyan-400'
                            }
                          >
                            {line}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {running && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-zinc-500"
                        >
                          ▊
                        </motion.span>
                      )}
                      {logLines.length === 0 && !running && (
                        <span className="text-zinc-600">Presioná "Ejecutar" para iniciar el pipeline...</span>
                      )}
                    </div>
                  </div>

                  {/* Docker command */}
                  <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4">
                    <p className="text-zinc-400 text-xs mb-2">// Ejecutar con Docker</p>
                    <code className="text-cyan-400 text-sm">docker-compose up -d etl-worker</code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-700/50 bg-zinc-900/50 px-8 py-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-500 text-sm">Ver implementación completa en GitHub</p>
              <motion.a
                href="https://github.com/Evalutia/App-Forecast"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                Ver Implementación
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
