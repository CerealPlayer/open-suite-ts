import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { uploadDocument } from '../../lib/api'
import { API_BASE_URL, DOCUMENT_UPLOAD_ENDPOINT } from '../../lib/constants'
import { useDashboardStore } from '../../store/useDashboardStore'

const DOCX_MIME_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'

function isDocxFile(file: File): boolean {
  return file.name.toLowerCase().endsWith('.docx') || file.type === DOCX_MIME_TYPE
}

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const setLastSelectedDocxName = useDashboardStore((state) => state.setLastSelectedDocxName)
  const uploadMutation = useMutation({
    mutationFn: uploadDocument,
  })

  const fileSize = useMemo(() => {
    if (!selectedFile) {
      return null
    }

    const sizeInKb = selectedFile.size / 1024
    return `${sizeInKb.toFixed(1)} KB`
  }, [selectedFile])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      setSelectedFile(null)
      setLastSelectedDocxName(null)
      setStatusMessage('Please choose a DOCX file.')
      return
    }

    if (!isDocxFile(file)) {
      setSelectedFile(null)
      setLastSelectedDocxName(null)
      setStatusMessage('Only .docx files are allowed.')
      event.target.value = ''
      return
    }

    setSelectedFile(file)
    setLastSelectedDocxName(file.name)
    setStatusMessage(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedFile) {
      setStatusMessage('Select a DOCX file before uploading.')
      return
    }

    try {
      await uploadMutation.mutateAsync(selectedFile)
      setStatusMessage('Document uploaded successfully.')
      setSelectedFile(null)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Upload failed unexpectedly.'
      setStatusMessage(`Upload failed: ${errorMessage}`)
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Upload document</h2>
      <p className="mt-2 text-slate-600">
        Only DOCX files are supported in this first version of the dashboard.
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Endpoint: {API_BASE_URL}
        {DOCUMENT_UPLOAD_ENDPOINT}
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
            onChange={handleFileChange}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
          />
        </div>

        {selectedFile ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p>
              <strong>File:</strong> {selectedFile.name}
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
          disabled={uploadMutation.isPending}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          {uploadMutation.isPending ? 'Uploading...' : 'Upload document'}
        </button>
      </form>

      {statusMessage ? (
        <p className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
          {statusMessage}
        </p>
      ) : null}
    </section>
  )
}
