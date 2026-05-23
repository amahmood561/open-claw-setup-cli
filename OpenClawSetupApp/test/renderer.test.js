const assert = require('node:assert/strict');
const test = require('node:test');

const { initSetupUi } = require('../renderer');

function createWindowMock(runScript) {
  const elements = {
    runBtn: { disabled: false, onclick: null },
    output: { textContent: '', innerHTML: '' }
  };

  return {
    document: {
      getElementById(id) {
        return elements[id];
      }
    },
    electronAPI: { runScript },
    elements
  };
}

test('renderer disables the button while a mocked setup succeeds', async () => {
  let resolveRunScript;
  const windowMock = createWindowMock(() => new Promise((resolve) => {
    resolveRunScript = resolve;
  }));

  initSetupUi(windowMock);
  const clickPromise = windowMock.elements.runBtn.onclick();

  assert.equal(windowMock.elements.runBtn.disabled, true);
  assert.equal(windowMock.elements.output.textContent, 'Running setup...');

  resolveRunScript({ success: true, output: 'install complete\n' });
  await clickPromise;

  assert.equal(windowMock.elements.runBtn.disabled, false);
  assert.match(windowMock.elements.output.innerHTML, /Setup completed successfully!/);
  assert.match(windowMock.elements.output.innerHTML, /install complete/);
});

test('renderer shows failure output from a mocked setup failure', async () => {
  const windowMock = createWindowMock(async () => ({
    success: false,
    output: 'missing dependency\n'
  }));

  initSetupUi(windowMock);
  await windowMock.elements.runBtn.onclick();

  assert.equal(windowMock.elements.runBtn.disabled, false);
  assert.match(windowMock.elements.output.innerHTML, /Setup failed:/);
  assert.match(windowMock.elements.output.innerHTML, /missing dependency/);
});

test('renderer shows a failure if invoking the setup API throws', async () => {
  const windowMock = createWindowMock(async () => {
    throw new Error('mock ipc failure');
  });

  initSetupUi(windowMock);
  await windowMock.elements.runBtn.onclick();

  assert.equal(windowMock.elements.runBtn.disabled, false);
  assert.match(windowMock.elements.output.innerHTML, /Setup failed:/);
  assert.match(windowMock.elements.output.innerHTML, /mock ipc failure/);
});
