# 🛡️ REPOGUARD AI

### Autonomous Evidence-Driven Software Engineering Agent

> **"An AI coding agent should not just write code. It should PROVE that its change did not break the software."**

REPOGUARD AI is an autonomous software engineering agent that combines repository intelligence, AST/symbol understanding, dependency graph analysis, semantic retrieval, execution-based debugging, impact prediction, minimal patch generation, regression shielding, automatic test generation, patch verification, confidence scoring, and a human-readable evidence trail.

---

## 🎯 Core Philosophy

```
DO NOT TRUST THE MODEL.
TRUST THE REPOSITORY + EXECUTION + TESTS.
```

The LLM is the reasoning engine. The repository, AST, dependency graph, compiler/interpreter, package manifests, git history, and test results are the sources of truth.

---

## 🏗️ Architecture

```
┌─────────────────── React Dashboard ───────────────────┐
│  Repository Explorer │ Execution Timeline │ Evidence   │
│  Impact Graph       │ Diff Viewer        │ Tests      │
└───────────────────────┬───────────────────────────────┘
                        │ WebSocket + REST
┌───────────────────────┴───────────────────────────────┐
│              FastAPI Backend + LangGraph                │
│  Scanner → Analyzer → Planner → Patcher → Tester      │
├────────────────────────────────────────────────────────┤
│  Tree-sitter │ NetworkX │ FAISS │ SQLite │ Subprocess  │
├────────────────────────────────────────────────────────┤
│              Ollama (qwen5-coder:.5b)                 │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Innovations

| # | Innovation | Description |
|---|-----------|-------------|
| 1 | **Repository Digital Twin** | Machine-readable graph of files, symbols, relationships using Tree-sitter + NetworkX |
| 2 | **Evidence Ledger** | Every agent decision backed by verifiable evidence |
| 3 | **API Reality Guard** | Verifies all imports/classes/methods exist before code generation |
| 4 | **Minimal Patch Optimizer** | Minimizes PatchCost while maintaining correctness |
| 5 | **Regression Shield** | Automatic baseline comparison; rejects patches that break tests |
| 6 | **Failure-Driven Self-Repair** | Up to 5 repair loops driven by actual error evidence |
| 7 | **Test Gap Miner** | Generates regression tests that fail before fix, pass after |
| 8 | **Counterfactual Regression Testing** | Baseline vs patched comparison |
| 9 | **Patch Confidence Score** | 0-100 evidence-based score with classification |
| 10 | **Explainable Code Edit Timeline** | Step-by-step mission control visualization |

---

## 📋 Prerequisites

- **Python** 3.11+
- **Node.js** 18+
- **Git** 2.30+
- **Ollama** (for local LLM inference)

### Hardware Requirements

- CPU: Any modern multi-core processor
- RAM: 16 GB recommended
- GPU: NVIDIA GPU with 6GB+ VRAM (for Ollama)
- Storage: 10 GB free space

---

## ⚡ Quick Start

### 1. Clone and Setup

```powershell
# Clone the project
cd repoguard-ai

# Run automated setup
.\scripts\setup.ps1
```

### 2. Manual Setup

```powershell
# Pull the LLM model
ollama pull qwen2.5-coder:7b

# Backend setup
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend setup
cd ..\frontend
npm install

# Create environment file
copy ..\.env.example ..\.env
```

### 3. Run

```powershell
# Terminal 1: Start Ollama (if not running)
ollama serve

# Terminal 2: Start backend
cd backend
.\venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload --port 8000

# Terminal 3: Start frontend
cd frontend
npm run dev
```

### 4. Open Dashboard

Navigate to **http://localhost:3000**

---

## 🎮 Demo

1. Open the dashboard
2. Enter a GitHub repository URL (e.g., a Python project with tests)
3. Click **"Analyze Repository"**
4. Enter a bug description or feature request
5. Click **"RUN AUTONOMOUS REPAIR"**
6. Watch the 11-step autonomous pipeline execute in real-time

---

## 🔧 Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `LLM_PROVIDER` | `ollama` | `ollama` or `openai` |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama server URL |
| `OLLAMA_MODEL` | `qwen2.5-coder:7b` | Ollama model name |
| `OPENAI_API_KEY` | - | OpenAI API key (optional) |
| `OPENAI_MODEL` | `gpt-4o-mini` | OpenAI model |
| `OPENAI_BASE_URL` | - | Custom OpenAI endpoint |
| `COMMAND_TIMEOUT` | `120` | Command execution timeout (seconds) |
| `MAX_REPAIR_ATTEMPTS` | `5` | Maximum self-repair loops |

---

## 📁 Project Structure

```
repoguard-ai/
├── backend/           # FastAPI + LangGraph agent
│   ├── app/
│   │   ├── agents/    # LangGraph workflow + tools
│   │   ├── analyzers/ # Repo scanner, AST, symbols
│   │   ├── graph/     # NetworkX dependency graph
│   │   ├── retrieval/ # FAISS + semantic search
│   │   ├── llm/       # Ollama/OpenAI provider
│   │   ├── patching/  # Patch generation & application
│   │   ├── testing/   # Test discovery & execution
│   │   ├── verification/ # API guard, confidence
│   │   ├── evidence/  # Evidence ledger
│   │   └── execution/ # Sandboxed command execution
│   └── requirements.txt
├── frontend/          # React + Vite dashboard
│   └── src/
│       ├── components/ # UI components
│       ├── pages/      # Dashboard page
│       ├── hooks/      # React hooks
│       ├── services/   # API client
│       └── types/      # TypeScript types
├── workspace/         # Cloned repositories
├── demo/              # Demo scenarios
└── scripts/           # Setup scripts
```

---

## 🔬 Agent Pipeline

```
START
 ↓
RepositoryScanner — Clone & index repository
 ↓
ArchitectureAnalyzer — Infer application structure
 ↓
IssueInterpreter — Parse user request into contract
 ↓
SymbolRetriever — Find relevant code symbols
 ↓
ImpactAnalyzer — Calculate change impact radius
 ↓
RootCauseInvestigator — Determine root cause with evidence
 ↓
PatchPlanner — Plan minimal safe patch
 ↓
PatchGenerator — Generate code changes
 ↓
PatchValidator — Apply and validate patch
 ↓
TestGenerator — Create regression tests
 ↓
TestExecutor — Run targeted + regression tests
 ↓
RegressionAnalyzer — Compare baseline vs patched
 ↓
RepairDecision
 ├── PASS → FinalReporter (generate evidence report)
 └── FAIL → RootCauseAnalyzer → PatchPlanner (max 5 retries)
 ↓
END
```

---

## 📊 Confidence Scoring

| Component | Points |
|-----------|--------|
| Root cause supported by evidence | +20 |
| Regression test passes | +20 |
| Existing test suite passes | +20 |
| Impacted tests pass | +15 |
| Static analysis passes | +10 |
| API/import verification passes | +10 |
| Minimal patch score | +5 |
| **Penalties** | |
| Unrelated files changed | -20 |
| New dependency without justification | -20 |
| Regression failure | -25 |
| Unverified API usage | -25 |
| Test coverage weakened | -15 |

**Classification:** 90-100 HIGH | 75-89 MODERATE | 50-74 LOW | <50 REJECT

---

## 📄 License

MIT License — See [LICENSE](LICENSE)
