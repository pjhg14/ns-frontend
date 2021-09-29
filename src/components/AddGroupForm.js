import { useContext, useState } from "react"
import { Button, Input } from "semantic-ui-react"
import { groupURL } from "../util/links"
import { UserContext } from "./App"

function AddGroupForm({ onGroupAdd }) {
    const user = useContext(UserContext)
    const [title, setTitle] = useState("")

    function handleFormSubmit(event) {
        event.preventDefault()

        const newGroup = {
            title: title,
            user_id: user.get.id
        }

        fetch(groupURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGroup),
        })
            .then(resp => resp.json())
            .then(addedGroup => {
                onGroupAdd(addedGroup)
            })
    }
    
    return(
        <form className="form" id="groupForm" onSubmit={handleFormSubmit}>
            <label htmlFor="usertitle" className="label">Thread Topic</label>
            <Input className="input" id="usertitle" value={title} onChange={e => setTitle(e.target.value)} 
                type="text" placeholder="Thread Topic"></Input>
            <Button className="ui button" disabled={user.get.id <= 0}>Create New Thread</Button>
        </form>
    )
}

export default AddGroupForm 