import React, { useCallback, useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { RootContext, uploadFile } from './context'

const App = () => {
  const { state, dispatch } = useContext(RootContext)
  const [formData, setFormData] = useState<FormData>(null as any)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [inputFile] = acceptedFiles
    const fd = new FormData()
    fd.append('file', inputFile)
    setFormData(fd)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Fire Share</h1>
      <Dropzone {...getRootProps()}>
        <input {...getInputProps()} />
        <p style={{ margin: 'auto' }}>
          {isDragActive
            ? 'Drop the file here ...'
            : 'Drag and drop file here, or click to select file'}
        </p>
      </Dropzone>
      <UploadButton onClick={() => uploadFile(formData)(dispatch)}>upload</UploadButton>
      {state.url && <p>Share Link: {state.url}</p>}
    </div>
  )
}

export default App

const Dropzone = styled.div`
  align-items: center;
  background-color: #ddd;
  border: dashed black;
  cursor: pointer;
  display: flex;
  height: 40vh;
  margin: 0 auto 32px auto;
  width: 70vw;
`

const UploadButton = styled.button`
  cursor: pointer;
  font-size: 16px;
  height: 32px;
  width: 128px;
`
