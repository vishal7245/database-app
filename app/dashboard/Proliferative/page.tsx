import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface ProliferativeItem {
  id: number;
  Accession: string;
  earlySecretoryPhase?: number | null;
  midSecretoryPhase?: number | null;
  lateSecretoryPhase?: number | null;
  samples?: string | null;
  platform?: string | null;
  experimentType?: string | null;
  fileFormat?: string | null;
  codingNonCoding?: string | null;
  naturalStimulated?: string | null;
  condition?: string | null;
  title?: string | null;
  published?: string | null;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProliferativePage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const page = typeof searchParams?.page === 'string' 
    ? Math.max(1, parseInt(searchParams.page) || 1)
    : 1;

  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;

  try {
    const [data, totalItems] = await Promise.all([
      prisma.Proliferative.findMany({
        skip: skip,
        take: itemsPerPage,
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
      prisma.Proliferative.count(),
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div>
        <h1 className="text-2xl text-black font-bold mb-6">Proliferative Data</h1>
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 text-gray-700 border-b">Accession</th>
              <th className="py-2 px-4 text-gray-700 border-b">Early Secretory Phase</th>
              <th className="py-2 px-4 text-gray-700 border-b">Mid Secretory Phase</th>
              <th className="py-2 px-4 text-gray-700 border-b">Late Secretory Phase</th>
              <th className="py-2 px-4 text-gray-700 border-b">Samples</th>
              <th className="py-2 px-4 text-gray-700 border-b">Platform</th>
              <th className="py-2 px-4 text-gray-700 border-b">Experiment Type</th>
              <th className="py-2 px-4 text-gray-700 border-b">File Format</th>
              <th className="py-2 px-4 text-gray-700 border-b">Coding/Non-Coding</th>
              <th className="py-2 px-4 text-gray-700 border-b">Natural/Stimulated</th>
              <th className="py-2 px-4 text-gray-700 border-b">Condition</th>
              <th className="py-2 px-4 text-gray-700 border-b">Title</th>
              <th className="py-2 px-4 text-gray-700 border-b">Published</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: ProliferativeItem) => (
              <tr key={item.id} className="text-center border-b hover:bg-gray-50">
                <td className="py-2 text-gray-500 px-4">{item.Accession}</td>
                <td className="py-2 text-gray-500 px-4">{item.earlySecretoryPhase ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.midSecretoryPhase ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.lateSecretoryPhase ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.samples ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.platform ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.experimentType ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.fileFormat ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.codingNonCoding ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.naturalStimulated ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.condition ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.title ?? 'N/A'}</td>
                <td className="py-2 text-gray-500 px-4">{item.published ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex list-none">
              {page > 1 && (
                <li>
                  <Link
                    href={`?page=${page - 1}`}
                    className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Previous
                  </Link>
                </li>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <Link
                    href={`?page=${index + 1}`}
                    className={`px-3 py-2 mx-1 rounded ${
                      page === index + 1 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </Link>
                </li>
              ))}
              {page < totalPages && (
                <li>
                  <Link
                    href={`?page=${page + 1}`}
                    className="px-3 py-2 mx-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Next
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching Proliferative data:', error);
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl text-black font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load Proliferative data. Please try again later.</p>
      </div>
    );
  }
}
