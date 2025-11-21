export default function Footer() {
  return (
    <footer className="w-full py-4 mt-10 bg-slate-900/70 backdrop-blur border-t border-slate-700 z-20 relative">
      <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} Social Media Analyzer — All Rights
        Reserved.
      </div>
    </footer>
  );
}
