import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  platform: process.platform,
  setTitleBarColors: (colors: { color: string; symbolColor: string }) =>
    ipcRenderer.send('titlebar:set-colors', colors),
  quit: () => ipcRenderer.send('app:quit'),
  openFile: (): Promise<{ filePath: string; content: string } | null> =>
    ipcRenderer.invoke('file:open'),
  saveFile: (data: string, filePath?: string) => ipcRenderer.invoke('file:save', data, filePath)
})
