import React, { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RootContext, uploadFile } from './context'

const App = () => {
  const { state, dispatch } = useContext(RootContext)
  const [file, setFile] = useState<FormData>(null as any)

  const fileLink = state.url ? <a href={state.url}>{state.url}</a> : ''

  // Dropzone
  const onDrop = useCallback((acceptedFiles: any) => {
    const [file] = acceptedFiles
    const formData = new FormData()
    formData.append('file', file)
    setFile(formData)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const message = isDragActive ? 'Drop the files here ...' : 'Drop or click here!'

  return (
    <>
      <h1>Fire Share</h1>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={{ margin: 0 }}>{message}</p>
      </div>
      <button onClick={() => uploadFile(file)(dispatch)}>send</button>
      <div>{fileLink}</div>
    </>
  )
}

export default App
