import { create } from 'zustand'

type DashboardState = {
  documentFilter: string
  lastSelectedDocxName: string | null
  setDocumentFilter: (value: string) => void
  setLastSelectedDocxName: (name: string | null) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  documentFilter: '',
  lastSelectedDocxName: null,
  setDocumentFilter: (value) => set({ documentFilter: value }),
  setLastSelectedDocxName: (name) => set({ lastSelectedDocxName: name }),
}))
