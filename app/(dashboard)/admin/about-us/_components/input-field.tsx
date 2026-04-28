import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type InputFieldProps = {
  label: string
  name: string
  defaultValue?: string
  value?: string
  error?: string
} & Omit<React.ComponentProps<typeof Input>, 'id' | 'name'>

export function InputField({ label, name, defaultValue, value, error, ...rest }: InputFieldProps) {
  const isControlled = value !== undefined
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        aria-invalid={!!error || undefined}
        {...(isControlled ? { value, defaultValue: undefined } : { defaultValue, value: undefined })}
        {...rest}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
