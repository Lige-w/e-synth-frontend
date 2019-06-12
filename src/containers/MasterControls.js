import React from 'react'
import MasterGain from '../components/MasterGain'

const MasterControls = ({masterGain, setMasterGain}) => {

    return (
        <div id='master-controls'>
            <MasterGain
                masterGain={masterGain}
                setMasterGain={setMasterGain}
            />
        </div>
    );
}

export default MasterControls