import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import NoteList from "./components/Note";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users/list/').then(response => {
            const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
        }).catch(error => console.log(error))
    }



    render() {
        return (
            <div className='App-content'>
                <UserList users={this.state.users} />
            </div>
        )
    }
}

export default App;
