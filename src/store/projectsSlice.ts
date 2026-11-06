import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const projectsSlice = createSlice({
  name: 'projects',
  initialState: { techFilter: null as string | null },
  reducers: {
    setTechFilter(state, action: PayloadAction<string | null>) {
      state.techFilter = action.payload
    },
  },
})

export const { setTechFilter } = projectsSlice.actions
export default projectsSlice.reducer
