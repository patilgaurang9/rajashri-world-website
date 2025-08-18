"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Chrome, Github } from "lucide-react"

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl mx-2 sm:mx-6 overflow-hidden animate-fadeIn min-h-[520px]">
        {/* Left: Image */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 p-0">
          <Image
            src="/images/simon-english-48nerZQCHgo-unsplash.jpg"
            alt="Travel"
            width={520}
            height={520}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 p-8 sm:p-14 flex flex-col justify-center w-full relative">
          <button
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 focus:outline-none z-10"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>
          
          <h2 className="text-3xl font-extrabold mb-8 text-center md:text-left text-gray-800">
            {isLogin ? 'Welcome Back!' : 'Join Us Today'}
          </h2>
          
          {/* Sliding Toggle Bar */}
          <div className="mb-8 p-1 rounded-full bg-gray-200 flex w-full max-w-xs mx-auto md:mx-0 relative">
            <div
              className={`absolute top-0 h-full w-1/2 rounded-full bg-orange-500 shadow-lg transform transition-transform duration-300 ${isLogin ? 'translate-x-0' : 'translate-x-full'}`}
            ></div>
            <button
              className={`flex-1 text-center font-semibold rounded-full py-2 z-10 transition-colors duration-300 ${isLogin ? 'text-white' : 'text-gray-700'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 text-center font-semibold rounded-full py-2 z-10 transition-colors duration-300 ${!isLogin ? 'text-white' : 'text-gray-700'}`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>
          
          {isLogin ? (
            <form
              className="space-y-6 w-full max-w-md mx-auto md:mx-0"
              onSubmit={e => e.preventDefault()}
            >
              <input type="email" placeholder="Email Address" className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
              <input type="password" placeholder="Password" className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
              <button type="submit" className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-orange-600 transition-all">
                Login
              </button>
            </form>
          ) : (
            <form
              className="space-y-6 w-full max-w-md mx-auto md:mx-0"
              onSubmit={e => e.preventDefault()}
            >
              <input type="text" placeholder="Full Name" className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
              <input type="email" placeholder="Email Address" className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
              <input type="password" placeholder="Password" className="w-full px-5 py-3 border border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all" />
              <button type="submit" className="w-full py-4 bg-orange-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-orange-600 transition-all">
                Sign Up
              </button>
            </form>
          )}

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative bg-white px-4 text-sm text-gray-500">
              Or continue with
            </div>
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-orange-500 transition-colors">
              <Chrome className="w-6 h-6 text-gray-600" />
            </button>
            <button className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:border-orange-500 transition-colors">
              <Github className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}