import { useState, useEffect } from 'react'
import { Button, Header, Image, Modal, Comment, Form } from 'semantic-ui-react'

function ComicModal({id}){
  
  const [comic, setComic] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:9292/comics/2`)
      .then(res => res.json())
      .then(comicData => {
        setComic(comicData)
        setIsLoaded(true)
      })
  }, [id]);
    
  if (!isLoaded) return <h3>Loading...</h3>

  const { title, author, image_url, publisher, summary, reviews} = comic

  const review_array = reviews.map(reviewObj => {
    return ( 
    <p className="reviews" key={reviewObj.id}>{reviewObj.content}</p>
      // <Comment key={reviewObj.id}>
      //   <Comment.Content>
      //     <Comment.Author as='a'>{reviewObj.user.name}</Comment.Author>
      //     <Comment.Text>{reviewObj.content}</Comment.Text>
      //     <Comment.Actions>
      //       <Comment.Action>Reply</Comment.Action>
      //     </Comment.Actions>
      //   </Comment.Content>
      // </Comment>
    )
  })
  return(
    <div>
       <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={image_url} wrapped />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>Written by: {author}</p>
          <p>Publiser: {publisher}</p>
          <p>
            Summary: {summary}
          </p>
          <Comment.Group>
            {review_array}
            <Form reply>
              <Form.TextArea />
              <Button content='Add Reply' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default ComicModal