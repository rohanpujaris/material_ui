import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function NonAuthenticated () {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      navigate('/dashboard/')
    }
  }, [])

  return (
    <Outlet />
  )
}
