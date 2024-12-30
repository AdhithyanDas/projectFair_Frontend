import React, { useEffect, useState } from 'react'
import './Allproject.css'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { allProjectsApi } from '../../services/allApis'

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
      <div className="container-fluid p-3 allProject-main-container">
        <h1 className='text-center fw-bold'>All Projects</h1>
        <div className='row align-items-center"'>
          {
            data.length > 0 ?
              data.map(item => (
                <div className='col-12 col-md-4 col-lg-3 d-flex justify-content-center my-3'>
                  <ProjectCard project={item} />
                </div>
              ))
              :
              <h4 className='text-center fw-bold'>Projects not available!</h4>
          }
        </div>
      </div>
    </>
  )
}

export default Allprojects