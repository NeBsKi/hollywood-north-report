import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { requireAdmin } from '@/lib/require-role'
import { AboutPageForm } from './_components/about-page-form'
import { listAboutSections } from './_lib/queries'
import { toAboutPageFormValues } from './_lib/schemas'

export default async function AboutUsAdminPage() {
  await requireAdmin()

  const sections = await listAboutSections()

  return (
    <div>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <AboutPageForm initial={toAboutPageFormValues(sections)} />
    </div>
  )
}
