export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/logo.jpeg" alt="Play for Purpose" className="h-8 w-8 rounded" />
          <span className="font-heading font-semibold text-white">
            Play for Purpose
          </span>
        </div>
        <p className="text-white/40 text-sm text-center">
          A smarter way for sports clubs to generate funding
        </p>
        <a
          href="https://www.playforpurpose.co"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-light text-sm transition-colors"
        >
          playforpurpose.co
        </a>
      </div>
    </footer>
  );
}
