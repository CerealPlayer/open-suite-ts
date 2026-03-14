import type { ChangeEventHandler } from 'react'

type TextInputProps = {
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  className?: string
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
}: TextInputProps) {
  const classes = `w-full rounded-md border border-slate-300 px-3 py-2 text-sm${
    className ? ` ${className}` : ''
  }`

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classes}
      />
    </div>
  )
}
