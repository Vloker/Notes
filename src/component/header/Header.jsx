import React, { useState } from 'react';
import Searching from '../inputan/Searching';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // memastikan onSearch adalah sebuah fungsi sebelum memanggilnya
    if (typeof onSearch === 'function') {
      onSearch(term);
    }
  };

  return (
    <header className='xl:container xl:mx-auto p-4'>
      <div className='flex justify-between'>
        <p className='text-3xl p-0'>Notes</p>
        <Searching value={searchTerm} onChange={handleChange} />
      </div>
      <div className='border w-full my-3'></div>
    </header>
  );
}

export default Header;
