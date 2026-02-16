'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-bl from-violet-500 to-fuchsia-500 px-5 text-center">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-slate-800 mb-4"
      >
        Assignment 1 Demo
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-slate-700 text-lg mb-8 max-w-md"
      >
        Login and Sign Up Pages using Next.js (TypeScript) for frontend and NestJS (TypeScript) for backend.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link href="/register">
          <Button variant="default" className="px-6 py-3">
            Go to Signup Page
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

export default HomePage
