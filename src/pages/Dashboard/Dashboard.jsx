import React, { useEffect, useState, useContext } from 'react'
import './Dashboard.css'
import Add from '../../components/Add/Add'
import Edit from '../../components/Edit/Edit'
import Profile from '../../components/Profile/Profile'
import Card from 'react-bootstrap/Card';
import base_Url from '../../services/baseUrl'
import { Row, Col } from 'react-bootstrap'
import { deleteProjectApi, getProjectListApi } from '../../services/allApis'
import { addProjectResponseContext, editProjectResponseContext } from '../../Context/ContextApi'
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
      toast.success("Project deleted!")
      getData()
    } else {
      toast.warning("Something went wrong!")
    }
  }

  return (
    <>
      <div className="container-fluid pt-3 dashboard-main-container">
        <h1 className='fw-bold text-center'>User Projects</h1>
        <Row>
          <Col sm={12} md={8}>
            <div className="w-100 p-3 mb-5 my-3 dashboard-second-container">

              <Add />

              <div className="m-2 px-4 py-4">
                <div className="row align-items-center">

                  {/* Project-List */}
                  {
                    data.length > 0 ?
                      <>
                        {
                          data?.map(item => (
                            <div className='col-12 col-md-4 col-lg-4 d-flex justify-content-center mb-5'>
                              <Card style={{ width: '18rem' }} className='shadow dash-card'>
                                <Card.Img variant="top" height={'200px'} width={'100%'} src={`${base_Url}/uploads/${item.image}`} className='pt-3 px-5' />
                                <Card.Body>
                                  <Card.Title className='fw-bold text-center dash-card-key-value'>Title : <span className='dash-span'>{item.title}</span></Card.Title>
                                  <Card.Title className='fw-bold text-center dash-card-key-value'>Desc : <span className='dash-span'>{item.description}</span></Card.Title>
                                  <Card.Title className='fw-bold text-center dash-card-key-value'>Lang : <span className='dash-span'>{item.languages}</span></Card.Title>
                                  <Card.Title className='fw-bold text-center dash-card-key-value'>Git : <span className='dash-span'>{item.github}</span></Card.Title>
                                  <Card.Title className='fw-bold text-center dash-card-key-value'>Demo : <span className='dash-span'>{item.demo}</span></Card.Title>
                                  <div className='d-flex justify-content-center'>
                                    <a href={item.github} target='_blank' className='btn text-black'><i className="fa-brands fa-github fa-lg" /></a>
                                    <Edit project={item} />
                                    <button className='btn' onClick={() => handleDeleteProject(item._id)}>
                                      <i className="fa-solid fa-trash-can fa-lg" style={{ color: 'red' }} />
                                    </button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </div>
                          ))
                        }
                      </>
                      :
                      <h3 className='text-center'>No projects added yet!</h3>
                  }
                </div>

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