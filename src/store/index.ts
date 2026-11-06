import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import theme from './themeSlice'
import projects from './projectsSlice'
import motion from './motionSlice'

export const store = configureStore({ reducer: { theme, projects, motion } })

store.subscribe(() => {
  try {
    localStorage.setItem('theme', store.getState().theme.mode)
    localStorage.setItem('motion', store.getState().motion.pref)
  } catch {}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
