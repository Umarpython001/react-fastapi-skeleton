import { useState } from 'react'
import MainLayout from './components/MainLayout.tsx'
import LoginForm from './components/pages/LoginForm.tsx'
import Home from './components/pages/Home.tsx'
import {Routes, Route, Link} from 'react-router';

function App() {
  return (
    <>

      <MainLayout>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>

      </MainLayout>

    </>
  )
}

export default App
