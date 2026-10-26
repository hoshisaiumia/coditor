import { create } from 'zustand'

interface WorkspaceState {
  folderPath: string | undefined
  setFolderPath: (folderPath: string) => void
  closeFolder: () => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  folderPath: undefined,
  setFolderPath: (folderPath) => set({ folderPath }),
  closeFolder: () => set({ folderPath: undefined })
}))
