import React, {Fragment, useState, useEffect} from 'react'

import Fetch from '../helpers/Fetch'

import PadContainer from './PadContainer'
import MasterControls from './MasterControls'
import SetupControls from '../components/SetupControls'
import Audio from '../helpers/Audio'

const UserSetup = ({setup, padsAttributes, setPadsAttributes, savePadSetup, destroyPadSetup}) =>  {


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



    return (
        <div id='synth-view'>
            <PadContainer
                setup={setup}
                pads={pads}
                setPads={setPads}
                padsAttributes={padsAttributes}
                setPadsAttributes={setPadsAttributes}
            />
            <MasterControls
                masterGain={masterGain}
                setMasterGain={changeMasterGain}
            />
            <SetupControls savePadSetup={savePadSetup} destroyPadSetup={destroyPadSetup} />
        </div>
    )
}

export default UserSetup;
