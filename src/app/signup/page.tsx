'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface RegistrationResponse {
  message?: string
}

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const router = useRouter()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      })

      const data: RegistrationResponse = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')

      setSuccess("Registration Successful....")
      console.log('User registered:', { firstName, lastName, email })

      setTimeout(() => router.push('/login'), 1200)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-bl from-violet-500 to-fuchsia-500 px-5">
      <motion.form
        onSubmit={handleRegister}
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
          Create Your Account
        </motion.h1>

        <motion.input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          className="border border-slate-300 p-3 mb-4 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        />

        <motion.input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          className="border border-slate-300 p-3 mb-4 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        />

        <motion.input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="border border-slate-300 p-3 mb-4 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
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
          transition={{ delay: 0.6 }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            type="submit"
            variant="default"
            className={`w-full p-3 rounded-lg text-white ${
              loading ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-600'
            }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </motion.div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-4 text-center">{success}</p>}

        <p className="text-sm text-center mt-6 text-slate-600">
          Already have an account?{' '}
          <a href="/login" className="text-violet-500 underline hover:text-violet-600">
            Login
          </a>
        </p>
      </motion.form>
    </div>
  )
}

export default SignupPage
