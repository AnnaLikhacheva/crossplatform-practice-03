const { contextBridge, ipcRenderer } = require('electron');

// Безопасный мост: renderer получает только функцию listDir
contextBridge.exposeInMainWorld('api', {
  listDir: (dir) => ipcRenderer.invoke('list-dir', dir)
});
