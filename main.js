const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs/promises');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // изоляция контекста (значение по умолчанию)
      nodeIntegration: false    // в renderer нет прямого доступа к Node.js
    }
  });
  mainWindow.loadFile('index.html');
}

// Задание 3: чтение каталога средствами Node.js в главном процессе
ipcMain.handle('list-dir', async (event, dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.map(e => ({ name: e.name, isDir: e.isDirectory() }));
});

// Задание 4 (вариант 1): системный диалог выбора каталога
ipcMain.handle('choose-dir', async () => {
  const win = BrowserWindow.getFocusedWindow() || mainWindow;
  const result = await dialog.showOpenDialog(win, {
    title: 'Выберите каталог',
    defaultPath: process.cwd(),       // начинаем с рабочего каталога приложения
    properties: ['openDirectory']
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
