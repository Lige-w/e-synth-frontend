import React, {Fragment, useState, useEffect} from 'react'
import {Switch, Link, Route, Redirect} from "react-router-dom"
import {Modal, Button, Form} from "semantic-ui-react";

import Fetch from '../helpers/Fetch'
import UserSetup from "./UserSetup";

const Profile = ( {setCurrentUser, match, addUserSetup, user, user: {username, setups}} ) => {

    const [selectedSetup, setSelectedSetup] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [padsAttributes, setPadsAttributes] = useState([])

    const createNewSetup = (e) => {
        const body = {
            name: e.target[0].value
        }

        if (localStorage['token']) {
            Fetch.authPOST(Fetch.SETUPS_URL, body, localStorage['token'])
                .then(setup => {
                    addUserSetup(setup)
                    setSelectedSetup(setup)
                    setPadsAttributes(setup.pads)
                    setIsModalOpen(false)
                })
        } else {
            alert('Please log in to continue')
        }
    }

    const savePadSetup = () => {
        const body = {pads_attributes: padsAttributes}
        if (Fetch.token) {
            Fetch.PATCH(`${Fetch.SETUPS_URL}/${selectedSetup.id}`, body)
                .then(setup => {
                    setSelectedSetup(setup)
                    setPadsAttributes(setup.pads)

                    const setupIndex = setups.findIndex(userSetup => userSetup.id === setup.id)
                    const setupsCopy = [...setups]
                    setupsCopy.splice(setupIndex, 1, setup)
                    setCurrentUser({...user, setups: setupsCopy})
                })
        } else {
            alert('Please log in to continue')
        }
    }

    const userSetupLinks = setups.map(setup => (
        <Button key={setup.id} onClick={() => {
            setSelectedSetup(setup)
            setPadsAttributes(setup.pads)
        }}>{setup.name}</Button>
    ))


    return(
        <div>
            <Modal open={isModalOpen} size="tiny" centered={false} trigger={<Button onClick={() => setIsModalOpen(true)}>New Setup</Button>}>
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
            {selectedSetup ? <UserSetup setup={selectedSetup} padsAttributes={padsAttributes} setPadsAttributes={setPadsAttributes} savePadSetup={savePadSetup} /> : null}
        </div>
    )
}

export default Profile