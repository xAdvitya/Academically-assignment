'use client';
import React, { useContext, useEffect, useState } from 'react';
import apiRequest from '@/app/lib/apiRequest';
import { AuthContext } from '@/app/providers/auth-provider';
import Card from '@/app/components/Card';
import Link from 'next/link';

const EnrolledCourses = () => {
  const { currentUser } = useContext(AuthContext);

  type Course = {
    id: number;
    title: string;
    description: string;
    duration: string;
    instructor: string;
  };

  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!currentUser || !currentUser.enrolledCourses) return;
      try {
        const promises = currentUser.enrolledCourses.map((courseId: string) =>
          apiRequest.get(`/courses/${courseId}`)
        );
        const results = await Promise.all(promises);
        setEnrolledCourses(results.map((res) => res.data));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [currentUser]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {enrolledCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrolledCourse) => (
            <Link key={enrolledCourse.id} href={`/course/${enrolledCourse.id}`}>
              <Card
                key={enrolledCourse.id}
                title={enrolledCourse.title}
                description={enrolledCourse.description}
                duration={enrolledCourse.duration}
                instructor={enrolledCourse.instructor}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p>No enrolled courses found.</p>
      )}
    </div>
  );
};

export default EnrolledCourses;
