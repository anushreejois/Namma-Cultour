export const AmbientGlow = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Orb 1: Soft Cubbon Emerald */}
      <div className="absolute -top-24 left-[10%] w-[520px] h-[520px] rounded-full bg-emerald-300/40 blur-[100px] animate-pulse" />
      
      {/* Orb 2: Bengaluru Jacaranda Rose/Lavender */}
      <div className="absolute top-[25%] -right-20 w-[580px] h-[580px] rounded-full bg-fuchsia-300/35 blur-[110px]" />
      
      {/* Orb 3: Sunlit Amber/Peach */}
      <div className="absolute -bottom-20 left-[20%] w-[540px] h-[540px] rounded-full bg-amber-200/50 blur-[90px]" />
      
      {/* Orb 4: Clear Sky Cyan */}
      <div className="absolute top-[60%] -left-20 w-[500px] h-[500px] rounded-full bg-sky-300/40 blur-[100px]" />
    </div>
  );
};

