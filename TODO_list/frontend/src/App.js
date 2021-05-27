import React from 'react';
import axios from 'axios';
import './App.css';
import {HashRouter, BrowserRouter, Route, Redirect, Switch, Link} from 'react-router-dom';
import UserList from "./components/User";
import ProjectList from "./components/Project";
import NoteList from "./components/Note";


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
            axios.get('http://localhost:8080/projects/list/').then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            })
            axios.get('http://localhost:8080/notes/list/').then(response => {
                const notes = response.data
                this.setState(
                    {
                        'notes': notes
                    }
                )
            })
        }).catch(error => console.log(error))
    }


    render() {
        return (
            <div className='App-content'>
                <HashRouter>
                    <nav className='menu'>
                        <ul className='menu-ul'>
                            <li className='menu-li'>
                                <Link className='menu-link' to='/users/list'>Users</Link>
                            </li>
                            <li className='menu-li'>
                                <Link className='menu-link' to='/projects/list'>Projects</Link>
                            </li>
                            <li className='menu-li'>
                                <Link className='menu-link' to='/notes/list'>Notes</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/users/list' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects/list'
                               component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/notes/list' component={() => <NoteList notes={this.state.notes}/>}/>
                        <Redirect from='/' to='users/list'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}

export default App;
