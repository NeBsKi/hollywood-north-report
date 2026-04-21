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
import { DeleteYearMenuItem } from './delete-year-button'

export type YearRow = {
  id: string
  value: number
  createdAt: Date
  updatedAt: Date
}

const fmt = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export const columns: ColumnDef<YearRow>[] = [
  { accessorKey: 'value', header: 'Year' },
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
      const year = row.original
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
              <Link href={`/admin/filters/years/${year.id}/edit`}>
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteYearMenuItem id={year.id} value={year.value} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
