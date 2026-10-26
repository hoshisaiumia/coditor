import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  platform: process.platform,
  setTitleBarColors: (colors: { color: string; symbolColor: string }) =>
    ipcRenderer.send('titlebar:set-colors', colors),
  quit: () => ipcRenderer.send('app:quit'),
  openFile: (): Promise<{ filePath: string; content: string } | null> =>
    ipcRenderer.invoke('file:open'),
  saveFile: (data: string, filePath?: string) => ipcRenderer.invoke('file:save', data, filePath),
  onZoom: (cb: (action: 'in' | 'out' | 'reset') => void): (() => void) => {
    const listener = (_e: Electron.IpcRendererEvent, action: 'in' | 'out' | 'reset'): void =>
      cb(action)
    ipcRenderer.on('zoom:change', listener)
    return () => ipcRenderer.removeListener('zoom:change', listener)
  }
})
