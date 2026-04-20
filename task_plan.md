# Task Plan

## Goals
- Create **IntelliNexus AI**, an intelligent test plan creator.
- Dynamic connection UI to JIRA, ADO, X-Ray, etc. with a "Test Connection" functionality.
- Dynamic LLM connections supporting GROQ, Ollama, etc.
- Fetch user stories/requirements via Ticket ID + extra context.
- Generate and download a formatted `.docx` test plan.

## Phases
1. **Phase 0: Initialization** - Setup memory files [x]
2. **Phase 1: B - Blueprint** - Discovery and Data Schema Definition [x]
3. **Phase 2: L - Link** - Implement Python tools to test dynamic connections (Jira, GROQ, Ollama). [ ]
4. **Phase 3: A - Architect** - Set up the UI App framework and Python Backend routing. [ ]
5. **Phase 4: S - Stylize** - Build premium Dashboard UI, Connectors view, Details view, and Test Plan viewer. [ ]
6. **Phase 5: T - Trigger** - Full end-to-end testing and readiness. [ ]

## Checklists
- [x] Phase 0 initialization
- [x] Answer Phase 1 Discovery Questions
- [x] Define JSON Data Schema
- [ ] Create Python Tool for Jira Connection Verification
- [ ] Create Python Tool for LLM Connection Verification
- [ ] Setup Web App (React/Vite) & Web Server (FastAPI)
- [ ] Connect Frontend to Backend Models
- [ ] Implement DOCX generation logic based on Template
