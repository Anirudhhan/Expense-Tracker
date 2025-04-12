import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function HomePage() {
  const {logout} = useAuthStore();
  return (
    <div>
    </div>

  )
}

export default HomePage