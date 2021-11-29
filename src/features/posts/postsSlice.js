import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = {
  posts: [
    {
      id: '1',
      title: 'First Posts!',
      content: 'Hello!',
      date: sub(new Date(), { minutes: 10 }).toISOString(),
      user: '2',
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
    {
      id: '2',
      title: 'Second Post!',
      content: 'more text!',
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      user: '1',
      reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    },
  ],
  status: false,
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      // use a prepare callback function when the action.payload is complicated to prepare, so that the dispatch action object can become rather simple
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export const { reducer: postsReducer } = postsSlice

// Note the 'state' here really is the root state, because these two cb fn are to be used in useSelector()
export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
