import { Node as ProseMirrorNode } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import type { ProseMirrorNodeJSON } from '../types/documentDetails'
import { documentEditorSchema } from './proseMirrorSchema'

export function createReadOnlyEditorState(content: ProseMirrorNodeJSON): EditorState {
  const documentNode = ProseMirrorNode.fromJSON(documentEditorSchema, content)

  return EditorState.create({
    schema: documentEditorSchema,
    doc: documentNode,
  })
}
