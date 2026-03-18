import type { Schema } from 'prosemirror-model'
import type { ProseMirrorMarkJSON, ProseMirrorNodeJSON } from '../types/documentDetails'

const NODE_TYPE_ALIASES: Record<string, string> = {
  bulletList: 'bullet_list',
  orderedList: 'ordered_list',
  listItem: 'list_item',
  hardBreak: 'hard_break',
  codeBlock: 'code_block',
  horizontalRule: 'horizontal_rule',
}

const MARK_TYPE_ALIASES: Record<string, string> = {
  bold: 'strong',
  italic: 'em',
  strikeThrough: 'strike',
  strikethrough: 'strike',
  subScript: 'subscript',
  superScript: 'superscript',
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}

function normalizeType(type: string, aliases: Record<string, string>): string {
  return aliases[type] ?? type
}

function normalizeMark(
  mark: ProseMirrorMarkJSON,
  schema: Schema,
): ProseMirrorMarkJSON | null {
  const type = normalizeType(mark.type, MARK_TYPE_ALIASES)

  if (!schema.marks[type]) {
    return null
  }

  if (isRecord(mark.attrs)) {
    return {
      type,
      attrs: mark.attrs,
    }
  }

  return { type }
}

function normalizeMarks(
  marks: ProseMirrorMarkJSON[] | undefined,
  schema: Schema,
): ProseMirrorMarkJSON[] | undefined {
  if (!Array.isArray(marks) || marks.length === 0) {
    return undefined
  }

  const normalizedMarks = marks
    .filter((mark): mark is ProseMirrorMarkJSON => isRecord(mark) && typeof mark.type === 'string')
    .map((mark) => normalizeMark(mark, schema))
    .filter((mark): mark is ProseMirrorMarkJSON => mark !== null)

  return normalizedMarks.length > 0 ? normalizedMarks : undefined
}

function nodeIsInline(node: ProseMirrorNodeJSON, schema: Schema): boolean {
  return Boolean(schema.nodes[node.type]?.isInline)
}

function collectInlineNodes(nodes: ProseMirrorNodeJSON[], schema: Schema): ProseMirrorNodeJSON[] {
  const inlineNodes: ProseMirrorNodeJSON[] = []

  for (const node of nodes) {
    if (nodeIsInline(node, schema)) {
      inlineNodes.push(node)
      continue
    }

    if (Array.isArray(node.content)) {
      inlineNodes.push(...collectInlineNodes(node.content, schema))
    }
  }

  return inlineNodes
}

function inlineNodesToParagraph(nodes: ProseMirrorNodeJSON[]): ProseMirrorNodeJSON {
  const paragraph: ProseMirrorNodeJSON = { type: 'paragraph' }
  if (nodes.length > 0) {
    paragraph.content = nodes
  }
  return paragraph
}

function toBlockContent(nodes: ProseMirrorNodeJSON[], schema: Schema): ProseMirrorNodeJSON[] {
  const blocks: ProseMirrorNodeJSON[] = []
  let pendingInline: ProseMirrorNodeJSON[] = []

  for (const node of nodes) {
    if (nodeIsInline(node, schema)) {
      pendingInline.push(node)
      continue
    }

    if (pendingInline.length > 0) {
      blocks.push(inlineNodesToParagraph(pendingInline))
      pendingInline = []
    }

    if (node.type === 'list_item') {
      blocks.push({
        type: 'bullet_list',
        content: [toListItem(node, schema)],
      })
      continue
    }

    blocks.push(node)
  }

  if (pendingInline.length > 0) {
    blocks.push(inlineNodesToParagraph(pendingInline))
  }

  return blocks
}

function toListItem(node: ProseMirrorNodeJSON, schema: Schema): ProseMirrorNodeJSON {
  if (node.type === 'list_item') {
    const normalizedContent = Array.isArray(node.content)
      ? toListItemContent(node.content, schema)
      : [{ type: 'paragraph' } satisfies ProseMirrorNodeJSON]

    return {
      type: 'list_item',
      content: normalizedContent,
    }
  }

  if (nodeIsInline(node, schema)) {
    return {
      type: 'list_item',
      content: [inlineNodesToParagraph([node])],
    }
  }

  return {
    type: 'list_item',
    content: node.type === 'paragraph' ? [node] : [{ type: 'paragraph' }, node],
  }
}

function toListContent(nodes: ProseMirrorNodeJSON[], schema: Schema): ProseMirrorNodeJSON[] {
  return nodes.map((node) => toListItem(node, schema))
}

