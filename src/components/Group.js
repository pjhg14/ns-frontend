import { useEffect, useState } from "react";
import { Grid, Segment, Menu } from "semantic-ui-react";
import AddGroupForm from "./AddGroupForm";
import PostList from "./PostList";

function Group(){
  const [group, setGroup] =  useState(null)
  const [groups, setGroups] = useState([])

  const groupList = groups.map(groupObj => {
      return(
        <Menu.Item key={groupObj.id} onClick={() => {setGroup(groupObj)}}
            name={groupObj.title}
        />
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

  return(
    <div>
      <div className="header">
        <h2>Threads</h2>
        <AddGroupForm onGroupAdd={handleAddGroup}/>
      </div>
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
          {groupList}
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
          {group && <PostList group={group}/>}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Group