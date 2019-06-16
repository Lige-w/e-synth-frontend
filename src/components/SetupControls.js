import React from 'react'
import {Icon, Button} from 'semantic-ui-react'

const SetupControls = ({savePadSetup}) => {
    return (
        <div id='setup-controls'>
            <Button color='#E0E1E2' id='save-button' animated='fade' onClick={savePadSetup}>
                <Button.Content visible><Icon  className='save outline big' /></Button.Content>
                <Button.Content hidden>Save current setup</Button.Content>
            </Button>
        </div>
    )
}

export default SetupControls