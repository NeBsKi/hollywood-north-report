import * as React from 'react'
import Link from 'next/link'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { BookOpenIcon, LayoutDashboardIcon, FileTextIcon, UsersIcon } from 'lucide-react'
import { getServerSession } from '@/lib/get-session'
import { Logo } from './shared/logo'
import { Role } from '@/lib/roles'

type NavItem = {
  title: string
  url: string
  icon?: React.ReactNode
  roles?: Role[]
  items?: NavItem[]
}

const navMain: NavItem[] = [
  { title: 'Dashboard', url: '/admin', icon: <LayoutDashboardIcon />, roles: ['ADMIN'] },
  {
    title: 'Posts',
    url: '#',
    icon: <FileTextIcon />,
    items: [
      {
        title: 'All Posts',
        url: '/admin/posts',
      },
      {
        title: 'Create Post',
        url: '/admin/posts/new',
      },
    ],
  },
  {
    title: 'Categories',
    url: '#',
    icon: <BookOpenIcon />,
    items: [
      {
        title: 'All Categories',
        url: '/admin/categories',
      },
      {
        title: 'Create Category',
        url: '/admin/categories/new',
      },
    ],
  },
  {
    title: 'Users',
    url: '#',
    icon: <UsersIcon />,
    roles: ['ADMIN'],
    items: [
      {
        title: 'All Users',
        url: '/admin/users',
      },
      {
        title: 'Create User',
        url: '/admin/users/new',
      },
    ],
  },
]

const canSee = (item: NavItem, role: Role) => !item.roles || item.roles.includes(role)

function filterByRole(items: NavItem[], role: Role): NavItem[] {
  return items.flatMap((item) => {
    if (!canSee(item, role)) return []
    if (!item.items) return item
    const children = filterByRole(item.items, role)
    return children.length ? { ...item, items: children } : []
  })
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = await getServerSession()
  const user = session?.user

  if (!user) return null

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Logo className="h-5 max-w-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Hollywood North Report</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filterByRole(navMain, user.role as Role)} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
