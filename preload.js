const { contextBridge, ipcRenderer } = require('electron');

// Безопасный мост: renderer получает только эти две функции
contextBridge.exposeInMainWorld('api', {
  listDir: (dir) => ipcRenderer.invoke('list-dir', dir),
  chooseDir: () => ipcRenderer.invoke('choose-dir')
});
