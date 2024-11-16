// app/dashboard/page.tsx

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-3xl text-black font-bold mb-4">
        Welcome to your Dashboard, {session.user?.name}!
      </h1>
    </div>
  );
}
