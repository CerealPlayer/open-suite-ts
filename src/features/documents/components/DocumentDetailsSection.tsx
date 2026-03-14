import { Link } from "react-router-dom";
import { Panel } from "../../../components";
import { useDocumentDetails } from "../hooks/useDocumentDetails";

type DocumentDetailsSectionProps = {
  documentsPath: string;
};

export function DocumentDetailsSection({
  documentsPath,
}: DocumentDetailsSectionProps) {
  const { documentId } = useDocumentDetails();
  return (
    <Panel as="section" className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        Document details
      </h2>
      <p className="text-slate-700">
        Placeholder page for document: <strong>{documentId}</strong>
      </p>
      <p className="text-slate-600">
        This route is ready. Full details content will be added in a future
        iteration.
      </p>
      <Link
        to={documentsPath}
        className="inline-flex rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
      >
        Back to documents
      </Link>
    </Panel>
  );
}
