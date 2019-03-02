import React, { useContext, useState } from 'react'
import { RootContext, uploadFile } from './context'

const App = () => {
  const { state, dispatch } = useContext(RootContext)
  const [file, setFile] = useState<FormData>(null as any)

  const changeFile = (event: any) => {
    const inputFile = event.target.files[0]
    const formData = new FormData()
    formData.append('file', inputFile)
    setFile(formData)
  }

  return (
    <>
      <input type="file" onChange={changeFile} />
      <button onClick={() => uploadFile(file)(dispatch)}>send</button>
      <p>url: {state.url}</p>
    </>
  )
}

export default App
