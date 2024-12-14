'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../providers/auth-provider';
import apiRequest from '../lib/apiRequest';

const Navbar: React.FC = () => {
  const { currentUser, updateUser, isAdmin } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      localStorage.removeItem('user');
      updateUser(null);
      console.log('User logged out successfully');
      router.push('/login'); // Redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <Link href="/">
        <span className="font-semibold text-xl tracking-tight text-white mr-6">
          Global Courses
        </span>
      </Link>

      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {currentUser ? (
          <div className="text-sm lg:flex-grow">
            {isAdmin ? (
              <Link
                href="/course/add"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Add Course
              </Link>
            ) : (
              <Link
                href="/course/enrolled"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Enrolled Courses
              </Link>
            )}
          </div>
        ) : null}
        <div>
          {!currentUser ? (
            <Link
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          ) : (
            <button
              className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
