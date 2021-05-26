import React from 'react'
import {useParams} from 'react-router-dom';

const UserPage = ({users}) => {

   let { id } = useParams();
   let user = users.find((user) => user.id == id);

   return (
       <div>
            {user.username}
            {user.first_name}
            {user.last_name}
            {user.email}
       </div>
   )
}

export default UserPage;