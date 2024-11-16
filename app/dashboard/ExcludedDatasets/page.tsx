import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ExcludedDatasetsTable } from '@/app/components/ExcludedDatasetsTable'

export default async function ExcludedDatasetsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const page = typeof searchParams?.page === 'string' ? Math.max(1, parseInt(searchParams.page, 10) || 1) : 1
  const itemsPerPage = 10
  const skip = (page - 1) * itemsPerPage

  try {
    const [data, totalItems] = await Promise.all([
      prisma.ExcludedDatasets.findMany({
        skip,
        take: itemsPerPage,
        select: {
          id: true,
          Accession: true,
          title: true,
          platform: true,
          experimentType: true,
          condition: true,
        },
      }),
      prisma.ExcludedDatasets.count(),
    ])

    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-pink-700">Excluded Datasets</h1>
        <ExcludedDatasetsTable data={data} currentPage={page} totalPages={totalPages} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching Excluded Datasets:', error)
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4 text-pink-700">Error</h1>
        <p className="text-pink-600">Failed to load Excluded Datasets. Please try again later.</p>
      </div>
    )
  }
}
