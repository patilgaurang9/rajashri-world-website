import React from "react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Sign Up</h2>
        <p className="text-gray-500 mb-8 text-sm">Create your account to get started!</p>
        <form className="w-full space-y-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input id="name" type="text" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition" placeholder="Your Name" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition" placeholder="you@email.com" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow transition">Sign Up</button>
        </form>
        <p className="mt-8 text-center text-gray-500 text-sm">Already have an account? <Link href="/login" className="text-orange-600 hover:underline font-medium">Login</Link></p>
      </div>
    </div>
  );
}
