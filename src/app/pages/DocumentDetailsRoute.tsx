import { Panel } from "@/components";
import { Link, useParams } from "react-router-dom";
import { appRoutes } from "../routes";

export function DocumentDetailsRoute() {
  let { documentId } = useParams();
  documentId = documentId ?? "unknown";
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
        to={appRoutes.documents}
        className="inline-flex rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
      >
        Back to documents
      </Link>
    </Panel>
  );
}
