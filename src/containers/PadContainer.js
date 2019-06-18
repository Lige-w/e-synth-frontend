import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import Pad from '../components/Pad'
import Audio from '../helpers/Audio'

const PadContainer = (props) => {

    const {setup, pads, setPads, padsAttributes, setPadsAttributes} = props


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

    const padComponents = pads.map((pad, i) => (
        <Pad key={i} pad={pad} pads={pads} padsAttributes={padsAttributes} setPadsAttributes={setPadsAttributes} index={i}/>
    ))

    return (
        <div id='pad-container'>
            {padComponents}
            <div id='new-pad' className='pad' onClick={createPad}><Icon name='add' size='massive' /></div>
        </div>
    );
}

export default PadContainer