import { create } from 'zustand'

type UploadState = {
  lastSelectedDocxName: string | null
  setLastSelectedDocxName: (name: string | null) => void
}

export const useUploadStore = create<UploadState>((set) => ({
  lastSelectedDocxName: null,
  setLastSelectedDocxName: (name) => set({ lastSelectedDocxName: name }),
}))
