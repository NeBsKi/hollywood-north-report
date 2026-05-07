import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client'

export const isUniqueViolation = (e: unknown, field?: string) =>
  e instanceof PrismaClientKnownRequestError &&
  e.code === 'P2002' &&
  (!field || (e.meta?.target as string[] | undefined)?.includes(field))

export const isForeignKeyViolation = (e: unknown, field?: string) =>
  e instanceof PrismaClientKnownRequestError &&
  e.code === 'P2003' &&
  (!field || (e.meta?.field_name as string | undefined)?.includes(field))
