import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// - Our posts list read the initial set of posts from the store with useSelector and rendered the initial UI
// - We dispatched the postAdded action containing the data for the new post entry
// - The posts reducer saw the postAdded action, and updated the posts array with the new entry
// - The Redux store told the UI that some data had changed
// - The posts list read the updated posts array, and re-rendered itself to show the new post

export const PostsList = () => {
  const posts = useSelector((state) => state.posts)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  const renderedPosts = orderedPosts.map((post) => (
    // content of the List component
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
