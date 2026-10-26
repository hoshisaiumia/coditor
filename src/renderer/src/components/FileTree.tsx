import { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight, FaFileCode, FaFolder } from 'react-icons/fa'

interface TreeNodeProps {
  entry: DirEntry
  depth: number
  onOpenFile: (path: string) => void
}

function TreeNode({ entry, depth, onOpenFile }: TreeNodeProps): React.JSX.Element {
  const [open, setOpen] = useState(false)
  const [children, setChildren] = useState<DirEntry[] | null>(null)

  async function handleClick(): Promise<void> {
    if (!entry.isDir) {
      onOpenFile(entry.path)
      return
    }

    if (!open && children === null) {
      setChildren(await window.api.readFolder(entry.path))
    }
    setOpen(!open)
  }

  return entry ? (
    <div>
      <div
        onClick={handleClick}
        style={{ paddingLeft: depth * 12 + 8 }}
        className="flex items-center gap-1 py-0.5 cursor-pointer select-none truncate hover:bg-white/10"
      >
        {entry.isDir ? (
          <span className="shrink-0 text-xs opacity-70 w-7 flex justify-center items-center gap-1">
            {open ? <FaChevronDown size={10} /> : <FaChevronRight size={10} />}
            <FaFolder size={15} />
          </span>
        ) : (
          <span className="shrink-0 text-xs opacity-70 w-7 flex justify-end items-center gap-1">
            <FaFileCode size={15} />
          </span>
        )}

        <span className="truncate">{entry.name}</span>
      </div>

      {open &&
        children?.map((child) => (
          <TreeNode key={child.path} entry={child} depth={depth + 1} onOpenFile={onOpenFile} />
        ))}
    </div>
  ) : (
    <>
      <h1>Open a file to start</h1>
    </>
  )
}

interface FileTreeProps {
  rootPath: string
  onOpenFile: (path: string) => void
}

export default function FileTree({ rootPath, onOpenFile }: FileTreeProps): React.JSX.Element {
  const [entries, setEntries] = useState<DirEntry[]>([])

  useEffect(() => {
    window.api.readFolder(rootPath).then(setEntries)
  }, [rootPath])

  return (
    <div className="h-full overflow-auto text-sm text-tree-item">
      {entries.map((entry) => (
        <TreeNode key={entry.path} entry={entry} depth={0} onOpenFile={onOpenFile} />
      ))}
    </div>
  )
}
