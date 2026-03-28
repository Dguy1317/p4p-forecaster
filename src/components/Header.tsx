export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src="/logo.jpeg" alt="Play for Purpose" className="h-10 w-10 rounded" />
        <span className="font-heading font-bold text-lg text-white">
          Play for Purpose
        </span>
      </div>
      <span className="text-white/50 text-sm font-body hidden sm:block">
        Impact Through Sport
      </span>
    </header>
  );
}
