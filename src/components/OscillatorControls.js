import React, { Fragment } from 'react'
import { Input, Select } from 'semantic-ui-react'

const OscillatorControls = (props) => {
    const {
        oscillator: {
            frequency,
            type,
            gain
        },
        changeSelectedOscillatorFrequency,
        changeSelectedOscillatorType,
        changeSelectedOscillatorGain
    } = props

    const oscillatorTypes = [
        {key:'sine', text: 'sine', value: 'sine'},
        {key: 'square', text: 'square', value: 'square'},
        {key: 'sawtooth', text: 'sawtooth', value: 'sawtooth'},
        {key: 'triangle', text: 'triangle', value: 'triangle'}
    ]

    return (
        <Fragment>
            <Input
                type='number'
                min='15'
                max='8000'
                value={frequency}
                onChange={changeSelectedOscillatorFrequency}
            />
            <Select
                fluid
                options={oscillatorTypes}
                value={type}
                onChange={changeSelectedOscillatorType}
            />
            <input
                className='gain-slider'
                type="range"
                min='0'
                max='100'
                value={gain*100}
                onChange={changeSelectedOscillatorGain}
            />

        </Fragment>
    )
}

export default OscillatorControls