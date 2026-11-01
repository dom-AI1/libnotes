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
    <div className="min-h-screen bg-[#F4F5F2] dark:bg-[#171C1A] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors">
      
      {/* Top Welcome Banner */}
      <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-3.5 py-1 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
            STUDENT DASHBOARD
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-2">
            Welcome back, {userGreeting}.
          </h1>
          <p className="font-body text-sm sm:text-base text-[#647168] dark:text-[#B2BDB5] mt-1">
            {userKits.length === 0
              ? 'You have 0 study kits. Convert your first lecture to get started!'
              : `You have ${userKits.length} study ${userKits.length === 1 ? 'kit' : 'kits'} ready for pre-exam revision.`}
          </p>
          {isSupabaseConfigured() && (
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F5F2] dark:bg-[#171C1A] border border-[#E2E7E1] dark:border-[#354139] text-[11px] font-mono text-[#647168] dark:text-[#B2BDB5] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#486B54] dark:bg-[#A8C5AD] animate-pulse" />
                <span>Supabase Cloud Synced (<strong>vidbiyemknmkfswiucsr</strong>)</span>
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onOpenUpload}
          className="btn-primary-green px-5 py-3 text-sm flex items-center justify-center gap-2 self-start md:self-auto shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Lecture Video</span>
        </button>
      </div>

      {/* Interactive AI Video Guide Banner */}
      {onWatchVideo && (
        <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-4 sm:p-5 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5EDE5] dark:bg-[#2D3A32] border border-[#E2E7E1] dark:border-[#354139] flex items-center justify-center text-[#486B54] dark:text-[#A8C5AD] shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-base font-bold text-[#24332D] dark:text-[#E8EEE9]">
                  Need a quick tour of Libnotes AI?
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E5EDE5] dark:bg-[#2D3A32] text-[#486B54] dark:text-[#A8C5AD] text-[10px] font-mono font-bold border border-[#E2E7E1] dark:border-[#354139]">
                  60s VIDEO
                </span>
              </div>
              <p className="text-xs text-[#647168] dark:text-[#B2BDB5] font-body mt-0.5">
                Watch how to paste YouTube links, auto-detect subjects, and generate conversational Chatbot/Chatpata notes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onWatchVideo('tutorial')}
              className="px-4 py-2 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-xs font-mono font-bold text-[#24332D] dark:text-[#E8EEE9] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-[#486B54] dark:text-[#A8C5AD]" />
              <span>Watch Video Tour</span>
            </button>
          </div>
        </div>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] uppercase font-bold">Lectures Converted</span>
            <BookOpen className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
          </div>
          <div className="font-editorial text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-2">
            {userKits.length}
          </div>
          <p className="text-xs font-body text-[#647168] dark:text-[#B2BDB5] mt-1">
            {userKits.length === 0
              ? 'No lectures converted yet'
              : `Across ${subjectCount} academic ${subjectCount === 1 ? 'subject' : 'subjects'}`}
          </p>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] uppercase font-bold">Diagnostic Quizzes</span>
            <Award className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
          </div>
          <div className="font-editorial text-3xl font-bold text-[#24332D] dark:text-[#E8EEE9] mt-2">
            {totalQuizSets} {totalQuizSets === 1 ? 'Attempt' : 'Attempts'}
          </div>
          <p className="text-xs font-body text-[#647168] dark:text-[#B2BDB5] mt-1">
            {totalQuizSets > 0 ? `${avgAccuracy}% average accuracy` : 'No quizzes attempted yet'}
          </p>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#647168] dark:text-[#B2BDB5] uppercase font-bold">Identified Weak Spots</span>
            <Sparkles className="w-4 h-4 text-[#486B54] dark:text-[#A8C5AD]" />
          </div>
          <div className="font-editorial text-3xl font-bold text-[#486B54] dark:text-[#A8C5AD] mt-2">
            {uniqueWeakTopics.length} {uniqueWeakTopics.length === 1 ? 'Topic' : 'Topics'}
          </div>
          <p className="text-xs font-body text-[#647168] dark:text-[#B2BDB5] mt-1 truncate">
            {uniqueWeakTopics.length > 0 ? uniqueWeakTopics.slice(0, 2).join(', ') : 'None identified yet'}
          </p>
        </div>
      </div>

      {/* If user has 0 kits in total, show welcoming call to action */}
      {userKits.length === 0 ? (
        <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-dashed border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-12 text-center my-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#E5EDE5] dark:bg-[#2D3A32] rounded-full flex items-center justify-center border border-[#E2E7E1] dark:border-[#354139]">
            <BookOpen className="w-8 h-8 text-[#486B54] dark:text-[#A8C5AD]" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-[#24332D] dark:text-[#E8EEE9]">
            No Study Kits Yet
          </h3>
          <p className="font-body text-sm text-[#647168] dark:text-[#B2BDB5] max-w-md mx-auto mt-2">
            You haven't converted any lectures yet. Paste a YouTube lecture URL or upload a video file to generate your first revision kit.
          </p>
          <button
            onClick={onOpenUpload}
            className="btn-primary-green px-6 py-3 text-sm inline-flex items-center gap-2 mt-6 cursor-pointer"
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
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647168] dark:text-[#B2BDB5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by subject, chapter or keyword..."
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#171C1A] text-xs font-body text-[#24332D] dark:text-[#E8EEE9] focus:outline-none focus:ring-2 focus:ring-[#486B54] dark:focus:ring-[#A8C5AD]"
              />
            </div>

            {/* Subject Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {availableSubjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubjectFilter(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 cursor-pointer ${
                    selectedSubjectFilter === sub
                      ? 'bg-[#24332D] dark:bg-[#E8EEE9] text-[#FFFFFF] dark:text-[#171C1A] font-bold'
                      : 'bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] text-[#647168] dark:text-[#B2BDB5] hover:border-[#486B54] dark:hover:border-[#A8C5AD]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Study Kits or Filter Result */}
          {filteredKits.length === 0 ? (
            <div className="bg-[#FFFFFF] dark:bg-[#242D28] border border-dashed border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-10 text-center my-6">
              <BookOpen className="w-10 h-10 text-[#647168] dark:text-[#B2BDB5] mx-auto mb-3" />
              <h3 className="font-editorial text-lg font-bold text-[#24332D] dark:text-[#E8EEE9]">
                No study kits found
              </h3>
              <p className="text-xs font-body text-[#647168] dark:text-[#B2BDB5] mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `No notes matching "${searchQuery}" in ${selectedSubjectFilter === 'All' ? 'any subject' : selectedSubjectFilter}.`
                  : `No study kits found for ${selectedSubjectFilter}.`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubjectFilter('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#FFFFFF] dark:bg-[#171C1A] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-xs font-mono font-bold text-[#24332D] dark:text-[#E8EEE9] transition-all cursor-pointer shadow-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKits.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-[#FFFFFF] dark:bg-[#242D28] border border-[#E2E7E1] dark:border-[#354139] rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#486B54] dark:hover:border-[#A8C5AD] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] bg-[#E5EDE5] dark:bg-[#2D3A32] px-2.5 py-0.5 rounded-full border border-[#E2E7E1] dark:border-[#354139]">
                        {kit.subject}
                      </span>
                      <span className="text-[11px] font-mono text-[#647168] dark:text-[#B2BDB5]">
                        {kit.dateCreated}
                      </span>
                    </div>

                    <h3 className="font-editorial text-lg font-bold text-[#24332D] dark:text-[#E8EEE9] mb-2 leading-snug">
                      {kit.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs font-mono text-[#647168] dark:text-[#B2BDB5] mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {kit.duration}
                      </span>
                      <span>•</span>
                      <span>{kit.academicClass}</span>
                    </div>

                    <p className="text-xs font-body text-[#647168] dark:text-[#B2BDB5] line-clamp-2 mb-4 leading-relaxed">
                      {kit?.content?.quick?.headline || kit?.content?.minimal?.headline || kit?.content?.topper?.introduction || kit?.title || 'Lecture study kit'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E7E1] dark:border-[#354139] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectKit(kit.id)}
                      className="px-4 py-2 rounded-xl border border-[#E2E7E1] dark:border-[#354139] bg-[#F4F5F2] dark:bg-[#171C1A] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] text-xs font-mono font-bold text-[#24332D] dark:text-[#E8EEE9] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read Notes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onTakeQuiz(kit.id)}
                      className="px-3 py-2 rounded-xl text-xs font-mono font-bold text-[#486B54] dark:text-[#A8C5AD] hover:bg-[#E5EDE5] dark:hover:bg-[#2D3A32] transition-colors flex items-center gap-1 cursor-pointer"
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
