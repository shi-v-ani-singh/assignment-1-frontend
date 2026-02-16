'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from "lucide-react"

interface LoginResponse {
  token?: string
  message?: string
}

interface FormErrors {
  email?: string
  password?: string
  server?: string
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()

  // validating input fields
  const validation = () => {
    const newError: FormErrors = {}
    if (!email.trim()) {
      newError.email = "*" 
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newError.email = "Invalid email format" 
    }

    
    if (!password) {
      newError.password = "*" 
    } else if (!/^(?=.*[A-Z]).{8,}$/.test(password)) {
      newError.password =
        "Password must be at least 8 characters and contain 1 capital letter"
    }

    setError(newError)
    return Object.keys(newError).length === 0
  }

  // handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError({}) 

    if (!validation()) return

    setLoading(true)

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data: LoginResponse = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')

      console.log('Login Success Token:', data.token)

      router.push('/welcome')

      setEmail("")
      setPassword("")
    } catch (err: any) {
      setError({ server: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-bl from-violet-500 to-fuchsia-500 px-5">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-80 bg-white rounded-xl shadow-md p-8 flex flex-col"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-slate-800 text-center mb-6"
        >
          Login
        </motion.h1>

        {/* email */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email {error.email && <span className="text-red-500">{error.email}</span>}
        </label>
        <motion.input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 p-2 mb-3 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        />
        
        {/* label */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Password {error.password && <span className="text-red-500">{error.password}</span>}
        </label>
        <div className="relative mb-3">
          <motion.input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          />
          {/* eye btn */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-500 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        
        {/* submit btn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white ${loading ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-600'}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </motion.div>
        {/* server error */}
        {error.server && (
          <p className="text-red-500 mt-4 text-center">
            {error.server}
          </p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-center mt-6 text-slate-600"
        >
          Don't have an account?{' '}
          <a href="/signup" className="text-violet-500 underline hover:text-violet-600">
            Sign Up
          </a>
        </motion.p>
      </motion.form>
    </div>
  )
}

export default LoginPage
