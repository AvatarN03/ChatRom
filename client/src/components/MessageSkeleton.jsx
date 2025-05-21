import { Loader2 } from 'lucide-react'
import React from 'react'

const MessageSkeleton = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="p-4 bg-gray-800 rounded-lg shadow flex">
                {/* Right Side (Image + Username Skeleton) */}
                <div className="flex items-center space-x-4">
                    {/* Avatar Skeleton */}
                    <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full"></div>

                    {/* Username Skeleton */}
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
            <div className="flex-1 w-full h-30 flex justify-center items-center">
                <Loader2 className='animate-spin size-12' />
            </div>
            
            <div className="h-14 rounded-md w-full   bg-gray-900 animate-pulse  mb-2 mx-2"></div>
                
            

        </div>
    )
}

export default MessageSkeleton