export type DocumentRecord = {
  id: string
  title: string
  created_at: string
  edited_at: string
  size: number
}

export type DocumentApiRecord = {
  id: string
  path: string
  file_name: string
  size: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}
