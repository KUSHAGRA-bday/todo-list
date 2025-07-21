import React from 'react'


const Navbar = () => {
    return (
        <nav className='flex justify-between  bg-slate-700 text-white py-3'>
            <div className="logo">
         <span className="font-bold text-xl mx-12 ">mY-work</span>
            </div>
            <ul className="flex gap-10 mx-12 ">
                <li className='cursor-pointer hover:font-bold'>Home</li>
                <li className='cursor-pointer hover:font-bold'>Your task</li>
            </ul>
        </nav>
    )
}

export default Navbar
