import React from 'react';
import axios from 'axios';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import NoteList from "./components/Note";
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie'
import NoteForm from "./components/NoteForm";
import ProjectForm from "./components/ProjectForm";

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
        let cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }


    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        let cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://localhost:8080/api-token-auth/', {username: username, password: password}).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин и пароль!'))
    }

    get_headers() {
        const headers = {
            'Content-type': 'application/json',
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    createProject(name, repo, users) {
        let headers = this.get_headers()
        const data = {name: name, repo: repo, users: users}
        axios.post(`http://localhost:8080/api/projects/`, data, {headers}).this(response => {
            let new_project = response.data
            this.setState((prevState => {
                const users = prevState.users.filter((user) => user.id === new_project.users)[0]
                new_project.users = users
                return {projects: [...this.state.projects, new_project]}
            }))
        }).catch(error => console.log(error))
    }

    editProject() {

    }

    deleteProject(id) {
        let headers = this.get_headers()
        axios.delete(`http://localhost:8080/api/projects/${id}/`, {headers}).then(response => {
            this.setState({projects: this.state.projects.filter((project) => project.id !== id)})
        }).catch(error => console.log(error))
    }

    createNote(project, title, text, user) {
        let headers = this.get_headers()
        const data = {project: project, title: title, text: text, user: user}
        axios.post('http://localhost:8080/api/notes/', data, {headers}).then(response => {
            let new_note = response.data
            const project = this.state.projects.filter((project) => project.id === new_note.project)[0]
            const user = this.state.users.filter((user) => user.id === new_note.user)[0]
            new_note.project = project
            new_note.user = user
            this.setState({notes: [...this.state.notes, new_note]})
        }).catch(error => console.log(error))
    }

    editNote() {

    }

    deleteNote(id) {
        let headers = this.get_headers()
        axios.delete(`http://localhost:8080/api/notes/${id}/`, {headers}).then(response => {
            this.setState({
                notes: this.state.notes.map(note => {
                    if (note.id === id) {
                        note.is_active = !note.is_active
                    }
                    return note
                })
            })
        }).catch(error => console.log(error))
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://localhost:8080/api/users/', {headers}).then(response => {
            this.setState({users: response.data})
        }).catch(error => {
            console.log(error)
            this.setState({'users': []})
        })

        axios.get('http://localhost:8080/api/projects/', {headers}).then(response => {
            this.setState({projects: response.data})
        }).catch(error => {
            console.log(error)
            this.setState({'projects': []})
        })

        axios.get('http://localhost:8080/api/notes/', {headers}).then(response => {
            this.setState({notes: response.data})
        }).catch(error => {
            console.log(error)
            this.setState({'notes': []})
        })

    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className='App-content'>
                <BrowserRouter>
                    <nav className='menu'>
                        <ul className='menu-ul'>
                            <li className='menu-li'>
                                {this.is_authenticated() ?
                                    <button style={{width: `80px`}} className='button' onClick={() => this.logout()}
                                            type='submit'>Logout</button> :
                                    <Link className='menu-link' to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <nav className='menu'>
                        <ul className='menu-ul'>
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
                               component={() => <ProjectList projects={this.state.projects}
                                                             editProject={(id) => this.editProject(id)}
                                                             deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/create'
                               component={() => <ProjectForm
                                   createProject={(name, repo, user) => this.createProject(name, repo, user)}
                                   users={this.state.users}/>}/>
                        <Route exact path='/notes/create'
                               component={() => <NoteForm
                                   createNote={(project, title, text, user) => this.createNote(project, title, text, user)}
                                   projects={this.state.projects}
                                   users={this.state.users}/>}/>
                        <Route exact path='/notes'
                               component={() => <NoteList notes={this.state.notes}
                                                          editNote={(id) => this.editNote(id)}
                                                          deleteNote={(id) => this.deleteNote(id)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Redirect from='/' to='/login'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
