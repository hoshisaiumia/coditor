import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    api: {
      platform: NodeJS.Platform
      setTitleBarColors: (colors: { color: string; symbolColor: string }) => void
      quit: () => void
      openFile: () => Promise<{ filePath: string; content: string } | null>
      saveFile: (data: string, filePath?: string) => void
      onZoom: (cb: (action: 'in' | 'out' | 'reset') => void) => void
    }
    electron: ElectronAPI
  }
}

export {}
