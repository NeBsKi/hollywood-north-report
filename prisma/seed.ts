import 'dotenv/config'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME ?? 'Admin'

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set to seed the first admin.')
  }

  const existing = await prisma.user.findUnique({ where: { email } })

  if (existing) {
    if (existing.role !== 'ADMIN') {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'ADMIN' },
      })
      console.log(`Promoted existing user ${email} to ADMIN.`)
    } else {
      console.log(`User ${email} is already ADMIN. Nothing to do.`)
    }
    return
  }

  await auth.api.signUpEmail({
    body: { email, password, name },
    headers: new Headers(),
  })

  await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  })

  console.log(`Created admin user ${email}.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
