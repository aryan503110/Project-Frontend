import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
