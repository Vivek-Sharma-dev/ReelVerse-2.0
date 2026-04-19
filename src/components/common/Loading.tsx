
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-main-bg">
      {/* Outer Glow Circle */}
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-vibe-cyan/20 border-t-vibe-cyan rounded-full animate-spin glow"></div>
        <div className="absolute w-8 h-8 bg-vibe-cyan/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      <p className="mt-6 text-txt-muted font-medium tracking-widest animate-pulse uppercase text-xs">
        Fetching the Vibe...
      </p>
    </div>
  );
};

export default Loading;
