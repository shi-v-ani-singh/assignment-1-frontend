'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface LoginResponse {
  token?: string
  message?: string
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data: LoginResponse = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')

      console.log('Login Success Token:', data.token)
      // Redirect to welcome page after login
      router.push('/welcome')
    } catch (err: any) {
      setError(err.message)
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

        <motion.input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="border border-slate-300 p-3 mb-4 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        />

        <motion.input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="border border-slate-300 p-3 mb-6 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            variant="default"
            className={`w-full p-3 rounded-lg text-white ${
              loading ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-600'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </motion.div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-center mt-6 text-slate-600"
        >
          Don't have an account?{' '}
          <a href="/register" className="text-violet-500 underline hover:text-violet-600">
            Sign Up
          </a>
        </motion.p>
      </motion.form>
    </div>
  )
}

export default LoginPage
