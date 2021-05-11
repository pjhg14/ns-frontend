import ComicModal from './ComicModal'
import { Card, Icon, Image, Button, Modal } from 'semantic-ui-react'

function ComicCard({comic}){
  const { id, title, author, image_url } = comic
  
  return(
    <div class="ui card">
      <Card>
        <Image src={image_url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>Written by: {author}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button class="ui button">Follow</Button>
          <ComicModal id={id}/>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ComicCard