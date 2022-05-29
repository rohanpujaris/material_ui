import React from 'react'
import { createRoot } from 'react-dom/client'
import SignIn from './app/SignIn'
import SignUp from './app/SignUp'
import Dashboard from './app/Dashboard'
import ReferUser from './app/ReferUser'
import NonAuthenticated from './app/NonAuthenticated'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'

const theme = createTheme()

export default function ReactApp () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/app/*" element={<NonAuthenticated />}>
            <Route index element={<Navigate to='/app/sign_in' />} />
            <Route path="sign_in" element={<SignIn />} />
            <Route path="sign_up" element={<SignUp />} />
          </Route>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<Navigate to='/dashboard/refer_user' />} />
            <Route path='refer_user' element={<ReferUser />} />
          </Route>
          <Route path="*" element={<Navigate to='app/sign_in' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

const root = createRoot(
  document.getElementById('app_root')
)
root.render(<ReactApp />)
