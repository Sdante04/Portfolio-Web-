export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top gradient */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full" />
      
      {/* Middle gradient */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full" />
      
      {/* Bottom gradient */}
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/5 blur-[100px] rounded-full" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
}
