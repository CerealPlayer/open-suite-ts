import { DocumentsSection } from "../../features/documents";
import { getDocumentDetailsRoute } from "../routes";

export function DocumentsRoute() {
  return <DocumentsSection getDocumentDetailsRoute={getDocumentDetailsRoute} />;
}
