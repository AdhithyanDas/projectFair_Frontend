import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../services/allApis'

function Landing() {

    const [projects, setProjects] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await allProjectsApi()
        console.log(res);
        if (res.status == 200) {
            setProjects(res.data)
        }
    }

    return (
        <>
            <div className="container-fluid bg-white d-flex justify-content-center align-items center" style={{ height: '90vh' }}>
                <Row className='p-4 container'>
                    <Col className="d-flex justify-content-center flex-column">
                        <h2 className='text-primary fw-bold'>Project Fair</h2>
                        <p className="text-dark" style={{ textAlign: 'justify' }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis necessitatibus omnis officiis! Perspiciatis reprehenderit provident itaque, quae necessitatibus dolorum nemo enim magnam facilis rerum illo eaque culpa saepe libero facere? Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus aspernatur nisi corrupti hic et, facilis molestias a dolorem id quasi iure nostrum officia! Possimus hic nostrum dolores consequuntur commodi quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias minus placeat at sint delectus rem harum, aperiam totam amet laudantium suscipit? Aliquid esse reprehenderit voluptatem, autem magni repellendus. Numquam, non! </p>
                        <div className='d-grid'>
                            <Link className='btn btn-primary fs-5' to={'/auth'} style={{ textTransform: 'lowercase' }}><span style={{ textTransform: 'uppercase' }}>s</span>tart to <span style={{ textTransform: 'uppercase' }}>e</span>xplore..</Link>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center flex-column">
                        <img className='img-fluid rounded' width={''} src="https://assets.zyrosite.com/Aq20eV79zLfpXV6b/bb375cdd655184ca2715ac5059e73651-YX4ZEeZEvbhrMMZa.gif" alt="landing" />
                    </Col>
                </Row>
            </div>

            <div className='container-fluid p-5 shadow'>
                <h1 className='text-center fw-bold text-primary'>Sample Projects</h1>
                <div className="d-flex justify-content-around mt-5">
                    {
                        projects.length > 0 ?
                            projects.slice(0, 3).map(item => (
                                <ProjectCard project={item} />
                            ))
                            :
                            <h4 className='text-danger text-center'>No Projects !!</h4>
                    }
                </div>
                <div className='text-center mt-5'>
                    <Link className='btn btn-primary' to={'/projects'}>View More..</Link>
                </div>
            </div>

        </>
    )
}

export default Landing