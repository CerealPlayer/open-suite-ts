import { Notice, Panel } from "@/components";
import { DocumentsSearch, useDocumentsSearch } from "@/features/doc-search";
import { useDocumentsList } from "@/features/docs-table/hooks/useDocumentsList";
import { getDocumentDetailsRoute } from "../routes";
import { DocumentsTable } from "@/features/docs-table/components/DocumentsTable";

export function DocumentsRoute() {
  const [search, setSearch] = useDocumentsSearch();
  const { documents, isLoading, isError, errorMessage, openDocument } =
    useDocumentsList({
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
        <DocumentsSearch search={search} setSearch={setSearch} />
      </div>
      {isLoading ? (
        <p className="text-sm text-slate-600">Loading documents...</p>
      ) : isError ? (
        <Notice variant="error">
          Failed to fetch documents: {errorMessage}
        </Notice>
      ) : (
        <DocumentsTable
          documents={documents ?? []}
          onRowClick={(row) => openDocument(row.id)}
        />
      )}
    </Panel>
  );
}
