import { useEffect, useState } from 'react';
import { User, Calendar, CheckCircle } from 'lucide-react';

import { formatDate } from '../lib/dateFormat';
import { useParams } from 'react-router-dom';
import useAuth from "../store/useAuth.js"


export default function OtherProfile() {
  const { getProfileDetails } = useAuth();
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    isActive: true,
    profilePic: "",
    createdAt: "",
  });
  const { fullName, email, createdAt, profilePic, lastLoginAt } = userDetails;
  const isInactive = new Date() - new Date(lastLoginAt) > 30 * 24 * 60 * 60 * 1000;
  const formattedTime = formatDate(new Date(lastLoginAt));

  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const data = await getProfileDetails(id);
      console.log("data", data);
      setUserDetails(data);
    }
    fetchData();

    return () => {
      setUserDetails({
        fullName: "",
        email: "",
        isActive: true,
        profilePic: "",
        createdAt: "",
      });
    };
  }, [id]);


  return (
    <div className="h-full bg-[#1D232A] text-white">
      {/* Header */}
      <header className="bg-slate-900 p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-300">Profile Section</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">

        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-slate-600 p-4 md:p-6 flex flex-col md:flex-row items-center gap-3 md:gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-28 aspect-square rounded-full overflow-hidden border-4 border-blue-300">
                <img
                  src={profilePic || "/avatar.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* Name */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">{fullName}</h3>
              <p className="text-blue-300 mt-1">{email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Profile Information</h3>

            <div className="space-y-2 md:space-y-4">
              {/* Name Field */}
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="text-blue-400" size={20} />
                  <div>
                    <div className="text-sm text-blue-300">Full Name</div>
                    <div className="font-medium">{fullName}</div>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="text-blue-400" size={20} />
                  <div>
                    <div className="text-sm text-blue-300">Email Address</div>
                    <div className="font-medium">{email}</div>
                  </div>
                </div>
              </div>


              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="text-blue-400" size={20} />
                  <div>
                    <div className="text-sm text-blue-300">Member Since</div>
                    <div className="font-medium">
                      {
                        formatDate(createdAt)
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Status Field */}
              <div className="bg-slate-800 p-2 md:p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  {isInactive ? (
                    <XCircle className="text-red-400" size={20} />
                  ) : (
                    <CheckCircle className="text-green-400" size={20} />
                  )}
                  <div>
                    <div className="text-sm text-blue-300">Account Status</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{isInactive ? "Inactive" : "Active"}</span>
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${isInactive ? "bg-red-500" : "bg-green-400"
                          }`}
                      ></span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Last active: {formattedTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}