const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { runSetupScript } = require('./setupRunner');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.loadFile('index.html');
}

function registerIpcHandlers() {
  ipcMain.handle('run-script', async () => runSetupScript());
}

function startApp() {
  registerIpcHandlers();

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });
}

if (require.main === module) {
  startApp();
}

module.exports = {
  createWindow,
  registerIpcHandlers,
  startApp
};
