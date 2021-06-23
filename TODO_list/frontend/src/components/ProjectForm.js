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
                    <select multiple={true} className='select' type='select' name='users' value={this.state.users}
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((users) => <option value={users.id}>{users.username}</option>)}
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