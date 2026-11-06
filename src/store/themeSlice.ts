import { createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

const stored = (() => {
  try {
    return localStorage.getItem('theme') as Theme | null
  } catch {
    return null
  }
})()

const prefersDark =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: stored ?? (prefersDark ? 'dark' : 'light') } as { mode: Theme },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
