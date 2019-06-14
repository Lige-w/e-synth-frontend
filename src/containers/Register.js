import React, {useState} from 'react'
import {Button, Form} from 'semantic-ui-react'
import {Link} from "react-router-dom";

import Fetch from '../helpers/Fetch'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegisterSubmit = () => {
        if(password !== confirmPassword) {return alert('Password confirmation must match password')}

        const body = {
            user: {
                username: username,
                password: password
            }
        }

        Fetch.POST(Fetch.USERS_URL, body)
            .then(console.log)
    }

    return (

        <Form onSubmit={handleRegisterSubmit}>
            <h1>Register</h1>
            <Form.Field>
                <label>Username</label>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input type="password" onChange={e => setConfirmPassword(e.target.value)}/>
            </Form.Field>
            <Button type='submit'>Register</Button>
                <p>Already have an account?</p>
            <Link to='/login'><Button>Log In</Button></Link>
        </Form>
    )
}

export default Register