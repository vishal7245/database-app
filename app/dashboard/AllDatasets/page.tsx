import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface AllDatasetItem {
  id: number
  Accession: string
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AllDatasetsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const page = typeof searchParams?.page === 'string'
    ? Math.max(1, parseInt(searchParams.page, 10) || 1)
    : 1

  const itemsPerPage = 10
  const skip = (page - 1) * itemsPerPage

  try {
    const [data, totalItems] = await Promise.all([
      prisma.AllDatasets.findMany({
        skip,
        take: itemsPerPage,
        select: {
          id: true,
          Accession: true,
        },
      }),
      prisma.AllDatasets.count(),
    ])

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-pink-700">All Datasets</h1>
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <Table className="w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-pink-100">
                  <TableHead className="p-2 text-left font-medium text-pink-700">ID</TableHead>
                  <TableHead className="p-2 text-left font-medium text-pink-700">Accession</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item: AllDatasetItem) => (
                  <TableRow key={item.id} className="border-b border-pink-200 hover:bg-pink-50">
                    <TableCell className="p-2">
                      <div className="truncate max-w-[150px]" title={item.id.toString()}>
                        {item.id}
                      </div>
                    </TableCell>
                    <TableCell className="p-2">
                      <div className="truncate max-w-[150px]" title={item.Accession}>
                        {item.Accession}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-pink-600 mt-4">No datasets available.</p>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <nav className="inline-flex" role="navigation" aria-label="Pagination">
              <ul className="flex list-none">
                {page > 1 && (
                  <li>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mx-1"
                      asChild
                    >
                      <Link href={`?page=${page - 1}`}>Previous</Link>
                    </Button>
                  </li>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <Button
                      variant={page === index + 1 ? "default" : "outline"}
                      size="sm"
                      className="mx-1"
                      asChild
                    >
                      <Link href={`?page=${index + 1}`}>{index + 1}</Link>
                    </Button>
                  </li>
                ))}
                {page < totalPages && (
                  <li>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mx-1"
                      asChild
                    >
                      <Link href={`?page=${page + 1}`}>Next</Link>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching All Datasets:', error)
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4 text-pink-700">Error</h1>
        <p className="text-pink-600">Failed to load All Datasets. Please try again later.</p>
      </div>
    )
  }
}