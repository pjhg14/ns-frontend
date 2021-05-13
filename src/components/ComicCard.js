import ComicModal from './ComicModal'

function ComicCard({comic}){
  const { id, title, author, image_url } = comic
  
  return(
    
      <div className="ui card">
        <div className="image">
          <img src={image_url} alt={title}/>
        </div>
        <div className="content">
          <div className="cardHeader">{title}</div>
            <div className="meta">
              <span>Written by: {author}</span>
            </div>
          </div>
          <div className="extra content">
            <ComicModal id={id}/>
        </div>
      </div>
    
  )
}

export default ComicCard