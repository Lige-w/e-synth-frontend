import React, {Fragment, useState, useEffect} from 'react'

import PadContainer from './PadContainer'
import MasterControls from './MasterControls'
import SetupControls from '../components/SetupControls'
import Audio from '../helpers/Audio'

const UserSetup = () =>  {

    const [masterGain, setMasterGain] = useState(.5)

    useEffect(() => {
        Audio.masterGainNode.connect(Audio.context.destination)
        Audio.masterGainNode.gain.value = .5
        setMasterGain(Audio.masterGainNode.gain.value)
    },[])

    const changeMasterGain = (e) => {
        Audio.masterGainNode.gain.value = e.target.value/100
        setMasterGain(Audio.masterGainNode.gain.value)
    }

    const savePadSetup = () => {

    }

        return (
            <div id='synth-view'>
                <PadContainer />
                <MasterControls
                    masterGain={masterGain}
                    setMasterGain={changeMasterGain}
                />
                <SetupControls savePadSetup={savePadSetup} />
            </div>
        )
}

export default UserSetup;
