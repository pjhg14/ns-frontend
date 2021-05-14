import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Input} from 'semantic-ui-react'

function AddComicForm(){
  const [comicTitle, setComicTitle] = useState("")
  const [issueNumber, setIssueNumber] = useState("")
  const [issueTitle, setIssueTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [publisher, setPublisher] = useState("")
  const [summary, setSummary] = useState("")
  const [imageURL, setImageURL] = useState("")
  const history = useHistory()
  
  function userComicTitle(e){
    setComicTitle(e.target.value)
  }

  function userIssueNumber(e){
    setIssueNumber(e.target.value)
  }

  function userIssueTitle(e){
    setIssueTitle(e.target.value)
  }

  function userAuthor(e){
    setAuthor(e.target.value)
  }

  function userPublisher(e){
    setPublisher(e.target.value)
  }

  function userSummary(e){
    setSummary(e.target.value)
  }

  function userImageURL(e){
    setImageURL(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    const newComicData = {
      title: comicTitle,
      author: author,
      publisher: publisher,
      summary: summary,
      image_url: imageURL,
      issue_number: parseInt(issueNumber),
      issue_title: issueTitle
    }
    fetch("http://localhost:9292/comics", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body:JSON.stringify(newComicData)
    })
      .then(r => r.json())
      .then(history.push("/comics"))
  }

  return(
    <div>
      <h2>Add a Comic</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="usertitle" className="label">Comic Series Title</label>
        <Input className="input" id="usertitle" value={comicTitle} onChange={userComicTitle} type="text" placeholder="Comic Series Title"></Input>
        <label htmlFor="userauthor" className="label">Author</label>
        <Input className="input" id="userauthor" value={author} onChange={userAuthor} type="text" placeholder="Author"></Input>
        <label htmlFor="userissuetitle" className="label">Issue Title</label>
        <Input className="input" id="userissuetitle" value={issueTitle} onChange={userIssueTitle} type="text" placeholder="Issue Title"></Input>
        <label htmlFor="userissuenumber" className="label">Issue Number</label>
        <Input className="input" id="userissuenumber" value={issueNumber} onChange={userIssueNumber} type="text" placeholder="Issue Number"></Input>
        <label htmlFor="userpublisher" className="label">Publisher</label>
        <Input className="input" id="userpublisher" value={publisher} onChange={userPublisher} type="text" placeholder="Publisher"></Input>
        <label htmlFor="usersummary" className="label">Summary</label>
        <Input className="input" id="usersummary" value={summary} onChange={userSummary} type="text" placeholder="Summary"></Input>
        <label htmlFor="userimageurl" className="label">Cover Image URL</label>
        <Input className="input" id="userimageurl" value={imageURL} onChange={userImageURL} type="text" placeholder="Cover Image URL"></Input>
        <button className="ui button">Submit New Comic</button>
      </form>
    </div>
  )
}

export default AddComicForm