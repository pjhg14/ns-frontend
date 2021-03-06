import { useState, useEffect, useContext } from "react"
import { Button, Comment, Dimmer, Form, Icon, Loader } from "semantic-ui-react"
import { UserContext } from "./App"
import { postURL } from '../util/links';

function PostList({ group }) {
    const { id } = group
    const user = useContext(UserContext)
    const [userPost, setUserPost] = useState("")
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`${postURL}/${id}`)
        .then(res => res.json())
        .then(postData => {
          setPosts(postData)
          setIsLoaded(true)
        })
    }, [id])

    const postList = posts.map(post => {
        return (
            <Comment key={post.id}>
                <Comment.Content>
                    <Comment.Author>{post.user.name}</Comment.Author>
                    <Comment.Text>{post.content}</Comment.Text>
                    <Comment.Actions className="trashIcon">
                        {post.user.id === user.get.id && <Comment.Action onClick={() => handleDeletePost(post)}>
                            <Icon name='trash' />
                            Delete
                        </Comment.Action>}
                    </Comment.Actions>
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

    function handleDeletePost(target) {
        fetch(postURL + target.id, {
            method: "DELETE",
        })
            .then(resp => resp.json())
            .then(newPosts => {
                setPosts(newPosts)
            });
    }

    return(
        <Comment.Group>
            <h3>Posts:</h3>
            { isLoaded ? (
                postList
            ) : (
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            )}
            <Form onSubmit={handlePostSubmit} reply>
              <Form.TextArea value={userPost} onChange={e => setUserPost(e.target.value)}/>
              <Button content='Add to Thread' labelPosition='left' icon='edit' disabled={user.get.id <= 0} primary />
            </Form>
        </Comment.Group>
    )
}

export default PostList