import { DocumentDetailsSection } from "../../features/documents";
import { appRoutes } from "../routes";

export function DocumentDetailsRoute() {
  return <DocumentDetailsSection documentsPath={appRoutes.documents} />;
}
