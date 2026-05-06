import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { requireAdmin } from '@/lib/require-role'
import { listAboutPageBlocks } from './_lib/queries'
import { defaultEmptyBlock } from './_lib/types'
import { toAboutBlockDrafts } from './_lib/schemas'
import { AboutPageForm } from './_components/about-page-form'

export const dynamic = 'force-dynamic'

export default async function AboutUsAdminPage() {
  await requireAdmin()

  const rows = await listAboutPageBlocks()
  const drafts = toAboutBlockDrafts(rows)
  const initial = drafts.length > 0 ? drafts : [defaultEmptyBlock()]

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <AboutPageForm initial={initial} />
    </div>
  )
}
