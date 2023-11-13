import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import  Login  from "./pages/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import Signup from "./pages/Signup";
import { Navbar } from "./components/Common/Navbar";
import { useEffect } from "react";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./components/core/Auth/PrivateRoute";
import { Error } from "./pages/Error";
function App() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.profile)
  
  // useEffect(()=>{
  //   if(localStorage.getItem("token")){
  //     const token = JSON.parse(localStorage.getItem("token"))
  //     dispatch(getUserDetails(token,navigate))
  //   }
  // })
  return <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
      <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
      <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
      <Route
          path="/about"
          element={
              <OpenRoute>
                
              <About />
              </OpenRoute>
                      }
        />

      <Route
        path="/contact"
        element = {<Contact/>}
      />

      <Route
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
      >
        <Route path="dashboard/my-profile" element={<MyProfile/>}/>

      </Route>

      <Route path="*" element={<Error/>}/>

    </Routes>

    
  </div>;
}

export default App;
