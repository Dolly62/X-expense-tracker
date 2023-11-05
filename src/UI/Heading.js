import React from 'react'

const Heading = (props) => {
  return (
    <h3 style={{color: "purple"}} className='mb-4'>
      {props.children}
    </h3>
  )
}

export default Heading
