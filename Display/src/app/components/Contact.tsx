import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Check, Copy } from 'lucide-react';


export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!name.trim() || !email.trim() || !message.trim()) {
    alert("Por favor completá nombre, email y mensaje.");
    return;
  }
  const subject = `Contacto desde portfolio - ${name}`;
  const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
  const mailto = `mailto:santiagodante4@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
 };
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('santiagodante4@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
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
              Contacto
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            ¿Interesado en colaborar? Estoy abierto a nuevas oportunidades laborales y proyectos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Email */}
            <div className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1">Email</h4>
                  <a
                    href="mailto:santiagodante4@gmail.com"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    santiagodante4@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="mt-3 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copiar email
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-1">Ubicación</h4>
                  <p className="text-zinc-400">Montevideo, Uruguay</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 space-y-3">
              <h4 className="text-white font-bold mb-4">Enlaces</h4>
              <div className="relative">
                <div className="flex gap-3">
                  <motion.a
                    href="https://www.linkedin.com/in/santiago-dante-couto-bb5b09297/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-white text-sm">LinkedIn</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://github.com/Sdante04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-violet-400 transition-colors" />
                    <span className="text-white text-sm">GitHub</span>
                  </motion.a>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Enviar mensaje</h3>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="name" className="block text-sm text-zinc-400 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Tu nombre"
                  aria-label="Nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="tu@email.com"
                  aria-label="Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="¿En qué puedo ayudarte?"
                  aria-label="Mensaje"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar mensaje
              </motion.button>
            </form>

            <p className="text-zinc-500 text-xs mt-4 text-center">
              También puedes contactarme directamente por email
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
