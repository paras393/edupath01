export type SkillState = 'strong' | 'developing' | 'gap';
export type SkillImportance = 'high' | 'medium' | 'low';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ExpandableReasoning {
  requiredForRole: string;
  evidenceSummary: string;
  roadmapStageUnlocked: string;
  priorityReason: string;
}

export interface SkillTwinItem {
  id: string;
  name: string;
  category: string;
  state: SkillState;
  importance: SkillImportance;
  evidence: string;
  whyStatus: string;
  whyMattersForRole: string;
  nextAction: string;
  reasoning: ExpandableReasoning;
}

export interface LearningResource {
  id: string;
  title: string;
  topic: string;
  level: ExperienceLevel;
  format: 'Interactive Practice' | 'Structured Course' | 'Official Guide' | 'Project Workshop' | 'Sandbox';
  isFree: boolean;
  whySelected: string;
  relatedSkill: string;
  url?: string;
}

export interface PracticeProject {
  skillName: string;
  practiceTask: {
    title: string;
    description: string;
    estimatedMinutes: number;
  };
  miniChallenge: {
    title: string;
    scenario: string;
    instructions: string[];
  };
  portfolioProject: {
    title: string;
    businessGoal: string;
    deliverables: string[];
    targetRoleContext: string;
  };
}

export type ActivityStatus = 'pending' | 'completed' | 'need_practice' | 'skipped';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export interface WeeklyActivity {
  id: string;
  title: string;
  type: 'learn' | 'practice' | 'build';
  whatToLearn: string;
  whyItMatters: string;
  whatToDo: string[];
  expectedOutcome: string;
  estimatedHours: string;
  status: ActivityStatus;
  difficultyFeedback?: {
    reason: string;
    details?: string;
    timestamp?: string | number;
    reportedAt?: number;
  };
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  focusSkill: string;
  activities: WeeklyActivity[];
  proofOfProgress: string;
  isAdapted?: boolean;
  adaptationNote?: string;
}

export interface RoadmapStage {
  id: string;
  stageNumber: number;
  name: string;
  status: 'locked' | 'in_progress' | 'completed';
  objective: string;
  targetSkills: string[];
  practiceSummary: string;
  projectMilestone: string;
  weeks: RoadmapWeek[];
}

export interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  type: string;
  extractedTextSnippet: string;
}

export interface LearnerProfile {
  name: string;
  targetRole: string;
  careerGoal: string;
  targetIndustry?: string;
  currentLevel: ExperienceLevel;
  manualSkills: string[];
  experienceSummary: string;
  uploadedDocuments: UploadedDoc[];
  extractedCapabilities?: {
    demonstratedSkills: string[];
    experienceHighlights: string[];
    projects: string[];
    qualifications: string[];
  };
}

export interface AdaptiveHistoryItem {
  id: string;
  timestamp: string | number;
  triggerActivityTitle?: string;
  reason?: string;
  whatChanged?: string;
  affectedSkill: string;
  reportedReason?: string;
  changeSummary?: string;
}

export interface JourneyData {
  profile: LearnerProfile;
  extractedCapabilities?: {
    demonstratedSkills: string[];
    experienceHighlights: string[];
    projects: string[];
    qualifications: string[];
  };
  skillTwin: SkillTwinItem[];
  roadmap: RoadmapStage[];
  adaptiveHistory: AdaptiveHistoryItem[];
  resources: LearningResource[];
  practiceProjects: PracticeProject[];
  createdAt: string | number;
  lastUpdated?: string | number;
  isDemo?: boolean;
}

export interface RoleKnowledge {
  role: string;
  tagline: string;
  coreSkills: {
    name: string;
    category: string;
    importance: SkillImportance;
    description: string;
  }[];
  supportingSkills: {
    name: string;
    category: string;
    importance: SkillImportance;
    description: string;
  }[];
  suggestedSequence: string[];
  sampleProjects: {
    title: string;
    description: string;
    keySkills: string[];
  }[];
  curatedResources: LearningResource[];
}
