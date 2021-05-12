function PostList({posts}){
  
  
  const postArray = posts.map(post => {
    return <p key={post.id}>{post.content}</p>
  })
  return (
    <div>
      {postArray}
    </div>
  )
}

export default PostList