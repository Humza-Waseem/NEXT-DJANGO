import React from 'react';

interface Courses {
  // props types
  id: number
  name: string
  slug: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

export default async function GetUsersData() {


    const data = await fetch('http://127.0.0.1:8000/api/courses/');
    if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
    }
    const course: Courses[] = await data.json();

  return (
    <>
      {course.map((course: Courses) => (
        <div key={course.id}>
          <h5> {course.id} </h5>
          <h5> {course.name}</h5>
          <h5> {course.slug}</h5>
          <h5> {course.description}</h5>
          <h5> {course.status}</h5>
        </div>
      ))}
      <div>
      </div>
    </>
  );
};


