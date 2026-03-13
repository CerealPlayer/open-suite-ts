import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from './ui/layout/DashboardLayout'
import { DocumentDetailsPage } from './ui/pages/DocumentDetailsPage'
import { DocumentsPage } from './ui/pages/DocumentsPage'
import { HomePage } from './ui/pages/HomePage'
import { UploadPage } from './ui/pages/UploadPage'

export const routes = {
  home: '/',
  upload: '/upload',
  documents: '/documents',
  documentDetails: '/documents/:documentId',
} as const

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: routes.upload,
        element: <UploadPage />,
      },
      {
        path: routes.documents,
        element: <DocumentsPage />,
      },
      {
        path: routes.documentDetails,
        element: <DocumentDetailsPage />,
      },
    ],
  },
])
