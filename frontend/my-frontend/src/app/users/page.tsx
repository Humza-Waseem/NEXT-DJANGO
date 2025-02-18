import 'tailwindcss/tailwind.css';
import Link from 'next/link';

interface User {
  id: number;
  full_name: string;
  email: string;

}

export default async function GetUsersData() {
    const data = await fetch('http://localhost:8000/api/users/');
    if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
    }
    const users: User[] = await data.json();
    
  
    return (
        <>
         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {users.map((user: User) => (
                <div key={user.id} className="bg-white shadow-md rounded-lg p-6">
                    <Link href={`/users/${user.id}`}><h2 className="text-xl font-semibold mb-2">{user.full_name}</h2></Link>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            ))}
         </div>
        </>
    );
}