import React, { useState } from 'react'
import useSearchStore from '../store/searchStore'

export default function SearchCard() {
  const { searchQuery, setSearchQuery } = useSearchStore((state) => ({
    searchQuery: state.searchQuery,
    setSearchQuery: state.setSearchQuery,
  }))

  const [showSearchCard, setShowSearchCard] = useState(false)

  const handleClear = (queryToRemove) => {
    const updatedQuery = searchQuery.filter((query) => query !== queryToRemove)
    setSearchQuery(updatedQuery)
  }

  const handleClearAll = () => {
    setSearchQuery([])
    setShowSearchCard(false)
  }

  return (
    <div
      className={
        searchQuery.length === 0
          ? 'hidden'
          : `flex rounded-md card flex-wrap shadow-lg  absolute top-40 left-[10%] items-center justify-between w-[80%] mx-auto gap-4 p-4 bg-white`
      }
    >
      <div className='flex items-center flex-wrap  gap-4'>
        <div className='flex gap-12 items-center mx-4'>
          {searchQuery.map((query, index) => (
            <div
              key={index}
              className='font-bold text-[700] rounded-sm text-[#7fbfbf] px-2 py-1 bg-[#edf2f3] relative'
            >
              {query}
              <button
                onClick={() => handleClear(query)}
                className='absolute top-0 right-0 -mr-8  p-2 bg-black rounded hover:bg-[#7fbfbf] text-white hover:text-white transition duration-300'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        <div
          onClick={handleClearAll}
          className='font-bold text-[700] cursor-pointer rounded-sm text-[#7fbfbf] px-2 py-1 underline '
        >
          Clear
        </div>
      </div>
    </div>
  )
}
