import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

interface AnalysisLoaderProps {
  onComplete: () => void;
  targetRole: string;
  error?: string | null;
  onRetry?: () => void;
  onUseFallbackDemo?: () => void;
}

const STEPS = [
  { step: '01', title: 'Reading your profile & evidence', detail: 'Extracting demonstrated projects, tools, and background context...' },
  { step: '02', title: 'Mapping your existing skills', detail: 'Synthesizing verified strengths and foundational capabilities...' },
  { step: '03', title: 'Comparing with your target role', detail: 'Cross-referencing benchmarks and technical expectations...' },
  { step: '04', title: 'Finding your highest-impact gaps', detail: 'Calculating sequence priorities and unlocking bottlenecks...' },
  { step: '05', title: 'Building your learning journey', detail: 'Assembling personalized stages, weekly missions, and practice projects...' }
];

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({
  onComplete,
  targetRole,
  error,
  onRetry,
  onUseFallbackDemo
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (error) return;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          // Small settle buffer before completing
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 950);

    return () => clearInterval(timer);
  }, [error, onComplete]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center">
        
        {/* Error State */}
        {error ? (
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                We couldn't complete the AI analysis.
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                {error}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Analysis</span>
                </button>
              )}

              {onUseFallbackDemo && (
                <button
                  onClick={onUseFallbackDemo}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  Load Pre-Generated Demo Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Progress State */
          <div>
            {/* Header */}
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-150 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-indigo-600 animate-pulse" />
            </div>

            <span className="text-xs uppercase font-bold tracking-wider text-indigo-600">
              AI Skill Navigator
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Analyzing Destination: {targetRole}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Building your explainable Skill Twin & personalized roadmap...
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full mt-6 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
              />
            </div>

            {/* Step List */}
            <div className="mt-8 space-y-3 text-left">
              {STEPS.map((item, idx) => {
                const isCompleted = idx < currentStepIndex;
                const isActive = idx === currentStepIndex;

                return (
                  <div
                    key={item.step}
                    className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                      isActive
                        ? 'bg-indigo-50/60 border-indigo-200 shadow-xs'
                        : isCompleted
                        ? 'bg-slate-50/80 border-slate-200/80 opacity-90'
                        : 'bg-white border-transparent opacity-40'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isActive
                              ? 'bg-indigo-600 text-white animate-pulse'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {item.step}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold ${
                            isActive ? 'text-indigo-950' : isCompleted ? 'text-slate-800' : 'text-slate-500'
                          }`}
                        >
                          {item.title}
                        </span>
                        {isActive && (
                          <span className="text-[10px] uppercase font-semibold text-indigo-600 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                            Analyzing
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
