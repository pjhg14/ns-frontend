import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Comment, Form, Menu } from "semantic-ui-react";

function Group(){
  const [groups, setGroups] = useState([])

  useEffect(() => {
    fetch(`http://localhost:9292/groups`)
      .then(res => res.json())
      .then(groupData => {
        setGroups(groupData)
      })
  }, []);

  console.log("hi")

  const groupList = groups.map(groupObj => {
    return(
      <p key={groupObj.id}>{groupObj.title}</p>
    )
  })

  return(
    <div>
      <h2>Groups!</h2>
      {/* list of groups */}
      <Menu fluid vertical tabular>
        {groupList}
      </Menu>

      {/* group form */}
      <Form></Form>
      {/* post list */}
      <Comment>
        {/* post form */} 
      </Comment>
      
    </div>
  )
}

export default Group