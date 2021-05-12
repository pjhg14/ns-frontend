import { useEffect, useState } from "react";
import { Button, Comment, Form, Menu } from "semantic-ui-react";
import AddGroupForm from "./AddGroupForm";
import PostList from "./PostList";

function Group(){
  const [group, setGroup] =  useState(null)
  const [newGroupTitle, setNewGroupTitle] = useState("")
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

  function handleAddGroup(newGroup) {
    const newArray = [...groups, newGroup]
    setGroups(newArray)
  }

  function handleAddPost(newPost) {
    const newArray = [...group.posts, newPost]

  }

  return(
    <div>
      <h2>Groups!</h2>
      {/* list of groups */}
      <Menu fluid vertical tabular>
        {groupList}
      </Menu>
      
      <AddGroupForm onGroupAdd={handleAddGroup}/>
      {group && <PostList group={group} setGroup={handleAddPost}/>}
      
    </div>
  )
}

export default Group