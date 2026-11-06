import { createSlice } from '@reduxjs/toolkit'

export type MotionPref = 'system' | 'full' | 'reduced'

const stored = (() => {
  try {
    return localStorage.getItem('motion') as MotionPref | null
  } catch {
    return null
  }
})()

const motionSlice = createSlice({
  name: 'motion',
  initialState: { pref: stored ?? 'system' } as { pref: MotionPref },
  reducers: {
    setMotion(state, action: { payload: MotionPref }) {
      state.pref = action.payload
    },
  },
})

export const { setMotion } = motionSlice.actions
export default motionSlice.reducer
