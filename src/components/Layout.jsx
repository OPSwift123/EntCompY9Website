import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'
import CursorGlow from './CursorGlow'

export default function Layout() {
  const { pathname } = useLocation()
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
