import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ProjectList from '../components/ProjectList'

const ProjectListPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) 
    return <p className="text-center mt-10">Chargement...</p>
 
  return (
  <div>
      <ProjectList />
    </div>
  )
}

export default ProjectListPage;
