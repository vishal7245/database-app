import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProliferativeTable } from '@/app/components/ProliferativeTable'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

const ITEMS_PER_PAGE = 10

export default async function ProliferativePage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const page = Math.max(1, Number(searchParams?.page) || 1)
  const skip = (page - 1) * ITEMS_PER_PAGE

  try {
    const [data, totalItems] = await Promise.all([
      prisma.Proliferative.findMany({
        skip,
        take: ITEMS_PER_PAGE,
        select: {
          id: true,
          Accession: true,
          earlySecretoryPhase: true,
          midSecretoryPhase: true,
          lateSecretoryPhase: true,
          samples: true,
          platform: true,
          experimentType: true,
          fileFormat: true,
          codingNonCoding: true,
          naturalStimulated: true,
          condition: true,
          title: true,
          published: true,
        },
      }),
      prisma.Proliferative.count()
    ])

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-pink-700">Proliferative Data</h1>
        <ProliferativeTable data={data} currentPage={page} totalPages={totalPages} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching Proliferative data:', error)
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4 text-pink-700">Error</h1>
        <p className="text-pink-600">Failed to load Proliferative data. Please try again later.</p>
      </div>
    )
  }
}
