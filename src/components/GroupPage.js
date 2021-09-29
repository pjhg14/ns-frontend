import { useEffect, useState } from "react";
import { Grid, Segment, Menu, Dimmer, Loader } from "semantic-ui-react";
import { groupURL } from "../util/links";
import AddGroupForm from "./AddGroupForm";
import PostList from "./PostList";

function GroupPage(){
  const [group, setGroup] =  useState(null)
  const [groups, setGroups] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
      fetch(groupURL)
        .then(res => res.json())
        .then(groupData => {
          setGroups(groupData)
          setIsLoaded(true)
        })
  }, []);

  const groupList = groups.map(groupObj => {
    return(
      <Menu.Item id="menuItems" key={groupObj.id} onClick={() => {setGroup(groupObj)}}
        name={groupObj.title}
      />
    )
  })

  function handleAddGroup(newGroup) {
    const newArray = [...groups, newGroup]
    setGroups(newArray)
  }

  return(
    <div>
      <div id="groupheader">
        <h2>Threads</h2>
        <AddGroupForm onGroupAdd={handleAddGroup}/>
      </div>
      <Grid>
        <Grid.Column width={4}>
          { isLoaded ? (
            <Menu fluid vertical tabular>
              {groupList}
            </Menu>
          ) : (
            <Segment>
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            </Segment>
          )}
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            { group ? ( 
              <PostList group={group}/> 
            ) : (
              <p>Please select a group</p>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default GroupPage