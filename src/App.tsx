import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { OnboardingView } from './components/OnboardingView';
import { AnalysisLoader } from './components/AnalysisLoader';
import { OverviewView } from './components/OverviewView';
import { SkillTwinView } from './components/SkillTwinView';
import { RoadmapView } from './components/RoadmapView';
import { ProgressView } from './components/ProgressView';
import { AskJourneyView } from './components/AskJourneyView';
import { JudgeTourModal } from './components/JudgeTourModal';
import { DemoSelectorModal } from './components/DemoSelectorModal';
import { DEMO_PROFILES, getDemoProfileById } from './data/demoProfiles';
import { LearnerProfile, JourneyData, ActivityStatus, WeeklyActivity } from './types';

export default function App() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'analyzing' | 'journey'>('landing');
  const [journeyTab, setJourneyTab] = useState<'overview' | 'skills' | 'roadmap' | 'progress' | 'ask'>('overview');
  const [journey, setJourney] = useState<JourneyData | null>(null);
  const [activeDemoId, setActiveDemoId] = useState<string | undefined>();
  const [analyzingProfile, setAnalyzingProfile] = useState<LearnerProfile | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isJudgeTourOpen, setIsJudgeTourOpen] = useState(false);
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);
  const [isAdapting, setIsAdapting] = useState(false);
  const [adaptiveNotification, setAdaptiveNotification] = useState<string | null>(null);

  // Load a demo profile instantly
  const handleSelectDemo = (demoId: string) => {
    const demo = getDemoProfileById(demoId);
    if (!demo) return;

    setActiveDemoId(demo.id);
    setJourney(demo.data);
    setView('journey');
    setJourneyTab('overview');
    setAdaptiveNotification(null);
  };

  // Submit profile to AI analysis
  const handleAnalyzeProfile = async (profile: LearnerProfile) => {
    setAnalyzingProfile(profile);
    setAnalysisError(null);
    setView('analyzing');

    try {
      const res = await fetch('/api/analyze-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const aiData = data.data;

      const newJourney: JourneyData = {
        profile,
        extractedCapabilities: aiData.extractedCapabilities || {
          demonstratedSkills: profile.manualSkills,
          experienceHighlights: [profile.experienceSummary],
          projects: [],
          qualifications: []
        },
        skillTwin: aiData.skillTwin || [],
        roadmap: aiData.roadmap || [],
        resources: aiData.resources || [],
        practiceProjects: aiData.practiceProjects || [],
        adaptiveHistory: [],
        createdAt: new Date().toISOString()
      };

      setJourney(newJourney);
      setActiveDemoId(undefined);
      // Wait for AnalysisLoader step animation to reach completion before switching view
    } catch (err: any) {
      console.error('Analysis failure:', err);
      setAnalysisError(
        err.message || "We couldn't complete the AI analysis. Please verify your connection or use a preloaded demo."
      );
    }
  };

  const handleAnalysisLoaderComplete = () => {
    if (journey && !analysisError) {
      setView('journey');
      setJourneyTab('overview');
    }
  };

  // Update activity status in roadmap
  const handleUpdateActivityStatus = (
    activityId: string,
    status: ActivityStatus,
    difficultyDetails?: { reason: string; details?: string }
  ) => {
    if (!journey) return;

    setJourney((prev) => {
      if (!prev) return prev;

      const updatedRoadmap = prev.roadmap.map((stage) => {
        const updatedWeeks = (stage.weeks || []).map((week) => {
          const updatedActivities = week.activities.map((act) => {
            if (act.id === activityId) {
              return {
                ...act,
                status,
                difficultyFeedback: difficultyDetails
                  ? {
                      reason: difficultyDetails.reason,
                      details: difficultyDetails.details,
                      timestamp: new Date().toISOString(),
                      reportedAt: Date.now()
                    }
                  : act.difficultyFeedback
              };
            }
            return act;
          });
          return { ...week, activities: updatedActivities };
        });
        return { ...stage, weeks: updatedWeeks };
      });

      return { ...prev, roadmap: updatedRoadmap };
    });
  };

  // Adaptive loop triggered when learner requests more practice
  const handleTriggerAdaptation = async (
    activity: WeeklyActivity,
    reason: string,
    details: string
  ) => {
    if (!journey) return;
    setIsAdapting(true);

    try {
      const res = await fetch('/api/adapt-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: journey.profile,
          currentRoadmap: journey.roadmap,
          struggleActivity: activity,
          struggleReason: reason,
          struggleDetails: details
        })
      });

      let insertedTasks: WeeklyActivity[] = [];
      let explanation = `Your plan changed because you identified ${activity.whatToLearn || activity.title} as a difficulty.`;
      let affectedSkill = activity.whatToLearn || 'Focus Skill';

      if (res.ok) {
        const data = await res.json();
        insertedTasks = data.insertedActivities || [];
        explanation = data.adaptationExplanation || explanation;
        affectedSkill = data.affectedSkill || affectedSkill;
      } else {
        // High quality offline fallback adaptation
        insertedTasks = [
          {
            id: 'adapt-scaffold-' + Date.now(),
            title: `Visual Walkthrough & Scaffold: ${activity.title}`,
            type: 'learn',
            whatToLearn: `Step-by-step visual dissection of ${activity.whatToLearn}`,
            whyItMatters: `Clears ambiguity around ${reason.toLowerCase()} before moving to advanced tasks`,
            whatToDo: [
              `Review 3 annotated step-by-step visual examples`,
              `Inspect common errors and troubleshooting edge cases`,
              `Self-test on 2 minimal sandbox exercises`
            ],
            expectedOutcome: `Demonstrated comprehension on micro-sandbox`,
            estimatedHours: '1.5 hrs',
            status: 'pending'
          },
          {
            id: 'adapt-drill-' + Date.now(),
            title: `Confidence Drill: Guided Micro-Practice`,
            type: 'practice',
            whatToLearn: `Hands-on guided practice with instant error hints`,
            whyItMatters: `Solidifies muscle memory with minimal cognitive strain`,
            whatToDo: [
              `Solve 2 guided questions with progressive hints`,
              `Re-run your previous exercise and verify output`
            ],
            expectedOutcome: `Successfully execute query without syntax flags`,
            estimatedHours: '1.5 hrs',
            status: 'pending'
          }
        ];
      }

      // Update journey state with inserted activities and mark week as adapted
      setJourney((prev) => {
        if (!prev) return prev;

        const updatedRoadmap = prev.roadmap.map((stage, sIdx) => {
          if (sIdx === 0) {
            const updatedWeeks = (stage.weeks || []).map((week, wIdx) => {
              if (wIdx === 0) {
                // Insert new activities after the struggle activity
                const newActivities: WeeklyActivity[] = [];
                for (const act of week.activities) {
                  newActivities.push(act);
                  if (act.id === activity.id) {
                    newActivities.push(...insertedTasks);
                  }
                }
                return {
                  ...week,
                  isAdapted: true,
                  adaptationNote: `Calibrated after difficulty with "${activity.title}". Added ${insertedTasks.length} scaffolding tasks.`,
                  activities: newActivities
                };
              }
              return week;
            });
            return { ...stage, weeks: updatedWeeks };
          }
          return stage;
        });

        const newHistoryItem = {
          id: 'adapt-' + Date.now(),
          timestamp: new Date().toISOString(),
          triggerActivityTitle: activity.title,
          reason: reason + (details ? `: "${details}"` : ''),
          whatChanged: explanation,
          affectedSkill,
          reportedReason: reason + (details ? `: "${details}"` : ''),
          changeSummary: explanation
        };

        return {
          ...prev,
          roadmap: updatedRoadmap,
          adaptiveHistory: [newHistoryItem, ...prev.adaptiveHistory]
        };
      });

      // Mark the struggle activity as need_practice
      handleUpdateActivityStatus(activity.id, 'need_practice', { reason, details });

      setAdaptiveNotification(
        `Journey updated: Your plan changed because you identified "${activity.title}" as a difficulty (${reason}). Scaffolding micro-activities have been inserted.`
      );
    } catch (err) {
      console.error('Adaptation failed:', err);
    } finally {
      setIsAdapting(false);
    }
  };

  // Judge tour step jump
  const handleJudgeTourStep = (stepNumber: number) => {
    if (!journey) {
      // Auto load Maya if no journey active
      handleSelectDemo('maya-da');
    }

    setView('journey');

    switch (stepNumber) {
      case 1:
        setJourneyTab('overview');
        break;
      case 2:
      case 3:
      case 4:
        setJourneyTab('skills');
        break;
      case 5:
      case 6:
      case 7:
        setJourneyTab('roadmap');
        break;
      case 8:
        setJourneyTab('ask');
        break;
      case 9:
        setJourneyTab('progress');
        break;
      default:
        setJourneyTab('overview');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={journeyTab}
        onSelectTab={setJourneyTab}
        journey={journey}
        onResetToLanding={() => {
          setView('landing');
          setJourneyTab('overview');
        }}
        onOpenDemoMenu={() => setIsDemoMenuOpen(true)}
        onStartJudgeTour={() => setIsJudgeTourOpen(true)}
        hasAdaptiveUpdate={Boolean(adaptiveNotification)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {view === 'landing' && (
          <LandingView
            onStartOnboarding={() => setView('onboarding')}
            onSelectDemo={handleSelectDemo}
          />
        )}

        {view === 'onboarding' && (
          <OnboardingView
            onAnalyze={handleAnalyzeProfile}
            onSelectDemo={handleSelectDemo}
            onCancel={() => setView('landing')}
            initialProfile={analyzingProfile}
          />
        )}

        {view === 'analyzing' && (
          <AnalysisLoader
            targetRole={analyzingProfile?.targetRole || 'Data Analyst'}
            error={analysisError}
            onComplete={handleAnalysisLoaderComplete}
            onRetry={() => {
              if (analyzingProfile) handleAnalyzeProfile(analyzingProfile);
            }}
            onUseFallbackDemo={() => handleSelectDemo('maya-da')}
          />
        )}

        {view === 'journey' && journey && (
          <div>
            {journeyTab === 'overview' && (
              <OverviewView
                journey={journey}
                onNavigateToTab={setJourneyTab}
              />
            )}

            {journeyTab === 'skills' && (
              <SkillTwinView
                journey={journey}
                onNavigateToRoadmap={() => setJourneyTab('roadmap')}
              />
            )}

            {journeyTab === 'roadmap' && (
              <RoadmapView
                journey={journey}
                onUpdateActivityStatus={handleUpdateActivityStatus}
                onTriggerAdaptation={handleTriggerAdaptation}
                isAdapting={isAdapting}
                adaptiveNotification={adaptiveNotification}
                onDismissNotification={() => setAdaptiveNotification(null)}
              />
            )}

            {journeyTab === 'progress' && (
              <ProgressView
                journey={journey}
                onNavigateToRoadmap={() => setJourneyTab('roadmap')}
                onNavigateToAskAI={() => setJourneyTab('ask')}
              />
            )}

            {journeyTab === 'ask' && (
              <AskJourneyView journey={journey} />
            )}
          </div>
        )}
      </main>

      {/* Judge Tour Modal */}
      <JudgeTourModal
        isOpen={isJudgeTourOpen}
        onClose={() => setIsJudgeTourOpen(false)}
        onJumpToStep={handleJudgeTourStep}
      />

      {/* Demo Selector Modal */}
      <DemoSelectorModal
        isOpen={isDemoMenuOpen}
        onClose={() => setIsDemoMenuOpen(false)}
        onSelectDemo={handleSelectDemo}
        currentDemoId={activeDemoId}
        onTriggerQuickAdaptation={() => {
          if (!journey) handleSelectDemo('maya-da');
          const firstAct = journey?.roadmap[0]?.weeks?.[0]?.activities[0];
          if (firstAct) {
            handleTriggerAdaptation(
              firstAct,
              "Need more practice",
              "1-Click Judge simulation: Simulated difficulty with multi-table JOINs."
            );
          }
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">EduPath</span>
            <span className="text-slate-300">•</span>
            <span>Adaptive Career Learning Navigator</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Server-side Gemini AI</span>
            <span>Zero-Cost Document Parser</span>
            <span>Client-side PDF Engine</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
