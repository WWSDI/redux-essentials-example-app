import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Posts!', content: 'Hello!' },
  { id: '2', title: 'Second Post!', content: 'more text!' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      // use a prepare callback function when the action.payload is complicated to prepare, so that the dispatch action object can become rather simple
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})
export const { postAdded, postUpdated } = postsSlice.actions
export const { reducer: postsReducer } = postsSlice
