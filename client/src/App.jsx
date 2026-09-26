import React from 'react'
import { Routes, Route } from "react-router-dom"

import UserLayout from './layouts/UserLayout'
import Home from './pages/Home'

import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminLogin from './pages/admin/AdminLogin'
import ManageHero from './pages/admin/ManageHero'
import ManageAbout from './pages/admin/ManageAbout'
import ManageServices from './pages/admin/ManageServices'
import ManageProject from './pages/admin/ManageProject'
import Profile from './pages/admin/Profile'
import Settings from './pages/admin/Settings'
import ManageContact from './pages/admin/ManageContact'
import ProtectedRoute from './components/ProtectedRoute'




function App() {

  return (

    <Routes>


      {/* USER ROUTES */}

      <Route element={<UserLayout />}>

        <Route path="/" element={<Home />} />

      </Route>



      {/* ADMIN ROUTES */}

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >


        <Route path="dashboard" element={<Dashboard />} />

        <Route path="hero" element={<ManageHero />} />

        <Route path="about" element={<ManageAbout />} />

        <Route path="services" element={<ManageServices />} />

        <Route path="projects" element={<ManageProject />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact" element={<ManageContact />} />


        {/* Profile */}

        <Route path="profile" element={<Profile />} />


      </Route>



      {/* LOGIN */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


    </Routes>

  )

}

export default App