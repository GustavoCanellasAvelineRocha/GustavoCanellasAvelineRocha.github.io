import { createContext, useContext } from 'react'

export const ReadyContext = createContext(true)
export const useReady = () => useContext(ReadyContext)
