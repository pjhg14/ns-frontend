import { useState } from "react"
import { Button, Input } from "semantic-ui-react"

function AddGroupForm({ onGroupAdd }) {
    const [title, setTitle] = useState("")

    function handleFormSubmit(event) {
        event.preventDefault()

        const newGroup = {
            title: title,
            user_id: 131
        }

        fetch("http://localhost:9292/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGroup),
        })
            .then((resp) => resp.json())
            .then(addedGroup => {
                onGroupAdd(addedGroup)
            })
    }
    
    return(
        <form className="form" onSubmit={handleFormSubmit}>
            <label htmlFor="usertitle" className="label">Thread Topic</label>
            <Input className="input" id="usertitle" value={title} onChange={e => setTitle(e.target.value)} 
                type="text" placeholder="Thread Topic"></Input>
            <button className="ui button">Create New Thread</button>
        </form>
    )
}

export default AddGroupForm 