import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repo: '',
            users: []
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeUsers(event) {
        if (!event.target.selectedOptions) {
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++){
            users.push(event.target.selectedOptions.item(i).value);
        }
        console.log(users);

        this.setState(
            {
                'users': users
            }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo, this.state.users)
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
                    <select multiple className='select' name='users' onChange={(event) => this.handleChangeUsers(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
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