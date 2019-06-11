import React, {Fragment, Component} from 'react'
import './App.css';
import PadContainer from './containers/PadContainer'
import MasterControls from './containers/MasterControls'

class App extends Component {

    render(){
        return (
            <Fragment>
                <PadContainer />
                <MasterControls />
            </Fragment>
        )
    }
}

export default App;
