import { LogOut, User2 } from 'lucide-react'
import useAuth from '../store/useAuth'
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { authUser, logout } = useAuth();

  const {pathname} = useLocation();


  
  return (
    <header className='w-full min-h-16 flex bg-slate-200 dark:bg-slate-600 text-gray-800 dark:text-white'>
      <nav className='flex justify-between items-center w-full h-full px-4 max-w-screen-2xl mx-auto'>
        <Link to={"/"}>
          <div className="flex bg-gray-400 dark:bg-gray-700 p-2 justify-center items-center gap-1 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="pink" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <h1 className='font-semibold'>ChatRom</h1>
          </div>
        </Link>
        <div className="flex justify-between gap-2 md:gap-4 items-center">
          {
            authUser && (
              <>
                <Link to={"/profile"} className={`flex gap-2 justify-center items-center bg-gray-400 dark:bg-gray-700 p-1 md:p-2 rounded-md ${pathname ==='/profile'?"border-blue-400 border-2":""}`}>
                  <User2 />
                  <p className='text-sm  text-slate-800 dark:text-slate-300  hidden md:block'>Profile</p>
                </Link>
                <button className='bg-indigo-600 p-1 md:p-2 rounded-md flex gap-1' onClick={()=> logout()}>
                  <LogOut />
                  <p className='text-sm text-slate-300 hover:text-slate-100 hidden md:block'>Logout</p>
                </button>
              </>
            )
          }

        </div>
      </nav>
    </header>
  )
}

export default Navbar