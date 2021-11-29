import { client } from '../../api/client'
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
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
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

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
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (rootState, action) => {
        rootState.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (rootState, action) => {
        rootState.status = 'succeeded'
        rootState.posts = rootState.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (rootState, action) => {
        rootState.status = 'failed'
        rootState.error = action.error.message
      })
  },
})
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export const { reducer: postsReducer } = postsSlice

// Note the 'state' here really is the root state, because these two cb fn are to be used in useSelector()
export const selectAllPosts = (rootState) => rootState.posts.posts
export const selectPostById = (rootState, postId) =>
  rootState.posts.posts.find((post) => post.id === postId)
