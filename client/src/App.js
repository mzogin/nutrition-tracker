import React from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import pages
import { Tracking } from './pages/dashboard/Tracking'
// import { SearchFood } from './pages/dashboard/SearchFood'
import { SearchFood } from './pages/dashboard'
import { FoodDiary } from './pages/dashboard/FoodDiary'
import { Error } from './pages/Error'

// import components
// !import { Nav } from './components/Nav'
// import { Header } from './components/Header'
import { Landing, ProtectedRoute, Register } from './pages'
import { SharedLayout } from './pages/dashboard/SharedLayout'
import { Profile } from './pages/dashboard/Profile'

function App() {
  return (
    // <Router>
    <BrowserRouter>
      {/*  <Header /> */}
      <Routes>
        {/* parent route */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          {/* nested pages */}
          <Route index element={<Tracking />} />
          <Route path='search' element={<SearchFood />} />
          <Route path='all-foods' element={<FoodDiary />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        {/* <Route path='/' element={<Dashboard />} /> */}
        <Route path='/register' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
        {/* <Route path='/' element={<Tracking />} />
        <Route path='search' element={<SearchFood />} />
        <Route path='foods' element={<FoodDiary />} />
        <Route path='*' element={<Error />} /> */}
      </Routes>
      {/* ! */}
      {/* <Nav /> */}
    </BrowserRouter>
    // </Router>
  )
}

export default App
