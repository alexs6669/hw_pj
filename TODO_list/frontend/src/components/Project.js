import React from 'react'
import {Link} from "react-router-dom";

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
        <div>
            <nav className='menu'>
                <Link className='menu-link' to='/projects/create/'>Create Project</Link>
            </nav>
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
        </div>
    )
}

export default ProjectList