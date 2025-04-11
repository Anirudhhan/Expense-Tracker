import React, { useState } from 'react';
import { Activity, Mail, Eye, EyeOff, Lock } from "lucide-react";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // TODO: AuthStore


  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className='h-screen grid lg:grid-cols-2'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
          <div className="w-full max-w-md space-y-4">
            
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center ml-50 mb-5 justify-center group-hover:bg-primary/20 transition-colors"
                >
                  <Activity className="w-6 h-6 text-primary" />
                </div>
              <h1 className='text-3xl font-bold'>Welcome Back</h1>
              <p className='text-base-content/40'>Please enter your details</p>

            <form onSubmit={handleSubmit}>
              <div className="form-control my-6">
                <label htmlFor="" className="label">
                  <span className='font-medium'>Email address</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="xyz@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <label htmlFor="" className='label pt-5'>
                  <span className='font-medium'>Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                  type={showPassword ? 'text' : 'password'}
                  className="input w-full pl-10 input-bordered"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                  </button>
                </div>
              </div>
              <button type='submit' className='btn w-full btn-primary'>
                  Sign in
              </button>
              
              {/* TODO: Implement this later */}
              <button className='btn w-full border-1 mt-4'>
                  Sign in with Google
              </button>
            </form>

          </div>

        </div>

        {/* right side */}
        <div className='flex-1 bg-amber-950'>

        </div>

    </div>
  )
}

export default LoginPage