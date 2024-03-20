import React from 'react'

function Button({onclick}) {
  return (
      <button 
        className='font-bold flex justify-center items-center py-2 width-full border rounded-md border-gray-100'
        id="searchSubmit"
        onClick={onclick}
        type="submit">
          Buat
      </button>
  )
}

export default Button