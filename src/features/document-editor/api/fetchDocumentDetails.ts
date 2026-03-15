import { API_BASE_URL } from "@/config/env";
import {
  mapDocumentDetails,
  parseDocumentDetailsPayload,
  type DocumentDetailsRecord,
} from "../types/documentDetails";

const DOCUMENTS_ENDPOINT = "/documents";

async function ensureSuccess(response: Response): Promise<Response> {
  if (response.ok) {
    return response;
  }

  const details = await response.text();
  throw new Error(details || `Request failed with status ${response.status}`);
}

export async function fetchDocumentDetails(
  documentId: string,
): Promise<DocumentDetailsRecord> {
  if (!documentId.trim()) {
    throw new Error("Document ID is required.");
  }

  const response = await fetch(
    `${API_BASE_URL}${DOCUMENTS_ENDPOINT}/${encodeURIComponent(documentId)}`,
  );
  const successfulResponse = await ensureSuccess(response);
  const payload: unknown = await successfulResponse.json();
  const parsedPayload = parseDocumentDetailsPayload(payload);
  return mapDocumentDetails(parsedPayload);
}
