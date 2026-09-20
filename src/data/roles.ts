import { RoleKnowledge } from '../types';

export const ROLE_KNOWLEDGE_BASE: Record<string, RoleKnowledge> = {
  'Data Analyst': {
    role: 'Data Analyst',
    tagline: 'Transform raw transactional data into actionable business intelligence & strategic decisions.',
    coreSkills: [
      { name: 'SQL Querying', category: 'Database & Data Extraction', importance: 'high', description: 'Complex JOINs, Window functions, aggregations, CTEs, and query optimization.' },
      { name: 'Data Visualization & BI', category: 'Analytics & Reporting', importance: 'high', description: 'Interactive dashboards using Power BI, Tableau, and executive reporting.' },
      { name: 'Business Statistics', category: 'Analytical Rigor', importance: 'high', description: 'Hypothesis testing, probability distributions, A/B test analysis, regression.' },
      { name: 'Spreadsheet Analysis', category: 'Core Analysis', importance: 'high', description: 'Advanced Excel/Sheets: nested formulas, INDEX/MATCH, Pivot tables, modeling.' },
      { name: 'Python for Data Analysis', category: 'Scripting & Automation', importance: 'medium', description: 'Data wrangling with Pandas, NumPy, and automated report pipelines.' }
    ],
    supportingSkills: [
      { name: 'Data Cleaning & ETL', category: 'Data Engineering', importance: 'high', description: 'Handling missing values, deduplication, schema normalization.' },
      { name: 'Storytelling with Data', category: 'Communication', importance: 'high', description: 'Synthesizing technical findings into clear stakeholder recommendations.' },
      { name: 'Git & Version Control', category: 'Workflow', importance: 'low', description: 'Tracking SQL queries and analysis scripts in version control.' }
    ],
    suggestedSequence: ['Spreadsheet Analysis', 'SQL Querying', 'Business Statistics', 'Data Visualization & BI', 'Data Cleaning & ETL', 'Python for Data Analysis'],
    sampleProjects: [
      {
        title: 'E-commerce Revenue Leakage Investigation',
        description: 'Analyze 500,000 retail transactions using SQL to diagnose cart abandonment drops and optimize margins.',
        keySkills: ['SQL Querying', 'Data Cleaning & ETL', 'Data Visualization & BI']
      },
      {
        title: 'Subscription Churn Cohort Dashboard',
        description: 'Calculate monthly retention cohorts in SQL and build an executive Power BI churn monitoring dashboard.',
        keySkills: ['Business Statistics', 'Data Visualization & BI', 'Storytelling with Data']
      }
    ],
    curatedResources: [
      {
        id: 'res-da-1',
        title: 'PostgreSQL Tutorial & Interactive Sandbox',
        topic: 'SQL Querying',
        level: 'Beginner',
        format: 'Interactive Practice',
        isFree: true,
        whySelected: 'Hands-on browser-based query runner with immediate syntax feedback.',
        relatedSkill: 'SQL Querying',
        url: 'https://www.postgresqltutorial.com/'
      },
      {
        id: 'res-da-2',
        title: 'Khan Academy: College Statistics and Probability',
        topic: 'Business Statistics',
        level: 'Intermediate',
        format: 'Structured Course',
        isFree: true,
        whySelected: 'Intuitive grounding in distributions, variance, and hypothesis testing without abstract math barriers.',
        relatedSkill: 'Business Statistics',
        url: 'https://www.khanacademy.org/math/statistics-probability'
      },
      {
        id: 'res-da-3',
        title: 'Power BI Guided Learning Path (Microsoft Learn)',
        topic: 'Data Visualization & BI',
        level: 'Intermediate',
        format: 'Official Guide',
        isFree: true,
        whySelected: 'Comprehensive official modules on star schemas, DAX measures, and visual report composition.',
        relatedSkill: 'Data Visualization & BI',
        url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi'
      },
      {
        id: 'res-da-4',
        title: 'Kaggle: Pandas & Data Cleaning Micro-Course',
        topic: 'Python for Data Analysis',
        level: 'Beginner',
        format: 'Interactive Practice',
        isFree: true,
        whySelected: 'Executable Jupyter notebooks analyzing real-world datasets with automated tests.',
        relatedSkill: 'Python for Data Analysis',
        url: 'https://www.kaggle.com/learn/pandas'
      }
    ]
  },

  'Frontend Developer': {
    role: 'Frontend Developer',
    tagline: 'Engineer accessible, high-performance, and responsive web user interfaces.',
    coreSkills: [
      { name: 'JavaScript & Modern ES6+', category: 'Programming', importance: 'high', description: 'Closures, asynchronous programming, Promises, event loops, DOM manipulation.' },
      { name: 'React & State Architecture', category: 'Frameworks', importance: 'high', description: 'Functional components, hooks, Context API, component lifecycle, rendering optimizations.' },
      { name: 'Responsive CSS & Tailwind', category: 'Styling', importance: 'high', description: 'Flexbox, CSS Grid, mobile-first design, modern utility design systems.' },
      { name: 'TypeScript', category: 'Type Safety', importance: 'high', description: 'Generics, interfaces, union types, type guards, compile-time safety.' }
    ],
    supportingSkills: [
      { name: 'Web Performance & Accessibility (a11y)', category: 'Quality', importance: 'high', description: 'Core Web Vitals, ARIA standards, semantic HTML, keyboard navigation.' },
      { name: 'REST & GraphQL API Integration', category: 'Networking', importance: 'medium', description: 'HTTP verbs, authentication headers, caching, error states.' },
      { name: 'Git & Collaboration Workflows', category: 'Tooling', importance: 'medium', description: 'Branching strategies, pull requests, resolving merge conflicts.' }
    ],
    suggestedSequence: ['Responsive CSS & Tailwind', 'JavaScript & Modern ES6+', 'TypeScript', 'React & State Architecture', 'REST & GraphQL API Integration', 'Web Performance & Accessibility (a11y)'],
    sampleProjects: [
      {
        title: 'Collaborative Kanban Task Workspace',
        description: 'Build a multi-column Kanban board featuring drag-and-drop, optimistic UI updates, and local state persistence.',
        keySkills: ['React & State Architecture', 'TypeScript', 'Responsive CSS & Tailwind']
      },
      {
        title: 'Accessible Financial Analytics Portal',
        description: 'Develop a WCAG 2.1 AA compliant client portal with accessible data tables, dark mode, and keyboard shortcuts.',
        keySkills: ['TypeScript', 'Web Performance & Accessibility (a11y)', 'REST & GraphQL API Integration']
      }
    ],
    curatedResources: [
      {
        id: 'res-fe-1',
        title: 'javascript.info - The Modern JavaScript Tutorial',
        topic: 'JavaScript & Modern ES6+',
        level: 'Beginner',
        format: 'Official Guide',
        isFree: true,
        whySelected: 'Industry-standard comprehensive guide explaining asynchronous execution and browser mechanisms.',
        relatedSkill: 'JavaScript & Modern ES6+',
        url: 'https://javascript.info/'
      },
      {
        id: 'res-fe-2',
        title: 'React Official Documentation & Interactive Playgrounds',
        topic: 'React & State Architecture',
        level: 'Intermediate',
        format: 'Interactive Practice',
        isFree: true,
        whySelected: 'Focuses on modern hooks, thinking in React, and avoiding unnecessary state effects.',
        relatedSkill: 'React & State Architecture',
        url: 'https://react.dev/'
      },
      {
        id: 'res-fe-3',
        title: 'Total TypeScript Core Essentials (Matt Pocock)',
        topic: 'TypeScript',
        level: 'Intermediate',
        format: 'Interactive Practice',
        isFree: true,
        whySelected: 'Interactive bite-sized exercises solving common real-world TypeScript errors.',
        relatedSkill: 'TypeScript',
        url: 'https://www.totaltypescript.com/tutorials'
      }
    ]
  },

  'UI/UX Designer': {
    role: 'UI/UX Designer',
    tagline: 'Craft human-centered digital experiences through research, wireframing, and design systems.',
    coreSkills: [
      { name: 'Figma & Design Systems', category: 'Design Tools', importance: 'high', description: 'Auto-layout, component variants, design tokens, responsive breakpoints.' },
      { name: 'User Research & Synthesis', category: 'UX Methodology', importance: 'high', description: 'User interviews, journey mapping, persona building, usability testing.' },
      { name: 'Information Architecture & Wireframing', category: 'UX Architecture', importance: 'high', description: 'Sitemaps, user flow diagrams, low-fidelity wireframes, heuristic evaluation.' },
      { name: 'Visual Hierarchy & Typography', category: 'Visual Design', importance: 'high', description: 'Type scales, grid systems, optical balance, WCAG contrast compliance.' }
    ],
    supportingSkills: [
      { name: 'Interactive Prototyping', category: 'Interaction Design', importance: 'high', description: 'Smart animate, micro-interactions, state transitions, interactive mockups.' },
      { name: 'Design-to-Code Handoff', category: 'Cross-functional', importance: 'medium', description: 'CSS box model fundamentals, spec annotation, engineer collaboration.' }
    ],
    suggestedSequence: ['Visual Hierarchy & Typography', 'Information Architecture & Wireframing', 'Figma & Design Systems', 'User Research & Synthesis', 'Interactive Prototyping', 'Design-to-Code Handoff'],
    sampleProjects: [
      {
        title: 'Healthcare Patient Appointment Redesign',
        description: 'Conduct user discovery and redesign a confusing mobile clinic scheduling flow to reduce drop-off by 40%.',
        keySkills: ['User Research & Synthesis', 'Information Architecture & Wireframing', 'Figma & Design Systems']
      },
      {
        title: 'Multi-brand SaaS Design System',
        description: 'Architect a 40-component design system tokenized for rapid light and dark theme adaptation.',
        keySkills: ['Figma & Design Systems', 'Visual Hierarchy & Typography', 'Design-to-Code Handoff']
      }
    ],
    curatedResources: [
      {
        id: 'res-ux-1',
        title: 'Laws of UX (Jon Yablonski)',
        topic: 'Information Architecture & Wireframing',
        level: 'Beginner',
        format: 'Official Guide',
        isFree: true,
        whySelected: 'Visual collection of key psychological maxims underlying intuitive user interface design.',
        relatedSkill: 'Information Architecture & Wireframing',
        url: 'https://lawsofux.com/'
      },
      {
        id: 'res-ux-2',
        title: 'Figma Community Design System Best Practices',
        topic: 'Figma & Design Systems',
        level: 'Intermediate',
        format: 'Project Workshop',
        isFree: true,
        whySelected: 'Inspect open-source production design systems like Polaris and Material 3.',
        relatedSkill: 'Figma & Design Systems',
        url: 'https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-design-systems-in-Figma'
      }
    ]
  },

  'Product Manager': {
    role: 'Product Manager',
    tagline: 'Align business, engineering, and user needs to discover, define, and ship high-impact products.',
    coreSkills: [
      { name: 'Product Discovery & Problem Framing', category: 'Strategy', importance: 'high', description: 'Customer interviews, JTBD (Jobs To Be Done), opportunity solution trees.' },
      { name: 'Product Metrics & OKRs', category: 'Analytics', importance: 'high', description: 'North Star metrics, funnel retention, leading vs lagging indicators, unit economics.' },
      { name: 'Roadmap Prioritization & PRDs', category: 'Execution', importance: 'high', description: 'RICE scoring, MoSCoW framework, writing precise Product Requirement Documents.' },
      { name: 'Agile Delivery & Scrum', category: 'Execution', importance: 'medium', description: 'Sprint planning, user stories with acceptance criteria, backlog grooming.' }
    ],
    supportingSkills: [
      { name: 'Market & Competitive Analysis', category: 'Strategy', importance: 'medium', description: 'TAM calculation, competitive positioning matrix, differentiation strategy.' },
      { name: 'Technical Literacy for PMs', category: 'Cross-functional', importance: 'medium', description: 'APIs, system architecture basics, database structures, trade-offs.' }
    ],
    suggestedSequence: ['Product Discovery & Problem Framing', 'Roadmap Prioritization & PRDs', 'Product Metrics & OKRs', 'Agile Delivery & Scrum', 'Technical Literacy for PMs'],
    sampleProjects: [
      {
        title: 'B2B SaaS Onboarding Conversion PRD',
        description: 'Analyze telemetry drop-offs, frame user friction, and write an engineer-ready PRD for a simplified setup wizard.',
        keySkills: ['Product Discovery & Problem Framing', 'Product Metrics & OKRs', 'Roadmap Prioritization & PRDs']
      }
    ],
    curatedResources: [
      {
        id: 'res-pm-1',
        title: 'Product School: Ultimate Guide to PRDs',
        topic: 'Roadmap Prioritization & PRDs',
        level: 'Beginner',
        format: 'Official Guide',
        isFree: true,
        whySelected: 'Clear template models used by tech leads and product directors at top companies.',
        relatedSkill: 'Roadmap Prioritization & PRDs',
        url: 'https://productschool.com/blog/product-strategy/prd-template'
      }
    ]
  },

  'Digital Marketer': {
    role: 'Digital Marketer',
    tagline: 'Drive customer acquisition, retention, and brand growth across multi-channel digital funnels.',
    coreSkills: [
      { name: 'Search Engine Optimization (SEO)', category: 'Organic Growth', importance: 'high', description: 'Technical audits, keyword research, on-page optimization, backlink strategies.' },
      { name: 'Paid Ads & PPC (Google & Meta)', category: 'Performance Marketing', importance: 'high', description: 'Campaign structures, ROAS optimization, pixel tracking, audience targeting.' },
      { name: 'Marketing Analytics (GA4)', category: 'Analytics', importance: 'high', description: 'Attribution modeling, custom event tracking, UTM parameters, conversion funnels.' },
      { name: 'Email Marketing & Automation', category: 'Retention', importance: 'medium', description: 'Drip campaigns, list segmentation, deliverability, A/B subject line tests.' }
    ],
    supportingSkills: [
      { name: 'Copywriting & Content Strategy', category: 'Creative', importance: 'high', description: 'Conversion copy, content clusters, value proposition clarity.' },
      { name: 'Conversion Rate Optimization (CRO)', category: 'Optimization', importance: 'medium', description: 'Landing page heatmaps, multivariate testing, form friction reduction.' }
    ],
    suggestedSequence: ['Copywriting & Content Strategy', 'Search Engine Optimization (SEO)', 'Marketing Analytics (GA4)', 'Paid Ads & PPC (Google & Meta)', 'Email Marketing & Automation'],
    sampleProjects: [
      {
        title: 'E-commerce Organic Acquisition Blueprint',
        description: 'Perform a comprehensive technical SEO audit and architect a 6-month topical content cluster strategy.',
        keySkills: ['Search Engine Optimization (SEO)', 'Marketing Analytics (GA4)', 'Copywriting & Content Strategy']
      }
    ],
    curatedResources: [
      {
        id: 'res-dm-1',
        title: 'Google Analytics 4 Certification Course (Skillshop)',
        topic: 'Marketing Analytics (GA4)',
        level: 'Intermediate',
        format: 'Structured Course',
        isFree: true,
        whySelected: 'Direct accreditation on tracking conversions and custom exploratory reports.',
        relatedSkill: 'Marketing Analytics (GA4)',
        url: 'https://skillshop.exceedlms.com/student/path/18330-google-analytics-certification'
      }
    ]
  },

  'Business Analyst': {
    role: 'Business Analyst',
    tagline: 'Bridge operational business challenges with technical systems and optimized processes.',
    coreSkills: [
      { name: 'Business Process Modeling (BPMN)', category: 'Process Design', importance: 'high', description: 'Current-state vs future-state workflow diagrams, swimlane maps, bottleneck identification.' },
      { name: 'Requirements Engineering & User Stories', category: 'Requirements', importance: 'high', description: 'BRDs, functional vs non-functional requirements, acceptance criteria, traceability matrix.' },
      { name: 'SQL for Business Analytics', category: 'Data Analysis', importance: 'high', description: 'Extracting operational datasets, validating data migration rules, KPI audits.' },
      { name: 'Stakeholder Management & Facilitation', category: 'Communication', importance: 'high', description: 'Requirements elicitation workshops, conflict resolution, executive presentations.' }
    ],
    supportingSkills: [
      { name: 'Gap Analysis & Feasibility Study', category: 'Strategy', importance: 'high', description: 'Cost-benefit analyses, ROI projections, regulatory constraint mapping.' },
      { name: 'Data Visualization & Reporting', category: 'Reporting', importance: 'medium', description: 'Executive summary dashboards, KPI variance trackers.' }
    ],
    suggestedSequence: ['Business Process Modeling (BPMN)', 'Requirements Engineering & User Stories', 'SQL for Business Analytics', 'Gap Analysis & Feasibility Study', 'Stakeholder Management & Facilitation'],
    sampleProjects: [
      {
        title: 'Loan Approval Process Re-engineering',
        description: 'Map existing 14-step paper workflow, identify 3 critical bottlenecks, and specify digitized automated approval requirements.',
        keySkills: ['Business Process Modeling (BPMN)', 'Requirements Engineering & User Stories', 'Gap Analysis & Feasibility Study']
      }
    ],
    curatedResources: [
      {
        id: 'res-ba-1',
        title: 'BPMN 2.0 Poster & Interactive Modeling Primer',
        topic: 'Business Process Modeling (BPMN)',
        level: 'Beginner',
        format: 'Official Guide',
        isFree: true,
        whySelected: 'Visual reference of all gateway, event, and activity symbols standardized by OMG.',
        relatedSkill: 'Business Process Modeling (BPMN)',
        url: 'https://www.bpmn.org/'
      }
    ]
  }
};
