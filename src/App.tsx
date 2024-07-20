

import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Auth from './private/Auth'

function App() {


  return (
     <>
        <Routes>
          <Route path='' element={<Auth><Layout /></Auth>} />
          <Route path='signin' element={<SignIn />}/>
          <Route path='signup' element={<SignUp />} />
        </Routes>
     </>
  )
}

export default App
