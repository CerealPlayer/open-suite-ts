import type { ChangeEventHandler, SubmitEventHandler } from "react";
import { Notice, Panel } from "../../../components";

type UploadDocumentSectionProps = {
  uploadEndpoint: string;
  selectedFileName: string | null;
  fileSize: string | null;
  statusMessage: string | null;
  isUploading: boolean;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

export function UploadDocumentSection({
  uploadEndpoint,
  selectedFileName,
  fileSize,
  statusMessage,
  isUploading,
  onFileChange,
  onSubmit,
}: UploadDocumentSectionProps) {
  return (
    <Panel as="section">
      <h2 className="text-2xl font-semibold text-slate-900">Upload document</h2>
      <p className="mt-2 text-slate-600">
        Only DOCX files are supported in this first version of the dashboard.
      </p>
      <p className="mt-1 text-xs text-slate-500">Endpoint: {uploadEndpoint}</p>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="docx-file"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Select DOCX file
          </label>
          <input
            id="docx-file"
            name="docx-file"
            type="file"
            accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onFileChange}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
          />
        </div>

        {selectedFileName ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p>
              <strong>File:</strong> {selectedFileName}
            </p>
            <p>
              <strong>Size:</strong> {fileSize}
            </p>
            <p>
              <strong>Type:</strong> DOCX
            </p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isUploading}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isUploading ? "Uploading..." : "Upload document"}
        </button>
      </form>

      {statusMessage ? <Notice className="mt-4">{statusMessage}</Notice> : null}
    </Panel>
  );
}
