import { SparkleDoodle } from './SVGIcons';

export const Footer = () => {
  return (
    <footer className="border-t border-[#141414]/15 bg-[#FAF9F5] py-14 px-4 sm:px-6 lg:px-8 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#FCFAF6] border-2 border-[#141414] shadow-[1.5px_1.5px_0px_#141414] flex items-center justify-center font-mono font-bold text-sm text-[#141414]">
              L<span className="text-[#79A94A]">·</span>
            </div>
            <span className="font-mono-editorial text-xl font-bold tracking-tight text-[#141414]">
              Libnotes
            </span>
          </div>
          <p className="font-body text-xs text-[#5E5D57] leading-relaxed">
            Turn educational video lectures into high-retention, exam-ready study kits in minutes. Built for students who care about conceptual depth.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8 sm:gap-12 text-xs font-mono">
          <div>
            <div className="font-bold text-[#141414] uppercase mb-2">Note Styles</div>
            <ul className="space-y-1.5 text-[#5E5D57]">
              <li className="hover:text-[#141414] cursor-pointer">Minimal Cheat Sheets</li>
              <li className="hover:text-[#141414] cursor-pointer">Topper Deep Dives</li>
              <li className="hover:text-[#141414] cursor-pointer">Chatpate Hinglish</li>
              <li className="hover:text-[#141414] cursor-pointer">Exam Mode & PYQs</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#141414] uppercase mb-2">Curricula</div>
            <ul className="space-y-1.5 text-[#5E5D57]">
              <li className="hover:text-[#141414] cursor-pointer">CBSE & State Boards</li>
              <li className="hover:text-[#141414] cursor-pointer">JEE Main & Advanced</li>
              <li className="hover:text-[#141414] cursor-pointer">NEET UG</li>
              <li className="hover:text-[#141414] cursor-pointer">College & B.Tech</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#141414] uppercase mb-2">Legal & Trust</div>
            <ul className="space-y-1.5 text-[#5E5D57]">
              <li className="hover:text-[#141414] cursor-pointer">Student Privacy</li>
              <li className="hover:text-[#141414] cursor-pointer">Fair Academic Use</li>
              <li className="hover:text-[#141414] cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#DFDBCF] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8A8880] gap-4">
        <div>
          © {new Date().getFullYear()} Libnotes Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-2">
          <span>Crafted in warm ivory (`#F7F5EF`) & botanical green (`#79A94A`)</span>
          <SparkleDoodle className="w-3.5 h-3.5 text-[#79A94A]" />
        </div>
      </div>
    </footer>
  );
};
