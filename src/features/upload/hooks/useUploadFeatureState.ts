import { useUploadStore } from '../stores/useUploadStore'

export function useLastSelectedDocxName(): string | null {
  return useUploadStore((state) => state.lastSelectedDocxName)
}
