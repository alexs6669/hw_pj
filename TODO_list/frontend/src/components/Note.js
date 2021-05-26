import React from 'react'

const NoteItem = ({note}) => {
    return (
        <tr className='info'>
            <td>{note.id}</td>
            <td>{note.is_active}</td>
            <td>{note.project}</td>
            <td>{note.user}</td>
            <td>{note.text}</td>
        </tr>
    )
}

const NoteList = ({notes}) => {
    return (
        <table className='table'>
            <th>Id</th>
            <th>Active</th>
            <th>Project</th>
            <th>User</th>
            <th>Text</th>
            {notes.map((note) => <NoteItem note={note}/>)}
        </table>
    )
}

export default NoteList