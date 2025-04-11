import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function HomePage() {
  const {logout} = useAuthStore();
  return (
    <div>
      HomePage <br />
      <button type="button" onClick={logout}>logout</button>
    </div>

  )
}

export default HomePage