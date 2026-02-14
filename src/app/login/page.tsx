import React from 'react'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-200 text-black'>
        <div className=' rounded-xl w-80 bg-white px-8 py-9'>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <input 
                type='email'
                placeholder='Email'
                className='border w-full p-2 mb-3 rounded'
                />
             <input 
                type='password'
                placeholder='Password'
                className='border w-full p-2 mb-3 rounded'
                />
            <button className='bg-black text-white w-full p-2 rounded'>
                Login
            </button>
            <p className='text-sm text-center mt-4'>
                Don't have a account?{" "}
                <a href="/register" className='text-blue-500 underline'>
                    Sign up
                </a>
            </p>
        </div>
      
    </div>
  )
}

export default LoginPage
