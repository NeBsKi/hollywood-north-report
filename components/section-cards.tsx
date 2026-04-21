import Link from 'next/link'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type SectionCardsProps = {
  stats: {
    users: number
    posts: number
    categories: number
    genres: number
    festivals: number
    years: number
  }
}

const formatCount = (value: number) => new Intl.NumberFormat('en-US').format(value)

export function SectionCards({ stats }: SectionCardsProps) {
  const cards = [
    {
      label: 'Total Users',
      value: stats.users,
      help: 'Registered users in the system',
      href: '/admin/users',
    },
    {
      label: 'Total Posts',
      value: stats.posts,
      help: 'Published and draft posts stored in the database',
      href: '/admin/posts',
    },
    {
      label: 'Total Categories',
      value: stats.categories,
      help: 'Available category filters',
      href: '/admin/filters/categories',
    },
    {
      label: 'Total Genres',
      value: stats.genres,
      help: 'Available genre filters',
      href: '/admin/filters/genres',
    },
    {
      label: 'Total Festivals',
      value: stats.festivals,
      help: 'Available festival filters',
      href: '/admin/filters/festivals',
    },
    {
      label: 'Total Years',
      value: stats.years,
      help: 'Available year filters',
      href: '/admin/filters/years',
    },
  ]

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 2xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="@container/card">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              <Link
                href={card.href}
                className="hover:text-primary focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                {formatCount(card.value)}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">{card.label}</div>
            <div className="text-muted-foreground">{card.help}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
