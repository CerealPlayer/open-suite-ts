import type { DocumentRecord } from "../types/document";
import { formatDate } from "../utils/formatDate";
import { formatSize } from "../utils/formatSize";

type DocumentsSectionProps = {
  documents: DocumentRecord[];
  onRowClick: (row: DocumentRecord) => void;
};

export function DocumentsTable({
  documents,
  onRowClick,
}: DocumentsSectionProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="px-4 py-3 font-semibold">Created at</th>
            <th className="px-4 py-3 font-semibold">Edited at</th>
            <th className="px-4 py-3 font-semibold">Size</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {documents.map((document) => (
            <tr
              key={document.id}
              tabIndex={0}
              onClick={() => onRowClick(document)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  onRowClick(document);
                }
              }}
              className="cursor-pointer transition hover:bg-slate-50 focus:bg-slate-100 focus:outline-none"
            >
              <td className="px-4 py-3 font-medium text-slate-900">
                {document.title}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {formatDate(document.created_at)}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {formatDate(document.edited_at)}
              </td>
              <td className="px-4 py-3 text-slate-700">
                {formatSize(document.size)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {documents.length === 0 ? (
        <p className="px-4 py-6 text-sm text-slate-600">No documents found.</p>
      ) : null}
    </div>
  );
}
