import { JourneyData, LearnerProfile } from '../types';

export interface DemoProfileOption {
  id: string;
  name: string;
  badge: string;
  targetRole: string;
  currentTitle: string;
  summary: string;
  highlightDifference?: string;
  data: JourneyData;
}

export const DEMO_PROFILES: DemoProfileOption[] = [
  {
    id: 'maya-da',
    name: 'Maya Chen',
    badge: 'Marketing → Data Analyst',
    targetRole: 'Data Analyst',
    currentTitle: 'Growth Marketing Specialist',
    summary: 'Strong spreadsheet modeling and data storytelling from marketing campaigns; zero SQL or relational database background.',
    highlightDifference: 'Contrasted with Python background: Maya starts with SQL fundamentals and relational schemas first.',
    data: {
      profile: {
        name: 'Maya Chen',
        targetRole: 'Data Analyst',
        careerGoal: 'Transition from growth marketing to a dedicated Business Intelligence & Product Data Analyst role at a tech company.',
        targetIndustry: 'B2B SaaS / E-commerce',
        currentLevel: 'Intermediate',
        manualSkills: ['Advanced Excel', 'Google Analytics 4', 'A/B Testing Basics', 'Data Storytelling'],
        experienceSummary: '3 years in digital marketing analyzing campaign performance, managing budgets in Excel, running multivariate ad tests, and presenting monthly executive reports.',
        uploadedDocuments: [
          {
            id: 'doc-1',
            name: 'Maya_Chen_Resume_2026.pdf',
            size: 142000,
            type: 'application/pdf',
            extractedTextSnippet: 'Growth Marketing Specialist at MetricFlow (2023-Present): Built financial models in Excel with INDEX/MATCH and nested IFs to project CAC and LTV across 6 acquisition channels. Analyzed GA4 event funnels. Prepared quarterly board slide decks with charts.'
          },
          {
            id: 'doc-2',
            name: 'Campaign_Analysis_Portfolio.txt',
            size: 18400,
            type: 'text/plain',
            extractedTextSnippet: 'Portfolio: Evaluated $450k quarterly ad budget. Synthesized performance metrics across paid channels. Identified 18% churn increase in Q3 using pivot tables.'
          }
        ],
        extractedCapabilities: {
          demonstratedSkills: ['Spreadsheet Analysis', 'Data Storytelling', 'Marketing Analytics'],
          experienceHighlights: ['Built financial attribution models in Excel', 'Conducted GA4 conversion funnel drop-off audits', 'Presented monthly performance reviews to C-level executives'],
          projects: ['MetricFlow Multi-touch CAC Optimizer', 'Q3 Ad Spend Reallocation Framework'],
          qualifications: ['B.S. in Communications & Business minor', 'Google Analytics Individual Qualification (GAIQ)']
        }
      },
      skillTwin: [
        {
          id: 'sk-da-sql',
          name: 'SQL Querying',
          category: 'Database & Data Extraction',
          state: 'gap',
          importance: 'high',
          evidence: 'No SQL queries, database schemas, or relational data extraction found in uploaded resume or portfolio.',
          whyStatus: 'Critical gap: Enterprise data analyst positions require direct SQL database querying for data warehouse extraction.',
          whyMattersForRole: 'Primary tool to extract, filter, join, and aggregate raw transactional tables without relying on engineering.',
          nextAction: 'Complete Module 1: Relational Schemas, SELECT queries, WHERE filters, and multi-table INNER/LEFT JOINs.',
          reasoning: {
            requiredForRole: 'Mandatory prerequisite for 92% of enterprise Data Analyst job descriptions.',
            evidenceSummary: 'Profile confirms extensive spreadsheet usage but zero relational query syntax.',
            roadmapStageUnlocked: 'Unlocks Stage 2 (Advanced Analytical Querying & Cohort Analysis).',
            priorityReason: 'Identified as highest-impact bottleneck before BI dashboarding can begin.'
          }
        },
        {
          id: 'sk-da-excel',
          name: 'Spreadsheet Analysis',
          category: 'Core Analysis',
          state: 'strong',
          importance: 'high',
          evidence: 'Resume details 3 years of building complex financial attribution models using INDEX/MATCH, nested formulas, and dynamic pivot tables.',
          whyStatus: 'Demonstrated mastery in business spreadsheet mechanics and iterative tabular exploration.',
          whyMattersForRole: 'Provides strong analytical intuition for calculating margins, variance, and quick ad-hoc validations.',
          nextAction: 'Bridge spreadsheet logic (e.g. VLOOKUP, SUMIFS) into SQL equivalents (JOIN, GROUP BY, SUM CASE).',
          reasoning: {
            requiredForRole: 'Foundational baseline for quick data checks and stakeholder business models.',
            evidenceSummary: 'Extensive documented proof in MetricFlow financial models.',
            roadmapStageUnlocked: 'Allows fast-tracking spreadsheet phases directly into database query engineering.',
            priorityReason: 'Leveraged as cognitive anchor to accelerate relational database learning.'
          }
        },
        {
          id: 'sk-da-stats',
          name: 'Business Statistics',
          category: 'Analytical Rigor',
          state: 'developing',
          importance: 'high',
          evidence: 'Mentioned A/B testing basics and campaign significance, but lacks documented formal statistical tests, variance analysis, or regression.',
          whyStatus: 'Developing: intuitive exposure to metric comparisons, but missing formal statistical validation methodology.',
          whyMattersForRole: 'Essential for validating whether metric lifts are statistically significant or random variance.',
          nextAction: 'Study hypothesis testing (p-values, confidence intervals, sample size power calculations).',
          reasoning: {
            requiredForRole: 'Prevents misleading business recommendations from underpowered sample sizes.',
            evidenceSummary: 'A/B test mention in marketing without statistical formulas.',
            roadmapStageUnlocked: 'Unlocks Stage 3 (Causal Inference and Experimentation Analysis).',
            priorityReason: 'Pairs with SQL to evaluate business initiatives accurately.'
          }
        },
        {
          id: 'sk-da-bi',
          name: 'Data Visualization & BI',
          category: 'Analytics & Reporting',
          state: 'developing',
          importance: 'high',
          evidence: 'Created executive presentation charts and GA4 dashboards; no Power BI, Tableau, or semantic data modeling detected.',
          whyStatus: 'Developing: good visual presentation instincts, but lacks enterprise BI tool proficiency and semantic modeling.',
          whyMattersForRole: 'Standard medium for delivering self-service business reporting to cross-functional stakeholders.',
          nextAction: 'Build a Power BI dashboard connecting directly to a PostgreSQL database with DAX calculated measures.',
          reasoning: {
            requiredForRole: 'Core deliverable format for executive reporting across departments.',
            evidenceSummary: 'Slide deck charts demonstrated; dedicated BI tool evidence absent.',
            roadmapStageUnlocked: 'Unlocks Stage 4 (Enterprise BI & Executive Reporting).',
            priorityReason: 'Turns SQL queries into digestible automated monitoring tools.'
          }
        },
        {
          id: 'sk-da-python',
          name: 'Python for Data Analysis',
          category: 'Scripting & Automation',
          state: 'gap',
          importance: 'medium',
          evidence: 'No programming scripts, Python code, or Jupyter notebooks detected in profile.',
          whyStatus: 'Gap: No programming foundation detected.',
          whyMattersForRole: 'Valuable for automating data pipelines, complex statistical modeling, and large dataset handling.',
          nextAction: 'Defer until SQL and BI are solidified; start with Pandas basics in Stage 5.',
          reasoning: {
            requiredForRole: 'Secondary to SQL for entry-to-mid analyst roles; vital for senior scale.',
            evidenceSummary: 'No programming artifacts found.',
            roadmapStageUnlocked: 'Stage 5 (Automation & Advanced Scripting).',
            priorityReason: 'Lower immediate priority than SQL and Power BI.'
          }
        },
        {
          id: 'sk-da-story',
          name: 'Storytelling with Data',
          category: 'Communication',
          state: 'strong',
          importance: 'high',
          evidence: 'Documented history of presenting monthly performance reviews to C-level executives and translating metrics into business decisions.',
          whyStatus: 'Strong: Exceptional cross-functional stakeholder communication already proven.',
          whyMattersForRole: 'Differentiates great analysts from query runners; ensures recommendations are adopted.',
          nextAction: 'Maintain this strength when framing technical SQL project writeups.',
          reasoning: {
            requiredForRole: 'Crucial for driving tangible business action from analytical insights.',
            evidenceSummary: 'Direct executive presentations verified at MetricFlow.',
            roadmapStageUnlocked: 'Enhances portfolio presentation and behavioral interview readiness.',
            priorityReason: 'Major competitive advantage in interview loops.'
          }
        }
      ],
      roadmap: [
        {
          id: 'stage-1',
          stageNumber: 1,
          name: 'Relational Database & SQL Foundation',
          status: 'in_progress',
          objective: 'Master relational schema logic, SELECT querying, filtering, multi-table JOINs, and aggregations using real transactional datasets.',
          targetSkills: ['SQL Querying', 'Data Cleaning & ETL'],
          practiceSummary: 'Write 40+ progressively challenging SQL queries against retail order and customer schemas.',
          projectMilestone: 'E-commerce Revenue & Customer Acquisition SQL Audit',
          weeks: [
            {
              weekNumber: 1,
              title: 'SQL Fundamentals & Single-Table Querying',
              focusSkill: 'SQL Querying',
              proofOfProgress: 'Write queries filtering orders, aggregating sales by product category, and summarizing monthly revenue metrics.',
              activities: [
                {
                  id: 'act-1-1',
                  title: 'Relational Data Concepts & SELECT Statements',
                  type: 'learn',
                  whatToLearn: 'Tables, primary keys, foreign keys, SELECT, WHERE, ORDER BY, and LIMIT.',
                  whyItMatters: 'Forms the foundational mental model for how structured business databases store transactions.',
                  whatToDo: [
                    'Review table entity relationships in an online PostgreSQL sandbox',
                    'Execute 10 basic filtering queries using comparison operators and boolean logic',
                    'Format and alias query results for clean readability'
                  ],
                  expectedOutcome: 'Confidently extract specific subsets of rows and clean calculated columns.',
                  estimatedHours: '3.5 hrs',
                  status: 'completed'
                },
                {
                  id: 'act-1-2',
                  title: 'GROUP BY & Aggregations (COUNT, SUM, AVG)',
                  type: 'practice',
                  whatToLearn: 'Aggregating tabular data, HAVING clauses, and handling NULL values in sums.',
                  whyItMatters: 'Translates raw purchase rows into business summary metrics like Total Revenue and Average Order Value.',
                  whatToDo: [
                    'Group sales data by customer country and order status',
                    'Calculate total sales and average basket sizes per marketing channel',
                    'Filter aggregated results using HAVING to identify high-volume accounts'
                  ],
                  expectedOutcome: 'Reproduce familiar Excel Pivot Table summaries directly inside SQL.',
                  estimatedHours: '4 hrs',
                  status: 'completed'
                },
                {
                  id: 'act-1-3',
                  title: 'Multi-Table Relational JOINs (INNER, LEFT, RIGHT)',
                  type: 'practice',
                  whatToLearn: 'Relational algebra, primary-foreign key matching, INNER vs LEFT JOIN semantics, handling orphaned records.',
                  whyItMatters: 'Real business data is normalized across dozens of tables; JOINs connect customers to orders and payments.',
                  whatToDo: [
                    'Construct an INNER JOIN linking customers to their completed orders',
                    'Use a LEFT JOIN to find registered users who have never placed an order',
                    'Debug common cartesian product errors from duplicate joining keys'
                  ],
                  expectedOutcome: 'Extract unified analytical records across multiple normalized database tables.',
                  estimatedHours: '5 hrs',
                  status: 'need_practice',
                  difficultyFeedback: {
                    reason: "Need more practice",
                    details: "Confused about when to use LEFT JOIN vs INNER JOIN when tables contain NULL customer IDs.",
                    timestamp: "2026-09-19T02:15:00Z"
                  }
                },
                {
                  id: 'act-1-adapt-1',
                  title: 'Interactive Visual Guide to SQL JOINs & NULL Handling',
                  type: 'learn',
                  whatToLearn: 'Visual Venn diagram comparison of INNER vs LEFT JOIN with concrete before/after table states and NULL preservation rules.',
                  whyItMatters: 'Addresses your identified difficulty with orphaned rows and NULL customer IDs.',
                  whatToDo: [
                    'Inspect the interactive visual breakdown of matched vs unmatched rows',
                    'Practice 5 targeted micro-exercises resolving NULL foreign key join traps',
                    'Compare query execution plans for LEFT vs INNER joins'
                  ],
                  expectedOutcome: 'Clear mental clarity on why rows disappear in INNER JOINs vs persist with NULLs in LEFT JOINs.',
                  estimatedHours: '2 hrs',
                  status: 'pending'
                },
                {
                  id: 'act-1-adapt-2',
                  title: 'Orphaned Customer Order Investigation Challenge',
                  type: 'practice',
                  whatToLearn: 'Hands-on practice finding missing records using LEFT JOIN ... WHERE right_table.id IS NULL.',
                  whyItMatters: 'Reinforces the exact pattern where your previous confusion occurred.',
                  whatToDo: [
                    'Load mock e-commerce database with intentional orphaned transaction records',
                    'Write query pinpointing users who abandoned carts without completed invoices',
                    'Validate counts against raw table row counts'
                  ],
                  expectedOutcome: 'Zero hesitation choosing between INNER and LEFT JOINs in practical scenarios.',
                  estimatedHours: '2.5 hrs',
                  status: 'pending'
                }
              ],
              isAdapted: true,
              adaptationNote: 'Plan adapted dynamically: Inserted 2 targeted micro-practice tasks on SQL JOINs and NULL handling based on your reported difficulty.'
            },
            {
              weekNumber: 2,
              title: 'Subqueries & Common Table Expressions (CTEs)',
              focusSkill: 'SQL Querying',
              proofOfProgress: 'Refactor complex nested queries into readable WITH clause CTEs for multi-step cohort calculations.',
              activities: [
                {
                  id: 'act-1-4',
                  title: 'Common Table Expressions (WITH clause)',
                  type: 'learn',
                  whatToLearn: 'Structuring multi-step queries cleanly using CTEs instead of deep subqueries.',
                  whyItMatters: 'Makes complex analytical logic readable, modular, and easy to maintain.',
                  whatToDo: ['Write a 2-stage CTE isolating first-time buyer dates then measuring 30-day repeat purchases'],
                  expectedOutcome: 'Master clean SQL architecture for real analytical workflows.',
                  estimatedHours: '3.5 hrs',
                  status: 'pending'
                }
              ]
            }
          ]
        },
        {
          id: 'stage-2',
          stageNumber: 2,
          name: 'Advanced Analytical SQL & Window Functions',
          status: 'locked',
          objective: 'Calculate running totals, customer rankings, month-over-month growth, and retention cohorts with SQL Window Functions.',
          targetSkills: ['SQL Querying', 'Business Statistics'],
          practiceSummary: 'Master OVER(PARTITION BY ... ORDER BY), ROW_NUMBER, LAG, and LEAD functions.',
          projectMilestone: 'SaaS Churn & Cohort Retention Analysis',
          weeks: []
        },
        {
          id: 'stage-3',
          stageNumber: 3,
          name: 'Business Statistics & Experimentation Rigor',
          status: 'locked',
          objective: 'Learn hypothesis testing, confidence intervals, sample size determination, and A/B test analysis.',
          targetSkills: ['Business Statistics'],
          practiceSummary: 'Analyze 5 historical marketing A/B tests to calculate p-values and evaluate statistical significance.',
          projectMilestone: 'Product Feature A/B Test Statistical Evaluation Report',
          weeks: []
        },
        {
          id: 'stage-4',
          stageNumber: 4,
          name: 'Enterprise BI & Dashboard Architecture',
          status: 'locked',
          objective: 'Connect SQL views to Power BI, model star schemas, create DAX measures, and publish executive monitoring dashboards.',
          targetSkills: ['Data Visualization & BI', 'Storytelling with Data'],
          practiceSummary: 'Model a dimensional star schema with fact and dimension tables.',
          projectMilestone: 'Executive Business Operations KPI Control Center',
          weeks: []
        },
        {
          id: 'stage-5',
          stageNumber: 5,
          name: 'Portfolio Projects & Technical Interview Readiness',
          status: 'locked',
          objective: 'Publish 2 comprehensive GitHub/Notion portfolio projects and practice live SQL technical screening challenges.',
          targetSkills: ['Data Storytelling', 'SQL Querying', 'Data Visualization & BI'],
          practiceSummary: 'Complete 15 LeetCode-style SQL medium interview questions.',
          projectMilestone: 'End-to-End Analytics Case Study with Public Presentation',
          weeks: []
        }
      ],
      adaptiveHistory: [
        {
          id: 'adapt-1',
          timestamp: '2026-09-19T02:16:00Z',
          triggerActivityTitle: 'Multi-Table Relational JOINs (INNER, LEFT, RIGHT)',
          reason: "Need more practice: Confused about when to use LEFT JOIN vs INNER JOIN with NULL customer IDs",
          whatChanged: 'Inserted Visual Explanation and Orphaned Customer Order Investigation practice challenge into Week 1.',
          affectedSkill: 'SQL Querying'
        }
      ],
      resources: [
        {
          id: 'res-1',
          title: 'PostgreSQL Tutorial: Joins Deep Dive',
          topic: 'SQL Querying',
          level: 'Beginner',
          format: 'Interactive Practice',
          isFree: true,
          whySelected: 'Targeted interactive examples of INNER, LEFT, and FULL OUTER joins with instant schema visualization.',
          relatedSkill: 'SQL Querying',
          url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/'
        },
        {
          id: 'res-2',
          title: 'Mode Analytics: Advanced SQL Window Functions Tutorial',
          topic: 'SQL Querying',
          level: 'Intermediate',
          format: 'Interactive Practice',
          isFree: true,
          whySelected: 'Real SQL query editor loaded with real San Francisco crime and company investment data.',
          relatedSkill: 'SQL Querying',
          url: 'https://mode.com/sql-tutorial/sql-window-functions/'
        },
        {
          id: 'res-3',
          title: 'Khan Academy: College Statistics and Probability',
          topic: 'Business Statistics',
          level: 'Intermediate',
          format: 'Structured Course',
          isFree: true,
          whySelected: 'Fills the statistical hypothesis testing gap identified in your profile.',
          relatedSkill: 'Business Statistics',
          url: 'https://www.khanacademy.org/math/statistics-probability'
        }
      ],
      practiceProjects: [
        {
          skillName: 'SQL Querying',
          practiceTask: {
            title: 'Top 5 Customer Orders Query',
            description: 'Write a query to calculate the lifetime spend of the top 5 customers who registered in 2025 using GROUP BY and ORDER BY.',
            estimatedMinutes: 25
          },
          miniChallenge: {
            title: 'Customer Churn Identification Query',
            scenario: 'The marketing VP noticed sales dropped 12% last month. Write a query comparing customer active orders between the last two quarters.',
            instructions: [
              'Use a LEFT JOIN between customer accounts and order records for Q3 and Q4',
              'Filter for customers with zero orders in Q4 who had at least 2 orders in Q3',
              'Calculate the average lost revenue per churned customer'
            ]
          },
          portfolioProject: {
            title: 'E-commerce Revenue Leakage Investigation',
            businessGoal: 'Uncover why a $12M retail store is losing 14% of checkout attempts by querying 450k database logs.',
            deliverables: [
              'Clean SQL script with CTEs diagnosing payment gateway failure rates',
              'Cohort retention breakdown by acquisition channel',
              'Executive 2-page brief with 3 prioritized engineering fixes'
            ],
            targetRoleContext: 'Tailored for Data Analyst roles evaluating real-world business acumen alongside SQL proficiency.'
          }
        }
      ],
      createdAt: '2026-09-19T01:00:00Z',
      lastUpdated: '2026-09-19T02:16:00Z',
      isDemo: true
    }
  },

  {
    id: 'david-da',
    name: 'David Patel',
    badge: 'Research / Python → Data Analyst',
    targetRole: 'Data Analyst',
    currentTitle: 'Academic Research Assistant',
    summary: 'Strong Python, Pandas, and academic statistics; completely unfamiliar with SQL, relational enterprise warehouses, or business BI tools.',
    highlightDifference: 'Contrasted with Maya: David skips Python and statistics foundations and dives directly into enterprise SQL and Power BI modeling.',
    data: {
      profile: {
        name: 'David Patel',
        targetRole: 'Data Analyst',
        careerGoal: 'Transition from academic laboratory data processing to a commercial Data Analyst role in FinTech.',
        targetIndustry: 'Financial Technology / Banking',
        currentLevel: 'Intermediate',
        manualSkills: ['Python (Pandas, NumPy)', 'Inferential Statistics', 'Hypothesis Testing', 'Jupyter Notebooks'],
        experienceSummary: '2 years conducting university research processing sensor logs with Python scripts, performing ANOVA and regression analyses in Jupyter, and cleaning CSV exports.',
        uploadedDocuments: [
          {
            id: 'doc-d1',
            name: 'David_Patel_CV.pdf',
            size: 135000,
            type: 'application/pdf',
            extractedTextSnippet: 'Graduate Research Assistant: Processed 4M sensor telemetry records using Python Pandas. Executed multivariate regression and ANOVA tests. Cleaned messy CSV data. Authored peer-reviewed paper in statistical ecology.'
          }
        ],
        extractedCapabilities: {
          demonstratedSkills: ['Python for Data Analysis', 'Business Statistics', 'Data Cleaning & ETL'],
          experienceHighlights: ['Analyzed 4M rows with Python Pandas', 'Conducted multivariate statistical regression', 'Published peer-reviewed methodology'],
          projects: ['Sensor Telemetry Anomaly Detector', 'Multivariate Ecological Regression Model'],
          qualifications: ['B.S. in Applied Mathematics', 'Published Research Author']
        }
      },
      skillTwin: [
        {
          id: 'sk-d-sql',
          name: 'SQL Querying',
          category: 'Database & Data Extraction',
          state: 'gap',
          importance: 'high',
          evidence: 'No relational database or SQL experience detected. All historical processing was performed on static flat CSV files via Python.',
          whyStatus: 'Critical gap: Enterprise data is stored in relational data warehouses (Snowflake, BigQuery, Postgres), not flat CSVs.',
          whyMattersForRole: 'Must query warehouse data at scale before importing subsets into Python.',
          nextAction: 'Start with SQL Querying: translation from Pandas `.merge()` and `.groupby()` to SQL JOINs and GROUP BY.',
          reasoning: {
            requiredForRole: 'Fundamental requirement for pulling production database data.',
            evidenceSummary: 'Only flat file CSV scripts in Python discovered.',
            roadmapStageUnlocked: 'Unlocks direct database connectivity for reporting.',
            priorityReason: 'Core hurdle preventing commercial data analyst employment.'
          }
        },
        {
          id: 'sk-d-python',
          name: 'Python for Data Analysis',
          category: 'Scripting & Automation',
          state: 'strong',
          importance: 'high',
          evidence: 'Demonstrated deep mastery of Pandas, NumPy, array manipulation, and automated CSV transformation pipelines.',
          whyStatus: 'Strong: Exceptional scripting background exceeding standard analyst requirements.',
          whyMattersForRole: 'Powerful accelerator for advanced ETL, automation, and machine learning.',
          nextAction: 'Leverage Python strength by connecting `psycopg2` or `SQLAlchemy` directly to SQL databases.',
          reasoning: {
            requiredForRole: 'High-value differentiator for mid-to-senior analyst positions.',
            evidenceSummary: 'Verified 4M row sensor pipeline and publication.',
            roadmapStageUnlocked: 'Allows skipping beginner Python modules completely.',
            priorityReason: 'Capitalize on this as a standout superpower in portfolio projects.'
          }
        },
        {
          id: 'sk-d-stats',
          name: 'Business Statistics',
          category: 'Analytical Rigor',
          state: 'strong',
          importance: 'high',
          evidence: 'Documented formal university regression analysis, ANOVA tests, confidence intervals, and hypothesis testing.',
          whyStatus: 'Strong: Mathematical foundation is already rock-solid.',
          whyMattersForRole: 'Guarantees reliable analytical conclusions for business experimentation.',
          nextAction: 'Reframe academic statistical nomenclature into corporate KPIs (e.g. churn lift, conversion p-values).',
          reasoning: {
            requiredForRole: 'Ensures rigorous A/B test interpretation.',
            evidenceSummary: 'Direct academic background in applied statistics.',
            roadmapStageUnlocked: 'Skips introductory statistics; moves straight to commercial metrics.',
            priorityReason: 'Saves 4-6 weeks of curriculum time.'
          }
        },
        {
          id: 'sk-d-bi',
          name: 'Data Visualization & BI',
          category: 'Analytics & Reporting',
          state: 'gap',
          importance: 'high',
          evidence: 'Only matplotlib/seaborn static research charts found. No interactive business BI tools (Power BI, Tableau) or executive dashboarding.',
          whyStatus: 'Gap: Executives do not read static Jupyter charts; they need interactive BI dashboards.',
          whyMattersForRole: 'Primary delivery vehicle for self-serve reporting in corporate environments.',
          nextAction: 'Learn Power BI data modeling, DAX measures, and drill-through visual design.',
          reasoning: {
            requiredForRole: 'Essential for cross-functional business stakeholder accessibility.',
            evidenceSummary: 'No Power BI or Tableau experience.',
            roadmapStageUnlocked: 'Unlocks executive presentation and reporting readiness.',
            priorityReason: 'High visual impact for portfolio presentation.'
          }
        }
      ],
      roadmap: [
        {
          id: 'stage-d-1',
          stageNumber: 1,
          name: 'Enterprise SQL for Python Developers',
          status: 'in_progress',
          objective: 'Translate existing Pandas manipulation intuitions (merge, groupby, pivot) into lightning-fast native SQL queries.',
          targetSkills: ['SQL Querying', 'Data Cleaning & ETL'],
          practiceSummary: 'Write complex SQL queries on normalized PostgreSQL transaction schemas.',
          projectMilestone: 'FinTech Transaction Audit & Fraud Anomaly SQL Pipeline',
          weeks: [
            {
              weekNumber: 1,
              title: 'Relational Schemas & SQL Translations from Pandas',
              focusSkill: 'SQL Querying',
              proofOfProgress: 'Write multi-table joins matching Pandas merge operations on bank transaction tables.',
              activities: [
                {
                  id: 'act-d-1',
                  title: 'Relational Schema Modeling & SQL Syntax',
                  type: 'learn',
                  whatToLearn: 'Relational algebra vs in-memory Pandas dataframes, database indexes, and query execution plans.',
                  whyItMatters: 'Enables querying databases with millions of records where downloading into Pandas would crash memory.',
                  whatToDo: ['Inspect query execution plans for indexed vs non-indexed SQL joins'],
                  expectedOutcome: 'Understand when to compute inside database engines vs Python runtime.',
                  estimatedHours: '4 hrs',
                  status: 'completed'
                }
              ]
            }
          ]
        },
        {
          id: 'stage-d-2',
          stageNumber: 2,
          name: 'Interactive Business BI & Executive Dashboards',
          status: 'locked',
          objective: 'Transition from static Matplotlib figures to interactive, production Power BI dashboards for business stakeholders.',
          targetSkills: ['Data Visualization & BI'],
          practiceSummary: 'Build multi-page interactive dashboards with filtering cross-highlights and DAX calculated metrics.',
          projectMilestone: 'FinTech Loan Portfolio Executive Risk Dashboard',
          weeks: []
        }
      ],
      adaptiveHistory: [],
      resources: [],
      practiceProjects: [],
      createdAt: '2026-09-19T01:00:00Z',
      lastUpdated: '2026-09-19T01:00:00Z',
      isDemo: true
    }
  },

  {
    id: 'alex-fe',
    name: 'Alex Rivera',
    badge: 'Design → Frontend Developer',
    targetRole: 'Frontend Developer',
    currentTitle: 'Visual Designer & Web Publisher',
    summary: 'Strong aesthetic instincts, HTML, and CSS styling; gaps in modern React state architecture, TypeScript generics, and asynchronous API handling.',
    highlightDifference: 'Focuses heavily on JavaScript ES6+ execution mental model and React hook lifecycle rather than basic styling.',
    data: {
      profile: {
        name: 'Alex Rivera',
        targetRole: 'Frontend Developer',
        careerGoal: 'Become a software engineer focused on design systems and accessible web interfaces.',
        targetIndustry: 'Technology / Design Systems',
        currentLevel: 'Beginner',
        manualSkills: ['HTML5', 'CSS3 & Flexbox', 'Figma', 'Basic JavaScript'],
        experienceSummary: '2 years creating promotional landing pages with HTML/CSS and Webflow, with elementary JavaScript for modal toggles.',
        uploadedDocuments: [
          {
            id: 'doc-fe-1',
            name: 'Alex_Rivera_Portfolio.pdf',
            size: 110000,
            type: 'application/pdf',
            extractedTextSnippet: 'Visual Designer: Built responsive marketing pages using semantic HTML and CSS Grid. Scripted basic DOM listeners for mobile navigation drawers.'
          }
        ],
        extractedCapabilities: {
          demonstratedSkills: ['Responsive CSS & Tailwind', 'Visual Hierarchy & Typography'],
          experienceHighlights: ['Engineered responsive landing pages with CSS Grid', 'Created Figma component libraries'],
          projects: ['Agency Showcase Landing Page', 'Mobile Responsive Product Catalog'],
          qualifications: ['B.A. in Graphic Design']
        }
      },
      skillTwin: [
        {
          id: 'sk-fe-react',
          name: 'React & State Architecture',
          category: 'Frameworks',
          state: 'gap',
          importance: 'high',
          evidence: 'No React components, hooks (useState, useEffect), or single-page app architecture found.',
          whyStatus: 'Critical gap: Modern frontend roles require declarative component-driven state architecture.',
          whyMattersForRole: 'The dominant standard for engineering modular, interactive web applications.',
          nextAction: 'Build a component tree with props, useState, and lifting state up.',
          reasoning: {
            requiredForRole: 'Non-negotiable core skill for modern frontend engineers.',
            evidenceSummary: 'Only static HTML/CSS and simple DOM manipulation found.',
            roadmapStageUnlocked: 'Unlocks entire web application engineering workflow.',
            priorityReason: 'Immediate bottleneck to building production applications.'
          }
        },
        {
          id: 'sk-fe-ts',
          name: 'TypeScript',
          category: 'Type Safety',
          state: 'gap',
          importance: 'high',
          evidence: 'No typed interfaces, generics, or TypeScript code found.',
          whyStatus: 'Gap: No TypeScript experience detected.',
          whyMattersForRole: 'Required in enterprise codebases to catch runtime bugs and enforce API contracts.',
          nextAction: 'Learn TypeScript type annotations, interfaces, and union types.',
          reasoning: {
            requiredForRole: 'Standard in modern tech stacks.',
            evidenceSummary: 'No typed files.',
            roadmapStageUnlocked: 'Enforces type safety in React components.',
            priorityReason: 'Pairs directly with React for professional code quality.'
          }
        },
        {
          id: 'sk-fe-css',
          name: 'Responsive CSS & Tailwind',
          category: 'Styling',
          state: 'strong',
          importance: 'high',
          evidence: 'Demonstrated mastery of CSS Grid, Flexbox, media queries, and responsive layouts.',
          whyStatus: 'Strong: Deep layout intuition and visual execution verified.',
          whyMattersForRole: 'Accelerates UI component construction and reduces styling bugs.',
          nextAction: 'Translate CSS expertise into Tailwind CSS utility patterns.',
          reasoning: {
            requiredForRole: 'Essential for polished user interfaces.',
            evidenceSummary: 'Proven track record in agency landing pages.',
            roadmapStageUnlocked: 'Enables rapid UI iteration on interactive components.',
            priorityReason: 'Core strength to be showcased in portfolio.'
          }
        }
      ],
      roadmap: [
        {
          id: 'stage-fe-1',
          stageNumber: 1,
          name: 'Modern JavaScript (ES6+) & Async Programming',
          status: 'in_progress',
          objective: 'Master closures, arrow functions, destructuring, Promises, async/await, and fetch API.',
          targetSkills: ['JavaScript & Modern ES6+'],
          practiceSummary: 'Build 5 vanilla JavaScript interactive widgets with API data fetching.',
          projectMilestone: 'Async Weather & Currency Exchange Dashboard',
          weeks: []
        },
        {
          id: 'stage-fe-2',
          stageNumber: 2,
          name: 'React 19 & Component Architecture',
          status: 'locked',
          objective: 'Build declarative UIs with functional components, custom hooks, and context.',
          targetSkills: ['React & State Architecture', 'TypeScript'],
          practiceSummary: 'Build an interactive Kanban board with drag-and-drop state.',
          projectMilestone: 'Collaborative Task Workspace with Local Persistence',
          weeks: []
        }
      ],
      adaptiveHistory: [],
      resources: [],
      practiceProjects: [],
      createdAt: '2026-09-19T01:00:00Z',
      lastUpdated: '2026-09-19T01:00:00Z',
      isDemo: true
    }
  },

  {
    id: 'sarah-ux',
    name: 'Sarah Lin',
    badge: 'Engineer → UI/UX Designer',
    targetRole: 'UI/UX Designer',
    currentTitle: 'Frontend UI Implementer',
    summary: 'Strong understanding of CSS tokens, layout systems, and technical constraints; gap in user research synthesis, heuristic evaluations, and user testing.',
    highlightDifference: 'Fast-tracks design-to-code handoff and focuses on discovery interviews and usability testing methodology.',
    data: {
      profile: {
        name: 'Sarah Lin',
        targetRole: 'UI/UX Designer',
        careerGoal: 'Transition from frontend UI implementation into Product Design and User Experience Architecture.',
        targetIndustry: 'Consumer Apps / EdTech',
        currentLevel: 'Intermediate',
        manualSkills: ['Design Systems', 'CSS Tokens', 'Figma Prototyping', 'Basic Wireframing'],
        experienceSummary: '3 years as a frontend developer implementing designer specs in Figma and building design systems.',
        uploadedDocuments: [
          {
            id: 'doc-ux-1',
            name: 'Sarah_Lin_Resume.pdf',
            size: 122000,
            type: 'application/pdf',
            extractedTextSnippet: 'Frontend Developer: Implemented tokenized Figma components in code. Maintained company design system. Collaborated with designers on interactive states.'
          }
        ],
        extractedCapabilities: {
          demonstratedSkills: ['Figma & Design Systems', 'Design-to-Code Handoff'],
          experienceHighlights: ['Maintained tokenized design systems in Figma and CSS', 'Engineered interactive micro-interactions'],
          projects: ['Enterprise Component Library', 'Checkout Flow Animation Spec'],
          qualifications: ['B.S. in Computer Science']
        }
      },
      skillTwin: [
        {
          id: 'sk-ux-research',
          name: 'User Research & Synthesis',
          category: 'UX Methodology',
          state: 'gap',
          importance: 'high',
          evidence: 'No qualitative customer interview protocols, journey maps, or usability test plans found in profile.',
          whyStatus: 'Critical gap: Product design requires grounding solutions in validated user pain points, not developer assumptions.',
          whyMattersForRole: 'Defines what problems to solve before any visual wireframes are drawn.',
          nextAction: 'Conduct 5 user discovery interviews, build an empathy map, and synthesize actionable user pain points.',
          reasoning: {
            requiredForRole: 'Distinguishes strategic product designers from graphic decorators.',
            evidenceSummary: 'Only technical implementation evidence found.',
            roadmapStageUnlocked: 'Unlocks Stage 1 (User Problem Framing & Discovery).',
            priorityReason: 'Essential foundation for any compelling UX portfolio case study.'
          }
        },
        {
          id: 'sk-ux-figma',
          name: 'Figma & Design Systems',
          category: 'Design Tools',
          state: 'strong',
          importance: 'high',
          evidence: 'Documented 3 years maintaining component tokens, auto-layout variants, and responsive breakpoints.',
          whyStatus: 'Strong: Exceptional technical fluency in modern design systems and tokenization.',
          whyMattersForRole: 'Ensures design work is modular, consistent, and scalable.',
          nextAction: 'Utilize design system expertise to rapidly build polished high-fidelity prototypes.',
          reasoning: {
            requiredForRole: 'Core operational tool for day-to-day design work.',
            evidenceSummary: 'Direct professional experience managing component libraries.',
            roadmapStageUnlocked: 'Allows fast prototyping once research insights are established.',
            priorityReason: 'Massive competitive edge during design system reviews.'
          }
        }
      ],
      roadmap: [
        {
          id: 'stage-ux-1',
          stageNumber: 1,
          name: 'User Research Methodology & Pain Point Synthesis',
          status: 'in_progress',
          objective: 'Master user interviews, Jobs-To-Be-Done (JTBD), journey mapping, and qualitative affinity diagramming.',
          targetSkills: ['User Research & Synthesis'],
          practiceSummary: 'Draft interview scripts, conduct 3 mock usability sessions, and create journey maps.',
          projectMilestone: 'HealthTech Clinic Booking User Friction Case Study',
          weeks: []
        }
      ],
      adaptiveHistory: [],
      resources: [],
      practiceProjects: [],
      createdAt: '2026-09-19T01:00:00Z',
      lastUpdated: '2026-09-19T01:00:00Z',
      isDemo: true
    }
  }
];

export function getDemoProfileById(id: string): DemoProfileOption | undefined {
  return DEMO_PROFILES.find((p) => p.id === id);
}
