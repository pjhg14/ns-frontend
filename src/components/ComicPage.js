import ComicCard from './ComicCard'
import {useEffect, useState} from 'react'

function ComicPage(){
  const [comics, setComics] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/comics')
      .then(res => res.json())
      .then(comicData => setComics(comicData))
  }, [])

  const comic = comics.map(comicObj => {
    return <ComicCard comic={comicObj} key={comicObj.id}/>
  })

  return (
    <div>
      <h2>Comics!</h2>
        {comic}
    </div>
  )
}

export default ComicPage