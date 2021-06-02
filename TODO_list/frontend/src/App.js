import React from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import NoteList from "./components/Note";
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie'

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token})
    }


    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token})
    }

    get_token(username, password) {
        axios.post('http://localhost:8080/api-token-auth/', {username: username, password: password}).then(response => {
            console.log(response.data)
        }).catch(error => alert('Неверный логин и пароль!'))
    }

    load_data() {
        axios.get('http://localhost:8080/api/users/').then(response => {
            this.setState({users: response.data})
        }).catch(error => console.log(error))

        axios.get('http://localhost:8080/api/projects/').then(response => {
            this.setState({projects: response.data})
        }).catch(error => console.log(error))

        axios.get('http://localhost:8080/api/notes/').then(response => {
            this.setState({notes: response.data})
        }).catch(error => console.log(error))

    }

    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }

    render() {
        return (
            <div className='App-content'>
                <BrowserRouter>
                    <nav className='menu'>
                        <ul className='menu-ul'>
                            <li className='menu-li'>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link className='menu-link' to='/login'>Login</Link>}
                            </li>
                            <li className='menu-li'>
                                <Link className='menu-link' to='/users'>Users</Link>
                            </li>
                            <li className='menu-li'>
                                <Link className='menu-link' to='/projects'>Projects</Link>
                            </li>
                            <li className='menu-li'>
                                <Link className='menu-link' to='/notes'>Notes</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects'
                               component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/notes' component={() => <NoteList notes={this.state.notes}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Redirect from='/' to='/users'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
