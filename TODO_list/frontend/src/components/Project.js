import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr className='info'>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repo_link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table className='table'>
            <th>Id</th>
            <th>Name</th>
            <th>Repo link</th>
            <th>Users</th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList