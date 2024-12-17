import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import Profile from '../components/Profile'
import { deleteProjectApi, getProjectListApi } from '../services/allApis'
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextApi'
import { toast } from 'react-toastify'

function Dashboard() {

  const [data, setData] = useState([])

  const { addResponse, setAddResponse } = useContext(addProjectResponseContext)
  const { editResponse, setEditResponse } = useContext(editProjectResponseContext)

  useEffect(() => {
    getData()
  }, [addResponse, editResponse])

  const getData = async () => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await getProjectListApi(header)
    console.log(res)
    if (res.status = 200) {
      setData(res.data)
    } else {
      console.log(res);
    }
  }

  const handleDeleteProject = async (id) => {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    const res = await deleteProjectApi(id, header)
    if (res.status == 200) {
      toast.success("Project Deleted!!")
      getData()
    } else {
      toast.warning("Something Went Wrong!!")
    }
  }

  return (
    <>
      <Header />

      <div className="container-fluid mt-3">
        <h1 className='fw-bold text-center text-primary'>User Projects</h1>
        <Row>
          <Col sm={12} md={8}>
            <div className="w-100 shadow p-3 mb-5 my-3 border border-secondary border-3">

              <Add />

              <div className="m-2 px-4 py-4">

                {/* Project-List */}
                {
                  data.length > 0 ?
                    <>
                      {
                        data?.map(item => (
                          <div className=" d-flex justify-content-between p-3 border border-secondary border-3 shadow">
                            <h3 className='fw-bold'>{item.title}</h3>
                            <div>
                              <a href={item.github} target='_blank' className='btn text-black'><i className="fa-brands fa-github fa-xl" /></a>

                              <Edit project={item} />

                              <button className='btn' onClick={() => handleDeleteProject(item._id)}>
                                <i className="fa-solid fa-trash-can fa-xl" style={{ color: 'red' }} />
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </>
                    :
                    <h3 className='text-center text-danger'>No Projects added Yet!!</h3>
                }

              </div>
            </div>
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div >
    </>
  )
}

export default Dashboard