import { useSearchStore } from "../stores/useSearchStore";

export function useDocumentsSearch(): [string, (value: string) => void] {
  const search = useSearchStore((state) => state.search);
  const setSearch = useSearchStore((state) => state.setSearch);

  return [search, setSearch];
}
