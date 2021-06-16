import React from 'react'


const ProjectItem = ({project, editProject, deleteProject}) => {
    return (
        <tr className='info'>
            <td>{project.name}</td>
            <td>{project.repo_link}</td>
            <td>{project.users.toString()}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='submit'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, editProject, deleteProject}) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Repo link</th>
                    <th>Users</th>
                    <th></th>
                </tr>
            </thead>
            {projects.map((project) => <ProjectItem project={project} editProject={editProject}
                                                    deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList