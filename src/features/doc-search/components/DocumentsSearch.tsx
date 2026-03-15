import { TextInput } from "@/components";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export function DocumentsSearch({ search, setSearch }: Props) {
  return (
    <div className="w-full sm:max-w-xs">
      <TextInput
        id="document-filter"
        label="Filter by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search documents..."
      />
    </div>
  );
}
