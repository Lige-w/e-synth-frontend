import React, {Fragment, useState, useEffect} from 'react'

import Fetch from '../helpers/Fetch'

import PadContainer from './PadContainer'
import MasterControls from './MasterControls'
import SetupControls from '../components/SetupControls'
import Audio from '../helpers/Audio'

const UserSetup = ({setup, padsAttributes, setPadsAttributes}) =>  {

    const [pads, setPads] = useState([])
    const [masterGain, setMasterGain] = useState(.5)

    const initializeSetup = () => {
        Audio.masterGainNode.connect(Audio.context.destination)
        Audio.masterGainNode.gain.value = .5
        setMasterGain(Audio.masterGainNode.gain.value)
    }


    useEffect(initializeSetup, [])
    // useEffect(() => setPadsAttributes(setup.pads), [setup])

    const changeMasterGain = (e) => {
        Audio.masterGainNode.gain.value = e.target.value/100
        setMasterGain(Audio.masterGainNode.gain.value)
    }

    const savePadSetup = () => {
        const body = {pads_attributes: padsAttributes}
        if (Fetch.token) {
            Fetch.PATCH(`${Fetch.SETUPS_URL}/${setup.id}`, body)
                .then(console.log)
        } else {
            alert('Please log in to continue')
        }
    }

    return (
        <div id='synth-view'>
            <PadContainer
                setup={setup}
                pads={pads}
                setPads={setPads}
                padsAttributes={padsAttributes}
                setPadsAttributes={setPadsAttributes}
                savePadSetup={savePadSetup}
            />
            <MasterControls
                masterGain={masterGain}
                setMasterGain={changeMasterGain}
            />
            <SetupControls savePadSetup={savePadSetup} />
        </div>
    )
}

export default UserSetup;
