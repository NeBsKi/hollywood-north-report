'use client'

import { useMemo } from 'react'
import { DataTable } from './data-table'
import { buildColumns, type UserRow } from './columns'

export function UsersTable({
  currentUserId,
  rows,
  total,
  page,
  pageSize,
}: {
  currentUserId: string
  rows: UserRow[]
  total: number
  page: number
  pageSize: number
}) {
  const columns = useMemo(() => buildColumns(currentUserId), [currentUserId])
  return (
    <DataTable
      columns={columns}
      data={rows}
      total={total}
      page={page}
      pageSize={pageSize}
    />
  )
}
