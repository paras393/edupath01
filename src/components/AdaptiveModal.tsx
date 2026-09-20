import React, { useState } from 'react';
import { Sparkles, AlertCircle, X, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { WeeklyActivity } from '../types';

interface AdaptiveModalProps {
  activity: WeeklyActivity;
  targetRole: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitStruggle: (reason: string, details: string) => Promise<void>;
  isAdapting: boolean;
}

const STRUGGLE_OPTIONS = [
  "Didn't understand the concept",
  "Need more examples",
  "Need more practice",
  "Too advanced",
  "Other"
];

export const AdaptiveModal: React.FC<AdaptiveModalProps> = ({
  activity,
  targetRole,
  isOpen,
  onClose,
  onSubmitStruggle,
  isAdapting
}) => {
  const [selectedReason, setSelectedReason] = useState<string>(STRUGGLE_OPTIONS[0]);
  const [customDetails, setCustomDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmitStruggle(selectedReason, customDetails);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
                Adaptive Journey Calibrator
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                What was difficult?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isAdapting}
            className="text-slate-400 hover:text-slate-600 p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Activity context */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="font-bold text-slate-700 block">Current Focus Activity:</span>
          <span className="text-slate-900 font-semibold">{activity.title}</span>
          <p className="text-slate-500 mt-0.5">{activity.whatToLearn}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Select what held you back:
            </label>
            <div className="space-y-2">
              {STRUGGLE_OPTIONS.map((opt) => (
                <label
                  key={opt}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    selectedReason === opt
                      ? 'bg-indigo-50/70 border-indigo-400 text-indigo-950 ring-1 ring-indigo-200'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="struggleReason"
                    value={opt}
                    checked={selectedReason === opt}
                    onChange={() => setSelectedReason(opt)}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Specific questions or confusion (Optional):
            </label>
            <textarea
              rows={2}
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              placeholder="e.g. Confused about when to use LEFT JOIN vs INNER JOIN when tables have NULL customer IDs"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          {/* AI Explanation preview */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
            <strong>How EduPath adapts:</strong> Instead of advancing you blindly to advanced material, the AI will restructure your upcoming week with targeted visual guides and micro-exercises before moving forward.
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isAdapting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              id="btn-submit-struggle"
              type="submit"
              disabled={isAdapting}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2"
            >
              {isAdapting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>AI Recalibrating Journey...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Update My Learning Path</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
