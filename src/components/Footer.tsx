import { SparkleDoodle } from './SVGIcons';

export const Footer = () => {
  return (
    <footer className="border-t border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#171C1A] py-14 px-4 sm:px-6 lg:px-8 no-print transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#24332D] dark:bg-[#E8EEE9] border border-[#24332D] dark:border-[#E8EEE9] flex items-center justify-center font-editorial font-bold text-sm text-[#FFFFFF] dark:text-[#171C1A]">
              L<span className="text-[#486B54] dark:text-[#24332D]">·</span>
            </div>
            <span className="font-editorial text-xl font-bold tracking-tight text-[#24332D] dark:text-[#E8EEE9]">
              Libnotes
            </span>
          </div>
          <p className="font-body text-xs text-[#647168] dark:text-[#B2BDB5] leading-relaxed">
            Turn educational video lectures into high-retention, exam-ready study kits in minutes. Built for students who care about conceptual depth.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8 sm:gap-12 text-xs font-mono">
          <div>
            <div className="font-bold text-[#24332D] dark:text-[#E8EEE9] uppercase mb-2">Note Styles</div>
            <ul className="space-y-1.5 text-[#647168] dark:text-[#B2BDB5]">
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Minimal Cheat Sheets</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Topper Deep Dives</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Chatpate Hinglish</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Exam Mode & PYQs</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#24332D] dark:text-[#E8EEE9] uppercase mb-2">Curricula</div>
            <ul className="space-y-1.5 text-[#647168] dark:text-[#B2BDB5]">
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">CBSE & State Boards</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">JEE Main & Advanced</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">NEET UG</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">College & B.Tech</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#24332D] dark:text-[#E8EEE9] uppercase mb-2">Legal & Trust</div>
            <ul className="space-y-1.5 text-[#647168] dark:text-[#B2BDB5]">
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Student Privacy</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Fair Academic Use</li>
              <li className="hover:text-[#24332D] dark:hover:text-[#E8EEE9] cursor-pointer">Terms of Service</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E2E7E1] dark:border-[#354139] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#647168] dark:text-[#B2BDB5] gap-4">
        <div>
          © {new Date().getFullYear()} Libnotes Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-1.5">
          <span>Zero-budget student project</span>
          <SparkleDoodle className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
        </div>
      </div>
    </footer>
  );
};
