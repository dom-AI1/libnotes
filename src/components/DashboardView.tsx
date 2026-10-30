import { useState, useEffect } from 'react';
import type { StudyKit } from '../types';
import type { UserProfile } from '../services/authService';
import { BookOpen, Clock, Award, Sparkles, Plus, Search, ArrowRight, Film } from 'lucide-react';
import { loadQuizAttempts } from '../services/storageService';
import { fetchQuizAttemptsFromSupabase } from '../services/supabaseService';
import { isSupabaseConfigured } from '../services/supabaseClient';

interface DashboardViewProps {
  studyKits: StudyKit[];
  user?: UserProfile | null;
  onSelectKit: (kitId: string) => void;
  onOpenUpload: () => void;
  onTakeQuiz: (kitId: string) => void;
  onWatchVideo?: (type?: 'about' | 'tutorial') => void;
}

export const DashboardView = ({
  studyKits,
  user,
  onSelectKit,
  onOpenUpload,
  onTakeQuiz,
  onWatchVideo,
}: DashboardViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');

  // Filter studyKits strictly for this user if user is logged in.
  // Never show sample/guest kits as the user's converted notes.
  const userKits = user?.id
    ? studyKits.filter((k) => k.userId === user.id)
    : [];

  const userGreeting = user?.display_name || (user?.email ? user.email.split('@')[0] : 'Learner');

  // Load quiz attempts for this specific user
  const [quizAttempts, setQuizAttempts] = useState(() => loadQuizAttempts(user?.id));

  // Sync quiz attempts from Supabase on mount
  useEffect(() => {
    if (user?.id) {
      fetchQuizAttemptsFromSupabase(user.id).then(({ data }) => {
        if (data && data.length > 0) {
          setQuizAttempts(data);
        }
      });
    }
  }, [user?.id]);

  const subjectCount = new Set(userKits.map((k) => k.subject).filter(Boolean)).size;
  const totalQuizSets = quizAttempts.length;
  const avgAccuracy =
    totalQuizSets > 0
      ? Math.round(
          quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0) /
            totalQuizSets
        )
      : 0;

  const uniqueWeakTopics = Array.from(
    new Set(quizAttempts.flatMap((a) => a.weakTopics || []))
  );

  const filteredKits = userKits.filter((kit) => {
    const title = (kit.title || '').toLowerCase();
    const chapter = (kit.chapter || '').toLowerCase();
    const query = (searchQuery || '').toLowerCase();
    const matchesSearch = title.includes(query) || chapter.includes(query);
    const matchesSubject =
      selectedSubjectFilter === 'All' || kit.subject === selectedSubjectFilter;
    return matchesSearch && matchesSubject;
  });

  const availableSubjects = [
    'All',
    ...Array.from(new Set(userKits.map((k) => k.subject).filter(Boolean))),
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
            STUDENT DASHBOARD
          </span>
          <h1 className="font-mono-editorial text-3xl sm:text-4xl font-bold text-[#0F172A] mt-2">
            Welcome back, {userGreeting}.
          </h1>
          <p className="font-body text-sm sm:text-base text-[#64748B] mt-1">
            {userKits.length === 0
              ? 'You have 0 study kits. Convert your first lecture to get started!'
              : `You have ${userKits.length} study ${userKits.length === 1 ? 'kit' : 'kits'} ready for pre-exam revision.`}
          </p>
          {isSupabaseConfigured() && (
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#64748B] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Supabase Cloud Synced (<strong>vidbiyemknmkfswiucsr</strong>)</span>
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onOpenUpload}
          className="btn-primary-green px-5 py-3 text-sm flex items-center justify-center gap-2 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>New Lecture Video</span>
        </button>
      </div>

      {/* Interactive AI Video Guide Banner (Eliminates excessive text scrolling) */}
      {onWatchVideo && (
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] shrink-0">
              <Film className="w-5 h-5 text-[#059669]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-editorial text-base font-bold text-[#0F172A]">
                  Need a quick tour of Libnotes AI?
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-mono font-bold border border-[#A7F3D0]">
                  60s VIDEO
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-body mt-0.5">
                Watch how to paste YouTube links, auto-detect subjects, and generate conversational Chatbot/Chatpata notes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onWatchVideo('tutorial')}
              className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-[#059669]" />
              <span>Watch Video Tour</span>
            </button>
          </div>
        </div>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#64748B] uppercase font-bold">Lectures Converted</span>
            <BookOpen className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="font-mono-editorial text-3xl font-bold text-[#0F172A] mt-2">
            {userKits.length}
          </div>
          <p className="text-xs font-body text-[#94A3B8] mt-1">
            {userKits.length === 0
              ? 'No lectures converted yet'
              : `Across ${subjectCount} academic ${subjectCount === 1 ? 'subject' : 'subjects'}`}
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#64748B] uppercase font-bold">Diagnostic Quizzes</span>
            <Award className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="font-mono-editorial text-3xl font-bold text-[#0F172A] mt-2">
            {totalQuizSets} {totalQuizSets === 1 ? 'Attempt' : 'Attempts'}
          </div>
          <p className="text-xs font-body text-[#94A3B8] mt-1">
            {totalQuizSets > 0 ? `${avgAccuracy}% average accuracy` : 'No quizzes attempted yet'}
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#64748B] uppercase font-bold">Identified Weak Spots</span>
            <Sparkles className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="font-mono-editorial text-3xl font-bold text-[#059669] mt-2">
            {uniqueWeakTopics.length} {uniqueWeakTopics.length === 1 ? 'Topic' : 'Topics'}
          </div>
          <p className="text-xs font-body text-[#94A3B8] mt-1 truncate">
            {uniqueWeakTopics.length > 0 ? uniqueWeakTopics.slice(0, 2).join(', ') : 'None identified yet'}
          </p>
        </div>
      </div>

      {/* If user has 0 kits in total, show welcoming call to action */}
      {userKits.length === 0 ? (
        <div className="bg-[#FAF9F5] border-2 border-dashed border-[#141414]/30 rounded-2xl p-12 text-center my-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#E8F2DC] rounded-full flex items-center justify-center border-2 border-[#141414]">
            <BookOpen className="w-8 h-8 text-[#79A94A]" />
          </div>
          <h3 className="font-mono-editorial text-2xl font-bold text-[#141414]">
            No Study Kits Yet
          </h3>
          <p className="font-body text-sm text-[#5E5D57] max-w-md mx-auto mt-2">
            You haven't converted any lectures yet. Paste a YouTube lecture URL or upload a video file to generate your first revision kit.
          </p>
          <button
            onClick={onOpenUpload}
            className="btn-primary-green px-6 py-3 text-sm inline-flex items-center gap-2 mt-6"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Your First Notes</span>
          </button>
        </div>
      ) : (
        <>
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
              {availableSubjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubjectFilter(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
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

          {/* Grid of Study Kits or Filter Result */}
          {filteredKits.length === 0 ? (
            <div className="bg-[#FCFAF6] border-2 border-dashed border-[#141414]/30 rounded-2xl p-10 text-center my-6">
              <BookOpen className="w-10 h-10 text-[#8A8880] mx-auto mb-3" />
              <h3 className="font-mono-editorial text-lg font-bold text-[#141414]">
                No study kits found
              </h3>
              <p className="text-xs font-body text-[#5E5D57] mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `No notes matching "${searchQuery}" in ${selectedSubjectFilter === 'All' ? 'any subject' : selectedSubjectFilter}.`
                  : `No study kits found for ${selectedSubjectFilter}.`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubjectFilter('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl border border-[#141414] bg-[#FFFFFF] hover:bg-[#EFECE1] text-xs font-mono font-bold transition-all shadow-[2px_2px_0px_#141414]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKits.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#CBD5E1] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                        {kit.subject}
                      </span>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {kit.dateCreated}
                      </span>
                    </div>

                    <h3 className="font-mono-editorial text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                      {kit.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#64748B] mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {kit.duration}
                      </span>
                      <span>•</span>
                      <span>{kit.academicClass}</span>
                    </div>

                    <p className="text-xs font-body text-[#475569] line-clamp-2 mb-4 leading-relaxed">
                      {kit?.content?.quick?.headline || kit?.content?.minimal?.headline || kit?.content?.topper?.introduction || kit?.title || 'Lecture study kit'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectKit(kit.id)}
                      className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#E2E8F0] text-xs font-mono font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
                    >
                      <span>Read Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onTakeQuiz(kit.id)}
                      className="px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#059669] hover:bg-[#ECFDF5] transition-colors flex items-center gap-1"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Quiz</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};
