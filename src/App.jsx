import React from 'react'
import Sidebar from './components/Sidebar'
import Users from './components/Users'
import { Routes,Route } from 'react-router-dom'


const App = () => {
  return (
    <div className='flex w-full'>
      <Sidebar/>
      <Routes>
        <Route path='/' element ={<Users/>}/>
      </Routes>
    </div>
  )
}

export default App