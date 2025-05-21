
const NoChatBox = () => {
  return (
   // Logo when no chat is selected
   <div className="flex-1 flex items-center justify-center bg-gray-900">
   <div className="text-center">
     <div className="flex justify-center mb-4">
       <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center animate-bounce">
         <img src="./logo.svg" alt="" className='w-full h-full object-cover p-4'/>
       </div>
     </div>
     <h2 className="text-2xl font-bold text-white">Welcome to ChatRom</h2>
     <p className="text-gray-400 mt-2">Select a conversation to start chatting</p>
   </div>
 </div>
  )
}

export default NoChatBox