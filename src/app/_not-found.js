import Link from 'next/link';
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
      <p className="mt-4 text-lg max-w-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
}

