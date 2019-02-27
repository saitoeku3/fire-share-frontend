import React, { createContext, Dispatch, useReducer } from 'react'
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

export const uploadFile = (file: any) => (dispatch: Dispatch<Action>) =>
  axios.post<{ url: string }>('/api/upload', { file }).then(res => {
    dispatch({ type: 'setUrl', payload: { url: res.data.url } })
    return res
  })

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

const Provider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <RootContext.Provider value={{ state, dispatch }}>{children}</RootContext.Provider>
}

export default Provider
