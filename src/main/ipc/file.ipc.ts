import { ipcMain, dialog, BrowserWindow } from 'electron'
import { loadFile, saveFile } from '../services/file.service'

export function registerFileIpc(): void {
  // Open file
  ipcMain.handle('file:open', async (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)!

    const { canceled, filePaths } = await dialog.showOpenDialog(win, {
      properties: ['openFile'],
      title: 'Load file',
      filters: [
        { name: 'C', extensions: ['c', 'h'] },
        { name: 'C#', extensions: ['cs'] },
        { name: 'CSS', extensions: ['css', 'scss', 'sass'] },
        { name: 'All files', extensions: ['*'] }
      ]
    })

    if (canceled) return null

    const content = await loadFile(filePaths[0])

    if (content === null) return null

    return { filePath: filePaths[0], content }
  })

  // Save file
  ipcMain.handle('file:save', async (event, data: string, filePath?: string) => {
    const win = BrowserWindow.fromWebContents(event.sender)!
    let targetPath = filePath

    if (!targetPath) {
      const { canceled, filePath } = await dialog.showSaveDialog(win, {
        defaultPath: 'Untitled.txt'
      })

      if (canceled || !filePath) return null
      targetPath = filePath
    }

    const ok = await saveFile(targetPath, data)
    return ok ? targetPath : null
  })
}
