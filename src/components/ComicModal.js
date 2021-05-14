import { useState, useEffect, useContext } from 'react'
import { Button, Image, Modal, Comment, Form, Rating, Icon } from 'semantic-ui-react'
import { UserContext } from './App'

function ComicModal({id}){
  const user = useContext(UserContext)
  const [comic, setComic] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [userReview, setUserReview] = useState("")
  const [userRating, setUserRating] = useState("")

  useEffect(() => {
    fetch(`http://localhost:9292/comics/${id}`)
      .then(res => res.json())
      .then(comicData => {
        setComic(comicData)
        setIsLoaded(true)
      })
  }, [id]);
    
  if (!isLoaded) return <p>Loading...</p>

  const { title, author, image_url, publisher, issue_number, issue_title, rating_average, summary, reviews} = comic


  const review_array = reviews.map(reviewObj => {
    return ( 
      <Comment key={reviewObj.id}>
        <Comment.Content>
          <Comment.Author>{reviewObj.user.name}</Comment.Author>
          <Comment.Text>{reviewObj.content}</Comment.Text>
          <Comment.Text>My Rating: {reviewObj.rating}</Comment.Text>
          <Comment.Actions>
            {reviewObj.user.id === user.get.id &&
              <Comment.Action onClick={() => handleReviewDelete(reviewObj)}>
                <Icon name='trash' />
              </Comment.Action>
            }
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    )
    })


function rateComic(e, { rating, maxRating }){
  setUserRating(rating)
}

function handleReviewSubmit(e){
  e.preventDefault(); 
  const reviewData = {
    content: userReview,
    comic_id: parseInt(id),
    user_id: user.get.id,
    rating: parseInt(userRating)
  }
  fetch("http://localhost:9292/reviews", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body:JSON.stringify(reviewData)
  })
    .then(r => r.json())
    .then(updatedComic => {
      setComic(updatedComic)
      setUserReview("")
    })
  }
  
  function handleReviewDelete(target) {
    fetch("http://localhost:9292/reviews/" + target.id, {
            method: "DELETE",
        })
            .then((resp) => resp.json())
            .then(updatedComic => {
                setComic(updatedComic)
            });
  }

  return(
    <div>
       <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Details</Button>}
    >
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={image_url} wrapped />
        <Modal.Description>
          <h3>{issue_title}</h3>
          <p>Issue #{issue_number}</p>
          <p>Written by: {author}</p>
          <p>Publisher: {publisher}</p>
          <p>{summary}</p>
          <p>Average User Rating: {rating_average}</p>
          <Comment.Group>
            <h3>Reviews</h3>
            {review_array}
            <Form onSubmit={handleReviewSubmit} reply>
              <Form.TextArea value={userReview} onChange={e => setUserReview(e.target.value)}/>
              <Rating onRate={rateComic} value={userRating} maxRating={5} clearable/>
              <Button content='Add Review' labelPosition='left' icon='edit' disabled={user.get.id <= 0} primary />
            </Form>
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default ComicModal