import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  BookOpen, 
  Code2, 
  Trophy, 
  Lock, 
  Zap, 
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { JourneyData, RoadmapStage, WeeklyActivity, ActivityStatus } from '../types';
import { AdaptiveModal } from './AdaptiveModal';

interface RoadmapViewProps {
  journey: JourneyData;
  onUpdateActivityStatus: (activityId: string, status: ActivityStatus, difficultyDetails?: { reason: string; details?: string }) => void;
  onTriggerAdaptation: (activity: WeeklyActivity, reason: string, details: string) => Promise<void>;
  isAdapting: boolean;
  adaptiveNotification: string | null;
  onDismissNotification: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  journey,
  onUpdateActivityStatus,
  onTriggerAdaptation,
  isAdapting,
  adaptiveNotification,
  onDismissNotification
}) => {
  const [activeStageId, setActiveStageId] = useState<string>(
    journey.roadmap[0]?.id || 'stage-1'
  );
  const [selectedActivity, setSelectedActivity] = useState<WeeklyActivity | null>(null);
  const [isStruggleModalOpen, setIsStruggleModalOpen] = useState(false);
  const [activityToStruggle, setActivityToStruggle] = useState<WeeklyActivity | null>(null);

  const activeStage = journey.roadmap.find(s => s.id === activeStageId) || journey.roadmap[0];
  const activeWeek = activeStage?.weeks?.[0] || null;

  const handleMarkCompleted = (act: WeeklyActivity) => {
    onUpdateActivityStatus(act.id, 'completed');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // confetti non-blocking
    }
  };

  const handleOpenStruggle = (act: WeeklyActivity) => {
    setActivityToStruggle(act);
    setIsStruggleModalOpen(true);
  };

  const handleSubmitStruggle = async (reason: string, details: string) => {
    if (!activityToStruggle) return;
    await onTriggerAdaptation(activityToStruggle, reason, details);
    setIsStruggleModalOpen(false);
    setActivityToStruggle(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Dynamic Adaptive Journey Update Banner (Req 12) */}
      {adaptiveNotification && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-emerald-500/10 border border-amber-300 shadow-xs flex items-start justify-between gap-4 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Journey Dynamically Updated
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Adaptive AI
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 mt-1 font-medium leading-relaxed">
                {adaptiveNotification}
              </p>
            </div>
          </div>
          <button
            onClick={onDismissNotification}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 shrink-0 px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Roadmap Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150 mb-2">
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            <span>Personalized Gap-Sequenced Roadmap</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Your Path to {journey.profile.targetRole}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Ordered specifically around your identified gaps so foundational capabilities unlock downstream tasks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Stages:</span>
          <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
            {journey.roadmap.filter(s => s.status === 'completed').length} / {journey.roadmap.length} Completed
          </span>
        </div>
      </div>

      {/* Stage Progression Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {journey.roadmap.map((stage, idx) => {
          const isSelected = stage.id === activeStageId;
          const isLocked = stage.status === 'locked';
          const isCompleted = stage.status === 'completed';

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200'
                  : isCompleted
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 hover:bg-emerald-100'
                  : isLocked
                  ? 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                  : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                <span className={isSelected ? 'text-indigo-200' : 'text-slate-400'}>
                  Stage 0{idx + 1}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-indigo-500'}`} />
                )}
              </div>
              <div className="text-xs font-bold truncate">
                {stage.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Overview Card */}
      {activeStage && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                Stage {activeStage.stageNumber}: {activeStage.name}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {activeStage.objective}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400">Focus Skills:</span>
              {activeStage.targetSkills.map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Practice & Milestone Goal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
              <span className="font-bold text-slate-700 block mb-1">Hands-on Practice Goal:</span>
              <p className="text-slate-600 leading-relaxed">{activeStage.practiceSummary}</p>
            </div>
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-150">
              <span className="font-bold text-indigo-950 block mb-1">Stage Milestone Deliverable:</span>
              <p className="text-indigo-900 leading-relaxed font-medium">{activeStage.projectMilestone}</p>
            </div>
          </div>

          {/* Weekly Mission Section (Req 11) */}
          {activeStage.weeks && activeStage.weeks.length > 0 ? (
            <div className="space-y-6 pt-2">
              {activeStage.weeks.map((week) => (
                <div key={week.weekNumber} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-xs">
                        Week {week.weekNumber}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">
                        {week.title}
                      </h3>
                      {week.isAdapted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          <Zap className="w-3 h-3 text-amber-600" />
                          Adapted Curriculum
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      Proof: {week.proofOfProgress.slice(0, 45)}...
                    </span>
                  </div>

                  {week.adaptationNote && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <strong>AI Navigation Note:</strong> {week.adaptationNote}
                    </div>
                  )}

                  {/* Activity Cards for this week */}
                  <div className="grid grid-cols-1 gap-3.5">
                    {week.activities.map((act) => {
                      const isDone = act.status === 'completed';
                      const isStruggling = act.status === 'need_practice';

                      return (
                        <div
                          key={act.id}
                          className={`p-5 rounded-2xl border transition-all ${
                            isDone
                              ? 'bg-emerald-50/40 border-emerald-200'
                              : isStruggling
                              ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  act.type === 'learn'
                                    ? 'bg-blue-100 text-blue-800'
                                    : act.type === 'practice'
                                    ? 'bg-indigo-100 text-indigo-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {act.type}
                                </span>
                                <span className="text-xs text-slate-400 font-medium">
                                  ⏱ {act.estimatedHours}
                                </span>
                                {act.difficultyFeedback && (
                                  <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-semibold">
                                    Difficulty: {act.difficultyFeedback.reason}
                                  </span>
                                )}
                              </div>

                              <h4 className="text-base font-bold text-slate-900">
                                {act.title}
                              </h4>

                              <p className="text-xs text-slate-600 leading-relaxed">
                                <strong>What to learn:</strong> {act.whatToLearn}
                              </p>

                              <p className="text-xs text-slate-500">
                                <strong>Why it matters:</strong> {act.whyItMatters}
                              </p>

                              {/* Action Items List */}
                              <div className="mt-2 space-y-1">
                                {act.whatToDo.map((step, idx) => (
                                  <div key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                                    <span className="text-indigo-600 font-bold shrink-0">→</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                                <strong>Expected Outcome:</strong> {act.expectedOutcome}
                              </div>
                            </div>

                            {/* Action Buttons: Completed / Need More Practice / Skip */}
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0">
                              {isDone ? (
                                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Completed</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleMarkCompleted(act)}
                                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Mark Completed</span>
                                </button>
                              )}

                              <button
                                onClick={() => handleOpenStruggle(act)}
                                className={`w-full sm:w-auto px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors flex items-center justify-center gap-1.5 ${
                                  isStruggling
                                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                                    : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                <span>Need More Practice</span>
                              </button>

                              <button
                                onClick={() => onUpdateActivityStatus(act.id, 'skipped')}
                                className="text-[11px] font-medium text-slate-400 hover:text-slate-600 py-1"
                              >
                                Skip for now
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-500">
              This stage is currently locked. Complete Stage 1 foundational activities to unlock Week 3 & 4 tasks.
            </div>
          )}
        </div>
      )}

      {/* Adaptive Recalibration Modal */}
      {activityToStruggle && (
        <AdaptiveModal
          activity={activityToStruggle}
          targetRole={journey.profile.targetRole}
          isOpen={isStruggleModalOpen}
          onClose={() => setIsStruggleModalOpen(false)}
          onSubmitStruggle={handleSubmitStruggle}
          isAdapting={isAdapting}
        />
      )}

    </div>
  );
};
