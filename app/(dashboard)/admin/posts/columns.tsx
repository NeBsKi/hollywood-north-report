'use client'

import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'
import { Copy, MoreHorizontal, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Post } from '@/generated/prisma/client'
import { DeletePostMenuItem } from './_components/delete-post-button'

export type PostColumns = Pick<Post, 'id' | 'title' | 'slug' | 'status' | 'publishDate'>

const fmt = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export const columns: ColumnDef<PostColumns>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'publishDate',
    header: 'Publish Date',
    cell: ({ row }) => fmt.format(row.original.publishDate),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const post = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(post.id)}>
              <Copy /> Post ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/posts/${post.id}/edit`}>
                <Pencil />
                Edit
              </Link>
            </DropdownMenuItem>
            <DeletePostMenuItem id={post.id} title={post.title} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  // ...
]
