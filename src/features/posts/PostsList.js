import { Spinner } from '../../components/Spinner'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { fetchPosts, selectAllPosts } from './postsSlice'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'

// - Our posts list read the initial set of posts from the store with useSelector and rendered the initial UI
// - We dispatched the postAdded action containing the data for the new post entry
// - The posts reducer saw the postAdded action, and updated the posts array with the new entry
// - The Redux store told the UI that some data had changed
// - The posts list read the updated posts array, and re-rendered itself to show the new post

const PostExcerpt = ({ post }) => (
  <article className="post-excerpt" key={post.id}>
    <h3>{post.title}</h3>
    <div>
      <PostAuthor userId={post.user} />
      <TimeAgo timestamp={post.date} />
    </div>
    <p className="post-content">{post.content.substring(0, 100)}</p>

    <ReactionButtons post={post} />
    <Link to={`/posts/${post.id}`} className="button muted-button">
      View Post
    </Link>
  </article>
)

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector((rootState) => rootState.posts.status)
  const error = useSelector((rootState) => rootState.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, postStatus])

  let content

  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
