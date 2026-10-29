import { useState } from 'react';
import type { StudyKit } from '../types';
import { BookOpen, Clock, Award, Sparkles, Plus, Search, ArrowRight } from 'lucide-react';

interface DashboardViewProps {
  studyKits: StudyKit[];
  onSelectKit: (kitId: string) => void;
  onOpenUpload: () => void;
  onTakeQuiz: (kitId: string) => void;
}

export const DashboardView = ({
  studyKits,
  onSelectKit,
  onOpenUpload,
  onTakeQuiz,
}: DashboardViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');

  const filteredKits = studyKits.filter((kit) => {
    const matchesSearch =
      kit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kit.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubjectFilter === 'All' || kit.subject === selectedSubjectFilter;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['All', 'Physics', 'Chemistry', 'Computer Science'];

  return (
    <div className="min-h-screen bg-[#F7F5EF] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#FAF9F5] border-2 border-[#141414] rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#141414] mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#79A94A] bg-[#E8F2DC] px-3 py-1 rounded-full border border-[#79A94A]/30">
            STUDENT DASHBOARD
          </span>
          <h1 className="font-mono-editorial text-3xl sm:text-4xl font-bold text-[#141414] mt-2">
            Welcome back, Learner.
          </h1>
          <p className="font-body text-sm sm:text-base text-[#5E5D57] mt-1">
            You have {studyKits.length} study kits ready for pre-exam revision.
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="btn-primary-green px-5 py-3 text-sm flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Lecture Video</span>
        </button>
      </div>

      {/* Lightweight Summary Cards (No complicated charts) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-xl p-5 shadow-[2px_2px_0px_#141414]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#5E5D57] uppercase font-bold">Lectures Converted</span>
            <BookOpen className="w-4 h-4 text-[#79A94A]" />
          </div>
          <div className="font-mono-editorial text-3xl font-bold text-[#141414] mt-2">
            {studyKits.length}
          </div>
          <p className="text-xs font-body text-[#8A8880] mt-1">Across 3 academic subjects</p>
        </div>

        <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-xl p-5 shadow-[2px_2px_0px_#141414]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#5E5D57] uppercase font-bold">Diagnostic Quizzes</span>
            <Award className="w-4 h-4 text-[#79A94A]" />
          </div>
          <div className="font-mono-editorial text-3xl font-bold text-[#141414] mt-2">
            5 Sets
          </div>
          <p className="text-xs font-body text-[#8A8880] mt-1">82% average accuracy</p>
        </div>

        <div className="bg-[#FCFAF6] border-2 border-[#141414] rounded-xl p-5 shadow-[2px_2px_0px_#141414]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#5E5D57] uppercase font-bold">Identified Weak Spots</span>
            <Sparkles className="w-4 h-4 text-[#79A94A]" />
          </div>
          <div className="font-mono-editorial text-3xl font-bold text-[#79A94A] mt-2">
            1 Topic
          </div>
          <p className="text-xs font-body text-[#8A8880] mt-1">Carnot Cycle numericals</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8880]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by subject, chapter or keyword..."
            className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#141414]/30 bg-[#FFFFFF] text-xs font-body focus:outline-none focus:border-[#79A94A]"
          />
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubjectFilter(sub)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedSubjectFilter === sub
                  ? 'bg-[#141414] text-[#FFFFFF] font-bold'
                  : 'bg-[#FCFAF6] border border-[#141414]/20 text-[#5E5D57] hover:border-[#141414]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Study Kits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKits.map((kit) => (
          <div
            key={kit.id}
            className="bg-[#FCFAF6] border-2 border-[#141414] rounded-2xl p-6 shadow-[3px_3px_0px_#141414] hover:shadow-[5px_5px_0px_#141414] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono font-bold text-[#79A94A] bg-[#E8F2DC] px-2.5 py-0.5 rounded-full border border-[#79A94A]/30">
                  {kit.subject}
                </span>
                <span className="text-[11px] font-mono text-[#8A8880]">
                  {kit.dateCreated}
                </span>
              </div>

              <h3 className="font-mono-editorial text-lg font-bold text-[#141414] mb-2 leading-snug">
                {kit.title}
              </h3>

              <div className="flex items-center gap-3 text-xs font-mono text-[#5E5D57] mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {kit.duration}
                </span>
                <span>•</span>
                <span>{kit.academicClass}</span>
              </div>

              <p className="text-xs font-body text-[#4A4944] line-clamp-2 mb-4">
                {(kit.content.quick || kit.content.minimal)?.headline}
              </p>
            </div>

            <div className="pt-4 border-t border-[#DFDBCF] flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectKit(kit.id)}
                className="btn-secondary-outline px-4 py-2 text-xs font-mono font-semibold flex items-center gap-1.5"
              >
                <span>Read Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onTakeQuiz(kit.id)}
                className="px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#79A94A] hover:bg-[#E8F2DC] transition-colors flex items-center gap-1"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Quiz</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
