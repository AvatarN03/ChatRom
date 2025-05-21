import { Eye, EyeClosed, Loader2 } from 'lucide-react';
import  { useState } from 'react'
import useAuth from '../store/useAuth';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const {signup, isSigning} = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        signup(form)

    };

    return (
        <div className="w-full max-w-sm mx-auto bg-[#1D232A] text-white rounded-md py-4 px-6 shadow-lg">
            {/* Header */}
            <div className="flex flex-col justify-center items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                <p className="text-lg font-semibold">Create an Account</p>
            </div>

            {/* Divider */}
            <div className="w-[80%] my-4 mx-auto h-[1px] bg-gray-500 shadow-xl shadow-purple-500" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 text-sm font-medium">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="bg-gray-700 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your name"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 text-sm font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-gray-700 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="example@mail.com"
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-sm font-medium">Password:</label>
                    <div className="flex">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="bg-gray-700 rounded-sm p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 pr-4 flex-1"
                            placeholder="••••••••"
                        />
                        <span className='bg-blue-800 px-1 rounded-md cursor-pointer flex justify-center items-center'
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {
                                showPassword ? <Eye /> : <EyeClosed />
                            }
                        </span>
                    </div>
                </div>


                <button type="submit" className="btn btn-primary w-full" disabled={isSigning}>
              {isSigning ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            </form>
            <div className="flex flex-col justify-center items-center mt-8">
                <p>OR</p>
                <p className='text-slate-400'>Already have an Account ? <Link to={"/login"} className='text-blue-500 underline'>LogIn</Link></p>
            </div>
        </div>

    )
}

export default SignupForm
