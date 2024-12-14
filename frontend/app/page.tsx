"use client";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import apiRequest from "./lib/apiRequest";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
};

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //fetch all the courses
    const fetchCourses = async () => {
      try {
        const response = await apiRequest.get("/courses");
        if (Array.isArray(response.data)) {
          setCourses(response.data as Course[]);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-20">
        {courses.map((course, index) => (
          <Link key={index} href={`/course/${course.id}`}>
            <Card
              title={course.title}
              description={course.description}
              duration={course.duration}
              instructor={course.instructor}
              buttonLabel="Enroll Now"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
