import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjectsApi } from '../services/allApis'

function Allprojects() {

  const [data, setData] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getData()
    }
  }, [])

  const getData = async () => {
    const res = await allProjectsApi()
    if (res.status == 200) {
      setData(res.data)
    }
  }

  console.log(data)

  return (
    <>
      <Header />
      <div className="container-fluid p-3">
        <h1 className='text-center text-primary fw-bold'>All Projects</h1>
        <div className='d-flex justify-content-around my-5'>
          {
            data.length > 0 ?
              data.map(item => (
                <ProjectCard project={item} />
              ))
              :
              <h4 className='text-center text-danger fw-bold'>Projects not Available !! Check if you are logged in !!</h4>
          }
        </div>
      </div>
    </>
  )
}

export default Allprojects