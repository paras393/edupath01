import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Printer, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Layers, 
  Compass,
  ArrowRight,
  TrendingUp,
  X
} from 'lucide-react';
import { JourneyData } from '../types';

interface ProgressViewProps {
  journey: JourneyData;
  onNavigateToRoadmap: () => void;
  onNavigateToAskAI: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  journey,
  onNavigateToRoadmap,
  onNavigateToAskAI
}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate statistics
  const strongSkills = journey.skillTwin.filter(s => s.state === 'strong');
  const developingSkills = journey.skillTwin.filter(s => s.state === 'developing');
  const gapSkills = journey.skillTwin.filter(s => s.state === 'gap');

  // Completed activities
  const allActivities = journey.roadmap.flatMap(s => (s.weeks || []).flatMap(w => w.activities));
  const completedActivities = allActivities.filter(a => a.status === 'completed');
  const inProgressActivities = allActivities.filter(a => a.status === 'pending' || a.status === 'need_practice');

  // Generate clean text summary for clipboard sharing
  const generateShareText = () => {
    return `EduPath Career Navigator Report
Learner: ${journey.profile.name}
Target Role: ${journey.profile.targetRole}
Goal: ${journey.profile.careerGoal}

Skill Twin Overview:
- Strong (${strongSkills.length}): ${strongSkills.map(s => s.name).join(', ')}
- Developing (${developingSkills.length}): ${developingSkills.map(s => s.name).join(', ')}
- Gaps (${gapSkills.length}): ${gapSkills.map(s => s.name).join(', ')}

Progress & Milestones:
- Activities Completed: ${completedActivities.length} of ${allActivities.length}
- Active Roadmap Stage: ${journey.roadmap[0]?.name}
- Recent Adaptations: ${journey.adaptiveHistory.length} roadmap adjustments

Generated via EduPath AI Navigator`;
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(generateShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            <span>Capability Evolution Tracker</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
            Journey & Progress Status
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Tracking your evolution from current baseline toward <strong className="text-slate-900">{journey.profile.targetRole}</strong> readiness.
          </p>
        </div>

        {/* Generate Report CTA */}
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
        >
          <FileText className="w-4 h-4 text-indigo-300" />
          <span>Generate Progress Report</span>
        </button>
      </div>

      {/* 4-Stat Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Skills Verified</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {strongSkills.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Strong capabilities with proof</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>In Progress</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {developingSkills.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Developing with active practice</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Remaining Gaps</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {gapSkills.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Scheduled in upcoming stages</p>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-150 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-700">
            <span>Activities Completed</span>
            <Compass className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-950 mt-2">
            {completedActivities.length}
          </div>
          <p className="text-xs text-indigo-800 mt-1">Hands-on tasks verified</p>
        </div>
      </div>

      {/* Current Focus Card */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            Current Weekly Focus & Next Actions
          </h3>
          <button
            onClick={onNavigateToRoadmap}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Jump to Tasks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Stage
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {journey.roadmap[0]?.name || 'Stage 1: Foundation'}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {journey.roadmap[0]?.objective}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Next Deliverable Proof
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {journey.roadmap[0]?.projectMilestone || 'Complete portfolio milestone'}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Proves hands-on capability for {journey.profile.targetRole} role.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity & Adaptive Evolution Log */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">
          Recent Activity & Adaptive Navigation History
        </h3>

        {journey.adaptiveHistory.length > 0 ? (
          <div className="space-y-3">
            {journey.adaptiveHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                  ⚡
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950">
                      Roadmap Dynamic Shift: {item.affectedSkill}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-700 mt-1">
                    <strong>Trigger:</strong> {item.reportedReason}
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    <strong>AI Adaptation:</strong> {item.changeSummary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-150 text-center text-xs text-slate-500">
            No difficulty reports yet. As you mark activities or request extra practice in the Roadmap, the AI will document every curriculum adjustment right here.
          </div>
        )}
      </div>

      {/* Progress Report Modal (Req 14) */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Learner Progress & Skill Twin Report
                </h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Report Canvas */}
            <div id="printable-report" className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 text-slate-800">
              {/* Header block */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-xl font-extrabold text-slate-900">EduPath Career Navigator</div>
                  <div className="text-xs text-slate-500">Official Learner Progress Report • Date: {new Date().toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">{journey.profile.name}</div>
                  <div className="text-xs text-indigo-600 font-semibold">{journey.profile.targetRole}</div>
                </div>
              </div>

              {/* Goal */}
              <div className="text-xs">
                <span className="font-bold text-slate-700 block mb-0.5">Career Objective:</span>
                <span className="text-slate-600">{journey.profile.careerGoal}</span>
              </div>

              {/* Skill Twin Snapshot */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  Skill Twin Architecture:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-emerald-700 block mb-1">Strong ({strongSkills.length})</span>
                    <ul className="space-y-1 text-slate-600">
                      {strongSkills.map(s => (
                        <li key={s.id}>• {s.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-amber-700 block mb-1">Developing ({developingSkills.length})</span>
                    <ul className="space-y-1 text-slate-600">
                      {developingSkills.map(s => (
                        <li key={s.id}>• {s.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="font-bold text-rose-700 block mb-1">Gaps Underway ({gapSkills.length})</span>
                    <ul className="space-y-1 text-slate-600">
                      {gapSkills.map(s => (
                        <li key={s.id}>• {s.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Milestone deliverables */}
              <div className="text-xs space-y-1 border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-900 block">Current Milestone Deliverable:</span>
                <span className="text-slate-600">{journey.roadmap[0]?.projectMilestone}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={handleCopyReport}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text Summary'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
