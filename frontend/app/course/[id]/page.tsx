'use client';
import React, { useContext, useEffect, useState } from 'react';
import apiRequest from '@/app/lib/apiRequest';
import { useParams, useRouter } from 'next/navigation';
import { AuthContext } from '@/app/providers/auth-provider';

type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  instructor: string;
};

const Course = () => {
  const { id } = useParams();
  const { currentUser, isAdmin } = useContext(AuthContext);
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!id) return;
      try {
        const response = await apiRequest.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const checkEnrolled = async () => {
      if (!id || !currentUser) return;
      const enrolledCourses = currentUser.enrolledCourses || [];
      if (enrolledCourses.includes(id)) {
        setEnrolled(true);
      }
    };

    fetchCourseDetail();
    checkEnrolled();
  }, [id, currentUser]);

  const handleEdit = () => {
    router.push(`/course/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const confirmed = confirm('Are you sure you want to delete this course?');
      if (!confirmed) return;

      await apiRequest.delete(`/courses/${id}`);
      alert('Course deleted successfully.');
    } catch (error: any) {
      alert('Failed to delete course: ' + error.message);
    }
  };

  const handleEnroll = async () => {
    if (!currentUser) {
      setError('You need to be logged in to enroll in this course.');
      return;
    }

    try {
      await apiRequest.post(`/users/enroll/${id}`);
      setEnrolled(true);
    } catch (error: any) {
      setError(
        error.message || 'Failed to enroll in course. Please try again.'
      );
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {course ? (
        <div className="mx-5 flex">
          <div className="flex-auto">
            <div className="flex flex-col gap-2">
              <span className="uppercase text-5xl font-semibold text-gray-900">
                {course.title}
              </span>
              <span className="text-lg text-gray-700">
                {course.description}
              </span>
              <span className="text-black">
                created by{' '}
                <span className="text-gray-700 underline">
                  {course.instructor}
                </span>
              </span>
              <span className="text-black">
                course duration{' '}
                <span className="text-gray-700 underline">
                  {course.duration}
                </span>
              </span>
            </div>
            {isAdmin && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          <div className="flex-none w-50">
            <div className="flex flex-col gap-3">
              <img
                className="w-full max-h-60 max-w-70 rounded-lg"
                src="https://www.towson.edu/diar/images/cps-it-m.jpg"
                alt="Course"
              />

              {!isAdmin && (
                <>
                  {!enrolled ? (
                    <button
                      onClick={handleEnroll}
                      className="mx-auto w-full h-10 bg-blue-700 rounded-sm text-white"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                      Already Enrolled
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No course found.</p>
      )}
    </div>
  );
};

export default Course;
