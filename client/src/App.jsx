import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import { HomePage, SignupPage, LoginPage, ProfilePage } from "./pages"
import { useEffect } from 'react';
import useAuth from "./store/useAuth.js"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useChatStore } from './store/useChatStore.js';
import OtherProfile from './pages/OtherProfile.jsx';

const App = () => {
  const { authUser, checkUser, isCheckingAuth, onlineUsers } = useAuth();
  const { setSelectedUser } = useChatStore();
  
  const handleWindow = (event) => {
    if (event.key === "Escape") {
      setSelectedUser(null);
    }  };

  useEffect(() => {
    window.addEventListener("keydown", handleWindow);
    return () => {
      window.removeEventListener("keydown", handleWindow);
    };
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser])

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen max-w-5xl mx-auto flex-col" >
        <Loader className="size-10 animate-spin" />
        <p className='animate-pulse '> Loading . . .</p>
      </div>
    );
    console.log("online",onlineUsers)

  return (
    <div className="max-h-screen h-screen w-full flex flex-col"  >
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />

        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />

        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />

        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/:id" element={authUser ? <OtherProfile /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </div>
  )}

export default App