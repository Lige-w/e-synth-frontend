import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'


import PadContainer from './PadContainer'
import MasterControls from './MasterControls'
import SetupControls from '../components/SetupControls'
import Audio from '../helpers/Audio'
import Fetch from "../helpers/Fetch";

const UserSetup = ({user, user: {username, setups}, setUser, setup}) =>  {


    const [pads, setPads] = useState([])
    const [masterGain, setMasterGain] = useState(.5)
    const [profileRedirect, setProfileRedirect] = useState(false)

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
        const body = {pads_attributes: setup.pads}
        if (Fetch.token()) {
            Fetch.PATCH(`${Fetch.SETUPS_URL}/${setup.id}`, body)
                .then(UpdatedSetup => {
                    const setupIndex = setups.findIndex(userSetup => userSetup.id === UpdatedSetup.id)
                    const setupsCopy = [...setups]
                    setupsCopy.splice(setupIndex, 1, UpdatedSetup)
                    setUser({...user, setups: setupsCopy})
                })
        } else {
            alert('Please log in to continue')
        }
    }

    const destroyPadSetup = () => {
        if (Fetch.token()) {
            Fetch.DESTROY(`${Fetch.SETUPS_URL}/${setup.id}`, Fetch.token())
                .then(({message}) => {

                    if (!!setup.id) {
                        const setupIndex = setups.findIndex(userSetup => setup.id === userSetup.id)
                        const setupsCopy = [...setups]
                        setupsCopy.splice(setupIndex, 1)
                        setUser({...user, setups: setupsCopy})
                        setProfileRedirect(true)
                    }


                })
        }
    }


    if (!setup) {
        if (profileRedirect) {
            return <Redirect to={`/${username}`}/>
        } else {
            return null
        }
    }

    return (
        <div id='synth-view'>
            <PadContainer
                setup={setup}
                pads={pads}
                setPads={setPads}
                user={user}
                setUser={setUser}
            />
            <MasterControls
                masterGain={masterGain}
                setMasterGain={changeMasterGain}
            />
            <SetupControls savePadSetup={savePadSetup} destroyPadSetup={destroyPadSetup} username={username} />
        </div>
    )
}

export default UserSetup;
