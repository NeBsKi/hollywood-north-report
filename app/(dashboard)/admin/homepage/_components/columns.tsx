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
import { LAYOUT_LABELS, type HomePageLayoutKeyValue } from '../_lib/types'
import { DeleteSectionMenuItem } from './delete-section-button'

export type HomeSectionRow = {
  id: string
  title: string
  layoutKey: HomePageLayoutKeyValue
  sortOrder: number
  postLimit: number | null
  isPublished: boolean
  category: { id: string; name: string } | null
}

export const columns: ColumnDef<HomeSectionRow>[] = [
  { accessorKey: 'sortOrder', header: 'Order' },
  { accessorKey: 'title', header: 'Title' },
  {
    accessorKey: 'layoutKey',
    header: 'Layout',
    cell: ({ row }) => LAYOUT_LABELS[row.original.layoutKey],
  },
  {
    id: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category = row.original.category
      return category ? (
        category.name
      ) : (
        <Badge variant="outline" className="text-muted-foreground">
          None
        </Badge>
      )
    },
  },
  {
    accessorKey: 'postLimit',
    header: 'Limit',
    cell: ({ row }) => row.original.postLimit ?? <span className="text-muted-foreground">Default</span>,
  },
  {
    accessorKey: 'isPublished',
    header: 'Status',
    cell: ({ row }) =>
      row.original.isPublished ? (
        <Badge>Published</Badge>
      ) : (
        <Badge variant="secondary">Hidden</Badge>
      ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const section = row.original
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
              <Link href={`/admin/homepage/${section.id}/edit`}>
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteSectionMenuItem id={section.id} title={section.title} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
