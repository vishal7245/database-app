// app/page.tsx

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to Our Database</h1>
      <p className="text-lg">
        <a href="/login" className="underline hover:text-gray-200">Login</a> |{' '}
        <a href="/register" className="underline hover:text-gray-200">Register</a>
      </p>
    </div>
  );
}
