export const ROLES = ['ADMIN', 'USER'] as const
export type Role = (typeof ROLES)[number]

export const isAdmin = (role?: Role | null) => role === 'ADMIN'
