import { BrowserWindow, dialog, ipcMain } from 'electron'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export interface DirEntry {
  name: string
  path: string
  isDir: boolean
}

export function registerFolderIpc(): void {
  ipcMain.handle('folder:open', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)!
    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    })

    if (canceled || filePaths.length === 0) return null
    return filePaths[0]
  })

  ipcMain.handle('folder:read', async (_event, dirPath: string): Promise<DirEntry[]> => {
    try {
      const entries = await readdir(dirPath, { withFileTypes: true })

      return entries
        .map((e) => ({
          name: e.name,
          path: join(dirPath, e.name),
          isDir: e.isDirectory()
        }))
        .sort((a, b) => {
          if (a.isDir !== b.isDir) return a.isDir ? -1 : 1
          return a.name.localeCompare(b.name)
        })
    } catch (err) {
      console.error('Error while reading folder: ', err)
      return []
    }
  })

  ipcMain.handle('file:read', async (_event, filePath: string): Promise<string | null> => {
    try {
      return await readFile(filePath, 'utf-8')
    } catch (err) {
      console.error('Error while reading file: ', err)
      return null
    }
  })
}