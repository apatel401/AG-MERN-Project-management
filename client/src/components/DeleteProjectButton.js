import {FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {GET_PROJECTS} from './quaries/projectQueries'
import {DELETE_PROJECT} from './mutations/ProjectMutation'
import { gql, useMutation } from '@apollo/client'

export default function DeleteProjectButton({projectId}) {
    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables:{id: projectId},
        onCompleted: () => navigate('/'),
        refetchQueries: [{query: GET_PROJECTS}]
    })
  return (
    <div className='d-flex mt-5 ms-auto'>
        <button className='btn btn-danger m-2' onClick={deleteProject}><FaTrash className='icon'/>Delete Project</button>
    </div>
  )
}
