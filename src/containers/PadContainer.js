import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import Pad from '../components/Pad'
import Audio from '../helpers/Audio'
import Fetch from "../helpers/Fetch";

const PadContainer = ({setup, pads, setPads, padsAttributes, setPadsAttributes, setUser, user}) => {




    const initializeSavedPads = () => {
        if(padsAttributes) {
            const savedPads = padsAttributes.map(pad => {
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

    // useEffect(()=>{
    //     initializeSavedPads()
    //     return pads.forEach(pad => {
    //         pad.pad.disconnect()
    //         pad.attackGain.disconnect()
    //     })
    // }, [])

    const createPad = () => {
        const thisAttackGain = attackGain()

        const gainNode = Audio.context.createGain()
        gainNode.gain.value = .5
        gainNode.connect(thisAttackGain)

        setPads([...pads, {pad: gainNode, attackGain: thisAttackGain}])

        setPadsAttributes([...padsAttributes, {
            gain: gainNode.gain.value,
            key_name: 'a',
            oscillators_attributes: []
        }])
    }

    const deletePad = (index) => {
        const padId = padsAttributes[index].id
        if (Fetch.token && padId) {
            Fetch.DESTROY(`${Fetch.PADS_URL}/${padId}`, Fetch.token)
                .then(({message}) => {
                    const padsAttributesCopy = [...padsAttributes]
                    const padsCopy = [...pads]
                    padsCopy.splice(index, 1)
                    padsAttributesCopy.splice(index, 1)

                    setPads(padsCopy)
                    setPadsAttributes(padsAttributesCopy)

                    const setupCopy = {...setup, pads: padsAttributesCopy}
                    const setupsCopy = [...user.setups]
                    const setupIndex = setupsCopy.findIndex(s => s.id === setup.id)
                    setupsCopy.splice(setupIndex, 1, setupCopy)

                    setUser({...user, setups: setupsCopy})
                })
        } else {
            const padsAttributesCopy = [...padsAttributes]
            const padsCopy = [...pads]
            padsCopy.splice(index, 1)
            padsAttributesCopy.splice(index, 1)

            setPads(padsCopy)
            setPadsAttributes(padsAttributesCopy)
        }
    }

    const padComponents = pads.map((pad, i) => (
        <Pad
            key={i}
            pad={pad}
            pads={pads}
            padsAttributes={padsAttributes}
            setPadsAttributes={setPadsAttributes}
            deletePad={deletePad}
            index={i}
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