import React, { useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { LuUsers2 } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [isActive, setIsActive] = useState('')
    const navigate = useNavigate();
    const handleClick = (value)=>{
        setIsActive(value)
        navigate(`/${value}`)

    }
  return (
    <div className='min-w-[13%] bg-gray-100 h-[100vh] flex flex-col justify-between items-center py-5 text-sm'>

        <div className='space-y-[40px]'>

            <div className='flex gap-2 items-center'>
                <div className='h-10 w-10 bg-black rounded-full overflow-hidden border-[2px] shadow-md shadow-[#c9c9c996]'>
                    <img src='https://media.licdn.com/dms/image/C4D0BAQG1Lf9BoZb10w/company-logo_200_200/0/1632915080218/hirequotient_logo?e=2147483647&v=beta&t=y1LRH4ef6YInzdIOi-nVkJT_tcnqhl5UgkuiORUS6os' 
                    alt='logo' className='w-full h-full object-cover'/>
                </div>
                <h1 className='font-semibold text-md'>Hire Quotient</h1>
            </div>

            <div className='flex flex-col gap-5 items-center text-sm'>
                
                <div className={`flex text-gray-600 items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${isActive ==='home' ? 'bg-[#0832DE] text-white':''}`}
                onClick={()=>handleClick('home')}>
                    <IoHomeOutline/>
                    <p>Home</p>
                </div>
                <div className={`flex text-gray-600 items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${isActive==='' ? 'bg-[#0832DE] text-white':''}`}
                onClick={()=>handleClick('')}>
                    <LuUsers2/>
                    <p>Users</p>
                </div>
                <div className={`flex text-gray-600 items-center gap-2 rounded-md px-3 py-2 cursor-pointer ${isActive ==='billing' ? 'bg-[#0832DE] text-white':''}`}
                onClick={()=>handleClick('billing')}>
                    <FaCreditCard/>
                    <p>Billing</p>
                </div>

            </div>

            </div>
            <div className='justify-self-end flex text-gray-600 items-center gap-2 rounded-md px-3 py-2'>
                    <GoSignOut/>
                    <p>Sign Out</p>
                </div>
        
    </div>
  )
}

export default Sidebar