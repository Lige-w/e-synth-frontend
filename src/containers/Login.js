import React, {useState} from 'react'
import {Form, Button} from "semantic-ui-react";
import {Link} from "react-router-dom"

import Fetch from '../helpers/Fetch'

const Login = ({setCurrentUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleLoginSubmit = () => {
        const body = {
            user: {username: username, password: password}
        }

        Fetch.POST(Fetch.LOGIN_URL, body)
            .then(data => {
                if (!data.error){
                    setCurrentUser(data.user)
                    localStorage.setItem('token', data.jwt)
                } else {
                    alert('Incorrect username or password')
                }
            })
    }

    return (
        <Form onSubmit={handleLoginSubmit}>
            <h1>Login!</h1>
            <Form.Field>
                <label>Username</label>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </Form.Field>
            <Button type='submit'>Log In</Button>
            <p>Don't have an account?</p>
            <Link to='/register'><Button>Register</Button></Link>
        </Form>
    )
}

export default Login