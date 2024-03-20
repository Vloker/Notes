import React from 'react'
import { useState } from 'react'

function Inputan({values, onchange, require}) {

  const [maxChars, setMaxChars] = useState(50);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 50) {
      const remaining = 50 - inputValue.length;
      setMaxChars(remaining);
      onchange(event);
    }else {
      event.target.value = inputValue.slice(0, 50);
    }
  };


  return (
    <div className='flex justify-end flex-col gap-3 '>
      <p className='text-sm text-right' htmlFor="">Sisa karakter : {maxChars} </p>
      <input className='bg-black w-full border rounded-md border-gray-100 p-2 text-sm focus:outline-none' 
        id='inputanJudul' 
        placeholder='ini adalah judul ......'
        type="text"
        value={values}
        name='judul'
        onChange={handleInputChange}
        />
        <span className='text-red-500 text-xs'>{require}</span>
    </div>
  )
}

export default Inputan