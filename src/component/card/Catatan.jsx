import React from 'react'

function Catatan({date, title, text, deleted, archives}) {
  return (
    <div className='flex flex-col border rounded-md border-gray-100 gap-3 min-w-64 max-w-64 justify-between'>

        <article className='space-y-3 mx-4 my-2 max-w-auto'>
            <div>
                <p className='text-xl font-bold truncate'>{title}</p>
                <p className='text-xs'>{date}</p>
            </div>
            <p className='text-sm break-words'>{text}</p>
        </article>

        <div className='flex'>
                <button 
                    className='text-red-500 p-1 flex justify-center items-center w-full border border-gray-200 rounded-bl-md'
                    onClick={deleted}>
                    Deleted
                </button>
                <button 
                    className='text-yellow-500 p-1 flex justify-center items-center w-full border border-gray-200 rounded-br-md'
                    onClick={archives}>
                    Arsipkan
                </button>
        </div>
    </div>
  )
}

export default Catatan