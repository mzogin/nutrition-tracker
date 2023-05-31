import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link, Navigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

export const Landing = () => {
  const { user } = useAppContext()
  return (
    <React.Fragment>
      {user && <Navigate to='/' />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              food <span>tracking</span> app
            </h1>
            <p>
              Explore a wide database full of plant-based foods, including
              fruits, vegetables, and prepared dishes. Keep track of your
              micronutrient intake to make sure you meet all of your
              requirements. Your daily requirements are based off your user
              profile information found on the profile page, so make sure to
              keep your profile info up to date for the most accurate feedback!
            </p>
            <Link to='/register' className='btn btn-hero'>
              Login/Register
            </Link>
          </div>
        </div>
      </Wrapper>
    </React.Fragment>
  )
}
