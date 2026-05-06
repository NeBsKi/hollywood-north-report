export type SelectorOption = string | { value: string; label: string }

export function normalizeSelectorOptions(options: SelectorOption[]) {
  return options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  )
}
