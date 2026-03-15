import type { EditorState } from 'prosemirror-state'
import { useEffect, type RefObject } from 'react'
import { EditorView } from 'prosemirror-view'

type UseProseMirrorViewOptions = {
  hostRef: RefObject<HTMLDivElement | null>
  editorState: EditorState | null
}

export function useProseMirrorView({ hostRef, editorState }: UseProseMirrorViewOptions) {
  useEffect(() => {
    const hostElement = hostRef.current

    if (!hostElement) {
      return
    }

    let editorView: EditorView | null = null

    try {
      hostElement.innerHTML = ''

      if (editorState) {
        editorView = new EditorView(
          { mount: hostElement },
          {
            state: editorState,
            editable: () => false,
          },
        )
      }
    } catch {
      hostElement.innerHTML = ''
    }

    return () => {
      editorView?.destroy()
      hostElement.innerHTML = ''
    }
  }, [editorState, hostRef])
}
