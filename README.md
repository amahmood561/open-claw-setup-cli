# OpenClaw Local macOS Setup

This script installs and configures a fully local [OpenClaw](https://github.com/openclaw/openclaw?utm_source=chatgpt.com) development environment on macOS using:

* [Ollama](https://ollama.com?utm_source=chatgpt.com)
* Qwen local coding model
* OpenClaw CLI
* Homebrew
* Node.js

The setup is optimized for:

* Apple Silicon Macs
* Local/private AI agents
* Coding + automation workflows
* VSCode integration
* Local LLM execution

---

# What This Script Does

The script automatically:

* Installs Homebrew (if missing)
* Installs:

  * Git
  * Node.js
  * Ollama
  * OpenClaw CLI
* Starts Ollama service
* Downloads local coding model:

  * `qwen2.5-coder:14b`
* Creates OpenClaw memory folders
* Verifies installation
* Prepares onboarding flow

---

# Requirements

## macOS

Recommended:

* macOS Sonoma or newer
* Apple Silicon (M1/M2/M3/M4)

## Recommended Hardware

| Component | Recommended   |
| --------- | ------------- |
| RAM       | 16GB+         |
| Storage   | 50GB+ free    |
| CPU       | Apple Silicon |

---

# Installation

## 1. Create Script File

Create:

```bash
setup-openclaw.sh
```

Paste the shell script into it.

---

# 2. Make Executable

Run:

```bash
chmod +x setup-openclaw.sh
```

---

# 3. Execute

Run:

```bash
./setup-openclaw.sh
```

The model download may take several minutes depending on internet speed.

---

# After Script Completes

Run onboarding manually:

```bash
openclaw onboard --install-daemon
```

---

# Recommended Onboarding Settings

## Security Disclaimer

Choose:

```text
Yes
```

---

## Internet Exposure / Tailscale

Choose:

```text
No
```

Keep local-only initially.

---

## Provider

Choose:

```text
Custom Provider
```

Then:

```text
OpenAI-Compatible
```

---

## Base URL

Use:

```text
http://localhost:11434/v1
```

---

## API Key

Use:

```text
ollama
```

---

## Model

Use:

```text
qwen2.5-coder:14b
```

---

## Messaging Channels

Choose:

```text
No
```

Skip Telegram/Discord until local setup is stable.

---

## Gateway Daemon

Choose:

```text
Yes
```

---

# Verify Installation

## Check Gateway

```bash
openclaw gateway status
```

Expected:

```text
healthy
```

---

## Verify Ollama

```bash
curl http://localhost:11434/api/tags
```

Should return JSON.

---

## Verify OpenClaw

```bash
openclaw doctor
```

---

# First Test Prompt

Run:

```bash
openclaw agent --local --agent main --message "Create a FastAPI endpoint that uploads CSV files"
```

---

# Installed Components

| Component     | Purpose                |
| ------------- | ---------------------- |
| OpenClaw      | AI agent runtime       |
| Ollama        | Local LLM server       |
| Qwen2.5-Coder | Coding/reasoning model |
| Node.js       | OpenClaw runtime       |
| Git           | Repo/tool support      |

---

# Memory Directory

Created automatically:

```bash
~/openclaw-memory
```

Contains:

```text
MEMORY.md
PROJECTS.md
WORKFLOWS.md
```

Useful for persistent agent context.

---

# Common Commands

## Start Gateway

```bash
openclaw gateway start
```

---

## Stop Gateway

```bash
openclaw gateway stop
```

---

## Open Dashboard

```bash
openclaw dashboard
```

Then open:

```text
http://127.0.0.1:18789
```

---

## Start Ollama

```bash
ollama serve
```

---

## Pull Additional Models

```bash
ollama pull deepseek-coder-v2
ollama pull llama3.1:8b
```

---

# Updating Models

Update Ollama models:

```bash
ollama pull qwen2.5-coder:14b
```

---

# Uninstall

## Remove OpenClaw

```bash
brew uninstall openclaw-cli
rm -rf ~/.openclaw
```

---

## Remove Ollama

```bash
brew uninstall ollama
rm -rf ~/.ollama
```

---

# Security Notes

OpenClaw can:

* access files
* execute shell commands
* automate workflows

Initially:

* keep local-only
* avoid unrestricted shell tools
* do not expose publicly
* avoid connecting production credentials

---

# Recommended Future Stack

For advanced workflows:

```text
VSCode
  ↓
Continue.dev / OpenClaw
  ↓
Ollama
  ↓
Local Models
  ↓
Docker Sandbox
  ↓
Postgres + pgvector
```

---

# Recommended Models

| Model             | Use Case           |
| ----------------- | ------------------ |
| qwen2.5-coder:14b | Best balance       |
| deepseek-coder-v2 | Strong reasoning   |
| llama3.1:8b       | Lightweight        |
| qwen3:14b         | Advanced reasoning |

---

# Troubleshooting

## Ollama Not Running

```bash
brew services start ollama
```

---

## Model Missing

```bash
ollama pull qwen2.5-coder:14b
```

---

## Gateway Not Healthy

```bash
openclaw doctor
```

---

## Node Version Issues

OpenClaw requires:

* Node 22+
* Recommended: Node 24

Check:

```bash
node -v
```

---

# Recommended Next Steps

Once stable locally:

* Connect VSCode
* Add Docker sandboxing
* Configure filesystem tools
* Add PostgreSQL memory
* Build custom agents
* Add LangGraph/MCP workflows later

---

# Packaging the OpenClawSetupApp GUI (macOS)

To build and package the OpenClawSetupApp Electron GUI as a DMG for macOS:

## 1. Install Dependencies

Navigate to the app directory and install dependencies:

```bash
cd OpenClawSetupApp
npm install
```

## 2. Package the App for macOS

Run the packaging script (creates a universal macOS build):

```bash
npm run package-mac
```

This will generate the `OpenClawSetupApp-darwin-universal` folder with the `.app` bundle inside.

## 3. Create a DMG File

Use this one-liner to generate a DMG from the packaged app:

```bash
hdiutil create -volname "OpenClawSetupApp" -srcfolder OpenClawSetupApp-darwin-universal/OpenClawSetupApp.app -ov -format UDZO OpenClawSetupApp.dmg
```

## 4. All-in-One Command

You can run all steps in one line (from inside `OpenClawSetupApp`):

```bash
npm install && npm run package-mac && hdiutil create -volname "OpenClawSetupApp" -srcfolder OpenClawSetupApp-darwin-universal/OpenClawSetupApp.app -ov -format UDZO OpenClawSetupApp.dmg
```

This will:
- Install dependencies
- Package the Electron app
- Create a DMG file ready for distribution
