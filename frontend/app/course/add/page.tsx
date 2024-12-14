'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import apiRequest from '@/app/lib/apiRequest';
import { AuthContext } from '@/app/providers/auth-provider';

const AddCourse: React.FC = () => {
  const { isAdmin } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      setError('You are not authorized to add courses.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await apiRequest.post('admin/courses', formData);
      alert('Course added successfully!');
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to add course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Add Course
      </h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300 text-black" // Changed to text-black
            placeholder="Enter course title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300 text-black" // Changed to text-black
            placeholder="Enter course description"
            rows={3}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-gray-700 font-semibold mb-2"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300 text-black" // Changed to text-black
            placeholder="Enter course duration (e.g., 20hrs)"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="instructor"
            className="block text-gray-700 font-semibold mb-2"
          >
            Instructor
          </label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300 text-black" // Changed to text-black
            placeholder="Enter instructor's name"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-bold rounded-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-700'
          }`}
        >
          {loading ? 'Adding Course...' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;