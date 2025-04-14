import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
        <div class="fixed top-0 left-0 right-0 z-50 flex flex-1 h-16">
            <div class="flex shrink-0 items-center px-40">
                <img class="h-10 w-auto  invert brightness-0" src="/logo.png" alt="Your Company"/>
                <div class="hidden sm:ml-1 sm:block shrink-0">
                    <Link to="/" class="rounded-md text-2xl font-medium " aria-current="page">Expense Tracker</Link>
                </div>
            </div>
        </div>
  )
}

export default Navbar