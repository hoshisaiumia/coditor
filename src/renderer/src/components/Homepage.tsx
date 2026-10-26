import { ReactElement } from 'react'
import CodeEditor from './CodeEditor'
import FileTree from './FileTree'
import { useFileStore } from '@renderer/store/file.store'
import { useWorkspaceStore } from '@renderer/store/folder.store'

export function Homepage(): ReactElement {
  const folderPath = useWorkspaceStore((s) => s.folderPath)

  async function handleOpenFile(path: string): Promise<void> {
    const text = await window.api.readFile(path)
    if (text !== null) useFileStore.getState().loaded(path, text)
  }

  async function handleOpenFolder(): Promise<void> {
    const path = await window.api.openFolder()
    if (path) useWorkspaceStore.getState().setFolderPath(path)
  }

  return (
    <div className="flex h-full">
      <aside className="w-64 shrink-0 border-r border-border-line">
        {folderPath ? (
          <FileTree rootPath={folderPath} onOpenFile={handleOpenFile} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 p-4 text-center text-sm opacity-70 text-tree-item">
            <p>Abra uma pasta para começar</p>
            <button
              onClick={handleOpenFolder}
              className="px-3 py-1 rounded border border-border-line hover:bg-white/10 text-tree-item"
            >
              Abrir pasta
            </button>
          </div>
        )}
      </aside>

      <div className="flex-1 min-w-0">
        <CodeEditor />
      </div>
    </div>
  )
}
