'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { setToken } from '@/lib/auth';





// export default function SignIn() {


//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://127.0.0.1:8000/api/signin', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       const data = await res.json();
      
//       if (!res.ok) {
//         throw new Error(data.detail || 'Authentication failed');
//       }
      
//       setToken(data.access_token);
//       router.push('/users');
//     } catch (err: any) {
//       console.error('Sign in error:', err);
//       setError(err.message || 'Failed to connect to the server. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Sign In</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Input
//                 type="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 disabled={loading}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Input
//                 type="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 disabled={loading}
//                 required
//                 minLength={8}
//               />
//             </div>
//             {error && (
//               <div className="p-3 rounded bg-red-50 text-red-500 text-sm">
//                 {error}
//               </div>
//             )}
//             <Button 
//               type="submit" 
//               className="w-full"
//               disabled={loading}
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }












const LOGIN_URL = "http://127.0.0.1:8000/api/signin/"; 


export default function Page() {
    const router = useRouter(); // Add router
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorMessage(""); 
        setSuccessMessage("");

        const formData = new FormData(event.currentTarget);
        const jsonData = JSON.stringify(Object.fromEntries(formData));

        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: jsonData,
            });

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                console.log("Login successful");

                if (data.access_token) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("token_type", data.token_type);
                    setSuccessMessage("Login successful! Redirecting...");
                    
                    // Store auth header
                    const authHeader = `${data.token_type} ${data.access_token}`;
                    localStorage.setItem("authHeader", authHeader);

                    // Add a small delay before redirect to show success message
                    setTimeout(() => {
                        router.push('/'); // Redirect to homepage
                        // Use '/dashboard' or any other route you want to redirect to
                    }, 1000);
                } else {
                    setErrorMessage("Invalid response format from server");
                }
            } else {
                setErrorMessage(data?.detail || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Something went wrong. Please try again.");
        }
    }

    // Rest of your component remains the same
    return (
        <div className="h-[95vh] flex items-center justify-center">
        <div className="max-w-md mx-auto py-5">
            <h1 className="text-xl font-semibold mb-4">Login Here</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="email" 
                    required 
                    name="email" 
                    placeholder="Your Email" 
                    className="block w-full p-2 border rounded" 
                />
                <input 
                    type="password" 
                    required 
                    name="password" 
                    placeholder="Your Password" 
                    className="block w-full p-2 border rounded" 
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
    );
}
    