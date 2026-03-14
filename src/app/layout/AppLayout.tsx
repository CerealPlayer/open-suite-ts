import { NavLink, Outlet } from 'react-router-dom'
import { appRoutes } from '../routes'

const navClassName = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-200'
  }`

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Open Suite
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Document Management Dashboard
            </h1>
          </div>
          <nav className="flex gap-2">
            <NavLink to={appRoutes.home} end className={navClassName}>
              Home
            </NavLink>
            <NavLink to={appRoutes.upload} className={navClassName}>
              Upload
            </NavLink>
            <NavLink to={appRoutes.documents} className={navClassName}>
              Documents
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
