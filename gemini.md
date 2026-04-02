# Project Constitution (gemini.md)

## Project Map & State Tracking
- **Project Name:** IntelliPlan AI
- **Description:** An agentic workflow to pull Jira/ADO/X-Ray info dynamically, use an LLM (Ollama, GROQ, etc.), and generate standardized test plans from a `.docx` template.

## Data Schemas
**1. Connection Configuration Schema**
```json
{
  "connectionId": "STRING",
  "type": "STRING", // "Jira", "ADO", "X-Ray"
  "url": "STRING",
  "credentials": "STRING", // API Key or Token
  "status": "STRING" // "connected", "failed"
}
```

**2. LLM Configuration Schema**
```json
{
  "llmId": "STRING",
  "provider": "STRING", // "Ollama", "GROQ"
  "model": "STRING",
  "apiKey": "STRING",
  "endpoint": "STRING"
}
```

**3. Feature Fetch Request (Input Payload)**
```json
{
  "ticketId": "STRING",
  "connectionId": "STRING",
  "additionalContext": "STRING"
}
```

**4. Processed Output Shape (Delivery Payload)**
```json
{
  "ticketDetails": {
    "title": "STRING",
    "description": "STRING",
    "acceptanceCriteria": "STRING"
  },
  "testPlanUrl": "STRING", // Path to download generated .docx
  "status": "STRING" // "success" or "error"
}
```

## Behavioral Rules
- Prioritize reliability over speed.
- Never guess at business logic.
- Deterministic logic stays in tools (Python scripts).
- Probabilistic reasoning is restricted to navigation and data mapping.
- UI must prioritize premium Visual Excellence (Glassmorphism, dark modes, animations) and have a "Test Connection" button for all integrations.

## Architectural Invariants
### The 3-Layer Build
1. **Architecture (`architecture/`):** Technical SOPs in Markdown defining rules, inputs, and edge cases. (Golden Rule: Logic changes update SOPs before code).
2. **Navigation:** The reasoning layer routing data between SOPs and Tools (e.g., API routes).
3. **Tools (`tools/`):** Atomic, deterministic Python scripts. Temporary operations in `.tmp/`.
