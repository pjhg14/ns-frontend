import ComicCard from './ComicCard'
import {useEffect, useState} from 'react'
import { comicsURL } from '../util/links'
import { Card, Dimmer, Loader, Segment } from 'semantic-ui-react'

function ComicPage(){
  const [comics, setComics] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch(comicsURL)
      .then(res => res.json())
      .then(comicData => {
        setComics(comicData)
        setIsLoaded(true)
      })
  }, [])

  const comicList = comics.map(comicObj => {
    return <ComicCard comic={comicObj} key={comicObj.id}/>
  })

  return (
    <div>
      <h2>Comics</h2>

    <Segment className="comic-segment">
      { isLoaded ? (
        <Card.Group itemsPerRow="4">
          {comicList}
        </Card.Group>
      ) : (
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      )}
    </Segment>
    </div>
  )
}

export default ComicPage