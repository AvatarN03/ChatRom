
import SignupForm from '../components/SignupForm'

const SignupPage = () => {
  return (
    <section className="flex justify-center w-full items-center h-[80%] pt-10">
      <div className="w-[90%] max-w-5xl mx-auto rounded-md bg-[#283749] h-full">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 h-full px-2">
          <div className="w-full md:w-1/2 py-2 flex justify-center items-center h-full">
            <SignupForm />
          </div>

          <div className=" hidden md:flex justify-center items-center">
            <div className="grid grid-cols-3 gap-4 p-4">
              {Array.from({ length: 9 }).map((_, i) => (
               <div
               className="h-16 md:h-20 lg:h-32 aspect-square rounded-md animate-pulse bg-gradient-to-br from-indigo-400 via-gray-300 to-indigo-600"
               key={i}
             />
             
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage
