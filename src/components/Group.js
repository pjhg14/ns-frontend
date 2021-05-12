import { useEffect, useState } from "react";
import { Button, Comment, Form, Menu } from "semantic-ui-react";
import PostList from "./PostList";

function Group(){
  const [group, setGroup] =  useState(null)
  const [newGroupTitle, setNewGroupTitle] = useState(null)
  const [groups, setGroups] = useState([])

  const groupList = groups.map(groupObj => {
      return(
          <Menu.Item key={groupObj.id} onClick={() => {setGroup(groupObj)}}>{groupObj.title}</Menu.Item>
      )
  })

  useEffect(() => {
      fetch(`http://localhost:9292/groups`)
      .then(res => res.json())
      .then(groupData => {
          setGroups(groupData)
      })
  }, []);

  function handleFormSubmit() {
    
  }

  return(
    <div>
      <h2>Groups!</h2>
      {/* list of groups */}
      <Menu fluid vertical tabular>
        {groupList}
      </Menu>
      
      <Form onSubmit={handleFormSubmit} >
        <Form.Input label='Create new Group' placeholder='joe@schmoe.com' 
          value={newGroupTitle} onChange={e => setNewGroupTitle(e.target.value)}/>
        <Button>Submit</Button>
      </Form>
      {group && <PostList group={group} setGroup={setGroup}/>}
      
    </div>
  )
}

export default Group