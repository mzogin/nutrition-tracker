import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallSidebar } from '../../components'

export const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        {/* both sidebars hidden/shown based on screen size (only one of them rendered) */}
        <SmallSidebar />
        <BigSidebar />
        {/* 2nd column */}
        <div>
          <Navbar />
          <div id='dashboard-page' className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}
