import { create } from 'zustand'

interface FileState {
  filePath?: string
  content: string
  isDirty: boolean
  setContent: (content: string) => void
  loaded: (filePath: string, content: string) => void
  saved: (filePath: string) => void
  reset: () => void
}

export const useFileStore = create<FileState>((set) => ({
  filePath: undefined,
  content: '',
  isDirty: false,
  setContent: (content) => set({ content, isDirty: true }),
  loaded: (filePath, content) => set({ filePath, content, isDirty: false }),
  saved: (filePath) => set({ filePath, isDirty: false }),
  reset: () => set({ filePath: undefined, content: '', isDirty: false })
}))
