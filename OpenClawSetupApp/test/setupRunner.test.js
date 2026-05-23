const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { DEFAULT_SETUP_SCRIPT, getSetupScriptPath, runSetupScript } = require('../setupRunner');

function writeMockScript(contents) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'openclaw-setup-test-'));
  const scriptPath = path.join(tempDir, 'mock setup script.sh');
  fs.writeFileSync(scriptPath, contents, { mode: 0o755 });
  return scriptPath;
}

test('getSetupScriptPath uses the production installer by default', () => {
  const previous = process.env.OPENCLAW_SETUP_SCRIPT;
  delete process.env.OPENCLAW_SETUP_SCRIPT;

  assert.equal(getSetupScriptPath(), DEFAULT_SETUP_SCRIPT);

  if (previous) {
    process.env.OPENCLAW_SETUP_SCRIPT = previous;
  }
});

test('getSetupScriptPath allows a mock installer override', () => {
  const previous = process.env.OPENCLAW_SETUP_SCRIPT;
  process.env.OPENCLAW_SETUP_SCRIPT = '/tmp/mock-openclaw-installer.sh';

  assert.equal(getSetupScriptPath(), '/tmp/mock-openclaw-installer.sh');

  if (previous) {
    process.env.OPENCLAW_SETUP_SCRIPT = previous;
  } else {
    delete process.env.OPENCLAW_SETUP_SCRIPT;
  }
});

test('runSetupScript returns success output from a mock installer', async () => {
  const scriptPath = writeMockScript([
    '#!/usr/bin/env bash',
    'echo "checking dependencies"',
    'echo "install complete"'
  ].join('\n'));

  const result = await runSetupScript(scriptPath);

  assert.deepEqual(result, {
    success: true,
    output: 'checking dependencies\ninstall complete\n'
  });
});

test('runSetupScript returns failure output from a mock installer', async () => {
  const scriptPath = writeMockScript([
    '#!/usr/bin/env bash',
    'echo "missing dependency" >&2',
    'exit 42'
  ].join('\n'));

  const result = await runSetupScript(scriptPath);

  assert.equal(result.success, false);
  assert.equal(result.output, 'missing dependency\n');
});
