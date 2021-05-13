import { useState, useEffect, useContext } from "react"
import { Button, Comment, Form } from "semantic-ui-react"
import { UserContext } from "./App"

function PostList({ group, setGroup }) {
    const { id } = group
    const user = useContext(UserContext)
    const [userPost, setUserPost] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/posts/${id}`)
        .then(res => res.json())
        .then(postData => {
          setPosts(postData)
        })
    }, [id])

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
            user_id: user.get.id,
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
            .then(newPost => {
                setPosts([...posts, newPost])
                setUserPost("")
            })
    }

    return(
        <Comment.Group>
            <h3>Posts:</h3>
            {postList}
            <Form onSubmit={handlePostSubmit} reply>
              <Form.TextArea value={userPost} onChange={e => setUserPost(e.target.value)}/>
              <Button content='Add to Thread' labelPosition='left' icon='edit' disabled={user.get.id <= 0} primary />
            </Form>
        </Comment.Group>
    )
}

export default PostList