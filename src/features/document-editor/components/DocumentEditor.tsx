import { Notice } from '@/components'
import { useMemo, useRef } from 'react'
import { useProseMirrorView } from '../hooks/useProseMirrorView'
import type { ProseMirrorNodeJSON } from '../types/documentDetails'
import { createReadOnlyEditorState } from '../utils/createReadOnlyEditorState'

type DocumentEditorProps = {
  content: ProseMirrorNodeJSON
}

export function DocumentEditor({ content }: DocumentEditorProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const { editorState, errorMessage } = useMemo(() => {
    try {
      return {
        editorState: createReadOnlyEditorState(content),
        errorMessage: null,
      }
    } catch (error) {
      const errorDetails =
        error instanceof Error ? error.message : 'Unexpected ProseMirror rendering error.'
      return {
        editorState: null,
        errorMessage: `Could not render document content: ${errorDetails}`,
      }
    }
  }, [content])

  useProseMirrorView({ hostRef, editorState })

  return (
    <section className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Content</h3>
      {errorMessage ? <Notice variant="error">{errorMessage}</Notice> : null}
      <div className="rounded-lg border border-slate-200 bg-white">
        <div
          ref={hostRef}
          className="min-h-40 px-4 py-3 text-slate-800 [&_.ProseMirror]:outline-none [&_.ProseMirror]:whitespace-pre-wrap [&_.ProseMirror_p]:mb-3 [&_.ProseMirror_p:last-child]:mb-0"
        />
      </div>
    </section>
  )
}
