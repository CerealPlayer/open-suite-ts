import type { PropsWithChildren } from 'react'

type PanelProps = PropsWithChildren<{
  as?: 'div' | 'section'
  className?: string
}>

export function Panel({ as = 'div', className, children }: PanelProps) {
  const Component = as
  const classes = `rounded-xl border border-slate-200 bg-white p-6 shadow-sm${
    className ? ` ${className}` : ''
  }`

  return <Component className={classes}>{children}</Component>
}
