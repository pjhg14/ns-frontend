import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Input} from 'semantic-ui-react'
import { comicsURL } from '../util/links'

function AddComicForm(){
  const [comicTitle, setComicTitle] = useState("")
  const [issueNumber, setIssueNumber] = useState("")
  const [issueTitle, setIssueTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publisher, setPublisher] = useState("")
  const [summary, setSummary] = useState("")
  const [imageURL, setImageURL] = useState("")
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()

    const newComicData = {
      title: comicTitle,
      author: author,
      publisher: publisher,
      summary: summary,
      image_url: imageURL,
      issue_number: parseInt(issueNumber),
      issue_title: issueTitle
    }

    fetch(comicsURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body:JSON.stringify(newComicData)
    })
      .then(resp => resp.json())
      .then(history.push("/comics"))
  }

  return(
    <div>
      <h2>Add a Comic</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="usertitle" className="label">Comic Series Title</label>
        <Input 
          className="input" 
          id="usertitle" 
          value={comicTitle} 
          onChange={e => setComicTitle(e.target.value)} 
          type="text" 
          placeholder="Comic Series Title"
        />
        
        <label htmlFor="userauthor" className="label">Author</label>
        <Input 
          className="input" 
          id="userauthor" 
          value={author} 
          onChange={e => setAuthor(e.target.value)} 
          type="text" 
          placeholder="Author"
        />
        
        <label htmlFor="userissuetitle" className="label">Issue Title</label>
        <Input 
          className="input" 
          id="userissuetitle" 
          value={issueTitle} 
          onChange={e => setIssueTitle(e.target.value)} 
          type="text" 
          placeholder="Issue Title"
        />
        
        <label htmlFor="userissuenumber" className="label">Issue Number</label>
        <Input 
          className="input" 
          id="userissuenumber" 
          value={issueNumber} 
          onChange={e => setIssueNumber(e.target.value)} 
          type="text" 
          placeholder="Issue Number"
        />
        
        <label htmlFor="userpublisher" className="label">Publisher</label>
        <Input 
          className="input" 
          id="userpublisher" 
          value={publisher} 
          onChange={e => setPublisher(e.target.value)} 
          type="text" 
          placeholder="Publisher"
        />
        
        <label htmlFor="usersummary" className="label">Summary</label>
        <Input 
          className="input" 
          id="usersummary" 
          value={summary} 
          onChange={e => setSummary(e.target.value)} 
          type="text" 
          placeholder="Summary"
        />
        
        <label htmlFor="userimageurl" className="label">Cover Image URL</label>
        <Input 
          className="input" 
          id="userimageurl" 
          value={imageURL} 
          onChange={e => setImageURL(e.target.value)} 
          type="text" 
          placeholder="Cover Image URL"
        />
        
        <button className="ui button">Submit New Comic</button>
      </form>
    </div>
  )
}

export default AddComicForm