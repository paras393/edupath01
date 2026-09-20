import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Compass, 
  Layers, 
  FileText, 
  HelpCircle,
  X 
} from 'lucide-react';

interface JudgeTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToStep: (stepNumber: number) => void;
}

const TOUR_STEPS = [
  {
    step: 1,
    title: '01. Profile & Multi-Format Evidence',
    subtitle: 'Not generic multiple-choice questions',
    description: 'Learners input their target role and upload real resumes, portfolio write-ups, or text files parsed locally without paid 3rd party APIs.',
    targetTab: 'overview' as const,
    highlight: 'Notice Maya Chen uploaded a marketing resume with Excel models.'
  },
  {
    step: 2,
    title: '02. AI Capability Extraction',
    subtitle: 'Server-side Gemini with User-Agent auditing',
    description: 'The AI extracts demonstrated skills, projects, and work highlights without hallucinating unproven skills.',
    targetTab: 'skills' as const,
    highlight: 'Advanced spreadsheet formulas & campaign analytics were extracted.'
  },
  {
    step: 3,
    title: '03. Digital Skill Twin & Gap Map',
    subtitle: 'Explainable 3-state architecture',
    description: 'Categorizes skills into Strong (verified), Developing (partial), and Gap (missing for target role). Not a simplistic percent score.',
    targetTab: 'skills' as const,
    highlight: 'Spreadsheets = Strong, SQL = Gap, Statistics = Developing.'
  },
  {
    step: 4,
    title: '04. Explainable "Why This Gap?"',
    subtitle: 'Transparent AI reasoning breakdown',
    description: 'Clicking any skill reveals why it was classified that way, what evidence exists, and why it matters to hiring managers.',
    targetTab: 'skills' as const,
    highlight: 'See the exact role requirement and roadmap unlock justification.'
  },
  {
    step: 5,
    title: '05. Personalized Gap-Sequenced Roadmap',
    subtitle: 'Stages ordered by foundational bottlenecks',
    description: 'Stage 1 addresses SQL first because it unlocks all subsequent analysis and dashboard stages.',
    targetTab: 'roadmap' as const,
    highlight: 'Compare Maya (starts at SQL) vs David (starts at BI dashboards).'
  },
  {
    step: 6,
    title: '06. Weekly Missions & Hands-on Tasks',
    subtitle: 'Actionable weekly sprints',
    description: 'Every week includes Learn, Practice, and Build activities with clear proof-of-progress milestones.',
    targetTab: 'roadmap' as const,
    highlight: 'Inspect task: SELECT & WHERE with business sales queries.'
  },
  {
    step: 7,
    title: '07. The Adaptive Loop (Core Differentiator)',
    subtitle: 'Dynamically shifts when learner struggles',
    description: 'Marking "Need More Practice" prompts the AI to inject micro-activities, visual breakdowns, and update upcoming weeks.',
    targetTab: 'roadmap' as const,
    highlight: 'Try clicking "Need More Practice" on any task to see the path rewire!'
  },
  {
    step: 8,
    title: '08. Grounded "Ask My Journey" AI',
    subtitle: 'Tethered strictly to personal evidence',
    description: 'Ask "Why am I learning SQL before Python?" and get an answer rooted in your specific profile and gap structure.',
    targetTab: 'ask' as const,
    highlight: 'Zero generic chat hallucinations; purely contextual guidance.'
  },
  {
    step: 9,
    title: '09. Progress Report & Skill Evolution',
    subtitle: 'Exportable career transformation summary',
    description: 'Tracks evolution over time and generates a printable, copyable Skill Twin Progress Report for mentors or hiring managers.',
    targetTab: 'progress' as const,
    highlight: 'Open "Generate Progress Report" to preview the executive summary.'
  }
];

export const JudgeTourModal: React.FC<JudgeTourModalProps> = ({
  isOpen,
  onClose,
  onJumpToStep
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      onJumpToStep(TOUR_STEPS[nextIdx].step);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      onJumpToStep(TOUR_STEPS[prevIdx].step);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
                Hackathon Judge Demonstration Tour
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Step {currentStepIdx + 1} of {TOUR_STEPS.length}
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

        {/* Tour Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIdx + 1) / TOUR_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          <div>
            <span className="text-xs font-semibold text-emerald-700">
              {currentStep.subtitle}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
              {currentStep.title}
            </h2>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-150 text-xs text-indigo-900">
            <strong>Judge Checkpoint:</strong> {currentStep.highlight}
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="flex items-center justify-center gap-1.5 mt-6 pt-4 border-t border-slate-100 overflow-x-auto py-1">
          {TOUR_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStepIdx(idx);
                onJumpToStep(s.step);
              }}
              className={`w-6 h-6 rounded-full text-[11px] font-bold transition-all ${
                currentStepIdx === idx
                  ? 'bg-slate-900 text-white scale-110'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {s.step}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>{currentStepIdx === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
