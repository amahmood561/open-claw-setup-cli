(function () {
  function initSetupUi(windowRef = window) {
    const runBtn = windowRef.document.getElementById('runBtn');
    const outputDiv = windowRef.document.getElementById('output');

    runBtn.onclick = async () => {
      runBtn.disabled = true;
      outputDiv.textContent = 'Running setup...';

      try {
        const result = await windowRef.electronAPI.runScript();
        if (result.success) {
          outputDiv.innerHTML = '<span class="success">Setup completed successfully!</span>\n' + result.output;
        } else {
          outputDiv.innerHTML = '<span class="fail">Setup failed:</span>\n' + result.output;
        }
      } catch (error) {
        outputDiv.innerHTML = '<span class="fail">Setup failed:</span>\n' + error.message;
      } finally {
        runBtn.disabled = false;
      }
    };
  }

  if (typeof module !== 'undefined') {
    module.exports = { initSetupUi };
  }

  if (typeof window !== 'undefined') {
    window.initSetupUi = initSetupUi;
    window.addEventListener('DOMContentLoaded', () => initSetupUi(window));
  }
})();
