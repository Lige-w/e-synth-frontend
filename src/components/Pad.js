import React, {useEffect, useState} from 'react'
import Audio from '../helpers/Audio'
import {Button, Icon, Select} from 'semantic-ui-react'
import OscillatorControls from './OscillatorControls'

const Pad = ({pad: {pad, attackGain}, pads, padsAttributes, setPadsAttributes, index}) => {

    const [keyName, setKeyName] = useState('a')
    const [gain, setGain] = useState(pad.gain.value)
    const [oscillators, setOscillators] = useState([])
    const [selectedOscillator, setSelectedOscillator] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const initializeSavedPad = () => {
        setKeyName(padsAttributes[index].key_name)

        const savedOscillators = padsAttributes[index].oscillators_attributes.map((oscillatorAttributes, i) => {
            const oscillatorGain = Audio.context.createGain()
            oscillatorGain.gain.value = oscillatorAttributes.gain
            oscillatorGain.connect(pad)

            const oscillator = Audio.context.createOscillator()
            oscillator.frequency.value = oscillatorAttributes.frequency
            oscillator.type = oscillatorAttributes.wave_type
            oscillator.connect(oscillatorGain)
            oscillator.start(0)

            return {
                key: `id-${oscillatorAttributes.id}` || i+1,
                text: `oscillator-${i + 1}`,
                value: `oscillator-${i + 1}`,
                oscillator: oscillator,
                frequency: oscillator.frequency.value,
                gainNode: oscillatorGain,
                gain: oscillatorGain.gain.value,
                type: oscillator.type
            }
        })

        setSelectedOscillator(savedOscillators[0])
        setOscillators(savedOscillators)
    }


    useEffect(initializeSavedPad, [pads])



    const allowKeyTriggerChange = (e) => {
        e.target.addEventListener('keydown', changeKeyTrigger)
        e.target.innerText = 'Press any key...'
    }

    const changeKeyTrigger = (e) => {
        setKeyName(e.key)
        changePadKeyAttribute(e.key)
        e.target.removeEventListener('keydown', changeKeyTrigger)
        e.target.innerText = `Key: ${e.key}`
    }

    const changePadKeyAttribute = (key) => {
        const padsAttributesCopy = [...padsAttributes]
        padsAttributesCopy[index].key_name = key
    }

    const setPadGain = (e) => {
        pad.gain.value = e.target.value/100
        changePadGainAttribute(pad.gain.value)
        setGain(pad.gain.value)
    }

    const changePadGainAttribute = (gain) => {
        const padsAttributesCopy = [...padsAttributes]
        padsAttributesCopy[index].gain = gain
    }

    const addOscillator = () => {
        const oscillator = Audio.context.createOscillator()
        const oscillatorGain = Audio.context.createGain()
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
            gain: oscillatorGain.gain.value,
            type: oscillator.type
        }
        setOscillators([...oscillators, oscillatorObject])
        setSelectedOscillator(oscillatorObject)

        addOscillatorAttributes(oscillatorObject)
    }

    const addOscillatorAttributes = ({frequency, gain, type}) => {
        const padsAttributesCopy = [...padsAttributes]
        const oscillatorsAttributes = padsAttributesCopy[index].oscillators_attributes
        const updatedOscillatorsAttributes = [...oscillatorsAttributes, {frequency: frequency, gain: gain, wave_type: type}]

        padsAttributesCopy[index].oscillators_attributes = updatedOscillatorsAttributes

        setPadsAttributes(padsAttributesCopy)
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
            const oscillatorIndex = oscillators.findIndex(oscillator => oscillator.key === selectedOscillator.key)
            const oscillatorsCopy = [...oscillators]
            oscillatorsCopy.splice(oscillatorIndex, 1, selectedOscillator)
            setOscillators(oscillatorsCopy)

            updateOscillatorsAttributes(oscillatorIndex)
        }
    }

    const updateOscillatorsAttributes = (oscillatorIndex) => {


            const padsAttributesCopy = [...padsAttributes]
        if (!!padsAttributes.length){
            const oscillatorsAttributes = padsAttributesCopy[index].oscillators_attributes
            oscillatorsAttributes[oscillatorIndex].wave_type = selectedOscillator.type
            oscillatorsAttributes[oscillatorIndex].frequency = selectedOscillator.frequency
            oscillatorsAttributes[oscillatorIndex].gain = selectedOscillator.gain
        }

            setPadsAttributes(padsAttributesCopy)


    }

    useEffect(updateOscillators, [selectedOscillator])

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
            <Button className='new-oscillator' onClick={addOscillator} >New Oscillator</Button>
            <Button className='key-select' onClick={allowKeyTriggerChange}>Key: {keyName}</Button>
            <Select
                placeholder='Add an oscillator...'
                className='oscillator-select'
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
                <div className='oscillator-placeholder'></div>}
            <Button className="play-button" positive onMouseDown={play} onMouseUp={pause} onDrop={pause} >
                <Icon name="play"/>
            </Button>
            {/*<div className='gain-container'>*/}
            {/*<p className='pad-label'>Gain: {Math.round(gain*100)}</p>*/}
            <input
                className="gain-slider"
                type="range"
                min='0'
                max='100'
                value={gain*100}
                onChange={setPadGain}
            />
            {/*</div>*/}
        </div>
    );
}

export default Pad