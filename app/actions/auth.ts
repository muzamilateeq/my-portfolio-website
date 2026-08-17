'use server'

import { SignJWT } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-muzammil-001')

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Hardcoded credentials requested by user
  if (email === 'muzamilateeq423@gmail.com' && password === 'Muzamil@001') {
    const alg = 'HS256'
    
    const jwt = await new SignJWT({ email })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(SECRET)

    const cookieStore = await cookies()
    cookieStore.set('admin-token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return { success: true }
  }

  return { success: false, error: 'Invalid email or password' }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin-token')
}
