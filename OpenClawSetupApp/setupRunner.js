const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEFAULT_SETUP_SCRIPT = path.join(__dirname, '..', 'install-openclaw-stupid-simple-mac.sh');
const BUNDLED_SETUP_SCRIPT = path.join(__dirname, 'install-openclaw-stupid-simple-mac.sh');

function getSetupScriptPath() {
  if (process.env.OPENCLAW_SETUP_SCRIPT) {
    return process.env.OPENCLAW_SETUP_SCRIPT;
  }

  if (fs.existsSync(DEFAULT_SETUP_SCRIPT)) {
    return DEFAULT_SETUP_SCRIPT;
  }

  return BUNDLED_SETUP_SCRIPT;
}

function runSetupScript(scriptPath = getSetupScriptPath()) {
  return new Promise((resolve) => {
    execFile('bash', [scriptPath], { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, output: stderr || error.message });
      } else {
        resolve({ success: true, output: stdout });
      }
    });
  });
}

module.exports = {
  BUNDLED_SETUP_SCRIPT,
  DEFAULT_SETUP_SCRIPT,
  getSetupScriptPath,
  runSetupScript
};
