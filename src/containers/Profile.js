import React, { useState } from 'react'
import { Link, Redirect} from "react-router-dom"
import {Modal, Button, Form, Icon} from "semantic-ui-react";

import Fetch from '../helpers/Fetch'


const Profile = ( {setCurrentUser, match, addUserSetup, user, user: {username, setups}} ) => {

    const [setupPageRedirect, setSetupPageRedirect] = useState(null)
    const [logoutRedirect, setLogoutRedirect] = useState(false)

    const createNewSetup = (e) => {
        const body = {
            name: e.target[0].value
        }

        if (localStorage['token']) {
            Fetch.authPOST(Fetch.SETUPS_URL, body, localStorage['token'])
                .then(setup => {
                    addUserSetup(setup)
                    setSetupPageRedirect(setup.id)
                })
        } else {
            alert('Please log in to continue')
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setCurrentUser(null)
        setLogoutRedirect(true)
    }

    const userSetupLinks = setups.map(setup => (
        <Link key={`id-${setup.id}`} to={`/setups/${setup.id}`}>
            <Button  animated='fade' onClick={() => {
            }}>
                <Button.Content visible><h2>{setup.name}</h2></Button.Content>
                <Button.Content hidden><h4>{setup.pads.length} pads</h4></Button.Content>
            </Button>
        </Link>
    ))

    if (logoutRedirect) {return <Redirect to='/' />}

    if (setupPageRedirect) {return <Redirect to={`/setups/${setupPageRedirect}`} />}

    return(
        <div id='profile'>
            <Button id='logout' onClick={logout}>Log out</Button>
            <h1 id="profile-title">Hi {username}!</h1>
            <div id="setup-links">
                <Modal size="tiny" centered={false} trigger={
                    <Button animated='fade'>
                        <Button.Content visible><Icon  className='add big' /></Button.Content>
                        <Button.Content hidden>New Pad Setup</Button.Content>
                    </Button>
                }>
                    <Modal.Header>New Setup</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={createNewSetup}>
                            <Form.Field>
                                <label>Setup Name</label>
                                <input type="text"/>
                            </Form.Field>
                            <Form.Field>
                                <Button type='submit'>Create Setup</Button>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                </Modal>
                {userSetupLinks}
            </div>
        </div>
    )
}

export default Profile