import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type ButtonLinkProps = PropsWithChildren<{
  to: string
  className?: string
}>

export function ButtonLink({ to, className, children }: ButtonLinkProps) {
  const classes =
    'inline-flex rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100' +
    (className ? ` ${className}` : '')

  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  )
}
