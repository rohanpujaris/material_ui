import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { Outlet, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

export default function Dashboard () {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('authToken') === undefined || localStorage.getItem('authToken') === null) {
      navigate('/app/')
    }
  }, [])

  const handleLogout = () => {
    fetch('/users/sign_out', {
      method: 'delete'
    }).then(() => {
      localStorage.removeItem('authToken')
      navigate('/app/sign_in')
    })
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  )
}
