import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../services/allApis';
import { addProjectResponseContext } from '../Context/ContextApi';

function Add() {

    const [show, setShow] = useState(false)
    
    const [project, setProject] = useState({
        title: "", desc: "", languages: "", image: "", github: "", demo: ""
    })

    const [preview, setPreview] = useState("")

    const { addResponse, setAddResponse } = useContext(addProjectResponseContext)

    useEffect(() => {
        if (project.image) {
            setPreview(URL.createObjectURL(project.image))
        } else {
            setPreview("")
        }
    }, [project.image])

    const handleAddProject = async () => {
        console.log(project);
        const { title, desc, languages, image, github, demo } = project
        if (!title || !desc || !languages || !image || !github || !demo) {
            toast.warning("Enter Valid Inputs!!")
        } else {
            const fd = new FormData()
            fd.append('title', title)
            fd.append('desc', desc)
            fd.append('languages', languages)
            fd.append('image', image)
            fd.append('github', github)
            fd.append('demo', demo)

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${sessionStorage.getItem('token')}`
            }

            const res = await addProjectApi(fd, header)
            console.log(res)
            if (res.status == 200) {
                toast.success("Projects added Successfully!!")
                handleClose()
                setAddResponse(res)
            } else {
                toast.error("Project adding Failed!!")
            }
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setProject({
            title: "", desc: "", languages: "", image: "", github: "", demo: ""
        })
        setPreview("")
        setShow(true)
    }

    return (
        <>
            <div className='d-flex justify-content-center mt-3'>
                <button className='btn btn-primary' onClick={handleShow}>Add Project +</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false} d
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold text-primary'>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex justify-content-center flex-column'>
                            <label style={{ cursor: 'pointer' }} onChange={(e) => setProject({ ...project, image: e.target.files[0] })}>
                                <input type="file" style={{ display: 'none' }} />
                                <img className='img-fluid' src={preview ? preview : "https://t4.ftcdn.net/jpg/05/65/22/41/360_F_565224180_QNRiRQkf9Fw0dKRoZGwUknmmfk51SuSS.jpg"} alt="" />
                            </label>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="" label="Enter Project Title" onChange={(e) => setProject({ ...project, title: e.target.value })}>
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Description" onChange={(e) => setProject({ ...project, desc: e.target.value })}>
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Languages Used" onChange={(e) => setProject({ ...project, languages: e.target.value })}>
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter GitHub URL" onChange={(e) => setProject({ ...project, github: e.target.value })}>
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' controlId="" label="Enter Demo URL" onChange={(e) => setProject({ ...project, demo: e.target.value })}>
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add