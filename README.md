# OpenClawSetupApp (macOS GUI)

A simple Electron-based macOS app to guide users through the OpenClaw setup process with a user-friendly interface.

## Features
- One-click setup for OpenClaw and dependencies
- Visual feedback on installation progress and errors
- Runs the same steps as the provided shell script


## How to Use

### Option 1: Run from Source

1. **Install dependencies:**
   Open a terminal in the `OpenClawSetupApp` folder and run:
   ```sh
   npm install
   ```

2. **Start the app:**
   ```sh
   npm start
   ```

3. **Run the setup:**
   - Click the "Run Setup" button in the app window.
   - The app will execute the setup script and display output and results.

### Option 2: Build a Double-Clickable App (.app)

1. **Build the app bundle:**
   ```sh
   npm run package-mac
   ```

2. **Find the app:**
   The double-clickable app will be created at:
   ```
   OpenClawSetupApp-darwin-universal/OpenClawSetupApp.app
   ```

3. **Run the app:**
   - Double-click `OpenClawSetupApp.app` to launch the installer GUI.
   - You can check this .app into your repository or compress it for distribution.

## Requirements
- Node.js (v18 or later recommended) for building
- macOS (Apple Silicon or Intel)

## Notes
- The app wraps and runs the `install-openclaw-stupid-simple-mac.sh` script. Make sure the script is present in the parent directory.
- You may be prompted for your password during installation steps (e.g., Xcode license, Homebrew).
- For onboarding, follow the instructions shown after setup completes.
- The .app bundle can be distributed or checked into your repository for easy double-click installation.

## Troubleshooting
- If you see permission errors, try running the app with sufficient privileges or run the shell script directly.
- For advanced issues, check the output log in the app or run the script in a terminal for more details.
- If the app does not open, ensure you have allowed apps from identified developers in your macOS Security & Privacy settings.

---

**Enjoy a smoother OpenClaw setup experience! 🦞**
# open-claw-setup-cli
