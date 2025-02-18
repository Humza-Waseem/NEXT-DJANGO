
'use client'
import { Button } from "@/components/ui/button";


import { useState } from "react";
import { log } from "console";


async function GetUsersData() {
  const response = await fetch("http://localhost:8000/api/users/");
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json(); // ✅ Return data, NOT JSX
}



export default function Home() {

    const [dataStr, setDataStr] = useState("");

    async function HandleClick() {
      const data = await GetUsersData();
      setDataStr(JSON.stringify(data));
      // console.log("Raw Data:",data);
  }
  return (
    <>
      <div className="grid grid-rows-[20px_1fr_20px] Light  items-center   p-8 pb-20 ">
        <h1 className="scroll-m-20 m-auto text-6xl font-extrabold tracking-tight lg:text-5xl  ">
          Unlock Personalized Learning with AI-Generated Courses
          <br />
          <small className="text-xl">
            Make Courses that suits you, at your own time and pace.
          </small>
          <br />
          <Button variant="mainButton">Get Started</Button>
          <Button onClick={ HandleClick}> Get Users </Button>
          <div className="text-center text-sm ">     
            {dataStr}
          </div>
        </h1>
      </div>
    
        {/* <div className="bg-cover bg-center h-40  m-auto rounded-xl mt-12" style={{ backgroundImage: "url('bg-gif.gif')" }}>
          <img src="bg-gif2.gif" alt="Background GIF" className=" h-40 rounded-xl m-auto mt-12 w-full h-full object-cover rounded-xl" />
      </div> */}

    </>
  );
}
