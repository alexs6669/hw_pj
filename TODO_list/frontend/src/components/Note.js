import React from 'react'
import ActiveImage from './images/true.png'
import NotActiveImage from './images/false.png'

const NoteItem = ({note, editNote, deleteNote}) => {
    return (
        <tr className='info'>
            <td>{note.is_active ? <img src={ActiveImage} width={40} height={40}/> :
                <img src={NotActiveImage} width={40} height={40}/>}</td>
            <td>{note.project}</td>
            <td>{note.title}</td>
            <td>{note.user}</td>
            <td>{note.created.toString()}</td>
            <td>{note.updated}</td>
            <td>
                <button onClick={() => editNote(note.id)} type='submit'>Edit</button>
            </td>
            <td>
                <button onClick={() => deleteNote(note.id)} type='submit'>Delete</button>
            </td>
        </tr>
    )
}

const NoteList = ({notes, editNote, deleteNote}) => {
    return (
        <table className='table'>
            <tr>
                <th>Aктивность</th>
                <th>Проект</th>
                <th>Заголовок</th>
                <th>Пользователь</th>
                <th>Создана</th>
                <th>Обновлена</th>
                <th></th>
                <th></th>
            </tr>
            {notes.map((note) => <NoteItem note={note} editNote={editNote} deleteNote={deleteNote}/>)}
        </table>
    )
}

export default NoteList