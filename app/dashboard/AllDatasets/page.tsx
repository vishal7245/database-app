import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface AllDatasetItem {
  id: number;
  Accession: string;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AllDatasetsPage({ searchParams }: PageProps) {
  // Get the session for the user
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Parse and validate the current page number
  const page = typeof searchParams?.page === 'string'
    ? Math.max(1, parseInt(searchParams.page, 10) || 1)
    : 1;

  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;

  try {
    // Fetch data and total count in parallel
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
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="p-6">
        <h1 className="text-2xl text-black font-bold mb-6">All Datasets</h1>
        {data.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr>
                <th className="py-2 px-4 text-gray-700 border-b">ID</th>
                <th className="py-2 px-4 text-gray-700 border-b">Accession</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: AllDatasetItem) => (
                <tr key={item.id} className="text-center border-b hover:bg-gray-50">
                  <td className="py-2 text-gray-500 px-4">{item.id}</td>
                  <td className="py-2 text-gray-500 px-4">{item.Accession}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 mt-4">No datasets available.</p>
        )}
        {totalPages > 1 && (
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
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching All Datasets:', error);
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl text-black font-bold mb-4">Error</h1>
        <p className="text-gray-600">Failed to load All Datasets. Please try again later.</p>
      </div>
    );
  }
}
