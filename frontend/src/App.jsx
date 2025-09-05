
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Update from './pages/Update'
import Logout from './pages/Logout'
import Home from './pages/Home'



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path='/update' element={<Update />} />
          <Route path='/logout' element={<Logout />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
