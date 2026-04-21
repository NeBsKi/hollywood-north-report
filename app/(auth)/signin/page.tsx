import { LoginForm } from './_components/login-form'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/get-session'

export default async function LoginPage() {
  const session = await getServerSession()
  const user = session?.user

  if (user) {
    redirect('/admin')
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
