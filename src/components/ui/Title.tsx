import React from 'react'

const Title = ({ children, loading }: any) => {
  if(loading)return <div className='animate-pulse bg-secondary w-2/3 h-10 rounded-full mb-6'></div>
  return (
    <h1 className='text-3xl font-bold mb-6'>{children}</h1>
  )
}

export default Title