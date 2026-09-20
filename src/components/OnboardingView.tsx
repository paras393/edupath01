import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Trash2, Sparkles, ArrowRight, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { LearnerProfile, ExperienceLevel, UploadedDoc } from '../types';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { extractTextFromFile } from '../utils/documentParser';

interface OnboardingViewProps {
  onAnalyze: (profile: LearnerProfile) => void;
  onSelectDemo: (demoId: string) => void;
  onCancel: () => void;
  initialProfile?: LearnerProfile | null;
}

const COMMON_ROLES = [
  'Data Analyst',
  'Frontend Developer',
  'UI/UX Designer',
  'Product Manager',
  'Digital Marketer',
  'Business Analyst'
];

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onAnalyze,
  onSelectDemo,
  onCancel,
  initialProfile
}) => {
  const [name, setName] = useState(initialProfile?.name || '');
  const [targetRole, setTargetRole] = useState(initialProfile?.targetRole || 'Data Analyst');
  const [customRole, setCustomRole] = useState('');
  const [careerGoal, setCareerGoal] = useState(
    initialProfile?.careerGoal || 'Land a mid-level role at a high-growth tech company within 6 months.'
  );
  const [targetIndustry, setTargetIndustry] = useState(initialProfile?.targetIndustry || 'Technology / SaaS');
  const [currentLevel, setCurrentLevel] = useState<ExperienceLevel>(initialProfile?.currentLevel || 'Intermediate');
  const [manualSkillsInput, setManualSkillsInput] = useState(
    initialProfile?.manualSkills.join(', ') || ''
  );
  const [experienceSummary, setExperienceSummary] = useState(
    initialProfile?.experienceSummary || ''
  );
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>(
    initialProfile?.uploadedDocuments || []
  );
  const [isExtracting, setIsExtracting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeRole = targetRole === 'Other' ? customRole : targetRole;

  const handleFileUpload = async (files: FileList | File[]) => {
    setIsExtracting(true);
    const newDocs: UploadedDoc[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const text = await extractTextFromFile(file);
        newDocs.push({
          id: 'doc-' + Date.now() + '-' + i,
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
          extractedTextSnippet: text
        });
      } catch (err) {
        console.error('Extraction error for file:', file.name, err);
        newDocs.push({
          id: 'doc-' + Date.now() + '-' + i,
          name: file.name,
          size: file.size,
          type: file.type || 'unknown',
          extractedTextSnippet: `Uploaded document: ${file.name}.`
        });
      }
    }

    setUploadedDocs(prev => [...prev, ...newDocs]);
    setIsExtracting(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeDoc = (id: string) => {
    setUploadedDocs(prev => prev.filter(d => d.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = manualSkillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const profile: LearnerProfile = {
      name: name.trim() || 'Learner',
      targetRole: activeRole || 'Data Analyst',
      careerGoal: careerGoal.trim(),
      targetIndustry: targetIndustry.trim(),
      currentLevel,
      manualSkills: skillsArray,
      experienceSummary: experienceSummary.trim(),
      uploadedDocuments: uploadedDocs
    };

    onAnalyze(profile);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header with Quick Demo Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-indigo-600">
            Guided Assessment
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Build Your Learning Journey
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Tell EduPath where you are headed and upload evidence of your existing capabilities.
          </p>
        </div>

        {/* Demo Fast Track Pill */}
        <div className="p-3 bg-indigo-50/70 border border-indigo-150 rounded-xl flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-bold text-indigo-900 block">Judging or Short on Time?</span>
            <span className="text-indigo-700">Load a pre-configured profile instantly.</span>
          </div>
          <div className="flex items-center gap-1.5">
            {DEMO_PROFILES.slice(0, 3).map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => onSelectDemo(demo.id)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-100 text-[11px] font-semibold text-indigo-800 border border-indigo-200 transition-colors shadow-2xs"
              >
                {demo.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">

        {/* Section 1: Target Destination */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
              1
            </span>
            <span>Where do you want to go?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Role <span className="text-rose-500">*</span>
              </label>
              <select
                id="select-target-role"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                {COMMON_ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
                <option value="Other">Custom Role...</option>
              </select>

              {targetRole === 'Other' && (
                <input
                  type="text"
                  placeholder="e.g. Cloud Security Architect"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  required
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Industry / Domain (Optional)
              </label>
              <input
                type="text"
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
                placeholder="e.g. FinTech, Healthcare, B2B SaaS"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Career Goal
            </label>
            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. Transition from marketing to junior data analyst within 4 months"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Section 2: Current Level & Background */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
              2
            </span>
            <span>Where are you right now?</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Your Full Name or Pseudonym
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as ExperienceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setCurrentLevel(lvl)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      currentLevel === lvl
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Current Known Skills (Comma separated)
            </label>
            <input
              type="text"
              value={manualSkillsInput}
              onChange={(e) => setManualSkillsInput(e.target.value)}
              placeholder="e.g. Excel, SQL, Tableau, Project Management"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Manual entry is optional — EduPath will also extract skills from your uploaded documents.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Experience Summary (Optional)
            </label>
            <textarea
              rows={2}
              value={experienceSummary}
              onChange={(e) => setExperienceSummary(e.target.value)}
              placeholder="e.g. 2 years working in business operations creating spreadsheet models and monthly reports."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Section 3: Evidence Upload (PDF, DOC, TXT) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs">
                3
              </span>
              <span>Upload Capability Evidence</span>
            </div>
            <span className="text-xs text-slate-400">PDF, DOCX, TXT, Markdown</span>
          </div>

          <p className="text-xs text-slate-500">
            Upload your resume, project briefs, portfolio writeups, or certificates. Documents are parsed client-side to extract real demonstrated capability.
          </p>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-indigo-500 bg-indigo-50/50'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.txt,.md,.doc,.docx,.csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleFileUpload(e.target.files);
              }}
            />
            <div className="w-12 h-12 rounded-full bg-white shadow-2xs border border-slate-200 flex items-center justify-center mx-auto text-indigo-600 mb-3">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-800">
              {isExtracting ? 'Extracting text locally...' : 'Drop resume & project files here, or click to browse'}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Supports multiple files. Local zero-external-cost text parser.
            </div>
          </div>

          {/* Uploaded File List */}
          {uploadedDocs.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="text-xs font-semibold text-slate-700">Attached Documents ({uploadedDocs.length}):</div>
              {uploadedDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-medium text-slate-800 truncate">{doc.name}</span>
                    <span className="text-slate-400 shrink-0">
                      ({(doc.size / 1024).toFixed(0)} KB • {doc.extractedTextSnippet.length} chars)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDoc(doc.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Back to Home
          </button>

          <button
            id="btn-analyze-profile"
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Analyze My Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

      </form>
    </div>
  );
};
