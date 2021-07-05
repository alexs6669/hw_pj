import React from 'react'
import ActiveImage from "./images/true.png";
import NotActiveImage from "./images/false.png";

const UserItem = ({user}) => {
    return (
        <tr className='info'>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.is_superuser ? <img src={ActiveImage} width={40} height={40}/> :
                <img src={NotActiveImage} width={40} height={40}/>}</td>
            <td>{user.is_staff ? <img src={ActiveImage} width={40} height={40}/> :
                <img src={NotActiveImage} width={40} height={40}/>}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>%username%</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Администратор</th>
                    <th>Персонал</th>
                </tr>
            </thead>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList