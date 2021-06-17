import React from 'react'

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            title: '',
            text: '',
            user: []
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state.project)
        console.log(this.state.title)
        console.log(this.state.text)
        console.log(this.state.user)
        event.preventDefault()
    }

    render() {
        return (
            <form className='form' onSubmit={(event) => this.handleSubmit(event)}>
                <div>
                    <label for='project'>Project</label>
                    <select className='select' type='select' name='project' value={this.state.project}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for='title'>Title</label>
                    <input type='text' name='title' value={this.state.title}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for='text'>Text</label>
                    <textarea className='form-textarea' title='text' name='text' value={this.state.text}
                              onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <label for='user'>User</label>
                    <select className='select' type='select' name='user' value={this.state.user}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div>
                    <input className='submit' type='submit' value='save'/>
                </div>
            </form>
        );
    }
}

export default NoteForm