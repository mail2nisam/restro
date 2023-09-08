import { useRouteError } from 'react-router-dom'
import React from 'react'

const Error = () => {
    const error = useRouteError()

  return (
    <div>
        <h1>Oops!!</h1>
        <h2>{error.data}</h2>
        </div>
  )
}

export default Error