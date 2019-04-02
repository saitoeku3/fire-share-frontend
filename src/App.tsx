import React, { useContext, useState } from 'react'
import { RootContext, uploadFile } from './context'

const App = () => {
  const { state, dispatch } = useContext(RootContext)
  const [file, setFile] = useState<FormData>(null as any)

  const changeFile = (event: any) => {
    const [inputFile] = event.target.files
    const formData = new FormData()
    formData.append('file', inputFile)
    setFile(formData)
  }

  const fileLink = state.url ? <a href={state.url}>{state.url}</a> : ''

  return (
    <>
      <input type="file" onChange={changeFile} />
      <button onClick={() => uploadFile(file)(dispatch)}>send</button>
      <div>{fileLink}</div>
    </>
  )
}

export default App
