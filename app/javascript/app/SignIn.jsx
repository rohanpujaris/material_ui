import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignIn () {
  const [error, setError] = useState(null)
  const [submitInProgress, setSubmitInProgress] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitInProgress(true)
    fetch('/users/sign_in', {
      method: 'post',
      body: JSON.stringify({ user: { email: event.currentTarget.email.value, password: event.currentTarget.password.value } }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        localStorage.setItem('authToken', response.headers.get('Authorization'))
        if (response.status === 201) {
          setError(null)
          navigate('/dashboard/')
        } else {
          const error = await response.json()
          setError(error.error)
        }
      })
      .finally(() => {
        setSubmitInProgress(false)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {error && <Alert sx={{ mb: 1 }} variant="outlined" severity="error">
          {error}
        </Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={submitInProgress}
            startIcon={submitInProgress ? <CircularProgress size={24} /> : null}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
            <Link component={RouterLink} to="/app/sign_up">
              {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
