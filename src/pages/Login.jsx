import frameImg from "../assets/Images/student_frame.png"
import img from "../assets/Images/Student.png"
import  Template  from "../components/core/Auth/Template"
import { FcGoogle } from "react-icons/fc"
import {Navbar} from "../components/Common/Navbar"
import LoginForm from "../components/core/Auth/LoginForm"
function Login(){
    return(
        <div>
        
        
        <div className='flex w-11/12 mt-8 justify-between max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0 '>
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem]'>
                Welcome Back</h1>
            <p className='flex flex-col text-[1.125rem] leading-[1.625rem] mt-4'>
                <span className=' text-richblack-100'>Build skills for today, tommorrow and beyond.</span>
                <span className=' text-blue-100 italic'>Education to future-proof your career</span>
            </p>
             (<LoginForm/>)
                                        
                                        
            

            <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='h-[1px] bg-gray-500 w-full'></div>
                <p className=' text-richblack-100 font-medium leading-[1.375rem] '>OR</p>
                <div className='h-[1px] bg-gray-500 w-full'></div>
            </div>
            <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
            border border-gray-700 px-[12px] py-[8px] gap-x-2 mt-6'>
                <FcGoogle/>
                <p>Sign Up with Google</p>
            </button>
        </div>
        <div className='relative w-11/12 max-w-[400px] '>
            <img src={frameImg} alt='img-frame' width={500} height={504}
                loading='lazy'
            />
            <img src={img} alt='Students' width={500} height={490}
                loading='lazy' 
                className='absolute -top-4 right-4'
                />
        </div>
    </div>
        </div>
    )
}



export default Login;
