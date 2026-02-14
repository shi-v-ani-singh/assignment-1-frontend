import React from 'react'

const RegisterPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-200 text-black'>
        <div className='rounded-xl w-80 px-8 py-9 bg-white'>
            <h1 className='text-2xl font-bold mb-4'>Register</h1>
            <input 
                type="text"
                placeholder='First Name'
                className='border w-full p-2 mb-3 rounded'
            />
            <input 
                type="text"
                placeholder='Last Name'
                className='border w-full p-2 mb-3 rounded'
            />
             <input 
                type="email"
                placeholder='Email'
                className='border w-full p-2 mb-3 rounded'
            /> <input 
                type="password"
                placeholder='Password'
                className='border w-full p-2 mb-3 rounded'
            />
            <button className='bg-black text-white w-full p-2 rounded'>
                Create Account
            </button>
            <p className='text-sm text-center mt-4'>
                Already have an account?{" "}
                <a href="/login" className='text-blue-500 underline'>
                    Login
                </a>
            </p>
        </div>
      
    </div>
  )
}

export default RegisterPage
