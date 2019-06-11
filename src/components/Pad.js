import React, { useState } from 'react'

const Pad = ({pad}) => {

    const [gain, setGain] = useState(pad.gain.value)

    const setMasterGain = (e) => {
        pad.gain.value = e.target.value/100
        setGain(pad.gain.value)
    }

    return (
        <div className='pad'>

            <div className='gain-container'>
                <p>Pad Gain</p>
                <input
                    className="gain-slider"
                    type="range"
                    min='0'
                    max='100'
                    value={gain*100}
                    onChange={setMasterGain}
                />
            </div>
        </div>
    );
}

export default Pad