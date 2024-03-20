import React from 'react'

function Searching({onChange, value}) {

  return (
    <div className='d-flex items-center'>
        <input className='bg-black w-72 border rounded-md border-gray-100 p-2 text-sm focus:outline-none' 
            placeholder='Cari Catatan...' 
            id='search' 
            type="text"
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default Searching