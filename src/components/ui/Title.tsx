import React from 'react'

const Title = ({ children, loading }: any) => {
  if (loading) return <div className='animate-pulse bg-secondary w-2/3 h-10 rounded-full mb-6 md:hidden'></div>
  return (
    <h1 className='text-2xl font-semibold mb-3 mt-2 md:hidden dark:text-white'>{children}</h1>
  )
}

export default Title