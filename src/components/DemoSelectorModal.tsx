import React from 'react';
import { RefreshCw, X, ArrowRight, UserCheck, Split, Zap, Sparkles } from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';

interface DemoSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDemo: (demoId: string) => void;
  onTriggerQuickAdaptation?: () => void;
  currentDemoId?: string;
}

export const DemoSelectorModal: React.FC<DemoSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectDemo,
  onTriggerQuickAdaptation,
  currentDemoId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-700">
                Judge & Evaluation Fast-Track
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Load a Realistic Demo Profile
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Comparison callout */}
        <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-150 text-xs text-indigo-950 flex items-start gap-2.5">
          <Split className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <strong>Personalization Proof:</strong> Maya and David both target <em>Data Analyst</em>, but Maya has marketing spreadsheets while David has Python stats. Notice how their resulting roadmaps and weekly missions are completely different!
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEMO_PROFILES.map((demo) => {
            const isCurrent = currentDemoId === demo.id;

            return (
              <div
                key={demo.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-200'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                } shadow-2xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {demo.badge}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {demo.name}
                  </h4>

                  <div className="text-xs font-semibold text-indigo-600 mt-0.5">
                    Target: {demo.targetRole}
                  </div>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {demo.summary}
                  </p>

                  <div className="mt-3 text-[11px] text-slate-400">
                    <strong>Evidence:</strong> {demo.data.profile.uploadedDocuments.map((d: any) => d.name).join(', ')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectDemo(demo.id);
                    onClose();
                  }}
                  className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{isCurrent ? 'Reload Profile' : 'Select ' + demo.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* 1-Click Quick Actions for Judges */}
        {onTriggerQuickAdaptation && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Need to demo the adaptive loop immediately?</span>
            <button
              onClick={() => {
                onTriggerQuickAdaptation();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-xs font-bold transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>1-Click Simulate "Need Practice" Shift</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
