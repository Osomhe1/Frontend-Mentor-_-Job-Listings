import React, { useMemo, useState } from 'react'
import useSearchStore from '../store/searchStore'
import SearchCard from './SearchCard'

export default function Card() {
  const { searchQuery, setSearchQuery, data } = useSearchStore((state) => ({
    searchQuery: state.searchQuery,
    data: state.data,
    setSearchQuery: state.setSearchQuery,
  }))
  const [showSearchCard, setShowSearchCard] = useState(false)

  const jobs = useMemo(() => {
    if (searchQuery.length > 0) {
      return data.filter((item) =>
        searchQuery.every((query) => item.languages.includes(query))
      )
    }
    return data
  }, [data, searchQuery])

  // Handler for updating search query
  const handleSearch = (e) => {
    console.log([...searchQuery, ...e])
    setShowSearchCard(true)
    setSearchQuery([...searchQuery, ...e])
  }

  return (
    <>
      {jobs.map((job, index) => (
        <div
          key={index}
          className={`flex rounded-md ${
            job?.featured ? 'border-l-4 border-l-[#7fbfbf]' : ''
          }  shadow-lg card flex-wrap my-8 items-center justify-between w-[80%] mx-auto gap-4 p-4 bg-white`}
        >
          <div className='flex items-center gap-4'>
            <div className=''>
              {!job?.logo || job?.logo === '' ? (
                <div className='w-20 h-20 flex items-center justify-center rounded-full bg-gray-300 text-gray-600'>
                  <span className='text-xl font-bold'>AB</span>
                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                    <path
                      fillRule='evenodd'
                      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-1.74 5.67a6 6 0 00-8.52-8.52 6 6 0 108.52 8.52z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
              ) : (
                <img
                  className='inline-block h-20 w-20 rounded-full'
                  src={job?.logo}
                  alt='company logo'
                />
              )}
            </div>
            <div className=''>
              <div className=' flex my-2 gap-4 flex-wrap'>
                <h3 className='font-bold text-[#7fbfbf]'>{job?.company}</h3>
                {job?.new && (
                  <span className='inline-flex uppercase items-center rounded-full bg-[#7fbfbf] px-2 py-1 text-xs font-bold text-white  '>
                    new!
                  </span>
                )}
                {job?.featured && (
                  <span className='inline-flex uppercase items-center rounded-full bg-[#384e59] px-2 py-1 text-xs font-bold text-white  '>
                    Featured
                  </span>
                )}
              </div>
              <div className='text-[#384e59]'>
                <h2 className='font-bold capitalize text-[#384e59] hover:text-[#7fbfbf] cursor-pointer '>
                  {job?.position}
                </h2>
              </div>
              <div className='flex font-semibold my-2 gap-4 flex-wrap text-[#9fb3b8]  '>
                <p>{job?.postedAt}</p>.
                <p className='capitalize'>{job?.contract}</p>.
                <p className='capitalize'>{job?.location}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap gap-2'>
            {job?.languages.map((lang, index) => (
              <div
                key={index}
                onClick={() => handleSearch([lang])}
                className='font-bold text-[700] rounded-sm text-[#7fbfbf] px-2 py-1 cursor-pointer hover:text-white hover:bg-[#7fbfbf] bg-[#edf2f3] '
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      ))}

      {showSearchCard && <SearchCard />}
    </>
  )
}
