export default function Header() {
  return (
    <header className="w-full py-4 bg-slate-900/70 backdrop-blur border-b border-slate-700 z-20 relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Content Analyzer</h2>
        <nav className="text-slate-300">by Ansh</nav>
      </div>
    </header>
  );
}
