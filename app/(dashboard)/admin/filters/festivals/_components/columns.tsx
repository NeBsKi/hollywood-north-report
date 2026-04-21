'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Pencil } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteFestivalMenuItem } from './delete-festival-button'

export type FestivalRow = {
  id: string
  name: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

const fmt = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export const columns: ColumnDef<FestivalRow>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'slug', header: 'Slug' },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => fmt.format(row.original.createdAt),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => fmt.format(row.original.updatedAt),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const festival = row.original
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
              <Link href={`/admin/filters/festivals/${festival.id}/edit`}>
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteFestivalMenuItem id={festival.id} name={festival.name} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
