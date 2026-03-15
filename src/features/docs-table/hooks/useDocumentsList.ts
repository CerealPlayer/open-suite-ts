import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchDocuments } from "../api/fetchDocuments";

type UseDocumentsListOptions = {
  toDocumentDetails: (documentId: string) => string;
};

export function useDocumentsList({
  toDocumentDetails,
}: UseDocumentsListOptions) {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["documents"],
    queryFn: fetchDocuments,
  });

  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  const openDocument = (documentId: string) => {
    navigate(toDocumentDetails(documentId));
  };

  return {
    documents: data,
    isLoading,
    isError,
    errorMessage,
    openDocument,
  };
}
