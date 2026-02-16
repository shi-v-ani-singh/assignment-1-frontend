'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const WelcomePage: React.FC = () => {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-linear-to-bl from-violet-500 to-fuchsia-500 px-5">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-slate-800 mb-4"
      >
        Welcome!....
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-slate-900 text-lg mb-8 text-center max-w-md"
      >
        You have successfully logged in.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button onClick={handleLogout} className="px-6 py-3 bg-violet-700 hover:bg-violet-800 text-white rounded-lg">
          Logout
        </Button>
      </motion.div>
    </div>
  )
}

export default WelcomePage
