import React from 'react';
import { 
  Compass, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  Zap, 
  Code2, 
  FileText,
  TrendingUp,
  Target
} from 'lucide-react';
import { JourneyData } from '../types';

interface OverviewViewProps {
  journey: JourneyData;
  onNavigateToTab: (tab: 'skills' | 'roadmap' | 'progress' | 'ask') => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  journey,
  onNavigateToTab
}) => {
  const strong = journey.skillTwin.filter(s => s.state === 'strong');
  const developing = journey.skillTwin.filter(s => s.state === 'developing');
  const gaps = journey.skillTwin.filter(s => s.state === 'gap');
  const activeStage = journey.roadmap[0];
  const activeWeek = activeStage?.weeks?.[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome & Target Role Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Personalized Career Navigation Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome, {journey.profile.name}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Target Role: <strong className="text-white font-bold">{journey.profile.targetRole}</strong> • Goal: {journey.profile.careerGoal}
            </p>

            <p className="text-xs text-indigo-200/80 mt-1">
              Your existing experience in <strong>{strong.map(s => s.name).slice(0, 2).join(' & ')}</strong> has fast-tracked your foundation. Your roadmap focuses immediately on bridging <strong>{gaps[0]?.name || 'key gaps'}</strong>.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateToTab('roadmap')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Resume Week 1 Mission</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToTab('skills')}
              className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Explore Skill Twin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-State Skill Twin Quick Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigateToTab('skills')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 cursor-pointer shadow-2xs transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700">
            <span className="uppercase tracking-wider">Verified Strong</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-950 mt-1.5">
            {strong.length} Skills
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {strong.map(s => s.name).join(', ')}
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('skills')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 cursor-pointer shadow-2xs transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-amber-700">
            <span className="uppercase tracking-wider">Developing</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-amber-950 mt-1.5">
            {developing.length} Skills
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {developing.map(s => s.name).join(', ')}
          </p>
        </div>

        <div
          onClick={() => onNavigateToTab('skills')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-300 cursor-pointer shadow-2xs transition-all group"
        >
          <div className="flex items-center justify-between text-xs font-bold text-rose-700">
            <span className="uppercase tracking-wider">Identified Gaps</span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold text-rose-950 mt-1.5">
            {gaps.length} Skills
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {gaps.map(s => s.name).join(', ')}
          </p>
        </div>
      </div>

      {/* Two Column Layout: Current Mission & Top Gap Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Active Weekly Mission SPrint */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Active Weekly Mission
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Week 1 • Stage 1
              </span>
            </div>

            {activeWeek ? (
              <div className="mt-4 space-y-3">
                <h3 className="text-lg font-bold text-slate-900">
                  {activeWeek.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Focus: Turn your biggest gap into hands-on proficiency through structured query exercises.
                </p>

                <div className="space-y-2 pt-2">
                  {activeWeek.activities.slice(0, 3).map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-150 text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{act.title}</span>
                        <span className="text-slate-400 block text-[11px] mt-0.5">⏱ {act.estimatedHours}</span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        act.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {act.status === 'completed' ? 'Done' : act.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 mt-4">Stage in progress.</div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Ready to take action?</span>
            <button
              onClick={() => onNavigateToTab('roadmap')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Open Full Weekly Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Highest-Impact Gaps & Why Sequenced First */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Priority Gaps Underway
              </span>
              <button
                onClick={() => onNavigateToTab('skills')}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                View all ({gaps.length})
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {gaps.slice(0, 3).map((gap) => (
                <div
                  key={gap.id}
                  className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-150 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{gap.name}</span>
                    <span className="text-[10px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                      {gap.importance} Priority
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                    {gap.whyMattersForRole}
                  </p>
                  <div className="text-[11px] text-indigo-700 font-medium pt-1">
                    Next: {gap.nextAction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Curious why these gaps matter?</span>
            <button
              onClick={() => onNavigateToTab('ask')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Ask AI Navigator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
