import React, { useState } from 'react'
import './ProjectCard.css'
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import base_Url from '../../services/baseUrl';

function ProjectCard({ project }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card onClick={handleShow} style={{ width: '18rem', cursor: 'pointer' }} className='project-card'>
                <Card.Img variant="top" height={'200px'} width={'100%'} src={`${base_Url}/uploads/${project.image}`} />
                <Card.Body>
                    <Card.Title className='fw-bold text-center'>{project.title}</Card.Title>
                </Card.Body>
            </Card>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img style={{ width: '100%' }} src={`${base_Url}/uploads/${project.image}`} alt="" />
                        </Col>
                        <Col>
                            <h5 className='project-card-value'><span className='fw-bold project-card-span'>Description : </span> {project.description}</h5>
                            <p className='project-card-value'><span className='fw-bold project-card-span'>Languages : </span>{project.languages}</p>
                            <div className='mt-3'>
                                <a href={project.github}><i className="fa-brands fa-github fa-lg project-card-git"/></a>
                                <a href={project.demo} className='ms-4'><i className="fa-solid fa-link fa-lg project-card-demo" /></a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard