import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Posts!', content: 'Hello!' },
  { id: '2', title: 'Second Post!', content: 'more text!' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
})

export const {reducer: postsReducer} = postsSlice.reducer