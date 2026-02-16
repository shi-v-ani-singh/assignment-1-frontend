'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from "lucide-react"

interface RegistrationResponse {
  message?: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  server?: string
}

const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<FormErrors>({})
  const [success, setSuccess] = useState<string>("")

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

  const router = useRouter()

  // validating input fields
  const validation = () => {
    let newError: FormErrors = {}

    if (!firstName.trim()) {
      newError.firstName = "*"
    }

    if (!lastName.trim()) {
      newError.lastName = "*"
    }

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

    if (!confirmPassword) {
      newError.confirmPassword = "*"
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match"
    }

    setError(newError)
    return Object.keys(newError).length === 0
  }

  // hadndle register
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSuccess("")

    if (!validation()) return

    setLoading(true)

    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      })

      const data: RegistrationResponse = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')

      setSuccess("Registration Successful....")
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")

      console.log('User registered:', { firstName, lastName, email })

      setTimeout(() => router.push('/login'), 1200)
    } catch (err: any) {
      setError({ server: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-bl from-violet-500 to-fuchsia-500 px-5">
      <motion.form
        onSubmit={handleRegister}
        noValidate
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-90 bg-white rounded-xl shadow-md p-8 m-4 flex flex-col"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-slate-800 text-center mb-6"
        >
          Create Your Account
        </motion.h1>
        
        {/* first name */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          First Name {error.firstName && (
            <span className="text-red-500 text-sm mt-1">
              {error.firstName}
            </span>
          )}
        </label>
        <motion.input
          type="text"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          className="border border-slate-300 p-2 mb-3 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        />

        {/* last name */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Last Name {error.lastName && (
            <span className="text-red-500 text-sm mt-1">
              {error.lastName}
            </span>
          )}
        </label>
        <motion.input
          type="text"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          className="border border-slate-300 p-2 mb-3 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        />

        {/* email */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Email {error.email && (
            <span className="text-red-500 text-sm mt-1">
              {error.email}
            </span>
          )}
        </label>
        <motion.input
          type="text"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="border border-slate-300 p-2 mb-3 rounded placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        />
        

        {/* password */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Password {error.password && (
            <span className="text-red-500 text-sm mt-1">
              {error.password}
            </span>
          )}
        </label>

        <div className="relative mb-3">
          <motion.input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className="w-full border border-slate-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-500 transition"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        

        {/* confirm password */}
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Confirm Password {error.confirmPassword && (
            <span className="text-red-500 text-sm mt-1">
              {error.confirmPassword}
            </span>
          )}
        </label>
        <div className="relative mb-3">
          <motion.input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            className="w-full border border-slate-300 p-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          />
          {/* eye btn */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-500 transition"
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {/* submit btn */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white ${loading ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-500 hover:bg-violet-600'
              }`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </motion.div>
        
        {/* server error */}
        {error.server && (
          <p className="text-red-500 mt-4 text-center">
            {error.server}
          </p>
        )}
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
