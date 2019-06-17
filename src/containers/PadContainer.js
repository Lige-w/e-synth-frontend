import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import Pad from '../components/Pad'
import Audio from '../helpers/Audio'

const PadContainer = ({pads, setPads, padsAttributes, setPadsAttributes}) => {

    const createPad = () => {
        const attackGain = Audio.context.createGain()
        attackGain.gain.value = 0
        attackGain.connect(Audio.masterGainNode)

        const gainNode = Audio.context.createGain()
        gainNode.gain.value = .5
        gainNode.connect(attackGain)

        setPadsAttributes([...padsAttributes, {
            gain: gainNode.gain.value,
            oscillators_attributes: []
        }])
        setPads([...pads, {pad: gainNode, attackGain: attackGain}])
    }

    const padComponents = pads.map((pad, i) => (
        <Pad key={i} pad={pad} padsAttributes={padsAttributes} setPadsAttributes={setPadsAttributes} index={i}/>
    ))

    return (
        <div id='pad-container'>
            {padComponents}
            <div id='new-pad' className='pad' onClick={createPad}><Icon name='add' size='massive' /></div>
        </div>
    );
}

export default PadContainer