import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex justify-center items-center flex-col bg-gray-300 px-5 '>
      <h1 className='text-2xl text-green-800 '>This is Assignment-1.</h1>
      <p className='text-black text-xl'>Login And SignuP Page Using NextJs in frontend with typescript and NestJs with typescript(default).</p>
      <Link href='/login' className='text-red-700'>Got to LoginPage</Link>
    </div>
  )

}
export default page
