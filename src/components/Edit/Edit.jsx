import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import base_Url from '../../services/baseUrl'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { editProjectApi } from '../../services/allApis'
import { editProjectResponseContext } from '../../Context/ContextApi'

function Edit({ project }) {

    const [show, setShow] = useState(false)

    const [data, setData] = useState({ ...project })

    const [preview, setPreview] = useState("")

    const { editResponse, setEditResponse } = useContext(editProjectResponseContext)

    useEffect(() => {
        setData({ ...project });
    }, [project]);

    useEffect(() => {
        if (data.image.type) {
            setPreview(URL.createObjectURL(data.image))
        } else {
            setPreview("")
        }
    }, [data.image])

    const handleEdit = async () => {
        console.log(data)
        console.log(data.image.type)
        const { title, description, languages, github, demo, image } = data
        if (!title || !description || !languages || !github || !demo || !image) {
            toast.warning("Invalid inputs!")
        } else {
            if (data.image.type) {
                const fd = new FormData()
                fd.append("title", title)
                fd.append("desc", description)
                fd.append("languages", languages)
                fd.append("github", github)
                fd.append("demo", demo)
                fd.append("image", image)

                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }

                const res = await editProjectApi(project._id, header, fd)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project updated!")
                    handleClose()
                    setEditResponse(res)
                } else {
                    toast.error("Updation Failed !!")
                }

            } else {
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }

                const body = { title, desc: description, languages, github, demo, image }

                const res = await editProjectApi(project._id, header, body)
                console.log(res)
                if (res.status == 200) {
                    toast.success("Project updated!")
                    handleClose()
                    setEditResponse(res)
                } else {
                    toast.error("Updation failed!")
                }
            }
        }
    }

    const handleClose = () => {
        setShow(false)
        setData({ ...project })
        setPreview("")
    }
    const handleShow = () => setShow(true)

    return (
        <>
            <button className='btn' onClick={handleShow}>
                <i className="fa-solid fa-pen-to-square fa-lg" style={{ color: '#FFBF00' }} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='fw-bold'>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className='d-flex justify-content-center flex-column'>
                            <label style={{ cursor: 'pointer' }}>
                                <input type="file" style={{ display: 'none' }} onChange={(e) => setData({ ...data, image: e.target.files[0] })} />
                                <img className='img-fluid' src={preview ? preview : `${base_Url}/Uploads/${project?.image}`} alt="" />
                            </label>
                        </Col>
                        <Col>
                            <FloatingLabel label="Enter Project Title">
                                <Form.Control type="text" placeholder="title" defaultValue={project?.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' label="Enter Description" >
                                <Form.Control type="text" placeholder="description" defaultValue={project?.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' label="Enter Languages Used">
                                <Form.Control type="text" placeholder="languages" defaultValue={project?.languages} onChange={(e) => setData({ ...data, languages: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' label="Enter GitHub URL">
                                <Form.Control type="text" placeholder="github" defaultValue={project?.github} onChange={(e) => setData({ ...data, github: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel className='mt-2' label="Enter Demo URL">
                                <Form.Control type="text" placeholder="demo" defaultValue={project?.demo} onChange={(e) => setData({ ...data, demo: e.target.value })} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="" className='modal-btn' onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit