import { Node as ProseMirrorNode } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import type { ProseMirrorNodeJSON } from '../types/documentDetails'
import { normalizeProseMirrorJson } from './normalizeProseMirrorJson'
import { documentEditorSchema } from './proseMirrorSchema'

export function createReadOnlyEditorState(content: ProseMirrorNodeJSON): EditorState {
  const normalizedContent = normalizeProseMirrorJson(content, documentEditorSchema)
  const documentNode = ProseMirrorNode.fromJSON(documentEditorSchema, normalizedContent)

  return EditorState.create({
    schema: documentEditorSchema,
    doc: documentNode,
  })
}
