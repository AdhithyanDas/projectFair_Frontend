import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_Url from '../../services/baseUrl';
import { profileUpdateApi } from '../../services/allApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';
import avatar from '../../images/avatar.png'

function Profile() {

    const [status, setStatus] = useState(false)

    const nav = useNavigate()

    const { tokenStatus, setTokenStatus } = useContext(tokenContext)

    const [userData, setUserData] = useState({
        profile: "", username: "", github: "", linkedin: ""
    })

    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            setUserData({
                ...userData, username: sessionStorage.getItem("username"), github: sessionStorage.getItem("github"),
                linkedin: sessionStorage.getItem("linkedin"), profile: sessionStorage.getItem("profile")
            })
        }
    }, [])

    useEffect(() => {
        if (userData.profile && userData.profile.type) {
            setPreview(URL.createObjectURL(userData.profile))
        } else {
            setPreview("")
        }
    }, [userData.profile])

    const handleProfileUpdation = async () => {
        console.log(userData)
        const { username, github, linkedin, profile } = userData
        if (!username || !github || !linkedin || !profile) {
            toast.warning("Enter valid inputs !!")
        } else {
            if (userData.profile.type) {
                const fd = new FormData()
                fd.append('username', username)
                fd.append('github', github)
                fd.append('linkedin', linkedin)
                fd.append('profile', profile)

                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }

                const res = await profileUpdateApi(fd, header)
                console.log(res)

                if (res.status == 200) {
                    toast.success("Profile updated!")
                    changeStatus()
                    sessionStorage.clear()
                    nav('/auth')
                    setTokenStatus(false)
                } else {
                    toast.warning("Profile updation failed!")
                }

            } else {
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }

                const res = await profileUpdateApi(userData, header)
                console.log(res)

                if (res.status == 200) {
                    toast.success("Profile updated!")
                    changeStatus()
                    sessionStorage.clear()
                    nav('/auth')
                    setTokenStatus(false)
                } else {
                    toast.warning("Profile updation failed!")
                }
            }
        }
    }

    const changeStatus = () => {
        setStatus(!status)
    }

    return (
        <>
            <div className="container-fluid p-3 d-flex justify-content-center align-items-center mb-3">
                {
                    status ?
                        <div className="pt-2 profile-main-container">
                            <h2 className='fw-bold text-center'>Profile</h2>
                            <div className='px-5'>
                                <label htmlFor="file-input" className='text-center'>
                                    <input type="file" id='file-input' style={{ display: 'none' }} onChange={(e) => setUserData({ ...userData, profile: e.target.files[0] })} />
                                    <img className='w-75' src={preview ? preview : sessionStorage.getItem('profile') ? `${base_Url}/uploads/${sessionStorage.getItem('profile')}` : avatar} alt="" />
                                </label>
                                <FloatingLabel className='mt-3' controlId="" label="Username">
                                    <Form.Control type="text" placeholder="" defaultValue={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                                </FloatingLabel>
                                <FloatingLabel className='mt-3' controlId="" label="GitHub URL">
                                    <Form.Control type="text" placeholder="" defaultValue={userData.github} onChange={(e) => setUserData({ ...userData, github: e.target.value })} />
                                </FloatingLabel>
                                <FloatingLabel className='mt-3' controlId="" label="LinkedIn URL">
                                    <Form.Control type="text" placeholder="" defaultValue={userData.linkedin} onChange={(e) => setUserData({ ...userData, linkedin: e.target.value })} />
                                </FloatingLabel>
                                <div className="d-flex justify-content-between mt-4 mb-3">
                                    <button className='btn' onClick={handleProfileUpdation}>Update</button>
                                    <button onClick={changeStatus} className='btn btn-secondary' style={{ color: 'black' }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='profile-btn'><button onClick={changeStatus} className='btn my-3'>Edit User Profile <i className="fa-solid fa-pen-to-square ms-1" /></button></div>
                }
            </div>
        </>
    )
}

export default Profile