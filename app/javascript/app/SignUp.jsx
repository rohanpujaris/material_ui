import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

export default function SignUp () {
  const [errors, setErrors] = useState(null)
  const [submitInProgress, setSubmitInProgress] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitInProgress(true)
    fetch('/users', {
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
          setErrors(null)
          navigate('/dashboard/')
        } else {
          const error = await response.json()
          setErrors(error.errors)
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors?.email !== undefined}
                helperText={errors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={errors?.password !== undefined}
                helperText={errors?.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={submitInProgress}
            startIcon={submitInProgress ? <CircularProgress size={24} /> : null}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/app/sign_in">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
