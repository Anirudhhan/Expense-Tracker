import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Activity, Mail, Eye, EyeOff, Lock, Ellipsis, Camera } from "lucide-react";
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";


function SignUpPage() {
    const { isSigningUp, isUpdatingProfile, signUp} = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    profilePic: "",
    password: "",
    });

    const handleImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
  
      reader.onload = async () => {
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        setFormData({ ...formData, profilePic: base64Image });
      };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password || !formData.fullName) {
            toast.error("Please fill all the fields!");
            return;
        }
        if (formData.password !== confirmPassword) {
            toast.error("Passwords do not match!");
            setConfirmPassword("");
            setFormData({ ...formData, password: "" });
            return;
        } 

        signUp(formData)
      };

  return (
    <div className='h-screen grid lg:grid-cols-2'>
        <div className='flex-1 bg-amber-950 hidden'>

        </div>

        {/* left side */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

          <div className="w-full max-w-xl space-y-2">

              <h1 className='text-3xl font-bold'>Create an account</h1>
              <p className='text-base-content/40'>Please enter your details</p>

              {/* -- avatar upload section -- */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <img
                    src={selectedImg || "/avatar.png"}
                    alt="Profile"
                    className="size-22 rounded-full object-cover border-2 "
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-0 right-0 
                      bg-base-content hover:scale-105
                      p-2 rounded-full cursor-pointer 
                      transition-all duration-200
                      ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                    `}
                  >
                    <Camera className="w-5 h-5 text-base-200" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
                <p className="text-sm text-zinc-400">
                  {isUpdatingProfile ? "Uploading..." : ""}
                </p>
              </div>


            <form onSubmit={handleSubmit}>
              <div className="form-control my-6">
                
                <div className="grid lg:grid-cols-2 space-x-4">
                  <div className='flex flex-col'>
                    <label htmlFor="" className="label">
                      <span className='font-medium'>Full Name</span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-10`}
                      placeholder="Anirudhhan Ashok"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="" className="label">
                      <span className='font-medium'>Email address</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-base-content/400" />
                      </div>
                      <input
                        type="email"
                        className={`input input-bordered w-full pl-10`}
                        placeholder="xyz@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <label htmlFor="" className='label pt-3'>
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

                {/* -- Confirm Password -- */}
                <label className="label mt-3">
                      <span className='font-medium'> Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input w-full pl-10 input-bordered"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                  {!showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                  </button>  
                </div>


              </div>
              <button type='submit' className='btn w-full btn-primary'>
                  {isSigningUp ? (
                    <Ellipsis className="h5 w5 animate-pulse"/>
                  ): "Sign in"}
              </button>
              
              {/* TODO: Implement this later */}
              <button className='btn w-full border-1 mt-4'>
                  Sign Up with Google
              </button>
            </form>

            <div className="text-center">
              <p>Already have an account? {" "}
                  <Link to="/login" className="link link-primary">Login</Link>
              </p>
            </div>

          </div>

        </div>

    </div>
  )
}

export default SignUpPage