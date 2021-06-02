import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr className='info'>
            <td>{project.name}</td>
            <td>{project.repo_link}</td>
            <td>{project.users.toString()}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table className='table'>
            <th>Name</th>
            <th>Repo link</th>
            <th>Users</th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList