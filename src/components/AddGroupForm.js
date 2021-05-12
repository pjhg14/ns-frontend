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
            <label htmlFor="usertitle" className="label">Group Title</label>
            <Input className="input" id="usertitle" value={title} onChange={e => setTitle(e.target.value)} 
                type="text" placeholder="Group Title"></Input>
            <button className="ui button">Create new group</button>
        </form>
    )
}

export default AddGroupForm 