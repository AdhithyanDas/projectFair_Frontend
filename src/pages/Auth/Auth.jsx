import React, { useContext, useState } from 'react'
import './Auth.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../../services/allApis';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContext';

function Auth() {

    const [authStatus, setAuthStatus] = useState(false)

    const { tokenStatus, setTokenStatus } = useContext(tokenContext)

    const [user, setUser] = useState({
        email: "", username: "", password: ""
    })

    const nav = useNavigate()

    const changeAuth = () => {
        setAuthStatus(!authStatus)
        setUser({
            email: "", username: "", password: ""
        })
    }

    const handleRegister = async () => {
        console.log(user);
        const { email, username, password } = user
        if (!email || !username || !password) {
            toast.warning("Enter Valid Data!")
        } else {
            const res = await registerApi(user)
            console.log(res);
            if (res.status == 200) {
                toast.success("Registration successful!")
                setUser({
                    email: "", username: "", password: ""
                })
                changeAuth()
            } else {
                toast.error("Registration failed!")
            }
        }
    }

    const handleLogin = async () => {
        const { email, password } = user
        if (!email || !password) {
            toast.warning("Enter Valid Data")
        } else {
            const res = await loginApi(user)
            console.log(res);
            if (res.status == 200) {
                toast.success("SignIn successful!")
                setUser({
                    email: "", username: "", password: ""
                })
                sessionStorage.setItem("token", res.data.token)
                sessionStorage.setItem("username", res.data.username)
                sessionStorage.setItem("github", res.data.github)
                sessionStorage.setItem("linkedin", res.data.linkedin)
                sessionStorage.setItem("profile", res.data.profile)
                setTokenStatus(true)
                nav('/dash')
            } else {
                toast.error(res.response.data)
            }
        }
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center auth-main-container">
                <div className="p-4 row align-items-center auth-second-container">
                    <div className='d-flex justify-content-center'>
                        {
                            authStatus ?
                                <h1 className='fw-bold'>Register</h1>
                                :
                                <h1 className='fw-bold'>Log in</h1>
                        }
                    </div>

                    <div className="">
                        <div className="my-3">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                            </FloatingLabel>
                            {
                                authStatus &&
                                <FloatingLabel controlId="name" label="Username" style={{ marginBottom: '20px' }}>
                                    <Form.Control type="text" placeholder="name" value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
                                </FloatingLabel>
                            }
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
                            </FloatingLabel>
                            <div className='mt-3'>
                                {
                                    authStatus ?
                                        <div className='d-grid'>
                                            <button className='btn submit-btn fs-5' onClick={handleRegister}>Sign Up</button>
                                        </div>
                                        :
                                        <div className='d-grid'>
                                            <button className='btn submit-btn fs-5' onClick={handleLogin}>Sign In</button>
                                        </div>
                                }

                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-link text-decoration-none mt-2' onClick={changeAuth}>
                                        {
                                            authStatus ?
                                                <span>Have an account?</span>
                                                :
                                                <span>Don't have an account?</span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth