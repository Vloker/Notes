import React from 'react'

function Arsip({date, title, text, deleted, move}) {
  return (
    <div className='flex flex-col border rounded-md border-gray-100 gap-3 w-64 justify-between'>

        <article className='flex flex-col gap-3 mx-4 my-2 max-w-full text-wrap'>
            <h3 className='font-bold truncate'>{title}</h3>
            <p className='text-xs'>{date}</p>
            <p className='text-sm'>{text}</p>
        </article>

        <div className='flex w-auto'>
                <button 
                    className='text-red-500 p-1 flex justify-center items-center w-full border border-gray-200 rounded-bl-md'
                    onClick={deleted}>
                    Deleted
                </button>
                <button 
                    className='text-yellow-500 p-1 flex justify-center items-center w-full border border-gray-200 rounded-br-md'
                    onClick={move}>
                    Pindahkan
                </button>
        </div>
    </div>
  )
}

export default Arsip