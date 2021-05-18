import React from 'react';
import axios from 'axios';
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
        axios.get('http://localhost:8080/api/authapp/').then(response => {
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
            <div className='App-header'>
                <UserList users={this.state.users} />
            </div>
        )
    }
}

export default App;
