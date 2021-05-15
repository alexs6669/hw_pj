import React from 'react'
import logo from './logo.svg';
import './App.css';
import UserList from "./components/User";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        const users = [
            {
                "username": "admin",
                "first_name": "",
                "last_name": "",
                "email": "admin@todo.local"
            },
            {
                "username": "test1",
                "first_name": "test",
                "last_name": "testor",
                "email": "test1@todo.local"
            }
        ]
        this.setState(
            {
                'users': users
            }
        )
    }

    render() {
        return (
            <div className='App-header'>
                <UserList users={this.state.users} />
            </div>
        )
    }
}

export default App;
