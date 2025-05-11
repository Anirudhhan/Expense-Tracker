import React, { useState } from 'react';
import { Activity, Mail, Eye, EyeOff, Lock, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields!");
      return;
    }

    login(formData);
  };

  return (
    <div className='h-screen grid lg:grid-cols-2'>
        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
          <div className="w-full max-w-md space-y-4">
            
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
                  {!showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                  </button>
                </div>
              </div>
              <button type='submit' className='btn w-full btn-primary'>
                  {isLoggingIn ? (
                    <Ellipsis className="h5 w5 animate-pulse"/>
                  ): "Sign in"}
              </button>
              
              {/* TODO: Implement this later */}
              {/* <button className='btn w-full border-1 mt-4'>
                  Sign in with Google
              </button> */}
            </form>

            <div className="text-center">
              <p>Don't have an account? {" "}
                  <Link to="/signup" className="link link-primary">Sign up</Link>
              </p>
            </div>

          </div>

        </div>

        {/* right side */}
        <div className='flex-1 bg-amber-950 hidden'>

        </div>

    </div>
  )
}

export default LoginPage