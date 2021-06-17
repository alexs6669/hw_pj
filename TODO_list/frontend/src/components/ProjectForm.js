import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repo: '',
            users: props.users[0].id
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo, this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form className='form' onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <label for='name'>Name</label>
                    <input type='text' name='name' value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for='repo'>Repo</label>
                    <input type='text' name='repo' value={this.state.repo}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for='users'>Users</label>
                    <select multiple={this.state.users} className='select' type='select' name='user' value={this.state.user}
                            onChange={(event) => this.handleChange(event)}>{this.props.users.map((user) =>
                        <option value={user.id}>{user.username}</option>)}
                    </select>
                </div>
                <div>
                    <input className='submit' type='submit' value='save'/>
                </div>
            </form>
        );
    }
}

export default ProjectForm