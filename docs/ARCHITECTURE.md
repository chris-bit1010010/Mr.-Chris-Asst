# Architecture Overview 🏗️

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Mr. Chris Assistant                          │
│                  Auto Notion Flow Template                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Main Entry Point                           │
│                        (index.js)                               │
│                                                                 │
│  • Application Bootstrap                                       │
│  • Configuration Loading                                       │
│  • Auto Flow Execution                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Core Library  │ │    Utilities    │ │  Configuration  │
│   (src/lib/)    │ │   (src/utils/)  │ │    (config/)    │
└─────────────────┘ └─────────────────┘ └─────────────────┘
        │                     │                   │
        │                     │                   │
        ▼                     ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ NotionFlow      │ │ CSVValidator    │ │ default.js      │
│ Template        │ │ ImportHelper    │ │                 │
│                 │ │ TemplateUtility │ │ • App Settings  │
│ • Init          │ │                 │ │ • Paths         │
│ • Parse CSV     │ │ • Validate      │ │ • Features      │
│ • Load Data     │ │ • Guide         │ │ • Validation    │
│ • Generate      │ │ • Reference     │ │ • Logging       │
│ • Execute       │ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘
        │                     │
        │                     │
        ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Sources                               │
│                   (notion_files/)                               │
│                                                                 │
│  • notion_Draws.csv         - Draw schedules                   │
│  • notion_Participants.csv  - Customer data                    │
│  • notion_PayoutRules.csv   - Calculation rules                │
│  • notion_Entries.csv       - Player entries                   │
│  • notion_Payments_manual.csv - Payments                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Output & Results                            │
│                                                                 │
│  • Validation Results                                          │
│  • Template Generation                                         │
│  • Import Instructions                                         │
│  • Quick Reference                                             │
└─────────────────────────────────────────────────────────────────┘
```

## Component Interaction Flow

```
User Executes Command
        │
        ▼
┌──────────────────┐
│  npm start       │ ──► Main application with auto-flow
│  npm test        │ ──► Test suite execution
│  npm run         │ ──► Specific utility scripts
│  validate-csv    │
└──────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Application Flow                             │
│                                                                 │
│  1. Load Configuration (config/default.js)                     │
│  2. Initialize Core Modules                                    │
│  3. Validate CSV Files (if enabled)                            │
│  4. Execute Flow Template                                      │
│  5. Display Results & Guidance                                 │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      User Receives                              │
│                                                                 │
│  ✓ Validation Status                                           │
│  ✓ Template Structure                                          │
│  ✓ Import Instructions                                         │
│  ✓ Quick Reference Card                                        │
│  ✓ Next Steps Guidance                                         │
└─────────────────────────────────────────────────────────────────┘
```

## Module Dependencies

```
index.js (Main)
├── config/default.js (Configuration)
├── flow-template.js (Core - Backward Compatible)
│   └── Notion Flow Template Logic
├── src/utils/csv-validator.js (Validation)
│   └── CSV Structure & Data Validation
├── src/utils/notion-import-helper.js (Helper)
│   └── Import Guide & Reference Generation
└── src/utils/flow-template-utility.js (Utility)
    └── Detailed Flow Analysis

Scripts (Standalone)
├── scripts/validate-csv.js
│   └── uses: src/utils/csv-validator.js
├── scripts/import-guide.js
│   └── uses: src/utils/notion-import-helper.js
└── scripts/setup-help.js
    └── Displays: All available commands
```

## Data Flow

```
CSV Files (notion_files/)
        │
        ├─► Validation ─────► CSVValidator
        │   (Structure,           │
        │    Data Types,           │
        │    Required Fields)      │
        │                          ▼
        │                    Validation Results
        │                    (Errors, Warnings)
        │
        ├─► Parsing ────────► FlowTemplate
        │   (Read & Parse)        │
        │                          ▼
        │                    Structured Data
        │                    (Headers, Records)
        │
        └─► Processing ─────► Template Generation
            (Generate)            │
                                  ▼
                            Notion Structure
                            (Databases, Relations,
                             Formulas, Views)
                                  │
                                  ▼
                            Import Instructions
                            & Documentation
```

## Script Architecture

```
Helper Scripts Layer
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  validate-csv.js        import-guide.js       setup-help.js    │
│       │                      │                      │           │
│       │                      │                      │           │
│       ▼                      ▼                      ▼           │
│  CSV Validation     Import Instructions    Command Help        │
│  - Check files      - Step-by-step         - List commands     │
│  - Report errors    - Quick reference      - Usage guide       │
│  - Exit codes       - Examples             - Documentation     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                      Utility Layer
┌─────────────────────────────────────────────────────────────────┐
│                    src/utils/                                   │
│                                                                 │
│  CSVValidator         NotionImportHelper    FlowTemplateUtility│
│  - validateCSV        - generateGuide       - analyzeData      │
│  - checkTypes         - createReference     - displayInfo      │
│  - reportResults      - formatSteps         - showSummary      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                      Core Layer
┌─────────────────────────────────────────────────────────────────┐
│                    src/lib/                                     │
│                                                                 │
│  NotionFlowTemplate                                            │
│  - init()                                                       │
│  - parseCSV()                                                   │
│  - loadFlowData()                                              │
│  - generateNotionTemplate()                                    │
│  - executeFlow()                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Configuration Flow

```
Environment Variables (.env)
        │
        ▼
config/default.js (Defaults)
        │
        ├─► app: { name, version, description }
        ├─► paths: { notionFiles, data, scripts, docs }
        ├─► flowTemplate: { flows, databases, automation }
        ├─► validation: { enable, strictMode, dateFormat }
        ├─► logging: { level, colors, timestamps }
        └─► features: { csvValidation, importHelper, ... }
                │
                ▼
        Application Runtime
        (Used by all modules)
```

## Documentation Structure

```
Documentation Hierarchy
├── README.md (Overview)
│   ├── Getting Started
│   ├── Available Commands
│   ├── Project Structure
│   └── Basic Usage
│
├── QUICK-START.md (Fast Track)
│   ├── Prerequisites
│   ├── 3-Step Setup
│   ├── Available Commands
│   └── Tips
│
├── API.md (Technical Reference)
│   ├── NotionFlowTemplate API
│   ├── CSVValidator API
│   ├── NotionImportHelper API
│   ├── Configuration API
│   └── Examples
│
├── FLOW-TEMPLATE-GUIDE.md (Feature Deep Dive)
│   ├── Data Structure
│   ├── Database Template
│   ├── Auto Flow Features
│   ├── Views
│   └── Setup Instructions
│
├── CONTRIBUTING.md (Developer Guide)
│   ├── Getting Started
│   ├── Development Workflow
│   ├── Coding Standards
│   └── Submission Process
│
└── CHANGELOG.md (Version History)
    ├── Version 1.0.0 Changes
    ├── Upgrade Guide
    └── Future Plans
```

## Testing Architecture

```
Test Suite (test.js)
        │
        ├─► Test 1: Assistant Object Exists
        ├─► Test 2: Required Methods Present
        ├─► Test 3: Properties Correct
        ├─► Test 4: Flow Template Available
        └─► Test 5: Flow Execution Success
                │
                ▼
        All Tests Pass ✓
        (5/5 tests passing)
```

---

**This architecture provides:**
- ✅ Clear separation of concerns
- ✅ Modular and maintainable code
- ✅ Comprehensive documentation
- ✅ Easy to extend and modify
- ✅ Developer-friendly structure
