import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, AlertCircle, Compass, FileText, Target, Zap, Split } from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';

interface LandingViewProps {
  onStartOnboarding: () => void;
  onSelectDemo: (demoId: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartOnboarding,
  onSelectDemo,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-150 text-indigo-700 text-xs font-semibold mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>The Adaptive Career Learning Navigator</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Know where you want to go.<br />
          <span className="text-indigo-600">Know what to learn next.</span>
        </h1>

        {/* Supporting text */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
          EduPath analyzes your existing skills, finds the gaps between you and your target role, and builds a learning journey that adapts as you progress.
        </p>

        {/* Core Problem Narrative */}
        <div className="mt-4 text-sm font-medium text-slate-500 max-w-xl mx-auto">
          «Most learning platforms start with a curriculum. <strong className="text-slate-800">EduPath starts with you.</strong>»
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="cta-build-path"
            onClick={onStartOnboarding}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Build My Learning Path</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            id="cta-try-demo"
            onClick={() => onSelectDemo('maya-da')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-2xs transition-all flex items-center justify-center gap-2"
          >
            <span>Try a Demo (Maya • Data Analyst)</span>
          </button>
        </div>

        {/* Visual Pipeline Flow preview */}
        <div className="mt-16 pt-8 border-t border-slate-200/80">
          <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-6">
            The Continuous Navigator Loop
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 font-bold text-xs">
                01
              </div>
              <div className="font-bold text-slate-900 text-sm">Your Profile</div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Upload resume & project evidence without manual tedious forms.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold text-xs">
                02
              </div>
              <div className="font-bold text-slate-900 text-sm">Your Gaps</div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Skill Twin identifies Strong, Developing, and high-impact Gaps.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2 font-bold text-xs">
                03
              </div>
              <div className="font-bold text-slate-900 text-sm">Your Path</div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Structured stages sequenced by what unlocks your next milestone.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 font-bold text-xs">
                04
              </div>
              <div className="font-bold text-slate-900 text-sm">Your Progress</div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Weekly missions with hands-on practice & portfolio milestones.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2 font-bold text-xs">
                05
              </div>
              <div className="font-bold text-emerald-950 text-sm flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                Adaptive Shift
              </div>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                Struggle with a concept? The AI rewires your path in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1: "Skill Twin" Showcase */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600">
              Core Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Meet Your Skill Twin
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              No generic percentages or vague test scores. EduPath maps your verified capability into three explainable states backed by documented evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Strong */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Strong State
                  </span>
                  <span className="text-xs font-medium text-slate-400">Verified Evidence</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Spreadsheet Analysis</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Categorized as strong because your profile includes 3 years of building financial attribution models with dynamic index-match formulas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-emerald-800 font-medium">
                Action: Fast-tracks curriculum past beginner data entry.
              </div>
            </div>

            {/* Developing */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Developing State
                  </span>
                  <span className="text-xs font-medium text-slate-400">Partial Signal</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Business Statistics</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Categorized as developing because A/B testing exposure was detected, but formal statistical confidence and hypothesis tests were absent.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-amber-800 font-medium">
                Action: Targeted booster modules on p-values & variance.
              </div>
            </div>

            {/* Gap */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    Gap State
                  </span>
                  <span className="text-xs font-medium text-slate-400">Missing for Role</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">SQL Querying</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Identified as a critical gap because 92% of target Data Analyst roles demand multi-table relational extraction, but no SQL exists in profile.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-rose-800 font-medium">
                Action: Prioritized first in Week 1 to unlock analytics.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Real Personalization Proof (Req 27) */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Split className="w-4 h-4" />
            <span>True Persona Differentiation</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Same Target Role. Visibly Different Roadmaps.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Two learners aiming for Data Analyst with different prior experience will never receive the same generic syllabus.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User A */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <div className="font-bold text-slate-100">Maya Chen</div>
                  <div className="text-xs text-slate-400">Marketing Specialist → Data Analyst</div>
                </div>
                <button
                  onClick={() => onSelectDemo('maya-da')}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                >
                  Load Maya
                </button>
              </div>
              <div className="mt-3 text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span><strong>Strong:</strong> Advanced Excel, Data Storytelling</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span><strong>Gaps:</strong> SQL Querying, Relational Schemas</span>
                </div>
                <div className="pt-2 text-indigo-300 font-medium border-t border-slate-700/60">
                  Roadmap Path: Relational SQL → Advanced JOINs → Statistics → Power BI
                </div>
              </div>
            </div>

            {/* User B */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <div className="font-bold text-slate-100">David Patel</div>
                  <div className="text-xs text-slate-400">Research Assistant → Data Analyst</div>
                </div>
                <button
                  onClick={() => onSelectDemo('david-da')}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                >
                  Load David
                </button>
              </div>
              <div className="mt-3 text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span><strong>Strong:</strong> Python Pandas, Mathematical Statistics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span><strong>Gaps:</strong> Enterprise SQL, Business BI Dashboards</span>
                </div>
                <div className="pt-2 text-indigo-300 font-medium border-t border-slate-700/60">
                  Roadmap Path: Skips Python/Stats → Enterprise SQL → Power BI Modeling
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Selector Grid */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-slate-900">Explore Preloaded Demo Learners</h3>
          <p className="text-slate-500 text-sm mt-1">Instant 1-click test drive without needing to prepare your own resume</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_PROFILES.map((demo) => (
            <button
              key={demo.id}
              onClick={() => onSelectDemo(demo.id)}
              className="p-5 rounded-xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="inline-block text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md mb-2">
                  {demo.badge}
                </div>
                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {demo.name}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {demo.summary}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                <span>View Full Path</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};
