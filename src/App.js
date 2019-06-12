import React, {Fragment, Component} from 'react'
import './App.css';
import PadContainer from './containers/PadContainer'
import MasterControls from './containers/MasterControls'
import Audio from './helpers/Audio'

class App extends Component {

    state = {
        masterGain: 0
    }

    componentDidMount() {
        Audio.masterGainNode.connect(Audio.context.destination)
        Audio.masterGainNode.gain.value = .5
        this.setState({masterGain: Audio.masterGainNode.gain.value})
    }

    setMasterGain = (e) => {
        Audio.masterGainNode.gain.value = e.target.value/100
        this.setState({masterGain: Audio.masterGainNode.gain.value})
    }

    render(){
        return (
            <Fragment>
                <PadContainer />
                <MasterControls
                    masterGain={this.state.masterGain}
                    setMasterGain={this.setMasterGain}
                />
            </Fragment>
        )
    }
}

export default App;
