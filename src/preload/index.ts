import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  platform: process.platform,
  setTitleBarColors: (colors: { color: string; symbolColor: string }) =>
    ipcRenderer.send('titlebar:set-colors', colors),
  quit: () => ipcRenderer.send('app:quit')
})
