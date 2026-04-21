'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Role } from '@/lib/roles'
import { DeleteUserMenuItem } from './delete-user-button'

export type UserRow = {
  id: string
  name: string
  email: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

const fmt = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export const buildColumns = (currentUserId: string): ColumnDef<UserRow>[] => [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={row.original.role === 'ADMIN' ? 'default' : 'secondary'}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => fmt.format(row.original.createdAt),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original
      const isSelf = user.id === currentUserId
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/users/${user.id}/edit`}>
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
            {!isSelf && (
              <>
                <DropdownMenuSeparator />
                <DeleteUserMenuItem id={user.id} label={user.name || user.email} />
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
