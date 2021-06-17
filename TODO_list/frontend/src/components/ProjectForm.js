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
        console.log(this.state.name)
        console.log(this.state.repo)
        console.log(this.state.users)
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
                    <select className='select' type='select' name='users' value={this.state.users}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <input className='submit' type='submit' value='save'/>
                </div>
            </form>
        );
    }
}

export default ProjectForm