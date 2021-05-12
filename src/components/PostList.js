function PostList({ group, setGroup }) {
    const { posts } = group

    const postList = posts.map(post => {
        return <p key={post.id}>{post.content}</p>
    })

    return(
        <div>
            {postList}
        </div>
    )
}

export default PostList