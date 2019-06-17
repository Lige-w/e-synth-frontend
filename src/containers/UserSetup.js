import React, {Fragment, useState, useEffect} from 'react'

import Fetch from '../helpers/Fetch'

import PadContainer from './PadContainer'
import MasterControls from './MasterControls'
import SetupControls from '../components/SetupControls'
import Audio from '../helpers/Audio'

const UserSetup = ({match, setup}) =>  {
    const [padsAttributes, setPadsAttributes] = useState(setup.pads)
    const [pads, setPads] = useState([])
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
                pads={pads}
                setPads={setPads}
                padsAttributes={padsAttributes}
                setPadsAttributes={setPadsAttributes} />
            <MasterControls
                masterGain={masterGain}
                setMasterGain={changeMasterGain}
            />
            <SetupControls savePadSetup={savePadSetup} />
        </div>
    )
}

export default UserSetup;
