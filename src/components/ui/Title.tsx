import React from 'react'

const Title = ({ children, loading }: any) => {
  if (loading) return <div className='animate-pulse bg-secondary md:w-[500px] h-10 rounded-full mb-6 '></div>
  return (
    <h1 className='text-2xl font-semibold mb-3  md:text-3xl md:mb-6 dark:text-white'>{children}</h1>
  )
}

export default Title