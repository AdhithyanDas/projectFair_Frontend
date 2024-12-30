import React from 'react'
import './Footer.css'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className="container-fluid p-4 footer-main-container">
                <Row className="p-4">
                    <Col md={5}>
                        <h4 className='fw-bold'>Project Fair 2024</h4>
                        <p style={{ textAlign: 'justify' }}> "Project Fair is a platform designed to streamline project management and collaboration. With a user-friendly interface and visually appealing design, it helps users organize, track, and present their projects effortlessly. Its intuitive features and professional color theme ensure a seamless experience, whether you're managing team tasks, showcasing your work, or collaborating with others. Elevate your projects with simplicity and style through Project Fair." </p>
                    </Col>
                    <Col md={2}>
                        <h4 className='fw-bold'>Links</h4>
                        <div className="d-flex flex-column">
                            <Link to={'/'} className='footer-link'>Landing</Link>
                            <Link to={'/auth'} className='footer-link'>LogIn</Link>
                            <Link to={'/projects'} className='footer-link'>All Projects</Link>
                        </div>
                    </Col>
                    <Col md={5}>
                        <h4 className='fw-bold'>Feedback</h4>
                        <textarea name="" id="" className="form-control mt-3"></textarea>
                        <button className='btn mt-3'>Submit</button>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Footer