import React, { useContext } from 'react'
import { RootContext, uploadFile } from './context'

const App = () => {
  const { state, dispatch } = useContext(RootContext)
  const handleClick = () => {
    uploadFile('')(dispatch)
  }

  return (
    <>
      <input type="file" />
      <button onClick={handleClick}>send</button>
      <p>url: {state.url}</p>
    </>
  )
}

export default App
