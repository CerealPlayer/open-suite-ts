import { create } from 'zustand'

type DocumentsState = {
  documentFilter: string
  setDocumentFilter: (value: string) => void
}

export const useDocumentsStore = create<DocumentsState>((set) => ({
  documentFilter: '',
  setDocumentFilter: (value) => set({ documentFilter: value }),
}))
