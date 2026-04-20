# URL Analyzer Technical SOP

## Overview
The URL Analyzer is designed to perform on-demand, real-time intelligence gathering for any web interface. It extracts DOM elements, identifies interactive nodes, and generates automation assets (Playwright, Scenarios, Assertions).

## 3-Layer Build Process

### 1. Extraction Layer (Tools)
- **Role**: Deterministic data gathering.
- **Workflow**:
    - Fetch raw HTML using `requests` (Standard) or `Playwright` (Dynamic).
    - Parse using `BeautifulSoup`.
    - **Cleaning Logic**:
        - Remove `script`, `style`, `meta`, `link`, `head` tags.
        - Preserve interactive tags: `button`, `input`, `a`, `select`, `textarea`, `form`.
        - Extract relevant attributes: `id`, `name`, `class`, `placeholder`, `aria-label`, `type`, `role`.
        - Truncate text content to avoid context overflow.
    - **Output**: Cleaned, structured DOM snippet.

### 2. Reasoning Layer (LLM)
- **Role**: Probabilistic mapping and code synthesis.
- **Orchestration**: 
    - **Primary Engine**: NVIDIA (via OpenAI-compatible API).
    - **Fallback Engine**: Groq.
- **Taxonomy Focus**:
    - **Forms & Inputs**: Text, Password, Date/Time Pickers, File Uploads, etc.
    - **Selection Controls**: Toggles, Chips, Tree Select, Cascading Dropdowns.
    - **Buttons & Actions**: FABs, Split Buttons, Context Menu Triggers.
    - **Navigation**: Hamburger Menus, Steppers, Infinite Scroll.
    - **Tables & Data**: Sortable/Virtualized Tables, KPI Cards, Timelines.
    - **Feedback**: Skeletons, Progress Bars, Badge Statuses.
    - **SaaS Components**: Kanban Boards, Chat Widgets, Drag & Drop.
- **Validation States**: Visible, Enabled, Readonly, Loading, Empty, Focused, etc.
- **Prompt Architecture**:
    - Inject the cleaned DOM as context.
    - Inject the full taxonomy as a classification requirement.
    - Require structured JSON output.

### 3. Delivery Layer (API & UI)
- **Role**: Serving and visualizing assets.
- **Endpoint**: `POST /api/v1/analyzer/analyze`
- **UI Interaction**:
    - Display a multi-stage console (Extracting DOM -> Mapping Elements -> Generating Scenarios).
    - Final result cards must be persistent and copyable.

## Data Schema
```json
{
  "status": "success",
  "url": "STRING",
  "analysis": {
    "techStack": ["STRING"],
    "features": [
      {
        "name": "STRING",
        "description": "STRING",
        "locators": ["STRING"]
      }
    ],
    "playwrightCode": "STRING",
    "testCases": ["STRING"],
    "locatorsTable": [
        {"element": "STRING", "selector": "STRING", "strategy": "STRING"}
    ],
    "assertions": ["STRING"],
    "risks": ["STRING"]
  }
}
```
