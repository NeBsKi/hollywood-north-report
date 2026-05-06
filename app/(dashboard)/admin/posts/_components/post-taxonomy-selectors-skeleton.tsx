function SelectorSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium">{label}</p>
      <div className="h-9 w-full animate-pulse rounded-md border bg-muted/50" />
    </div>
  )
}

export function PostTaxonomySelectorsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SelectorSkeleton label="Categories" />
      <SelectorSkeleton label="Genres" />
      <SelectorSkeleton label="Festivals" />
      <SelectorSkeleton label="Years" />
    </div>
  )
}
