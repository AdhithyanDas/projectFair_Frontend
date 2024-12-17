import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_Url from '../services/baseUrl';

function ProjectCard({ project }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Card style={{ width: '18rem' }} className='shadow'>
                <Card.Img variant="top" onClick={handleShow} height={'200px'} width={'100%'} style={{ cursor: 'pointer' }} src={`${base_Url}/uploads/${project.image}`} />
                <Card.Body>
                    <Card.Title className='fw-bold text-center text-primary'>{project.title}</Card.Title>
                </Card.Body>
            </Card>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold text-primary'>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <img style={{ width: '100%' }} src={`${base_Url}/uploads/${project.image}`} alt="" />
                        </Col>
                        <Col>
                            <h5><span className='text-primary fw-bold'>Description : </span> {project.description}</h5>
                            <p><span className='text-primary fw-bold'>Languages : </span>{project.languages}</p>
                            <div className='mt-3'>
                                <a href={project.github}><i className="fa-brands fa-github fa-lg" /></a>
                                <a href={project.demo} className='ms-4'><i className="fa-solid fa-link fa-lg" /></a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard