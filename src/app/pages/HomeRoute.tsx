import { HomePageContent } from '../../features/home'
import { useLastSelectedDocxName } from '../../features/upload'
import { appRoutes } from '../routes'

export function HomeRoute() {
  const lastSelectedDocxName = useLastSelectedDocxName()

  return (
    <HomePageContent
      uploadPath={appRoutes.upload}
      documentsPath={appRoutes.documents}
      lastSelectedDocxName={lastSelectedDocxName}
    />
  )
}
