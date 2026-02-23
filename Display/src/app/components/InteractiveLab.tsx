import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { Code2, TrendingUp, Database, Play, CheckCircle2, Terminal } from 'lucide-react';
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

const etlSteps = [
  { id: 1, name: 'Extract', status: 'completed', time: '2.3s' },
  { id: 2, name: 'Transform', status: 'completed', time: '8.7s' },
  { id: 3, name: 'Validate', status: 'completed', time: '1.2s' },
  { id: 4, name: 'Load', status: 'completed', time: '3.8s' },
  { id: 5, name: 'Index', status: 'running', time: '...' },
];

export function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<'api' | 'forecast' | 'etl'>('api');
  const [selectedSku, setSelectedSku] = useState('SKU-1001');
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="interactive-lab" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
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
              Probá mi código
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Exploración interactiva de la arquitectura y capacidades técnicas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Tabs */}
          <div className="border-b border-zinc-700/50 bg-zinc-900/50 backdrop-blur">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('api')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'api'
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <Code2 className="w-4 h-4" />
                API Endpoints
              </button>
              <button
                onClick={() => setActiveTab('forecast')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'forecast'
                    ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-500/5'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Forecast Demo
              </button>
              <button
                onClick={() => setActiveTab('etl')}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'etl'
                    ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/5'
                    : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <Database className="w-4 h-4" />
                ETL Pipeline
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* API Tab */}
            {activeTab === 'api' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">REST API Endpoints</h3>
                  <p className="text-zinc-400 text-sm">
                    ASP.NET Core API con autenticación JWT y documentación OpenAPI
                  </p>
                </div>

                {apiEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
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
                  </div>
                ))}

                {/* Example Response */}
                <div className="mt-6 bg-zinc-950/80 border border-zinc-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="text-zinc-500 mb-2">// Ejemplo de respuesta JSON</div>
                  <pre className="text-cyan-400 overflow-x-auto">
{`{
  "sku": "SKU-1001",
  "forecast": [
    { "date": "2025-02", "value": 4200 },
    { "date": "2025-03", "value": 4800 }
  ],
  "confidence": 0.924
}`}
                  </pre>
                </div>
              </motion.div>
            )}

            {/* Forecast Tab */}
            {activeTab === 'forecast' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Predicción de Ventas</h3>
                    <p className="text-zinc-400 text-sm">
                      Modelo ML con forecasting basado en datos históricos
                    </p>
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

                {/* KPIs */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                    <p className="text-zinc-400 text-xs mb-1">Precisión</p>
                    <p className="text-2xl font-bold text-violet-400">92.4%</p>
                  </div>
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                    <p className="text-zinc-400 text-xs mb-1">Tendencia</p>
                    <p className="text-2xl font-bold text-green-400">+12%</p>
                  </div>
                  <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4">
                    <p className="text-zinc-400 text-xs mb-1">Confianza</p>
                    <p className="text-2xl font-bold text-cyan-400">Alta</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-6">
                  <p className="text-white font-bold mb-4">Forecast 7 meses - {selectedSku}</p>
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Pipeline ETL</h3>
                  <p className="text-zinc-400 text-sm">
                    Pentaho/Kettle con procesamiento incremental automatizado
                  </p>
                </div>

                {/* Pipeline Steps */}
                <div className="space-y-3">
                  {etlSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 flex items-center gap-4"
                    >
                      <div className="w-8 h-8 bg-zinc-700/50 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-zinc-400 font-bold text-sm">{step.id}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{step.name}</span>
                          {step.status === 'completed' && (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          )}
                          {step.status === 'running' && (
                            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          )}
                        </div>
                        <p className="text-zinc-400 text-xs">Tiempo: {step.time}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          step.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-cyan-500/20 text-cyan-400'
                        }`}
                      >
                        {step.status === 'completed' ? 'Completado' : 'Ejecutando'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Terminal Output */}
                <div className="bg-zinc-950/80 border border-zinc-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-zinc-800">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="text-zinc-400 text-xs">ETL Job Log</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="text-green-400">[✓] Connected to database</div>
                    <div className="text-green-400">[✓] Extracted 1,247 records</div>
                    <div className="text-green-400">[✓] Applied transformations</div>
                    <div className="text-cyan-400">[→] Indexing data...</div>
                    <div className="text-zinc-500">└─ Progress: 78%</div>
                  </div>
                </div>

                {/* Docker Command */}
                <div className="bg-zinc-800/30 border border-zinc-700/50 rounded-lg p-4">
                  <p className="text-zinc-400 text-xs mb-2">// Ejecutar con Docker</p>
                  <code className="text-cyan-400 text-sm">
                    docker-compose up -d etl-worker
                  </code>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-700/50 bg-zinc-900/50 px-8 py-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-500 text-sm">
                Ver implementación completa en GitHub
              </p>
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
