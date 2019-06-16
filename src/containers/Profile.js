import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Modal, Button, Form} from "semantic-ui-react";

import Fetch from '../helpers/fetch'

const Profile = ( {user: {username, setups}} ) => {

    const createNewSetup = (e) => {
        Fetch.POST()
    }

    const renderUserSetups = setups.map(setup => (
        <Link key={setup.id} to={`/setups/${setup.id}`}><div></div></Link>
    ))

    return(
        <div>
            <Modal size="tiny" centered={false} trigger={<Button>New Setup</Button>}>
                <Modal.Header>New Setup</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={createNewSetup}>
                        <Form.Field>
                            <label>Setup Name</label>
                            <input type="text" />
                        </Form.Field>
                        <Form.Field>
                            <Button type='submit'>Create Setup</Button>
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default Profile