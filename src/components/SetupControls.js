import React from 'react'
import {Icon, Button} from 'semantic-ui-react'

const SetupControls = ({savePadSetup}) => {
    return (
        <div id='setup-controls'>
            <Button id='save-button' animated='fade' onClick={savePadSetup}>
                <Button.Content visible><Icon  className='save outline big' /></Button.Content>
                <Button.Content hidden>Save current setup</Button.Content>
            </Button>
        </div>
    )
}

export default SetupControls