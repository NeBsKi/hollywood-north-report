import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function PostCoverImageField() {
  return (
    <div className="space-y-2 rounded-lg border p-4">
      <Label htmlFor="cover-image-area">Cover image</Label>
      {/* <input type="hidden" name="coverImageId" defaultValue="" /> */}
      <div
        id="cover-image-area"
        className="border-muted-foreground/30 bg-muted/15 flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 py-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button type="button" variant="secondary" size="sm">
            Create new
          </Button>
          <span className="text-muted-foreground text-sm">or</span>
          <Button type="button" variant="secondary" size="sm">
            Choose from existing
          </Button>
        </div>
        <p className="text-muted-foreground text-center text-xs">or drag and drop a file</p>
      </div>
    </div>
  )
}
