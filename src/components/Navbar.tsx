import React from 'react';
import { Compass, Sparkles, User, RefreshCw, Award, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { JourneyData } from '../types';

interface NavbarProps {
  currentTab: 'overview' | 'skills' | 'roadmap' | 'progress' | 'ask';
  onSelectTab: (tab: 'overview' | 'skills' | 'roadmap' | 'progress' | 'ask') => void;
  journey: JourneyData | null;
  onResetToLanding: () => void;
  onOpenDemoMenu: () => void;
  onStartJudgeTour: () => void;
  hasAdaptiveUpdate?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  journey,
  onResetToLanding,
  onOpenDemoMenu,
  onStartJudgeTour,
  hasAdaptiveUpdate
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onResetToLanding}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
              title="EduPath Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                  EduPath
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-150">
                    AI Navigator
                  </span>
                </span>
              </div>
            </button>

            {/* Active profile badge */}
            {journey && (
              <div className="hidden md:flex items-center gap-2 pl-4 ml-3 border-l border-slate-200 text-xs text-slate-600">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-medium">
                  {journey.profile.name.charAt(0)}
                </div>
                <span className="font-medium text-slate-800">{journey.profile.name}</span>
                <span className="text-slate-400">→</span>
                <span className="font-semibold text-indigo-700 bg-indigo-50/70 px-2 py-0.5 rounded-full border border-indigo-100">
                  {journey.profile.targetRole}
                </span>
                {journey.isDemo && (
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-medium">
                    Demo Profile
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links (when journey loaded) */}
          {journey ? (
            <nav className="hidden sm:flex items-center space-x-1">
              <button
                id="nav-overview"
                onClick={() => onSelectTab('overview')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'overview'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Overview
              </button>

              <button
                id="nav-skills"
                onClick={() => onSelectTab('skills')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'skills'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                Skill Twin & Gaps
              </button>

              <button
                id="nav-roadmap"
                onClick={() => onSelectTab('roadmap')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative flex items-center gap-1.5 ${
                  currentTab === 'roadmap'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Compass className="w-4 h-4" />
                Roadmap
                {hasAdaptiveUpdate && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>

              <button
                id="nav-progress"
                onClick={() => onSelectTab('progress')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'progress'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Progress
              </button>

              <button
                id="nav-ask"
                onClick={() => onSelectTab('ask')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  currentTab === 'ask'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                Ask My Journey
              </button>
            </nav>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden md:inline">Adaptive AI Learning Architecture</span>
            </div>
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onStartJudgeTour}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs"
              title="Guided 9-step demonstration of the AI loop"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Judge Tour</span>
              <span className="sm:hidden">Tour</span>
            </button>

            <button
              onClick={onOpenDemoMenu}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Demo Profiles</span>
            </button>

            {journey && (
              <button
                onClick={onResetToLanding}
                className="hidden lg:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                New Assessment
              </button>
            )}
          </div>

        </div>

        {/* Mobile secondary tab bar */}
        {journey && (
          <div className="sm:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
            <button
              onClick={() => onSelectTab('overview')}
              className={`py-1 px-2 font-medium ${currentTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'}`}
            >
              Overview
            </button>
            <button
              onClick={() => onSelectTab('skills')}
              className={`py-1 px-2 font-medium ${currentTab === 'skills' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'}`}
            >
              Skill Twin
            </button>
            <button
              onClick={() => onSelectTab('roadmap')}
              className={`py-1 px-2 font-medium ${currentTab === 'roadmap' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'}`}
            >
              Roadmap
            </button>
            <button
              onClick={() => onSelectTab('progress')}
              className={`py-1 px-2 font-medium ${currentTab === 'progress' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600'}`}
            >
              Progress
            </button>
            <button
              onClick={() => onSelectTab('ask')}
              className={`py-1 px-2 font-medium ${currentTab === 'ask' ? 'text-indigo-600 font-bold' : 'text-indigo-600'}`}
            >
              Ask AI
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
