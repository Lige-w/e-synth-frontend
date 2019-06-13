import React, { useState, useEffect } from 'react'
import Audio from '../helpers/Audio'
import { Button, Select, Icon } from 'semantic-ui-react'
import OscillatorControls from './OscillatorControls'




const Pad = ({pad: {pad, attackGain}}) => {

    const [keyName, setKeyName] = useState('a')
    const [gain, setGain] = useState(pad.gain.value)
    const [oscillators, setOscillators] = useState([])
    const [selectedOscillator, setSelectedOscillator] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const allowKeyTriggerChange = (e) => {
        e.target.addEventListener('keydown', changeKeyTrigger)
        e.target.innerText = 'Press any key...'
    }

    const changeKeyTrigger = (e) => {
        setKeyName(e.key)
        e.target.removeEventListener('keydown', changeKeyTrigger)
        e.target.innerText = `Key: ${e.key}`
    }

    const setPadGain = (e) => {
        pad.gain.value = e.target.value/100
        setGain(pad.gain.value)
    }

    const addOscillator = () => {
        const oscillator = Audio.context.createOscillator()
        const oscillatorGain = Audio.context.createGain()
        // const attackOscillatorGain = Audio.context.createGain()
        // attackOscillatorGain.gain.value = 0
        // attackOscillatorGain.connect(pad)
        oscillatorGain.gain.value = .5
        oscillator.connect(oscillatorGain)
        oscillatorGain.connect(pad)
        oscillator.start(0)

        const oscillatorObject = {
            key: oscillators.length + 1,
            text: `oscillator-${oscillators.length + 1}`,
            value: `oscillator-${oscillators.length + 1}`,
            oscillator: oscillator,
            frequency: oscillator.frequency.value,
            gainNode: oscillatorGain,
            // attackGainNode: attackOscillatorGain,
            gain: oscillatorGain.gain.value,
            type: oscillator.type
        }
        setOscillators([...oscillators, oscillatorObject])
        setSelectedOscillator(oscillatorObject)
    }

    const selectOscillator = (e, { value }) => {
        setSelectedOscillator(oscillators.find(oscillator => oscillator.value === value))
    }

    const changeSelectedOscillatorFrequency = (e, {value}) => {
        if (value > 8000) {value = 8000}

        setSelectedOscillator({...selectedOscillator, frequency: value})
        selectedOscillator.oscillator.frequency.setValueAtTime(value, Audio.context.currentTime)

    }

    const changeSelectedOscillatorType = (e, {value}) => {
        setSelectedOscillator({...selectedOscillator, type: value})
        selectedOscillator.oscillator.type = value
    }

    const changeSelectedOscillatorGain = (e) => {
        selectedOscillator.gainNode.gain.value = e.target.value/100
        setSelectedOscillator({...selectedOscillator, gain: selectedOscillator.gainNode.gain.value})
    }

    const updateOscillators = () => {
        if (!!oscillators && !!selectedOscillator) {
            const index = oscillators.findIndex(oscillator => oscillator.key === selectedOscillator.key)
            const oscillatorsCopy = [...oscillators]
            oscillatorsCopy.splice(index, 1, selectedOscillator)
            setOscillators(oscillatorsCopy)

        }
    }

    useEffect(updateOscillators, [selectedOscillator])


    // const connectOscillator = (oscillator) => {
    //     oscillator.gain.value = 0
    //     oscillator.gain.setTargetAtTime(1, Audio.context.currentTime, 0.015)
    // }
    //
    // const disconnectOscillator = (oscillator) => {
    //     oscillator.gain.setTargetAtTime(0, Audio.context.currentTime, 0.015)
    // }

    const play = () => {
        if(!isPlaying) {
            attackGain.gain.setTargetAtTime(1, Audio.context.currentTime, 0.001)
            setIsPlaying(true)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === keyName) {play()}
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {window.removeEventListener('keydown', handleKeyDown)}
    }, [handleKeyDown])

    const pause = () => {
        if(isPlaying) {
            attackGain.gain.setTargetAtTime(0, Audio.context.currentTime, 0.001)
            setIsPlaying(false)
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === keyName) {pause()}
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)
        return () => {window.removeEventListener('keyup', handleKeyUp)}
    }, [handleKeyUp])


    return (
        <div className='pad' >
            <Button onClick={addOscillator} >New Oscillator</Button>
            <Button onClick={allowKeyTriggerChange}>Key: {keyName}</Button>
            <Select
                fluid
                selection
                value={!!selectedOscillator ? selectedOscillator.value : null}
                options={oscillators.map(oscillator => ({
                    key: oscillator.key,
                    text: oscillator.text,
                    value: oscillator.value
                }))}
                onChange={selectOscillator}
            />
            {selectedOscillator ?
                <OscillatorControls
                    changeSelectedOscillatorFrequency={changeSelectedOscillatorFrequency}
                    changeSelectedOscillatorType={changeSelectedOscillatorType}
                    changeSelectedOscillatorGain={changeSelectedOscillatorGain}
                    oscillator={selectedOscillator}
                /> :
                null}
            <Button positive onMouseDown={play} onMouseUp={pause} onDrop={pause} >
                <Icon name="play"/>
            </Button>
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