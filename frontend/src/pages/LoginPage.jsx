import React from 'react'

function LoginPage() {
  return (
    <div className='h-screen grid lg:grid-cols-2'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
            <h1 className='text-2xl font-bold'>Welcome Back</h1>
            <p>Please enter your details</p>
        </div>

        {/* right side */}
        <div className='flex-1 bg-amber-950'>

        </div>

    </div>
  )
}

export default LoginPage