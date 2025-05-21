import { useEffect, useState } from 'react';
import { User, Upload, Calendar, CheckCircle, Clock } from 'lucide-react';
import useAuth from '../store/useAuth';
import { formatDate } from '../lib/dateFormat';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("/avatar.svg");
  const { authUser, updateProfile, isUpdatingProfile } = useAuth();
  const { fullName, email, createdAt, profilePic } = authUser;



  const handleImageUpload =  async(e) => {
    const file = e.target.files[0];
    if (!file) return;

   const reader = new FileReader();

   reader.readAsDataURL(file);

   reader.onload = async()=>{
    const base64img = reader.result;
    setProfileImage(base64img);
    await updateProfile({profilePic: base64img})
   }
  };

  return (
    <div className="h-full bg-[#1D232A] text-white">
      {/* Header */}
      <header className="bg-slate-900 p-4 md:p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-300">My Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        {/* Greeting Section */}
        <div className="mb-5 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back,{" "}<span className='text-indigo-400'>{fullName}</span></h2>
          <p className="text-blue-300">Manage your profile information below.</p>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-slate-600 p-4 md:p-6 flex flex-row items-center gap-3 md:gap-6">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-28 aspect-square rounded-full overflow-hidden border-4 border-blue-300">
                <img
                  src={ profilePic || "/avatar.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 p-2 rounded-full cursor-pointer transition-all shadow-lg z-20">
                <Upload size={18} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
              <div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 rounded-full flex items-center justify-center transition-opacity">
                <span className="text-white text-sm font-medium">
                  {isUpdatingProfile ? 'Updating...' : 'Update Photo'}
                </span>
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
                  <CheckCircle className="text-green-400" size={20} />
                  <div>
                    <div className="text-sm text-blue-300">Account Status</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Active</span>
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
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