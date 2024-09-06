// import './App.css'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Landing from "./pages/Landing"
import Availability from "./pages/Availability"
import { useState } from "react"
import RefreshHandler from "./RefreshHandler"

function App() {

  const [isAuth,setIsAuth] = useState(false);
  const PrivateRoute = ({el})=>{
    return isAuth ? el : <Navigate to="/login"/>
  }

  return (
    <div className="app">
      <RefreshHandler setIsAuth={setIsAuth}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        {/* <Route path="/home" element={<Home/>} /> */}
        <Route path="/landing" element={ <PrivateRoute el={<Landing/>}/>} />
        <Route path="/availability" element={<Availability/>} />
      </Routes>
    </div>
  )
}

export default App
