import { Notice, Panel, PanelLink } from '../../../components'

type HomePageContentProps = {
  uploadPath: string
  documentsPath: string
  lastSelectedDocxName: string | null
}

export function HomePageContent({
  uploadPath,
  documentsPath,
  lastSelectedDocxName,
}: HomePageContentProps) {
  return (
    <section className="space-y-8">
      <Panel>
        <h2 className="text-2xl font-semibold text-slate-900">Welcome</h2>
        <p className="mt-2 text-slate-600">
          Use this dashboard to upload DOCX files and browse documents available in
          the service.
        </p>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <PanelLink to={uploadPath}>
          <h3 className="text-lg font-semibold text-slate-900">Upload a document</h3>
          <p className="mt-1 text-slate-600">
            Select and validate a `.docx` file before submitting it to the service.
          </p>
        </PanelLink>

        <PanelLink to={documentsPath}>
          <h3 className="text-lg font-semibold text-slate-900">View documents</h3>
          <p className="mt-1 text-slate-600">
            Explore the current document list and open details for each record.
          </p>
        </PanelLink>
      </div>

      {lastSelectedDocxName ? (
        <Notice>
          Last selected DOCX: <strong>{lastSelectedDocxName}</strong>
        </Notice>
      ) : null}
    </section>
  )
}
