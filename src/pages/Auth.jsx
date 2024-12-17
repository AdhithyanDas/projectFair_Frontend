import React, { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../Context/TokenContext';

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
                toast.success("Registration Successfull!")
                setUser({
                    email: "", username: "", password: ""
                })
                changeAuth()
            } else {
                toast.error("Registration Failed!")
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
                toast.success("SignIn Successful!")
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
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="w-50 shadow p-4 row align-items-center">
                    <div className='d-flex justify-content-center'>
                        {
                            authStatus ?
                                <h1 className='fw-bold text-primary'>Register</h1>
                                :
                                <h1 className='fw-bold text-primary'>Log in</h1>
                        }
                    </div>

                    <div className="col-md-4 mb-5 pb-3">
                        <img className='img-fluid' width={'100%'} src="https://cdni.iconscout.com/illustration/premium/thumb/login-here-illustration-download-in-svg-png-gif-file-formats--log-form-3d-character-with-different-scene-pack-people-illustrations-1815085.png?f=webp" alt="" />
                    </div>

                    <div className="col-md-8">
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
                                            <button className='btn btn-primary fs-5' style={{ textTransform: 'lowercase' }} onClick={handleRegister}><span style={{ textTransform: 'uppercase' }}>s</span>ign <span style={{ textTransform: 'uppercase' }}>u</span>p</button>
                                        </div>
                                        :
                                        <div className='d-grid'>
                                            <button className='btn btn-primary fs-5' style={{ textTransform: 'lowercase' }} onClick={handleLogin}><span style={{ textTransform: 'uppercase' }}>s</span>ign in</button>
                                        </div>
                                }

                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-link text-decoration-none mt-2' onClick={changeAuth} style={{ textTransform: 'lowercase' }}>
                                        {
                                            authStatus ?
                                                <><span style={{ textTransform: 'uppercase' }}>h</span>ave an account?</>
                                                :
                                                <><span style={{ textTransform: 'uppercase' }}>d</span>on't have an account?</>
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