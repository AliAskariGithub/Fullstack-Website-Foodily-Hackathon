import Loader from '@/components/Loader'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex relative top-0 left-0 bottom-0 right-0 z-50 items-center justify-center min-h-screen bg-peach'>
      <Loader />
    </div>
  )
}

export default Loading
