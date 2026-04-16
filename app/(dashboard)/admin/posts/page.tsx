import { columns, Post } from './columns'
import { DataTable } from './data-table'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'

async function getData(): Promise<Post[]> {
  return [
    {
      id: '728ed52f',
      title: 'Post 1',
      slug: 'post-1',
      category: {
        id: '728ed52f',
        name: 'Category 1',
        slug: 'category-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 2',
      slug: 'post-2',
      category: {
        id: '728ed52f',
        name: 'Category 2',
        slug: 'category-2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 3',
      slug: 'post-3',
      category: {
        id: '728ed52f',
        name: 'Category 3',
        slug: 'category-3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 4',
      slug: 'post-4',
      category: {
        id: '728ed52f',
        name: 'Category 4',
        slug: 'category-4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 5',
      slug: 'post-5',
      category: {
        id: '728ed52f',
        name: 'Category 5',
        slug: 'category-5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 6',
      slug: 'post-6',
      category: {
        id: '728ed52f',
        name: 'Category 6',
        slug: 'category-6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 7',
      slug: 'post-7',
      category: {
        id: '728ed52f',
        name: 'Category 7',
        slug: 'category-7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 9',
      slug: 'post-9',
      category: {
        id: '728ed52f',
        name: 'Category 9',
        slug: 'category-9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 10',
      slug: 'post-10',
      category: {
        id: '728ed52f',
        name: 'Category 10',
        slug: 'category-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 11',
      slug: 'post-11',
      category: {
        id: '728ed52f',
        name: 'Category 11',
        slug: 'category-11',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '728ed52f',
      title: 'Post 12',
      slug: 'post-12',
      category: {
        id: '728ed52f',
        name: 'Category 12',
        slug: 'category-12',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

export default async function PostsPage() {
  const data = await getData()

  return (
    <div>
      <div className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>List of posts</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
