/*const { contextBridge, ipcRenderer } = require('electron');
window.api = require('electron').ipcRenderer;

contextBridge.exposeInMainWorld('api', {
  send: (channel, ...data) => {
    ipcRenderer.send(channel, ...data);
  }
});

*/