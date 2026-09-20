import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  BookOpen, 
  Code2, 
  Compass, 
  Layers, 
  ShieldAlert,
  ExternalLink,
  Zap,
  Target
} from 'lucide-react';
import { JourneyData, SkillTwinItem, SkillState, LearningResource, PracticeProject } from '../types';

interface SkillTwinViewProps {
  journey: JourneyData;
  onNavigateToRoadmap: () => void;
  onSelectResource?: (resource: LearningResource) => void;
}

export const SkillTwinView: React.FC<SkillTwinViewProps> = ({
  journey,
  onNavigateToRoadmap,
}) => {
  const [filterState, setFilterState] = useState<SkillState | 'all'>('all');
  const [expandedSkillId, setExpandedSkillId] = useState<string | null>(
    // Open the first gap by default for quick demo inspection
    journey.skillTwin.find(s => s.state === 'gap')?.id || null
  );
  const [activeProjectSkill, setActiveProjectSkill] = useState<string | null>(
    journey.practiceProjects[0]?.skillName || journey.skillTwin.find(s => s.state === 'gap')?.name || null
  );

  const strongCount = journey.skillTwin.filter(s => s.state === 'strong').length;
  const developingCount = journey.skillTwin.filter(s => s.state === 'developing').length;
  const gapCount = journey.skillTwin.filter(s => s.state === 'gap').length;

  const filteredSkills = journey.skillTwin.filter(s => {
    if (filterState === 'all') return true;
    return s.state === filterState;
  });

  const selectedPracticeProject = journey.practiceProjects.find(
    p => p.skillName.toLowerCase() === activeProjectSkill?.toLowerCase()
  ) || journey.practiceProjects[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* Header & Target Role Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150 mb-2">
            <Layers className="w-3.5 h-3.5 text-indigo-500" />
            <span>Digital Skill Twin Representation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Your Skill Gap Map
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Target Role: <strong className="text-slate-900 font-bold">{journey.profile.targetRole}</strong>
            {journey.profile.targetIndustry && (
              <span className="text-slate-400"> • {journey.profile.targetIndustry}</span>
            )}
          </p>
        </div>

        {/* Action button to Roadmap */}
        <button
          onClick={onNavigateToRoadmap}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
        >
          <span>View Personalized Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Visual State Summary (Not a simplistic score!) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Strong Box */}
        <button
          onClick={() => setFilterState(filterState === 'strong' ? 'all' : 'strong')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            filterState === 'strong'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Strong
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-950 mt-1">
            {strongCount}
          </div>
          <p className="text-xs text-emerald-700 mt-1">
            Verified skills with documented evidence in your profile.
          </p>
        </button>

        {/* Developing Box */}
        <button
          onClick={() => setFilterState(filterState === 'developing' ? 'all' : 'developing')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            filterState === 'developing'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Developing
            </span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-950 mt-1">
            {developingCount}
          </div>
          <p className="text-xs text-amber-700 mt-1">
            Partial exposure or related background needing structured depth.
          </p>
        </button>

        {/* Gap Box */}
        <button
          onClick={() => setFilterState(filterState === 'gap' ? 'all' : 'gap')}
          className={`p-5 rounded-2xl border text-left transition-all ${
            filterState === 'gap'
              ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
              : 'bg-white border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Gap
            </span>
            <AlertCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-extrabold text-rose-950 mt-1">
            {gapCount}
          </div>
          <p className="text-xs text-rose-700 mt-1">
            Required for target role with little to no evidence detected.
          </p>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Filter:</span>
          {(['all', 'gap', 'developing', 'strong'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterState(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterState === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All Skills' : f}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          Showing {filteredSkills.length} of {journey.skillTwin.length} skills evaluated
        </div>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkillId === skill.id;
          const isGap = skill.state === 'gap';
          const isDeveloping = skill.state === 'developing';
          const isStrong = skill.state === 'strong';

          const stateBadgeClass = isStrong
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : isDeveloping
            ? 'bg-amber-50 text-amber-800 border-amber-200'
            : 'bg-rose-50 text-rose-800 border-rose-200';

          return (
            <div
              key={skill.id}
              className={`rounded-2xl border transition-all p-6 flex flex-col justify-between ${
                isGap
                  ? 'bg-white border-rose-200/80 hover:border-rose-300'
                  : isDeveloping
                  ? 'bg-white border-amber-200/80 hover:border-amber-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              } shadow-2xs`}
            >
              <div>
                {/* Header: Skill Name & State Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {skill.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {skill.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${stateBadgeClass}`}>
                      {skill.state}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {skill.importance} priority
                    </span>
                  </div>
                </div>

                {/* Evidence & Status Rationale */}
                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-150">
                    <span className="font-bold text-slate-700 block mb-0.5">
                      Detected Evidence:
                    </span>
                    <span className="text-slate-600 leading-relaxed">
                      {skill.evidence}
                    </span>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block">Why it matters for {journey.profile.targetRole}:</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">
                      {skill.whyMattersForRole}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block">Recommended Next Action:</span>
                    <p className="text-slate-800 mt-0.5 font-medium">
                      {skill.nextAction}
                    </p>
                  </div>
                </div>

                {/* Expandable "Why this gap?" AI Reasoning (Req 9) */}
                {skill.reasoning && (
                  <div className="mt-4 pt-3 border-t border-slate-150">
                    <button
                      onClick={() => setExpandedSkillId(isExpanded ? null : skill.id)}
                      className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 hover:text-indigo-800 py-1"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        Why this status? (AI Reasoning Breakdown)
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-150 space-y-2 text-[11px] animate-fadeIn">
                        <div>
                          <strong className="text-indigo-950 font-bold">Role Requirement:</strong>
                          <span className="text-indigo-900 ml-1.5">{skill.reasoning.requiredForRole}</span>
                        </div>
                        <div>
                          <strong className="text-indigo-950 font-bold">Evidence Synthesis:</strong>
                          <span className="text-indigo-900 ml-1.5">{skill.reasoning.evidenceSummary}</span>
                        </div>
                        <div>
                          <strong className="text-indigo-950 font-bold">Roadmap Unlocked:</strong>
                          <span className="text-indigo-900 ml-1.5">{skill.reasoning.roadmapStageUnlocked}</span>
                        </div>
                        <div>
                          <strong className="text-indigo-950 font-bold">Priority Factor:</strong>
                          <span className="text-indigo-900 ml-1.5">{skill.reasoning.priorityReason}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action link */}
              {isGap && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Addressed in Stage 1
                  </span>
                  <button
                    onClick={() => setActiveProjectSkill(skill.name)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Inspect Practice Tasks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Practice & Project Generator Showcase (Req 17) */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-1">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Practice & Portfolio Generator</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              3-Tier Practice for: <span className="text-indigo-400">{activeProjectSkill || 'Your Priority Gap'}</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Appropriate to your current level ({journey.profile.currentLevel}) and tailored to {journey.profile.targetRole}.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {journey.skillTwin.filter(s => s.state === 'gap').map(s => (
              <button
                key={s.id}
                onClick={() => setActiveProjectSkill(s.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeProjectSkill === s.name
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {selectedPracticeProject ? (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Tier 1: Practice Task */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                  Tier 1 • Quick Practice
                </span>
                <h4 className="text-base font-bold text-slate-100 mt-1">
                  {selectedPracticeProject.practiceTask.title}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedPracticeProject.practiceTask.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
                ⏱ Effort: ~{selectedPracticeProject.practiceTask.estimatedMinutes} minutes
              </div>
            </div>

            {/* Tier 2: Mini Challenge */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Tier 2 • Mini Challenge
                </span>
                <h4 className="text-base font-bold text-slate-100 mt-1">
                  {selectedPracticeProject.miniChallenge.title}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedPracticeProject.miniChallenge.scenario}
                </p>
                <div className="mt-2 space-y-1">
                  {selectedPracticeProject.miniChallenge.instructions.slice(0, 2).map((inst, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400">
                🎯 Slightly harder application scenario
              </div>
            </div>

            {/* Tier 3: Portfolio Project */}
            <div className="p-5 rounded-2xl bg-indigo-950/70 border border-indigo-800/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                  Tier 3 • Portfolio Showcase
                </span>
                <h4 className="text-base font-bold text-slate-100 mt-1">
                  {selectedPracticeProject.portfolioProject.title}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedPracticeProject.portfolioProject.businessGoal}
                </p>
                <div className="mt-2 space-y-1">
                  {selectedPracticeProject.portfolioProject.deliverables.slice(0, 2).map((del, i) => (
                    <div key={i} className="text-[11px] text-indigo-200 flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold">✓</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-indigo-800/60 text-[11px] text-indigo-300 font-medium">
                💼 Role-ready proof for hiring teams
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 text-xs text-slate-400">Select a gap above to preview targeted practice modules.</div>
        )}
      </section>

      {/* Recommended Learning Resources (Req 16) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Curated Free Resources for Your Gaps
            </h2>
            <p className="text-xs text-slate-500">
              Selected from verified open educational databases to bridge your highest priority bottlenecks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {journey.resources.slice(0, 3).map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {res.format}
                  </span>
                  {res.isFree && (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      100% Free
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {res.whySelected}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{res.topic}</span>
                {res.url ? (
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Self-guided</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
