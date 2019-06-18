import React, { useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import Pad from '../components/Pad'
import Audio from '../helpers/Audio'
import Fetch from "../helpers/Fetch";

const PadContainer = ({setup, pads, setPads, user, setUser}) => {




    const initializeSavedPads = () => {

        if(setup.pads) {
            const savedPads = setup.pads.map(pad => {
                const thisAttackGain = attackGain()

                const gainNode = Audio.context.createGain()
                gainNode.gain.value = pad.gain
                gainNode.connect(thisAttackGain)

                return {pad: gainNode, attackGain: thisAttackGain}
            })

            setPads(savedPads)
        }
    }

    useEffect(initializeSavedPads, [setup])

    const attackGain = () => {
        const attackGain = Audio.context.createGain()
        attackGain.gain.value = 0
        attackGain.connect(Audio.masterGainNode)
        return attackGain
    }

    const setPadsAttributes = (attributes) => {
        const userCopy = {...user}
        const setupIndex = user.setups.findIndex(s => setup.id === s.id)

        userCopy.setups[setupIndex].pads = attributes

        setUser(userCopy)
    }

    const createPad = () => {
        const thisAttackGain = attackGain()

        const gainNode = Audio.context.createGain()
        gainNode.gain.value = .5
        gainNode.connect(thisAttackGain)

        setPads([...pads, {pad: gainNode, attackGain: thisAttackGain}])

        setPadsAttributes([...setup.pads, {
            gain: gainNode.gain.value,
            key_name: 'a',
            oscillators_attributes: []
        }])
    }

    const deletePad = (index) => {
        const padId = setup.pads[index].id
        if (Fetch.token && padId) {
            Fetch.DESTROY(`${Fetch.PADS_URL}/${padId}`, Fetch.token)
                .then(({message}) => {
                    const setupPadsCopy = [...setup.pads]
                    const padsCopy = [...pads]
                    padsCopy.splice(index, 1)
                    setupPadsCopy.splice(index, 1)


                    setPads(padsCopy)


                    const setupCopy = {...setup, pads: setupPadsCopy}
                    const setupsCopy = [...user.setups]
                    const setupIndex = setupsCopy.findIndex(s => s.id === setup.id)
                    setupsCopy.splice(setupIndex, 1, setupCopy)

                    setUser({...user, setups: setupsCopy})
                })
        } else {
            const padsCopy = [...pads]
            padsCopy.splice(index, 1)
            setPads(padsCopy)
        }
    }

    const padComponents = pads.map((pad, i) => (
        <Pad
            key={i}
            pad={pad}
            padsAttributes={setup.pads}
            pads={pads}
            deletePad={deletePad}
            index={i}
            setPadsAttributes={setPadsAttributes}
        />
    ))

    return (
        <div id='pad-container'>
            {padComponents}
            <div id='new-pad' className='pad' onClick={createPad}><Icon name='add' size='massive' /></div>
        </div>
    );
}

export default PadContainer