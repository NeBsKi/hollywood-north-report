import { signIn } from '@/lib/auth-client'

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn.email({ email: 'test@test.com', password: 'test' })}>
        Sign In
      </button>
    </div>
  )
}
