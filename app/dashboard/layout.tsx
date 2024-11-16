// app/dashboard/layout.tsx

import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/dashboard" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/Healthy+RIF" className="hover:text-gray-300">
                Healthy RIF
              </Link>
            </li>
            <li>
              <Link href="/dashboard/Proliferative" className="hover:text-gray-300">
                Proliferative
              </Link>
            </li>
            <li>
              <Link href="/dashboard/Healthy" className="hover:text-gray-300">
                Healthy
              </Link>
            </li>
            <li>
              <Link href="/dashboard/RIF" className="hover:text-gray-300">
                RIF
              </Link>
            </li>
            <li>
              <Link href="/dashboard/ExcludedDatasets" className="hover:text-gray-300">
              Excluded Datasets
              </Link>
            </li>
            <li>
              <Link href="/dashboard/AllDatasets" className="hover:text-gray-300">
              All Datasets
              </Link>
            </li>
            <li>
              <Link href="/logout" className="hover:text-gray-300">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
