import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function ReferUser () {
  const [errors, setErrors] = useState(null)
  const [submitInProgress, setSubmitInProgress] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitInProgress(true)
    fetch('/users/invitation', {
      method: 'post',
      body: JSON.stringify({ user: { email: event.currentTarget.email.value } }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken')
      }
    })
      .then(async (response) => {
        if (response.status === 201) {
          setErrors(null)
          setShowSuccessMessage(true)
        } else {
          const { errors } = await response.json()
          setErrors(errors)
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
          <EmojiPeopleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Refer User
        </Typography>
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={3000}
          onClose={() => setShowSuccessMessage(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Referer send successfully!
          </Alert>
        </Snackbar>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address To Refer"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors?.email !== undefined}
                helperText={errors?.email}
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
            Refer User
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
