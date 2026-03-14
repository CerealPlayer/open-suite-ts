import { Notice, Panel, TextInput } from "../../../components";
import { useDocumentsList } from "../hooks/useDocumentsList";
import { formatDate } from "../utils/formatDate";
import { formatSize } from "../utils/formatSize";

type DocumentsSectionProps = {
  getDocumentDetailsRoute: (id: string) => string;
};

export function DocumentsSection({
  getDocumentDetailsRoute,
}: DocumentsSectionProps) {
  const {
    documentFilter,
    setDocumentFilter,
    documents,
    isLoading,
    isError,
    errorMessage,
    openDocument,
  } = useDocumentsList({
    toDocumentDetails: getDocumentDetailsRoute,
  });
  return (
    <Panel as="section" className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Documents</h2>
          <p className="mt-1 text-slate-600">
            Click a row to open the document details route.
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <TextInput
            id="document-filter"
            label="Filter by title"
            value={documentFilter}
            onChange={(e) => setDocumentFilter(e.target.value)}
            placeholder="Search documents..."
          />
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-slate-600">Loading documents...</p>
      ) : isError ? (
        <Notice variant="error">
          Failed to fetch documents: {errorMessage}
        </Notice>
      ) : (
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
                  onClick={() => openDocument(document.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      openDocument(document.id);
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
            <p className="px-4 py-6 text-sm text-slate-600">
              No documents found.
            </p>
          ) : null}
        </div>
      )}
    </Panel>
  );
}
