import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap'>
      <div className='w-full block' >
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer logo="OncePost"/>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default App
