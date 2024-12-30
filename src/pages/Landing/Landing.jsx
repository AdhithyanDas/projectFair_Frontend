import React, { useEffect, useState } from 'react'
import './Landing.css'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../../services/allApis'

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
            <div className="container-fluid d-flex justify-content-center align-items center landing-main-container">
                <div className="d-flex justify-content-center flex-column" style={{ width: '60vw' }}>
                    <h1 className='fw-bold text-center mt-3'>Project Fair</h1>
                    <p style={{ textAlign: 'justify' }}> "Project Fair is a comprehensive platform tailored to simplify project management and enhance collaboration. Whether you're managing a small team or coordinating a large-scale initiative, Project Fair is designed to meet your needs.

                        Featuring a user-friendly interface and a visually appealing design, the platform allows users to organize, track, and present their projects effortlessly. With tools for task management, progress tracking, and real-time updates, Project Fair ensures that all stakeholders stay informed and aligned at every step.

                        Its intuitive features, such as drag-and-drop task boards, customizable project timelines, and integrated file sharing, make complex workflows simple and efficient. The platform's professional color theme not only ensures a polished appearance but also enhances usability by providing a clear and distraction-free environment.

                        Project Fair is more than a tool—it's a hub for seamless communication and teamwork. Collaborate with ease using built-in messaging systems, activity logs, and feedback loops. Whether you're showcasing a portfolio, managing deadlines, or brainstorming with your team, Project Fair elevates your experience with simplicity and style.

                        Streamline your projects. Enhance your collaboration. Achieve more with Project Fair."</p>
                    <div className='d-grid mb-3'>
                        <Link className='btn fs-5' to={'/auth'}>Start to Explore..</Link>
                    </div>
                </div>
            </div>

            <div className='container-fluid sample-project-main-container pt-3'>
                <h1 className='text-center fw-bold'>Sample Projects</h1>
                <div className="row justify-content-center align-items-center mt-4 gap-3">
                    {
                        projects.length > 0 ?
                            projects.slice(0, 3).map(item => (
                                <div className='col-12 col-md-6 col-lg-3 d-flex justify-content-center'>
                                    <ProjectCard project={item} />
                                </div>
                            ))
                            :
                            <h4 className='text-center'>No projects!</h4>
                    }
                </div>
                <div className='text-center mt-4 pb-4'>
                    <Link className='btn' to={'/projects'}>View More..</Link>
                </div>
            </div>
        </>
    )
}

export default Landing