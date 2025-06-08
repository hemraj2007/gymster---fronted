import React from 'react'
import { Footer, Navbar, Header } from '../components'

const Layout = ({ children }) => {
  return (
    <div className='layout'>
    
      <header>
        <Navbar />
        <Header />
      </header>

      <main className='main-container'>
        {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
