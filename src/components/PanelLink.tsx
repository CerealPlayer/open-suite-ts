import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type PanelLinkProps = PropsWithChildren<{
  to: string
  className?: string
}>

export function PanelLink({ to, className, children }: PanelLinkProps) {
  const classes =
    `rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 hover:shadow` +
    (className ? ` ${className}` : '')

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  )
}
