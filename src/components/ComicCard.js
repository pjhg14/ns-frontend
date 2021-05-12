import ComicModal from './ComicModal'

function ComicCard({comic}){
  const { id, title, author, image_url } = comic
  
  return(
    
      <div class="ui card">
        <div class="image">
          <img src={image_url} alt={title}/>
        </div>
        <div class="content">
          <div class="cardHeader">{title}</div>
            <div class="meta">
              <span>Written by: {author}</span>
            </div>
          </div>
          <div class="extra content">
            <ComicModal id={id}/>
        </div>
      </div>
    
  )
}

export default ComicCard