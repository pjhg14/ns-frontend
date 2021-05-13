import { useState, useEffect, useContext } from 'react'
import { Button, Image, Modal, Comment, Form } from 'semantic-ui-react'
import { UserContext } from './App'

function ComicModal({id}){
  const user = useContext(UserContext)
  const [comic, setComic] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [userReview, setUserReview] = useState("")
  // const [userRating, setUserRating] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:9292/comics/${id}`)
      .then(res => res.json())
      .then(comicData => {
        setComic(comicData)
        setIsLoaded(true)
      })
  }, [id]);
    
  if (!isLoaded) return <h3>Loading...</h3>

  const { title, author, image_url, publisher, issue_number, issue_title, summary, reviews} = comic


  const review_array = reviews.map(reviewObj => {
    return ( 
      <Comment key={reviewObj.id}>
        <Comment.Content>
          <Comment.Author>{reviewObj.user.name}</Comment.Author>
          <Comment.Text>{reviewObj.content}</Comment.Text>
          <Comment.Text>My Rating: {reviewObj.rating}</Comment.Text>
        </Comment.Content>
      </Comment>
    )
    })
  // function rateComic(e){
  //   setUserRating(e.target.rating)
  //   console.log(userRating)
  // }
//   function onAddReview(newReview){
//     setComic({...comic, reviews:[...comic.reviews, newReview]})
// }

function handleReviewSubmit(e){
  e.preventDefault(); 
  const reviewData = {
    content: userReview,
    // rating: userRating,
    comic_id: parseInt(id),
    user_id: user.get.id,
    rating: 3
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
      console.log(updatedComic)
    })
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
          <p>Average User Rating: </p>
          <Comment.Group>
            <h3>Reviews</h3>
            {review_array}
            <Form onSubmit={handleReviewSubmit} reply>
              <Form.TextArea value={userReview} onChange={e => setUserReview(e.target.value)}/>
              {/* <Rating onRate={rateComic} value={userRating} maxRating={5} clearable/> */}
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