import { DocumentUpload } from "../../features/upload";
import { getDocumentDetailsRoute } from "../routes";

export function UploadRoute() {
  return <DocumentUpload toDocumentDetails={getDocumentDetailsRoute} />;
}
