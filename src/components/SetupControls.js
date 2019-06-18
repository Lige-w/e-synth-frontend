import React from 'react'
import {Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const SetupControls = ({savePadSetup, destroyPadSetup, username}) => {
    return (
        <div id='setup-controls'>
            <Link id='profile-link' to={`/${username}`}>
                <Button id='home-button' animated='fade' onClick={savePadSetup}>
                    <Button.Content visible><Icon  className='home big' /></Button.Content>
                    <Button.Content hidden>Return to your profile</Button.Content>
                </Button>
            </Link>
            <Button id='save-button' animated='fade' onClick={savePadSetup}>
                <Button.Content visible><Icon  className='save outline big' /></Button.Content>
                <Button.Content hidden>Save current setup</Button.Content>
            </Button>
            <Button id='delete-button' animated='fade' onClick={destroyPadSetup}>
                <Button.Content visible><Icon  className='delete big' /></Button.Content>
                <Button.Content hidden>Delete current setup</Button.Content>
            </Button>
        </div>
    )
}

export default SetupControls