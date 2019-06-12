import React, { useState } from 'react'
import Audio from '../helpers/Audio'
import { Button } from 'semantic-ui-react'

const Pad = ({pad}) => {

    const [gain, setGain] = useState(pad.gain.value)
    const [oscillators, setOscillators] = useState([])

    const setPadGain = (e) => {
        pad.gain.value = e.target.value/100
        setGain(pad.gain.value)
    }

    const addOscillator = () => {
        const oscillator = Audio.context.createOscillator()
        const oscillatorGain = Audio.context.createGain()
        oscillatorGain.gain.value = .5
        oscillator.connect(oscillatorGain)
        oscillatorGain.connect(pad)
        oscillator.start(0)
    }


    return (
        <div className='pad'>
            <Button onClick={addOscillator} >New Oscillator</Button>
            <div className='gain-container'>
                <p className='pad-label'>Gain: {Math.round(gain*100)}</p>
                <input
                    className="gain-slider"
                    type="range"
                    min='0'
                    max='100'
                    value={gain*100}
                    onChange={setPadGain}
                />
            </div>
        </div>
    );
}

export default Pad