'use client';

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/providers/auth-provider';
import apiRequest from '@/app/lib/apiRequest';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const response = await apiRequest.post('/auth/login', {
        username,
        password,
      });

      if (response.status !== 200) {
        throw new Error(response.data?.message || 'Login failed.');
      }

      updateUser(response.data); // Update context here
      router.push('/'); // Redirect after successful login
    } catch (err: any) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5">
        <header>
          <img
            className="w-20 mx-auto mb-5"
            src="https://assets.academically.com/front/assets/img/logo.svg"
            alt="Logo"
          />
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="text"
              name="username"
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div>
            <label className="block mb-2 text-indigo-500" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}
        <footer>
          <a
            className="text-indigo-700 hover:text-pink-700 text-sm float-left"
            href="#"
          >
            Forgot Password?
          </a>
          <a
            className="text-indigo-700 hover:text-pink-700 text-sm float-right"
            href="#"
          >
            Create Account
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Login;
