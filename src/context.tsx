import React, { createContext, useReducer, Dispatch, FC } from 'react'
import axios from 'axios'

interface State {
  url: string
}

const initialState: State = {
  url: ''
}

interface Action {
  type: 'setUrl'
  payload: {
    url: string
  }
}

export const uploadFile = (file: FormData) => async (dispatch: Dispatch<Action>) => {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } }
  try {
    const { data } = await axios.post<{ url: string }>('/api/upload', file, config)
    dispatch({ type: 'setUrl', payload: { url: data.url } })
  } catch (e) {
    console.error(e)
  }
}

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'setUrl':
      return {
        url: action.payload.url
      }
    default:
      return state
  }
}

export const RootContext = createContext<{ state: State; dispatch: Dispatch<Action> }>(null as any)

const Provider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <RootContext.Provider value={{ state, dispatch }}>{children}</RootContext.Provider>
}

export default Provider
