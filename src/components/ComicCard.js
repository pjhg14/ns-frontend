import { Card, Icon, Image } from 'semantic-ui-react'

function ComicCard({comic}){
  const { id, title, author, publisher, summary, image_url } = comic
  
  return(
    <div class="ui card">
      <Card>
        <Image src={image_url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span className='date'>{author}</span>
            <span className='date'>Published by: {publisher}</span>
          </Card.Meta>
          <Card.Description>
            {summary}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
          <Icon name='user' />
           22 Friends
          </a>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ComicCard