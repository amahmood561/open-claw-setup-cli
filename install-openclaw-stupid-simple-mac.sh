#!/bin/bash
set -e

echo "🦞 OpenClaw Mac Setup Starting..."

# 1. Accept Xcode license if needed
sudo xcodebuild -license accept 2>/dev/null || true

# 2. Install Homebrew if missing
if ! command -v brew >/dev/null 2>&1; then
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# 3. Fix Homebrew PATH for Apple Silicon
if [ -x /opt/homebrew/bin/brew ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
  grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
fi

# 4. Install dependencies
echo "Installing dependencies..."
brew install git node ollama openclaw-cli

# 5. Start Ollama
echo "Starting Ollama..."
brew services start ollama || true

# 6. Pull local coding model
echo "Pulling local model. This may take a while..."
ollama pull qwen2.5-coder:14b

# 7. Verify installs
echo "Checking versions..."
node -v
ollama --version
openclaw --version

# 8. Create safe memory folder
mkdir -p ~/openclaw-memory
touch ~/openclaw-memory/MEMORY.md
touch ~/openclaw-memory/PROJECTS.md
touch ~/openclaw-memory/WORKFLOWS.md

echo ""
echo "✅ Base setup complete."
echo ""
echo "Now run this manually in your normal Terminal:"
echo ""
echo "openclaw onboard --install-daemon"
echo ""
echo "Recommended onboarding choices:"
echo "- Security disclaimer: Yes"
echo "- Tailscale/expose internet: No"
echo "- Provider: Custom / OpenAI-compatible"
echo "- Base URL: http://localhost:11434/v1"
echo "- API key: ollama"
echo "- Model: qwen2.5-coder:14b"
echo "- Messaging channels: No for now"
echo "- Gateway daemon: Yes"
echo ""
echo "After onboarding, test:"
echo "openclaw doctor"
echo "openclaw gateway status"
echo "openclaw agent --local --agent main --message 'Hello, respond with just Hi'"