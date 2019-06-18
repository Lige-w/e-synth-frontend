import React from 'react'

const MasterGain = ({masterGain, setMasterGain}) => {

    return (
        <div id='master-gain'>
            <p>Master Gain: {Math.round(masterGain*100)}</p>
            <input
                type="range"
                min='0'
                max="100"
                value={masterGain * 100}
                onChange={setMasterGain}/>
        </div>)

}

export default MasterGain
