import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface DirEntry {
    name: string
    path: string
    isDir: boolean
  }

  interface Window {
    api: {
      platform: NodeJS.Platform
      setTitleBarColors: (colors: { color: string; symbolColor: string }) => void
      quit: () => void
      openFile: () => Promise<{ filePath: string; content: string } | null>
      saveFile: (data: string, filePath?: string) => Promise<string | null>
      onZoom: (cb: (action: 'in' | 'out' | 'reset') => void) => () => void
      openFolder: () => Promise<string | null>
      readFolder: (path: string) => Promise<DirEntry[]>
      readFile: (path: string) => Promise<string | null>
    }
    electron: ElectronAPI
  }
}

export {}
