import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex flex-row justify-between items-center bg-slate-700 text-white py-3 px-4 sm:px-12'>
            <div className="flex flex-row items-center gap-4">
                <span className="font-bold text-lg sm:text-xl">mY-work</span>
                <span className='hidden sm:inline-block'>|</span>
            </div>
            <ul className="flex flex-row gap-4 sm:gap-10 items-center">
                <li className='cursor-pointer hover:font-bold text-base sm:text-lg'>Home</li>
                <li className='cursor-pointer hover:font-bold text-base sm:text-lg'>Your task</li>
            </ul>
        </nav>
    )
}

export default Navbar