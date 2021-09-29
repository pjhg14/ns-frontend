import { Button, Card, Image } from 'semantic-ui-react'
import ComicModal from './ComicModal'

function ComicCard({ comic }){
  const { id, title, author, image_url } = comic
  
  return(
    <Card className="comic-card">
      <Image src={image_url} alt={title}/>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span>Written by: {author}</span>
        </Card.Meta>
      </Card.Content>
      <Button.Group>
        <ComicModal id={id}/>
      </Button.Group>
    </Card>
    
  )
}

export default ComicCard