export const AmbientGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Amber/Gold glow in top-left for Museums */}
      <div className="absolute -top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
      {/* Twilight Indigo glow in top-right for Art & Studios */}
      <div className="absolute top-[20%] -right-[15%] w-[550px] h-[550px] rounded-full bg-indigo-600/10 blur-[140px]" />
      {/* Electric Cyan glow in bottom-left for Libraries */}
      <div className="absolute -bottom-[10%] left-[25%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
      {/* Emerald trail glow in center */}
      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-[100px]" />
    </div>
  );
};
