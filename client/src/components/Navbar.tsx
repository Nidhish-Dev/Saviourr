import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='px-12 rounded-3xl'>
      <ul className='flex gap-5 text-center justify-center items-center py-4 '>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/">Why Saviourr</Link></li>
        <li><Link href="/">About us</Link></li>
        <li className='bg-red-900 text-white px-2 py-1 rounded-md transition-all duration-300 hover:bg-red-700'>
          <Link href="/donor">Become Donor</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
