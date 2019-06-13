import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import Pad from '../components/Pad'
import Audio from '../helpers/Audio'

const PadContainer = () => {
    const [pads, setPads] = useState([])

    const createPad = () => {
        const gainNode = Audio.context.createGain()
        gainNode.gain.value = 0
        const attackGain = Audio.context.createGain()
        attackGain.gain.value = 0
        attackGain.connect(Audio.masterGainNode)
        gainNode.connect(attackGain)
        setPads([...pads, {pad: gainNode, attackGain: attackGain}])
    }

    const padComponents = pads.map((pad, i) => (
        <Pad key={i} pad={pad} />
    ))

    return (
        <div id='pad-container'>
            {padComponents}
            <div id='new-pad' className='pad' onClick={createPad}><Icon name='add' size='massive' /></div>
        </div>
    );
}

export default PadContainer