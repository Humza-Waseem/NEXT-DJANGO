'use client';

import 'tailwindcss/tailwind.css';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  full_name: string;
  email: string;
}

export default function Page() {
  const router = useRouter();
  const { slug } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:8000/api/users/${slug}`)
        .then((response) => {
          if (response.status === 404) {
            throw new Error('User not found');
          }
          return response.json();
        })
        .then((data) => setUser(data))
        .catch((error) => setError(error.message));
    }
  }, [slug]);

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">404 - User Not Found</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{user.full_name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}