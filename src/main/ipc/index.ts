import { registerFileIpc } from './file.ipc'
import { registerFolderIpc } from './folder.ipc'

export default function registerAllIpc(): void {
  registerFileIpc()
  registerFolderIpc()
}
