import React, {useState} from 'react'
import {Form, Button} from "semantic-ui-react";

import Fetch from '../helpers/Fetch'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginSubmit = () => {
        const body = {username: username, password: password}

        Fetch.POST(Fetch.LOGIN_URL, body).then(console.log)
    }

    return (
        <Form onSubmit={handleLoginSubmit}>
            <Form.Field>
                <label>Username</label>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </Form.Field>
            <Button type='submit'>Log In</Button>
        </Form>
    )
}

export default Login