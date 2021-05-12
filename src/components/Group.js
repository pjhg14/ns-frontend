import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Comment, Form, Menu } from "semantic-ui-react";
import PostList from './PostList'

function Group(){
  const [groups, setGroups] = useState([])
  // const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:9292/groups`)
      .then(res => res.json())
      .then(groupData => {
        setGroups(groupData)
      })
  }, []);

 
  const groupArray = groups.map(groupObj => {
    return(
      <div>
        <h3 key={groupObj.id}>{groupObj.title}</h3>
        <PostList posts={groupObj.posts}/>
      </div>
    )
  })


  return(
    <div>
      <h2>Groups!</h2>
      {/* list of groups */}
      <Menu fluid vertical tabular>
        {groupArray}
      </Menu>

      {/* group form */}
      <Form></Form>
      {/* post list */}
      {/* {group ? <PostList group={group} /> : null} */}
      
    </div>
  )
}

export default Group