function toListItemContent(nodes: ProseMirrorNodeJSON[], schema: Schema): ProseMirrorNodeJSON[] {
  const blocks = toBlockContent(nodes, schema)
  if (blocks.length === 0 || blocks[0]?.type !== 'paragraph') {
    return [{ type: 'paragraph' }, ...blocks]
  }
  return blocks
}

function collectPlainText(nodes: ProseMirrorNodeJSON[]): string {
  let output = ''

  for (const node of nodes) {
    if (node.type === 'text' && typeof node.text === 'string') {
      output += node.text
      continue
    }

    if (node.type === 'hard_break') {
      output += '\n'
      continue
    }

    if (Array.isArray(node.content)) {
      output += collectPlainText(node.content)
    }
  }

  return output
}

function createNodeWithContent(type: string, content: ProseMirrorNodeJSON[]): ProseMirrorNodeJSON {
  const node: ProseMirrorNodeJSON = { type }
  if (content.length > 0) {
    node.content = content
  }
  return node
}

function normalizeNode(node: ProseMirrorNodeJSON, schema: Schema): ProseMirrorNodeJSON[] {
  const normalizedType = normalizeType(node.type, NODE_TYPE_ALIASES)
  const normalizedContent = Array.isArray(node.content)
    ? node.content.flatMap((child) => normalizeNode(child, schema))
    : []

  if (normalizedType === 'text') {
    if (typeof node.text !== 'string' || node.text.length === 0) {
      return []
    }

    const textNode: ProseMirrorNodeJSON = {
      type: 'text',
      text: node.text,
    }
    const marks = normalizeMarks(node.marks, schema)
    if (marks) {
      textNode.marks = marks
    }
    return [textNode]
  }

  if (!schema.nodes[normalizedType]) {
    return normalizedContent
  }

  const attrs = isRecord(node.attrs) ? node.attrs : undefined

  if (normalizedType === 'doc') {
    const blockContent = toBlockContent(normalizedContent, schema)
    return [createNodeWithContent('doc', blockContent.length > 0 ? blockContent : [{ type: 'paragraph' }])]
  }

  if (normalizedType === 'paragraph' || normalizedType === 'heading') {
    const inlineContent = collectInlineNodes(normalizedContent, schema)
    const nextNode = createNodeWithContent(normalizedType, inlineContent)
    if (attrs) {
      nextNode.attrs = attrs
    }
    return [nextNode]
  }

  if (normalizedType === 'blockquote') {
    const blockContent = toBlockContent(normalizedContent, schema)
    const nextNode = createNodeWithContent('blockquote', blockContent.length > 0 ? blockContent : [{ type: 'paragraph' }])
    if (attrs) {
      nextNode.attrs = attrs
    }
    return [nextNode]
  }

  if (normalizedType === 'ordered_list' || normalizedType === 'bullet_list') {
    const listContent = toListContent(normalizedContent, schema)
    const nextNode = createNodeWithContent(
      normalizedType,
      listContent.length > 0 ? listContent : [{ type: 'list_item', content: [{ type: 'paragraph' }] }],
    )
    if (attrs) {
      nextNode.attrs = attrs
    }
    return [nextNode]
  }

  if (normalizedType === 'list_item') {
    return [
      {
        type: 'list_item',
        content: toListItemContent(normalizedContent, schema),
      },
    ]
  }

  if (normalizedType === 'code_block') {
    const plainText = collectPlainText(normalizedContent)
    if (plainText.length === 0) {
      return [{ type: 'code_block' }]
    }
    return [
      {
        type: 'code_block',
        content: [{ type: 'text', text: plainText }],
      },
    ]
  }

  if (normalizedType === 'image') {
    if (!attrs || typeof attrs.src !== 'string' || attrs.src.trim().length === 0) {
      return []
    }

    return [
      {
        type: 'image',
        attrs,
      },
    ]
  }

  if (normalizedType === 'horizontal_rule' || normalizedType === 'hard_break') {
    return [{ type: normalizedType }]
  }

  const nextNode = createNodeWithContent(normalizedType, normalizedContent)
  if (attrs) {
    nextNode.attrs = attrs
  }
  return [nextNode]
}

export function normalizeProseMirrorJson(
  content: ProseMirrorNodeJSON,
  schema: Schema,
): ProseMirrorNodeJSON {
  const normalizedRootNodes = normalizeNode(content, schema)

  if (normalizedRootNodes[0]?.type === 'doc') {
    return normalizedRootNodes[0]
  }

  const normalizedDocumentContent = toBlockContent(normalizedRootNodes, schema)

  return {
    type: 'doc',
    content:
      normalizedDocumentContent.length > 0 ? normalizedDocumentContent : [{ type: 'paragraph' }],
  }
}
