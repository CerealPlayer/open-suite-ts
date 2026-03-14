import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { DocumentDetailsRoute } from './pages/DocumentDetailsRoute'
import { DocumentsRoute } from './pages/DocumentsRoute'
import { HomeRoute } from './pages/HomeRoute'
import { UploadRoute } from './pages/UploadRoute'
import { appRoutes } from './routes'

export const router = createBrowserRouter([
  {
    path: appRoutes.home,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: appRoutes.upload,
        element: <UploadRoute />,
      },
      {
        path: appRoutes.documents,
        element: <DocumentsRoute />,
      },
      {
        path: appRoutes.documentDetails,
        element: <DocumentDetailsRoute />,
      },
    ],
  },
])
