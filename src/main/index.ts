import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import registerAllIpc from './ipc'

const isMac = process.platform === 'darwin'
registerAllIpc()

function createWindow(): void {
  const win = new BrowserWindow({
    width: 1100,
    height: 720,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#141414',
    titleBarStyle: 'hidden',
    ...(isMac
      ? {}
      : {
          titleBarOverlay: {
            color: '#141414',
            symbolColor: '#d7d7d7',
            height: 32
          }
        }),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true
    }
  })
  const wc = win.webContents

  wc.on('render-process-gone', (_e, details) => console.error('Renderer morreu:', details))

  wc.on('did-fail-load', (_e, code, desc, url) =>
    console.error('Falhou ao carregar:', code, desc, url)
  )
  wc.on('preload-error', (_e, path, error) => console.error('Erro no preload:', path, error))

  wc.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown' || !(input.control || input.meta)) return

    let action: 'in' | 'out' | 'reset'
    if (input.key === '+' || input.key === '=') action = 'in'
    else if (input.key === '-' || input.key === '_') action = 'out'
    else if (input.key === '0') action = 'reset'
    else return

    event.preventDefault()
    wc.send('zoom:change', action)
  })

  wc.on('did-finish-load', () => {
    wc.setZoomLevel(0)
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    wc.openDevTools({ mode: 'detach' })
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.on('titlebar:set-colors', (e, colors: { color: string; symbolColor: string }) => {
  if (isMac) return

  BrowserWindow.fromWebContents(e.sender)?.setTitleBarOverlay(colors)
})

ipcMain.on('app:quit', () => {
  app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (!isMac) app.quit()
})
