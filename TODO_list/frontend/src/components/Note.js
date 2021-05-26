import React from 'react'

const NoteItem = ({note}) => {
    return (
        <tr className='info'>
            <td>{note.is_active.toString()}</td>
            <td>{note.project}</td>
            <td>{note.title}</td>
            <td>{note.user}</td>
            <td>{note.created}</td>
            <td>{note.updated}</td>
        </tr>
    )
}

const NoteList = ({notes}) => {
    return (
        <table className='table'>
            <th>Aктивна</th>
            <th>Проект</th>
            <th>Заголовок</th>
            <th>Пользователь</th>
            <th>Создана</th>
            <th>Обновлена</th>
            {notes.map((note) => <NoteItem note={note}/>)}
        </table>
    )
}

export default NoteList