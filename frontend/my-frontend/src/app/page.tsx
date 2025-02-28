"use client";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { log } from "console";
import useswr from "swr";
import Link from "next/link";




// async function GetUsersData() {
//   const response = await fetch("http://localhost:8000/api/users/");
//   if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//   }
//   return response.json(); // ✅ Return data, NOT JSX
// }

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export default function Home() {
  const {
    data: users,
    error,
    isLoading,
  } = useswr("http://127.0.0.1:8000/api/users/", fetcher);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Simulate fetching user data from localStorage or an API
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (error) return <div className="text-red-500">Failed to load users.</div>;
  if (isLoading) return <div>Loading users...</div>;




  const token = localStorage.getItem("access_token"); 
  fetch("http://127.0.0.1:8000/api/me", {
    headers: {
      Authorization: `Bearer ${token}`, // Send token in headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

    

  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] Light  items-center   p-8 pb-20 ">
        <h1 className="scroll-m-20 m-auto text-6xl font-extrabold tracking-tight lg:text-5xl  ">
          Unlock Personalized Learning with AI-Generated Courses
          <br />
          <small>Make Courses that suits you, at your own time and pace.</small>
          <br />


        <div className="getStartedButton flex  m-auto  p-8">
          <button >
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            > 
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                fill="currentColor"
              ></path>
            </svg>
            <span>Get Started</span>
          </button>
        </div>





     





          {/* <Button variant="mainButton">Get Started</Button> */}


          {/* <Button onClick={ HandleClick}> Get Users </Button> */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {users?.map(
              (user: { id: number; full_name: string; email: string }) => (
                <div
                  key={user.id}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                  <Link href={`http://localhost:3000/users/${user.id}`}>
                    <p className="text-gray-600 text-lg">{user.full_name}</p>
                  </Link>
                  <p className="text-gray-600 text-lg">{user.email}</p>
                </div>
              )
            )}
          </div>
        </h1>
      </div>

      {/* <div className="bg-cover bg-center h-40  m-auto rounded-xl mt-12" style={{ backgroundImage: "url('bg-gif.gif')" }}>
          <img src="bg-gif2.gif" alt="Background GIF" className=" h-40 rounded-xl m-auto mt-12 w-full h-full object-cover rounded-xl" />
      </div> */}
    </>
  );
}
