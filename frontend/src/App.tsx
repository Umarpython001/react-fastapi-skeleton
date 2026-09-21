import { useState } from 'react'
import MainLayout from './components/MainLayout.tsx'
import LoginForm from './components/pages/LoginForm.tsx'
import Home from './components/pages/Home.tsx'
import SignUpForm from './components/pages/SignUp.tsx'
import DashBoard from './components/pages/DashBoard.tsx'
import {Routes, Route, Link} from 'react-router';
import {useAuth, AuthProvider} from './context/AuthContext.tsx'

function App() {
  return (
    <>

    <AuthProvider>


        <MainLayout>
    
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<SignUpForm />}  />
              <Route path="/dashboard" element={<DashBoard />}  />
            </Routes>

        </MainLayout>


    </AuthProvider>

    </>
  )
}

export default App
