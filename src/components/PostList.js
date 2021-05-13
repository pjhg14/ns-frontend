import { useState } from "react"
import { Button, Comment, Form } from "semantic-ui-react"

function PostList({ group, setGroup }) {
    const { id, posts } = group
    const [userPost, setUserPost] = useState("")

    const postList = posts.map(post => {
        return (
            <Comment key={post.id}>
                <Comment.Content>
                    <Comment.Author>{post.user.name}</Comment.Author>
                    <Comment.Text>{post.content}</Comment.Text>
                </Comment.Content>
            </Comment>
        )
    })

    function handlePostSubmit(event) {
        event.preventDefault()

        const newPost = {
            group_id: id,
            user_id: 131,
            content: userPost
        }

        fetch("http://localhost:9292/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
            .then((resp) => resp.json())
            .then(updatedGroup => {
                setGroup(updatedGroup)
            })
    }

    return(
        <Comment.Group>
            <h3>Posts:</h3>
            {postList}
            <Form onSubmit={handlePostSubmit} reply>
              <Form.TextArea value={userPost} onChange={e => setUserPost(e.target.value)}/>
              <Button content='Add to Thread' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )
}

export default PostList